import {useEffect,useId,useState,FormEvent} from 'react';import {MessageCircle,Mail,Paperclip,Send,Loader2} from 'lucide-react';
import {buildMessage} from '../../lib/whatsapp';import {cvProblem} from '../../lib/validate';import {useToast} from '../ui';
import {Field,FieldDef,NetStatus,StatusPanel,check,useChannels,useNetlify} from './kit';
export type {FieldDef};
type Props={fields:FieldDef[];intro:string;closing:string;emailSubject:string;cv?:boolean;consent?:string;preset?:Record<string,string>;netlify?:string;okText?:string;extra?:Record<string,string>;submitLabel?:string};
export default function SmartForm({fields,intro,closing,emailSubject,cv,consent,preset,netlify,okText='Thank you! Your submission was received.',extra,submitLabel='Submit'}:Props){
  const uid=useId();const toast=useToast();const {busy,st,setSt,send}=useChannels(emailSubject);const net=useNetlify(netlify||'');
  const [v,setV]=useState<Record<string,string>>(()=>Object.fromEntries(fields.map(f=>[f.name,preset?.[f.name]??''])));
  const [err,setErr]=useState<Record<string,string>>({});const [file,setFile]=useState<File|null>(null);const [fileErr,setFileErr]=useState('');const [ok,setOk]=useState(false);const [okErr,setOkErr]=useState('');
  const pk=JSON.stringify(preset||{});useEffect(()=>{if(preset)setV(o=>({...o,...preset}))},[pk]); // eslint-disable-line
  const id=(n:string)=>`${uid}-${n}`;const working=busy||net.st==='busy';
  const validate=():boolean=>{
    const e:Record<string,string>={};fields.forEach(f=>{const m=check(f,v[f.name]||'');if(m)e[f.name]=m});
    const fe=cv?(file?cvProblem(file):'Please select your CV (PDF or DOCX, max 5 MB).'):'';const ce=consent&&!ok?'Please confirm to continue.':'';
    setErr(e);setFileErr(fe);setOkErr(ce);const first=fields.find(f=>e[f.name]);
    if(first||fe||ce){toast('Please fix the highlighted fields.','error');document.getElementById(first?id(first.name):fe?id('cv'):id('consent'))?.focus();return false}return true;
  };
  const submit=(ch:'wa'|'mail')=>{
    if(working||!validate())return;
    const notes=cv&&file?[ch==='wa'?`CV file: ${file.name} (I will attach it manually in this chat.)`:`CV file: ${file.name} (attached to this email.)`]:[];
    send(ch,buildMessage({intro,fields:fields.filter(f=>f.type!=='textarea').map(f=>[f.label,v[f.name]||'']),long:fields.filter(f=>f.type==='textarea').map(f=>[f.label,v[f.name]||'']),notes,closing}));
  };
  const submitNet=()=>{if(working||net.st==='ok'||!validate())return;net.submit({...v,...(extra||{}),consent:consent?'yes':''},cv?file:null)};
  const clear=()=>{setV(Object.fromEntries(fields.map(f=>[f.name,''])));setFile(null);setErr({});setOk(false);setSt(null);net.reset()};
  return <form noValidate onSubmit={(e:FormEvent)=>{e.preventDefault();netlify?submitNet():submit('wa')}} className="card rounded-3xl p-5 shadow-xl shadow-black/5 sm:p-8" style={{border:'1px solid var(--line)',background:'var(--surface)'}} aria-busy={working}>
    <div className="grid gap-5 sm:grid-cols-2">{fields.map(f=><div key={f.name} className={f.type==='textarea'||f.type==='url'||f.type==='cards'?'sm:col-span-2':''}><Field f={f} id={id(f.name)} value={v[f.name]||''} error={err[f.name]} onChange={x=>{setV(o=>({...o,[f.name]:x}));if(err[f.name])setErr(o=>({...o,[f.name]:''}))}} onBlur={()=>setErr(o=>({...o,[f.name]:check(f,v[f.name]||'')}))}/></div>)}
    {cv&&<div className="sm:col-span-2"><label htmlFor={id('cv')} className="block text-sm font-semibold">CV / Resume (PDF or DOCX, max 5 MB) <span aria-hidden="true" className="text-red-500">*</span></label>
      <input id={id('cv')} type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={x=>{const f=x.target.files?.[0]||null;setFile(f);setFileErr(f?cvProblem(f):'')}} aria-invalid={!!fileErr} className="inp mt-1.5 font-normal"/>
      {file&&!fileErr&&<p className="mt-1 flex items-center gap-1 text-sm text-green-500"><Paperclip size={14}/>{file.name} is ready.</p>}{fileErr&&<p role="alert" className="mt-1 text-sm text-red-500">{fileErr}</p>}
      <p className="mt-1 text-xs text-muted">{netlify?'Use the submit button to send your CV together with the form. If you apply by WhatsApp or email, attach the file yourself in that conversation.':'Attach the file yourself in WhatsApp or your email app.'}</p></div>}
    {consent&&<div className="sm:col-span-2"><label className="flex gap-3 text-sm"><input id={id('consent')} type="checkbox" checked={ok} onChange={e=>setOk(e.target.checked)} className="mt-1 h-4 w-4"/>{consent}</label>{okErr&&<p role="alert" className="mt-1 text-sm text-red-500">{okErr}</p>}</div>}</div>
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {netlify&&<button type="button" disabled={working||net.st==='ok'} onClick={submitNet} className="btn">{net.st==='busy'?<Loader2 size={18} className="spin"/>:<Send size={18}/>}{net.st==='busy'?'Submitting…':net.st==='ok'?'Submitted':submitLabel}</button>}
      <button type={netlify?'button':'submit'} disabled={working} onClick={netlify?()=>submit('wa'):undefined} className="btn btn-wa"><MessageCircle size={18}/>{busy?'Please wait…':'Send via WhatsApp'}</button>
      <button type="button" disabled={working} onClick={()=>submit('mail')} className="btn2"><Mail size={18}/>Send via Email</button></div>
    <p className="mt-3 text-xs text-muted">{netlify?'Choose how you would like to send this. WhatsApp and email open with your message ready; you press Send there.':'WhatsApp and email open with your message ready. Nothing is sent until you press Send there.'}</p>
    <NetStatus st={net.st} msg={net.msg} okText={okText}/>
    {st&&<StatusPanel st={st} note={cv?`Remember to attach your CV${file?` (${file.name})`:''} manually before sending.`:undefined} onEdit={()=>setSt(null)} onClear={clear}/>}
    {(net.st==='ok')&&<button type="button" onClick={clear} className="btn2 mt-3">Start a new submission</button>}
  </form>;
}
