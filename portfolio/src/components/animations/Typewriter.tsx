import {useEffect,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {useLocale} from '../../hooks/useLocale';
export default function Typewriter(){const {t,lang}=useLocale();const reduced=useReducedMotion();const roles=t('hero.roles',{returnObjects:true}) as string[];const [value,setValue]=useState(roles[0]);
 useEffect(()=>{if(reduced){setValue(roles[0]);return}let index=0,count=roles[0].length,deleting=true;let timer:ReturnType<typeof setTimeout>;const step=()=>{const role=roles[index];count+=deleting?-1:1;setValue(role.slice(0,count));let delay=deleting?32:65;if(count===0){deleting=false;index=(index+1)%roles.length;delay=350}if(!deleting&&count===roles[index].length){deleting=true;delay=2200}timer=setTimeout(step,delay)};setValue(roles[0]);timer=setTimeout(step,2200);return()=>clearTimeout(timer)},[lang,reduced]);
 return <div className="typewriter"><span className="status-dot"/><span aria-hidden="true">{value}<span className="cursor">_</span></span><span className="sr-only">{roles.join(', ')}</span></div>;
}
