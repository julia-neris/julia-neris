import {useState} from 'react';
import {ChevronRight} from 'lucide-react';
import {useLocale} from '../../hooks/useLocale';
import type {Localized} from '../../types';
export default function Pipeline({steps}:{steps:Localized[]}){const {t,pick}=useLocale();const [active,setActive]=useState(0);return <div className="pipeline"><p className="eyebrow">{t('ui.architecture')}</p><p>{t('ui.clickStage')}</p><div className="pipeline-steps">{steps.map((step,i)=><div key={i}><button aria-pressed={active===i} onClick={()=>setActive(i)}><span className="mono">0{i+1}</span>{pick(step)}</button>{i<steps.length-1&&<ChevronRight aria-hidden="true"/>}</div>)}</div><p className="pipeline-result" role="status">{t('ui.stage')} {active+1}: <strong>{pick(steps[active])}</strong></p><small>{t('ui.illustrative')}</small></div>}
