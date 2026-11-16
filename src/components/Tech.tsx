import {useEffect,useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {Cloud,Database,LayoutTemplate,Server,Users,LucideIcon} from 'lucide-react';
import {Mark} from './Layout';
import {Head,Reveal} from './ui';

const reduced=()=>typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ------------------------------------------------------------ Rotating word */
export function RotatingWord({words}:{words:string[]}){
  const [i,setI]=useState(0);
  useEffect(()=>{if(reduced())return;const t=setInterval(()=>setI(n=>(n+1)%words.length),2400);return()=>clearInterval(t)},[words.length]);
  return <span className="relative block h-[1.12em] overflow-hidden" aria-live="off">
    <AnimatePresence mode="wait"><motion.span key={words[i]} initial={{y:'100%',opacity:0}} animate={{y:0,opacity:1}} exit={{y:'-100%',opacity:0}} transition={{duration:.45,ease:[.2,.7,.2,1]}} className="gtext absolute inset-x-0 top-0 block whitespace-nowrap">{words[i]}</motion.span></AnimatePresence>
    <span className="sr-only">{words.join(', ')}</span>
  </span>;
}

/* ---------------------------------------------------------------- Orbit hero */
const RING1=[['React','#61DAFB'],['Node.js','#68A063'],['MongoDB','#47A248']];
const RING2=[['TypeScript','#3178C6'],['Express','#cbd5e1'],['PHP','#8892BF'],['MySQL','#00A3D9'],['Tailwind','#38BDF8']];
const pos=(i:number,n:number)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return {left:`${50+50*Math.cos(a)}%`,top:`${50+50*Math.sin(a)}%`}};
const Badge=({t,c,rev}:{t:string;c:string;rev:string})=><span className={`${rev} inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#0d1430]/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur`}><i className="h-2 w-2 rounded-full" style={{background:c,boxShadow:`0 0 8px ${c}`}}/>{t}</span>;

export function StackOrbit(){
  return <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
    <div className="absolute inset-[18%] rounded-full border border-dashed border-white/20"/>
    <div className="absolute inset-[2%] rounded-full border border-dashed border-white/15"/>
    <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-brand/50 to-violet2/50 blur-2xl"/>
    <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-white/20 bg-[#0b1130] shadow-[0_0_60px_rgba(59,108,255,.6)]"><Mark size={56}/></div>
    <div className="orbit absolute inset-[18%]">{RING1.map(([t,c],i)=><span key={t} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(i,RING1.length)}><Badge t={t} c={c} rev="orbit-rev"/></span>)}</div>
    <div className="orbit2 absolute inset-[2%]">{RING2.map(([t,c],i)=><span key={t} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(i,RING2.length)}><Badge t={t} c={c} rev="orbit2-rev"/></span>)}</div>
  </div>;
}

/* ------------------------------------------------------------ Tech marquee */
export function TechMarquee({items}:{items:string[]}){
  const row=[...items,...items];
  return <div className="overflow-hidden border-y py-4" style={{borderColor:'var(--line)',background:'var(--surface)'}} aria-hidden="true">
    <div className="marquee">{row.map((t,i)=><span key={i} className="mx-6 flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-muted"><i className="h-1.5 w-1.5 rounded-full bg-cyan2"/>{t}</span>)}</div>
  </div>;
}

/* ---------------------------------------------------------- Tech explorer */
type Group={k:string;blurb:string;items:string[]};
export const TECH:Group[]=[
  {k:'MERN Stack',blurb:'Full-stack JavaScript: one language from the database to the browser.',items:['MongoDB','Express.js','React','Node.js']},
  {k:'Frontend',blurb:'Fast, responsive interfaces that look right on every screen.',items:['HTML5','CSS3','JavaScript','TypeScript','React','Next.js','Tailwind CSS','Bootstrap','Framer Motion']},
  {k:'Backend',blurb:'Business logic, authentication and APIs your product runs on.',items:['Node.js','Express.js','PHP','Laravel','REST APIs','JWT authentication']},
  {k:'Databases',blurb:'Reliable storage designed around your data.',items:['MongoDB','MySQL','PostgreSQL','Firebase']},
  {k:'Mobile',blurb:'Apps for Android and iOS, native or cross-platform.',items:['React Native','Flutter','Android','iOS']},
  {k:'Desktop',blurb:'Windows software for billing, inventory, records and reports.',items:['Electron','Python','Java','C# / .NET']},
  {k:'Testing & QA',blurb:'Catch bugs before your customers do.',items:['Manual testing','Postman','Jest','Cypress','Selenium']},
  {k:'Hosting & DevOps',blurb:'From domain to live site, set up properly.',items:['Git & GitHub','Netlify','Vercel','cPanel hosting','SSL & DNS','CI/CD']},
  {k:'Design & Tools',blurb:'Design that becomes clean code.',items:['Figma','Design systems','Responsive design','VS Code','Postman']},
];
const MERN_DESC:Record<string,[string,string,string]>={MongoDB:['M','#47A248','Flexible document database'],'Express.js':['E','#cbd5e1','Server framework and REST APIs'],React:['R','#61DAFB','Component-based user interface'],'Node.js':['N','#68A063','JavaScript runtime for the server']};

