import {Code2,Gauge,Globe,LifeBuoy,Monitor,PenTool,Plug,Search,Server,ShoppingCart,Smartphone,Bug,Layers,LucideIcon} from 'lucide-react';

/** Icon for each real service (keyed by slug). */
export const serviceIcon:Record<string,LucideIcon>={
  'website-development':Globe,
  'ecommerce-development':ShoppingCart,
  'mern-stack':Layers,
  'application-development':Smartphone,
  'desktop-software':Monitor,
  'domain-hosting':Server,
  'maintenance-support':LifeBuoy,
  'software-testing':Bug,
  'redesign-upgrades':PenTool,
  'seo':Search,
  'performance':Gauge,
  'integrations':Plug,
};
export const iconFor=(slug:string):LucideIcon=>serviceIcon[slug]??Code2;
