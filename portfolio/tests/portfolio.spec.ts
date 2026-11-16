import {test,expect} from '@playwright/test';
test('language changes every section and persists',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:'Júlia Neris.'})).toBeVisible();
 await page.getByRole('button',{name:'Switch to English'}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','en-US');
 await expect(page.getByRole('heading',{name:'Ideas turned into code.'})).toBeVisible();
 await page.getByRole('heading',{name:'Building with context.'}).scrollIntoViewIfNeeded();
 await expect(page.getByRole('heading',{name:'Building with context.'})).toBeVisible();
 await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','en-US');
 await page.getByRole('button',{name:'Mudar para português'}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','pt-BR');
});
test('theme follows system and manual choice persists',async({page})=>{
 await page.emulateMedia({colorScheme:'dark'});await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.getByRole('button',{name:'Alternar tema'}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});
test('filters display only matching real projects',async({page})=>{
 await page.goto('/#projects');await page.getByRole('button',{name:'NLP',exact:true}).click();
 await expect(page.locator('.project-card')).toHaveCount(1);
 await expect(page.locator('.project-card')).toContainText('HelpDesk ML');
 await page.getByRole('button',{name:'Automação',exact:true}).click();
 await expect(page.locator('.project-card')).toHaveCount(1);
 await expect(page.locator('.project-card')).toContainText('SAP / RH');
 await page.getByRole('button',{name:'Todos',exact:true}).click();
 await expect(page.locator('.project-card')).toHaveCount(3);
});
test('direct case-study routes and locale work',async({page})=>{
 await page.goto('/projects/sinfonia');
 await expect(page.getByRole('heading',{name:'SinfonIA.',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Estratégia de avaliação'})).toBeAttached();
 await page.getByRole('button',{name:'Switch to English'}).click();
 await expect(page.getByRole('heading',{name:'Evaluation strategy'})).toBeAttached();
 await expect(page).toHaveTitle('SinfonIA — Júlia Neris');
 await page.goto('/projects/helpdesk-ml');await expect(page.locator('.case-prose')).toContainText('55%');
 await page.goto('/projects/aprovadores');await expect(page.locator('.case-prose')).toContainText('supervised learning');
});
test('lab does not fabricate predictions and keyboard tabs work',async({page})=>{
 await page.goto('/#lab');await page.getByLabel('Descreva um chamado de TI').fill('Não consigo acessar minha conta');
 await expect(page.getByRole('button',{name:'Classificar chamado'})).toBeDisabled();
 await expect(page.getByText('Integração pendente',{exact:true})).toBeVisible();
 const tab=page.getByRole('tab',{name:'Classificação de texto'});await tab.focus();await page.keyboard.press('ArrowRight');
 await expect(page.getByRole('tab',{name:'Explorador de redes'})).toHaveAttribute('aria-selected','true');
 await expect(page.getByRole('slider',{name:'Camadas ocultas'})).toBeVisible();
 await page.getByRole('slider',{name:'Camadas ocultas'}).fill('3');
 await expect(page.locator('.network-svg [role=button]')).toHaveCount(17);
 await page.getByRole('button',{name:'Nó 1.1',exact:true}).click();
 await expect(page.getByRole('button',{name:'Nó 1.1',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('tab',{name:'Análise de áudio'}).click();
 await expect(page.getByText('Aguardando dados reais',{exact:true})).toBeVisible();
});
test('portrait fallback and pending CV are honest',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('img',{name:'Espaço reservado para a fotografia'}).first()).toBeVisible();
 await expect(page.getByRole('button',{name:'Currículo em breve'})).toBeDisabled();
});
test('article and missing route render',async({page})=>{
 await page.goto('/writing/evaluating-helpdesk');
 await expect(page.getByRole('heading',{name:'Como avaliar um classificador com poucos dados?'})).toBeVisible();
 await expect(page.locator('.case-prose')).toContainText('80 mensagens');
 await page.goto('/missing');await expect(page.getByRole('heading',{name:'Esta página não foi encontrada.'})).toBeVisible();
});
test('external links use safe new-tab attributes',async({page})=>{
 await page.goto('/');
 const links=page.locator('a[href^="https://"]');expect(await links.count()).toBeGreaterThan(10);
 for(const link of await links.all()){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','noopener noreferrer')}
});
test('responsive layout has no horizontal overflow and reduced motion works',async({page,isMobile})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await expect(page.locator('.floating-label').first()).toHaveCSS('animation-name','none');
 if(isMobile){await page.getByRole('button',{name:'Abrir menu'}).click();await expect(page.locator('#mobile-nav')).toBeVisible();await page.locator('#mobile-nav').getByRole('link',{name:'Projetos',exact:true}).click();await expect(page.locator('#mobile-nav')).toHaveCount(0)}
});
