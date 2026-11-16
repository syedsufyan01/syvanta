<?php
declare(strict_types=1);
use PHPMailer\PHPMailer\PHPMailer;
if(is_file(__DIR__.'/vendor/autoload.php'))require __DIR__.'/vendor/autoload.php';
foreach(@file(__DIR__.'/.env',FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES)?:[] as $l){
  $l=trim($l);if($l===''||$l[0]==='#'||!str_contains($l,'='))continue;[$k,$v]=explode('=',$l,2);$_ENV[trim($k)]=trim(trim($v),"\"'");
}
function env(string $k,string $d=''):string{return ($_ENV[$k]??'')!==''?$_ENV[$k]:$d;}
session_set_cookie_params(['httponly'=>true,'secure'=>!empty($_SERVER['HTTPS']),'samesite'=>'Lax']);
session_start();
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
if(env('ALLOWED_ORIGIN')!==''){header('Access-Control-Allow-Origin: '.env('ALLOWED_ORIGIN'));header('Access-Control-Allow-Credentials: true');header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');}
if($_SERVER['REQUEST_METHOD']==='OPTIONS')exit;
function out(array $d,int $c=200):never{http_response_code($c);echo json_encode($d);exit;}
function csrf():string{return $_SESSION['csrf']??=bin2hex(random_bytes(32));}
function db():PDO{static $p;return $p??=new PDO('mysql:host='.env('DB_HOST','localhost').';dbname='.env('DB_NAME').';charset=utf8mb4',env('DB_USER'),env('DB_PASS'),[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);}
function dataDir():string{$d=__DIR__.'/storage/data';if(!is_dir($d))@mkdir($d,0750,true);return $d;}
function store(string $type,array $row):void{
  @file_put_contents(dataDir()."/$type.jsonl",json_encode($row+['at'=>date('c')],JSON_UNESCAPED_UNICODE)."\n",FILE_APPEND|LOCK_EX);
  if(env('DB_NAME')!==''){try{db()->prepare("INSERT INTO submissions(type,data)VALUES(?,?)")->execute([$type,json_encode($row,JSON_UNESCAPED_UNICODE)]);}catch(Throwable $x){error_log('DB: '.$x->getMessage());}}
}
function guard(string $route,int $max=6):void{
  if(!hash_equals($_SESSION['csrf']??'',$_SERVER['HTTP_X_CSRF_TOKEN']??''))out(['error'=>'Session expired. Please refresh the page and try again.'],403);
  $f=dataDir().'/rl-'.md5(($_SERVER['REMOTE_ADDR']??'').$route).'.json';$t=array_filter(json_decode(@file_get_contents($f)?:'[]',true)?:[],fn($x)=>$x>time()-3600);
  if(count($t)>=$max)out(['error'=>'Too many requests. Please try again later.'],429);
  $t[]=time();@file_put_contents($f,json_encode(array_values($t)));
  if(!empty($_POST['website']))out(['ok'=>true]);
}
function field(string $k,int $max=200,bool $req=true):string{$v=trim((string)($_POST[$k]??''));if($req&&$v==='')out(['error'=>"Please fill in: $k"],422);if(mb_strlen($v)>$max)out(['error'=>"Too long: $k"],422);return $v;}
function emailf(string $k='email'):string{$v=field($k,160);if(!filter_var($v,FILTER_VALIDATE_EMAIL))out(['error'=>'Invalid email address'],422);return $v;}
function e(string $s):string{return htmlspecialchars($s,ENT_QUOTES,'UTF-8');}
function tpl(string $title,string $body):string{return '<div style="background:#f1f5f9;padding:24px;font-family:Arial,sans-serif"><div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden"><div style="background:linear-gradient(135deg,#6366F1,#06B6D4);padding:20px;color:#fff;font-size:20px;font-weight:bold">SYVANTA DIGITAL SYSTEMS</div><div style="padding:24px;color:#0f172a"><h2 style="margin-top:0">'.e($title).'</h2>'.$body.'</div><div style="padding:14px 24px;background:#f8fafc;color:#64748b;font-size:12px">Your Complete Digital Solutions Partner. · syvanta.official@gmail.com · +92 314 8313320</div></div></div>';}
function smtp_native(string $to,string $subj,string $html,?string $reply):string{
  $enc=env('SMTP_ENCRYPTION','tls');$u=env('SMTP_USERNAME');$p=str_replace(' ','',env('SMTP_PASSWORD'));
  $s=@stream_socket_client(($enc==='ssl'?'ssl://':'tcp://').env('SMTP_HOST','smtp.gmail.com').':'.env('SMTP_PORT','587'),$en,$es,15);
  if(!$s)return "Connect failed: $es";
  $rd=function()use($s){$r='';while(($l=fgets($s,515))!==false){$r.=$l;if(isset($l[3])&&$l[3]===' ')break;}return $r;};
  $cmd=function(string $c,string $ok)use($s,$rd){if($c!=='')fwrite($s,$c."\r\n");$r=$rd();return str_starts_with($r,$ok)?'':trim($r);};
  $steps=[['', '220'],['EHLO syvanta','250']];
  foreach($steps as [$c,$ok])if($x=$cmd($c,$ok))return $x;
  if($enc!=='ssl'){if($x=$cmd('STARTTLS','220'))return $x;if(!stream_socket_enable_crypto($s,true,STREAM_CRYPTO_METHOD_TLS_CLIENT))return 'TLS failed';if($x=$cmd('EHLO syvanta','250'))return $x;}
  foreach([['AUTH LOGIN','334'],[base64_encode($u),'334'],[base64_encode($p),'235'],["MAIL FROM:<$u>",'250'],["RCPT TO:<$to>",'250'],['DATA','354']] as [$c,$ok])if($x=$cmd($c,$ok))return $x;
  $h="From: SYVANTA DIGITAL SYSTEMS <$u>\r\nTo: $to\r\n".($reply?"Reply-To: $reply\r\n":'')."Subject: =?UTF-8?B?".base64_encode($subj)."?=\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n".chunk_split(base64_encode($html));
  fwrite($s,$h."\r\n.\r\n");$x=$cmd('','250');fwrite($s,"QUIT\r\n");fclose($s);return $x;
}
function send(string $to,string $subj,string $html,?string $reply=null):bool{
  $body=tpl($subj,$html);$GLOBALS['mail_err']='';
  if(env('SMTP_PASSWORD')==='')return !($GLOBALS['mail_err']='SMTP_PASSWORD not set in .env');
  if(class_exists(PHPMailer::class)){
    try{$m=new PHPMailer(true);$m->isSMTP();$m->Host=env('SMTP_HOST','smtp.gmail.com');$m->Port=(int)env('SMTP_PORT','587');$m->SMTPAuth=true;$m->Username=env('SMTP_USERNAME');$m->Password=str_replace(' ','',env('SMTP_PASSWORD'));$m->SMTPSecure=env('SMTP_ENCRYPTION','tls');$m->CharSet='UTF-8';$m->Timeout=15;
      $m->setFrom(env('SMTP_USERNAME'),'SYVANTA DIGITAL SYSTEMS');$m->addAddress($to);if($reply)$m->addReplyTo($reply);$m->isHTML(true);$m->Subject=$subj;$m->Body=$body;$m->AltBody=strip_tags($html);$m->send();return true;}
    catch(Throwable $x){$GLOBALS['mail_err']=$x->getMessage();error_log('Mail: '.$x->getMessage());return false;}
  }
  $err=smtp_native($to,$subj,$body,$reply);if($err!==''){$GLOBALS['mail_err']=$err;error_log('Mail(native): '.$err);return false;}return true;
}
function rowsHtml(array $d):string{$r='';foreach($d as $k=>$v)if($v!=='')$r.='<p style="margin:6px 0"><b>'.e(ucfirst(str_replace('_',' ',$k))).':</b> '.nl2br(e((string)$v)).'</p>';return $r;}
