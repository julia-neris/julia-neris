import {useEffect,useState} from 'react';
export function useTheme(){
 const [theme,setTheme]=useState<'dark'|'light'>(()=>document.documentElement.dataset.theme==='dark'?'dark':'light');
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#0B0D14':'#F8FAFC')},[theme]);
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const change=()=>{let saved:string|null=null;try{saved=localStorage.getItem('jn-theme')}catch{/* optional */}if(saved!=='dark'&&saved!=='light')setTheme(media.matches?'dark':'light')};media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 return{theme,toggleTheme:()=>setTheme(current=>{const next=current==='dark'?'light':'dark';try{localStorage.setItem('jn-theme',next)}catch{/* optional */}return next})};
}
