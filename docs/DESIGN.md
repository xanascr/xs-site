# XanaScript Site — Design System

## Filosofia

Escuro, direto e informativo. O fundo preto com rosa como cor de destaque cria identidade forte sem competir com o conteúdo. A linguagem já é diferente — o site acompanha.

Conteúdo organizado, fácil de entender. Tudo que o usuário precisa ver está visível sem caça ao tesouro. Mobile e desktop têm o mesmo cuidado.

---

## Cores

```css
--bg:         #000000  /* fundo principal */
--bg-2:       #111111  /* superfície secundária (cards, sidebar) */
--bg-3:       #1a1a1a  /* superfície terciária (hover, bordas) */
--border:     #2a2a2a  /* bordas */
--primary:    #ec4899  /* pink-500 — ação, link, destaque */
--primary-hover: #db2777  /* pink-600 */
--primary-soft: rgba(236, 72, 153, 0.1)  /* fundo sutil de destaque */
--text:       #f5f5f5  /* texto principal */
--text-2:     #a3a3a3  /* texto secundário */
--success:    #22c55e  /* verde */
--error:      #ef4444  /* vermelho */
--code-bg:    #0d0d0d  /* fundo de blocos de código */
```

Fundo preto (`#000`), texto quase branco (`#f5f5f5`). Pink como única cor de destaque — botões, links, tags, bordas de foco. O resto é escala de cinza. Sem poluição visual.

---

## Tipografia

- **Títulos:** Montserrat, peso 700–900, `tracking-tight`
- **Corpo:** system-ui / sans-serif padrão (Inter fallback), peso 400, 16px
- **Código:** Google Sans Code (monospace), 14px blocos, 13px inline
- **Escala:** 16 / 20 / 24 / 32 / 44 / 56

Montserrat é usada exclusivamente em títulos e headings (h1–h4), sempre em peso grosso (700+) pra dar impacto visual. O corpo é neutro e legível.

### Fontes

```html
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght,MONO@0,300..800,1;1,300..800,1&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

### Ícones

Material Symbols Outlined (usados via Tailwind com classe `material-symbols-outlined`):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
```

Uso: `<span class="material-symbols-outlined">code</span>` com peso 300–400. Nunca preenchidos (FILL=0). Tamanho 20–24px.

---

## Estilização

Apenas Tailwind CSS. Nenhum arquivo `.css` puro. Todo estilo é feito com classes utilitárias do Tailwind, incluindo:

- Cores personalizadas via `tailwind.config.js` (paleta pink + preto)
- Animações e transições via Tailwind
- Responsividade via breakpoints Tailwind (sm, md, lg)
- Componentes reutilizáveis como classes Tailwind em arquivos EJS

---

## Layout

### Estrutura Geral

```
+----------------------------------+
|  Navbar (fixa, 64px, preta)     |
+----------------------------------+
|                                  |
|  Conteúdo (max-w-6xl, mx-auto)  |
|                                  |
+----------------------------------+
|  Footer (bg-2)                   |
+----------------------------------+
```

### Navbar
- Logo à esquerda em Montserrat bold, pink no hover
- Links: Docs, Playground, Cursos, Pacotes
- Botão Login / avatar à direita
- Fundo preto `bg` com borda inferior `border`
- Em mobile: hamburger menu com drawer da esquerda, fundo `bg-2`

### Grid
- Landing: hero centralizado, seções em grid 2 colunas (desktop) / 1 (mobile)
- Docs: sidebar esquerda + conteúdo principal
- Playground: split vertical (editor + output)
- Cursos, Pacotes: grid de cards 2–3 colunas (desktop) / 1 (mobile)
- Admin: sidebar esquerda fixa + conteúdo

### Cards
- Fundo `bg-2`, borda 1px `border`, border-radius 10px
- Padding 24px
- Hover: borda `primary` + leve brilho no topo
- Título em Montserrat semibold

---

## Componentes

### Botões
| Variante | Fundo | Texto | Uso |
|----------|-------|-------|-----|
| Primary | `primary` | `text` | Ação principal |
| Outline | transparente | `primary` + borda `primary` | Ação secundária |
| Ghost | transparente | `text-2` hover `text` | Ação terciária |
| Danger | `error` | `text` | Excluir, desativar |

Border-radius 10px. Padding 12px 24px (md). Montserrat 600 nos botões primários. Transição 150ms.

### Formulários
- Input: fundo `bg-2`, borda `border`, border-radius 10px
- Foco: borda `primary` + ring 2px `primary-soft`
- Label: `text-2`, 14px
- Error: `error` abaixo do input
- Submit: botão primary, full-width em mobile

### Syntax Highlight
- Fundo: `code-bg`, borda 1px `border`, border-radius 10px
- Palavras-chave: `#c084fc` (roxo claro)
- Strings: `#86efac` (verde)
- Números: `#fde68a` (amarelo)
- Comentários: `#525252` (neutral-600)
- Funções: `#67e8f9` (ciano)

---

## Responsivo

| Breakpoint | Largura | Comportamento |
|-----------|---------|---------------|
| Mobile | < 640px | Single column, hamburger, formulários full-width, fonte 15px |
| Tablet | 640–1024px | Grid 2 colunas, sidebar colapsável |
| Desktop | > 1024px | Layout completo, max-w-6xl |

Regras:
- Sem overflow horizontal
- Tap target mínimo 44px
- Código 13px em mobile, 14px em desktop
- Navbar vira hamburger em < 768px

---

## Micro-interações

- Links: hover com underline ou cor `primary-hover`, 150ms
- Botões: hover com brightness 1.1, active com scale 0.97
- Cards: hover com borda pink + translateY(-1px)
- Modal: backdrop escuro + fade in, 200ms
- Navbar: borda inferior aparece no scroll (detecta `scroll > 0`)
- Toast: slide-in da direita, auto-dismiss 4s, fundo `bg-2` com borda colored

---

## Páginas

### Landing
- Hero: headline enorme (Montserrat 900, 56px), subtítulo, CTA pink
- "Code Snapshot" — bloco de código XS com resultado ao lado, fundo `bg-2`
- Features em grid 2x2 com ícone Material + título Montserrat + descrição curta
- Tudo vindo do banco (model `PageContent`), editável pelo admin

### Documentação
- Sidebar com índice por categoria
- Conteúdo em markdown renderizado
- Busca local por filtro
- Artigos vindos do banco, admin cria/edita/desativa

### Playground
- Editor monospace + console de saída
- Seletor de exemplos (do banco)
- Botão Executar (CTRL+Enter)
- Responsivo: editor 100% no mobile, output abaixo

### Cursos
- Cards com título, progresso
- Sidebar de módulos + conteúdo da aula
- Quiz ao final de cada módulo
- Conteúdo todo do banco, admin gerencia

### Admin
- Sidebar com seções: Páginas, Docs, Playground, Cursos, Hackathons, Pacotes, Usuários, Certificados
- CRUD completo de cada modelo
- Preview integrado
- Tabelas com filtro e busca

### Hackathons
- Lista de hackathons ativos/passados
- Página individual com regras, datas, submissões
- Admin cria e avalia

---

## Acessibilidade

- Contraste mínimo 4.5:1
- Foco visível com ring pink
- Labels em todos os inputs
- Alt text em imagens
- Navegação por teclado
- `prefers-reduced-motion` respeitado
