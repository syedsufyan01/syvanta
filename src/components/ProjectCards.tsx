import {Link} from 'react-router-dom';
import {ArrowUpRight,ExternalLink} from 'lucide-react';
import type {Project} from '../data';
import {Reveal} from './ui';

const TONES=['from-emerald-500 to-teal-500','from-sky-500 to-blue-600','from-fuchsia-500 to-violet-600','from-orange-500 to-amber-500','from-cyan-500 to-indigo-500'];
const initials=(name:string)=>name.split(/[\s—–-]+/).filter(w=>/^[A-Za-z]/.test(w)).slice(0,2).map(w=>w[0].toUpperCase()).join('');

/** Small branded monogram tile (no screenshots). */
export const Mono=({p,i,size='h-16 w-16 text-xl'}:{p:Project;i:number;size?:string})=>
  <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display font-bold text-white shadow-lg ${TONES[i%TONES.length]} ${size}`}>{initials(p.name)}</span>;

/** One project as a clean, normal list row. */
export function ProjectRow({p,i,delay=0}:{p:Project;i:number;delay?:number}){
  return <Reveal delay={delay}><article className="card card-hover flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
    <Mono p={p} i={i}/>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-cyan2">{p.industry}</p>
      <h3 className="mt-1 text-xl font-bold md:text-2xl">{p.name}</h3>
      <p className="mt-2 text-sm text-muted md:text-base">{p.desc}</p>
    </div>
    <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn !min-h-[42px]">Live Preview <ExternalLink size={14}/></a>
      <Link to={`/projects/${p.slug}`} className="btn2 !min-h-[42px]">Details <ArrowUpRight size={14}/></Link>
    </div>
  </article></Reveal>;
}
