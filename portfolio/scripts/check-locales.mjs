import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=lang=>JSON.parse(readFileSync(new URL('../src/locales/'+lang+'/translation.json',import.meta.url),'utf8'));
function leaves(value,prefix=''){return Object.entries(value).flatMap(([key,item])=>typeof item==='object'&&!Array.isArray(item)?leaves(item,prefix+key+'.'):[prefix+key]).sort()}
const pt=read('pt'),en=read('en');assert.deepEqual(leaves(pt),leaves(en),'Translation keys differ');
for(const data of [pt,en])assert.ok(data.hero.roles.length===5);
console.log('PT/EN translation key parity: OK');
