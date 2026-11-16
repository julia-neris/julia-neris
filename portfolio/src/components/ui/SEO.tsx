import {useEffect} from 'react';
import {useLocale} from '../../hooks/useLocale';
export default function SEO({title,description}:{title?:string;description?:string}){
 const {t,lang}=useLocale();
 useEffect(()=>{const pageTitle=title?title+' — Júlia Neris':'Júlia Neris — AI & Software Engineering';document.title=pageTitle;document.documentElement.lang=lang==='pt'?'pt-BR':'en-US';const desc=description??t('hero.description');document.querySelector('meta[name="description"]')?.setAttribute('content',desc);document.querySelector('meta[property="og:title"]')?.setAttribute('content',pageTitle);document.querySelector('meta[property="og:description"]')?.setAttribute('content',desc);},[title,description,lang,t]);
 return null;
}
