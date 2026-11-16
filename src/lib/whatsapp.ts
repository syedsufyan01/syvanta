import {CO} from '../data';
export type Pair=[string,string];
export const waLink=(text:string)=>`https://wa.me/${CO.wa}?text=${encodeURIComponent(text)}`;
export const wa=waLink;
export const mailLink=(subject:string,body:string)=>`mailto:${CO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.slice(0,1800))}`;
export const telLink=`tel:${CO.phone.replace(/\s/g,'')}`;
export function buildMessage(o:{intro:string;fields:Pair[];long?:Pair[];notes?:string[];closing:string}):string{
  const L=['Hello SYVANTA DIGITAL SYSTEMS,','',o.intro,''];
  o.fields.filter(([,v])=>v.trim()).forEach(([k,v])=>L.push(`${k}: ${v.trim()}`));
  (o.long||[]).filter(([,v])=>v.trim()).forEach(([k,v])=>L.push('',`${k}:`,v.trim()));
  (o.notes||[]).forEach(n=>L.push('',n));
  L.push('',o.closing);return L.join('\n');
}
/** Opens WhatsApp with the message prefilled. Returns false if the browser blocked the pop-up. The visitor must still press Send. */
export function openWhatsApp(text:string):boolean{const w=window.open(waLink(text),'_blank');if(w){try{w.opener=null}catch{/* ignore */}return true}return false}
