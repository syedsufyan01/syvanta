import {useRef,useState} from 'react';
import {useInView,useReducedMotion} from 'framer-motion';
import {Pause,Play} from 'lucide-react';
import {PHOTO,SERVICE_PHOTO,localImage,unsplash} from '../images';
import Illustration from './Illustration';
import {Mark} from './Layout';

/** Generic photo with a branded gradient fallback (never a broken image). */
export function Photo({k,alt,className='',w=1000}:{k:keyof typeof PHOTO;alt:string;className?:string;w?:number}){
  const [bad,setBad]=useState(false);
  const src=localImage(k)??unsplash(PHOTO[k],w);
  if(bad)return <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-brand/40 via-[#0b1130] to-violet2/40 ${className}`}><Mark size={64}/></div>;
  return <img src={src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setBad(true)} className={`object-cover ${className}`}/>;
}

/** Service picture: real photo (or your local service-<slug>.jpg); falls back to the animated illustration. */
export function ServiceMedia({slug,title,className=''}:{slug:string;title:string;className?:string}){
  const [bad,setBad]=useState(false);
  const local=localImage(`service-${slug}`);
  const id=SERVICE_PHOTO[slug];
  if(bad||(!local&&!id))return <Illustration slug={slug} label={`${title} illustration`} className={className}/>;
  return <div className={`relative overflow-hidden bg-[#0b1130] ${className}`}>
    <img src={local??unsplash(id,800)} alt={`${title}: ${slug.replace(/-/g,' ')}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setBad(true)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#070a13]/85 via-[#070a13]/10 to-brand/10"/>
  </div>;
}

const VIDEO='/videos/syvanta-build.mp4',POSTER='/videos/syvanta-build.jpg';

/** Looping muted background video. Respects reduced-motion (shows the still poster). */
export function VideoBg({className=''}:{className?:string}){
  const still=useReducedMotion();const [bad,setBad]=useState(false);
  if(bad)return null;
  return <video aria-hidden="true" tabIndex={-1} className={className} src={VIDEO} poster={POSTER} muted loop playsInline autoPlay={!still} preload="metadata" onError={()=>setBad(true)}/>;
}

/** Framed video player with a play / pause control. Plays only while visible. */
export function VideoCard({className=''}:{className?:string}){
  const ref=useRef<HTMLVideoElement>(null);const box=useRef<HTMLDivElement>(null);
  const inView=useInView(box,{amount:.4});const still=useReducedMotion();
  const [playing,setPlaying]=useState(false);const [bad,setBad]=useState(false);
  const toggle=()=>{const v=ref.current;if(!v)return;if(v.paused){void v.play();}else v.pause()};
  if(bad)return null;
  return <div ref={box} className={`relative overflow-hidden rounded-3xl border border-white/15 bg-[#0b1130] shadow-2xl shadow-brand/20 ${className}`}>
    <video ref={ref} className="aspect-video w-full object-cover" src={VIDEO} poster={POSTER} muted loop playsInline preload="metadata" autoPlay={!still&&inView}
      onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setBad(true)} aria-label="Screen recording: a website taking shape as code is written"/>
    <button onClick={toggle} aria-label={playing?'Pause video':'Play video'} className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-brand">{playing?<Pause size={18}/>:<Play size={18}/>}</button>
    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur"><i className="il-pulse h-2 w-2 rounded-full bg-red-500"/>Live build</span>
  </div>;
}
