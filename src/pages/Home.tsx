import {Link} from 'react-router-dom';
import {useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowRight,ArrowUpRight,Check,Code2,ExternalLink,Handshake,LifeBuoy,Layers,MessageCircle,Plus,Rocket,ShieldCheck,Gauge,Compass,Wand2} from 'lucide-react';
import Seo from '../components/Seo';
import {services,projects,CO} from '../data';
import {wa} from '../lib/whatsapp';
import {Head,Reveal,ScrollWords,Sec,SplitText} from '../components/ui';
import {ArchFlow,RotatingWord,StackOrbit,TechExplorer,TechMarquee} from '../components/Tech';
import {Photo,ServiceMedia,VideoBg,VideoCard} from '../components/Media';
import {iconFor} from '../components/icons';

const faqs=[
  ['How long does a project take?','It depends on scope. You receive a clear timeline in your quote before anything starts.'],
  ['Do you offer support after launch?','Yes. We offer maintenance, updates, backups and technical support.'],
  ['Can you handle domain and hosting?','Yes, from registration and DNS to SSL and business email setup.'],
  ['How do I get a price?','Use the Request a Quote form, try the Project Planner, or message us on WhatsApp.'],
];
const stages:[string,string][]=[
  ['Discover','We learn your goals, audience and scope, then send a clear quote and timeline.'],
  ['Design','You review layouts and visuals and approve them before development starts.'],
  ['Develop','A responsive build with regular updates, so you always see progress.'],
  ['Launch','Deployment, hosting setup and ongoing support after you go live.'],
];
const why=[
  [Layers,'One partner, end to end','Design, development, hosting and support from a single team.'],
  [Compass,'Clear scope and communication','You know what is being built, when, and why.'],
  [ShieldCheck,'Security-minded engineering','Validated inputs, protected data and safe defaults.'],
  [Gauge,'Built to perform','Responsive layouts and optimized assets from the first line of code.'],
] as const;

function Hero(){
  return <section className="relative isolate overflow-hidden bg-ink text-white">
    <VideoBg className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[.18]"/>
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/60"/>
    <div className="grid-bg absolute inset-0 -z-10 opacity-30"/>
    <div className="glow -left-32 top-20 -z-10 h-96 w-96 bg-brand/30"/>
    <div className="glow -right-24 top-1/2 -z-10 h-96 w-96 bg-violet2/25"/>
    <div className="glow bottom-0 left-1/2 -z-10 h-64 w-[34rem] -translate-x-1/2 bg-cyan2/10"/>
    <div className="wrap grid min-h-[92vh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80"><span className="il-pulse h-2 w-2 rounded-full bg-cyan2"/>{CO.name}</motion.p>
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.08,duration:.7}} className="text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.06]">We build<RotatingWord words={['websites','online stores','mobile apps','MERN applications','desktop software']}/>that grow your business.</motion.h1>
        <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="mt-6 max-w-xl text-lg text-white/70">{CO.tag} We design, build, test and look after your digital presence, from the first idea to a live product with ongoing support.</motion.p>
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.3}} className="mt-9 flex flex-wrap gap-3">
          <Link to="/quote" className="btn">Start a Project <ArrowRight size={16}/></Link>
          <Link to="/services" className="btn2 !border-white/25 !text-white hover:!bg-white/10">Explore Services</Link>
        </motion.div>
        <motion.ul initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}} className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">{['MERN stack','E-commerce','Desktop software','Testing & QA'].map(x=><li key={x} className="flex items-center gap-2"><Check size={14} className="text-cyan2"/>{x}</li>)}</motion.ul>
      </div>
      <motion.div initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{delay:.25,duration:.8}}><StackOrbit/></motion.div>
    </div>
  </section>;
}

