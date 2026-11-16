import {useState,ReactNode} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,Briefcase,Check,Inbox,Mail,MessageCircle,Phone,Users,Wallet,LucideIcon} from 'lucide-react';
import Seo from '../components/Seo';
import SmartForm,{FieldDef} from '../components/forms/SmartForm';
import MultiStep,{Step} from '../components/forms/MultiStep';
import {services,jobs,CO} from '../data';
import {wa,telLink} from '../lib/whatsapp';
import {Head,Reveal,Sec} from '../components/ui';
import PageHero from '../components/PageHero';
import {Photo} from '../components/Media';

const svc=services.map(s=>s.title);
const EXP=['Student / Fresher','Entry level','1–3 years','3+ years'];

const Li=({children}:{children:ReactNode})=><li className="flex gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-cyan2"/><span>{children}</span></li>;
const Steps=({items}:{items:[string,string][]})=><ol className="space-y-5">{items.map(([t,d],i)=><li key={t} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-violet2 font-bold text-white">{i+1}</span><div><b>{t}</b><p className="text-sm text-muted">{d}</p></div></li>)}</ol>;

/* ---------------------------------------------------------------- Contact */
const KINDS=[
  {k:'General inquiry',intro:'I would like to make an inquiry.',closing:'Please contact me regarding this inquiry.',subject:'Website inquiry'},
  {k:'New project',intro:'I would like to discuss a new project.',closing:'Please contact me regarding this project.',subject:'New project inquiry'},
  {k:'Sales Partner',intro:'I would like to ask about the Sales Partner Program.',closing:'Please contact me with more information.',subject:'Sales Partner inquiry'},
  {k:'Careers',intro:'I would like to ask about career opportunities.',closing:'Please contact me with more information.',subject:'Career inquiry'},
  {k:'Support',intro:'I need support for my website or application.',closing:'Please contact me about this support request.',subject:'Support request'},
];

export function Contact(){
  const [ki,setKi]=useState(0);const K=KINDS[ki];
  const cards:{I:LucideIcon;t:string;v:string;cta:string;h:string;ext:boolean;tone:string}[]=[
    {I:MessageCircle,t:'WhatsApp',v:CO.phone,cta:'Chat on WhatsApp',h:wa(`Hello SYVANTA DIGITAL SYSTEMS, ${K.intro}`),ext:true,tone:'from-green-500 to-emerald-500'},
    {I:Mail,t:'Email',v:CO.email,cta:'Send an email',h:`mailto:${CO.email}?subject=${encodeURIComponent(K.subject)}`,ext:false,tone:'from-brand to-violet2'},
    {I:Phone,t:'Phone',v:CO.phone,cta:'Call now',h:telLink,ext:false,tone:'from-cyan-500 to-blue-500'},
  ];
  const routes:[LucideIcon,string,string,string][]=[
    [Briefcase,'Start a project','Describe your goals in a guided quote form.','/quote'],
    [Wallet,'Become a sales partner','Learn how the partner program works and apply.','/earn'],
    [Users,'Join our team','See the roles we hire for and apply.','/careers'],
  ];
  const f:FieldDef[]=[
    {name:'name',label:'Full Name',placeholder:'Your name'},
    {name:'email',label:'Email',type:'email',placeholder:'you@example.com'},
    {name:'phone',label:'Phone Number',type:'tel',optional:true,placeholder:'+92 3XX XXXXXXX'},
    {name:'service',label:'Service Interested In',type:'select',options:svc,optional:true},
    {name:'message',label:'Message',type:'textarea',placeholder:'Tell us a little about what you need…'},
  ];
  return <>
    <Seo title="Contact Us" desc="Get in touch with SYVANTA DIGITAL SYSTEMS by WhatsApp, email or phone." path="/contact"/>
    <PageHero eyebrow="Contact" title="Let's talk about your project." sub="Reach us on the channel you prefer, or send a message below. We reply with clear next steps." aside={<div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-brand/20"><Photo k="office" alt="A modern office workspace" className="aspect-[4/3] w-full"/></div>}/>

    <Sec className="!pb-8"><div className="grid gap-5 md:grid-cols-3">{cards.map((c,i)=><Reveal key={c.t} delay={i*.07}>
      <div className="card card-hover flex h-full flex-col p-6">
        <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white ${c.tone}`}><c.I size={22}/></span>
        <h2 className="mt-4 text-lg font-bold">{c.t}</h2>
        <p className="mt-1 break-words text-muted">{c.v}</p>
        <a href={c.h} target={c.ext?'_blank':undefined} rel="noopener noreferrer" className="btn2 mt-5 w-full">{c.cta} <ArrowUpRight size={16}/></a>
      </div></Reveal>)}</div></Sec>

    <section className="wrap grid gap-10 pb-16 md:pb-24 lg:grid-cols-[.8fr_1.2fr]">
      <div className="space-y-6">
        <Reveal><div className="relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-white"><div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/40 via-ink to-violet2/30"/>
          <p className="eyebrow">Business inquiries</p><h2 className="text-2xl font-bold">Partnerships, proposals and project discussions.</h2><p className="mt-3 text-sm text-white/70">Tell us what you are planning and we will suggest the right next step.</p>
          <Link to="/quote" className="btn mt-6">Request a Quote <ArrowRight size={16}/></Link></div></Reveal>
        <div className="space-y-3">{routes.map(([I,t,d,to],i)=><Reveal key={t} delay={i*.06}><Link to={to} className="card card-hover group flex items-center gap-4 p-4">
          <span className="icon-box"><I size={20}/></span><span className="min-w-0 flex-1"><b className="block">{t}</b><span className="text-sm text-muted">{d}</span></span>
          <ArrowUpRight className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link></Reveal>)}</div>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Send us a message</h2>
        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-widest text-cyan2">What can we help you with?</p>
        <div role="radiogroup" aria-label="Inquiry type" className="mb-5 flex flex-wrap gap-2">{KINDS.map((x,n)=><button key={x.k} role="radio" aria-checked={ki===n} onClick={()=>setKi(n)} className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold transition ${ki===n?'border-brand bg-brand text-white':'hover:border-brand'}`} style={ki===n?undefined:{borderColor:'var(--line)'}}>{x.k}</button>)}</div>
        <SmartForm netlify="contact" submitLabel="Send message" extra={{inquiry_type:K.k}} okText="Thank you! Your message was sent. We will get back to you soon." fields={f} consent="I agree that SYVANTA DIGITAL SYSTEMS may use these details to respond to my inquiry." intro={`Inquiry type: ${K.k}. ${K.intro}`} closing={K.closing} emailSubject={K.subject}/>
      </div>
    </section>
  </>;
}

/* ------------------------------------------------------------------ Quote */
export function Quote(){
  const [p]=useSearchParams();
  const def=services.find(s=>s.slug===p.get('service'))?.title;
  const preset:Record<string,string>={};
  if(def)preset.service=def;
  const t=p.get('type');if(t)preset.projectType=t;
  const b=p.get('budget');if(b)preset.budget=b;
  const tl=p.get('timeline');if(tl)preset.timeline=tl;
  const ex=p.get('extra');if(ex)preset.extra=ex;
  const steps:Step[]=[
    {title:'About you',blurb:'Tell us who we are speaking with.',fields:[{name:'name',label:'Full Name'},{name:'business',label:'Business Name',optional:true},{name:'email',label:'Email',type:'email'},{name:'phone',label:'Phone / WhatsApp',type:'tel'}]},
    {title:'Project type',blurb:'What kind of project is it?',fields:[{name:'projectType',label:'Project Type',type:'cards',options:['Website','Application','E-commerce','Desktop Software','Business Solution','Other']},{name:'service',label:'Related Service',type:'select',options:svc,optional:true}]},
    {title:'Requirements',blurb:'Helps us prepare a realistic quote.',fields:[{name:'message',label:'Project Description',type:'textarea',placeholder:'Goals, features, audience, examples you like…'},{name:'budget',label:'Estimated Budget',optional:true,placeholder:'e.g. PKR 100,000 or $500'},{name:'timeline',label:'Expected Timeline',type:'cards',options:['As soon as possible','Within 1 month','1–3 months','Flexible']},{name:'extra',label:'Additional Requirements',type:'textarea',optional:true}]},
  ];
  return <>
    <Seo title="Request a Quote" desc="Request a quote for your website or application project." path="/quote"/>
    <section className="wrap section !pt-6 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Request a quote</p>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">Let's discuss your next big idea.</h1>
        <p className="lead">Share a few details about your project and we will come back with a tailored quote and a proposed plan.</p>
        <h2 className="mb-4 mt-10 text-lg font-bold">What happens next</h2>
        <Steps items={[['You send the details','Submit the form, or send it through WhatsApp or email.'],['We review your request','We look at scope, goals and timeline.'],['We reply with next steps','You get a tailored quote and a proposed plan.']]}/>
        <p className="mt-8 text-sm text-muted">Not ready for a quote? Shape your idea first with the <Link to="/planner" className="font-semibold text-brand underline">Project Planner</Link>.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn2 !min-h-[42px]" href={`mailto:${CO.email}`}><Mail size={16}/>Email us</a>
          <a className="btn2 !min-h-[42px]" href={telLink}><Phone size={16}/>Call us</a>
        </div>
      </div>
      <MultiStep steps={steps} preset={Object.keys(preset).length?preset:undefined} consent="I agree that SYVANTA DIGITAL SYSTEMS may use these details to prepare a quote." intro="I would like to request a project quotation." closing="Please contact me regarding this project." emailSubject="Project quote request" netlify="quote" okText="Thank you! Your quote request was submitted. We will review it and get back to you."/>
    </section>
  </>;
}

/* ---------------------------------------------------------------- Careers */
const TRACK:Record<string,string>={web:'Web & Tech',sales:'Sales',partner:'Partner',intern:'Internship'};

export function Careers(){
  const [tab,setTab]=useState('all');
  const [pos,setPos]=useState<Record<string,string>|undefined>();
  const open=jobs.filter(j=>j.active!==false);
  const tabs:[string,string][]=[['all','All'],['web','Web & Tech'],['sales','Sales'],['intern','Internships']];
  const list=open.filter(j=>tab==='all'||j.track===tab||(tab==='sales'&&j.track==='partner'));
  const f:FieldDef[]=[
    {name:'name',label:'Full Name'},
    {name:'email',label:'Email Address',type:'email'},
    {name:'phone',label:'Phone Number',type:'tel'},
    {name:'position',label:'Position Applying For',type:'select',options:[...open.filter(j=>j.track!=='partner').map(j=>j.title),'General Application']},
    {name:'experience',label:'Experience Level',type:'select',options:EXP},
    {name:'education',label:'Education'},
    {name:'linkedin',label:'LinkedIn Profile',type:'url',optional:true,placeholder:'https://'},
    {name:'portfolio',label:'Portfolio Website',type:'url',optional:true,placeholder:'https://'},
    {name:'github',label:'GitHub Profile',type:'url',optional:true,placeholder:'https://'},
    {name:'cover',label:'Cover Letter',type:'textarea'},
  ];
  return <>
    <Seo title="Careers" desc="Join SYVANTA DIGITAL SYSTEMS. Web, sales and internship opportunities." path="/careers"/>
    <PageHero eyebrow="Careers" title="Build your future with SYVANTA." sub="We are always interested in connecting with talented and motivated people who want to grow with us." aside={<div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-brand/20"><Photo k="collab" alt="Colleagues working together" className="aspect-[4/3] w-full"/></div>}/>
    <Sec className="!pb-6"><div className="grid gap-5 md:grid-cols-3">{[['Learn by building','Work on real digital products and grow through practice.'],['Clear communication','Straightforward expectations and honest feedback.'],['Ownership','Responsibility that grows with your skills.']].map(([t,d],i)=><Reveal key={t} delay={i*.07}><div className="h-full border-t-2 border-brand pt-5"><span className="gtext font-display text-3xl font-bold">0{i+1}</span><h2 className="mt-2 text-xl font-bold">{t}</h2><p className="mt-1 text-sm text-muted">{d}</p></div></Reveal>)}</div></Sec>

    <Sec className="!pt-10">
      <Head eyebrow="Where you could fit" title="Roles we hire for" sub="We regularly look for people in these areas. Send an application and we will be in touch when a suitable role opens."/>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter roles">{tabs.map(([k,t])=><button key={k} onClick={()=>setTab(k)} aria-pressed={tab===k} className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold transition ${tab===k?'border-brand bg-brand text-white':'hover:border-brand'}`} style={tab===k?undefined:{borderColor:'var(--line)'}}>{t}</button>)}</div>
      {list.length===0
        ?<div className="card mt-8 flex flex-col items-center p-10 text-center"><span className="icon-box !h-14 !w-14"><Inbox size={26}/></span><h3 className="mt-4 text-xl font-bold">No roles listed in this category right now</h3><p className="mt-2 max-w-md text-muted">You can still introduce yourself. Send an open application and we will keep your details in mind.</p><a href="#apply" onClick={()=>setPos({position:'General Application'})} className="btn mt-6">Send an open application</a></div>
        :<div className="mt-8 grid gap-5 md:grid-cols-2">{list.map((j,i)=><Reveal key={j.title} delay={(i%2)*.06}><article className="card card-hover flex h-full flex-col p-6">
          <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">{TRACK[j.track]}</span><span className="text-xs text-muted">{j.type}</span></div>
          <h3 className="mt-4 text-xl font-bold">{j.title}</h3><p className="mt-2 text-sm text-muted">{j.desc}</p>
          <p className="mt-4 flex flex-wrap gap-2">{j.skills.map(s=><span key={s} className="chip">{s}</span>)}</p>
          <div className="mt-auto pt-6">{j.track==='partner'?<Link to="/earn" className="btn">View program</Link>:<a href="#apply" onClick={()=>setPos({position:j.title})} className="btn">Apply for this role</a>}</div>
        </article></Reveal>)}</div>}
    </Sec>

    <Sec id="apply" className="grid gap-10 !pt-6 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <p className="eyebrow">Application</p><h2 className="h2">Apply now</h2>
        <p className="mt-3 text-muted">No matching role? Choose "General Application" and tell us how you could contribute.</p>
        <h3 className="mb-4 mt-8 font-bold">How applying works</h3>
        <Steps items={[['Fill in the form','Your details are checked as you type.'],['Attach your CV','PDF or DOCX, up to 5 MB. Use the submit button to send it with the form.'],['We review it','Our recruitment team reviews every application and contacts suitable candidates.']]}/>
        <p className="mt-6 text-sm text-muted">Prefer WhatsApp or email? Those open with your message ready, and you attach your CV in that conversation yourself.</p>
      </div>
      <SmartForm fields={f} cv preset={pos} netlify="career-application" submitLabel="Submit application" okText="Thank you for your interest in SYVANTA DIGITAL SYSTEMS. Our recruitment team will review your application." consent="I agree that SYVANTA DIGITAL SYSTEMS may use these details to review my application." intro="I would like to apply for a position at SYVANTA DIGITAL SYSTEMS." closing="Please review my application." emailSubject="Job application"/>
    </Sec>
  </>;
}

/* ------------------------------------------------------------------- Earn */
export function Earn(){
  const steps:Step[]=[
    {title:'Personal',blurb:'Let us know how to reach you.',fields:[{name:'name',label:'Full Name'},{name:'email',label:'Email',type:'email'},{name:'phone',label:'Phone / WhatsApp',type:'tel'},{name:'city',label:'City'}]},
    {title:'Experience',blurb:'Your background in sales or business.',fields:[{name:'experience',label:'Sales Experience',type:'cards',options:['None (willing to learn)','Less than 1 year','1–3 years','3+ years']},{name:'profile',label:'LinkedIn / Social Profile',type:'url',optional:true,placeholder:'https://'},{name:'background',label:'Professional Background',type:'textarea'}]},
    {title:'Partnership',blurb:'How you would work with us.',fields:[{name:'pitch',label:'How will you find clients?',type:'textarea'},{name:'why',label:'Why do you want to join?',type:'textarea'},{name:'relevant',label:'Relevant experience',type:'textarea',optional:true}]},
  ];
  const cols:[string,string[]][]=[
    ['Benefits',['No joining fee','Work remotely, on your schedule','We handle delivery and support']],
    ['Responsibilities',['Introduce relevant businesses honestly','Represent SYVANTA professionally','Share accurate information about our services']],
    ['Eligibility',['Students, freelancers and sales professionals','Good communication skills','Honest, professional conduct']],
  ];
  return <>
    <Seo title="Earn With Us: Sales Partner Program" desc="Earn commission by bringing website and software clients to SYVANTA DIGITAL SYSTEMS." path="/earn"/>
    <PageHero eyebrow="Sales Partner Program" title="Grow with SYVANTA." sub="Bring clients to SYVANTA for websites, applications, hosting, SEO and more. You focus on relationships; we handle delivery.">
      <a href="#apply" className="btn">Apply now <ArrowRight size={16}/></a>
      <a className="btn2 !border-white/25 !text-white hover:!bg-white/10" target="_blank" rel="noopener noreferrer" href={wa('Hello SYVANTA DIGITAL SYSTEMS, I would like to know more about the Sales Partner Program.')}><MessageCircle size={18}/>Ask on WhatsApp</a>
    </PageHero>
    <Sec className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
        <div><h2 className="text-3xl font-bold">How the partnership works</h2><p className="mt-3 text-muted">You introduce businesses that need digital services. When a deal closes and payment is received, you earn a commission agreed in writing beforehand.</p></div>
        <div><h3 className="mb-4 font-bold">Four steps</h3><Steps items={[['Apply','Complete the short application. No CV needed.'],['Get briefed','We share services, process and commission terms.'],['Introduce clients','Refer businesses that need our services.'],['Earn on closed deals',"Commission is paid after the client's payment is received."]]}/></div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{cols.map(([t,items])=><div key={t} className="card p-5"><h3 className="mb-3 font-bold">{t}</h3><ul className="space-y-2">{items.map(x=><Li key={x}>{x}</Li>)}</ul></div>)}</div>
        <p className="rounded-2xl border border-cyan2/30 bg-cyan2/10 p-4 text-sm"><b>Transparent terms:</b> Commission rates are agreed in writing before work starts. There is no guaranteed income; earnings depend on the deals you close.</p>
      </div>
      <div id="apply" className="scroll-mt-24"><h2 className="mb-5 text-3xl font-bold">Apply as a Sales Partner</h2>
        <MultiStep steps={steps} consent="I agree that SYVANTA DIGITAL SYSTEMS may use these details to contact me about the Sales Partner Program." intro="I would like to join the SYVANTA Sales Partner Program." closing="Please contact me with the next steps." emailSubject="Sales Partner application" netlify="sales-partner" okText="Thank you! Your application was submitted. Our team will review it and contact you."/></div>
    </Sec>
  </>;
}
