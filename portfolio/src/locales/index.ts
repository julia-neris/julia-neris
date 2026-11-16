import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import pt from './pt/translation.json';
import en from './en/translation.json';
let language='pt';
try { const saved=localStorage.getItem('jn-lang'); if(saved==='pt'||saved==='en')language=saved; } catch { /* Memory-only preferences remain usable. */ }
void i18n.use(initReactI18next).init({resources:{pt:{translation:pt},en:{translation:en}},lng:language,fallbackLng:'pt',interpolation:{escapeValue:false},returnNull:false});
export default i18n;
