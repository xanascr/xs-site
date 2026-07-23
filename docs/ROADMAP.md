# XanaScript Site — Roadmap

Reconstrução completa do site oficial (xanascript.xyz). Código antigo arquivado em `/old`.

---

## Setup Inicial

- `package.json` com Express, Mongoose, EJS, bcrypt, JWT
- `app.js` — servidor, middleware, conexão MongoDB
- Estrutura: `routes/`, `views/`, `models/`, `middleware/`, `services/`, `public/`, `tests/`
- EJS + partials (head, navbar, footer)
- Tailwind + CSS custom
- `.env.example`

**Status:** 🔲

---

## Fase 1 — Página Principal

Landing page responsiva com conteúdo 100% vindo do banco:

- Model `PageContent` com chave única (ex: `"home"`, `"docs-index"`, `"about"`)
- Cada seção da página é um documento editável: hero (título, subtítulo, CTA), features (grid de cards), code snapshots, depoimentos
- Admin pode editar qualquer texto, imagem ou exemplo da home sem deploy
- Seed inicial com conteúdo padrão

**Status:** 🔲

---

## Fase 2 — Documentação

Conteúdo 100% dinâmico vindo do banco:

- Model `DocArticle`: título, slug, categoria, corpo (markdown), ordem, tags, ativo
- Admin pode criar, editar, reordenar, ocultar artigos
- Seed inicial com a documentação real da linguagem (só o que existe)
- Páginas: índice (`/docs`), artigo (`/docs/:slug`)
- Busca textual nos artigos

**Status:** 🔲

---

## Fase 3 — Playground

Editor de código online completo e responsivo:

- Execução real via WebAssembly ou interpreter embarcado
- Syntax highlight
- Console de saída integrado
- **Exemplos carregados do banco** (model `PlaygroundExample`): título, código, descrição, categoria
- Admin pode adicionar/editar/remover exemplos
- Seed inicial com exemplos de todos os recursos da linguagem
- Botões: Copiar, Compartilhar, Download
- Funcional em mobile

**Status:** 🔲

---

## Fase 4 — Autenticação

Simples e direto:

- `/signup` — cadastro com email + senha + verificação de email
- `/login` — login com JWT
- `/forgot-password` / `/reset-password` — recuperação de senha
- `/settings` — editar perfil, alterar senha, 2FA
- `/dashboard` — visão geral (progresso, pacotes, dados da conta)

**Status:** 🔲

---

## Fase 5 — Cursos

Separado de pacotes. Conteúdo 100% real e editável pelo admin:

- Models: `Course`, `Module`, `Lesson`, `Quiz`, `QuizQuestion`, `Enrollment`, `LessonStat`, `QuizAttempt`
- `/courses` — listagem de cursos (do banco)
- `/courses/:slug` — página do curso com módulos
- `/courses/:slug/lessons/:lessonSlug` — aula com markdown renderizado
- `/courses/:slug/quiz/:quizId` — quiz por módulo
- `/courses/:slug/certificate` — certificado de conclusão
- Comentários por aula
- Progresso automático
- Admin gerencia: cursos, módulos, aulas, quizzes (CRUD completo)
- Seed com curso real da linguagem (só conteúdos que existem)

**Status:** 🔲

---

## Fase 6 — Pacotes

Registro de pacotes XS, sem reviews:

- `/packages` — listagem de pacotes (do banco)
- `/packages/:name` — página do pacote (README, versões, instalação)
- `/packages/dashboard` — gerenciar seus pacotes
- Integração com CLI para publish

**Status:** 🔲

---

## Fase 7 — Admin

Painel administrativo completo, tudo editável:

- **Páginas:** editar landing page, sobre, footer (model `PageContent`)
- **Documentação:** CRUD de artigos, reordenar, ativar/desativar
- **Playground:** CRUD de exemplos
- **Cursos:** CRUD de cursos, módulos, aulas, quizzes
- **Hackathons:** criar, editar, encerrar, avaliar submissões
- **Pacotes:** aprovar/rejeitar
- **Usuários:** listar, banir, promover a admin
- **Certificados:** emitir manualmente
- **Estatísticas:** visão geral do site

**Status:** 🔲

---

## Fase 8 — Hackathons

Nova seção no lugar do leaderboard:

- Model `Hackathon`: título, descrição, regras, datas, prêmio, ativo
- Model `HackathonSubmission`: usuário, projeto, descrição, link, data
- `/hackathons` — listagem (ativos e passados)
- `/hackathons/:id` — página do hackathon
- Admin gerencia tudo (criar, editar datas, avaliar)
- Seed inicial vazio (admin cria quando quiser)

**Status:** 🔲

---

## Fase 9 — Infraestrutura

- Docker + docker-compose (app + MongoDB, sem Redis)
- Changelog (`/changelog`)
- Benchmark (`/benchmark`)
- Doações (`/donate`)
- Privacidade (`/privacy`)
- Sitemap.xml, Robots.txt, Open Graph, SEO

**Status:** 🔲

---

## Legenda

| Símbolo | Significado |
|---------|-------------|
| 🔲 | Não iniciado |
| 🔄 | Em andamento |
| ✅ | Concluído |
