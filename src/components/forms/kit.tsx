import {useState,ReactNode} from 'react';import {AlertCircle,Check,MessageCircle} from 'lucide-react';import {motion} from 'framer-motion';
import {emailOk,phoneOk,urlOk} from '../../lib/validate';import {sendForm} from '../../lib/submit';import {openWhatsApp,mailLink,waLink} from '../../lib/whatsapp';import {useToast} from '../ui';
export type FieldDef={name:string;label:string;type?:'text'|'email'|'tel'|'url'|'textarea'|'select'|'cards';options?:string[];optional?:boolean;placeholder?:string};
export type Status={ch:'wa'|'mail';text:string;blocked:boolean}|null;
export function check(f:FieldDef,raw:string):string{
  const v=raw.trim();if(!v)return f.optional?'':(f.type==='cards'||f.type==='select'?`Please choose ${f.label.toLowerCase()}.`:`${f.label} is required.`);
  if(f.type==='email'&&!emailOk(v))return 'Enter a valid email address.';
  if(f.type==='tel'&&!phoneOk(v))return 'Enter a valid phone number (7–15 digits, optional +).';
  if(f.type==='url'&&!urlOk(v))return 'Enter a full link starting with https://';
  if(f.type==='textarea'&&v.length<10)return 'Please add a few more details (at least 10 characters).';
  return '';
}
export function Field({f,id,value,error,onChange,onBlur}:{f:FieldDef;id:string;value:string;error?:string;onChange:(v:string)=>void;onBlur?:()=>void}){
  const lab=<>{f.label}{!f.optional&&<span aria-hidden="true" className="text-red-500"> *</span>}{f.optional&&<span className="font-normal text-muted"> (optional)</span>}</>;
  const err=error&&<p id={id+'-e'} role="alert" className="mt-1.5 text-sm text-red-500">{error}</p>;
  if(f.type==='cards')return <fieldset><legend className="text-sm font-semibold">{lab}</legend><div role="radiogroup" className="mt-2 grid gap-2 sm:grid-cols-2">{f.options?.map((o,i)=><button type="button" role="radio" aria-checked={value===o} id={i===0?id:undefined} key={o} onClick={()=>onChange(o)} className={`flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm transition ${value===o?'border-brand bg-brand/15 font-semibold':'hover:border-brand/60'}`} style={value===o?undefined:{borderColor:'var(--line)'}}>{o}{value===o&&<Check size={16} className="text-brand"/>}</button>)}</div>{err}</fieldset>;
  const common={id,name:f.name,value,className:'inp mt-1.5 font-normal','aria-invalid':!!error,'aria-describedby':error?id+'-e':undefined,onBlur,placeholder:f.placeholder};
  return <div><label htmlFor={id} className="block text-sm font-semibold">{lab}</label>
    {f.type==='textarea'?<textarea {...common} rows={5} onChange={e=>onChange(e.target.value)}/>:f.type==='select'?<select {...common} onChange={e=>onChange(e.target.value)}><option value="">Select…</option>{f.options?.map(o=><option key={o}>{o}</option>)}</select>:<input {...common} type={f.type||'text'} inputMode={f.type==='tel'?'tel':undefined} autoComplete={f.type==='email'?'email':f.type==='tel'?'tel':undefined} onChange={e=>onChange(e.target.value)}/>}{err}</div>;
}
export function useChannels(emailSubject:string){
  const toast=useToast();const [busy,setBusy]=useState(false);const [st,setSt]=useState<Status>(null);
  const send=(ch:'wa'|'mail',text:string)=>{if(busy)return;setBusy(true);setTimeout(()=>setBusy(false),2500);
    if(ch==='wa'){const ok=openWhatsApp(text);setSt({ch,text,blocked:!ok});toast(ok?'WhatsApp is open. Review the message and press Send.':'Pop-up blocked. Use the button below to open WhatsApp.',ok?'info':'error')}
    else{setSt({ch,text,blocked:false});toast('Opening your email app…','info');window.location.href=mailLink(emailSubject,text)}};
  return {busy,st,setSt,send};
}
export function StatusPanel({st,note,onEdit,onClear}:{st:NonNullable<Status>;note?:ReactNode;onEdit:()=>void;onClear:()=>void}){
  return <div role="status" className="mt-5 space-y-3 rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-sm">
    <p className="flex gap-2 font-semibold"><Check size={18} className="shrink-0 text-green-500"/>{st.ch==='wa'?(st.blocked?'WhatsApp did not open automatically. Tap the button below to open it with your message.':'Your message is ready in WhatsApp. Review it and press Send to submit your inquiry.'):'Your email is ready in your email app. Review it and press Send to submit your inquiry.'}</p>
    {note&&<p>{note}</p>}
    <div className="flex flex-wrap gap-2">{st.ch==='wa'&&<a href={waLink(st.text)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !min-h-[40px]"><MessageCircle size={16}/>{st.blocked?'Open WhatsApp':'Open WhatsApp again'}</a>}<button type="button" className="btn2 !min-h-[40px]" onClick={onEdit}>Edit details</button><button type="button" className="btn2 !min-h-[40px]" onClick={onClear}>Clear form</button></div>
    <details><summary className="cursor-pointer text-muted">Preview message</summary><pre className="mt-2 whitespace-pre-wrap break-words text-xs text-muted">{st.text}</pre></details></div>;
}
type NetState='idle'|'busy'|'ok'|'err';
/** Sends the form (FormSubmit, with Netlify Forms fallback). Success is shown only when a server accepted it. */
export function useNetlify(name:string){
  const [st,setSt]=useState<NetState>('idle');const [msg,setMsg]=useState('');
  const submit=async(values:Record<string,string>,file?:File|null)=>{
    if(st==='busy'||st==='ok')return;setSt('busy');setMsg('');
    try{await sendForm(name,values,file);setSt('ok')}
    catch(e){
      const net=e instanceof TypeError;
      setSt('err');
      setMsg(net?'We could not reach the server. Please check your internet connection and try again, or use WhatsApp or Email below. Your details are still in the form.':`We could not send the form automatically${e instanceof Error&&e.message?` (${e.message})`:''}. Please try again, or use WhatsApp or Email below. Your details are still in the form.`);
    }
  };
  return {st,msg,submit,reset:()=>{setSt('idle');setMsg('')}};
}
export function NetStatus({st,msg,okText}:{st:NetState;msg:string;okText:string}){
  if(st==='ok')return <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} role="status" className="mt-5 flex gap-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 text-sm"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-500 text-white"><Check size={18}/></span><span className="font-semibold">{okText}</span></motion.div>;
  if(st==='err')return <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} role="alert" className="mt-5 flex gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm"><AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500"/>{msg}</motion.p>;
  return null;
}
