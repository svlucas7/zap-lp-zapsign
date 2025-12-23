[![Demo](https://img.shields.io/badge/demo-online-success?logo=netlify)](http://zapsign.netlify.app/)
![Preview](public/assets/images/NAVIO.avif)
# ZapSign — Landing page de catálogo de comunicação visual

Este repositório contém a landing page estática do portal ZapSign, projetada para apresentar soluções de comunicação visual (banners, displays, totens, backdrops e materiais de ponto de venda), facilitar orçamentos rápidos e contato comercial via WhatsApp.

## Objetivo do repositório

- Servir como site promocional responsivo e catálogo de produtos para revenda B2B.
- Oferecer galerias por produto com imagens por ângulo e seleção por cor.
- Gerar mensagens de orçamento pré-preenchidas para WhatsApp a partir do formulário de contato.

## Tecnologias

- HTML semântico + Tailwind CSS (via CDN e configuração local para builds)
- JavaScript (vanilla) em `public/main.js` para galeria, modal e geração de mensagem
- Imagens otimizadas em AVIF em `public/assets/images`

## Estrutura do projeto

- `index.html` — página principal e catálogo
- `public/` — assets públicos (scripts, imagens, estilos gerados)
	- `public/main.js` — lógica de interatividade (galerias, modal, compare e geração de WhatsApp)
- `src/input.css` — entrada do Tailwind (quando usado localmente)
- `docs/preview.avif` — imagem de preview para o GitHub

## Desenvolvimento local

Instalação (opcional, somente se for usar o build do Tailwind):

```bash
npm install
```

Executar em modo de desenvolvimento (gera CSS com Tailwind se configurado):

```bash
npm run dev
```

Visualização rápida (sem dependências):

```bash
python -m http.server 8000
# abra http://localhost:8000
```

Gerar build de produção dos estilos (quando aplicável):

```bash
npm run build
```

## Deploy

Pode ser hospedado em Netlify, Vercel ou GitHub Pages. Se usar processamento local do Tailwind, execute `npm run build` antes do deploy.

## Observações importantes

- Ao adicionar novas pastas de imagens, atualize `public/main.js` para incluir os metadados do produto e garantir que a galeria exiba corretamente as imagens e códigos de produto.
- Algumas imagens ainda mantêm nomes legados (ex.: `zapport_1.avif`); renomeie-as com cuidado e atualize referências se desejar alinhar nomes ao branding ZapSign.
- Recomenda-se adicionar um `.gitignore` com arquivos temporários e remover binários não essenciais do histórico quando necessário.

---

Maintainer: Lucas Silva (@svlucas7)
Repo remoto: https://github.com/svlucas7/zap-lp-zapsign.git
