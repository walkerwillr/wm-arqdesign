# WM Arquitetura & Design — site

Site de portfólio e captação de clientes do escritório **WM Arquitetura & Design**,
gerado com [Eleventy (11ty)](https://www.11ty.dev/) e preparado para deploy
automático via **GitHub → Cloudflare Pages**.

- Portfólio de projetos (residencial, cozinhas, comercial, paisagismo, maquetes)
- Página por projeto com galeria e lightbox
- Captação: formulário + WhatsApp + telefone + e-mail + Instagram
- Performance, SEO e acessibilidade (WCAG AA) como prioridade
- Imagens responsivas (WebP + JPEG) geradas no build com `@11ty/eleventy-img`,
  com **remoção de metadados EXIF/GPS**

---

## 1. Requisitos

- **Node.js 18+** (recomendado 22 — ver `.nvmrc`)
- npm

## 2. Rodar localmente

```bash
npm install
npm run dev      # servidor local com hot-reload em http://localhost:8080
```

Outros comandos:

```bash
npm run build    # gera o site estático em ./_site
npm run clean    # remove ./_site
```

## 3. Estrutura

```
site/
├── .eleventy.js              # config do Eleventy + shortcode de imagem responsiva
├── package.json
├── src/
│   ├── _data/
│   │   ├── site.js           # ⭐ MARCA E CONTATOS (edite aqui)
│   │   ├── projects.js       # ⭐ PROJETOS: títulos, descrições, categorias
│   │   └── build.js
│   ├── _includes/
│   │   ├── layouts/base.njk  # <head>, SEO, JSON-LD, estrutura
│   │   └── partials/         # header, footer, botão WhatsApp
│   ├── assets/
│   │   ├── css/styles.css    # design system
│   │   ├── js/main.js        # menu, filtro, lightbox, formulário
│   │   ├── fonts/            # fontes auto-hospedadas (Cormorant + Inter)
│   │   ├── img/              # favicon rasterizado, og.jpg, ícones PWA
│   │   └── projects/<slug>/  # ⭐ IMAGENS já tratadas/anonimizadas (01.jpg = capa)
│   ├── static/               # favicon.svg, favicon.ico (copiados para a raiz)
│   ├── index.njk             # Home
│   ├── portfolio.njk         # Portfólio (grade + filtros)
│   ├── projeto.njk           # Página individual (paginação sobre os projetos)
│   ├── sobre.njk
│   ├── contato.njk
│   ├── sitemap.njk / robots.njk / site.webmanifest.njk / 404.njk
```

## 4. Onde trocar textos, imagens e contatos

### Contatos e marca → `src/_data/site.js`
Nome, slogan, WhatsApp, telefone, e-mail, Instagram, domínio, cores de tema e a
**chave do formulário** ficam todos aqui. Placeholders pendentes estão marcados
com `<<` para busca rápida.

### Projetos → `src/_data/projects.js`
Cada projeto tem `title`, `category`, `location`, `tags`, `summary` e
`description`. As imagens são lidas **automaticamente** de
`src/assets/projects/<slug>/` em ordem alfabética (`01.jpg` é a capa).

**Para adicionar/atualizar um projeto:**
1. Crie/edite a pasta `src/assets/projects/<slug>/` com as imagens tratadas
   (nomeie `01.jpg`, `02.jpg`, …).
2. Adicione/edite o bloco correspondente em `projects.js`.
3. `npm run build`.

> ⚠️ **Privacidade:** use apenas imagens finais/renders anonimizados. Não
> versione plantas técnicas, orçamentos, `.dwg/.skb/.promob/.mov` — o
> `.gitignore` já bloqueia esses padrões por segurança.

### Preparar novas imagens (conversão + remoção de EXIF)
As imagens em `src/assets/projects/` já entram no pipeline do `eleventy-img`
(que gera WebP/JPEG responsivos e remove metadados). Se for adicionar fotos
novas (ex.: HEIC do celular), converta antes para JPG limpo. Exemplo com
ImageMagick:

```bash
magick "foto.HEIC" -auto-orient -strip -resize "1920x1920>" -quality 88 "01.jpg"
```

(`-strip` remove EXIF/GPS; `-auto-orient` corrige a rotação do celular.)

## 5. Formulário de contato (Web3Forms)

O site é estático; o formulário usa o **[Web3Forms](https://web3forms.com)**
(gratuito, sem backend).

1. Crie uma access key grátis informando o e-mail de contato.
2. Cole a chave em `src/_data/site.js` → `form.accessKey`.
3. (Opcional) anti-spam extra: crie um site key do **Cloudflare Turnstile** e
   preencha `form.turnstileSiteKey`. O honeypot já está ativo por padrão.

Enquanto a chave for placeholder, o formulário exibe um aviso e orienta o
visitante a usar WhatsApp/e-mail.

> Alternativa: se preferir **Cloudflare Pages Functions**, crie
> `functions/api/contact.js` e aponte o `action` do formulário para
> `/api/contact` — mas o Web3Forms já resolve sem manutenção.

## 6. Deploy — GitHub + Cloudflare Pages

### 6.1 Subir para o GitHub
```bash
git init
git add .
git commit -m "site inicial"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

### 6.2 Conectar no Cloudflare Pages
1. Painel Cloudflare → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → selecione o repositório.
2. Configurações de build:
   - **Framework preset:** None
   - **Build command:** `npx @11ty/eleventy`
   - **Build output directory:** `_site`
   - **Root directory:** `/` (ou `site` se o repo contiver a pasta `site/`)
   - **Environment variable:** `NODE_VERSION = 22`
3. **Save and Deploy**. A cada `git push` na branch `main` o Cloudflare
   reconstrói e publica automaticamente. A prévia fica em `https://<projeto>.pages.dev`.

### 6.3 Domínio próprio
1. No projeto do Pages → **Custom domains** → **Set up a domain** →
   `wmarqdesign.com.br` (e `www`).
2. Se o DNS estiver na Cloudflare, os registros são criados automaticamente.
   Caso contrário, aponte no seu provedor:
   - `CNAME www` → `<projeto>.pages.dev`
   - domínio raiz: use o **CNAME flattening** da Cloudflare (registro `@` →
     `<projeto>.pages.dev`).
3. Atualize `url` em `src/_data/site.js` para o domínio final (usado em
   canonical, sitemap e Open Graph).

## 7. Checklist antes de publicar

- [ ] Preencher a access key do formulário (`site.js` → `form.accessKey`)
- [ ] Confirmar usuário/nome do repositório (`site.js` → `repo`)
- [ ] Revisar o texto da página **Sobre** (biografia do profissional)
- [ ] Conferir número de WhatsApp/telefone e handle do Instagram
- [ ] (Opcional) Cloudflare Turnstile
- [ ] Apontar o domínio `wmarqdesign.com.br`

---

Feito com Eleventy · imagens otimizadas com eleventy-img · sem frameworks no cliente.
