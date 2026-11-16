import {motion,useScroll,useTransform,MotionValue} from 'framer-motion';
import {Component,createContext,useCallback,useContext,useRef,useState,ReactNode} from 'react';

/** Fade-up on scroll. Reduced motion is handled globally by <MotionConfig reducedMotion="user">. */
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){
  return <motion.div className={className} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-50px'}} transition={{duration:.55,delay,ease:[.2,.7,.2,1]}}>{children}</motion.div>;
}

/** Word-by-word reveal. Wrap a word in *stars* to give it the animated gradient. */
export function SplitText({text,className='',delay=0,mount=false}:{text:string;className?:string;delay?:number;mount?:boolean}){
  const words=text.split(' ');
  const anim=mount?{animate:{y:0}}:{whileInView:{y:0},viewport:{once:true,margin:'-40px'}};
  return <span className={className} aria-label={text.replace(/\*/g,'')}>{words.map((w,i)=>{const acc=w.startsWith('*')&&w.endsWith('*');const t=acc?w.slice(1,-1):w;
    return <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[.1em] align-bottom"><motion.span className={`inline-block ${acc?'gtext':''}`} initial={{y:'115%'}} {...anim} transition={{duration:.65,delay:delay+i*.055,ease:[.2,.7,.2,1]}}>{t}{i<words.length-1?'\u00A0':''}</motion.span></span>})}</span>;
}

function LitWord({w,i,n,p}:{w:string;i:number;n:number;p:MotionValue<number>}){
  const o=useTransform(p,[i/n,(i+1)/n],[.15,1]);
  return <motion.span style={{opacity:o}} className="mr-[.25em] inline-block">{w}</motion.span>;
}
/** Statement whose words light up as you scroll. */
export function ScrollWords({text,className=''}:{text:string;className?:string}){
  const ref=useRef<HTMLParagraphElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start 0.9','end 0.5']});
  const ws=text.split(' ');
  return <p ref={ref} className={className}>{ws.map((w,i)=><LitWord key={i} w={w} i={i} n={ws.length} p={scrollYProgress}/>)}</p>;
}

/** Section heading block (eyebrow + title + subtitle). */
export function Head({eyebrow,title,sub,center=false}:{eyebrow?:string;title:string;sub?:string;center?:boolean}){
  return <Reveal className={center?'mx-auto text-center':''}>
    {eyebrow&&<p className="eyebrow">{eyebrow}</p>}
    <h2 className={`h2 ${center?'mx-auto max-w-3xl':'max-w-3xl'}`}><SplitText text={title}/></h2>
    {sub&&<p className={`lead ${center?'mx-auto':''}`}>{sub}</p>}
  </Reveal>;
}

export const Sec=({id,children,className=''}:{id?:string;children:ReactNode;className?:string})=>
  <section id={id} className={`wrap section scroll-mt-24 ${className}`}>{children}</section>;

export class ErrorBoundary extends Component<{children:ReactNode;fallback?:ReactNode},{bad:boolean}>{
  state={bad:false};
  static getDerivedStateFromError(){return {bad:true}}
  render(){return this.state.bad?(this.props.fallback??null):this.props.children}
}

type Kind='info'|'error'|'ok';
const Ctx=createContext<(m:string,k?:Kind)=>void>(()=>{});
export const useToast=()=>useContext(Ctx);
export function ToastProvider({children}:{children:ReactNode}){
  const [t,setT]=useState<{id:number;m:string;k:Kind}[]>([]);
  const add=useCallback((m:string,k:Kind='info')=>{
    const id=Date.now()+Math.random();
    setT(a=>[...a.slice(-2),{id,m,k}]);
    setTimeout(()=>setT(a=>a.filter(x=>x.id!==id)),4500);
  },[]);
  return <Ctx.Provider value={add}>{children}
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex flex-col items-center gap-2 px-4">
      {t.map(x=><motion.div key={x.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className={`glass pointer-events-auto max-w-sm rounded-xl px-4 py-3 text-sm shadow-xl ${x.k==='error'?'!border-red-500/60':''}`}>{x.m}</motion.div>)}
    </div></Ctx.Provider>;
}
