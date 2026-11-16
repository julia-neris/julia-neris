import type {ReactNode} from 'react';
import {motion,useMotionValue,useSpring,useReducedMotion} from 'motion/react';
export default function MagneticLink({href,children}:{href:string;children:ReactNode}){
 const reduce=useReducedMotion();const x=useMotionValue(0),y=useMotionValue(0);const sx=useSpring(x,{stiffness:190,damping:18}),sy=useSpring(y,{stiffness:190,damping:18});
 return <motion.a href={href} className="button primary magnetic" style={{x:reduce?0:sx,y:reduce?0:sy}} onPointerMove={e=>{if(reduce||e.pointerType==='touch')return;const bounds=e.currentTarget.getBoundingClientRect();x.set((e.clientX-bounds.left-bounds.width/2)*.08);y.set((e.clientY-bounds.top-bounds.height/2)*.12)}} onPointerLeave={()=>{x.set(0);y.set(0)}} onBlur={()=>{x.set(0);y.set(0)}}>{children}</motion.a>;
}
