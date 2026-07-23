# AGENTS.md — XanaScript Site

## Projeto

Site oficial do XanaScript (xanascript.xyz). Reconstrção completa do zero. Código antigo em `/old`.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Templates:** EJS
- **Estilo:** Tailwind CSS (sem CSS puro)
- **Banco:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Ícones:** Material Symbols Outlined
- **Fontes:** Montserrat (títulos), Google Sans Code (código)

## Estrutura

```
xs-site/
├── app.js              # entrada do servidor
├── tailwind.config.js   # cores, fontes, extend
├── routes/              # controllers (index.js, auth.js, admin.js, api/*)
├── views/               # templates EJS
│   ├── partials/        # head.ejs, navbar.ejs, footer.ejs
│   ├── layouts/         # layout principal
│   └── (páginas)
├── models/              # Mongoose schemas
├── middleware/           # auth, cache, admin
├── services/            # email, sanitize, etc
├── public/              # assets estáticos (JS, imagens, favicon)
├── tests/               # testes
├── docs/                # documentação do projeto (ROADMAP, DESIGN)
├── scripts/             # seeds, migrations
└── old/                 # código antigo (arquivado)
```

## Convenções

### Código
- **ESM modules** (`import`/`export`, não `require`)
- **Arrow functions** (não `function`)
- Nomes em inglês (arquivos, variáveis, funções, rotas)
- `camelCase` em variáveis e funções
- `PascalCase` em modelos e classes
- `kebab-case` em arquivos de view
- Async/await (não .then().catch())
- Sempre tratar erros com try/catch

### Views
- EJS puro (sem React, sem cliente)
- Partial para head, navbar, footer
- Layout principal em `views/layouts/`
- Conteúdo dinâmico vindo do banco (nada hardcoded)

### Estilo
- **Apenas Tailwind CSS** — nenhum arquivo .css puro
- Cores personalizadas no `tailwind.config.js`
- Responsivo mobile-first (sm, md, lg)
- Dark theme (fundo preto, texto claro, rosa como destaque)
- Border-radius 10px máximo

### Banco
- Todo conteúdo é seedable e editável pelo admin
- Models com timestamps (createdAt, updatedAt)
- Slugs únicos para rotas amigáveis
- Índices nos campos de busca

### Rotas
- RESTful
- `/api/*` para dados (JSON)
- Rotas normais para páginas (HTML)
- Middleware de auth nas rotas protegidas
- Admin em `/admin/*` com middleware específico

## Design

Cores, fontes e componentes em `docs/DESIGN.md`.

## Fases

Ordem de construção em `docs/ROADMAP.md`.

## Comandos

```bash
npm install
npm run dev       # servidor dev com nodemon
npm run build     # build Tailwind
npm test          # testes
npm run seed      # popular banco
```
