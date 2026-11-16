import type {ReactNode,AnchorHTMLAttributes} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {useLocale} from '../../hooks/useLocale';
export function ExternalLink({children,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){const {t}=useLocale();return <a {...props} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> ({t('ui.external')})</span></a>}
export function Reveal({children,className=''}:{children:ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.5}}>{children}</motion.div>}
export function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}){return <Reveal className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description&&<p className="section-description">{description}</p>}</Reveal>}
export function Arrow(){return <ArrowUpRight size={18} aria-hidden="true"/>}
export function Badge({children}:{children:ReactNode}){return <span className="badge">{children}</span>}
