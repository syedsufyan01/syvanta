/**
 * Optional local images. Drop a file into src/assets/images/ and it is picked up by name.
 * Currently used: founder.(jpg|jpeg|png|webp|avif)  ->  Founder & CEO portrait.
 */
const local=import.meta.glob('/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}',{eager:true,query:'?url',import:'default'}) as Record<string,string>;

export const localImage=(name:string):string|undefined=>{
  const f=Object.keys(local).find(p=>p.split('/').pop()!.replace(/\.\w+$/,'')===name);
  return f?local[f]:undefined;
};

/**
 * Real photographs (Unsplash, free to use) loaded from the Unsplash CDN in the visitor's browser.
 * If a photo cannot load, the page shows an animated illustration instead, so nothing ever looks broken.
 * To use your own photo, add src/assets/images/service-<slug>.jpg (or team.jpg, office.jpg, collab.jpg).
 */
export const unsplash=(id:string,w=900)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
export const SERVICE_PHOTO:Record<string,string>={
  'website-development':'1461749280684-dccba630e2f6',
  'ecommerce-development':'1556742049-0cfed4f6a45d',
  'mern-stack':'1555066931-4365d14bab8c',
  'application-development':'1512941937669-90a1b58e7e9c',
  'desktop-software':'1581291518857-4e27b48ff24e',
  'domain-hosting':'1558494949-ef010cbdcc31',
  'maintenance-support':'1498050108023-c5249f4df085',
  'software-testing':'1550751827-4bd374c3f58b',
  'redesign-upgrades':'1561070791-2526d30994b5',
  'seo':'1460925895917-afdab827c52f',
  'performance':'1551288049-bebda4e38f71',
  'integrations':'1451187580459-43490279c0fa',
};
export const PHOTO={team:'1522071820081-009f0129c71c',office:'1497366216548-37526070297c',collab:'1522202176988-66273c2fd55f'};
