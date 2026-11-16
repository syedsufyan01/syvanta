<?php
require __DIR__.'/../lib.php';
$route=$_GET['r']??basename(trim((string)parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH),'/'));
$co=env('COMPANY_EMAIL','syvanta.official@gmail.com');
if($route==='csrf')out(['token'=>csrf()]);
if($route==='health'){
  $info=['ok'=>true,'phpmailer'=>class_exists(PHPMailer\PHPMailer\PHPMailer::class),'smtp_password_set'=>env('SMTP_PASSWORD')!=='','storage_writable'=>is_writable(dataDir())];
  if(env('HEALTH_KEY')!==''&&hash_equals(env('HEALTH_KEY'),(string)($_GET['key']??''))&&isset($_GET['test'])){$info['test_sent']=send($co,'SYVANTA test email','<p>SMTP is working.</p>');$info['mail_error']=$GLOBALS['mail_err'];}
  out($info);
}
if($_SERVER['REQUEST_METHOD']!=='POST')out(['error'=>'Method not allowed'],405);
$ack=fn(string $n,string $what)=>'<p>Hello '.e($n).',</p><p>Thank you for contacting SYVANTA DIGITAL SYSTEMS. We have received your '.$what.' and will get back to you soon.</p><p>For a faster reply, message us on WhatsApp: <a href="https://wa.me/923148313320">+92 314 8313320</a></p>';
if($route==='contact'||$route==='quote'){
  guard($route);$q=$route==='quote';
  $d=['name'=>field('name',120),'business'=>field('business',160,false),'email'=>emailf(),'phone'=>field('phone',40,$q),'service'=>field('service',120,$q),'budget'=>field('budget',80,false),'timeline'=>field('timeline',80,false),'message'=>field('message',4000)];
  store($route,$d);
  $ok=send($co,'New '.($q?'quote request':'inquiry').' from '.$d['name'],rowsHtml($d),$d['email']);$err=$GLOBALS['mail_err'];
  send($d['email'],'We received your '.($q?'quote request':'message'),$ack($d['name'],$q?'quote request':'message'),$co);
  out(['ok'=>true,'emailed'=>$ok]+(env('APP_ENV')==='production'?[]:['mail_error'=>$err]));
}
if($route==='partner'){
  guard('partner',3);
  $d=['name'=>field('name',120),'email'=>emailf(),'phone'=>field('phone',40),'city'=>field('city',80),'experience'=>field('experience',60),'pitch'=>field('pitch',3000),'profile_link'=>field('profile_link',255,false)];
  if(empty($_POST['consent']))out(['error'=>'Please accept the consent checkbox'],422);
  store('partners',$d);
  $ok=send($co,'New Sales Partner application: '.$d['name'],rowsHtml($d),$d['email']);
  send($d['email'],'Sales Partner application received','<p>Hello '.e($d['name']).',</p><p>Thank you for your interest in the SYVANTA Sales Partner Program. Our team will review your application and contact you. Commission terms are shared in writing before any work starts.</p>',$co);
  out(['ok'=>true,'emailed'=>$ok]);
}
if($route==='apply'){
  guard('apply',4);
  $d=['name'=>field('name',120),'email'=>emailf(),'phone'=>field('phone',40),'position'=>field('position',160),'experience'=>field('experience',60),'education'=>field('education',200),'linkedin'=>field('linkedin',255,false),'portfolio'=>field('portfolio',255,false),'github'=>field('github',255,false)];
  $cl=field('cover_letter',5000);
  if(empty($_POST['consent']))out(['error'=>'Please accept the consent checkbox'],422);
  $f=$_FILES['cv']??null;if(!$f||$f['error']!==UPLOAD_ERR_OK)out(['error'=>'CV upload failed (file missing or too large for server)'],422);
  if($f['size']>5*1024*1024)out(['error'=>'CV must be 5 MB or less'],422);
  $ext=strtolower(pathinfo($f['name'],PATHINFO_EXTENSION));$mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
  $ok_m=['pdf'=>['application/pdf'],'docx'=>['application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/zip']];
  if(!isset($ok_m[$ext])||!in_array($mime,$ok_m[$ext],true))out(['error'=>'Only PDF or DOCX files are allowed'],422);
  $dup=dataDir().'/dup-'.sha1(strtolower($d['email']).$d['position']);if(is_file($dup))out(['error'=>'You have already applied for this position.'],409);
  $name=bin2hex(random_bytes(16)).'.'.$ext;$cvDir=__DIR__.'/../storage/cv';if(!is_dir($cvDir))@mkdir($cvDir,0750,true);
  if(!move_uploaded_file($f['tmp_name'],"$cvDir/$name"))out(['error'=>'Could not save CV on server'],500);
  @touch($dup);store('applications',$d+['cv_file'=>$name,'cover_letter'=>$cl]);
  send($co,'New job application: '.$d['position'],rowsHtml($d).'<p><b>Cover letter:</b><br>'.nl2br(e($cl)).'</p><p>CV saved on server: '.e($name).'</p>',$d['email']);
  send($d['email'],'Application received — SYVANTA DIGITAL SYSTEMS','<p>Hello '.e($d['name']).',</p><p>Thank you for your interest in SYVANTA DIGITAL SYSTEMS. Our recruitment team will review your application.</p>',$co);
  out(['ok'=>true]);
}
out(['error'=>'Not found'],404);
