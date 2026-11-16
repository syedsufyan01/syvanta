import {useId,useState} from 'react';import {AnimatePresence,motion} from 'framer-motion';import {ArrowLeft,ArrowRight,Check,MessageCircle,Mail,Pencil,Send,Loader2} from 'lucide-react';
import {buildMessage} from '../../lib/whatsapp';import {useToast} from '../ui';import {Field,FieldDef,NetStatus,StatusPanel,check,useChannels,useNetlify} from './kit';
export type Step={title:string;blurb:string;fields:FieldDef[]};
export default function MultiStep({steps,intro,closing,emailSubject,consent,preset,netlify,okText='Thank you! Your submission was received.'}:{steps:Step[];intro:string;closing:string;emailSubject:string;consent:string;preset?:Record<string,string>;netlify?:string;okText?:string}){
  const uid=useId();const toast=useToast();const all=steps.flatMap(s=>s.fields);const {busy,st,setSt,send}=useChannels(emailSubject);const net=useNetlify(netlify||'');
  const [v,setV]=useState<Record<string,string>>(()=>Object.fromEntries(all.map(f=>[f.name,preset?.[f.name]??''])));
  const [err,setErr]=useState<Record<string,string>>({});const [i,setI]=useState(0);const [ok,setOk]=useState(false);const [okErr,setOkErr]=useState('');
  const id=(n:string)=>`${uid}-${n}`;const review=i===steps.length;
  const validate=(fs:FieldDef[])=>{const e:Record<string,string>={};fs.forEach(f=>{e[f.name]=check(f,v[f.name]||'')});setErr(o=>({...o,...e}));const first=fs.find(f=>e[f.name]);if(first){toast('Please fix the highlighted fields.','error');document.getElementById(id(first.name))?.focus()}return !first};
  const submit=(ch:'wa'|'mail')=>{
    for(let s=0;s<steps.length;s++)if(!validate(steps[s].fields)){setI(s);return}
    if(!ok){setOkErr('Please confirm to continue.');return}setOkErr('');
    send(ch,buildMessage({intro,fields:all.filter(f=>f.type!=='textarea').map(f=>[f.label,v[f.name]||'']),long:all.filter(f=>f.type==='textarea').map(f=>[f.label,v[f.name]||'']),closing}));
  };
  const submitNet=()=>{if(busy||net.st==='busy'||net.st==='ok')return;for(let s=0;s<steps.length;s++)if(!validate(steps[s].fields)){setI(s);return}if(!ok){setOkErr('Please confirm to continue.');return}setOkErr('');net.submit({...v,consent:'yes'})};
  const labels=[...steps.map(s=>s.title),'Review'];
  return <div className="card rounded-3xl p-5 shadow-xl shadow-black/5 sm:p-8" aria-busy={busy}>
    <ol className="mb-8 flex items-center" aria-label="Progress">{labels.map((t,n)=><li key={t} className="flex flex-1 items-center last:flex-none"><button type="button" disabled={n>i} onClick={()=>setI(n)} aria-current={n===i?'step':undefined} aria-label={`Step ${n+1}: ${t}`} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${n<i?'bg-green-500 text-white':n===i?'bg-brand text-white ring-4 ring-brand/25':'bg-slate-500/20 text-muted'}`}>{n<i?<Check size={16}/>:n+1}</button>{n<labels.length-1&&<span className="mx-2 h-0.5 flex-1 overflow-hidden rounded bg-slate-500/20"><motion.span className="block h-full bg-brand" initial={false} animate={{width:n<i?'100%':'0%'}} transition={{duration:.4}}/></span>}</li>)}</ol>
    <AnimatePresence mode="wait"><motion.div key={i} initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}} transition={{duration:.25}}>
      {!review?<><p className="text-xs font-semibold uppercase tracking-widest text-cyan2">Step {i+1} of {steps.length}</p><h2 className="mt-1 text-2xl font-bold">{steps[i].title}</h2><p className="mt-1 text-sm text-muted">{steps[i].blurb}</p>
        <div className="mt-6 space-y-5">{steps[i].fields.map(f=><Field key={f.name} f={f} id={id(f.name)} value={v[f.name]||''} error={err[f.name]} onChange={x=>{setV(o=>({...o,[f.name]:x}));if(err[f.name])setErr(o=>({...o,[f.name]:''}))}} onBlur={()=>setErr(o=>({...o,[f.name]:check(f,v[f.name]||'')}))}/>)}</div></>
      :<><p className="text-xs font-semibold uppercase tracking-widest text-cyan2">Final step</p><h2 className="mt-1 text-2xl font-bold">Review your details</h2><p className="mt-1 text-sm text-muted">Check everything, then send it through WhatsApp or email. You press Send yourself.</p>
        <div className="mt-6 space-y-4">{steps.map((s,n)=><div key={s.title} className="rounded-xl p-4" style={{border:'1px solid var(--line)'}}><div className="mb-2 flex items-center justify-between"><b className="text-sm">{s.title}</b><button type="button" onClick={()=>setI(n)} className="flex items-center gap-1 text-sm text-brand"><Pencil size={14}/>Edit</button></div><dl className="space-y-1 text-sm">{s.fields.filter(f=>(v[f.name]||'').trim()).map(f=><div key={f.name} className="grid gap-1 sm:grid-cols-[10rem_1fr]"><dt className="text-muted">{f.label}</dt><dd className="break-words">{v[f.name]}</dd></div>)}</dl></div>)}</div>
        <label className="mt-5 flex gap-3 text-sm"><input id={id('consent')} type="checkbox" checked={ok} onChange={e=>setOk(e.target.checked)} className="mt-1 h-4 w-4"/>{consent}</label>{okErr&&<p role="alert" className="mt-1 text-sm text-red-500">{okErr}</p>}</>}
    </motion.div></AnimatePresence>
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><div>{i>0&&<button type="button" onClick={()=>setI(i-1)} className="btn2 w-full sm:w-auto"><ArrowLeft size={16}/>Back</button>}</div>
      {!review?<button type="button" onClick={()=>{if(validate(steps[i].fields))setI(i+1)}} className="btn">{i===steps.length-1?'Review':'Continue'}<ArrowRight size={16}/></button>
      :<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{netlify&&<button type="button" disabled={busy||net.st==='busy'||net.st==='ok'} onClick={submitNet} className="btn">{net.st==='busy'?<Loader2 size={18} className="spin"/>:<Send size={18}/>}{net.st==='busy'?'Submitting…':net.st==='ok'?'Submitted':'Submit request'}</button>}<button type="button" disabled={busy} onClick={()=>submit('wa')} className="btn btn-wa"><MessageCircle size={18}/>{busy?'Please wait…':'Send via WhatsApp'}</button><button type="button" disabled={busy} onClick={()=>submit('mail')} className="btn2"><Mail size={18}/>Send via Email</button></div>}</div>
    <NetStatus st={net.st} msg={net.msg} okText={okText}/>
    {st&&<StatusPanel st={st} onEdit={()=>{setSt(null);setI(steps.length)}} onClear={()=>{setV(Object.fromEntries(all.map(f=>[f.name,''])));setErr({});setOk(false);setSt(null);net.reset();setI(0)}}/>}
  </div>;
}
