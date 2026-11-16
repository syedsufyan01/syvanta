import {ReactNode} from 'react';
import {motion} from 'framer-motion';
import {SplitText} from './ui';

type P={eyebrow:string;title:string;sub?:string;children?:ReactNode;center?:boolean;aside?:ReactNode};

/** Dark page header. It slides under the fixed navbar (main has pt-24, hero has -mt-24 pt-24). */
export default function PageHero({eyebrow,title,sub,children,center=false,aside}:P){
  return <section className="relative isolate -mt-24 overflow-hidden bg-ink pt-24 text-white">
    <div className="grid-bg absolute inset-0 -z-10 opacity-40"/>
    <div className="glow -left-24 top-10 -z-10 h-72 w-72 bg-brand/30"/>
    <div className="glow -right-24 bottom-0 -z-10 h-72 w-72 bg-violet2/25"/>
    <div className={`wrap py-14 md:py-20 ${center?'text-center':''} ${aside?'grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]':''}`}>
      <div>
      <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="eyebrow">{eyebrow}</motion.p>
      <h1 className={`text-4xl font-bold leading-[1.08] md:text-6xl ${center?'mx-auto max-w-4xl':'max-w-4xl'}`}><SplitText mount delay={.05} text={title}/></h1>
      {sub&&<motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.15}} className={`mt-5 max-w-xl text-base text-white/70 md:text-lg ${center?'mx-auto':''}`}>{sub}</motion.p>}
      {children&&<motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.25}} className={`mt-8 flex flex-wrap gap-3 ${center?'justify-center':''}`}>{children}</motion.div>}
      </div>
      {aside&&<motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{delay:.2,duration:.6}}>{aside}</motion.div>}
    </div>
  </section>;
}
