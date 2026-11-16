import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import sharp from 'sharp';
const base=readFileSync('dist/index.html','utf8');
const routes=[
 {path:'',title:'Júlia Neris — AI & Software Engineering',description:'Portfólio de Júlia Neris: pesquisa aplicada em IA, Machine Learning, engenharia de dados e software.'},
 {path:'projects/sinfonia',title:'SinfonIA — Júlia Neris',description:'Pesquisa aplicada em transcrição musical com análise de sinais, separação de fontes e detecção de altura.'},
 {path:'projects/helpdesk-ml',title:'HelpDesk ML — Júlia Neris',description:'Classificação de chamados com TF-IDF e regressão logística. Metodologia, métricas e limitações documentadas.'},
 {path:'projects/aprovadores',title:'SAP / RH — Júlia Neris',description:'Engenharia de dados e automação com correspondência de nomes e regras de elegibilidade.'},
 {path:'writing/evaluating-helpdesk',title:'Como avaliar um classificador com poucos dados? — Júlia Neris',description:'Uma nota técnica sobre separação por cenário, baseline e macro-F1 no HelpDesk ML.'},
];
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const configured=process.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/,'');
let origin='';if(configured){const url=new URL(configured);if(url.protocol!=='https:')throw new Error('VITE_PUBLIC_SITE_URL must use HTTPS');origin=url.origin}
await sharp('public/og-image.svg').png().toFile('dist/og-image.png');
for(const route of routes){let html=base.replace(/<title>.*?<\/title>/,'<title>'+escape(route.title)+'</title>').replace(/(<meta name="description" content=")[^"]*/,'$1'+escape(route.description)).replace(/(<meta property="og:title" content=")[^"]*/,'$1'+escape(route.title)).replace(/(<meta property="og:description" content=")[^"]*/,'$1'+escape(route.description)).replace('content="/og-image.svg"','content="'+origin+'/og-image.png"');
 if(origin){const url=origin+'/'+route.path;html=html.replace('</head>','<link rel="canonical" href="'+url+'"/><meta property="og:url" content="'+url+'"/></head>')}
 const dir='dist'+(route.path?'/'+route.path:'');mkdirSync(dir,{recursive:true});writeFileSync(dir+'/index.html',html)}
console.log('Route metadata and Open Graph PNG: OK');
