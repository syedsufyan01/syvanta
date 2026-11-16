import {Link,useParams} from 'react-router-dom';
import {useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowLeft,ArrowRight,Check,ExternalLink,MessageCircle} from 'lucide-react';
import Seo from '../components/Seo';
import {services,projects,CO,Cat,SERVICE_GROUPS,ServiceCat} from '../data';
import {wa} from '../lib/whatsapp';
import {Head,Reveal,Sec} from '../components/ui';
import PageHero from '../components/PageHero';
import FounderProfile from '../components/FounderProfile';
import {ServiceFinder} from '../components/ServiceTools';
import {ProjectRow,Mono} from '../components/ProjectCards';
import {iconFor} from '../components/icons';
import {ServiceMedia,Photo} from '../components/Media';
import ServiceCard from '../components/ServiceCard';
import {TechSection} from '../components/Tech';

const Band=({title,sub}:{title:string;sub?:string})=><section className="wrap pb-16 md:pb-24">
  <div className="relative isolate flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-12">
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/50 via-ink to-violet2/40"/><div className="grid-bg absolute inset-0 -z-10 opacity-25"/>
    <div><h2 className="text-2xl font-bold md:text-4xl">{title}</h2>{sub&&<p className="mt-2 text-white/75">{sub}</p>}</div>
    <Link to="/quote" className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 font-semibold text-ink transition hover:bg-white/90">Request a Quote <ArrowRight size={18}/></Link>
  </div></section>;

const process:[string,string][]=[['Discover','We learn your goals and scope.'],['Design','We agree on the approach and visuals.'],['Develop','We build and share progress.'],['Launch','We go live and keep supporting you.']];

