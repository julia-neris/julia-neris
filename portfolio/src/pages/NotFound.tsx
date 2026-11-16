import {Link} from 'react-router-dom';
import {useLocale} from '../hooks/useLocale';
import SEO from '../components/ui/SEO';
export default function NotFound(){const {t}=useLocale();return <section className="container error-page"><SEO title="404"/><span className="eyebrow">404</span><h1>{t('ui.notFound')}</h1><Link className="button primary" to="/">{t('ui.home')}</Link></section>}
