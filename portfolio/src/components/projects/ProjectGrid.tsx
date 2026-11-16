import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {useLocale} from '../../hooks/useLocale';
import {projects,upcoming} from '../../data/projects';
import type {Category} from '../../types';
import {Badge,ExternalLink,Reveal} from '../ui/Shared';
import ProjectArt from './ProjectArt';
const filters:Category[]=['all','ai','nlp','research','data','software','automation'];
export default function ProjectGrid(){const {t,pick}=useLocale();const [filter,setFilter]=useState<Category>('all');const reduced=useReducedMotion();const filtered=projects.filter(p=>filter==='all'||p.category.includes(filter));
 return <><div className="filters" role="group" aria-label={t('nav.projects')}>{filters.map(id=><button key={id} aria-pressed={filter===id} className={filter===id?'active':''} onClick={()=>setFilter(id)}>{t('projects.filters.'+id)}</button>)}</div><div className="projects-grid"><AnimatePresence mode="popLayout">{filtered.map(project=><motion.article className="project-card" key={project.slug} layout={!reduced} initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.2}}>
 <Link to={'/projects/'+project.slug} tabIndex={-1} aria-hidden="true">{project.screenshot?<img className="project-screenshot" src={project.screenshot} alt="" loading="lazy"/>:<ProjectArt slug={project.slug}/>}</Link>
 <div className="project-body"><div className="project-meta"><span>{project.number} / {pick(project.kind)}</span><span className="tiny-dot"/></div><h3><Link to={'/projects/'+project.slug}>{project.title}<ArrowUpRight size={23} aria-hidden="true"/></Link></h3><p>{pick(project.summary)}</p><div className="tech-list">{project.tech.slice(0,5).map(tech=><span key={tech} title={tech}>{tech}</span>)}</div><div className="project-bottom"><Badge>{pick(project.status)}</Badge><ExternalLink href={project.links[0].url} aria-label={'GitHub — '+project.title}>GitHub <ArrowUpRight size={14}/></ExternalLink></div></div>
 </motion.article>)}</AnimatePresence></div><span className="sr-only" role="status">{filtered.length} {t('nav.projects')}</span>
 <div className="upcoming-projects"><h3>{t('ui.more')}</h3>{upcoming.map(item=><Reveal className="upcoming-row" key={item.name}><div><h4>{item.name}</h4><p>{pick(item.note)}</p></div><span className="mono">{item.tech}</span><Badge>{t('ui.planned')}</Badge></Reveal>)}</div></>;
}
