# Júlia Neris · AI & Software Engineering

Frontend React/TypeScript completo, estático e bilíngue (PT-BR/EN-US), com temas claro/escuro e páginas de estudos de caso.

## Começar

Requer **Node.js 22.12+** e npm. Na pasta `portfolio`:

```sh
npm install
npm run dev
```

O Vite informa o endereço local (normalmente http://localhost:5173). Para gerar e abrir a versão de produção:

```sh
npm run build
npm run preview
```

O build verifica TypeScript, paridade de traduções, gera o bundle, metadados por rota e uma imagem Open Graph PNG. A pasta final é `dist/`. As dependências são resolvidas por npm e o lockfile gerado deve ser mantido após uma instalação validada; neste checkout não foi possível produzir um lockfile local.

## Estrutura

- `src/data/`: projetos tipados, experiência, competências, perfis e configuração.
- `src/locales/pt|en/`: textos da interface.
- `src/content/articles/`: conteúdo editorial estruturado e bilíngue.
- `src/pages/`: início, projeto, artigo e página 404.
- `src/components/`: layout, animações, projetos, experimentos e UI.
- `src/hooks/`: idioma e tema.
- `src/services/classifier.ts`: contrato de inferência, validação e timeout via AbortController.
- `src/styles/global.css`: identidade visual e responsividade.
- `scripts/`: verificação de traduções e geração de metadados.
- `tests/`: testes de aceitação no navegador.

## Publicar na Vercel

1. Importe o repositório no painel da Vercel.
2. Selecione a branch `codex/ai-portfolio` para uma prévia ou faça merge depois de revisar.
3. Defina **Root Directory = portfolio**. Se extrair somente essa pasta para outro repositório, use a raiz.
4. Framework: **Vite**. Install Command: `npm install`. Build Command: `npm run build`. Output Directory: `dist`.
5. Node.js: 22.x ou versão compatível mais recente.
6. Opcionalmente configure `VITE_PUBLIC_SITE_URL` com o domínio HTTPS definitivo. Ele gera URLs canônicas e imagem Open Graph absoluta.
7. Publique. O `vercel.json` oferece fallback para rotas do React Router e cabeçalhos básicos.

Não é necessário backend nem banco de dados. A publicação na Vercel **não foi realizada automaticamente**.

## Foto, currículo e contato

A foto anexada na conversa não pôde ser copiada porque o ambiente local estava indisponível. O componente inclui um **placeholder explicitamente identificado**, sem rosto fictício.

- Foto real: adicione `public/images/profile.jpg`. O componente `ProfilePortrait` usa esse caminho automaticamente, preservando a aparência da pessoa. O enquadramento pode ser ajustado em `object-position` no CSS.
- CV: adicione `public/cv/julia-neris.pdf` e altere `config.cv` em `src/data/config.ts` para `'/cv/julia-neris.pdf'`.
- E-mail: preencha `config.email` apenas com um endereço real autorizado.
- O botão de CV permanece desabilitado enquanto não houver arquivo configurado.
- Não há dados profissionais, contato ou URLs fictícios.

## Conteúdos pendentes

- Fotografia real na pasta do projeto (já enviada na conversa, mas não copiada).
- Currículo PDF e e-mail profissional.
- PDF/link definitivo do artigo científico SinfonIA.
- Screenshots reais dos projetos; as artes de capa atuais são diagramas decorativos, não screenshots.
- Espectrogramas, arquivos e resultados reais para a aba de áudio.
- Competições/notebooks específicos do Kaggle; atualmente há apenas o perfil.
- URLs e estudos completos dos projetos adicionais.
- Endpoint público e autorizado do HelpDesk ML. O Space consultado em 16/11/2026 continha apenas README e .gitattributes; sua existência não comprova uma demonstração funcionando.

## Inferência: sem simulações

Por padrão, a área de texto mostra **integração pendente** e não faz requisições. Ela nunca usa heurísticas locais como se fossem o modelo real.

Para ativar, copie `.env.example` para `.env.local` e configure:

```dotenv
VITE_HELPDESK_API_URL=https://SEU-ENDPOINT-AUTORIZADO/predict
```

O endereço acima é um exemplo documental, não um endereço usado pela aplicação.

Contrato:

```json
POST /predict
{"text":"Não consigo acessar minha conta"}
```

```json
{"categoria_sugerida":"acesso","revisao_humana":true}
```

A categoria precisa estar entre `acesso, rede, software, hardware, dados`. O frontend mantém revisão humana obrigatória. Não mostra confiança: não há medida apropriada confirmada no contrato.

Configure CORS para o domínio do portfólio no serviço. Produção exige HTTPS. Nunca coloque tokens em variáveis `VITE_*`: elas são públicas. Se a API exigir segredo, use um proxy autorizado no servidor, fora deste frontend estático. Dados digitados só são transmitidos após o envio manual e apenas quando o endpoint foi configurado.

## Projetos e evidências

- SinfonIA: https://github.com/julia-neris/TG
- Backend: https://huggingface.co/spaces/JuliaNeris0017/sinfonia-backend
- Apresentação: https://www.youtube.com/watch?v=38zLxc0M690
- HelpDesk ML: https://github.com/julia-neris/helpdesk-ml
- Modelo: https://huggingface.co/JuliaNeris0017/helpdesk-tfidf-pt
- Space: https://huggingface.co/spaces/JuliaNeris0017/helpdesk-ml-demo
- Automação SAP/RH: https://github.com/julia-neris/Auto---Aprovador-CC

As métricas do SinfonIA são reportadas pela autora. As do HelpDesk foram extraídas do README público em 16/11/2026. O estudo SAP/RH descreve somente abordagem técnica, sem incluir planilhas ou registros corporativos. O artigo interno é uma nota do portfólio, não uma publicação em periódico. A visualização neural é educacional e não representa o classificador TF-IDF.

## Testes

```sh
npm run build
npx playwright install chromium
npm test
```

Os testes usam Chromium desktop e mobile: temas, idioma/persistência, filtros, rotas diretas, estados pendentes, navegação por teclado nas abas, rede ilustrativa, links, redução de movimento e overflow.

A integração contínua está em `../.github/workflows/portfolio.yml` e publica artefatos com o build e o relatório de testes. Não declara sucesso se os testes não rodarem. O build local não pôde ser executado durante a criação porque o ambiente de execução estava indisponível; consulte o resultado efetivo da execução no GitHub Actions.

## Acessibilidade e desempenho

- Preferência do sistema para tema, override persistente e inicialização antes da renderização.
- Preferência de movimento reduzido nas animações, no Canvas e no CSS.
- Canvas com 30 partículas, resolução limitada e pausa de desenho fora da tela.
- Rotas e gráfico com carregamento sob demanda.
- Abas acessíveis, foco visível, skip link e teclado na rede ilustrativa.
- Sem barras de proficiência arbitrárias.
- Fontes Google com `display=swap`; fontes de sistema funcionam se a rede bloquear o download.
- Componentes React renderizam texto com escape; nenhum HTML editorial bruto é injetado.
- Títulos e descrições iniciais gerados por rota. O idioma é controlado no cliente; páginas com prerender completo por idioma podem ser uma evolução.
- O preview Vite serve páginas estáticas; a configuração Vercel foi incluída, mas a hospedagem deve ser verificada após implantação.

## Adicionar um projeto

Acrescente um objeto `Project` em `src/data/projects.ts`, com conteúdo PT/EN, categorias, tecnologias, etapas, seções e links reais. A rota individual e os filtros são derivados automaticamente desse cadastro. Para metadata estática no build, adicione a rota em `scripts/metadata.mjs`. Para imagem real, use `screenshot:'/images/nome.jpg'`.

## Referências técnicas

- https://vite.dev/guide/
- https://react.i18next.com/latest/usetranslation-hook
- https://motion.dev/docs/react-accessibility
