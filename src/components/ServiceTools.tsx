import {Link} from 'react-router-dom';
import {useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowRight,Check,MessageCircle} from 'lucide-react';
import {services} from '../data';
import {wa} from '../lib/whatsapp';
import {Head} from './ui';

const q=(slug:string,type:string)=>`/quote?${slug?`service=${slug}&`:''}type=${encodeURIComponent(type)}`;
const OPTS=[
  {k:'Business Website',slug:'website-development',type:'Website',stack:'React · Tailwind CSS · SEO setup',why:'A professional website puts your business online with clear services and easy ways for customers to contact you.'},
  {k:'Online Store',slug:'ecommerce-development',type:'E-commerce',stack:'React · Node.js · MongoDB · payment gateway',why:'An online store needs a product catalogue, cart, checkout and payments, plus a simple admin panel to manage orders.'},
  {k:'Custom Web Platform',slug:'mern-stack',type:'Business Solution',stack:'MongoDB · Express · React · Node.js',why:'A full-stack MERN application gives you user accounts, dashboards and APIs built exactly around your workflow.'},
  {k:'Mobile Application',slug:'application-development',type:'Application',stack:'React Native / Flutter · Node.js API',why:'A mobile app gives customers or your team a focused experience on their phones, on Android, iOS or both.'},
  {k:'Desktop Software',slug:'desktop-software',type:'Desktop Software',stack:'Desktop app · local or networked database',why:'Desktop software suits billing, inventory and records work where speed and a simple interface matter most.'},
  {k:'Test My Software',slug:'software-testing',type:'Other',stack:'Manual testing · Postman · Cypress',why:'Structured testing finds bugs and layout problems before your customers do, with clear reports for every issue.'},
  {k:'Website Redesign',slug:'redesign-upgrades',type:'Website',stack:'Figma · React · responsive design',why:'A redesign refreshes the look, improves usability on phones and adds the features your current site lacks.'},
  {k:'Not Sure Yet',slug:'',type:'Other',stack:'We will recommend one after a short chat',why:'No problem. Tell us your goal and we will suggest the right path, or try the Project Planner to shape your idea.'},
];

export function ServiceFinder(){
  const [i,setI]=useState<number|null>(null);
  const o=i===null?null:OPTS[i];
  const s=o?services.find(x=>x.slug===o.slug):null;
  return <section id="finder" className="wrap section scroll-mt-24">
    <Head eyebrow="Service finder" title="What are you looking to build?" sub="Pick the closest option and we will point you to the right service."/>
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="What are you looking to build?">
      {OPTS.map((x,n)=><button key={x.k} role="radio" aria-checked={i===n} onClick={()=>setI(n)} className={`card flex min-h-[72px] items-center justify-between gap-3 px-5 py-4 text-left font-display text-lg font-bold ${i===n?'!border-brand !bg-brand/10':'card-hover'}`}>{x.k}{i===n&&<Check size={18} className="text-brand"/>}</button>)}
    </div>
    <div aria-live="polite"><AnimatePresence mode="wait">{o&&<motion.div key={o.k} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="card mt-6 grid gap-6 p-6 md:grid-cols-2 md:p-8">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-cyan2">Recommended</p><h3 className="mt-2 text-2xl font-bold md:text-3xl">{s?s.title:"Let's talk first"}</h3><p className="mt-3 text-muted">{o.why}</p><p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2 text-sm" style={{borderColor:'var(--line)'}}><b className="text-cyan2">Suggested stack:</b> {o.stack}</p></div>
      <div>{s&&<ul className="mb-5 space-y-1.5">{s.items.slice(0,4).map(t=><li key={t} className="flex gap-2 text-sm"><Check size={15} className="mt-0.5 shrink-0 text-cyan2"/>{t}</li>)}</ul>}
        <div className="flex flex-wrap gap-3">
          <Link to={q(o.slug,o.type)} className="btn">Request a Quote <ArrowRight size={14}/></Link>
          {s&&<Link to={`/services/${s.slug}`} className="btn2">View service</Link>}
          {!s&&<Link to="/planner" className="btn2">Project Planner</Link>}
          <a className="btn2" target="_blank" rel="noopener noreferrer" href={wa(`Hello SYVANTA DIGITAL SYSTEMS, I am looking for: ${o.k}.`)}><MessageCircle size={14}/>WhatsApp</a>
        </div></div>
    </motion.div>}</AnimatePresence></div>
  </section>;
}
