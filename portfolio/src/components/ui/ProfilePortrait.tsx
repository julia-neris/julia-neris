import {useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {Sparkles,ScanLine} from 'lucide-react';
import {config} from '../../data/config';
import {useLocale} from '../../hooks/useLocale';
export default function ProfilePortrait({small=false}:{small?:boolean}){const {t}=useLocale();const [failed,setFailed]=useState(false);const [rotation,setRotation]=useState({x:0,y:0});const reduced=useReducedMotion();
 return <div className={'portrait-shell '+(small?'portrait-small':'')} onPointerMove={e=>{if(reduced||small||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();setRotation({x:-(e.clientY-r.top-r.height/2)/100,y:(e.clientX-r.left-r.width/2)/100})}} onPointerLeave={()=>setRotation({x:0,y:0})}>
 <div className="portrait-orbit" aria-hidden="true"/>
 <motion.div className="portrait-frame" animate={{rotateX:rotation.x,rotateY:rotation.y}} transition={{type:'spring',stiffness:90,damping:20}}>
 {!failed?<img src={config.portrait} alt={t('ui.portrait')} loading={small?'lazy':'eager'} onError={()=>setFailed(true)}/>:<div className="portrait-placeholder" role="img" aria-label={t('ui.portraitPending')}><div className="monogram">JN<span>.</span></div><p>JÚLIA NERIS</p><span>{t('ui.portraitPending')}</span><ScanLine size={38} aria-hidden="true"/></div>}
 <div className="portrait-caption"><span>{t('hero.note')}</span><Sparkles size={18} aria-hidden="true"/></div>
 </motion.div>
 {!small&&<><div className="floating-label label-top"><span className="status-dot"/>Python · ML · React</div><div className="floating-label label-bottom"><span className="code-bracket">&lt;/&gt;</span>{t('hero.code')}</div><span className="portrait-coordinate" aria-hidden="true">JN / 001 — HUMAN + MACHINE</span></>}
 </div>;
}
