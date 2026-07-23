# XanaScript Site

Site oficial do [XanaScript](https://xanascript.xyz) — linguagem de programação com sintaxe em português.

## Stack

| Camada   | Tecnologia                        |
|----------|-----------------------------------|
| Runtime  | Node.js 20+ (ESM)                 |
| Server   | Express 4                         |
| Views    | EJS (server-side rendering)       |
| Estilo   | Tailwind CSS (CDN, sem CSS puro)  |
| Banco    | MongoDB 7 + Mongoose              |
| Auth     | JWT + bcrypt + API Keys           |
| Ícones   | Material Symbols Outlined         |
| Fontes   | Montserrat + Google Sans Code     |

## Estrutura

```
xs-site/
├── app.js                  # entrada do servidor
├── middleware/auth.js       # JWT + API key auth, asyncHandler
├── routes/
│   ├── index.js            # páginas (HTML)
│   ├── auth.js             # login/signup/api-keys (JSON)
│   ├── admin.js            # admin CRUD (JSON)
│   └── api/
│       ├── packages.js     # publicar, baixar, source browser
│       ├── reviews.js      # avaliações de pacotes
│       ├── courses.js      # matrícula, progresso, certificado
│       ├── comments.js     # comentários em aulas
│       ├── hackathons.js   # submissões
│       ├── quiz.js         # quiz e correção
│       ├── playground.js   # executar código XS
│       └── search.js       # busca global
├── models/                 # Mongoose schemas (11 models)
├── views/                  # EJS templates
│   ├── layouts/main.ejs    # layout principal (head, navbar, footer)
│   ├── partials/           # head.ejs, navbar.ejs, footer.ejs
│   └── (páginas)
├── uploads/packages/       # tarballs de pacotes (.tar.gz)
├── scripts/seed.js         # seed do banco
├── tests/                  # Vitest (67+ testes)
└── docs/                   # ROADMAP.md, DESIGN.md
```

## Models

| Modelo            | Descrição                                  |
|-------------------|--------------------------------------------|
| User              | Usuários, auth, 2FA, API keys              |
| Course            | Cursos com módulos e lições                |
| Enrollment        | Progresso do aluno no curso                |
| Certificate       | Certificados de conclusão                  |
| DocArticle        | Artigos da documentação                    |
| PlaygroundExample | Exemplos do playground                     |
| Package           | Pacotes com versões e revisão              |
| Review            | Avaliações de pacotes (1-5 estrelas)       |
| Hackathon         | Hackathons e submissões                    |
| Comment           | Comentários em aulas                       |
| Quiz / QuizAttempt| Quiz e tentativas                          |

## API Endpoints

### Auth
```
POST   /api/auth/signup           # criar conta
POST   /api/auth/login            # login (retorna JWT)
POST   /api/auth/logout           # logout
GET    /api/auth/me               # dados do usuário logado
PUT    /api/auth/me               # atualizar perfil
PUT    /api/auth/password         # alterar senha
POST   /api/auth/forgot-password  # solicitar reset
POST   /api/auth/reset-password/:token  # resetar senha
POST   /api/auth/api-keys         # gerar API key (para CLI)
GET    /api/auth/api-keys         # listar API keys
DELETE /api/auth/api-keys/:prefix # revogar API key
```

### Pacotes
```
GET    /api/packages              # listar aprovados (?q=&page=&limit=)
GET    /api/packages/mine         # meus pacotes (auth)
GET    /api/packages/:name        # detalhe (?version=)
POST   /api/packages              # publicar nova versão (multipart)
PUT    /api/packages/:name        # editar metadados (auth)
POST   /api/packages/batch        # criar em lote (máx 10)
POST   /api/packages/:name/download        # baixar .tar.gz
GET    /api/packages/:name/source          # listar arquivos fonte
GET    /api/packages/:name/reviews         # avaliações
POST   /api/packages/:name/reviews         # criar/atualizar avaliação
DELETE /api/packages/:name/reviews/:id     # remover avaliação
```

### Admin
```
GET    /api/admin/stats           # estatísticas (admin)
GET    /api/admin/users           # listar usuários
PATCH  /api/admin/users/:id/role  # alterar role
GET    /api/admin/packages        # listar (?status=)
GET    /api/admin/packages/:name  # detalhe completo
POST   /api/admin/packages/:name/approve   # aprovar
POST   /api/admin/packages/:name/reject    # rejeitar
GET    /api/admin/courses         # CRUD cursos
POST   /api/admin/courses
PUT    /api/admin/courses/:id
DELETE /api/admin/courses/:id
... (docs, playground, hackathons)
```

### Busca
```
GET    /api/search?q=             # busca global (packages, docs, courses)
```

### Cursos
```
GET    /api/courses               # listar cursos publicados
GET    /api/courses/:slug         # detalhe com progresso
POST   /api/courses/:slug/enroll  # matricular
POST   /api/courses/:slug/lessons/:lessonSlug/complete  # marcar lição
```

### Playground
```
POST   /api/playground/run        # executar código XS
```

## Pacotes — Fluxo de Publicação

```bash
# 1. Gerar API key (uma vez)
curl -X POST https://xanascript.xyz/api/auth/api-keys \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "cli"}'

# 2. Publicar
curl -X POST https://xanascript.xyz/api/packages \
  -H "x-api-key: <key>" \
  -F "name=meu-pacote" \
  -F "version=1.0.0" \
  -F "description=..." \
  -F "tarball=@meu-pacote-1.0.0.tar.gz"

# 3. Admin aprova/rejeita
curl -X POST https://xanascript.xyz/api/admin/packages/meu-pacote/approve \
  -H "Authorization: Bearer <admin-jwt>"
```

## Comandos

```bash
npm install              # instalar dependências
npm run dev              # servidor dev (--watch)
npm start                # servidor produção
npm run seed             # popular banco
npm test                 # rodar testes (vitest)
```

## Docker

```bash
docker compose up -d     # sobe app + mongo
docker compose down      # derruba
```

## Segurança

- **XSS**: `textContent` para input do usuário, whitelist de campos, `stripHtml()` em readme/descrição
- **Path traversal**: validação de caminhos com `isPathInside()`, sanitização de filenames
- **Upload**: validação de MIME type, limite de 5MB, multer + express-rate-limit
- **Auth**: JWT com versão, API keys com scopo, senhas com bcrypt (12 rounds)
- **Quiz**: respostas validadas server-side, não expostas no HTML
- **Rate limiting**: 10 requisições/minuto para publish, 30/minuto geral

## Licença

MIT