export function About(){
  const values=[['Quality','Careful design and clean, maintainable code.'],['Honesty','Clear scope, timelines and communication.'],['Security','Safe defaults and protected data.'],['Reliability','Support that continues after launch.']];
  return <>
    <Seo title="About Us" desc="Learn about SYVANTA DIGITAL SYSTEMS: our mission, values, approach and founder." path="/about"/>
    <PageHero eyebrow="About SYVANTA" title="Strategy, creativity and technology, working as one." sub={CO.tag} aside={<div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-brand/20"><Photo k="team" alt="A team collaborating around laptops" className="aspect-[4/3] w-full"/></div>}/>
    <Sec><div className="grid gap-10 md:grid-cols-2">
      <Reveal><h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">We help businesses show up, stand out and grow online.</h2></Reveal>
      <Reveal delay={.1}><p className="text-lg text-muted">SYVANTA DIGITAL SYSTEMS is a software and web company led by founder Syed Sufyan Ahmed. We design and build websites and applications, and look after everything around them: domains, hosting, SEO, performance and integrations.</p><p className="mt-4 text-muted">Our approach is simple: understand the goal, choose the right technology, build it cleanly and keep supporting it.</p></Reveal>
    </div></Sec>

    <section className="wrap grid gap-5 md:grid-cols-2">
      <Reveal><div className="relative isolate h-full overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-12"><div className="grid-bg absolute inset-0 -z-10 opacity-30"/><p className="eyebrow">Our mission</p><p className="font-display text-2xl font-semibold leading-snug md:text-3xl">To deliver reliable, modern digital solutions that help businesses grow.</p></div></Reveal>
      <Reveal delay={.08}><div className="h-full rounded-3xl bg-gradient-to-br from-brand to-violet2 p-8 text-white md:p-12"><p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-white/75">Our vision</p><p className="font-display text-2xl font-semibold leading-snug md:text-3xl">To be a trusted digital partner for businesses at every stage of their journey.</p></div></Reveal>
    </section>

    <Sec><Head eyebrow="Values" title="What we stand for."/>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map(([t,d],i)=><Reveal key={t} delay={i*.06}><div className="h-full border-t-2 border-brand pt-5"><span className="gtext font-display text-3xl font-bold">0{i+1}</span><h3 className="mt-2 text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div></Reveal>)}</div></Sec>

    <Sec className="!pt-0"><Head eyebrow="Approach" title="How we work."/>
      <ol className="mt-10 grid gap-5 md:grid-cols-4">{process.map(([t,d],i)=><Reveal key={t} delay={i*.06}><li className="card h-full p-6"><span className="gtext font-display text-3xl font-bold">0{i+1}</span><h3 className="mt-2 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li></Reveal>)}</ol></Sec>

    <TechSection/>
    <Sec className="!pt-0"><Head eyebrow="Capabilities" title="Services we offer." sub="Each service is delivered by the same team, from first call to launch and support."/>
      <div className="mt-8 flex flex-wrap gap-3">{services.map(s=><Link key={s.slug} to={`/services/${s.slug}`} className="chip !px-5 !py-2.5 !text-sm font-semibold transition hover:border-brand hover:text-brand">{s.title}</Link>)}</div></Sec>

    <FounderProfile/>
    <Band title="Have a project in mind?" sub="Let's talk about what you want to build."/>
  </>;
}

export function Services(){
  const [g,setG]=useState<ServiceCat|'all'>('all');
  const list=services.filter(x=>g==='all'||x.cat===g);
  return <>
    <Seo title="Our Services" desc="Website development, e-commerce, MERN stack, applications, desktop software, testing, hosting, SEO and more." path="/services"/>
    <PageHero eyebrow="Services" title="Everything you need to build and grow online." sub={`${services.length} focused services across websites, applications and software. Not sure which one fits? Use the finder below.`}/>
    <Sec>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter services">{SERVICE_GROUPS.map(([k,t])=><button key={k} onClick={()=>setG(k)} aria-pressed={g===k} className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold transition ${g===k?'border-brand bg-brand text-white':'hover:border-brand'}`} style={g===k?undefined:{borderColor:'var(--line)'}}>{t} <span className="opacity-70">({k==='all'?services.length:services.filter(x=>x.cat===k).length})</span></button>)}</div>
      <AnimatePresence mode="wait"><motion.div key={g} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map(x=><ServiceCard key={x.slug} s={x} i={services.indexOf(x)}/>)}</motion.div></AnimatePresence>
    </Sec>
    <TechSection/>
    <ServiceFinder/>
    <Band title="Ready to talk about your project?" sub="Tell us your goal and we will suggest the right path."/>
  </>;
}

export function ServiceDetail(){
  const {slug}=useParams();
  const i=services.findIndex(x=>x.slug===slug);
  if(i<0)return <NotFound/>;
  const s=services[i];const I=iconFor(s.slug);
  const related=services.filter(x=>x.slug!==s.slug&&x.cat===s.cat).concat(services.filter(x=>x.slug!==s.slug&&x.cat!==s.cat)).slice(0,3);
  return <>
    <Seo title={s.title} desc={s.intro} path={`/services/${s.slug}`}/>
    <PageHero eyebrow={`Service 0${i+1}`} title={s.title} sub={s.intro} aside={<div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-brand/20"><ServiceMedia slug={s.slug} title={s.title} className="aspect-[400/260] w-full"/></div>}>
      <Link to={`/quote?service=${s.slug}`} className="btn">Request a Quote <ArrowRight size={16}/></Link>
      <a className="btn2 !border-white/25 !text-white hover:!bg-white/10" target="_blank" rel="noopener noreferrer" href={wa(`Hello SYVANTA DIGITAL SYSTEMS, I would like to discuss ${s.title}.`)}><MessageCircle size={18}/>WhatsApp inquiry</a>
    </PageHero>
    <Sec><div className="grid gap-5 md:grid-cols-3">{[['The problem',s.problem],['What we build',s.build],['Who it is for',s.who]].map(([t,d],n)=><Reveal key={t} delay={n*.07}><div className="card h-full p-6"><span className="icon-box"><I size={20}/></span><h2 className="mt-4 text-lg font-bold">{t}</h2><p className="mt-2 text-sm text-muted">{d}</p></div></Reveal>)}</div></Sec>
    <Sec className="!pt-0"><Head eyebrow="Deliverables" title="What you get."/>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{s.items.map(x=><Reveal key={x}><div className="card flex items-center gap-3 p-4"><Check className="shrink-0 text-cyan2" size={18}/><span className="font-semibold">{x}</span></div></Reveal>)}</div></Sec>
    <Sec className="!pt-0"><Head eyebrow="Benefits" title="Why it matters."/>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{s.benefits.map((b,n)=><Reveal key={b} delay={n*.08}><div className="border-l-2 border-brand pl-5"><p className="text-xl font-semibold">{b}</p></div></Reveal>)}</div></Sec>
    <Sec className="!pt-0"><Head eyebrow="Process" title="From first call to launch."/>
      <ol className="mt-8 grid gap-4 md:grid-cols-4">{process.map(([t,d],n)=><li key={t} className="card p-5"><span className="gtext font-display text-3xl font-bold">0{n+1}</span><p className="mt-1 text-lg font-semibold">{t}</p><p className="mt-1 text-sm text-muted">{d}</p></li>)}</ol></Sec>
    <Sec className="!pt-0"><Head eyebrow="Related" title="Related services."/>
      <div className="mt-8 grid gap-4 md:grid-cols-3">{related.map(r=>{const RI=iconFor(r.slug);return <Link key={r.slug} to={`/services/${r.slug}`} className="card card-hover group overflow-hidden"><ServiceMedia slug={r.slug} title={r.title} className="aspect-[400/200] w-full"/><div className="p-5"><span className="flex items-center gap-2 text-lg font-bold"><RI size={18} className="text-brand"/>{r.title}</span><p className="mt-1 text-sm text-muted">{r.short}</p></div></Link>})}</div></Sec>
    <Band title={`Ready to start with ${s.title.toLowerCase()}?`}/>
  </>;
}

export function Projects(){
  const [c,setC]=useState<string>('All');
  const cats=(['E-commerce','Websites','Web Applications','Business Solutions'] as Cat[]).filter(x=>projects.some(p=>p.categories.includes(x)));
  const list=projects.filter(p=>c==='All'||p.categories.includes(c as Cat));
  return <>
    <Seo title="Projects" desc="Selected work by SYVANTA DIGITAL SYSTEMS: live websites for different industries." path="/projects"/>
    <PageHero eyebrow="Our work" title="Projects we have built." sub="Live websites created for different industries and business needs. Open any of them to see it online."/>
    <Sec>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">{['All',...cats].map(x=><button key={x} onClick={()=>setC(x)} aria-pressed={c===x} className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold transition ${c===x?'border-brand bg-brand text-white':'hover:border-brand'}`} style={c===x?undefined:{borderColor:'var(--line)'}}>{x==='All'?`All (${projects.length})`:`${x} (${projects.filter(p=>p.categories.includes(x as Cat)).length})`}</button>)}</div>
      <AnimatePresence mode="wait"><motion.div key={c} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">{list.map((p,i)=><ProjectRow key={p.slug} p={p} i={projects.indexOf(p)} delay={i*.04}/>)}</motion.div></AnimatePresence>
    </Sec>
    <Band title="Have a project like these in mind?" sub="Let's make your idea a live, working website."/>
  </>;
}

export function ProjectDetail(){
  const {slug}=useParams();
  const i=projects.findIndex(x=>x.slug===slug);
  if(i<0)return <NotFound/>;
  const p=projects[i];const next=projects[(i+1)%projects.length];
  return <>
    <Seo title={p.name} desc={p.desc} path={`/projects/${p.slug}`}/>
    <section className="relative isolate -mt-24 overflow-hidden bg-ink pt-24 text-white">
      <div className="grid-bg absolute inset-0 -z-10 opacity-40"/><div className="glow -right-20 top-10 -z-10 h-72 w-72 bg-brand/30"/>
      <div className="wrap py-12 md:py-20">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan2"><ArrowLeft size={14}/>Back to projects</Link>
        <div className="mt-8 flex flex-wrap items-center gap-5"><Mono p={p} i={i} size="h-20 w-20 text-2xl"/><div><p className="eyebrow !mb-1">{p.industry}</p><h1 className="text-4xl font-bold leading-tight md:text-6xl">{p.name}</h1></div></div>
        <p className="mt-6 max-w-2xl text-lg text-white/70">{p.desc}</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href={p.url} target="_blank" rel="noopener noreferrer" className="btn">Live Preview <ExternalLink size={14}/></a><Link to="/quote" className="btn2 !border-white/25 !text-white hover:!bg-white/10">Start a similar project</Link></div>
      </div>
    </section>
    <Sec><dl className="grid gap-5 md:grid-cols-3">
      <div className="card p-6"><dt className="text-xs font-semibold uppercase tracking-widest text-cyan2">Industry</dt><dd className="mt-2 text-lg font-semibold">{p.industry}</dd></div>
      <div className="card p-6"><dt className="text-xs font-semibold uppercase tracking-widest text-cyan2">Categories</dt><dd className="mt-3 flex flex-wrap gap-2">{p.categories.map(c=><span key={c} className="chip">{c}</span>)}</dd></div>
      <div className="card p-6"><dt className="text-xs font-semibold uppercase tracking-widest text-cyan2">About</dt><dd className="mt-2 text-muted">{p.desc}</dd></div>
    </dl></Sec>
    <Link to={`/projects/${next.slug}`} className="group block border-y" style={{borderColor:'var(--line)'}}><div className="wrap flex items-center justify-between gap-4 py-10"><div><p className="eyebrow">Next project</p><p className="font-display text-3xl font-bold md:text-4xl">{next.name}</p></div><ArrowRight size={36} className="shrink-0 transition group-hover:translate-x-2"/></div></Link>
    <div className="pt-16"><Band title="Want a website like this?" sub="Tell us about your business and we will plan it together."/></div>
  </>;
}

export const NotFound=()=><Sec className="text-center"><p className="eyebrow">Error 404</p><h1 className="h2 mx-auto">Page not found</h1><p className="lead mx-auto">The page you are looking for does not exist or has moved.</p><Link to="/" className="btn mt-8">Go Home</Link></Sec>;
