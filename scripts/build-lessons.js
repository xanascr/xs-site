import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\\//, '');
let filePath = path.join(__dirname, 'seed-course.js');
let content = fs.readFileSync(filePath, 'utf8');

// Helper: create a lesson object string
function L(slug, title, order, points, md, html, challenges) {
  function esc(s) {
    // Escape backticks and ${} inside template literals
    return s.replace(/`/g, '\\`').replace(/\${/g, '\\${');
  }
  let c = challenges.map(ch =>
    `      { question: "${ch.q.replace(/"/g, '\\"')}", answer: "${ch.a.replace(/"/g, '\\"')}", points: ${ch.p} }`
  ).join(',\n');

  return `  {\n    slug: "${slug}",\n    title: "${title.replace(/"/g, '\\"')}",\n    order: ${order},\n    points: ${points},\n    bodyMd: \`${esc(md)}\`,\n    bodyHtml: \`${esc(html)}\`,\n    challenges: [\n${c}\n    ],\n  },`;
}

// Lesson data for all 20 modules
const lessons = [];

// ═══════════════════════════════════
// MODULE 1: Fundamentals (1-15)
// ═══════════════════════════════════

lessons.push(L('what-is-xanascript', 'What is XanaScript?', 1, 5,
`# What is XanaScript?

XanaScript is a **full programming language** designed entirely in Brazilian Portuguese. Unlike transpilers or wrappers, every keyword, operator, and syntax construct is native Portuguese — parsed, type-checked, compiled, and executed by a custom toolchain written in JavaScript.

## Key Features

- **Multi-word keywords** like \`SE LIGA SO\`, \`CHAMA ESSE CARA\`, \`REPETE NA MORAL\` — lexed as atomic tokens
- **Built-in ORM** (\`TABELA\`) — first-class syntax for database CRUD
- **Optimizing compiler** — constant folding, loop unrolling, integer inference
- **Native WebAssembly** — direct \`.wasm\` binary emission, no Emscripten
- **Compile-time macros** — AST-level substitution, zero runtime cost
- **LSP server** — completions, hover, diagnostics, go-to-definition
- **Test runner** — \`TESTE\` / \`AFIRMA\` as native AST nodes

## The Philosophy

Code should read like it's written for humans. Every construct in XanaScript uses clear, intuitive Portuguese keywords so the intent is obvious at a glance. You don't translate your thoughts into English keywords — you write in your native language.

Let's get started!`,
`<h1>What is XanaScript?</h1>
<p>XanaScript is a <strong>full programming language</strong> designed entirely in Brazilian Portuguese.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Multi-word keywords</strong> like <code>SE LIGA SO</code>, <code>CHAMA ESSE CARA</code></li>
<li><strong>Built-in ORM</strong> (<code>TABELA</code>) — first-class CRUD syntax</li>
<li><strong>Optimizing compiler</strong> — constant folding, loop unrolling</li>
<li><strong>Native WebAssembly</strong> — direct <code>.wasm</code> emission</li>
<li><strong>Compile-time macros</strong> — zero runtime cost</li>
<li><strong>LSP server</strong> — completions, hover, diagnostics</li>
<li><strong>Test runner</strong> — <code>TESTE</code> / <code>AFIRMA</code> as native nodes</li>
</ul>
<h2>The Philosophy</h2>
<p>Code should read like it's written for humans.</p>`,
[
  { q: 'What type of tokens are multi-word keywords like SE LIGA SO treated as?', a: 'atomic', p: 3 },
  { q: 'Does XanaScript use a transpiler approach or a native compiler?', a: 'native compiler', p: 3 },
]));

lessons.push(L('installation-setup', 'Installation & Setup', 2, 5,
`# Installation & Setup

XanaScript can be installed in two ways:

## Via npm (Cross-platform)

\`\`\`bash
npm install -g xanascript
\`\`\`

This requires Node.js 18+ and works on Windows, Linux, and macOS.

## Native Binary (Standalone)

\`\`\`bash
curl -fsSL https://xanascript.xyz/install.sh | bash
\`\`\`

No Node.js required — a single executable with zero dependencies.

## Verify Installation

\`\`\`bash
xs --version
\`\`\`

## Your First Command

\`\`\`bash
xs run hello.xs
\`\`\`

## VS Code Extension

Install \`vscode-xs\` from the marketplace for syntax highlighting, snippets, and LSP integration.`,
`<h1>Installation &amp; Setup</h1>
<p>XanaScript can be installed in two ways:</p>
<h2>Via npm</h2>
<pre><code>npm install -g xanascript</code></pre>
<p>Requires Node.js 18+.</p>
<h2>Native Binary</h2>
<pre><code>curl -fsSL https://xanascript.xyz/install.sh | bash</code></pre>
<h2>Verification</h2>
<pre><code>xs --version</code></pre>
<h2>VS Code Extension</h2>
<p>Install <code>vscode-xs</code> from the marketplace.</p>`,
[
  { q: 'What is the npm command to install XanaScript globally?', a: 'npm install -g xanascript', p: 3 },
  { q: 'What command verifies XanaScript installation?', a: 'xs --version', p: 3 },
]));

lessons.push(L('your-first-program', 'Your First Program', 3, 10,
`# Your First Program

Let's write the classic "Hello, World!" in XanaScript:

\`\`\`xs
SOLTA O GRITO("Hello, World!")
\`\`\`

Create a file called \`hello.xs\` and run it:

\`\`\`bash
xs run hello.xs
\`\`\`

## Breaking It Down

- \`SOLTA O GRITO\` is the print function — literally "shout it out"
- Parentheses \`()\` wrap the argument
- Double quotes \`"..."\` delimit a string

## Variables

\`\`\`xs
CRIA nome = "Maria"
CRIA idade = 25
SOLTA O GRITO("Ola, " + nome + "! Voce tem " + idade + " anos.")
\`\`\`

- \`CRIA\` declares a variable ("create")
- \`+\` concatenates strings and numbers
- No type annotations needed — types are inferred`,
`<h1>Your First Program</h1>
<p>Classic "Hello, World!" in XanaScript:</p>
<pre><code>SOLTA O GRITO("Hello, World!")</code></pre>
<p>Create <code>hello.xs</code> and run <code>xs run hello.xs</code>.</p>
<h2>Breaking It Down</h2>
<ul>
<li><code>SOLTA O GRITO</code> — print function</li>
<li><code>CRIA</code> — declares a variable</li>
<li>Types are inferred automatically</li>
</ul>`,
[
  { q: 'What keyword declares a variable in XanaScript?', a: 'CRIA', p: 3 },
  { q: 'What function prints output?', a: 'SOLTA O GRITO', p: 3 },
  { q: 'What command runs a .xs file?', a: 'xs run', p: 3 },
]));

lessons.push(L('variables-cria', 'Variables with CRIA', 4, 10,
`# Variables with CRIA

\`CRIA\` ("create") declares a mutable variable in XanaScript:

\`\`\`xs
CRIA nome = "Joao"
CRIA idade = 25
CRIA preco = 49.99
\`\`\`

## Reassignment

Variables declared with \`CRIA\` can be reassigned:

\`\`\`xs
CRIA contador = 0
contador = 1
contador = contador + 5
SOLTA O GRITO(contador)  // 6
\`\`\`

## Multiple Variables

\`\`\`xs
CRIA a = 1, b = 2, c = 3
SOLTA O GRITO(a + b + c)  // 6
\`\`\`

## Variable Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive: \`nome\` is different from \`Nome\`
- Keywords cannot be used as variable names

## Scope

\`\`\`xs
SE LIGA SO (VERDADEIRO) {
  CRIA interno = "so existe aqui"
  SOLTA O GRITO(interno)  // OK
}
\`\`\``,
`<h1>Variables with CRIA</h1>
<p><code>CRIA</code> declares mutable variables:</p>
<pre><code>CRIA nome = "Joao"
CRIA idade = 25</code></pre>
<h2>Reassignment</h2>
<pre><code>CRIA contador = 0
contador = contador + 5</code></pre>
<h2>Rules</h2>
<ul>
<li>Start with letter or underscore</li>
<li>Case-sensitive</li>
<li>Block-scoped</li>
</ul>`,
[
  { q: 'What keyword declares a mutable variable?', a: 'CRIA', p: 3 },
  { q: 'Can CRIA variables be reassigned?', a: 'yes', p: 3 },
  { q: 'Are CRIA variables block-scoped?', a: 'yes', p: 5 },
]));

lessons.push(L('constants-constante', 'Constants with CONSTANTE', 5, 10,
`# Constants with CONSTANTE

\`CONSTANTE\` declares an immutable, read-only binding:

\`\`\`xs
CONSTANTE PI = 3.14159
CONSTANTE NOME_APP = "XanaScript"
CONSTANTE VERSAO = "1.0.0"
\`\`\`

## Reassignment is Forbidden

\`\`\`xs
CONSTANTE MAX_USERS = 100
// MAX_USERS = 200  // Error! Cannot reassign a constant
\`\`\`

## When to Use CONSTANTE

- Values that should never change (mathematical constants, configuration)
- API endpoints, environment names
- Any binding you want to protect from accidental mutation

## CONSTANTE vs CRIA

| Aspect | CRIA | CONSTANTE |
|--------|------|-----------|
| Mutable | Yes | No |
| Block-scoped | Yes | Yes |
| Reassign | Allowed | Forbidden |
| Use case | Changing values | Fixed values |

## Best Practice

Always prefer \`CONSTANTE\` by default. Only use \`CRIA\` when the value needs to change. This makes your code safer and more predictable.`,
`<h1>Constants with CONSTANTE</h1>
<p><code>CONSTANTE</code> declares immutable bindings:</p>
<pre><code>CONSTANTE PI = 3.14159
CONSTANTE NOME_APP = "XanaScript"</code></pre>
<h2>CONSTANTE vs CRIA</h2>
<table>
<tr><td>CRIA</td><td>Mutable</td></tr>
<tr><td>CONSTANTE</td><td>Immutable</td></tr>
</table>
<p>Prefer <code>CONSTANTE</code> by default.</p>`,
[
  { q: 'What keyword creates an immutable variable?', a: 'CONSTANTE', p: 3 },
  { q: 'Can CONSTANTE be reassigned?', a: 'no', p: 3 },
  { q: 'Which should you prefer by default?', a: 'CONSTANTE', p: 5 },
]));

lessons.push(L('comments', 'Comments', 6, 5,
`# Comments

Comments are ignored by the compiler and exist only for humans reading the code.

## Single-Line Comments

Use \`//\` for single-line comments:

\`\`\`xs
// This is a single-line comment
CRIA x = 10  // inline comment

// Comments can span multiple lines
// if each line starts with //
\`\`\`

## Multi-Line Comments

Use \`/* */\` for block comments:

\`\`\`xs
/*
 * This is a multi-line comment
 * It can span many lines
 * Useful for documentation headers
 */
CRIA y = 20
\`\`\`

## Documentation Comments

\`\`\`xs
/*
 * soma: Returns the sum of two numbers
 * a: first number
 * b: second number
 */
CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b
}
\`\`\``,
`<h1>Comments</h1>
<h2>Single-Line</h2>
<p>Use <code>//</code> for single-line comments:</p>
<pre><code>// inline comment
CRIA x = 10</code></pre>
<h2>Multi-Line</h2>
<p>Use <code>/* */</code> for block comments:</p>
<pre><code>/* documentation */</code></pre>`,
[
  { q: 'What starts a single-line comment?', a: '//', p: 3 },
  { q: 'What wraps a multi-line comment?', a: '/* */', p: 3 },
]));

lessons.push(L('data-types', 'Data Types', 7, 10,
`# Data Types

XanaScript has five built-in types.

## TEXTO (String)

\`\`\`xs
CRIA saudacao = "Ola, Mundo!"
CRIA vazio = ""
\`\`\`

## NUMERO (Number)

\`\`\`xs
CRIA inteiro = 42
CRIA decimal = 3.14
CRIA negativo = -10
\`\`\`

## BOOLEANO (Boolean)

\`\`\`xs
CRIA ativo = VERDADEIRO   // true
CRIA inativo = FALSO      // false
\`\`\`

## DATA (Date)

\`\`\`xs
CRIA hoje = DATA("2026-07-08")
\`\`\`

## QUALQUER (Any)

\`\`\`xs
CRIA flexivel = QUALQUER("pode ser qualquer coisa")
flexivel = 42  // OK
flexivel = null  // OK
\`\`\`

Each type serves a specific purpose, and XanaScript's type inference handles them automatically.`,
`<h1>Data Types</h1>
<p>Five built-in types:</p>
<ul>
<li><strong>TEXTO</strong> — String</li>
<li><strong>NUMERO</strong> — Number</li>
<li><strong>BOOLEANO</strong> — Boolean</li>
<li><strong>DATA</strong> — Date</li>
<li><strong>QUALQUER</strong> — Any</li>
</ul>
<pre><code>CRIA saudacao = "Ola"
CRIA numero = 42
CRIA ativo = VERDADEIRO</code></pre>`,
[
  { q: 'How many built-in types?', a: '5', p: 3 },
  { q: 'Keyword for boolean true?', a: 'VERDADEIRO', p: 3 },
  { q: 'Type that allows any value?', a: 'QUALQUER', p: 3 },
]));

lessons.push(L('type-inference', 'Type Inference', 8, 10,
`# Type Inference

XanaScript automatically detects the type of a variable based on its value.

## How Inference Works

\`\`\`xs
CRIA texto = "Ola"            // inferred as TEXTO
CRIA numero = 42              // inferred as NUMERO
CRIA booleano = VERDADEIRO    // inferred as BOOLEANO
CRIA data = DATA("2026-01-01") // inferred as DATA
CRIA qualquer = null          // inferred as QUALQUER
\`\`\`

## Type Changes

When using \`QUALQUER\`, the type can change at runtime:

\`\`\`xs
CRIA valor = null          // QUALQUER
valor = "agora e texto"   // still QUALQUER
valor = 99                // still QUALQUER
\`\`\`

## Strict Types

Once a variable is inferred as a specific type, reassignment must match:

\`\`\`xs
CRIA nome = "Ana"      // TEXTO
// nome = 42           // Error! Cannot assign NUMERO to TEXTO
\`\`\`

## Optional Annotations

\`\`\`xs
CRIA nome: TEXTO = "Joao"
CRIA idade: NUMERO = 30
\`\`\``,
`<h1>Type Inference</h1>
<p>XanaScript automatically detects types:</p>
<pre><code>CRIA texto = "Ola"   // TEXTO
CRIA num = 42        // NUMERO</code></pre>
<p>Once inferred, type is fixed (unless QUALQUER).</p>
<pre><code>CRIA nome: TEXTO = "Joao"  // optional annotation</code></pre>`,
[
  { q: 'What type is inferred for CRIA x = 42?', a: 'NUMERO', p: 3 },
  { q: 'Can you assign a NUMERO to a TEXTO variable?', a: 'no', p: 3 },
  { q: 'What type allows dynamic changes?', a: 'QUALQUER', p: 5 },
]));

lessons.push(L('strings-in-depth', 'Strings in Depth', 9, 10,
`# Strings in Depth

Strings (\`TEXTO\`) are one of the most used types in XanaScript.

## String Creation

\`\`\`xs
CRIA simples = "Hello"
CRIA com_aspas = 'Aspas simples tambem funcionam'
\`\`\`

## Concatenation

\`\`\`xs
CRIA primeiro = "Joao"
CRIA ultimo = "Silva"
CRIA completo = primeiro + " " + ultimo
SOLTA O GRITO(completo)  // Joao Silva
\`\`\`

## String Interpolation

\`\`\`xs
CRIA nome = "Ana"
CRIA idade = 30
SOLTA O GRITO("Ola, " + nome + "! Voce tem " + idade + " anos.")
\`\`\`

## String Methods

\`\`\`xs
CRIA texto = "  XanaScript e Incrivel!  "

SOLTA O GRITO(tamanho(texto))        // length
SOLTA O GRITO(maiusculo(texto))       // uppercase
SOLTA O GRITO(minusculo(texto))       // lowercase
SOLTA O GRITO(aparado(texto))         // trim
SOLTA O GRITO(substituir(texto, "e", "eh"))  // replace
\`\`\`

Strings are UTF-8 encoded internally.`,
`<h1>Strings in Depth</h1>
<pre><code>CRIA simples = "Hello"
CRIA completo = primeiro + " " + ultimo</code></pre>
<h2>String Methods</h2>
<pre><code>tamanho()   // length
maiusculo() // uppercase
minusculo() // lowercase
aparado()   // trim</code></pre>`,
[
  { q: 'What operator concatenates strings?', a: '+', p: 3 },
  { q: 'What method returns string length?', a: 'tamanho', p: 3 },
  { q: 'What method converts to uppercase?', a: 'maiusculo', p: 3 },
]));

lessons.push(L('numbers-in-depth', 'Numbers in Depth', 10, 10,
`# Numbers in Depth

Numbers (\`NUMERO\`) cover both integers and floating-point values.

## Integer Literals

\`\`\`xs
CRIA a = 42
CRIA b = -17
CRIA c = 0
CRIA d = 1_000_000  // underscores for readability
\`\`\`

## Floating-Point

\`\`\`xs
CRIA pi = 3.14159
CRIA pequeno = 0.001
CRIA grande = 1.5e6  // scientific notation
\`\`\`

## Arithmetic Operators

\`\`\`xs
CRIA soma = 10 + 5        // 15
CRIA diferenca = 10 - 5   // 5
CRIA produto = 10 * 5     // 50
CRIA quociente = 10 / 3   // 3.333...
CRIA resto = 10 % 3       // 1
CRIA potencia = 2 ** 3    // 8
\`\`\`

## Increment and Decrement

\`\`\`xs
CRIA contador = 0
contador++  // post-increment: 1
contador--  // post-decrement: 0
\`\`\`

## Compound Assignment

\`\`\`xs
CRIA x = 10
x += 5   // x = 15
x -= 3   // x = 12
x *= 2   // x = 24
x /= 4   // x = 6
x %= 4   // x = 2
\`\`\``,
`<h1>Numbers in Depth</h1>
<pre><code>CRIA a = 42
CRIA pi = 3.14159
CRIA grande = 1.5e6</code></pre>
<h2>Operators</h2>
<pre><code>+  -  *  /  %  **</code></pre>
<h2>Compound Assignment</h2>
<pre><code>+=  -=  *=  /=  %=</code></pre>`,
[
  { q: 'What is the remainder operator?', a: '%', p: 3 },
  { q: 'What is the exponentiation operator?', a: '**', p: 3 },
  { q: 'What does x += 5 do?', a: 'adds 5 to x', p: 3 },
]));

lessons.push(L('booleans', 'Booleans', 11, 5,
`# Booleans

Booleans (\`BOOLEANO\`) represent truth values.

## Boolean Values

\`\`\`xs
CRIA ativo = VERDADEIRO   // true
CRIA completo = FALSO      // false
\`\`\`

## Logical Operators

XanaScript uses Portuguese words:

\`\`\`xs
CRIA a = VERDADEIRO
CRIA b = FALSO

CRIA e_logico = a E b     // AND: FALSO
CRIA ou_logico = a OU b   // OR: VERDADEIRO
CRIA negacao = NAO a      // NOT: FALSO
\`\`\`

## Comparison Operators

\`\`\`xs
CRIA eq = 5 == 5        // VERDADEIRO
CRIA neq = 5 != 5       // FALSO
CRIA gt = 5 > 3         // VERDADEIRO
CRIA lt = 5 < 3         // FALSO
\`\`\`

## Truthy and Falsy

Falsy values: \`FALSO\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`:
\`\`\`xs
SE LIGA SO ("") {
  // won't execute — empty string is falsy
} SENAO {
  SOLTA O GRITO("Falsy!")
}
\`\`\``,
`<h1>Booleans</h1>
<p>Values: <code>VERDADEIRO</code> (true) and <code>FALSO</code> (false).</p>
<h2>Logical Operators</h2>
<pre><code>E   // AND
OU  // OR
NAO // NOT</code></pre>
<h2>Falsy Values</h2>
<p><code>FALSO</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code></p>`,
[
  { q: 'What is the keyword for true?', a: 'VERDADEIRO', p: 3 },
  { q: 'What keyword represents AND?', a: 'E', p: 3 },
  { q: 'What keyword represents NOT?', a: 'NAO', p: 3 },
]));

lessons.push(L('null-undefined', 'Null and Undefined', 12, 5,
`# Null and Undefined

Two special values for "no value".

## Null

\`null\` represents an intentional absence of value:

\`\`\`xs
CRIA resultado = null  // no result yet
CRIA usuario = buscarUsuario(999)  // null if not found

SE LIGA SO (usuario == null) {
  SOLTA O GRITO("Nao encontrado")
}
\`\`\`

## Undefined

\`undefined\` means a variable has no assigned value:

\`\`\`xs
CRIA x  // undefined (no initializer)
SOLTA O GRITO(x)  // undefined
\`\`\`

## Nullish Coalescing

Use \`??\` to provide a default:

\`\`\`xs
CRIA nome = usuario ?? "Convidado"
CRIA valor = receberDado() ?? 0
\`\`\`

## Null vs Undefined

| Value | Meaning |
|-------|---------|
| \`null\` | Intentional empty |
| \`undefined\` | Uninitialized |`,
`<h1>Null and Undefined</h1>
<p><code>null</code> = intentional absence. <code>undefined</code> = uninitialized.</p>
<h2>Nullish Coalescing</h2>
<pre><code>CRIA nome = usuario ?? "Convidado"</code></pre>`,
[
  { q: 'What represents intentional empty?', a: 'null', p: 3 },
  { q: 'What operator provides defaults for null/undefined?', a: '??', p: 3 },
  { q: 'Difference between null and undefined?', a: 'null is intentional, undefined is uninitialized', p: 5 },
]));

lessons.push(L('type-conversion', 'Type Conversion', 13, 10,
`# Type Conversion

Built-in functions for converting between types.

## To Number

\`\`\`xs
CRIA numero = NUMERO("42")     // 42
CRIA pi = NUMERO("3.14")       // 3.14
CRIA padrao = NUMERO("invalido")  // 0 on failure
\`\`\`

## To String

\`\`\`xs
CRIA texto = TEXTO(42)               // "42"
CRIA bool_str = TEXTO(VERDADEIRO)    // "VERDADEIRO"
\`\`\`

## To Boolean

\`\`\`xs
CRIA b1 = BOOLEANO(42)             // VERDADEIRO
CRIA b2 = BOOLEANO(0)              // FALSO
CRIA b3 = BOOLEANO("")             // FALSO
CRIA b4 = BOOLEANO("texto")        // VERDADEIRO
\`\`\`

## Implicit Conversion

\`\`\`xs
CRIA mensagem = "Total: " + 42       // "Total: 42"
CRIA logico = 0 OU FALSO            // FALSO
\`\`\`

## Safe Conversion Pattern

\`\`\`xs
CHAMA ESSE CARA parseNumero(valor, padrao = 0) {
  CRIA conv = NUMERO(valor)
  SE LIGA SO (conv == 0 E TEXTO(valor) != "0") {
    VOLTA padrao
  }
  VOLTA conv
}
\`\`\``,
`<h1>Type Conversion</h1>
<h2>To Number</h2>
<pre><code>CRIA num = NUMERO("42")</code></pre>
<h2>To String</h2>
<pre><code>CRIA str = TEXTO(42)</code></pre>
<h2>To Boolean</h2>
<pre><code>CRIA b = BOOLEANO(42)  // VERDADEIRO</code></pre>`,
[
  { q: 'What function converts to number?', a: 'NUMERO()', p: 3 },
  { q: 'What function converts to string?', a: 'TEXTO()', p: 3 },
  { q: 'What does BOOLEANO(0) return?', a: 'FALSO', p: 3 },
]));

lessons.push(L('operators', 'Operators', 14, 10,
`# Operators

Full set of operators for arithmetic, comparison, logic, and assignment.

## Arithmetic

\`\`\`xs
+   -   *   /   %   **
\`\`\`

## Comparison

\`\`\`xs
==   !=   >   <   >=   <=
\`\`\`

## Logical

\`\`\`xs
E    OU    NAO    !
\`\`\`

## Assignment

\`\`\`xs
=   +=   -=   *=   /=   %=
\`\`\`

## Nullish Coalescing

\`\`\`xs
CRIA nome = null ?? "Convidado"  // "Convidado"
CRIA valor = 0 ?? 100           // 0 (0 is not null/undefined)
\`\`\`

## Unary Operators

\`\`\`xs
CRIA neg = -42          // negation
CRIA inc = 0; inc++     // increment
CRIA dec = 0; dec--     // decrement
CRIA not = !VERDADEIRO  // logical NOT
\`\`\``,
`<h1>Operators</h1>
<ul>
<li><strong>Arithmetic:</strong> <code>+ - * / % **</code></li>
<li><strong>Comparison:</strong> <code>== != > < >= <=</code></li>
<li><strong>Logical:</strong> <code>E OU NAO !</code></li>
<li><strong>Assignment:</strong> <code>= += -= *= /= %=</code></li>
<li><strong>Nullish:</strong> <code>??</code></li>
</ul>`,
[
  { q: 'What is the modulo operator?', a: '%', p: 3 },
  { q: 'Three Portuguese logical operators?', a: 'E OU NAO', p: 3 },
  { q: 'What does ?? do?', a: 'returns left if not null/undefined, else right', p: 5 },
]));

lessons.push(L('operator-precedence', 'Operator Precedence', 15, 5,
`# Operator Precedence

Determines evaluation order in expressions.

## Precedence (Highest to Lowest)

| Level | Operators |
|-------|-----------|
| 1 | \`()\` (grouping) |
| 2 | \`**\` |
| 3 | \`!\` \`NAO\` \`++\` \`--\` |
| 4 | \`*\` \`/\` \`%\` |
| 5 | \`+\` \`-\` |
| 6 | \`<\` \`<=\` \`>\` \`>=\` |
| 7 | \`==\` \`!=\` |
| 8 | \`E\` (AND) |
| 9 | \`OU\` (OR) |
| 10 | \`??\` |
| 11 | \`=\` \`+=\` \`-=\` |

## Examples

\`\`\`xs
CRIA r1 = 2 + 3 * 4      // 14 (not 20)
CRIA r2 = (2 + 3) * 4    // 20
CRIA r3 = VERDADEIRO OU FALSO E FALSO  // VERDADEIRO
CRIA r4 = 2 ** 3 ** 2    // 512 (2 ** 9)
\`\`\`

Use parentheses to clarify intent.`,
`<h1>Operator Precedence</h1>
<ul>
<li><code>()</code> highest</li>
<li><code>**</code> before <code>*</code>/<code>/</code>/<code>%</code></li>
<li><code>*</code>/<code>/</code>/<code>%</code> before <code>+</code>/<code>-</code></li>
<li><code>E</code> before <code>OU</code></li>
</ul>
<pre><code>2 + 3 * 4    // 14
(2 + 3) * 4  // 20</code></pre>`,
[
  { q: 'What is 2 + 3 * 4?', a: '14', p: 3 },
  { q: 'Which has higher precedence: E or OU?', a: 'E', p: 3 },
]));

// ═══════════════════════════════════
// MODULE 2: Control Flow (16-25)
// ═══════════════════════════════════

lessons.push(L('se-liga-so', 'SE LIGA SO (If Statements)', 16, 10,
`# SE LIGA SO — If Statements

\`SE LIGA SO\` ("pay attention") is the \`if\` statement.

## Basic Syntax

\`\`\`xs
CRIA idade = 18

SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
}
\`\`\`

Conditions in parentheses, body in curly braces.

## Conditions

\`\`\`xs
CRIA nota = 85
CRIA presenca = 0.9

SE LIGA SO (nota >= 70 E presenca >= 0.75) {
  SOLTA O GRITO("Aprovado")
}
\`\`\`

## Nested Conditions

\`\`\`xs
SE LIGA SO (logado) {
  SE LIGA SO (admin) {
    SOLTA O GRITO("Painel admin")
  }
}
\`\`\`

Always use curly braces even for single statements.`,
`<h1>SE LIGA SO — If Statements</h1>
<p><code>SE LIGA SO</code> ("pay attention") is the <code>if</code> statement:</p>
<pre><code>SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
}</code></pre>`,
[
  { q: 'What keyword starts an if statement?', a: 'SE LIGA SO', p: 3 },
  { q: 'Must conditions be in parentheses?', a: 'yes', p: 3 },
]));

lessons.push(L('senao', 'SENAO (Else Clauses)', 17, 10,
`# SENAO — Else Clauses

\`SENAO\` ("otherwise") provides the alternative branch.

## Basic Syntax

\`\`\`xs
CRIA idade = 16

SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
} SENAO {
  SOLTA O GRITO("Menor de idade")
}
\`\`\`

## Complete Example

\`\`\`xs
CRIA temperatura = 30

SE LIGA SO (temperatura > 35) {
  SOLTA O GRITO("Muito quente!")
} SENAO {
  SOLTA O GRITO("Temperatura agradavel")
}
\`\`\`

## Guard Pattern

\`\`\`xs
CHAMA ESSE CARA dividir(a, b) {
  SE LIGA SO (b == 0) {
    SOLTA O GRITO("Erro: divisao por zero")
    VOLTA null
  } SENAO {
    VOLTA a / b
  }
}
\`\`\`

The \`SENAO\` branch runs only when the condition is false.`,
`<h1>SENAO — Else Clauses</h1>
<pre><code>SE LIGA SO (cond) {
  // when true
} SENAO {
  // when false
}</code></pre>
<p><code>SENAO</code> runs when the condition is false.</p>`,
[
  { q: 'What keyword represents else?', a: 'SENAO', p: 3 },
  { q: 'When does SENAO execute?', a: 'when the if condition is false', p: 3 },
]));

lessons.push(L('senao-se', 'SENAO SE (Else If Chains)', 18, 10,
`# SENAO SE — Else If Chains

\`SENAO SE\` ("otherwise if") chains multiple conditions.

## Grade Classification

\`\`\`xs
CRIA nota = 85

SE LIGA SO (nota >= 90) {
  SOLTA O GRITO("A")
} SENAO SE (nota >= 80) {
  SOLTA O GRITO("B")
} SENAO SE (nota >= 70) {
  SOLTA O GRITO("C")
} SENAO SE (nota >= 60) {
  SOLTA O GRITO("D")
} SENAO {
  SOLTA O GRITO("F")
}
\`\`\`

## Tax Example

\`\`\`xs
CRIA renda = 5000
CRIA dependentes = 2

SE LIGA SO (renda <= 2000) {
  SOLTA O GRITO("Isento")
} SENAO SE (renda <= 5000 E dependentes > 1) {
  SOLTA O GRITO("Taxa reduzida")
} SENAO SE (renda <= 10000) {
  SOLTA O GRITO("Taxa normal")
} SENAO {
  SOLTA O GRITO("Taxa maxima")
}
\`\`\`

Conditions checked top-to-bottom. First match executes.`,
`<h1>SENAO SE — Else If Chains</h1>
<pre><code>SE LIGA SO (nota >= 90) { "A" }
SENAO SE (nota >= 80) { "B" }
SENAO { "F" }</code></pre>
<p>First match executes. Final <code>SENAO</code> is optional.</p>`,
[
  { q: 'What keyword starts else-if?', a: 'SENAO SE', p: 3 },
  { q: 'How many branches execute in a chain?', a: 'one', p: 3 },
  { q: 'Is the final SENAO required?', a: 'no', p: 3 },
]));

lessons.push(L('nested-conditionals', 'Nested Conditionals', 19, 10,
`# Nested Conditionals

\`SE LIGA SO\` inside other \`SE LIGA SO\` blocks.

## Basic Nesting

\`\`\`xs
CRIA logado = VERDADEIRO
CRIA admin = FALSO

SE LIGA SO (logado) {
  SE LIGA SO (admin) {
    SOLTA O GRITO("Bem-vindo, administrador!")
  } SENAO {
    SOLTA O GRITO("Bem-vindo, usuario!")
  }
} SENAO {
  SOLTA O GRITO("Faca login para continuar")
}
\`\`\`

## Avoiding Deep Nesting

Use early returns to flatten code:

\`\`\`xs
CHAMA ESSE CARA podeDirigir(idade, temCarteira) {
  SE LIGA SO (idade < 18) { VOLTA FALSO }
  SE LIGA SO (!temCarteira) { VOLTA FALSO }
  VOLTA VERDADEIRO
}
\`\`\`

## Tips

- Indent each level by 2 spaces
- Keep nesting to 3 levels or less
- Extract complex logic into separate functions`,
`<h1>Nested Conditionals</h1>
<pre><code>SE LIGA SO (logado) {
  SE LIGA SO (admin) { ... }
  SENAO { ... }
}</code></pre>
<h2>Avoid Deep Nesting</h2>
<p>Use early returns:</p>
<pre><code>SE LIGA SO (x < 0) { VOLTA FALSO }
VOLTA VERDADEIRO</code></pre>`,
[
  { q: 'What technique avoids deep nesting?', a: 'early returns', p: 3 },
  { q: 'Keep nesting to how many levels?', a: '3', p: 5 },
]));

lessons.push(L('ternary-expressions', 'Ternary/Conditional Expressions', 20, 10,
`# Ternary/Conditional Expressions

Inline conditional using \`? :\`.

## Basic Syntax

\`\`\`xs
condicao ? valor_se_verdadeiro : valor_se_falso
\`\`\`

## Examples

\`\`\`xs
CRIA idade = 20
CRIA status = (idade >= 18) ? "Adulto" : "Menor"
SOLTA O GRITO(status)  // Adulto

CRIA nota = 75
CRIA resultado = (nota >= 70) ? "Aprovado" : "Reprovado"
\`\`\`

## Chained Ternary

\`\`\`xs
CRIA classificacao = (nota >= 90) ? "A" :
                     (nota >= 80) ? "B" :
                     (nota >= 70) ? "C" :
                     (nota >= 60) ? "D" : "F"
\`\`\`

## Ternary vs If/Else

\`\`\`xs
// Ternary (expression)
CRIA taxa = (renda > 5000) ? 0.3 : 0.15

// If/else (statement)
SE LIGA SO (renda > 5000) {
  taxa = 0.3
} SENAO {
  taxa = 0.15
}
\`\`\`

Ternary is an expression that returns a value.`,
`<h1>Ternary Expressions</h1>
<pre><code>CRIA status = (idade >= 18) ? "Adulto" : "Menor"</code></pre>
<p><code>cond ? valTrue : valFalse</code></p>
<p>Use for simple binary choices. Avoid deep chaining.</p>`,
[
  { q: 'What operator creates a conditional expression?', a: '? :', p: 3 },
  { q: 'Is ternary an expression or statement?', a: 'expression', p: 5 },
]));

lessons.push(L('combina-basics', 'COMBINA Basics (Switch/Match)', 21, 10,
`# COMBINA Basics

\`COMBINA\` is pattern matching, similar to \`switch\`/\`match\`.

## Basic Syntax

\`\`\`xs
CRIA fruta = "maca"

COMBINA (fruta) {
  CASO "maca" => SOLTA O GRITO("Maca vermelha")
  CASO "banana" => SOLTA O GRITO("Banana amarela")
  CASO "laranja" => SOLTA O GRITO("Laranja doce")
  CASO _ => SOLTA O GRITO("Fruta desconhecida")
}
\`\`\`

## Returning Values

\`\`\`xs
CRIA mensagem = COMBINA (fruta) {
  CASO "maca" => "Maca vermelha e doce"
  CASO "banana" => "Banana amarela e cremosa"
  CASO _ => "Fruta desconhecida"
}
\`\`\`

## Multiple Values

\`\`\`xs
COMBINA (codigo) {
  CASO 200 => SOLTA O GRITO("OK")
  CASO 301, 302 => SOLTA O GRITO("Redirecionamento")
  CASO 400, 401, 403 => SOLTA O GRITO("Erro do cliente")
  CASO 500 => SOLTA O GRITO("Erro do servidor")
  CASO _ => SOLTA O GRITO("Codigo desconhecido")
}
\`\`\``,
`<h1>COMBINA Basics</h1>
<p><code>COMBINA</code> is pattern matching:</p>
<pre><code>COMBINA (fruta) {
  CASO "maca" => "Maca"
  CASO _ => "Desconhecida"
}</code></pre>`,
[
  { q: 'What starts pattern matching?', a: 'COMBINA', p: 3 },
  { q: 'What keyword defines a case?', a: 'CASO', p: 3 },
  { q: 'What is the wildcard character?', a: '_', p: 3 },
]));

lessons.push(L('combina-ranges', 'COMBINA with Ranges', 22, 10,
`# COMBINA with Ranges

Range matching using comparison operators.

## Numeric Ranges

\`\`\`xs
CRIA nota = 85

COMBINA (nota) {
  CASO 100 => SOLTA O GRITO("Perfeito!")
  CASO >= 90 => SOLTA O GRITO("Excelente!")
  CASO >= 80 => SOLTA O GRITO("Muito bom!")
  CASO >= 70 => SOLTA O GRITO("Bom")
  CASO >= 60 => SOLTA O GRITO("Suficiente")
  CASO _ => SOLTA O GRITO("Estude mais!")
}
\`\`\`

## Order Matters

\`\`\`xs
// Correct: specific first
CASO >= 90 => "Excelente"
CASO >= 80 => "Bom"

// Wrong: 90 never matches
CASO >= 80 => "Bom"        // matches 80-100
CASO >= 90 => "Excelente"  // unreachable!
\`\`\`

## Multiple Conditions

\`\`\`xs
COMBINA (valor) {
  CASO >= 90 E <= 100 => SOLTA O GRITO("A")
  CASO >= 80 E < 90 => SOLTA O GRITO("B")
  CASO _ => SOLTA O GRITO("Outro")
}
\`\`\``,
`<h1>COMBINA with Ranges</h1>
<pre><code>COMBINA (nota) {
  CASO >= 90 => "Excelente"
  CASO >= 80 => "Bom"
  CASO _ => "Estude mais"
}</code></pre>
<p>Order matters — specific cases first.</p>`,
[
  { q: 'Can COMBINA use >= in cases?', a: 'yes', p: 3 },
  { q: 'What happens if broader range comes first?', a: 'specific becomes unreachable', p: 5 },
]));

lessons.push(L('combina-wildcards', 'COMBINA Wildcards (_)', 23, 5,
`# COMBINA Wildcards

The underscore \`_\` matches any value.

## Default Case

\`\`\`xs
COMBINA (valor) {
  CASO 0 => SOLTA O GRITO("Zero")
  CASO _ => SOLTA O GRITO("Nao e zero")
}
\`\`\`

## Ignoring Values

\`\`\`xs
COMBINA (status) {
  CASO 200 => "OK"
  CASO 404 => "Nao encontrado"
  CASO _ => "Outro status"
}
\`\`\`

## Wildcard is Mandatory

Omitting the wildcard produces a warning:

\`\`\`xs
COMBINA (cor) {
  CASO "vermelho" => "Red"
  CASO "azul" => "Blue"
  // Warning: non-exhaustive pattern!
}
\`\`\`

The wildcard must be the final arm because it matches everything.`,
`<h1>COMBINA Wildcards</h1>
<p><code>_</code> matches any value. Must be the last arm.</p>
<pre><code>CASO _ => "Default case"</code></pre>
<p>Omitting wildcard produces a non-exhaustive warning.</p>`,
[
  { q: 'What is the wildcard character?', a: '_', p: 3 },
  { q: 'Where must the wildcard be placed?', a: 'last', p: 3 },
]));

lessons.push(L('combina-expressions', 'COMBINA Expressions', 24, 10,
`# COMBINA Expressions

COMBINA is an expression that returns values.

## Expression Form

\`\`\`xs
CRIA resultado = COMBINA (valor) {
  CASO "a" => 1
  CASO "b" => 2
  CASO _ => 0
}
\`\`\`

## Type Consistency

All arms should return the same type:

\`\`\`xs
CRIA msg = COMBINA (cod) {
  CASO 200 => "OK"
  CASO 404 => "Nao encontrado"
  CASO _ => "Desconhecido"
}
\`\`\`

## In Function Returns

\`\`\`xs
CHAMA ESSE CARA getDiaTipo(dia) {
  VOLTA COMBINA (dia) {
    CASO "sabado" => "fim de semana"
    CASO "domingo" => "fim de semana"
    CASO _ => "dia util"
  }
}
\`\`\`

## Nested COMBINA

\`\`\`xs
CRIA score = COMBINA (categoria) {
  CASO "admin" => COMBINA (nivel) {
    CASO >= 5 => 100
    CASO _ => 50
  }
  CASO _ => 0
}
\`\`\``,
`<h1>COMBINA Expressions</h1>
<p>COMBINA returns values:</p>
<pre><code>CRIA r = COMBINA (x) {
  CASO "a" => 1
  CASO _ => 0
}</code></pre>
<p>All arms should return the same type.</p>`,
[
  { q: 'Is COMBINA a statement or expression?', a: 'expression', p: 3 },
  { q: 'What should all arms return?', a: 'the same type', p: 3 },
]));

lessons.push(L('short-circuit-evaluation', 'Short-Circuit Evaluation', 25, 5,
`# Short-Circuit Evaluation

Right operand only evaluated if necessary.

## AND (\`E\`) Short-Circuit

If left is \`FALSO\`, right is never evaluated:

\`\`\`xs
CRIA usuario = null

SE LIGA SO (usuario != null E usuario.ativo) {
  // safe: right side skipped when null
}
\`\`\`

## OR (\`OU\`) Short-Circuit

If left is \`VERDADEIRO\`, right is never evaluated:

\`\`\`xs
CRIA nome = "Admin"

SE LIGA SO (nome == "Admin" OU nome == "Root") {
  SOLTA O GRITO("Acesso especial")
}
\`\`\`

## Practical Patterns

\`\`\`xs
// Default value
CRIA displayNome = nome OU "Convidado"

// Guard
CRIA email = usuario E usuario.email

// Early exit
SE LIGA SO (!dados OU !dados.nome) { VOLTA FALSO }
\`\`\``,
`<h1>Short-Circuit Evaluation</h1>
<p><code>E</code>: if left is false, right skipped.<br>
<code>OU</code>: if left is true, right skipped.</p>
<pre><code>CRIA nome = usuario ?? "Convidado"</code></pre>`,
[
  { q: 'What happens in E if left is FALSO?', a: 'right not evaluated', p: 3 },
  { q: 'What operator for default values?', a: 'OU', p: 3 },
]));

// ═══════════════════════════════════
// MODULE 3: Loops (26-35)
// ═══════════════════════════════════

lessons.push(L('repete-na-moral', 'REPETE NA MORAL (For Loop)', 26, 10,
`# REPETE NA MORAL — For Loop

\`REPETE NA MORAL\` ("repeat in style") is the \`for\` loop.

## Basic Syntax

\`\`\`xs
REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SOLTA O GRITO("Iteracao " + i)
}
// 0, 1, 2, 3, 4
\`\`\`

Three parts: initialization, condition, increment.

## Decrementing

\`\`\`xs
REPETE NA MORAL (CRIA i = 5; i > 0; i--) {
  SOLTA O GRITO(i)
}
// 5, 4, 3, 2, 1
\`\`\`

## Custom Step

\`\`\`xs
REPETE NA MORAL (CRIA i = 0; i <= 10; i += 2) {
  SOLTA O GRITO(i)
}
// 0, 2, 4, 6, 8, 10
\`\`\`

## Array Iteration

\`\`\`xs
CRIA items = ["A", "B", "C"]
REPETE NA MORAL (CRIA i = 0; i < tamanho(items); i++) {
  SOLTA O GRITO(items[i])
}
// A, B, C
\`\`\`

## Omitted Parts

\`\`\`xs
// External counter
CRIA i = 0
REPETE NA MORAL (; i < 5; i++) {
  SOLTA O GRITO(i)
}
\`\`\``,
`<h1>REPETE NA MORAL — For Loop</h1>
<pre><code>REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SOLTA O GRITO(i)
}
// 0, 1, 2, 3, 4</code></pre>
<p>Three parts: init, condition, increment.</p>`,
[
  { q: 'What starts a for loop?', a: 'REPETE NA MORAL', p: 3 },
  { q: 'How many parts inside parentheses?', a: '3', p: 3 },
  { q: 'Loop from 10 down to 1?', a: 'REPETE NA MORAL (CRIA i = 10; i > 0; i--)', p: 5 },
]));

lessons.push(L('loop-iteration-patterns', 'Loop Iteration Patterns', 27, 10,
`# Loop Iteration Patterns

Various patterns beyond simple increment.

## Increment

\`\`\`xs
i++    // by 1
i += 2 // by 2
\`\`\`

## Decrement

\`\`\`xs
i--     // by 1
i -= 5  // by 5
\`\`\`

## Geometric

\`\`\`xs
REPETE NA MORAL (CRIA i = 1; i < 1000; i *= 2) {
  SOLTA O GRITO(i)
}
// 1, 2, 4, 8, 16, 32, 64, 128, 256, 512
\`\`\`

## String Index

\`\`\`xs
CRIA texto = "XanaScript"
REPETE NA MORAL (CRIA i = 0; i < tamanho(texto); i++) {
  SOLTA O GRITO(texto[i])
}
\`\`\`

## Nested Loop Pattern

\`\`\`xs
REPETE NA MORAL (CRIA i = 1; i <= 5; i++) {
  CRIA linha = ""
  REPETE NA MORAL (CRIA j = 1; j <= 5; j++) {
    linha = linha + (i * j) + "\\t"
  }
  SOLTA O GRITO(linha)
}
\`\`\``,
`<h1>Loop Iteration Patterns</h1>
<pre><code>i++    // +1
i += 2 // step 2
i--    // -1
i *= 2 // double</code></pre>`,
[
  { q: 'Pattern to double i each iteration?', a: 'i *= 2', p: 5 },
  { q: 'Count 100 to 0 by 25?', a: 'i = 100; i >= 0; i -= 25', p: 3 },
]));

lessons.push(L('repete-ai', 'REPETE AI (While Loops)', 28, 10,
`# REPETE AI — While Loops

\`REPETE AI\` ("repeat there") is the \`while\` loop.

## Basic Syntax

\`\`\`xs
CRIA contador = 0
REPETE AI (contador < 3) {
  SOLTA O GRITO("Contagem: " + contador)
  contador++
}
// Contagem: 0, 1, 2
\`\`\`

## When to Use

Use when iteration count is unknown in advance:

\`\`\`xs
CRIA tentativas = 0
CRIA senhaCorreta = FALSO

REPETE AI (!senhaCorreta E tentativas < 3) {
  CRIA entrada = lerSenha()
  SE LIGA SO (entrada == "1234") {
    senhaCorreta = VERDADEIRO
  }
  tentativas++
}
\`\`\`

## Infinite Loop

\`\`\`xs
REPETE AI (VERDADEIRO) {
  CRIA comando = lerComando()
  SE LIGA SO (comando == "sair") { PARE }
  executar(comando)
}
\`\`\``,
`<h1>REPETE AI — While Loops</h1>
<pre><code>CRIA i = 0
REPETE AI (i < 3) {
  SOLTA O GRITO(i)
  i++
}</code></pre>
<p>Use when iteration count is unknown.</p>`,
[
  { q: 'What starts a while loop?', a: 'REPETE AI', p: 3 },
  { q: 'When to use REPETE AI?', a: 'when iteration count is unknown', p: 5 },
  { q: 'Infinite while loop?', a: 'REPETE AI (VERDADEIRO)', p: 3 },
]));

lessons.push(L('do-while-loops', 'Do-While Loops', 29, 10,
`# Do-While Loops

Body executes at least once before checking condition.

## Syntax

\`\`\`xs
CRIA i = 0
REPETE {
  SOLTA O GRITO("Executa ao menos uma vez: " + i)
  i++
} REPETE AI (i < 3)
\`\`\`

## Key Difference

\`\`\`xs
// While: checks condition FIRST
CRIA x = 10
REPETE AI (x < 5) {
  SOLTA O GRITO("Nunca executa")
}

// Do-while: checks AFTER
CRIA y = 10
REPETE {
  SOLTA O GRITO("Executa uma vez")  // runs once!
  y++
} REPETE AI (y < 5)
\`\`\`

## User Input

\`\`\`xs
CRIA opcao = ""
REPETE {
  opcao = mostrarMenu()
  processarOpcao(opcao)
} REPETE AI (opcao != "sair")
\`\`\``,
`<h1>Do-While Loops</h1>
<pre><code>CRIA i = 0
REPETE {
  SOLTA O GRITO(i)
  i++
} REPETE AI (i < 3)</code></pre>
<p>Body executes at least once.</p>`,
[
  { q: 'How many times does body execute?', a: 'at least once', p: 3 },
  { q: 'Do-while syntax?', a: 'REPETE { body } REPETE AI (cond)', p: 5 },
]));

lessons.push(L('nested-loops', 'Nested Loops', 30, 10,
`# Nested Loops

Loops inside loops for multi-dimensional iteration.

## 2D Grid

\`\`\`xs
REPETE NA MORAL (CRIA linha = 0; linha < 3; linha++) {
  CRIA linhaStr = ""
  REPETE NA MORAL (CRIA col = 0; col < 3; col++) {
    linhaStr = linhaStr + "(" + linha + "," + col + ") "
  }
  SOLTA O GRITO(linhaStr)
}
// (0,0) (0,1) (0,2)
// (1,0) (1,1) (1,2)
// (2,0) (2,1) (2,2)
\`\`\`

## Multiplication Table

\`\`\`xs
REPETE NA MORAL (CRIA i = 1; i <= 5; i++) {
  CRIA linha = ""
  REPETE NA MORAL (CRIA j = 1; j <= 5; j++) {
    linha = linha + (i * j) + "\\t"
  }
  SOLTA O GRITO(linha)
}
\`\`\`

## Break from Nested Loops

\`\`\`xs
externo: REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  REPETE NA MORAL (CRIA j = 0; j < 5; j++) {
    SE LIGA SO (i * j > 6) { PARE externo }
  }
}
\`\`\`

Complexity O(n*m).`,
`<h1>Nested Loops</h1>
<pre><code>REPETE NA MORAL (CRIA i = 0; i < 3; i++) {
  REPETE NA MORAL (CRIA j = 0; j < 3; j++) {
    ...
  }
}</code></pre>
<p>O(n*m) complexity.</p>`,
[
  { q: 'Complexity of two nested loops?', a: 'O(n*m)', p: 3 },
  { q: 'Exit outer loop from inside?', a: 'PARE label', p: 5 },
]));

lessons.push(L('pare-break', 'PARE (Break)', 31, 5,
`# PARE — Break

\`PARE\` ("stop") exits the current loop immediately.

## Basic Break

\`\`\`xs
REPETE NA MORAL (CRIA i = 0; i < 10; i++) {
  SE LIGA SO (i == 5) { PARE }
  SOLTA O GRITO(i)
}
// 0, 1, 2, 3, 4
\`\`\`

## Early Exit

\`\`\`xs
CHAMA ESSE CARA encontrar(array, alvo) {
  REPETE NA MORAL (CRIA i = 0; i < tamanho(array); i++) {
    SE LIGA SO (array[i] == alvo) { VOLTA i }
  }
  VOLTA -1
}
\`\`\`

## Break from While

\`\`\`xs
CRIA total = 0
REPETE AI (VERDADEIRO) {
  CRIA entrada = lerNumero()
  SE LIGA SO (entrada < 0) { PARE }
  total = total + entrada
}
\`\`\`

## Labeled Break

\`\`\`xs
busca: REPETE NA MORAL (...) {
  REPETE NA MORAL (...) {
    SE LIGA SO (found) { PARE busca }
  }
}
\`\`\``,
`<h1>PARE — Break</h1>
<pre><code>REPETE NA MORAL (CRIA i = 0; i < 10; i++) {
  SE LIGA SO (i == 5) { PARE }
}
// Prints 0-4</code></pre>
<p><code>PARE</code> exits the loop. <code>VOLTA</code> exits the function.</p>`,
[
  { q: 'What keyword exits a loop immediately?', a: 'PARE', p: 3 },
  { q: 'Does PARE exit the loop or function?', a: 'the loop', p: 3 },
  { q: 'Break from nested loops?', a: 'PARE label', p: 5 },
]));

lessons.push(L('continua', 'CONTINUA (Continue)', 32, 5,
`# CONTINUA — Continue

\`CONTINUA\` skips to the next iteration.

## Basic Continue

\`\`\`xs
REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SE LIGA SO (i == 2) { CONTINUA }
  SOLTA O GRITO(i)
}
// 0, 1, 3, 4
\`\`\`

## Filtering

\`\`\`xs
// Print only even numbers
REPETE NA MORAL (CRIA i = 0; i < 10; i++) {
  SE LIGA SO (i % 2 != 0) { CONTINUA }
  SOLTA O GRITO(i)
}
// 0, 2, 4, 6, 8
\`\`\`

## Skip Invalid

\`\`\`xs
CRIA dados = [1, -5, 3, null, 7, 0, 4]
CRIA soma = 0

REPETE NA MORAL (CRIA i = 0; i < tamanho(dados); i++) {
  SE LIGA SO (dados[i] == null OU dados[i] <= 0) {
    CONTINUA
  }
  soma = soma + dados[i]
}
SOLTA O GRITO(soma)  // 15
\`\`\``,
`<h1>CONTINUA — Continue</h1>
<pre><code>REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SE LIGA SO (i == 2) { CONTINUA }
  SOLTA O GRITO(i)
}
// 0, 1, 3, 4</code></pre>`,
[
  { q: 'What keyword skips to next iteration?', a: 'CONTINUA', p: 3 },
  { q: 'Difference between PARE and CONTINUA?', a: 'PARE exits loop, CONTINUA skips iteration', p: 5 },
]));

lessons.push(L('loop-labels', 'Loop Labels', 33, 10,
`# Loop Labels

Labels name loops for precise flow control.

## Basic Label

\`\`\`xs
nome_do_rotulo: REPETE NA MORAL (...) {
  // loop body
}
\`\`\`

## Break to Outer Loop

\`\`\`xs
externo: REPETE NA MORAL (CRIA i = 0; i < 3; i++) {
  REPETE NA MORAL (CRIA j = 0; j < 3; j++) {
    SE LIGA SO (i == 1 E j == 1) {
      PARE externo  // exits both
    }
    SOLTA O GRITO("i=" + i + " j=" + j)
  }
}
\`\`\`

## Continue with Labels

\`\`\`xs
linhas: REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SE LIGA SO (i % 2 == 0) { CONTINUA linhas }
  // process odd rows
  REPETE NA MORAL (CRIA j = 0; j < 5; j++) {
    SOLTA O GRITO(i + "," + j)
  }
}
\`\`\`

## Grid Search

\`\`\`xs
encontrado: REPETE NA MORAL (...) {
  REPETE NA MORAL (...) {
    SE LIGA SO (grid[i][j] == alvo) {
      PARE encontrado
    }
  }
}
\`\`\``,
`<h1>Loop Labels</h1>
<pre><code>externo: REPETE NA MORAL (CRIA i = 0; i < 3; i++) {
  REPETE NA MORAL (CRIA j = 0; j < 3; j++) {
    SE LIGA SO (cond) { PARE externo }
  }
}</code></pre>
<p>Works with <code>PARE</code> and <code>CONTINUA</code>.</p>`,
[
  { q: 'How to create a loop label?', a: 'nome: REPETE NA MORAL', p: 3 },
  { q: 'Does CONTINUA work with labels?', a: 'yes', p: 3 },
]));

lessons.push(L('infinite-loops', 'Infinite Loops and How to Avoid Them', 34, 5,
`# Infinite Loops and How to Avoid Them

Infinite loops run forever unless interrupted.

## Intentional

\`\`\`xs
REPETE AI (VERDADEIRO) {
  processarEntrada()
  atualizarEstado()
  renderizar()
  SE LIGA SO (deveSair) { PARE }
}
\`\`\`

## Common Bugs

\`\`\`xs
// Bug 1: Missing increment
CRIA i = 0
REPETE AI (i < 10) {
  // forgot i++
}

// Bug 2: Wrong direction
CRIA i = 10
REPETE AI (i > 0) {
  i++  // goes up, never down
}

// Bug 3: Floating point
CRIA i = 0
REPETE AI (i != 1.0) {  // may never be exact
  i = i + 0.1
}
\`\`\`

## Prevention

\`\`\`xs
// Safety counter
CRIA maxIter = 1000
CRIA iter = 0
REPETE AI (!done E iter < maxIter) {
  iter++
}
\`\`\``,
`<h1>Infinite Loops</h1>
<h2>Common Causes</h2>
<ul>
<li>Missing increment</li>
<li>Wrong condition direction</li>
<li>Floating point comparisons</li>
</ul>
<h2>Prevention</h2>
<pre><code>REPETE AI (!done E iter < 1000) { iter++ }</code></pre>`,
[
  { q: 'Common cause of infinite loops?', a: 'missing increment', p: 3 },
  { q: 'Safety pattern for loops?', a: 'max iteration counter', p: 5 },
]));

lessons.push(L('loop-optimization-tips', 'Loop Optimization Tips', 35, 10,
`# Loop Optimization Tips

Optimize loops for better performance.

## 1. Pre-compute Bounds

\`\`\`xs
// Slow: recalculates each time
REPETE NA MORAL (CRIA i = 0; i < tamanho(array); i++) { }

// Fast: compute once
CRIA len = tamanho(array)
REPETE NA MORAL (CRIA i = 0; i < len; i++) { }
\`\`\`

## 2. Move Invariants Outside

\`\`\`xs
CRIA taxa = calcularTaxa()  // once
REPETE NA MORAL (CRIA i = 0; i < len; i++) {
  CRIA valor = items[i] * taxa  // use precomputed
}
\`\`\`

## 3. Reduce Property Lookups

\`\`\`xs
CRIA users = dados.usuarios
CRIA count = users.contagem
REPETE NA MORAL (CRIA i = 0; i < count; i++) {
  processar(users[i])
}
\`\`\`

## 4. Manual Unrolling

\`\`\`xs
// Instead of 4 iterations: REPETE NA MORAL ...
f(0); f(1); f(2); f(3)
\`\`\`

## 5. Avoid Nested Loops on Large Data

Use objects/maps for lookups instead of nested iteration.`,
`<h1>Loop Optimization Tips</h1>
<ol>
<li>Pre-compute bounds — compute <code>tamanho()</code> once</li>
<li>Move invariants — compute constants before loop</li>
<li>Reduce lookups — cache object access</li>
<li>Unroll small loops — inline 2-4 iterations</li>
<li>Avoid nested loops — use maps</li>
</ol>`,
[
  { q: 'Why compute tamanho() before a loop?', a: 'to avoid recalculating each iteration', p: 5 },
  { q: 'What is loop unrolling?', a: 'replacing a loop with inlined repeated code', p: 5 },
  { q: 'How many iterations does the optimizer unroll?', a: 'up to 8', p: 5 },
]));

// ═══════════════════════════════════
// MODULE 4: Functions (36-47)
// ═══════════════════════════════════

lessons.push(L('chama-esse-cara', 'CHAMA ESSE CARA (Function Declaration)', 36, 10,
`# CHAMA ESSE CARA — Function Declaration

\`CHAMA ESSE CARA\` ("call this guy") declares a function.

## Basic Syntax

\`\`\`xs
CHAMA ESSE CARA saudacao(nome) {
  SOLTA O GRITO("Ola, " + nome + "!")
}

saudacao("Ana")  // Ola, Ana!
\`\`\`

## With Return

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b
}

CRIA resultado = soma(10, 20)
SOLTA O GRITO(resultado)  // 30
\`\`\`

## Multiple Parameters

\`\`\`xs
CHAMA ESSE CARA criarUsuario(nome, email, idade) {
  SOLTA O GRITO("Criando: " + nome)
}
\`\`\`

## Hoisting

Functions are hoisted — can be called before declaration:

\`\`\`xs
CRIA r = dobro(5)  // 10 — works!

CHAMA ESSE CARA dobro(x) {
  VOLTA x * 2
}
\`\`\`

Functions are first-class values in XanaScript.`,
`<h1>CHAMA ESSE CARA — Function Declaration</h1>
<pre><code>CHAMA ESSE CARA saudacao(nome) {
  SOLTA O GRITO("Ola, " + nome + "!")
}</code></pre>
<p>Functions are hoisted and first-class.</p>`,
[
  { q: 'What keyword declares a function?', a: 'CHAMA ESSE CARA', p: 3 },
  { q: 'Are functions hoisted?', a: 'yes', p: 3 },
  { q: 'What does a function return without VOLTA?', a: 'undefined', p: 5 },
]));

// I need to continue adding all lessons.
