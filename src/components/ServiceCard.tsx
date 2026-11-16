import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import type {Service} from '../data';
import {ServiceMedia} from './Media';

/** Service card with animated illustration on top. */
export default function ServiceCard({s,i}:{s:Service;i:number}){
  return <article className="card card-hover shine-border group flex h-full flex-col overflow-hidden">
    <Link to={`/services/${s.slug}`} aria-label={`${s.title}: details`} className="relative block overflow-hidden">
      <ServiceMedia slug={s.slug} title={s.title} className="aspect-[400/260] w-full"/>
      <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">0{i+1}</span>
    </Link>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="font-display text-xl font-bold leading-snug">{s.title}</h3>
      <p className="mt-2 text-sm text-muted">{s.short}</p>
      <p className="mt-4 flex flex-wrap gap-1.5">{s.items.slice(0,3).map(t=><span key={t} className="chip !text-[11px]">{t}</span>)}<span className="chip !text-[11px] text-muted">+{s.items.length-3} more</span></p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Link to={`/quote?service=${s.slug}`} className="btn !min-h-[40px] !px-4 !text-sm">Request a Quote <ArrowRight size={14}/></Link>
        <Link to={`/services/${s.slug}`} className="btn2 !min-h-[40px] !px-4 !text-sm">Details <ArrowUpRight size={14}/></Link>
      </div>
    </div>
  </article>;
}
