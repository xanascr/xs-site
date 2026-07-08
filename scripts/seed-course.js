import mongoose from "mongoose";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

const lessons = [
  // ── Module 1: Getting Started ────────────────────────────────────────
  {
    slug: "what-is-xanascript",
    title: "What is XanaScript?",
    order: 1,
    points: 5,
    bodyMd: `# What is XanaScript?

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
    bodyHtml: `<h1>What is XanaScript?</h1>
<p>XanaScript is a <strong>full programming language</strong> designed entirely in Brazilian Portuguese. Unlike transpilers or wrappers, every keyword, operator, and syntax construct is native Portuguese — parsed, type-checked, compiled, and executed by a custom toolchain written in JavaScript.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Multi-word keywords</strong> like <code>SE LIGA SO</code>, <code>CHAMA ESSE CARA</code>, <code>REPETE NA MORAL</code> — lexed as atomic tokens</li>
<li><strong>Built-in ORM</strong> (<code>TABELA</code>) — first-class syntax for database CRUD</li>
<li><strong>Optimizing compiler</strong> — constant folding, loop unrolling, integer inference</li>
<li><strong>Native WebAssembly</strong> — direct <code>.wasm</code> binary emission, no Emscripten</li>
<li><strong>Compile-time macros</strong> — AST-level substitution, zero runtime cost</li>
<li><strong>LSP server</strong> — completions, hover, diagnostics, go-to-definition</li>
<li><strong>Test runner</strong> — <code>TESTE</code> / <code>AFIRMA</code> as native AST nodes</li>
</ul>
<h2>The Philosophy</h2>
<p>Code should read like it's written for humans. Every construct in XanaScript uses clear, intuitive Portuguese keywords so the intent is obvious at a glance. You don't translate your thoughts into English keywords — you write in your native language.</p>
<p>Let's get started!</p>`,
    challenges: [
      {
        question: "What type of tokens are multi-word keywords like 'SE LIGA SO' treated as?",
        answer: "atomic",
        points: 3,
      },
      {
        question: "Does XanaScript use a transpiler approach or is it a native compiler?",
        answer: "native compiler",
        points: 3,
      },
    ],
  },
  {
    slug: "installation-setup",
    title: "Installation & Setup",
    order: 2,
    points: 5,
    bodyMd: `# Installation & Setup

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

Install \`vscode-xs\` from the marketplace for syntax highlighting, snippets, and LSP integration.

## Supported Platforms

| Platform | npm | Binary |
|----------|-----|--------|
| Windows  | ✅  | ✅     |
| Linux    | ✅  | ✅     |
| macOS    | ✅  | ✅     |`,
    bodyHtml: `<h1>Installation &amp; Setup</h1>
<p>XanaScript can be installed in two ways:</p>
<h2>Via npm (Cross-platform)</h2>
<pre><code>npm install -g xanascript</code></pre>
<p>This requires Node.js 18+ and works on Windows, Linux, and macOS.</p>
<h2>Native Binary (Standalone)</h2>
<pre><code>curl -fsSL https://xanascript.xyz/install.sh | bash</code></pre>
<p>No Node.js required — a single executable with zero dependencies.</p>
<h2>Verify Installation</h2>
<pre><code>xs --version</code></pre>
<h2>Your First Command</h2>
<pre><code>xs run hello.xs</code></pre>
<h2>VS Code Extension</h2>
<p>Install <code>vscode-xs</code> from the marketplace for syntax highlighting, snippets, and LSP integration.</p>`,
    challenges: [
      {
        question: "What is the npm command to install XanaScript globally?",
        answer: "npm install -g xanascript",
        points: 3,
      },
    ],
  },
  {
    slug: "your-first-program",
    title: "Your First Program",
    order: 3,
    points: 10,
    bodyMd: `# Your First Program

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
- No type annotations needed — types are inferred

## Comments

\`\`\`xs
// This is a single-line comment

/* This is a
   multi-line comment */
\`\`\``,
    bodyHtml: `<h1>Your First Program</h1>
<p>Let's write the classic "Hello, World!" in XanaScript:</p>
<pre><code>SOLTA O GRITO("Hello, World!")</code></pre>
<p>Create a file called <code>hello.xs</code> and run it:</p>
<pre><code>xs run hello.xs</code></pre>
<h2>Breaking It Down</h2>
<ul>
<li><code>SOLTA O GRITO</code> is the print function — literally "shout it out"</li>
<li>Parentheses <code>()</code> wrap the argument</li>
<li>Double quotes <code>"..."</code> delimit a string</li>
</ul>
<h2>Variables</h2>
<pre><code>CRIA nome = "Maria"
CRIA idade = 25
SOLTA O GRITO("Ola, " + nome + "! Voce tem " + idade + " anos.")</code></pre>
<ul>
<li><code>CRIA</code> declares a variable ("create")</li>
<li><code>+</code> concatenates strings and numbers</li>
<li>No type annotations needed — types are inferred</li>
</ul>
<h2>Comments</h2>
<pre><code>// This is a single-line comment

/* This is a
   multi-line comment */</code></pre>`,
    challenges: [
      {
        question: "What keyword is used to declare a variable in XanaScript?",
        answer: "CRIA",
        points: 3,
      },
      {
        question: "What function prints output to the console?",
        answer: "SOLTA O GRITO",
        points: 3,
      },
    ],
  },

  // ── Module 2: Fundamentals ───────────────────────────────────────────
  {
    slug: "variables-constants",
    title: "Variables & Constants",
    order: 4,
    points: 10,
    bodyMd: `# Variables & Constants

## CRIA — Variables

\`CRIA\` declares a mutable variable:

\`\`\`xs
CRIA nome = "Joao"
nome = "Maria"  // reassign
SOLTA O GRITO(nome)  // Maria
\`\`\`

## Type Inference

XanaScript infers types automatically:

\`\`\`xs
CRIA texto = "Ola"          // TEXTO (string)
CRIA numero = 42            // NUMERO (number)
CRIA booleano = VERDADEIRO  // BOOLEANO (boolean)
CRIA qualquer = null        // QUALQUER (any)
\`\`\`

## CONSTANTE — Immutable Values

\`CONSTANTE\` creates a read-only binding:

\`\`\`xs
CONSTANTE PI = 3.14159
CONSTANTE NOME_APP = "XanaScript"

// PI = 3.14  // Error! Cannot reassign a constant
\`\`\`

## Naming Rules

- Can contain letters, numbers, and underscores
- Must start with a letter or underscore
- Case-sensitive: \`nome\` ≠ \`Nome\`
- Keywords cannot be used as names`,
    bodyHtml: `<h1>Variables &amp; Constants</h1>
<h2>CRIA — Variables</h2>
<p><code>CRIA</code> declares a mutable variable:</p>
<pre><code>CRIA nome = "Joao"
nome = "Maria"  // reassign
SOLTA O GRITO(nome)  // Maria</code></pre>
<h2>Type Inference</h2>
<p>XanaScript infers types automatically:</p>
<pre><code>CRIA texto = "Ola"          // TEXTO (string)
CRIA numero = 42            // NUMERO (number)
CRIA booleano = VERDADEIRO  // BOOLEANO (boolean)
CRIA qualquer = null        // QUALQUER (any)</code></pre>
<h2>CONSTANTE — Immutable Values</h2>
<p><code>CONSTANTE</code> creates a read-only binding:</p>
<pre><code>CONSTANTE PI = 3.14159
CONSTANTE NOME_APP = "XanaScript"

// PI = 3.14  // Error! Cannot reassign a constant</code></pre>
<h2>Naming Rules</h2>
<ul>
<li>Can contain letters, numbers, and underscores</li>
<li>Must start with a letter or underscore</li>
<li>Case-sensitive: <code>nome</code> ≠ <code>Nome</code></li>
<li>Keywords cannot be used as names</li>
</ul>`,
    challenges: [
      {
        question: "What keyword creates an immutable (read-only) variable?",
        answer: "CONSTANTE",
        points: 3,
      },
      {
        question: "What is the boolean value for 'true' in XanaScript?",
        answer: "VERDADEIRO",
        points: 3,
      },
    ],
  },
  {
    slug: "data-types",
    title: "Data Types",
    order: 5,
    points: 10,
    bodyMd: `# Data Types

XanaScript has five built-in types:

## TEXTO (String)

\`\`\`xs
CRIA saudacao = "Ola, Mundo!"
CRIA vazio = ""
CRIA multilinha = \`Linha 1
Linha 2\`
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
\`\`\``,
    bodyHtml: `<h1>Data Types</h1>
<p>XanaScript has five built-in types:</p>
<h2>TEXTO (String)</h2>
<pre><code>CRIA saudacao = "Ola, Mundo!"
CRIA vazio = ""
CRIA multilinha = \`Linha 1
Linha 2\`</code></pre>
<h2>NUMERO (Number)</h2>
<pre><code>CRIA inteiro = 42
CRIA decimal = 3.14
CRIA negativo = -10</code></pre>
<h2>BOOLEANO (Boolean)</h2>
<pre><code>CRIA ativo = VERDADEIRO   // true
CRIA inativo = FALSO      // false</code></pre>
<h2>DATA (Date)</h2>
<pre><code>CRIA hoje = DATA("2026-07-08")</code></pre>
<h2>QUALQUER (Any)</h2>
<pre><code>CRIA flexivel = QUALQUER("pode ser qualquer coisa")
flexivel = 42  // OK
flexivel = null  // OK</code></pre>`,
    challenges: [
      {
        question: "How many built-in data types does XanaScript have?",
        answer: "5",
        points: 3,
      },
      {
        question: "What is the XanaScript keyword for a boolean FALSE?",
        answer: "FALSO",
        points: 3,
      },
    ],
  },
  {
    slug: "functions",
    title: "Functions (CHAMA ESSE CARA)",
    order: 6,
    points: 15,
    bodyMd: `# Functions — CHAMA ESSE CARA

Functions are declared with \`CHAMA ESSE CARA\` ("call this guy"):

\`\`\`xs
CHAMA ESSE CARA saudacao(nome) {
  SOLTA O GRITO("Ola, " + nome + "!")
}

saudacao("Ana")  // Ola, Ana!
\`\`\`

## Return Values

Use \`VOLTA\` ("return") to return a value:

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b
}

CRIA resultado = soma(10, 20)
SOLTA O GRITO(resultado)  // 30
\`\`\`

## Default Parameters

\`\`\`xs
CHAMA ESSE CARA cumprimentar(nome = "Mundo") {
  SOLTA O GRITO("Ola, " + nome + "!")
}

cumprimentar()       // Ola, Mundo!
cumprimentar("Lua")  // Ola, Lua!
\`\`\`

## Arrow Functions

\`\`\`xs
CRIA quadrado = (x) => x * x
CRIA soma = (a, b) => a + b

SOLTA O GRITO(quadrado(5))  // 25
\`\`\``,
    bodyHtml: `<h1>Functions — CHAMA ESSE CARA</h1>
<p>Functions are declared with <code>CHAMA ESSE CARA</code> ("call this guy"):</p>
<pre><code>CHAMA ESSE CARA saudacao(nome) {
  SOLTA O GRITO("Ola, " + nome + "!")
}

saudacao("Ana")  // Ola, Ana!</code></pre>
<h2>Return Values</h2>
<p>Use <code>VOLTA</code> ("return") to return a value:</p>
<pre><code>CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b
}

CRIA resultado = soma(10, 20)
SOLTA O GRITO(resultado)  // 30</code></pre>
<h2>Default Parameters</h2>
<pre><code>CHAMA ESSE CARA cumprimentar(nome = "Mundo") {
  SOLTA O GRITO("Ola, " + nome + "!")
}

cumprimentar()       // Ola, Mundo!
cumprimentar("Lua")  // Ola, Lua!</code></pre>
<h2>Arrow Functions</h2>
<pre><code>CRIA quadrado = (x) => x * x
CRIA soma = (a, b) => a + b

SOLTA O GRITO(quadrado(5))  // 25</code></pre>`,
    challenges: [
      {
        question: "What keyword declares a function in XanaScript?",
        answer: "CHAMA ESSE CARA",
        points: 3,
      },
      {
        question: "What keyword returns a value from a function?",
        answer: "VOLTA",
        points: 3,
      },
      {
        question: "What operator is used for arrow function syntax?",
        answer: "=>",
        points: 5,
      },
    ],
  },
  {
    slug: "control-flow",
    title: "Control Flow (SE LIGA SO / SENAO)",
    order: 7,
    points: 15,
    bodyMd: `# Control Flow

## SE LIGA SO (If)

\`\`\`xs
CRIA idade = 18

SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
}
\`\`\`

## SENAO (Else)

\`\`\`xs
SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
} SENAO {
  SOLTA O GRITO("Menor de idade")
}
\`\`\`

## SENAO SE (Else If)

\`\`\`xs
SE LIGA SO (nota >= 90) {
  SOLTA O GRITO("A")
} SENAO SE (nota >= 80) {
  SOLTA O GRITO("B")
} SENAO SE (nota >= 70) {
  SOLTA O GRITO("C")
} SENAO {
  SOLTA O GRITO("Reprovado")
}
\`\`\`

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| \`==\`   | Equal |
| \`!=\`   | Not equal |
| \`>\`    | Greater than |
| \`<\`    | Less than |
| \`>=\`   | Greater or equal |
| \`<=\`   | Less or equal |

## Logical Operators

| Operator | Meaning |
|----------|---------|
| \`E\`    | AND |
| \`OU\`   | OR |
| \`NAO\`  | NOT |`,
    bodyHtml: `<h1>Control Flow</h1>
<h2>SE LIGA SO (If)</h2>
<pre><code>CRIA idade = 18

SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
}</code></pre>
<h2>SENAO (Else)</h2>
<pre><code>SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
} SENAO {
  SOLTA O GRITO("Menor de idade")
}</code></pre>
<h2>SENAO SE (Else If)</h2>
<pre><code>SE LIGA SO (nota >= 90) {
  SOLTA O GRITO("A")
} SENAO SE (nota >= 80) {
  SOLTA O GRITO("B")
} SENAO SE (nota >= 70) {
  SOLTA O GRITO("C")
} SENAO {
  SOLTA O GRITO("Reprovado")
}</code></pre>
<h2>Comparison Operators</h2>
<table>
<tr><td><code>==</code></td><td>Equal</td></tr>
<tr><td><code>!=</code></td><td>Not equal</td></tr>
<tr><td><code>&gt;</code></td><td>Greater than</td></tr>
<tr><td><code>&lt;</code></td><td>Less than</td></tr>
<tr><td><code>&gt;=</code></td><td>Greater or equal</td></tr>
<tr><td><code>&lt;=</code></td><td>Less or equal</td></tr>
</table>
<h2>Logical Operators</h2>
<table>
<tr><td><code>E</code></td><td>AND</td></tr>
<tr><td><code>OU</code></td><td>OR</td></tr>
<tr><td><code>NAO</code></td><td>NOT</td></tr>
</table>`,
    challenges: [
      {
        question: "What keyword is used for 'else if' in XanaScript?",
        answer: "SENAO SE",
        points: 3,
      },
      {
        question: "How do you write NOT in XanaScript?",
        answer: "NAO",
        points: 3,
      },
    ],
  },

  // ── Module 3: Advanced Language Features ─────────────────────────────
  {
    slug: "loops",
    title: "Loops (REPETE NA MORAL / REPETE AI)",
    order: 8,
    points: 15,
    bodyMd: `# Loops

## REPETE NA MORAL (For Loop)

\`\`\`xs
// Classic for loop
REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SOLTA O GRITO("Iteracao " + i)
}

// Output:
// Iteracao 0
// Iteracao 1
// Iteracao 2
// Iteracao 3
// Iteracao 4
\`\`\`

## REPETE AI (While Loop)

\`\`\`xs
CRIA contador = 0
REPETE AI (contador < 3) {
  SOLTA O GRITO("Contagem: " + contador)
  contador++  // or contador += 1
}

// Output:
// Contagem: 0
// Contagem: 1
// Contagem: 2
\`\`\`

## Loop Control

\`\`\`xs
// PARE (break) — exit the loop
REPETE NA MORAL (CRIA i = 0; i < 10; i++) {
  SE LIGA SO (i == 5) {
    PARE  // break
  }
  SOLTA O GRITO(i)
}
// Prints 0, 1, 2, 3, 4

// CONTINUA (continue) — skip to next iteration
REPETE NA MORAL (CRIA i = 0; i < 5; i++) {
  SE LIGA SO (i == 2) {
    CONTINUA
  }
  SOLTA O GRITO(i)
}
// Prints 0, 1, 3, 4
\`\`\`

## Ranges

\`\`\`xs
REPETE NA MORAL (CRIA i = 0; i <= 10; i += 2) {
  SOLTA O GRITO(i)
}
// 0, 2, 4, 6, 8, 10
\`\`\``,
    bodyHtml: `<h1>Loops</h1>
<h2>REPETE NA MORAL (For Loop)</h2>
<pre><code>REPETE NA MORAL (CRIA i = 0; i &lt; 5; i++) {
  SOLTA O GRITO("Iteracao " + i)
}</code></pre>
<h2>REPETE AI (While Loop)</h2>
<pre><code>CRIA contador = 0
REPETE AI (contador &lt; 3) {
  SOLTA O GRITO("Contagem: " + contador)
  contador++
}</code></pre>
<h2>Loop Control</h2>
<pre><code>PARE  // break
CONTINUA  // continue</code></pre>`,
    challenges: [
      {
        question: "What keyword starts a for loop in XanaScript?",
        answer: "REPETE NA MORAL",
        points: 3,
      },
      {
        question: "What keyword breaks out of a loop?",
        answer: "PARE",
        points: 3,
      },
      {
        question: "What keyword skips to the next loop iteration?",
        answer: "CONTINUA",
        points: 3,
      },
    ],
  },
  {
    slug: "pattern-matching",
    title: "Pattern Matching (COMBINA)",
    order: 9,
    points: 15,
    bodyMd: `# Pattern Matching — COMBINA

\`COMBINA\` is XanaScript's pattern matching construct, similar to switch/match in other languages but more powerful:

\`\`\`xs
CRIA fruta = "maca"

CRIA mensagem = COMBINA (fruta) {
  CASO "maca" => "Maca vermelha e doce"
  CASO "banana" => "Banana amarela e cremosa"
  CASO "laranja" => "Laranja rica em vitamina C"
  CASO _ => "Fruta desconhecida"
}

SOLTA O GRITO(mensagem)  // Maca vermelha e doce
\`\`\`

## Matching Numbers

\`\`\`xs
CRIA nota = 85

COMBINA (nota) {
  CASO 100 => SOLTA O GRITO("Perfeito!")
  CASO >= 90 => SOLTA O GRITO("Excelente!")
  CASO >= 80 => SOLTA O GRITO("Muito bom!")
  CASO >= 70 => SOLTA O GRITO("Bom")
  CASO _ => SOLTA O GRITO("Estude mais!")
}
\`\`\`

## Wildcard

The underscore \`_\` matches anything:

\`\`\`xs
COMBINA (valor) {
  CASO 0 => SOLTA O GRITO("Zero")
  CASO _ => SOLTA O GRITO("Nao e zero")
}
\`\`\``,
    bodyHtml: `<h1>Pattern Matching — COMBINA</h1>
<p><code>COMBINA</code> is XanaScript's pattern matching construct:</p>
<pre><code>CRIA mensagem = COMBINA (fruta) {
  CASO "maca" => "Maca vermelha e doce"
  CASO "banana" => "Banana amarela e cremosa"
  CASO _ => "Fruta desconhecida"
}</code></pre>
<h2>Matching Numbers</h2>
<pre><code>COMBINA (nota) {
  CASO 100 => SOLTA O GRITO("Perfeito!")
  CASO >= 90 => SOLTA O GRITO("Excelente!")
  CASO _ => SOLTA O GRITO("Estude mais!")
}</code></pre>
<h2>Wildcard</h2>
<p>The underscore <code>_</code> matches anything.</p>`,
    challenges: [
      {
        question: "What keyword starts pattern matching in XanaScript?",
        answer: "COMBINA",
        points: 3,
      },
      {
        question: "What character is used as a wildcard in COMBINA?",
        answer: "_",
        points: 3,
      },
    ],
  },
  {
    slug: "template-strings-regex",
    title: "Template Strings & Regex",
    order: 10,
    points: 10,
    bodyMd: `# Template Strings & Regex

## Template Strings

Template strings use backticks with \`${}\` interpolation:

\`\`\`xs
CRIA nome = "Ana"
CRIA idade = 30

SOLTA O GRITO(\`Ola, ${nome}! Voce tem ${idade} anos.\`)
// Ola, Ana! Voce tem 30 anos.
\`\`\`

## Multi-line Strings

\`\`\`xs
CRIA poema = \`Rosas sao vermelhas
Violetas sao azuis
XanaScript e incrivel
E tu tambem e!\`
\`\`\`

## Regex Matching

\`\`\`xs
CRIA texto = "hello world"
CRIA tem_hello = texto ~= "^h.*o$"
SOLTA O GRITO(tem_hello)  // VERDADEIRO

CRIA email = "user@example.com"
CRIA valido = email ~= "^[^@]+@[^@]+\.[^@]+$"
SOLTA O GRITO(valido)  // VERDADEIRO
\`\`\`

The \`~=\` operator tests if a string matches a regex pattern.`,
    bodyHtml: `<h1>Template Strings &amp; Regex</h1>
<h2>Template Strings</h2>
<pre><code>CRIA nome = "Ana"
CRIA idade = 30
SOLTA O GRITO(\`Ola, ${nome}! Voce tem ${idade} anos.\`)</code></pre>
<h2>Regex Matching</h2>
<p>Use the <code>~=</code> operator:</p>
<pre><code>CRIA tem_hello = texto ~= "^h.*o$"</code></pre>`,
    challenges: [
      {
        question: "What character starts and ends a template string?",
        answer: "`",
        points: 3,
      },
      {
        question: "What operator tests a string against a regex pattern?",
        answer: "~=",
        points: 3,
      },
    ],
  },
  {
    slug: "error-handling",
    title: "Error Handling (TENTA / PEGA)",
    order: 11,
    points: 15,
    bodyMd: `# Error Handling — TENTA / PEGA

\`TENTA\` / \`PEGA\` is XanaScript's try/catch:

\`\`\`xs
TENTA {
  CRIA resultado = 10 / 0
  SOLTA O GRITO("Resultado: " + resultado)
} PEGA (erro) {
  SOLTA O GRITO("Erro: " + erro)
}
\`\`\`

## Finally Block

Use \`FINALMENTE\` for cleanup code that runs regardless:

\`\`\`xs
TENTA {
  CRIA arquivo = abrir("dados.txt")
  // process file
} PEGA (erro) {
  SOLTA O GRITO("Falha: " + erro)
} FINALMENTE {
  SOLTA O GRITO("Sempre executa")
}
\`\`\`

## Throwing Errors

\`\`\`xs
CHAMA ESSE CARA dividir(a, b) {
  SE LIGA SO (b == 0) {
    JOGAR "Divisao por zero nao permitida"
  }
  VOLTA a / b
}

TENTA {
  CRISA r = dividir(10, 0)
} PEGA (e) {
  SOLTA O GRITO("Erro: " + e)
}
\`\`\`

\`JOGAR\` ("throw") raises an error that can be caught by \`PEGA\`.`,
    bodyHtml: `<h1>Error Handling — TENTA / PEGA</h1>
<pre><code>TENTA {
  CRIA resultado = 10 / 0
  SOLTA O GRITO("Resultado: " + resultado)
} PEGA (erro) {
  SOLTA O GRITO("Erro: " + erro)
}</code></pre>
<h2>Finally Block</h2>
<pre><code>FINALMENTE {
  SOLTA O GRITO("Sempre executa")
}</code></pre>
<h2>Throwing Errors</h2>
<p>Use <code>JOGAR</code> ("throw") to raise an error.</p>`,
    challenges: [
      {
        question: "What keyword starts a try block in XanaScript?",
        answer: "TENTA",
        points: 3,
      },
      {
        question: "What keyword throws an error?",
        answer: "JOGAR",
        points: 3,
      },
      {
        question: "What keyword runs code regardless of whether an error occurred?",
        answer: "FINALMENTE",
        points: 3,
      },
    ],
  },

  // ── Module 4: Object-Oriented Programming ─────────────────────────────
  {
    slug: "classes-objects",
    title: "Classes & Objects (CLASSE / NOVA)",
    order: 12,
    points: 15,
    bodyMd: `# Classes & Objects

## CLASSE — Defining a Class

\`\`\`xs
CLASSE Pessoa {
  CONSTRUTOR(nome, idade) {
    CRIA ISTO.nome = nome
    CRIA ISTO.idade = idade
  }

  METODO apresentar() {
    SOLTA O GRITO("Ola, eu sou " + ISTO.nome + " e tenho " + ISTO.idade + " anos.")
  }
}
\`\`\`

- \`CLASSE\` defines a class
- \`CONSTRUTOR\` is the constructor
- \`ISTO\` is \`this\`
- \`METODO\` defines a method

## NOVA — Creating Instances

\`\`\`xs
CRIA pessoa1 = NOVA Pessoa("Joao", 25)
CRIA pessoa2 = NOVA Pessoa("Maria", 30)

pessoa1.apresentar()  // Ola, eu sou Joao e tenho 25 anos.
pessoa2.apresentar()  // Ola, eu sou Maria e tenho 30 anos.
\`\`\`

## Properties

\`\`\`xs
CLASSE Produto {
  CONSTRUTOR(nome, preco) {
    CRIA ISTO.nome = nome
    CRIA ISTO.preco = preco
    CRIA ISTO.estoque = 0
  }

  METODO definirEstoque(qtd) {
    CRIA ISTO.estoque = qtd
  }
}
\`\`\``,
    bodyHtml: `<h1>Classes &amp; Objects</h1>
<h2>CLASSE — Defining a Class</h2>
<pre><code>CLASSE Pessoa {
  CONSTRUTOR(nome, idade) {
    CRIA ISTO.nome = nome
    CRIA ISTO.idade = idade
  }

  METODO apresentar() {
    SOLTA O GRITO("Ola, eu sou " + ISTO.nome + " e tenho " + ISTO.idade + " anos.")
  }
}</code></pre>
<h2>NOVA — Creating Instances</h2>
<pre><code>CRIA pessoa1 = NOVA Pessoa("Joao", 25)
CRIA pessoa2 = NOVA Pessoa("Maria", 30)</code></pre>
<p><code>ISTO</code> is the XanaScript equivalent of <code>this</code>.</p>`,
    challenges: [
      {
        question: "What keyword defines a class in XanaScript?",
        answer: "CLASSE",
        points: 3,
      },
      {
        question: "What keyword instantiates a new object?",
        answer: "NOVA",
        points: 3,
      },
      {
        question: "What is the XanaScript equivalent of 'this'?",
        answer: "ISTO",
        points: 3,
      },
    ],
  },
  {
    slug: "inheritance",
    title: "Inheritance (HERDA)",
    order: 13,
    points: 15,
    bodyMd: `# Inheritance — HERDA

\`HERDA\` ("inherits") extends a class:

\`\`\`xs
CLASSE Animal {
  CONSTRUTOR(nome) {
    CRIA ISTO.nome = nome
  }

  METODO fazerSom() {
    SOLTA O GRITO(ISTO.nome + " faz um som")
  }
}

CLASSE Cachorro HERDA Animal {
  METODO fazerSom() {
    SOLTA O GRITO(ISTO.nome + " diz: Au Au!")
  }

  METODO abanarRabo() {
    SOLTA O GRITO(ISTO.nome + " esta abanando o rabo!")
  }
}

CRIA rex = NOVA Cachorro("Rex")
rex.fazerSom()      // Rex diz: Au Au!
rex.abanarRabo()    // Rex esta abanando o rabo!
\`\`\`

## Method Override

Child classes can override parent methods. Use \`SUPER\` to call the parent:

\`\`\`xs
CLASSE Gato HERDA Animal {
  METODO fazerSom() {
    SUPER.fazerSom()  // call parent method
    SOLTA O GRITO(ISTO.nome + " diz: Miau!")
  }
}
\`\`\`

## SUPER

\`SUPER\` refers to the parent class instance.`,
    bodyHtml: `<h1>Inheritance — HERDA</h1>
<pre><code>CLASSE Cachorro HERDA Animal {
  METODO fazerSom() {
    SOLTA O GRITO(ISTO.nome + " diz: Au Au!")
  }
}</code></pre>
<p><code>HERDA</code> extends a class. <code>SUPER</code> refers to the parent class.</p>`,
    challenges: [
      {
        question: "What keyword is used for class inheritance?",
        answer: "HERDA",
        points: 3,
      },
      {
        question: "What keyword refers to the parent class?",
        answer: "SUPER",
        points: 3,
      },
    ],
  },
  {
    slug: "getters-setters-static",
    title: "Getters, Setters & Static",
    order: 14,
    points: 10,
    bodyMd: `# Getters, Setters & Static

## GET / SET

\`\`\`xs
CLASSE Temperatura {
  CONSTRUTOR(celsius) {
    CRIA ISTO._celsius = celsius
  }

  GET fahrenheit() {
    VOLTA ISTO._celsius * 9/5 + 32
  }

  SET fahrenheit(valor) {
    CRIA ISTO._celsius = (valor - 32) * 5/9
  }
}

CRIA temp = NOVA Temperatura(25)
SOLTA O GRITO(temp.fahrenheit)  // 77
temp.fahrenheit = 86
// celsius is now 30
\`\`\`

## Static Methods

\`\`\`xs
CLASSE Matematica {
  METODO ESTATICO quadrado(x) {
    VOLTA x * x
  }

  METODO ESTATICO cubo(x) {
    VOLTA x * x * x
  }
}

SOLTA O GRITO(Matematica.quadrado(5))  // 25
SOLTA O GRITO(Matematica.cubo(3))      // 27
\`\`\`

\`METODO ESTATICO\` defines a static method called on the class itself.`,
    bodyHtml: `<h1>Getters, Setters &amp; Static</h1>
<h2>GET / SET</h2>
<pre><code>GET fahrenheit() { ... }
SET fahrenheit(valor) { ... }</code></pre>
<h2>Static Methods</h2>
<p>Use <code>METODO ESTATICO</code> for methods called on the class itself.</p>`,
    challenges: [
      {
        question: "What keyword pair creates computed properties in XanaScript?",
        answer: "GET SET",
        points: 3,
      },
      {
        question: "What keyword defines a static method?",
        answer: "METODO ESTATICO",
        points: 3,
      },
    ],
  },

  // ── Module 5: Built-in Features ──────────────────────────────────────
  {
    slug: "built-in-orm",
    title: "Built-in ORM (TABELA)",
    order: 15,
    points: 20,
    bodyMd: `# Built-in ORM — TABELA

\`TABELA\` is a first-class syntax construct for database CRUD operations:

\`\`\`xs
TABELA Product {
  name: TEXTO,
  price: NUMERO,
  stock: NUMERO
}

CRIA repo = Product

// Create
repo.create({ name: "Keyboard", price: 250, stock: 10 })
repo.create({ name: "Mouse", price: 120, stock: 25 })

// List all
SOLTA O GRITO("All:", repo.list())

// Find by ID
SOLTA O GRITO("Product 1:", repo.find(1))

// Find with filter
CRIA expensive = repo.findWhere({ price: { $gte: 200 } })
SOLTA O GRITO("Expensive:", expensive)

// Update
repo.update(1, { price: 200 })

// Delete
repo.delete(2)
\`\`\`

## Supported Types

| Type | Description |
|------|-------------|
| \`TEXTO\` | String |
| \`NUMERO\` | Number |
| \`BOOLEANO\` | Boolean |
| \`DATA\` | Date (ISO string) |
| \`QUALQUER\` | Any type |

## Filter Operators

- \`$eq\`, \`$ne\` — equal / not equal
- \`$gt\`, \`$gte\` — greater than / greater or equal
- \`$lt\`, \`$lte\` — less than / less or equal
- \`$in\` — match any in array

Each record gets auto-generated \`_id\`, \`_criado\`, and \`_atualizado\` fields.`,
    bodyHtml: `<h1>Built-in ORM — TABELA</h1>
<pre><code>TABELA Product {
  name: TEXTO,
  price: NUMERO,
  stock: NUMERO
}

CRIA repo = Product

repo.create({ name: "Keyboard", price: 250, stock: 10 })
repo.create({ name: "Mouse", price: 120, stock: 25 })

SOLTA O GRITO("All:", repo.list())
SOLTA O GRITO("Product 1:", repo.find(1))

CRIA expensive = repo.findWhere({ price: { $gte: 200 } })

repo.update(1, { price: 200 })
repo.delete(2)</code></pre>
<h2>Filter Operators</h2>
<p><code>$eq</code>, <code>$ne</code>, <code>$gt</code>, <code>$gte</code>, <code>$lt</code>, <code>$lte</code>, <code>$in</code></p>`,
    challenges: [
      {
        question: "What keyword creates a table/collection in XanaScript?",
        answer: "TABELA",
        points: 3,
      },
      {
        question: "What operator filters values greater than or equal to a number?",
        answer: "$gte",
        points: 3,
      },
      {
        question: "What method finds records matching a filter condition?",
        answer: "findWhere",
        points: 5,
      },
    ],
  },
  {
    slug: "http-server",
    title: "HTTP Server",
    order: 16,
    points: 15,
    bodyMd: `# Built-in HTTP Server

XanaScript has a built-in HTTP server:

\`\`\`xs
CHAMA ESSE CARA handler(req, res) {
  SE LIGA SO (req.url == "/") {
    res.json({ message: "Hello from XanaScript!" })
  } SENAO SE (req.url == "/api/data") {
    res.json({ items: [1, 2, 3], total: 3 })
  } SENAO {
    res.status(404).json({ error: "Not found" })
  }
}

CRIA SERVIDOR(3000, handler)
SOLTA O GRITO("Server running on :3000")
\`\`\`

## Request Properties

- \`req.url\` — request URL
- \`req.method\` — HTTP method (GET, POST, etc.)
- \`req.headers\` — request headers
- \`req.body\` — parsed request body

## Response Methods

- \`res.json(data)\` — send JSON response
- \`res.send(text)\` — send text response
- \`res.status(code)\` — set HTTP status code
- \`res.setHeader(name, value)\` — set response headers`,
    bodyHtml: `<h1>Built-in HTTP Server</h1>
<pre><code>CHAMA ESSE CARA handler(req, res) {
  SE LIGA SO (req.url == "/") {
    res.json({ message: "Hello from XanaScript!" })
  } SENAO {
    res.status(404).json({ error: "Not found" })
  }
}

CRIA SERVIDOR(3000, handler)</code></pre>
<p><code>CRIA SERVIDOR</code> starts the HTTP server. <code>res.json()</code>, <code>res.send()</code>, <code>res.status()</code> handle responses.</p>`,
    challenges: [
      {
        question: "What command starts an HTTP server in XanaScript?",
        answer: "CRIA SERVIDOR",
        points: 3,
      },
      {
        question: "What method sends a JSON response?",
        answer: "res.json",
        points: 3,
      },
    ],
  },
  {
    slug: "cli-tools",
    title: "CLI Tools",
    order: 17,
    points: 10,
    bodyMd: `# CLI Tools

XanaScript makes it easy to build command-line tools:

\`\`\`xs
CRIA args = OUVE_TUDO()
CRIA cmd = args[2] ?? "help"

SE LIGA SO (cmd == "hello") {
  CRIA name = args[3] ?? "world"
  SOLTA O GRITO("Hello, " + name + "!")
} SENAO SE (cmd == "sum") {
  CRIA a = NUMERO(args[3] ?? 0)
  CRIA b = NUMERO(args[4] ?? 0)
  SOLTA O GRITO("Sum: " + (a + b))
} SENAO {
  SOLTA O GRITO("Usage: xs run cli.xs <command>")
  SOLTA O GRITO("Commands: hello, sum")
}
\`\`\`

## Key Functions

- \`OUVE_TUDO()\` — get all command-line arguments
- \`NUMERO(valor)\` — convert to number
- \`TEXTO(valor)\` — convert to string
- \`??\` — nullish coalescing operator

Run with: \`\`\`bash xs run cli.xs hello Maria\`\`\``,
    bodyHtml: `<h1>CLI Tools</h1>
<pre><code>CRIA args = OUVE_TUDO()
CRIA cmd = args[2] ?? "help"

SE LIGA SO (cmd == "hello") {
  SOLTA O GRITO("Hello, " + name + "!")
} SENAO SE (cmd == "sum") {
  CRIA a = NUMERO(args[3] ?? 0)
  CRIA b = NUMERO(args[4] ?? 0)
  SOLTA O GRITO("Sum: " + (a + b))
}</code></pre>
<p><code>OUVE_TUDO()</code> gets CLI arguments. <code>??</code> is the nullish coalescing operator.</p>`,
    challenges: [
      {
        question: "What function gets all command-line arguments in XanaScript?",
        answer: "OUVE_TUDO",
        points: 3,
      },
      {
        question: "What operator provides default values for null/undefined?",
        answer: "??",
        points: 3,
      },
    ],
  },

  // ── Module 6: Professional Development ──────────────────────────────
  {
    slug: "test-runner",
    title: "Test Runner (TESTE / AFIRMA)",
    order: 18,
    points: 15,
    bodyMd: `# Test Runner — TESTE / AFIRMA

XanaScript has a native test runner with first-class \`TESTE\` and \`AFIRMA\` keywords:

\`\`\`xs
TESTE "sum of two numbers" {
  CRIA r = 2 + 3
  AFIRMA(r == 5)
  ASSUNTO(r, 5)
}

TESTE "multiplication" {
  CRIA r = 3 * 4
  ASSUNTO(r, 12)
}

TESTE "string concatenation" {
  CRIA resultado = "Ola" + " " + "Mundo"
  ASSUNTO(resultado, "Ola Mundo")
}
\`\`\`

## Assertion Functions

- \`AFIRMA(condicao)\` — assert condition is true
- \`ASSUNTO(actual, expected)\` — assert equality

## Running Tests

\`\`\`bash
xs test .
\`\`\`

Auto-discovers \`*.test.xs\` files. Outputs TAP-compatible results:

\`\`\`
  PASS  sum of two numbers (2ms)
  PASS  multiplication (1ms)
  PASS  string concatenation (0ms)

  Tests: 3 passed, 3 total
\`\`\`

Use \`xs test --watch\` to re-run on file changes.`,
    bodyHtml: `<h1>Test Runner — TESTE / AFIRMA</h1>
<pre><code>TESTE "sum of two numbers" {
  CRIA r = 2 + 3
  AFIRMA(r == 5)
  ASSUNTO(r, 5)
}</code></pre>
<p><code>xs test .</code> discovers and runs all <code>*.test.xs</code> files.</p>`,
    challenges: [
      {
        question: "What keyword defines a test block?",
        answer: "TESTE",
        points: 3,
      },
      {
        question: "What keyword asserts a condition is true?",
        answer: "AFIRMA",
        points: 3,
      },
      {
        question: "What command runs all tests in the current directory?",
        answer: "xs test .",
        points: 5,
      },
    ],
  },
  {
    slug: "compile-time-macros",
    title: "Compile-Time Macros (MACRO)",
    order: 19,
    points: 15,
    bodyMd: `# Compile-Time Macros — MACRO

\`MACRO\` defines compile-time substitutions that are expanded before code generation:

\`\`\`xs
MACRO square(x) { x * x }
MACRO cube(x) { x * square(x) }
MACRO max(a, b) {
  SE LIGA SO (a > b) { a } SENAO { b }
}

CRIA r1 = square(5)       // expands to: 5 * 5
CRIA r2 = cube(3)         // expands to: 3 * 3 * 3
CRIA r3 = max(10, 20)     // expands to if/else
CRIA r4 = max(square(4), cube(2))  // nested expansion
\`\`\`

## How Macros Work

1. Macros are parsed into \`MacroDef\` AST nodes
2. During optimization, the expander walks the AST
3. Each \`CallExpr\` matching a macro name is replaced with the macro body
4. Parameters are substituted with argument expressions
5. Macro bodies are recursively expanded (max depth: 64)

## Benefits

- **Zero runtime cost** — macros are fully expanded at compile time
- **No precedence bugs** — operates on AST, not text
- **Recursive** — macros can call other macros`,
    bodyHtml: `<h1>Compile-Time Macros — MACRO</h1>
<pre><code>MACRO square(x) { x * x }
MACRO max(a, b) {
  SE LIGA SO (a > b) { a } SENAO { b }
}

CRIA r1 = square(5)   // expands to 5 * 5
CRIA r3 = max(10, 20) // expands to if/else</code></pre>
<p>Macros are expanded at compile time with zero runtime cost.</p>`,
    challenges: [
      {
        question: "What keyword defines a compile-time macro?",
        answer: "MACRO",
        points: 3,
      },
      {
        question: "What is the maximum recursion depth for macro expansion?",
        answer: "64",
        points: 3,
      },
    ],
  },
  {
    slug: "async-await",
    title: "Async/Await (AGORA VAI / ESPERA AI)",
    order: 20,
    points: 15,
    bodyMd: `# Async/Await — AGORA VAI / ESPERA AI

\`AGORA VAI\` ("go now") creates a Promise. \`ESPERA AI\` ("wait a sec") awaits it:

\`\`\`xs
// Async function
CHAMA ESSE CARA buscarDados() {
  CRIA resposta = ESPERA AI AGORA VAI("https://api.example.com/users")
  CRIA dados = resposta.json()
  VOLTA dados
}

// Arrow function async
CRIA fetchUser = ASSINCRONO (id) => {
  CRIA resposta = ESPERA AI AGORA VAI("https://api.example.com/users/" + id)
  VOLTA resposta.json()
}
\`\`\`

## Calling Async Functions

\`\`\`xs
CHAMA ESSE CARA main() {
  CRIA users = ESPERA AI buscarDados()
  SOLTA O GRITO("Users:", users)
}

ESPERA AI main()
\`\`\`

## Error Handling with Async

\`\`\`xs
CHAMA ESSE CARA buscarComTratamento() {
  TENTA {
    CRIA resposta = ESPERA AI AGORA VAI("https://api.example.com/data")
    VOLTA resposta.json()
  } PEGA (erro) {
    SOLTA O GRITO("Erro ao buscar: " + erro)
    VOLTA null
  }
}
\`\`\`

- \`AGORA VAI\` — fetch/start async operation
- \`ESPERA AI\` — await the result
- \`ASSINCRONO\` — declare an async arrow function`,
    bodyHtml: `<h1>Async/Await — AGORA VAI / ESPERA AI</h1>
<pre><code>CHAMA ESSE CARA buscarDados() {
  CRIA resposta = ESPERA AI AGORA VAI("https://api.example.com/users")
  VOLTA resposta.json()
}</code></pre>
<p><code>AGORA VAI</code> starts an async operation. <code>ESPERA AI</code> awaits it.</p>`,
    challenges: [
      {
        question: "What keyword starts an async fetch operation?",
        answer: "AGORA VAI",
        points: 3,
      },
      {
        question: "What keyword awaits the result of an async operation?",
        answer: "ESPERA AI",
        points: 3,
      },
      {
        question: "What keyword declares an async arrow function?",
        answer: "ASSINCRONO",
        points: 3,
      },
    ],
  },
  {
    slug: "package-manager",
    title: "Package Manager",
    order: 21,
    points: 10,
    bodyMd: `# Package Manager

XanaScript has a built-in package manager:

## Installing Packages

\`\`\`bash
xs install nome-do-pacote
xs install nome@1.2.3  # specific version
\`\`\`

## Publishing Packages

\`\`\`bash
# Login first
xs login

# Publish
xs publish

# Publish with specific files
xs publish --files "src/**/*.xs"
\`\`\`

## What Gets Published

When you publish a package, the CLI:
1. Reads \`package.xs\` (package manifest)
2. Collects source files
3. Uploads to the registry
4. Waits for admin approval

## Package Manifest (\`package.xs\`)

\`\`\`xs
{
  name: "my-package",
  version: "1.0.0",
  description: "My XanaScript package",
  main: "src/index.xs",
  license: "MIT",
  keywords: ["util", "string"]
}
\`\`\`

## Search Packages

\`\`\`bash
xs search keyword
\`\`\`

Or browse the registry at [xanascript.xyz/packages](https://xanascript.xyz/packages).`,
    bodyHtml: `<h1>Package Manager</h1>
<h2>Installing</h2>
<pre><code>xs install nome-do-pacote</code></pre>
<h2>Publishing</h2>
<pre><code>xs login
xs publish</code></pre>
<p>Package metadata is read from <code>package.xs</code>.</p>`,
    challenges: [
      {
        question: "What command installs a XanaScript package?",
        answer: "xs install",
        points: 3,
      },
      {
        question: "What file contains package metadata?",
        answer: "package.xs",
        points: 3,
      },
    ],
  },
  {
    slug: "lsp-vscode",
    title: "LSP & VS Code Integration",
    order: 22,
    points: 10,
    bodyMd: `# LSP & VS Code Integration

## Language Server Protocol

XanaScript includes a built-in LSP server:

\`\`\`bash
xs lsp
\`\`\`

Capabilities:
- **Completions** — keyword, built-in, and identifier suggestions
- **Hover** — documentation for built-in functions
- **Go to Definition** — navigate to variable/function declarations
- **Diagnostics** — real-time error reporting
- **Formatting** — automatic code formatting

## VS Code Extension

Install \`vscode-xs\` from the marketplace:

- Syntax highlighting (TextMate grammar)
- 18 code snippets
- LSP client integration
- Commands: Run, Build, Test, Format

## Neovim Setup

\`\`\`lua
vim.api.nvim_create_autocmd("FileType", {
  pattern = "xs",
  callback = function()
    vim.lsp.start({
      name = "xanascript",
      cmd = { "xs", "lsp" },
    })
  end,
})
\`\`\`

The LSP is stateless — each request re-parses the document from scratch.`,
    bodyHtml: `<h1>LSP &amp; VS Code Integration</h1>
<pre><code>xs lsp</code></pre>
<p>The LSP supports completions, hover, go-to-definition, diagnostics, and formatting.</p>
<p>Install <code>vscode-xs</code> from the VS Code marketplace for full IDE support.</p>`,
    challenges: [
      {
        question: "What command starts the LSP server?",
        answer: "xs lsp",
        points: 3,
      },
      {
        question: "Is the LSP server stateful or stateless?",
        answer: "stateless",
        points: 3,
      },
    ],
  },
  {
    slug: "webassembly",
    title: "WebAssembly (Wasm)",
    order: 23,
    points: 15,
    bodyMd: `# WebAssembly

XanaScript can compile directly to WebAssembly — no Emscripten or LLVM needed:

\`\`\`bash
xs build --wasm math.xs
\`\`\`

## Example

\`\`\`xs
CHAMA ESSE CARA sum(a, b) {
  VOLTA a + b
}

CHAMA ESSE CARA main() {
  VOLTA sum(10, 20)
}
\`\`\`

Build with: \`\`\`bash xs build --wasm math.xs\`\`\`

## How It Works

The Wasm binary is emitted byte-by-byte by \`wasm_binary.js\`:

1. **Magic number** \`00 61 73 6d\` + version \`01 00 00 00\`
2. **Type Section** — function signatures (i32, f64)
3. **Function Section** — type index mapping
4. **Code Section** — function bodies with local declarations
5. **Export Section** — named exports
6. **Data Section** — initial memory contents

## Value Types

- \`i32\` — 32-bit integers
- \`f64\` — 64-bit floats

## Memory

Uses a bundled bump allocator with \`memory.grow\` + pointer arithmetic. Strings are stored as (length, data) pairs.`,
    bodyHtml: `<h1>WebAssembly</h1>
<pre><code>xs build --wasm math.xs</code></pre>
<p>Direct <code>.wasm</code> binary emission — no Emscripten, no wabt.js, no LLVM.</p>
<h2>How It Works</h2>
<p>The emitter writes Wasm sections byte-by-byte: Type, Function, Code, Export, Data. Uses LEB128 encoding. Supports i32 and f64 value types.</p>`,
    challenges: [
      {
        question: "What flag compiles XanaScript to WebAssembly?",
        answer: "--wasm",
        points: 3,
      },
      {
        question: "What are the two value types supported in Wasm mode?",
        answer: "i32 f64",
        points: 5,
      },
    ],
  },
  {
    slug: "task-runner",
    title: "Task Runner (TAREFA)",
    order: 24,
    points: 10,
    bodyMd: `# Task Runner — TAREFA

XanaScript has a built-in task runner for automation:

\`\`\`xs
// In tarefas.xs
TAREFA build {
  SOLTA O GRITO("Building...")
  // compile steps
}

TAREFA test {
  SOLTA O GRITO("Running tests...")
}

TAREFA clean {
  SOLTA O GRITO("Cleaning...")
}

TAREFA all {
  TAREFA build
  TAREFA test
}
\`\`\`

## Running Tasks

\`\`\`bash
# Run a specific task
xs build

# Run default task
xs
\`\`\`

## Task Dependencies

Tasks can call other tasks, enabling dependency chains:

\`\`\`xs
TAREFA deploy {
  TAREFA build
  TAREFA test
  SOLTA O GRITO("Deploying...")
}
\`\`\`

Place tasks in \`tarefas.xs\` (the default task file) or any \`.xs\` file.`,
    bodyHtml: `<h1>Task Runner — TAREFA</h1>
<pre><code>TAREFA build {
  SOLTA O GRITO("Building...")
}

TAREFA deploy {
  TAREFA build
  SOLTA O GRITO("Deploying...")
}</code></pre>
<p>Run with <code>xs build</code> or <code>xs deploy</code>. Tasks go in <code>tarefas.xs</code>.</p>`,
    challenges: [
      {
        question: "What keyword defines a task?",
        answer: "TAREFA",
        points: 3,
      },
      {
        question: "What is the default task file name?",
        answer: "tarefas.xs",
        points: 3,
      },
    ],
  },
  {
    slug: "optimizer-benchmarks",
    title: "Optimizer & Performance",
    order: 25,
    points: 10,
    bodyMd: `# Optimizer & Performance

XanaScript's multi-pass optimizer runs before code generation:

## Optimization Passes

### Constant Folding

Pre-computes expressions at compile time:

\`\`\`xs
CRIA x = 2 + 3 * 5   // folded to CRIA x = 17
\`\`\`

### Loop Unrolling

Unrolls fixed-range loops (up to 8 iterations):

\`\`\`xs
// Before optimization:
REPETE NA MORAL (CRIA i = 0; i < 4; i++) {
  SOLTA O GRITO(i)
}

// After optimization (unrolled):
SOLTA O GRITO(0)
SOLTA O GRITO(1)
SOLTA O GRITO(2)
SOLTA O GRITO(3)
\`\`\`

### Integer Hinting

Annotates variables that are always integers for TypedArray optimization.

### Function Inlining

Inlines single-call-site functions under 15 AST nodes.

## Benchmarks

| Task | XanaScript | JavaScript | Python |
|------|-----------|------------|--------|
| Fibonacci (n=40) | 0.8s | 1.2s | 18.5s |
| Loop 10M iterations | 0.15s | 0.18s | 3.2s |
| Array sort 100k | 0.22s | 0.25s | 1.8s |
| HTTP req/s | 45,000 | 38,000 | 8,500 |
| Startup time | 0.02s | 0.08s | 0.35s |
| Binary size | 8 MB | 42 MB | 28 MB |
| Memory (idle) | 6 MB | 28 MB | 18 MB |`,
    bodyHtml: `<h1>Optimizer &amp; Performance</h1>
<h2>Optimization Passes</h2>
<ul>
<li><strong>Constant Folding</strong> — pre-computes expressions</li>
<li><strong>Loop Unrolling</strong> — up to 8 iterations</li>
<li><strong>Integer Hinting</strong> — TypedArray optimization</li>
<li><strong>Function Inlining</strong> — small single-use functions</li>
</ul>`,
    challenges: [
      {
        question: "How many optimization passes does XanaScript have?",
        answer: "4",
        points: 3,
      },
      {
        question: "What optimization replaces loop bodies with repeated code?",
        answer: "loop unrolling",
        points: 3,
      },
    ],
  },
  {
    slug: "rust-style-errors",
    title: "Rust-Style Error Messages",
    order: 26,
    points: 10,
    bodyMd: `# Rust-Style Error Messages

XanaScript features detailed error messages inspired by Rust's compiler:

\`\`\`xs
CRIA x = 10
CRIA y = z  // Error: z is not defined
\`\`\`

## Error Output

\`\`\`
ERROR: Variable 'z' was not defined
Code: E002

 --> input.xs:2:11

  1 | CRIA x = 10
> 2 | CRIA y = z
    |          ^

Hint: Forgot to declare "z" with CRIA?
Help: Add \`CRIA z = value\` before using it
\`\`\`

## Error Components

- **Error code** — unique identifier (E001, E002, etc.)
- **Location** — file:line:column with source annotation
- **Hint** — common cause suggestion
- **Help** — specific fix recommendation

## Error Recovery

The parser implements panic-mode recovery: on error, it skips to the next statement boundary and continues, reporting multiple errors in a single run.`,
    bodyHtml: `<h1>Rust-Style Error Messages</h1>
<pre><code>ERROR: Variable 'z' was not defined
Code: E002

 --> input.xs:2:11

  1 | CRIA x = 10
> 2 | CRIA y = z
    |          ^

Hint: Forgot to declare "z" with CRIA?
Help: Add \`CRIA z = value\` before using it</code></pre>
<p>Errors include code, location, hint, and help — inspired by Rust's compiler.</p>`,
    challenges: [
      {
        question: "What is the error code for an undefined variable?",
        answer: "E002",
        points: 3,
      },
      {
        question: "What error recovery strategy does the parser use?",
        answer: "panic-mode",
        points: 3,
      },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Remove existing course with same slug
    await Course.deleteOne({ slug: "complete-xanascript" });

    const course = await Course.create({
      title: "Complete XanaScript Mastery",
      slug: "complete-xanascript",
      description: "Aprenda XanaScript do zero ao avancado. 26 aulas cobrindo cada aspecto da linguagem — sintaxe, orientacao a objetos, ORM, WebAssembly, testes, macros, e muito mais.",
      image: "",
      category: "Programming",
      level: "beginner",
      duration: "8h",
      published: true,
      lessons,
    });

    console.log(`Course created: ${course.title}`);
    console.log(`Lessons: ${course.lessons.length}`);
    console.log(`Total points: ${course.totalPoints}`);
    console.log(`Course ID: ${course._id}`);

    await mongoose.disconnect();
    console.log("Done!");
  } catch (e) {
    console.error("Seed failed:", e);
    process.exit(1);
  }
}

seed();
