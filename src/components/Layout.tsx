import {Link,useLocation} from 'react-router-dom';
import {useEffect,useState,ReactNode} from 'react';
import {motion,AnimatePresence,useScroll,useSpring} from 'framer-motion';
import {Menu,X,Sun,Moon,MessageCircle,ArrowUpRight,Mail,Phone} from 'lucide-react';
import {CO,services,socials} from '../data';
import {wa,telLink} from '../lib/whatsapp';

export const links:[string,string][]=[['/','Home'],['/about','About'],['/services','Services'],['/projects','Projects'],['/careers','Careers'],['/earn','Earn With Us'],['/contact','Contact']];

export const Mark=({size=36}:{size?:number})=><svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lgm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3B6CFF"/><stop offset=".6" stopColor="#8B5CF6"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs><path d="M24 3l18 10.5v21L24 45 6 34.5v-21z" fill="url(#lgm)"/><path d="M31 17H21a4.5 4.5 0 0 0 0 9h6a4.5 4.5 0 0 1 0 9H17" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/></svg>;

export const Logo=()=><Link to="/" aria-label="SYVANTA DIGITAL SYSTEMS home" className="flex items-center gap-2.5">
  <Mark/><span className="leading-none"><b className="block text-[1.05rem] font-bold tracking-[.18em]">SYVANTA</b><span className="text-[9px] tracking-[.34em] text-muted">DIGITAL SYSTEMS</span></span>
</Link>;

function Progress(){
  const {scrollYProgress}=useScroll();const s=useSpring(scrollYProgress,{stiffness:120,damping:30});
  return <motion.div aria-hidden="true" style={{scaleX:s}} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-cyan2 to-violet2"/>;
}

export default function Layout({children}:{children:ReactNode}){
  const loc=useLocation();
  const [open,setOpen]=useState(false);
  const [dark,setDark]=useState(()=>{try{return localStorage.getItem('theme')!=='light'}catch{return true}});

  useEffect(()=>{
    document.documentElement.classList.toggle('dark',dark);
    try{localStorage.setItem('theme',dark?'dark':'light')}catch{/* storage unavailable */}
  },[dark]);
  useEffect(()=>setOpen(false),[loc.pathname]);
  useEffect(()=>{document.body.style.overflow=open?'hidden':''},[open]);

  const isActive=(to:string)=>to==='/'?loc.pathname==='/':loc.pathname.startsWith(to);

  return <div className="min-h-screen">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
    <Progress/>
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav aria-label="Main" className="glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-2.5 shadow-lg shadow-black/10">
        <Logo/>
        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map(([to,t])=><li key={to}><Link to={to} aria-current={isActive(to)?'page':undefined} className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition ${isActive(to)?'text-fg':'text-muted hover:text-fg'}`}>
            {isActive(to)&&<motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-brand/15 ring-1 ring-brand/30" transition={{type:'spring',stiffness:380,damping:30}}/>}{t}
          </Link></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <button aria-label={dark?'Switch to light theme':'Switch to dark theme'} onClick={()=>setDark(!dark)} className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-slate-500/15">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
          <Link to="/quote" className="btn hidden !min-h-[42px] xl:inline-flex">Get a Quote <ArrowUpRight size={16}/></Link>
          <button className="grid h-11 w-11 place-items-center rounded-full xl:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
        </div>
      </nav>
      <AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} className="glass mx-auto mt-2 max-h-[calc(100vh-6rem)] max-w-6xl overflow-y-auto rounded-2xl p-3 xl:hidden">
        <ul>{links.map(([to,t],i)=><motion.li key={to} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.03}}>
          <Link to={to} className={`flex min-h-[48px] items-center rounded-xl px-4 font-medium ${isActive(to)?'bg-brand/15 text-brand':''}`}>{t}</Link></motion.li>)}</ul>
        <Link to="/quote" className="btn mt-2 w-full">Get a Quote <ArrowUpRight size={16}/></Link>
      </motion.div>}</AnimatePresence>
    </header>

    <main id="main" className={loc.pathname==='/'?'':'pt-24'}>{children}</main>

    <a href={wa('Hello SYVANTA DIGITAL SYSTEMS, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition hover:scale-110"><MessageCircle/></a>

    <footer className="relative mt-10 overflow-hidden border-t" style={{borderColor:'var(--line)',background:'var(--surface)'}}>
      <div className="glow -bottom-32 left-1/3 h-64 w-96 bg-brand/15"/>
      <div className="wrap relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr_1.1fr]">
        <div>
          <Logo/>
          <p className="mt-4 text-sm font-semibold">{CO.tag}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">We design and build websites and applications, and support them after launch: hosting, SEO, performance and integrations.</p>
          {socials.length>0&&<div className="mt-4 flex gap-3">{socials.map(s=><a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-brand">{s.name}</a>)}</div>}
        </div>
        <div><h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Company</h3>
          {[...links,['/planner','Project Planner'] as [string,string]].map(([to,t])=><Link key={to} to={to} className="block py-1.5 text-sm text-muted transition hover:text-brand">{t}</Link>)}</div>
        <div><h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Services</h3>
          {services.slice(0,8).map(s=><Link key={s.slug} to={`/services/${s.slug}`} className="block py-1.5 text-sm text-muted transition hover:text-brand">{s.title}</Link>)}<Link to="/services" className="block py-1.5 text-sm font-semibold text-brand">All {services.length} services →</Link></div>
        <div><h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Contact</h3>
          <a className="flex items-center gap-2 py-1.5 text-sm text-muted transition hover:text-brand" href={`mailto:${CO.email}`}><Mail size={15}/><span className="break-all">{CO.email}</span></a>
          <a className="flex items-center gap-2 py-1.5 text-sm text-muted transition hover:text-brand" href={telLink}><Phone size={15}/>{CO.phone}</a>
          <a className="flex items-center gap-2 py-1.5 text-sm text-muted transition hover:text-brand" target="_blank" rel="noopener noreferrer" href={wa('Hello SYVANTA DIGITAL SYSTEMS')}><MessageCircle size={15}/>WhatsApp</a>
          <Link to="/quote" className="btn mt-4 !min-h-[42px]">Get a Quote</Link></div>
      </div>
      <p className="relative border-t py-5 text-center text-xs text-muted" style={{borderColor:'var(--line)'}}>© {new Date().getFullYear()} SYVANTA DIGITAL SYSTEMS. All rights reserved.</p>
    </footer>
  </div>;
}
