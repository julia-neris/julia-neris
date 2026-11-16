export interface Prediction { category:string; text:string; }
const configured=import.meta.env.VITE_HELPDESK_API_URL?.trim() as string|undefined;
export const classifierUrl=(()=>{if(!configured)return null;try{const url=new URL(configured);return url.protocol==='https:'||(import.meta.env.DEV&&url.hostname==='localhost')?url.href:null}catch{return null}})();
export async function classify(text:string,signal:AbortSignal):Promise<Prediction>{
 if(!classifierUrl)throw new Error('unconfigured');
 const response=await fetch(classifierUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text}),signal,credentials:'omit'});
 if(!response.ok)throw new Error('HTTP '+response.status);
 const data:unknown=await response.json();
 if(typeof data!=='object'||data===null||!('categoria_sugerida' in data)||typeof data.categoria_sugerida!=='string'||!['acesso','rede','software','hardware','dados'].includes(data.categoria_sugerida.toLowerCase()))throw new Error('Invalid prediction');
 return{category:data.categoria_sugerida,text};
}
