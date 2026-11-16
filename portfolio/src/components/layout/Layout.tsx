import {useEffect,useRef,useState,Suspense} from 'react';
import {Link,Outlet,useLocation} from 'react-router-dom';
import {AnimatePresence,motion,useScroll,useReducedMotion} from 'motion/react';
import {Menu,X,Sun,Moon,Github,ArrowUp} from 'lucide-react';
import {useLocale} from '../../hooks/useLocale';
import {useTheme} from '../../hooks/useTheme';
import {ExternalLink} from '../ui/Shared';
import {config} from '../../data/config';
const sections=['home','projects','research','lab','writing','experience','about','contact'];
export default function Layout(){const {t,lang,switchLanguage}=useLocale();const {theme,toggleTheme}=useTheme();const [open,setOpen]=useState(false);const [active,setActive]=useState('home');const {pathname,hash}=useLocation();const menuRef=useRef<HTMLElement>(null);const toggleRef=useRef<HTMLButtonElement>(null);const {scrollYProgress}=useScroll();const reduced=useReducedMotion();
 useEffect(()=>{setOpen(false);if(!hash){window.scrollTo(0,0);document.getElementById('main')?.focus({preventScroll:true});return}
 const scroll=()=>{const target=document.getElementById(hash.slice(1));if(!target)return false;target.scrollIntoView({behavior:reduced?'auto':'smooth'});return true};if(scroll())return;
 const observer=new MutationObserver(()=>{if(scroll())observer.disconnect()});observer.observe(document.getElementById('main')!,{childList:true,subtree:true});return()=>observer.disconnect();
 },[pathname,hash,reduced]);
 useEffect(()=>{if(pathname!=='/'){setActive(pathname.startsWith('/writing')?'writing':'projects');return}
 const registered=new Set<Element>();const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)})},{rootMargin:'-15% 0px -65% 0px'});
 const register=()=>{sections.forEach(id=>{const element=document.getElementById(id);if(element&&!registered.has(element)){observer.observe(element);registered.add(element)}});if(registered.size===sections.length)mutation.disconnect()};
 const mutation=new MutationObserver(register);mutation.observe(document.getElementById('main')!,{childList:true,subtree:true});register();return()=>{mutation.disconnect();observer.disconnect()};
 },[pathname]);
 useEffect(()=>{if(!open)return;const first=menuRef.current?.querySelector<HTMLAnchorElement>('a');first?.focus();const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);toggleRef.current?.focus()}if(event.key==='Tab'){const links=Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a')??[]);const all=[...links,toggleRef.current].filter(Boolean) as HTMLElement[];const current=all.indexOf(document.activeElement as HTMLElement);if(current===all.length-1&&!event.shiftKey){event.preventDefault();all[0]?.focus()}if(current===0&&event.shiftKey){event.preventDefault();all.at(-1)?.focus()}}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[open]);
 return <><a className="skip-link" href="#main">{t('ui.skip')}</a><motion.div className="reading-progress" style={{scaleX:scrollYProgress}}/>
 <header className="site-header"><div className="header-inner"><Link to="/" className="logo" aria-label="Júlia Neris">jn<span>.</span><span className="logo-name">JÚLIA NERIS</span></Link>
 <nav aria-label={lang==='pt'?'Navegação principal':'Main navigation'} className="desktop-nav">{sections.map(id=><Link key={id} to={'/#'+id} aria-current={active===id?'location':undefined}>{t('nav.'+id)}</Link>)}</nav>
 <div className="header-controls"><button className="language-button" onClick={switchLanguage} aria-label={t('ui.language')}>{lang.toUpperCase()}<span aria-hidden="true"> / {lang==='pt'?'EN':'PT'}</span></button><button className="icon-button" onClick={toggleTheme} aria-label={t('ui.theme')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><ExternalLink href={config.social[0].url} className="icon-button header-github" aria-label="GitHub"><Github size={18}/></ExternalLink><button ref={toggleRef} className="icon-button menu-toggle" aria-label={t(open?'ui.close':'ui.menu')} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div></div>
 {open&&<nav ref={menuRef} id="mobile-nav" className="mobile-nav" aria-label={lang==='pt'?'Navegação móvel':'Mobile navigation'}>{sections.map(id=><Link key={id} to={'/#'+id} onClick={()=>{setOpen(false);toggleRef.current?.focus()}}>{t('nav.'+id)}</Link>)}</nav>}
 </header>
 <main id="main" tabIndex={-1}><Suspense fallback={<div className="container loading" role="status">{t('ui.loading')}</div>}><AnimatePresence mode="wait"><motion.div key={pathname} initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.15}}><Outlet/></motion.div></AnimatePresence></Suspense></main>
 <footer className="site-footer container"><Link className="logo" to="/">jn<span>.</span></Link><p>© {new Date().getFullYear()} {t('contact.rights')}<br/><span>{t('contact.footer')}</span></p><a href="#main" className="icon-button" aria-label={t('ui.top')}><ArrowUp size={18}/></a></footer></>;
}
