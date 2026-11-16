import {lazy,Suspense} from 'react';
import {Link,useParams} from 'react-router-dom';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {projects} from '../data/projects';
import {useLocale} from '../hooks/useLocale';
import SEO from '../components/ui/SEO';
import {Badge,ExternalLink} from '../components/ui/Shared';
import Pipeline from '../components/projects/Pipeline';
import ProjectArt from '../components/projects/ProjectArt';
import NotFound from './NotFound';
const ResearchChart=lazy(()=>import('../components/projects/ResearchChart'));
export default function Project(){const {slug}=useParams();const project=projects.find(p=>p.slug===slug);const {t,pick}=useLocale();if(!project)return <NotFound/>;
 return <article className="case-page container"><SEO title={project.title} description={pick(project.summary)}/><Link className="text-link back-link" to="/#projects"><ArrowLeft size={17}/>{t('ui.back')}</Link><header className="case-header"><p className="eyebrow">{project.number} / {pick(project.kind)}</p><h1>{project.title}<span className="accent">.</span></h1><p>{pick(project.summary)}</p><Badge>{pick(project.status)}</Badge><div className="tech-list">{project.tech.map(tech=><span key={tech}>{tech}</span>)}</div></header><div className="case-art"><ProjectArt slug={project.slug}/></div><div className="case-layout"><aside className="case-toc"><span className="eyebrow">{t('ui.toc')}</span>{project.sections.map((section,i)=><a key={i} href={'#section-'+i}>{pick(section.title)}</a>)}</aside><div className="case-prose"><Pipeline steps={project.pipeline}/>{project.sections.map((section,i)=><section id={'section-'+i} key={i}><h2>{pick(section.title)}</h2><p>{pick(section.text)}</p></section>)}{project.slug==='sinfonia'&&<Suspense fallback={<p>{t('research.chartLoading')}</p>}><ResearchChart/></Suspense>}<section><h2>{t('ui.links')}</h2><div className="case-links">{project.links.map(link=><ExternalLink className="button secondary" key={link.url} href={link.url}>{link.label}<ArrowUpRight size={17}/></ExternalLink>)}</div>{project.slug==='sinfonia'&&<><p className="small-note">{t('research.paper')}</p><ExternalLink className="video-link" href="https://www.youtube.com/watch?v=38zLxc0M690"><span className="video-play" aria-hidden="true">▶</span><span>{t('research.video')}<small>YouTube / SinfonIA</small></span><ArrowUpRight/></ExternalLink></>}{project.slug==='helpdesk-ml'&&<p className="small-note">{t('lab.pendingText')}</p>}</section></div></div></article>;
}