export function TechExplorer({dark=false}:{dark?:boolean}){
  const [a,setA]=useState(0);const g=TECH[a];
  return <div>
    <div role="tablist" aria-label="Technology groups" className="hscroll flex gap-2 overflow-x-auto pb-2">
      {TECH.map((x,i)=><button key={x.k} role="tab" aria-selected={a===i} onClick={()=>setA(i)} className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${a===i?'border-transparent text-white':dark?'border-white/15 text-white/70 hover:text-white':'text-muted hover:text-fg'}`} style={a===i||dark?undefined:{borderColor:'var(--line)'}}>
        {a===i&&<motion.span layoutId={`tech-pill-${dark?'d':'l'}`} className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-brand to-violet2" transition={{type:'spring',stiffness:380,damping:30}}/>}<span className="relative">{x.k}</span></button>)}
    </div>
    <AnimatePresence mode="wait"><motion.div key={g.k} role="tabpanel" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.25}} className={`mt-6 rounded-3xl border p-6 md:p-8 ${dark?'border-white/10 bg-white/[.04]':'card'}`}>
      <h3 className="font-display text-2xl font-bold md:text-3xl">{g.k}</h3><p className={`mt-1 ${dark?'text-white/65':'text-muted'}`}>{g.blurb}</p>
      {g.k==='MERN Stack'
        ?<div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{g.items.map((t,i)=>{const [l,c,d]=MERN_DESC[t];return <motion.div key={t} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*.08}} className={`rounded-2xl border p-5 ${dark?'border-white/10 bg-white/5':''}`} style={dark?undefined:{borderColor:'var(--line)'}}>
            <span className="grid h-12 w-12 place-items-center rounded-xl font-display text-2xl font-bold" style={{background:`${c}22`,color:c,border:`1px solid ${c}66`}}>{l}</span><p className="mt-3 font-display text-lg font-bold">{t}</p><p className={`text-sm ${dark?'text-white/60':'text-muted'}`}>{d}</p></motion.div>})}</div>
        :<div className="mt-6 flex flex-wrap gap-2.5">{g.items.map((t,i)=><motion.span key={t} initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{delay:i*.05}} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold ${dark?'border-white/15 bg-white/5':''}`} style={dark?undefined:{borderColor:'var(--line)',background:'var(--surface2)'}}><i className="h-2 w-2 rounded-full bg-cyan2"/>{t}</motion.span>)}</div>}
      <p className={`mt-6 text-xs ${dark?'text-white/45':'text-muted'}`}>We choose the technology that fits your goals and budget, not the other way round.</p>
    </motion.div></AnimatePresence>
  </div>;
}

/* ------------------------------------------------------------ Architecture */
const NODES:[LucideIcon,string,string,string][]=[
  [Users,'Your customers','Visitors arrive from a phone, tablet or computer. Everything starts with a clear, fast first screen.','Browser · Mobile'],
  [LayoutTemplate,'React frontend','A responsive interface built with React and Tailwind CSS. It sends requests and shows results instantly.','React · Tailwind'],
  [Server,'Node.js + Express API','Secure business logic: authentication, validation, payments, email and WhatsApp integrations.','Node.js · Express'],
  [Database,'Database','Products, users and orders are stored safely in MongoDB or MySQL and returned to the app.','MongoDB · MySQL'],
  [Cloud,'Hosting & domain','Your domain, SSL, DNS and hosting keep everything online, secure and reachable.','Netlify · Vercel · cPanel'],
];
export function ArchFlow(){
  const [a,setA]=useState(0);const [auto,setAuto]=useState(true);
  useEffect(()=>{if(!auto||reduced())return;const t=setInterval(()=>setA(n=>(n+1)%NODES.length),2600);return()=>clearInterval(t)},[auto]);
  const [I,t,d,s]=NODES[a];
  return <div>
    <div className="flex flex-col md:flex-row md:items-center">
      {NODES.map(([Ic,name],i)=><div key={name} className="contents">
        <button onClick={()=>{setAuto(false);setA(i)}} aria-pressed={a===i} className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition md:flex-col md:gap-2 md:text-center ${a===i?'border-brand bg-brand/15 shadow-[0_0_30px_-8px_rgba(59,108,255,.8)]':'border-white/10 bg-white/[.04] hover:border-white/30'}`}>
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition ${a===i?'bg-gradient-to-br from-brand to-violet2':'bg-white/10'}`}><Ic size={22}/></span>
          <span className="text-sm font-semibold md:max-w-[110px]">{name}</span></button>
        {i<NODES.length-1&&<div aria-hidden="true" className="relative mx-auto h-8 w-0.5 bg-white/15 md:mx-0 md:h-0.5 md:w-auto md:min-w-[24px] md:flex-1">{a===i&&<span className="flow-dot"/>}<div className={`absolute inset-0 origin-left bg-cyan2 transition-transform duration-500 ${a>i?'scale-100':'scale-0'}`}/></div>}
      </div>)}
    </div>
    <AnimatePresence mode="wait"><motion.div key={a} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[.05] p-6 sm:flex-row sm:items-center" aria-live="polite">
      <span className="icon-box !h-14 !w-14"><I size={26}/></span>
      <div className="flex-1"><p className="font-display text-xl font-bold">{t}</p><p className="mt-1 text-white/70">{d}</p></div>
      <span className="chip !border-white/20 !text-white/80 self-start sm:self-center">{s}</span>
    </motion.div></AnimatePresence>
  </div>;
}

export const TechSection=()=><section className="wrap section">
  <Head eyebrow="Technology & tools" title="The full stack, and every tool around it." sub="From MERN stack web apps to desktop software, testing and hosting. Pick a group to see what we work with."/>
  <Reveal className="mt-10"><TechExplorer/></Reveal>
</section>;
