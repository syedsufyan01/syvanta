import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {ArrowRight,Compass,Mail,MessageCircle,ShieldCheck,Rocket} from 'lucide-react';
import {localImage} from '../images';
import {CO} from '../data';
import {wa} from '../lib/whatsapp';
import {Reveal} from './ui';
import {Mark} from './Layout';

/** Premium SS monogram seal (also used as the CEO "logo"). */
export const SSSeal=({size=64}:{size?:number})=><svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
  <defs><linearGradient id="ssg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3B6CFF"/><stop offset=".55" stopColor="#8B5CF6"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs>
  <polygon points="40,3 73,21.5 73,58.5 40,77 7,58.5 7,21.5" fill="#0b1130" stroke="url(#ssg)" strokeWidth="3"/>
  <polygon points="40,11 66,25.5 66,54.5 40,69 14,54.5 14,25.5" fill="none" stroke="rgba(255,255,255,.18)"/>
  <text x="40" y="49" textAnchor="middle" fontSize="27" fontWeight="800" fill="url(#ssg)" fontFamily="Space Grotesk,Inter,sans-serif" letterSpacing="-1">SS</text>
</svg>;

/** Clean professional portrait placeholder (no real person is depicted). */
const Silhouette=()=><svg viewBox="0 0 300 375" className="absolute inset-0 h-full w-full" aria-hidden="true">
  <defs><linearGradient id="sil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5b7cff"/><stop offset="1" stopColor="#2a2f78"/></linearGradient><linearGradient id="silb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#101a44"/><stop offset="1" stopColor="#1d1550"/></linearGradient></defs>
  <rect width="300" height="375" fill="url(#silb)"/>
  <circle cx="150" cy="150" r="118" fill="rgba(59,108,255,.18)"/><circle cx="150" cy="150" r="86" fill="rgba(139,92,246,.16)"/>
  <path d="M40 375c0-76 48-118 110-118s110 42 110 118z" fill="url(#sil)"/>
  <path d="M118 262l32 52 32-52" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinejoin="round"/>
  <path d="M150 314l-9 17 9 44 9-44z" fill="#22D3EE" opacity=".85"/>
  <circle cx="150" cy="170" r="52" fill="url(#sil)"/><rect x="132" y="210" width="36" height="50" rx="14" fill="url(#sil)"/>
</svg>;

/** Uses src/assets/images/founder.(jpg|png|webp) when present; otherwise the professional portrait placeholder. */
export default function FounderProfile(){
  const photo=localImage('founder');
  const principles:[typeof Compass,string,string][]=[[Compass,'Clear communication','Honest scope and updates at every step.'],[ShieldCheck,'Quality engineering','Clean, secure, maintainable work.'],[Rocket,'Long-term support','We stay with you after launch.']];
  return <section className="wrap section">
    <div className="shine-border relative isolate overflow-hidden rounded-[2rem] border bg-ink p-6 text-white sm:p-10 lg:p-14" style={{borderColor:'rgba(148,163,184,.2)'}}>
      <div className="grid-bg absolute inset-0 -z-10 opacity-30"/>
      <div className="glow -left-20 -top-20 -z-10 h-80 w-80 bg-brand/30"/><div className="glow -bottom-24 right-0 -z-10 h-80 w-80 bg-violet2/25"/>
      <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[22rem]">
            <div aria-hidden="true" className="orbit absolute -inset-6 rounded-full border border-dashed border-white/15"/>
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand via-violet2 to-cyan2 opacity-50 blur-xl"/>
            <motion.div whileHover={{y:-4}} className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-white/20 bg-[#0b1020] shadow-2xl">
              {photo?<img src={photo} alt="Syed Sufyan Ahmed, Founder and CEO of SYVANTA DIGITAL SYSTEMS" loading="lazy" className="h-full w-full object-cover"/>:<Silhouette/>}
              {['left-3 top-3 border-l-2 border-t-2','right-3 top-3 border-r-2 border-t-2'].map(c=><span key={c} aria-hidden="true" className={`absolute h-5 w-5 border-cyan2/80 ${c}`}/>)}
              <div className="absolute left-4 top-4"><Mark size={30}/></div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-5 pt-16"><p className="font-display text-xl font-bold leading-tight">Syed Sufyan Ahmed</p><p className="mt-0.5 text-xs font-semibold uppercase tracking-[.18em] text-cyan2">Founder & CEO</p></div>
            </motion.div>
            <div className="float absolute -bottom-6 -right-4 rounded-2xl border border-white/15 bg-[#0b1130]/95 p-2 shadow-xl backdrop-blur"><SSSeal size={62}/></div>
          </div>
        </Reveal>
        <Reveal delay={.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan2"><span className="h-1.5 w-1.5 rounded-full bg-cyan2"/>Founder & CEO</span>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">SYED SUFYAN AHMED</h2>
          <p className="mt-2 font-display text-lg text-white/60">SYVANTA DIGITAL SYSTEMS</p>
          <div className="mt-6 border-l-2 border-cyan2/70 pl-5"><p className="text-lg text-white/75">Syed Sufyan Ahmed founded SYVANTA DIGITAL SYSTEMS to help businesses build a dependable online presence. He leads the company's direction with a focus on clear communication, quality engineering and long-term support for every client.</p></div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-3">{principles.map(([I,t,d])=><li key={t} className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><I size={20} className="text-cyan2"/><p className="mt-2 text-sm font-bold">{t}</p><p className="mt-0.5 text-xs text-white/55">{d}</p></li>)}</ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn">Talk to Us <ArrowRight size={16}/></Link>
            <a href={wa(`Hello ${CO.name}, I would like to speak with the team.`)} target="_blank" rel="noopener noreferrer" className="btn2 !border-white/25 !text-white hover:!bg-white/10"><MessageCircle size={16}/>WhatsApp</a>
            <a href={`mailto:${CO.email}`} className="btn2 !border-white/25 !text-white hover:!bg-white/10"><Mail size={16}/>Email</a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}
