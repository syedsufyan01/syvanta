import {CO} from '../data';

/**
 * Form delivery.
 * 1) FormSubmit (https://formsubmit.co): emails the submission to CO.email. Works on localhost and on any hosting, needs no API key.
 *    The very first submission triggers an activation email to CO.email; click the confirm link once.
 * 2) Netlify Forms: used as a fallback, only on *.netlify.app (or when VITE_NETLIFY_FORMS=true).
 * Success is reported only when a server really accepted the request.
 */
const ENDPOINT=`https://formsubmit.co/ajax/${CO.email}`;
const LABELS:Record<string,string>={contact:'Contact',quote:'Project quote','sales-partner':'Sales partner application','career-application':'Career application'};

const netlifyAllowed=()=>location.hostname.endsWith('.netlify.app')||import.meta.env.VITE_NETLIFY_FORMS==='true';

async function viaFormSubmit(form:string,values:Record<string,string>,file?:File|null){
  const fd=new FormData();
  Object.entries(values).forEach(([k,v])=>{if(v!=='')fd.append(k,v)});
  fd.append('_subject',`SYVANTA website: ${LABELS[form]||form}`);
  fd.append('_template','table');fd.append('_captcha','false');fd.append('_honey','');
  if(values.email)fd.append('_replyto',values.email);
  fd.append('form_name',form);
  if(file)fd.append('attachment',file,file.name);
  const r=await fetch(ENDPOINT,{method:'POST',body:fd,headers:{Accept:'application/json'}});
  const j=await r.json().catch(()=>null) as {success?:string|boolean;message?:string}|null;
  if(r.ok&&j&&String(j.success)==='true')return;
  throw new Error(j?.message||`status ${r.status}`);
}

async function viaNetlify(form:string,values:Record<string,string>,file?:File|null){
  const fd=new FormData();
  fd.append('form-name',form);fd.append('bot-field','');
  Object.entries(values).forEach(([k,v])=>fd.append(k,v));
  if(file)fd.append('cv',file,file.name);
  const r=await fetch('/',{method:'POST',body:fd});
  if(!r.ok)throw new Error(`status ${r.status}`);
}

export async function sendForm(form:string,values:Record<string,string>,file?:File|null):Promise<void>{
  let first:unknown;
  try{await viaFormSubmit(form,values,file);return}catch(e){first=e}
  if(netlifyAllowed()){try{await viaNetlify(form,values,file);return}catch{/* report the first error */}}
  throw first instanceof Error?first:new Error('network');
}
