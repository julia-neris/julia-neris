import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AudioLines,ArrowUpRight} from 'lucide-react';
import {useLocale} from '../../hooks/useLocale';
import Classifier from './Classifier';
import NeuralExplorer from './NeuralExplorer';
export default function AILab(){const {t}=useLocale();const [tab,setTab]=useState('classification');const tabs=['classification','neural','audio'];
 return <div className="lab-window"><div className="lab-toolbar"><span className="terminal-dots" aria-hidden="true">● ● ●</span><span className="mono">julia / ai-lab</span><span className="status-dot"/></div><div className="lab-tabs" role="tablist" aria-label={t('nav.lab')}>{tabs.map((item,i)=><button key={item} id={'tab-'+item} role="tab" aria-selected={tab===item} aria-controls={'panel-'+item} tabIndex={tab===item?0:-1} onClick={()=>setTab(item)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();setTab(tabs[next]);document.getElementById('tab-'+tabs[next])?.focus()}}><span className="mono">0{i+1}</span>{t('lab.'+item)}</button>)}</div><div className="lab-content" role="tabpanel" id={'panel-'+tab} aria-labelledby={'tab-'+tab} tabIndex={0}>{tab==='classification'?<Classifier/>:tab==='neural'?<NeuralExplorer/>:<div className="audio-empty"><AudioLines size={55} strokeWidth={1}/><span className="badge">{t('lab.audioPending')}</span><h3>{t('lab.audioTitle')}</h3><p>{t('lab.audioText')}</p><Link className="text-link" to="/projects/sinfonia">{t('ui.read')}<ArrowUpRight size={17}/></Link></div>}</div></div>;
}
