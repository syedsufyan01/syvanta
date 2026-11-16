import {ReactNode} from 'react';
import {localImage} from '../images';

/**
 * Animated vector illustration for every service. Drawn in code, so it never breaks and looks the same in both themes.
 * To use a real photo instead, add  src/assets/images/service-<slug>.jpg  (e.g. service-seo.jpg).
 */
const B='#3B6CFF',V='#8B5CF6',C='#22D3EE',G='#34D399',P='#0f1a3a',L='rgba(255,255,255,.14)',T='rgba(255,255,255,.55)';
const Win=({x,y,w,h,children}:{x:number;y:number;w:number;h:number;children?:ReactNode})=><g>
  <rect x={x} y={y} width={w} height={h} rx="14" fill={P} stroke="rgba(120,150,255,.35)"/>
  <circle cx={x+16} cy={y+15} r="3.5" fill="#f87171"/><circle cx={x+29} cy={y+15} r="3.5" fill="#fbbf24"/><circle cx={x+42} cy={y+15} r="3.5" fill="#34d399"/>
  <line x1={x} y1={y+28} x2={x+w} y2={y+28} stroke={L}/>{children}</g>;
const Bar=({x,y,w,c=L,h=6}:{x:number;y:number;w:number;c?:string;h?:number})=><rect x={x} y={y} width={w} height={h} rx={h/2} fill={c}/>;
const Tag=({x,y,children,c=B}:{x:number;y:number;children:ReactNode;c?:string})=><g><rect x={x} y={y} width="54" height="26" rx="13" fill={c}/><text x={x+27} y={y+17.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="Space Grotesk,Inter,sans-serif">{children}</text></g>;

const scenes:Record<string,()=>ReactNode>={
  'website-development':()=><>
    <Win x={60} y={44} w={250} h={170}>
      <rect x={76} y={84} width={218} height={50} rx="8" fill={`url(#g-b)`}/><Bar x={90} y={96} w={100} c="rgba(255,255,255,.8)" h={7}/><Bar x={90} y={110} w={64} c="rgba(255,255,255,.45)"/>
      {[0,1,2].map(i=><g key={i}><rect x={76+i*75} y={146} width={68} height={52} rx="8" fill="rgba(255,255,255,.06)"/><rect x={84+i*75} y={154} width={52} height={20} rx="5" fill={i===1?V:'rgba(255,255,255,.12)'}/><Bar x={84+i*75} y={182} w={36}/></g>)}
    </Win>
    <g className="il-float"><rect x="272" y="30" width="86" height="40" rx="12" fill={V}/><text x="315" y="56" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="monospace">{'</>'}</text></g>
    <g className="il-float2"><path d="M330 150l0 36 10-9 7 15 8-4-7-14 13-1z" fill="#fff" stroke={B} strokeWidth="2"/></g>
  </>,
  'ecommerce-development':()=><>
    <Win x={50} y={42} w={270} h={176}>
      <Bar x={66} y={78} w={90} c="rgba(255,255,255,.7)" h={7}/>
      {[0,1,2].map(i=><g key={i}><rect x={66+i*84} y={96} width={76} height={86} rx="9" fill="rgba(255,255,255,.06)"/><rect x={72+i*84} y={102} width={64} height={46} rx="6" fill={[B,V,C][i]} opacity=".85"/><Bar x={72+i*84} y={156} w={44}/><Bar x={72+i*84} y={168} w={24} c={C}/></g>)}
    </Win>
    <g className="il-float"><circle cx="330" cy="70" r="30" fill={B}/><path d="M316 60h6l5 18h16l5-13h-24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="330" cy="86" r="2.8" fill="#fff"/><circle cx="345" cy="86" r="2.8" fill="#fff"/></g>
    <g className="il-float2"><Tag x={296} y={168} c={G}>PAID</Tag></g>
  </>,
  'mern-stack':()=><>
    {[[70,'M','#47A248','Mongo'],[150,'E','#cbd5e1','Express'],[230,'R','#61DAFB','React'],[310,'N','#68A063','Node']].map(([x,l,c,n],i)=><g key={n as string} className={i%2?'il-float2':'il-float'}>
      <polygon points={`${x},${112} ${(x as number)+26},${97} ${(x as number)+52},${112} ${(x as number)+52},${142} ${(x as number)+26},${157} ${x},${142}`} transform="translate(-26 0)" fill={P} stroke={c as string} strokeWidth="2.5"/>
      <text x={x as number} y={141} textAnchor="middle" fontSize="30" fontWeight="800" fill={c as string} fontFamily="Space Grotesk,Inter,sans-serif">{l}</text>
      <text x={x as number} y={188} textAnchor="middle" fontSize="12" fill={T} fontFamily="Inter,sans-serif">{n}</text></g>)}
    {[96,176,256].map(x=><line key={x} x1={x} y1="127" x2={x+22} y2="127" stroke={C} strokeWidth="2.5" className="il-dash"/>)}
    <rect x="96" y="214" width="208" height="10" rx="5" fill={L}/><rect x="96" y="214" width="120" height="10" rx="5" fill={`url(#g-b)`} className="il-pulse"/>
  </>,
  'application-development':()=><>
    <g className="il-float"><rect x="108" y="28" width="104" height="204" rx="18" fill={P} stroke="rgba(120,150,255,.5)" strokeWidth="2"/><rect x="156" y="36" width="8" height="3" rx="1.5" fill={L}/>
      <rect x="120" y="52" width="80" height="54" rx="10" fill={`url(#g-b)`}/>{[0,1,2,3].map(i=><rect key={i} x={120+(i%2)*42} y={116+Math.floor(i/2)*42} width={38} height={36} rx="8" fill={i===1?V:'rgba(255,255,255,.1)'}/>)}</g>
    <g className="il-float2"><rect x="222" y="52" width="94" height="184" rx="17" fill={P} stroke="rgba(120,150,255,.35)" strokeWidth="2" transform="rotate(7 269 144)"/>
      <g transform="rotate(7 269 144)"><rect x="233" y="72" width="72" height="34" rx="8" fill={V} opacity=".85"/>{[0,1,2].map(i=><g key={i}><circle cx="246" cy={128+i*28} r="8" fill="rgba(255,255,255,.14)"/><Bar x={260} y={124+i*28} w={42}/></g>)}</g></g>
    <circle cx="82" cy="70" r="6" fill={C} className="il-pulse"/><circle cx="340" cy="210" r="5" fill={V} className="il-pulse"/>
  </>,
  'desktop-software':()=><>
    <rect x="70" y="30" width="260" height="164" rx="12" fill={P} stroke="rgba(120,150,255,.5)" strokeWidth="2"/>
    <rect x="78" y="38" width="244" height="148" rx="7" fill="#0b1226"/>
    <rect x="78" y="38" width="54" height="148" fill="rgba(255,255,255,.04)"/>{[0,1,2,3].map(i=><Bar key={i} x={86} y={52+i*18} w={38} c={i===0?B:L}/>)}
    {[0,1,2].map(i=><g key={i}><rect x={142+i*60} y={50} width={52} height={32} rx="6" fill="rgba(255,255,255,.07)"/><Bar x={148+i*60} y={58} w={22} c={[C,V,G][i]}/><Bar x={148+i*60} y={70} w={34}/></g>)}
    {[0,1,2,3,4,5,6].map(i=><rect key={i} x={146+i*24} y={166-[30,52,38,66,48,78,58][i]} width="14" height={[30,52,38,66,48,78,58][i]} rx="3" fill={B} opacity=".85" className="il-grow" style={{animationDelay:`${i*.25}s`}}/>)}
    <rect x="178" y="194" width="44" height="22" fill="#162044"/><rect x="146" y="214" width="108" height="9" rx="4.5" fill="#1d2a5a"/>
    <g className="il-float"><Tag x={296} y={36} c={V}>.exe</Tag></g>
  </>,
  'software-testing':()=><>
    <Win x={70} y={40} w={230} h={178}>
      {['Login works','Cart updates','Payment flow','Mobile layout'].map((t,i)=><g key={t}>
        <rect x={86} y={80+i*32} width="196" height="26" rx="8" fill="rgba(255,255,255,.05)"/>
        <circle cx={101} cy={93+i*32} r="8" fill={i===2?'#f87171':G}/>
        {i===2?<path d={`M97 ${89+i*32}l8 8m0-8l-8 8`} stroke="#fff" strokeWidth="2" strokeLinecap="round"/>:<path d={`M97 ${93+i*32}l3 3 6-6`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>}
        <Bar x={118} y={90+i*32} w={[80,70,92,76][i]} c="rgba(255,255,255,.4)"/></g>)}
    </Win>
    <g className="il-float"><path d="M330 40l32 12v30c0 20-14 34-32 42-18-8-32-22-32-42V52z" fill={G} opacity=".95"/><path d="M316 84l10 10 20-22" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></g>
    <g className="il-float2"><circle cx="338" cy="176" r="22" fill="#f87171" opacity=".92"/><path d="M328 168l20 16m0-16l-20 16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><text x="338" y="212" textAnchor="middle" fontSize="11" fill={T}>bug found</text></g>
  </>,
  'domain-hosting':()=><>
    {[0,1,2].map(i=><g key={i}><rect x="86" y={92+i*46} width="170" height="38" rx="9" fill={P} stroke="rgba(120,150,255,.4)"/>
      <circle cx="106" cy={111+i*46} r="5" fill={[G,C,G][i]} className="il-pulse" style={{animationDelay:`${i*.4}s`}}/><circle cx="124" cy={111+i*46} r="5" fill={V} className="il-pulse" style={{animationDelay:`${i*.4+.2}s`}}/>
      <Bar x={148} y={108+i*46} w={92}/></g>)}
    <g className="il-float"><path d="M290 82a26 26 0 0 0-50-8 20 20 0 0 0 4 40h44a20 20 0 0 0 2-32z" transform="translate(40 -30)" fill={`url(#g-b)`}/></g>
    <circle cx="312" cy="170" r="34" fill="none" stroke={C} strokeWidth="2.5"/><ellipse cx="312" cy="170" rx="14" ry="34" fill="none" stroke={C} strokeWidth="1.8"/><line x1="278" y1="170" x2="346" y2="170" stroke={C} strokeWidth="1.8"/>
    <path d="M256 130c24 0 24 40 22 40" fill="none" stroke={C} strokeWidth="2" className="il-dash"/>
    <Tag x={60} y={40} c={V}>.com</Tag>
  </>,
  'maintenance-support':()=><>
    <g className="il-spin"><circle cx="150" cy="130" r="44" fill="none" stroke={B} strokeWidth="18" strokeDasharray="12 9"/></g>
    <circle cx="150" cy="130" r="36" fill={P} stroke={B} strokeWidth="3"/><circle cx="150" cy="130" r="13" fill={C}/>
    <g className="il-float"><path d="M270 54l36 13v32c0 22-16 36-36 45-20-9-36-23-36-45V67z" fill={V}/><path d="M254 100l12 12 24-26" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></g>
    <rect x="212" y="176" width="150" height="46" rx="10" fill={P} stroke="rgba(120,150,255,.35)"/>
    {[0,1,2,3,4,5,6,7,8,9].map(i=><rect key={i} x={222+i*13.5} y="190" width="8" height="20" rx="3" fill={i===6?'#fbbf24':G} className="il-pulse" style={{animationDelay:`${i*.15}s`}}/>)}
    <text x="287" y="170" textAnchor="middle" fontSize="11" fill={T}>uptime</text>
  </>,
  'redesign-upgrades':()=><>
    <rect x="52" y="44" width="296" height="172" rx="14" fill={P} stroke="rgba(120,150,255,.35)"/>
    <g opacity=".75"><rect x="66" y="62" width="120" height="14" fill="#64748b"/><rect x="66" y="86" width="120" height="50" fill="#475569"/>{[0,1,2].map(i=><rect key={i} x={66+i*42} y={146} width={36} height={52} fill="#64748b"/>)}</g>
    <clipPath id="newside"><rect x="200" y="44" width="148" height="172"/></clipPath>
    <g clipPath="url(#newside)"><rect x="200" y="44" width="148" height="172" fill="#0b1226"/><rect x="214" y="62" width="64" height="9" rx="4.5" fill="rgba(255,255,255,.7)"/><rect x="214" y="82" width="120" height="54" rx="12" fill={`url(#g-b)`}/>{[0,1,2].map(i=><rect key={i} x={214+i*42} y={146} width={36} height={52} rx="9" fill={[V,'rgba(255,255,255,.1)',C][i]} opacity=".9"/>)}</g>
    <line x1="200" y1="44" x2="200" y2="216" stroke="#fff" strokeWidth="2.5"/><g className="il-slide"><circle cx="200" cy="130" r="14" fill="#fff"/><path d="M194 130h12m-4-4l4 4-4 4m-4-8l-4 4 4 4" fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
    <g className="il-float"><path d="M340 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill={C}/></g>
  </>,
  'seo':()=><>
    <rect x="56" y="38" width="288" height="40" rx="20" fill={P} stroke="rgba(120,150,255,.4)"/><circle cx="82" cy="58" r="8" fill="none" stroke={C} strokeWidth="2.5"/><path d="M88 64l7 7" stroke={C} strokeWidth="2.5" strokeLinecap="round"/><Bar x={108} y={55} w={110} c="rgba(255,255,255,.45)" h={7}/>
    <rect x="56" y="96" width="288" height="124" rx="14" fill={P} stroke="rgba(120,150,255,.3)"/>
    {[28,44,40,64,58,86,100].map((h,i)=><rect key={i} x={76+i*38} y={204-h} width="24" height={h} rx="5" fill={i>4?C:B} opacity=".9" className="il-grow" style={{animationDelay:`${i*.2}s`}}/>)}
    <path d="M82 176l40-14 40 6 40-30 40 10 40-34" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="il-dash"/>
    <g className="il-float"><Tag x={290} y={104} c={G}>SEO</Tag></g>
  </>,
  'performance':()=><>
    <path d="M90 176a110 110 0 0 1 220 0" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="22" strokeLinecap="round"/>
    <path d="M90 176a110 110 0 0 1 150-102" fill="none" stroke={`url(#g-c)`} strokeWidth="22" strokeLinecap="round"/>
    <g className="il-sweep"><line x1="200" y1="168" x2="200" y2="92" stroke="#fff" strokeWidth="5" strokeLinecap="round"/></g><circle cx="200" cy="168" r="12" fill="#fff"/>
    <text x="200" y="214" textAnchor="middle" fontSize="13" fill={T} fontFamily="Inter,sans-serif">Core Web Vitals</text>
    <g className="il-float"><path d="M322 36l-24 38h16l-8 30 28-42h-17z" fill="#fbbf24"/></g>
    {[0,1,2].map(i=><rect key={i} x={62+i*14} y={52} width="8" height={16-i*3+i*4} rx="3" fill={G} className="il-pulse" style={{animationDelay:`${i*.3}s`}}/>)}
  </>,
  'integrations':()=><>
    {[[90,70],[310,70],[90,190],[310,190]].map(([x,y],i)=><g key={i}><line x1="200" y1="130" x2={x} y2={y} stroke={C} strokeWidth="2" className="il-dash"/></g>)}
    <polygon points="200,92 233,111 233,149 200,168 167,149 167,111" fill={`url(#g-b)`} stroke="#fff" strokeOpacity=".4" strokeWidth="2"/><path d="M212 118h-18a7 7 0 0 0 0 14h12a7 7 0 0 1 0 14h-18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
    {[[90,70,'$',G],[310,70,'API',V],[90,190,'@',C],[310,190,'WA','#22c55e']].map(([x,y,t,c],i)=><g key={i} className={i%2?'il-float2':'il-float'}><circle cx={x as number} cy={y as number} r="27" fill={P} stroke={c as string} strokeWidth="2.5"/><text x={x as number} y={(y as number)+5} textAnchor="middle" fontSize="14" fontWeight="800" fill={c as string} fontFamily="Space Grotesk,Inter,sans-serif">{t as string}</text></g>)}
  </>,
};

export default function Illustration({slug,className='',label}:{slug:string;className?:string;label?:string}){
  const photo=localImage(`service-${slug}`);
  if(photo)return <img src={photo} alt={label??'Service illustration'} loading="lazy" className={`object-cover ${className}`}/>;
  const scene=scenes[slug];
  return <svg viewBox="0 0 400 260" role="img" aria-label={label??'Service illustration'} className={className} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="il-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0b1130"/><stop offset="1" stopColor="#1a1442"/></linearGradient>
      <linearGradient id={`g-b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={B}/><stop offset="1" stopColor={V}/></linearGradient>
      <linearGradient id={`g-c`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={B}/><stop offset="1" stopColor={C}/></linearGradient>
      <pattern id="il-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,.10)"/></pattern>
    </defs>
    <rect width="400" height="260" fill="url(#il-bg)"/><rect width="400" height="260" fill="url(#il-dots)"/>
    <circle cx="340" cy="30" r="90" fill={B} opacity=".16"/><circle cx="40" cy="240" r="100" fill={V} opacity=".16"/>
    {scene?scene():null}
  </svg>;
}
