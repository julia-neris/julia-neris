import {useEffect,useRef} from 'react';
import {useReducedMotion} from 'motion/react';
export default function ParticleField(){
 const ref=useRef<HTMLCanvasElement>(null);const reduced=useReducedMotion();
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;let frame=0;let w=0,h=0;let visible=true;let last=0;const mouse={x:-1000,y:-1000};const points=Array.from({length:30},(_,i)=>({x:((i*67+13)%101)/101,y:((i*37+7)%97)/97,phase:i*.7}));
 const resize=()=>{w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio,1.5);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw(0)};
 const draw=(time:number)=>{ctx.clearRect(0,0,w,h);const color=getComputedStyle(canvas).getPropertyValue('--particle').trim()||'139,92,246';const pts=points.map(p=>({x:p.x*w+(reduced?0:Math.sin(time/7000+p.phase)*12),y:p.y*h+(reduced?0:Math.cos(time/8500+p.phase)*12)}));
 pts.forEach((p,i)=>{ctx.fillStyle='rgba('+color+',.38)';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();for(let j=i+1;j<pts.length;j++){const q=pts[j],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<150){ctx.strokeStyle='rgba('+color+','+(.17*(1-dist/150))+')';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}if(Math.hypot(p.x-mouse.x,p.y-mouse.y)<180){ctx.strokeStyle='rgba('+color+',.3)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}});
 };
 const tick=(time:number)=>{if(visible&&!document.hidden&&time-last>40){draw(time);last=time}frame=requestAnimationFrame(tick)};
 const move=(event:PointerEvent)=>{if(event.pointerType==='touch')return;const r=canvas.getBoundingClientRect();mouse.x=event.clientX-r.left;mouse.y=event.clientY-r.top};
 const leave=()=>{mouse.x=-1000;mouse.y=-1000};
 const obs=new ResizeObserver(resize);obs.observe(canvas);const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});intersection.observe(canvas);resize();if(!reduced){frame=requestAnimationFrame(tick);window.addEventListener('pointermove',move);window.addEventListener('blur',leave)}
 return()=>{cancelAnimationFrame(frame);obs.disconnect();intersection.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('blur',leave)};
 },[reduced]);return <canvas ref={ref} className="particles" aria-hidden="true"/>;
}
