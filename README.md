[![Demo](https://img.shields.io/badge/demo-online-success?logo=netlify)](http://zapsign.netlify.app/)
![Preview](docs/preview.avif)

# ZapSign — Landing page de catálogo de comunicação visual

Este repositório contém a landing page utilizada pela ZapSign para apresentar produtos promocionais e soluções em comunicação visual, gerar orçamentos rápidos e facilitar contato comercial via WhatsApp.

## Objetivos

- Catálogo leve e responsivo focado em conversão e geração de leads.
- Galerias por produto com imagens por ângulo e seleção por cor.
- Formulário de orçamento com validações de quantidade mínima e mensagem pré-preenchida para WhatsApp.

## Tecnologias

- HTML semântico + Tailwind CSS
- JavaScript (vanilla) em `public/main.js`
- Imagens otimizadas em AVIF em `public/assets/images`

## Estrutura

- `index.html`  página principal
- `public/`  assets públicos (scripts, imagens, estilos gerados)
- `src/input.css`  entrada do Tailwind
- `public/main.js`  interação: modais, galeria e geração de mensagem
- `docs/preview.avif`  imagem de preview usada no GitHub

## Rodando localmente

1. Instale dependências e rode o watch do Tailwind (opcional):

```bash
npm install
npm run dev
```

2. Visualização rápida (sem Tailwind watch):

```bash
python -m http.server 8000
# abra http://localhost:8000
```

3. Build de produção dos estilos:

```bash
npm run build
```

## Atualizar preview

Para gerar/atualizar o preview do repositório copie uma imagem representativa para `docs/preview.avif`. Exemplo (já executado neste commit): copiar `public/assets/images/zapport_1.avif`  `docs/preview.avif`.

## Deploy

- GitHub Pages ou Netlify (configurar build: `npm run build` se usar Tailwind)

## Observações

- Alguns arquivos PSD e `Thumbs.db` foram incluídos por comodidade; recomendo limpar o histórico e adicionar entradas adequadas ao `.gitignore` se desejar manter o repositório enxuto.
- Atualize `public/main.js` ao adicionar novas pastas de imagens para que as galerias funcionem corretamente.

---

Maintainer: Lucas Silva (@svlucas7)
