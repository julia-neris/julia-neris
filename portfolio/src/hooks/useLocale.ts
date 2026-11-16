import {useTranslation} from 'react-i18next';
import type {Lang,Localized} from '../types';
export function useLocale(){const {t,i18n}=useTranslation();const lang:Lang=i18n.language.startsWith('en')?'en':'pt';return {t,lang,pick:(v:Localized)=>v[lang],switchLanguage:()=>{const next=lang==='pt'?'en':'pt';void i18n.changeLanguage(next);try{localStorage.setItem('jn-lang',next)}catch{/* optional persistence */}}};}
