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

### 6.3 Domínio próprio (wmarqdesign.com.br)

O domínio já foi comprado, mas **ainda não está com o DNS na Cloudflare** —
por isso o painel do Pages pede uma transferência de DNS antes de liberar o
"Custom domain". Passo a passo real, testado no painel deste projeto
(`wm-arqdesign` → **Custom domains**):

1. **Antes de tudo**, se o domínio tiver e-mail configurado (Gmail Workspace,
   etc.), confira os registros **MX** atuais no seu registrador (ex:
   Registro.br) e anote-os — a Cloudflare escaneia e importa os registros
   existentes automaticamente, mas vale conferir depois que não sumiu nada.
2. No projeto do Pages → aba **Custom domains** → **Set up a custom domain** →
   digite `wmarqdesign.com.br` → **Continue**.
3. O painel vai pedir **"Begin DNS transfer"** — clique para adicionar a zona
   à Cloudflare (isso só prepara a conta; nada muda no domínio ainda).
4. A Cloudflare mostra dois **nameservers** (algo como `xxx.ns.cloudflare.com`
   e `yyy.ns.cloudflare.com`). Copie os dois.
5. Entre no painel do registrador onde o domínio foi comprado (Registro.br,
   se for `.com.br` gerenciado lá) e troque os nameservers do domínio para
   os dois que a Cloudflare deu. **Essa etapa precisa ser feita por vocês** —
   exige login no registrador, que a Claude não tem acesso.
6. A propagação leva de alguns minutos até ~48h. Quando a Cloudflare detectar
   a mudança, a zona fica ativa e o Custom Domain do Pages é liberado
   automaticamente (volte em **Custom domains** e confirme).
7. Repita o passo 2 para adicionar também `www.wmarqdesign.com.br`, se quiser
   o site respondendo nos dois formatos.
8. Depois que o domínio estiver ativo, atualize `url` em `src/_data/site.js`
   para `https://wmarqdesign.com.br` (usado em canonical, sitemap e Open
   Graph) e publique de novo.

## 7. Checklist antes de publicar

- [x] Access key do formulário preenchida (`site.js` → `form.accessKey`)
- [x] Repositório confirmado (`site.js` → `repo`)
- [x] Biografia real do profissional (CV) aplicada na página Sobre
- [x] WhatsApp/telefone/Instagram conferidos
- [ ] **Domínio `wmarqdesign.com.br`** — comprado, falta trocar os nameservers
      no registrador (ver seção 6.3 acima — depende de login que a Claude não tem)
- [ ] **Facebook, LinkedIn e Behance** — ícones já prontos no rodapé
      (`src/_includes/partials/footer.njk`), só faltam as URLs reais em
      `site.js` → `social.facebook` / `social.linkedin` / `social.behance`
- [ ] **Depoimentos da home são fictícios** (a pedido explícito, 5 depoimentos
      inventados em `src/index.njk`) — publicar depoimentos fabricados como se
      fossem reais é publicidade enganosa sob o CDC e o Código CONAR. Trocar
      pelos depoimentos reais dos clientes assim que possível.
- [ ] (Opcional) Cloudflare Turnstile no formulário de contato

---

Feito com Eleventy · imagens otimizadas com eleventy-img · sem frameworks no cliente.