function Faq(){
  const [o,setO]=useState<number|null>(0);
  return <ul className="card divide-y overflow-hidden" style={{borderColor:'var(--line)'}}>{faqs.map(([q,a],i)=><li key={q} style={{borderColor:'var(--line)'}}>
    <button aria-expanded={o===i} onClick={()=>setO(o===i?null:i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-lg font-semibold md:text-xl">{q}<motion.span animate={{rotate:o===i?45:0}} className="shrink-0 text-brand"><Plus/></motion.span></button>
    <AnimatePresence initial={false}>{o===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><p className="px-5 pb-5 text-muted">{a}</p></motion.div>}</AnimatePresence>
  </li>)}</ul>;
}

export default function Home(){
  return <>
    <Seo title="Websites, Applications & E-commerce Development" desc="SYVANTA DIGITAL SYSTEMS builds websites, applications, e-commerce and business systems, and supports them after launch." path="/"/>
    <Hero/>

    <TechMarquee items={['React','Node.js','MongoDB','Express.js','TypeScript','Tailwind CSS','PHP','MySQL','Next.js','React Native','Flutter','Cypress','Netlify']}/>

    {/* Statement */}
    <Sec className="!pb-6"><p className="eyebrow">What we believe</p>
      <ScrollWords className="font-display text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl" text="We understand the business problem, design the experience, build it, connect the systems behind it and support it long after launch."/></Sec>

    {/* Introduction */}
    <Sec>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Head eyebrow="About what we do" title="One team for your whole digital presence."/>
        <Reveal delay={.1}>
          <p className="text-lg text-muted">SYVANTA DIGITAL SYSTEMS is a web and software company. We understand the business problem, design the experience, build the website or application, connect the systems behind it and keep supporting it after launch.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">{[[Code2,'Build','Websites, apps and e-commerce.'],[Handshake,'Connect','Payments, APIs, email, WhatsApp.'],[LifeBuoy,'Support','Hosting, updates and care.']].map(([I,t,d])=>{const Ic=I as typeof Code2;return <div key={t as string} className="card p-5"><span className="icon-box"><Ic size={20}/></span><h3 className="mt-4 font-bold">{t as string}</h3><p className="mt-1 text-sm text-muted">{d as string}</p></div>})}</div>
        </Reveal>
      </div>
    </Sec>

    {/* Services */}
    <Sec id="services" className="!pt-0">
      <div className="flex flex-wrap items-end justify-between gap-4"><Head eyebrow="Services" title="Everything you need to build and grow online." sub={`${services.length} focused services for websites, applications and software.`}/><Link to="/services" className="btn2">All services <ArrowRight size={16}/></Link></div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map((s,i)=>{const I=iconFor(s.slug);return <Reveal key={s.slug} delay={(i%4)*.06}>
        <Link to={`/services/${s.slug}`} className="card card-hover shine-border group flex h-full flex-col overflow-hidden">
          <ServiceMedia slug={s.slug} title={s.title} className="aspect-[400/220] w-full"/>
          <div className="flex flex-1 flex-col p-5"><span className="flex items-center gap-2 font-display text-lg font-bold leading-snug"><I size={18} className="shrink-0 text-brand"/>{s.title}</span>
            <p className="mt-2 flex-1 text-sm text-muted">{s.short}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">Learn more <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></span></div>
        </Link></Reveal>})}</div>
    </Sec>

    {/* Technology: explorer + architecture */}
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-bg absolute inset-0 opacity-25"/><div className="glow -right-24 top-10 h-80 w-80 bg-violet2/25"/>
      <div className="wrap section relative">
        <Reveal><p className="eyebrow">Technology & tools</p><h2 className="h2 max-w-3xl">MERN stack, mobile, desktop, testing and hosting.</h2><p className="mt-4 max-w-2xl text-white/65 md:text-lg">The full stack and every tool around it. Pick a group to see what we work with.</p></Reveal>
        <Reveal className="mt-10"><TechExplorer dark/></Reveal>
        <Reveal className="mt-20"><p className="eyebrow">How it fits together</p><h3 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">From your customer's screen to the database and back.</h3><p className="mb-8 mt-3 max-w-2xl text-white/65">A typical web application in five layers. Select any layer to see what happens there.</p><ArchFlow/></Reveal>
      </div>
    </section>

    {/* Video */}
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-bg absolute inset-0 opacity-25"/><div className="glow -left-24 top-10 h-80 w-80 bg-brand/25"/>
      <div className="wrap section relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Watch it come together</p>
          <h2 className="h2"><SplitText text="From a line of code to a *live* website."/></h2>
          <p className="mt-4 max-w-lg text-white/65 md:text-lg">Every project starts as a plan and grows into a responsive, tested and published product. This is what that looks like.</p>
          <ol className="mt-8 space-y-4">{[['Plan','Goals, pages and features agreed up front.'],['Build','Clean React code, written for speed and maintenance.'],['Preview','You see the result take shape and give feedback.'],['Publish','Hosting, domain and SSL set up and live.']].map(([t,d],i)=><Reveal key={t} delay={i*.07}><li className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-violet2 text-sm font-bold">{i+1}</span><div><b>{t}</b><p className="text-sm text-white/60">{d}</p></div></li></Reveal>)}</ol>
        </div>
        <Reveal delay={.1}><VideoCard/></Reveal>
      </div>
    </section>

    {/* Our work: compact list (no screenshots) */}
    <section style={{background:'var(--surface)'}} className="border-y" >
      <div className="wrap section" style={{borderColor:'var(--line)'}}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Head eyebrow="Our work" title="Live websites for real businesses." sub="A few of the projects we have built. Open any of them to see it online."/>
          <Link to="/projects" className="btn2">All projects <ArrowRight size={16}/></Link>
        </div>
        <ul className="mt-10 divide-y" style={{borderColor:'var(--line)'}}>{projects.map((p,i)=><li key={p.slug} style={{borderColor:'var(--line)'}}>
          <Reveal delay={i*.04}><div className="group flex flex-wrap items-center justify-between gap-3 py-5">
            <div className="flex min-w-0 items-center gap-4"><span className="font-display text-sm text-muted">0{i+1}</span>
              <div className="min-w-0"><h3 className="font-display text-xl font-bold md:text-2xl">{p.name}</h3><p className="text-sm text-muted">{p.industry}</p></div></div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn2 !min-h-[40px] !px-4 !text-sm" aria-label={`Live Preview of ${p.name}`}>Live Preview <ExternalLink size={14}/></a>
          </div></Reveal></li>)}</ul>
      </div>
    </section>

    {/* Why */}
    <Sec>
      <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal><div className="relative"><div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand/40 to-violet2/40 blur-2xl"/>
          <Photo k="team" alt="A team collaborating around laptops" className="relative aspect-[4/5] w-full rounded-3xl border border-white/10 shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]"/>
          <div className="float absolute -bottom-5 -right-2 rounded-2xl border bg-[color:var(--surface)] px-5 py-3 shadow-xl sm:-right-5" style={{borderColor:'var(--line)'}}><p className="text-xs font-semibold uppercase tracking-widest text-cyan2">One partner</p><p className="font-display text-lg font-bold">End to end</p></div></div></Reveal>
        <div><Head eyebrow="Why SYVANTA" title="Built with care, delivered with clarity."/>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">{why.map(([I,t,d],i)=><Reveal key={t} delay={i*.07}><div className="h-full border-t-2 border-brand pt-4"><I className="text-cyan2" size={24}/><h3 className="mt-3 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div></Reveal>)}</div></div>
      </div>
    </Sec>

    {/* Process */}
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-bg absolute inset-0 opacity-25"/>
      <div className="wrap section relative">
        <Reveal><p className="eyebrow">Our process</p><h2 className="h2 max-w-3xl">Discover, design, develop, launch.</h2></Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">{stages.map(([t,d],i)=><Reveal key={t} delay={i*.08}><li className="relative h-full rounded-2xl border border-white/10 bg-white/[.04] p-6">
          <span className="gtext font-display text-4xl font-bold">0{i+1}</span><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-white/65">{d}</p></li></Reveal>)}</ol>
      </div>
    </section>

    {/* Tools */}
    <Sec className="!pt-0">
      <div className="grid gap-5 md:grid-cols-2">
        <Link to="/services#finder" className="card card-hover group flex items-center justify-between gap-4 p-7"><div><span className="icon-box mb-4"><Wand2 size={20}/></span><p className="text-xs font-semibold uppercase tracking-widest text-cyan2">Not sure what you need?</p><p className="mt-1 font-display text-2xl font-bold">Use the Service Finder</p></div><ArrowUpRight className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>
        <Link to="/planner" className="card card-hover group flex items-center justify-between gap-4 p-7"><div><span className="icon-box mb-4"><Rocket size={20}/></span><p className="text-xs font-semibold uppercase tracking-widest text-cyan2">Planning a budget?</p><p className="mt-1 font-display text-2xl font-bold">Try the Project Planner</p></div><ArrowUpRight className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>
      </div>
    </Sec>

    {/* FAQ */}
    <section className="wrap max-w-4xl pb-16 md:pb-24"><Head eyebrow="FAQ" title="Questions, answered." center/><div className="mt-10"><Faq/></div></section>

    {/* Final CTA */}
    <section className="wrap pb-16 md:pb-24"><div className="relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-center text-white md:p-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/40 via-ink to-violet2/40"/><div className="grid-bg absolute inset-0 -z-10 opacity-30"/>
      <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Have an idea? Let's make it real.</h2>
      <p className="mx-auto mt-4 max-w-xl text-white/75">Tell us about your project. We will reply with next steps.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/quote" className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-7 text-[.95rem] font-semibold text-ink transition hover:bg-white/90">Start Your Project <ArrowRight size={16}/></Link>
        <a href={wa('Hello SYVANTA DIGITAL SYSTEMS, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="btn2 !min-h-[48px] !border-white/35 !px-7 !text-white hover:!bg-white/10"><MessageCircle size={16}/>WhatsApp Us</a>
      </div>
    </div></section>
  </>;
}
