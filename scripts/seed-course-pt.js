import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";


const lessons = [
{
    slug: "o-que-e-xanascript",
    title: "O que e XanaScript?",
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

Code should read like it's written for humans. Every construct in XanaScript uses clear, intuitive Portuguese keywords so the intent is obvious at a glance.`,
    challenges: [
      { question: "What type of tokens are multi-word keywords like SE LIGA SO treated as?", answer: "atomic", points: 3 },
      { question: "Does XanaScript use a transpiler approach or a native compiler?", answer: "native compiler", points: 3 },
      { question: "What is the philosophy behind XanaScript?", answer: "code should read like it is written for humans", points: 5 },
    ],,
{
    slug: "instalacao-e-configuracao",
    title: "Instalacao & Configuracao",
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

## VS Code Extension

Install \`vscode-xs\` from the marketplace for syntax highlighting, snippets, and LSP integration.`,
    challenges: [
      { question: "What is the npm command to install XanaScript globally?", answer: "npm install -g xanascript", points: 3 },
      { question: "What command verifies XanaScript is installed?", answer: "xs --version", points: 3 },
      { question: "What VS Code extension provides XanaScript support?", answer: "vscode-xs", points: 3 },
    ],,
{
    slug: "seu-primeiro-programa",
    title: "Seu Primeiro Programa",
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
    challenges: [
      { question: "What keyword declares a variable in XanaScript?", answer: "CRIA", points: 3 },
      { question: "What function prints output to the console?", answer: "SOLTA O GRITO", points: 3 },
      { question: "What command runs a .xs file?", answer: "xs run", points: 3 },
    ],,
{
    slug: "variaveis-com-cria",
    title: "Variaveis com CRIA",
    order: 4,
    points: 10,
    bodyMd: `# Variables with CRIA

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

## Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive: \`nome\` != \`Nome\`
- Keywords cannot be used as variable names

## Scope

\`CRIA\` is block-scoped. Variables declared inside a block are not accessible outside.`,
    challenges: [
      { question: "What keyword declares a mutable variable?", answer: "CRIA", points: 3 },
      { question: "Can a CRIA variable be reassigned?", answer: "yes", points: 3 },
      { question: "Are CRIA variables block-scoped or function-scoped?", answer: "block-scoped", points: 5 },
    ],,
{
    slug: "constantes-com-constante",
    title: "Constantes com CONSTANTE",
    order: 5,
    points: 10,
    bodyMd: `# Constants with CONSTANTE

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

## When to Use

- Values that should never change (mathematical constants, configuration)
- API endpoints, environment names
- Any binding to protect from accidental mutation

## CRIA vs CONSTANTE

| Aspect | CRIA | CONSTANTE |
|--------|------|-----------|
| Mutable | Yes | No |
| Reassign | Allowed | Forbidden |

## Best Practice

Always prefer \`CONSTANTE\` by default. Only use \`CRIA\` when the value needs to change.`,
    challenges: [
      { question: "What keyword creates an immutable variable?", answer: "CONSTANTE", points: 3 },
      { question: "Can a CONSTANTE be reassigned?", answer: "no", points: 3 },
      { question: "Which should you prefer by default: CRIA or CONSTANTE?", answer: "CONSTANTE", points: 5 },
    ],,
{
    slug: "comentarios",
    title: "Comentarios",
    order: 6,
    points: 5,
    bodyMd: `# Comments

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
 * Useful for documentation headers
 */
CRIA y = 20
\`\`\`

## Documentation Comments

Use multi-line comments for function documentation explaining what the function does. Good comments explain "why", not "what".`,
    challenges: [
      { question: "What symbol starts a single-line comment in XanaScript?", answer: "//", points: 3 },
      { question: "What delimiters wrap a multi-line comment?", answer: "/* */", points: 3 },
    ],,
{
    slug: "tipos-de-dados",
    title: "Tipos de Dados",
    order: 7,
    points: 10,
    bodyMd: `# Data Types

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
\`\`\`

Each type serves a specific purpose. Type inference handles them automatically.`,
    challenges: [
      { question: "How many built-in data types does XanaScript have?", answer: "5", points: 3 },
      { question: "What is the keyword for boolean true?", answer: "VERDADEIRO", points: 3 },
      { question: "What type allows any value to be assigned?", answer: "QUALQUER", points: 3 },
    ],,
{
    slug: "inferencia-de-tipos",
    title: "Inferencia de Tipos",
    order: 8,
    points: 10,
    bodyMd: `# Type Inference

XanaScript automatically detects the type of a variable based on its value.

## How Inference Works

\`\`\`xs
CRIA texto = "Ola"            // inferred as TEXTO
CRIA numero = 42              // inferred as NUMERO
CRIA booleano = VERDADEIRO    // inferred as BOOLEANO
CRIA data = DATA("2026-01-01") // inferred as DATA
CRIA qualquer = null          // inferred as QUALQUER
\`\`\`

## Strict Types

Once a variable is inferred as a specific type, reassignment must match:

\`\`\`xs
CRIA nome = "Ana"      // TEXTO
// nome = 42           // Error! Cannot assign NUMERO to TEXTO
\`\`\`

## QUALQUER allows changes

With QUALQUER, the type can change at runtime.

## Optional Annotations

For clarity, you can annotate types: \`CRIA nome: TEXTO = "Joao"\`.`,
    challenges: [
      { question: "What type is inferred for \"CRIA x = 42\"?", answer: "NUMERO", points: 3 },
      { question: "Can you assign a NUMERO to a TEXTO variable?", answer: "no", points: 3 },
      { question: "What type allows dynamic changes?", answer: "QUALQUER", points: 5 },
    ],,
{
    slug: "strings-em-detalhes",
    title: "Strings em Detalhes",
    order: 9,
    points: 10,
    bodyMd: `# Strings in Depth

Strings (\`TEXTO\`) are UTF-8 encoded.

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

## String Methods

\`\`\`xs
CRIA texto = "  XanaScript e Incrivel!  "
tamanho(texto)    // length
maiusculo(texto)  // uppercase
minusculo(texto)  // lowercase
aparado(texto)    // trim
substituir(texto, "e", "eh")  // replace
\`\`\`

## Interpolation

Use \`+\` to interpolate values into strings. Strings in XanaScript are immutable — methods return new strings.`,
    challenges: [
      { question: "What operator concatenates strings?", answer: "+", points: 3 },
      { question: "What method returns string length?", answer: "tamanho", points: 3 },
      { question: "What method converts a string to uppercase?", answer: "maiusculo", points: 3 },
    ],,
{
    slug: "numeros-em-detalhes",
    title: "Numeros em Detalhes",
    order: 10,
    points: 10,
    bodyMd: `# Numbers in Depth

Numbers (\`NUMERO\`) cover both integers and floating-point. Values are 64-bit floats (IEEE 754).

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
+   -   *   /   %   **
\`\`\`

## Increment / Decrement

\`\`\`xs
CRIA c = 0
c++  // 1
c--  // 0
\`\`\`

## Compound Assignment

\`\`\`xs
x += 5   // x = x + 5
x -= 3   // x = x - 3
x *= 2   // x = x * 2
x /= 4   // x = x / 4
\`\`\``,
    challenges: [
      { question: "What operator computes the remainder of division?", answer: "%", points: 3 },
      { question: "What is the exponentiation operator?", answer: "**", points: 3 },
      { question: "What does x += 5 do?", answer: "adds 5 to x", points: 3 },
    ],,
{
    slug: "booleanos",
    title: "Booleanos",
    order: 11,
    points: 5,
    bodyMd: `# Booleans

Booleans (\`BOOLEANO\`) represent truth values: \`VERDADEIRO\` (true) and \`FALSO\` (false).

## Logical Operators

Portuguese words for logical operations:

\`\`\`xs
CRIA e = a E b     // AND
CRIA ou = a OU b   // OR
CRIA nao = NAO a   // NOT
\`\`\`

## Comparison Operators

\`\`\`xs
==   !=   >   <   >=   <=
\`\`\`

## Truthy and Falsy

Falsy values: \`FALSO\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Everything else is truthy.

\`\`\`xs
SE LIGA SO ("") {
  // won't execute
} SENAO {
  SOLTA O GRITO("Falsy!")
}
\`\`\``,
    challenges: [
      { question: "What is the keyword for boolean true?", answer: "VERDADEIRO", points: 3 },
      { question: "What keyword represents logical AND?", answer: "E", points: 3 },
      { question: "What keyword represents logical NOT?", answer: "NAO", points: 3 },
    ],,
{
    slug: "nulo-e-indefinido",
    title: "Nulo e Indefinido",
    order: 12,
    points: 5,
    bodyMd: `# Null and Undefined

Two special values for "no value".

## Null

\`null\` represents an intentional absence of value:

\`\`\`xs
CRIA resultado = null
SE LIGA SO (resultado == null) {
  SOLTA O GRITO("Vazio")
}
\`\`\`

## Undefined

\`undefined\` means a variable has no assigned value:

\`\`\`xs
CRIA x  // undefined
\`\`\`

## Nullish Coalescing

\`??\` provides a default when value is null or undefined:

\`\`\`xs
CRIA nome = usuario ?? "Convidado"
\`\`\`

| Value | Meaning |
|-------|---------|
| null | Intentional empty |
| undefined | Uninitialized |`,
    challenges: [
      { question: "What value represents an intentional empty value?", answer: "null", points: 3 },
      { question: "What operator provides a default for null/undefined?", answer: "??", points: 3 },
      { question: "Difference between null and undefined?", answer: "null is intentional, undefined is uninitialized", points: 5 },
    ],,
{
    slug: "conversao-de-tipos",
    title: "Conversao de Tipos",
    order: 13,
    points: 10,
    bodyMd: `# Type Conversion

Built-in functions for converting between types.

## To Number

\`\`\`xs
CRIA n = NUMERO("42")      // 42
CRIA pi = NUMERO("3.14")   // 3.14
CRIA falha = NUMERO("x")   // 0 on failure
\`\`\`

## To String

\`\`\`xs
CRIA s = TEXTO(42)             // "42"
CRIA b = TEXTO(VERDADEIRO)     // "VERDADEIRO"
\`\`\`

## To Boolean

\`\`\`xs
CRIA b1 = BOOLEANO("texto")   // VERDADEIRO
CRIA b2 = BOOLEANO("")        // FALSO
CRIA b3 = BOOLEANO(42)        // VERDADEIRO
CRIA b4 = BOOLEANO(0)         // FALSO
\`\`\`

## Implicit Conversion

Numeric strings are implicitly converted in arithmetic contexts.`,
    challenges: [
      { question: "What function converts a value to a number?", answer: "NUMERO()", points: 3 },
      { question: "What function converts a value to a string?", answer: "TEXTO()", points: 3 },
      { question: "What does BOOLEANO(0) return?", answer: "FALSO", points: 3 },
    ],,
{
    slug: "operadores",
    title: "Operadores",
    order: 14,
    points: 10,
    bodyMd: `# Operators

A full set of operators for arithmetic, comparison, logic, and assignment.

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
E   OU   NAO   !
\`\`\`

## Assignment

\`\`\`xs
=   +=   -=   *=   /=   %=
\`\`\`

## Nullish Coalescing

\`??\` returns the left side if it is not null/undefined, otherwise the right side.

## Unary

\`\`\`xs
-x   +x   !x   x++   x--
\`\`\``,
    challenges: [
      { question: "What is the modulo operator?", answer: "%", points: 3 },
      { question: "What three Portuguese words are used for logical operators?", answer: "E OU NAO", points: 3 },
      { question: "What does \"x ?? y\" do?", answer: "returns x if x is not null/undefined, otherwise y", points: 5 },
    ],,
{
    slug: "precedencia-de-operadores",
    title: "Precedencia de Operadores",
    order: 15,
    points: 5,
    bodyMd: `# Operator Precedence

Determines evaluation order in expressions (highest to lowest):

| Level | Operators |
|-------|-----------|
| 1 | \`()\` grouping |
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
2 + 3 * 4      // 14 (not 20)
(2 + 3) * 4    // 20
VERDADEIRO OU FALSO E FALSO  // VERDADEIRO
2 ** 3 ** 2    // 512 (2 ** 9)
\`\`\`

Use parentheses to clarify intent.`,
    challenges: [
      { question: "What is the result of \"2 + 3 * 4\"?", answer: "14", points: 3 },
      { question: "Which has higher precedence: E or OU?", answer: "E", points: 3 },
    ],,
{
    slug: "se-liga-so",
    title: "SE LIGA SO (Instrucoes If)",
    order: 16,
    points: 10,
    bodyMd: `# SE LIGA SO — If Statements

\`SE LIGA SO\` ("pay attention") is XanaScript's \`if\` statement.

## Basic Syntax

\`\`\`xs
SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
}
\`\`\`

Conditions in parentheses, body in curly braces.

## Compound Conditions

\`\`\`xs
SE LIGA SO (nota >= 70 E presenca >= 0.75) {
  SOLTA O GRITO("Aprovado")
}
\`\`\`

## Nested

\`\`\`xs
SE LIGA SO (logado) {
  SE LIGA SO (admin) {
    SOLTA O GRITO("Painel admin")
  }
}
\`\`\`

Always use curly braces even for single statements.`,
    challenges: [
      { question: "What keyword starts an if statement in XanaScript?", answer: "SE LIGA SO", points: 3 },
      { question: "Must the condition be wrapped in parentheses?", answer: "yes", points: 3 },
    ],,
{
    slug: "senao",
    title: "SENAO (Clausulas Else)",
    order: 17,
    points: 10,
    bodyMd: `# SENAO — Else Clauses

\`SENAO\` ("otherwise") provides the alternative branch.

## Basic Syntax

\`\`\`xs
SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior")
} SENAO {
  SOLTA O GRITO("Menor")
}
\`\`\`

## Guard Pattern

\`\`\`xs
CHAMA ESSE CARA dividir(a, b) {
  SE LIGA SO (b == 0) {
    VOLTA null
  } SENAO {
    VOLTA a / b
  }
}
\`\`\`

The \`SENAO\` branch runs only when the condition is false, providing a complete fork in program flow.`,
    challenges: [
      { question: "What keyword represents else in XanaScript?", answer: "SENAO", points: 3 },
      { question: "When does the SENAO branch execute?", answer: "when the if condition is false", points: 3 },
    ],,
{
    slug: "senao-se",
    title: "SENAO SE (Cadeias Else If)",
    order: 18,
    points: 10,
    bodyMd: `# SENAO SE — Else If Chains

\`SENAO SE\` ("otherwise if") chains multiple conditions.

## Grade Example

\`\`\`xs
SE LIGA SO (nota >= 90) {
  SOLTA O GRITO("A")
} SENAO SE (nota >= 80) {
  SOLTA O GRITO("B")
} SENAO SE (nota >= 70) {
  SOLTA O GRITO("C")
} SENAO {
  SOLTA O GRITO("F")
}
\`\`\`

## Tax Example

\`\`\`xs
SE LIGA SO (renda <= 2000) {
  "Isento"
} SENAO SE (renda <= 5000 E dependentes > 1) {
  "Taxa reduzida"
} SENAO {
  "Taxa normal"
}
\`\`\`

Conditions are evaluated top-to-bottom. First match executes. Final SENAO is optional.`,
    challenges: [
      { question: "What keyword starts an else-if branch?", answer: "SENAO SE", points: 3 },
      { question: "How many branches execute in an if-else if chain?", answer: "one", points: 3 },
      { question: "Is the final SENAO branch required?", answer: "no", points: 3 },
    ],,
{
    slug: "condicionais-aninhados",
    title: "Condicionais Aninhados",
    order: 19,
    points: 10,
    bodyMd: `# Nested Conditionals

Place \`SE LIGA SO\` inside other \`SE LIGA SO\` blocks.

## Example

\`\`\`xs
SE LIGA SO (logado) {
  SE LIGA SO (admin) {
    SOLTA O GRITO("Admin")
  } SENAO {
    SOLTA O GRITO("Usuario")
  }
} SENAO {
  SOLTA O GRITO("Login necessario")
}
\`\`\`

## Avoid Deep Nesting

Use early returns to flatten code:

\`\`\`xs
SE LIGA SO (idade < 18) { VOLTA FALSO }
SE LIGA SO (!carteira) { VOLTA FALSO }
VOLTA VERDADEIRO
\`\`\`

Indent each level by 2 spaces. Keep nesting to 3 levels or less.`,
    challenges: [
      { question: "What technique avoids deep nesting?", answer: "early returns", points: 3 },
      { question: "How many levels of nesting is recommended maximum?", answer: "3", points: 5 },
    ],,
{
    slug: "expressoes-ternarias",
    title: "Expressoes Ternarias/Condicionais",
    order: 20,
    points: 10,
    bodyMd: `# Ternary/Conditional Expressions

Inline conditional using \`? :\`.

## Syntax

\`\`\`xs
condicao ? valor_se_verdadeiro : valor_se_falso
\`\`\`

## Examples

\`\`\`xs
CRIA status = (idade >= 18) ? "Adulto" : "Menor"
CRIA taxa = (renda > 5000) ? 0.3 : 0.15
\`\`\`

## Chained Ternary

\`\`\`xs
CRIA nota = (n >= 90) ? "A" :
            (n >= 80) ? "B" :
            (n >= 70) ? "C" : "F"
\`\`\`

Ternary is an **expression** (returns a value). If/else is a **statement**.

Use for simple binary choices. Avoid deep chaining.`,
    challenges: [
      { question: "What operator creates a conditional expression?", answer: "? :", points: 3 },
      { question: "Is ternary an expression or a statement?", answer: "expression", points: 5 },
    ],,
{
    slug: "combina-basico",
    title: "COMBINA Basico (Switch/Match)",
    order: 21,
    points: 10,
    bodyMd: `# COMBINA Basics

\`COMBINA\` is pattern matching, similar to \`switch\`/\`match\`.

## Basic Syntax

\`\`\`xs
COMBINA (fruta) {
  CASO "maca" => SOLTA O GRITO("Maca")
  CASO "banana" => SOLTA O GRITO("Banana")
  CASO _ => SOLTA O GRITO("Desconhecida")
}
\`\`\`

## Returning Values

\`\`\`xs
CRIA msg = COMBINA (fruta) {
  CASO "maca" => "Maca vermelha"
  CASO _ => "Desconhecida"
}
\`\`\`

## Multiple Values per Case

\`\`\`xs
CASO 301, 302 => "Redirect"
CASO 400, 401, 403 => "Client Error"
\`\`\`

Each arm returns a value. Wildcard \`_\` matches anything.`,
    challenges: [
      { question: "What keyword starts pattern matching in XanaScript?", answer: "COMBINA", points: 3 },
      { question: "What keyword defines a case?", answer: "CASO", points: 3 },
      { question: "What character is the wildcard?", answer: "_", points: 3 },
    ],,
{
    slug: "combina-com-intervalos",
    title: "COMBINA com Intervalos",
    order: 22,
    points: 10,
    bodyMd: `# COMBINA with Ranges

Use comparison operators in \`CASO\` arms.

## Numeric Ranges

\`\`\`xs
COMBINA (nota) {
  CASO 100 => "Perfeito"
  CASO >= 90 => "Excelente"
  CASO >= 80 => "Muito bom"
  CASO >= 70 => "Bom"
  CASO _ => "Estude mais"
}
\`\`\`

## Order Matters

Specific ranges must come first:

\`\`\`xs
// Correct
CASO >= 90 => "A"
CASO >= 80 => "B"

// Wrong: 90 never matches
CASO >= 80 => "B"   // matches 80-100
CASO >= 90 => "A"   // unreachable!
\`\`\`

Range matching makes COMBINA far more expressive than traditional switch statements.`,
    challenges: [
      { question: "Can COMBINA use comparison operators like >= in CASO arms?", answer: "yes", points: 3 },
      { question: "What happens if a broader range comes before a narrower one?", answer: "the narrower case becomes unreachable", points: 5 },
    ],,
{
    slug: "combina-curingas",
    title: "COMBINA Curingas (_)",
    order: 23,
    points: 5,
    bodyMd: `# COMBINA Wildcards

The underscore \`_\` matches any value.

## Default Case

\`\`\`xs
COMBINA (valor) {
  CASO 0 => "Zero"
  CASO _ => "Nao e zero"
}
\`\`\`

## Non-Exhaustive Warning

Without wildcard, you get a warning:

\`\`\`xs
COMBINA (cor) {
  CASO "azul" => "Blue"
  // Warning: non-exhaustive pattern!
}
\`\`\`

## Placement

The wildcard must be the **last** arm because it matches everything. Always include a \`_\` wildcard to handle unexpected values gracefully.`,
    challenges: [
      { question: "What character is the wildcard in COMBINA?", answer: "_", points: 3 },
      { question: "Where must the wildcard be placed?", answer: "last", points: 3 },
    ],,
{
    slug: "combina-expressoes",
    title: "COMBINA Expressoes (Retornando Valores)",
    order: 24,
    points: 10,
    bodyMd: `# COMBINA Expressions

COMBINA is an expression, not just a statement.

## Expression Form

\`\`\`xs
CRIA r = COMBINA (x) {
  CASO "a" => 1
  CASO "b" => 2
  CASO _ => 0
}
\`\`\`

All arms should return the same type:

\`\`\`xs
CRIA msg = COMBINA (cod) {
  CASO 200 => "OK"
  CASO 404 => "Not Found"
  CASO _ => "Unknown"
}
\`\`\`

## In Function Returns

\`\`\`xs
CHAMA ESSE CARA tipoDia(d) {
  VOLTA COMBINA (d) {
    CASO "sabado" => "Fim de semana"
    CASO "domingo" => "Fim de semana"
    CASO _ => "Dia util"
  }
}
\`\`\`

Using COMBINA as expression leads to more declarative code.`,
    challenges: [
      { question: "Is COMBINA a statement or an expression?", answer: "expression", points: 3 },
      { question: "What should all arms of a COMBINA expression return?", answer: "the same type", points: 3 },
    ],,
{
    slug: "avaliacao-de-curto-circuito",
    title: "Avaliacao de Curto-Circuito",
    order: 25,
    points: 5,
    bodyMd: `# Short-Circuit Evaluation

Right operand only evaluated if necessary.

## AND (\`E\`) Short-Circuit

If left is \`FALSO\`, right is skipped:

\`\`\`xs
SE LIGA SO (user != null E user.ativo) {
  // safe: right side skipped when null
}
\`\`\`

## OR (\`OU\`) Short-Circuit

If left is \`VERDADEIRO\`, right is skipped:

\`\`\`xs
CRIA nome = user OU "Convidado"
\`\`\`

## Practical Patterns

\`\`\`xs
// Guard against null
CRIA email = user E user.email

// Default value
CRIA display = nome OU "Visitante"

// Early exit
SE LIGA SO (!dados OU !dados.nome) { VOLTA FALSO }
\`\`\``,
    challenges: [
      { question: "What happens in E if the left operand is FALSO?", answer: "the right operand is not evaluated", points: 3 },
      { question: "What operator would you use for a default value pattern?", answer: "OU", points: 3 },
    ],,
{
    slug: "tipo-numero",
    title: "Tipo: NUMERO",
    order: 26,
    points: 5,
    bodyMd: `# Type: NUMERO

All numbers in XanaScript are of type \`NUMERO\` — both integers and floats.

## Integer Literals

\`\`\`xs
CRIA x = 42
CRIA y = -10
CRIA z = 1_000_000  // underscores for readability
\`\`\`

## Float Literals

\`\`\`xs
CRIA pi = 3.14159
CRIA avogadro = 6.022e23
CRIA negativo = -0.001
\`\`\`

## Type Information

Use \`TIPO()\` to inspect the type:

\`\`\`xs
SOLTA O GRITO(TIPO(42))      // NUMERO
SOLTA O GRITO(TIPO(3.14))    // NUMERO
\`\`\`

## Operators

\`+\`, \`-\`, \`*\`, \`/\`, \`%\` work with \`NUMERO\`. Division always returns a float.

\`\`\`xs
CRIA a = 10 / 3   // 3.333...
CRIA b = 10 // 3  // 3 (integer division)
\`\`\`

\`//\` performs integer division (floor).`,
    challenges: [
      { question: "What type are all numbers in XanaScript?", answer: "NUMERO", points: 3 },
      { question: "What operator performs integer division?", answer: "//", points: 5 },
      { question: "What function inspects a values type?", answer: "TIPO", points: 3 },
    ],,
{
    slug: "tipo-texto",
    title: "Tipo: TEXTO",
    order: 27,
    points: 5,
    bodyMd: `# Type: TEXTO

Strings in XanaScript use double quotes and are type \`TEXTO\`.

## String Literals

\`\`\`xs
CRIA nome = "Maria"
CRIA frase = "Ola, mundo!"
\`\`\`

## Escape Sequences

\`\`\`xs
CRIA s = "Linha 1\nLinha 2"  // newline
CRIA t = "Tab\taqui"          // tab
CRIA q = "Ela disse \"Oi\""   // quote
\`\`\`

## Interpolation

\`\`\`xs
CRIA nome = "Joao"
CRIA saudacao = "Ola, \${nome}!"  // "Ola, Joao!"
\`\`\`

## Operators

- \`+\`: concatenation
- \`*\`: repetition (\`"Ha" * 3\` → \`"HaHaHa"\`)
- \`[]\`: indexing (\`"abc"[1]\` → \`"b"\`)
- \`[::]\`: slicing (\`"abcdef"[1:4]\` → \`"bcd"\`)`,
    challenges: [
      { question: "What type name represents strings in XanaScript?", answer: "TEXTO", points: 3 },
      { question: "How do you interpolate a variable into a string?", answer: "${variable}", points: 3 },
      { question: "What does \"abc\" * 3 evaluate to?", answer: "abcabcabc", points: 5 },
    ],,
{
    slug: "tipo-booleano",
    title: "Tipo: BOOLEANO",
    order: 28,
    points: 5,
    bodyMd: `# Type: BOOLEANO

Booleans represent logical truth values.

## Values

- \`VERDADEIRO\` (true)
- \`FALSO\` (false)

## Logical Operators

| Operator | Meaning |
|----------|--------|
| \`E\` | AND |
| \`OU\` | OR |
| \`!\` | NOT |
| \`XOU\` | XOR |

## Truthy/Falsy

Only \`FALSO\`, \`0\`, and empty strings are falsy. Everything else is truthy.

\`\`\`xs
SE LIGA SO ("")   { SOLTA O GRITO("falsy") }   // runs
SE LIGA SO (" ")  { SOLTA O GRITO("truthy") }  // runs
SE LIGA SO (0)    { SOLTA O GRITO("falsy") }   // runs
SE LIGA SO (1)    { SOLTA O GRITO("truthy") }  // runs
\`\`\``,
    challenges: [
      { question: "What are the two boolean values in XanaScript?", answer: "VERDADEIRO and FALSO", points: 3 },
      { question: "What values are falsy in XanaScript?", answer: "FALSO, 0, and empty string", points: 5 },
      { question: "What is the XOR operator?", answer: "XOU", points: 3 },
    ],,
{
    slug: "tipo-lista",
    title: "Tipo: LISTA",
    order: 29,
    points: 5,
    bodyMd: `# Type: LISTA

Arrays in XanaScript are called \`LISTA\`.

## Creating Lists

\`\`\`xs
CRIA nums = [1, 2, 3, 4, 5]
CRIA vazia = []
CRIA mista = [1, "dois", VERDADEIRO]
\`\`\`

## Indexing

Zero-based, negative indices wrap around:

\`\`\`xs
CRIA items = [10, 20, 30, 40]
SOLTA O GRITO(items[0])    // 10
SOLTA O GRITO(items[-1])   // 40 (last)
\`\`\`

## Methods

| Method | Description |
|--------|-------------|
| \`lista.empurra(x)\` | Append |
| \`lista.tira()\` | Pop last |
| \`lista.tamanho\` | Length |
| \`lista.mapa(fn)\` | Map |

## Mutability

Lists declared with \`CRIA\` are mutable. Use \`CONSTANTE\` for immutable.`,
    challenges: [
      { question: "How do you access the last element of a list?", answer: "negative index -1", points: 3 },
      { question: "What method appends to a list?", answer: "empurra", points: 3 },
      { question: "What property gives the length of a list?", answer: "tamanho", points: 3 },
    ],,
{
    slug: "tipo-dicionario",
    title: "Tipo: DICIONARIO",
    order: 30,
    points: 5,
    bodyMd: `# Type: DICIONARIO

Dictionaries in XanaScript are key-value maps, type \`DICIONARIO\`.

## Creating Dictionaries

\`\`\`xs
CRIA user = {
  "nome": "Maria",
  "idade": 30,
  "email": "maria@email.com"
}
\`\`\`

## Access

\`\`\`xs
SOLTA O GRITO(user["nome"])   // Maria
SOLTA O GRITO(user.nome)      // Maria (dot notation)
\`\`\`

## Mutating

\`\`\`xs
user["telefone"] = "1234-5678"
user.idade = 31
user.tira("email")            // Remove key
\`\`\`

## Iteration

\`\`\`xs
PARA CADA (chave EM user) {
  SOLTA O GRITO(chave + ": " + user[chave])
}
\`\`\`

Keys are always strings. Values can be any type.`,
    challenges: [
      { question: "What type represents key-value maps?", answer: "DICIONARIO", points: 3 },
      { question: "Can you use dot notation to access dictionary values?", answer: "yes", points: 3 },
      { question: "What method removes a key from a dictionary?", answer: "tira", points: 3 },
    ],,
{
    slug: "tipo-opcional",
    title: "Tipo: OPCIONAL",
    order: 31,
    points: 5,
    bodyMd: `# Type: OPCIONAL

Optional types handle nullable values safely.

## Declaration

Use \`?\` suffix for optional types:

\`\`\`xs
CRIA nome: TEXTO? = null
CRIA idade: NUMERO? = 25
\`\`\`

## Safe Access

Use \`??\` for default values:

\`\`\`xs
CRIA display = nome ?? "Visitante"
\`\`\`

## Optional Chaining

Use \`?.\` for safe property access:

\`\`\`xs
CRIA cidade = user?.endereco?.cidade
// null if any chain part is null
\`\`\`

## Pattern Matching

\`\`\`xs
COMBINA (valor) {
  CASO null => "Nulo"
  CASO _ => "Valor: " + valor
}
\`\`\`

Optionals prevent null reference errors at compile time.`,
    challenges: [
      { question: "What suffix makes a type optional?", answer: "?", points: 3 },
      { question: "What operator provides a default for null?", answer: "??", points: 3 },
      { question: "What operator provides safe property access?", answer: "?.", points: 5 },
    ],,
{
    slug: "inferencia-de-tipos",
    title: "Inferencia de Tipos",
    order: 32,
    points: 10,
    bodyMd: `# Type Inference

XanaScript infers types automatically. Annotations are optional.

## How Inference Works

\`\`\`xs
CRIA x = 42         // inferred: NUMERO
CRIA nome = "Ana"   // inferred: TEXTO
CRIA ativo = true   // inferred: BOOLEANO
\`\`\`

## Literal Types

Constants can have literal types:

\`\`\`xs
CONSTANTE STATUS = "ativo"  // type: "ativo" literal
\`\`\`

## Function Return Inference

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b  // inferred: NUMERO
}
\`\`\`

## When to Annotate

Annotate when inference is ambiguous or for documentation:

\`\`\`xs
CRIA lista: LISTA<NUMERO> = []
CHAMA ESSE CARA busca(id: NUMERO): TEXTO? { ... }
\`\`\``,
    challenges: [
      { question: "What type is x in: CRIA x = 42", answer: "NUMERO", points: 3 },
      { question: "Are type annotations required in XanaScript?", answer: "no", points: 3 },
      { question: "When should you annotate types?", answer: "when inference is ambiguous or for documentation", points: 5 },
    ],,
{
    slug: "conversao-de-tipos",
    title: "Conversao de Tipos",
    order: 33,
    points: 10,
    bodyMd: `# Type Conversion

Explicit conversion between types uses built-in functions.

## To Number

\`\`\`xs
CRIA n = NUMERO("42")   // 42
CRIA f = NUMERO("3.14") // 3.14
CRIA b = NUMERO(true)   // 1
\`\`\`

## To String

\`\`\`xs
CRIA s = TEXTO(42)      // "42"
CRIA t = TEXTO(true)    // "VERDADEIRO"
\`\`\`

## To Boolean

\`\`\`xs
CRIA b = BOOLEANO(1)    // true
CRIA c = BOOLEANO("")   // false
\`\`\`

## Type Checking

\`\`\`xs
CRIA e_numero = TIPO(x) == NUMERO
SOLTA O GRITO(e_numero)  // true or false
\`\`\`

## Coercion Caveats

\`+\` between string and number coerces to string:

\`\`\`xs
CRIA r = "Total: " + 42   // "Total: 42"
\`\`\`

Always prefer explicit conversion for clarity.`,
    challenges: [
      { question: "What function converts a value to a number?", answer: "NUMERO", points: 3 },
      { question: "What does \"Total: \" + 42 produce?", answer: "Total: 42", points: 3 },
      { question: "Should you rely on implicit coercion?", answer: "no, prefer explicit conversion", points: 5 },
    ],,
{
    slug: "basico-de-funcoes",
    title: "Basico de Funcoes",
    order: 34,
    points: 5,
    bodyMd: `# Function Basics

Functions are declared with \`CHAMA ESSE CARA\` ("call this guy").

## Basic Syntax

\`\`\`xs
CHAMA ESSE CARA saudacao() {
  SOLTA O GRITO("Ola!")
}

saudacao()  // Ola!
\`\`\`

## Parameters

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  SOLTA O GRITO(a + b)
}

soma(3, 4)  // 7
\`\`\`

## Type Annotations

\`\`\`xs
CHAMA ESSE CARA dividir(a: NUMERO, b: NUMERO): NUMERO {
  VOLTA a / b
}
\`\`\`

Parameters and return types can be annotated. The return type follows the parameter list with \`: Tipo\`.`,
    challenges: [
      { question: "What keyword declares a function?", answer: "CHAMA ESSE CARA", points: 3 },
      { question: "Where does the return type annotation go?", answer: "after the parameter list", points: 5 },
      { question: "Can parameters have type annotations?", answer: "yes", points: 3 },
    ],,
{
    slug: "valores-de-retorno",
    title: "Valores de Retorno",
    order: 35,
    points: 5,
    bodyMd: `# Return Values

Use \`VOLTA\` ("return") to return a value from a function.

## Return Syntax

\`\`\`xs
CHAMA ESSE CARA quadrado(x) {
  VOLTA x * x
}

CRIA r = quadrado(5)  // 25
\`\`\`

## Early Return

\`\`\`xs
CHAMA ESSE CARA validar(n) {
  SE LIGA SO (n < 0) {
    VOLTA FALSO
  }
  VOLTA VERDADEIRO
}
\`\`\`

## Implicit Return

If the last expression lacks a semicolon, it's returned implicitly:

\`\`\`xs
CHAMA ESSE CARA dobro(x) {
  x * 2  // implicit return
}
\`\`\`

## Returning Multiple Values

Return an array or object:

\`\`\`xs
CHAMA ESSE CARA minMax(lista) {
  VOLTA { min: Math.menor(...lista), max: Math.maior(...lista) }
}
\`\`\``,
    challenges: [
      { question: "What keyword returns a value?", answer: "VOLTA", points: 3 },
      { question: "What happens if the last expression has no semicolon?", answer: "it is returned implicitly", points: 5 },
      { question: "How do you return multiple values?", answer: "return an array or object", points: 3 },
    ],,
{
    slug: "parametros-e-padroes",
    title: "Parametros & Padroes",
    order: 36,
    points: 5,
    bodyMd: `# Parameters & Defaults

Functions support default parameters and rest params.

## Default Parameters

\`\`\`xs
CHAMA ESSE CARA saudacao(nome = "Mundo") {
  SOLTA O GRITO("Ola, " + nome)
}

saudacao()          // Ola, Mundo
saudacao("Maria")   // Ola, Maria
\`\`\`

## Rest Parameters

Use \`...\` for variable arguments:

\`\`\`xs
CHAMA ESSE CARA somarTudo(...nums) {
  CRIA total = 0
  PARA CADA (n EM nums) { total += n }
  VOLTA total
}

somarTudo(1, 2, 3, 4)  // 10
\`\`\`

## Named Parameters

Pass an object for named-like behavior:

\`\`\`xs
CHAMA ESSE CARA configurar(opts) {
  CRIA host = opts.host ?? "localhost"
  CRIA port = opts.port ?? 3000
}

configurar({ host: "example.com", port: 8080 })
\`\`\`

## Parameter Count

Calling with wrong argument count is a compile error.`,
    challenges: [
      { question: "How do you define a default parameter?", answer: "param = valor", points: 3 },
      { question: "What syntax captures variable arguments?", answer: "...param", points: 3 },
      { question: "How do you simulate named parameters?", answer: "pass an object", points: 3 },
    ],,
{
    slug: "funcoes-como-primeira-classe",
    title: "Funcoes como Primeira-Classe",
    order: 37,
    points: 10,
    bodyMd: `# Functions as First-Class

Functions are values — assign them to variables, pass as arguments.

## Assign to Variable

\`\`\`xs
CHAMA ESSE CARA dobro(x) { VOLTA x * 2 }
CRIA fn = dobro
SOLTA O GRITO(fn(5))  // 10
\`\`\`

## Anonymous Functions

\`\`\`xs
CRIA quadrado = CHAMA ESSE CARA (x) { VOLTA x * x }
SOLTA O GRITO(quadrado(4))  // 16
\`\`\`

## Passing to Higher-Order Functions

\`\`\`xs
CRIA nums = [1, 2, 3, 4]
CRIA dobrados = nums.mapa(CHAMA ESSE CARA (n) { VOLTA n * 2 })
// [2, 4, 6, 8]
\`\`\`

## Returning Functions

\`\`\`xs
CHAMA ESSE CARA criarMultiplicador(fator) {
  VOLTA CHAMA ESSE CARA (x) { VOLTA x * fator }
}

CRIA triplicar = criarMultiplicador(3)
SOLTA O GRITO(triplicar(5))  // 15
\`\`\`

This enables closures and functional programming patterns.`,
    challenges: [
      { question: "Can you assign a function to a variable?", answer: "yes", points: 3 },
      { question: "What syntax creates an anonymous function?", answer: "CHAMA ESSE CARA (params) { body }", points: 3 },
      { question: "What is a closure?", answer: "a function that captures surrounding scope", points: 5 },
    ],,
{
    slug: "funcoes-flecha",
    title: "Funcoes Flecha (=>)",
    order: 38,
    points: 10,
    bodyMd: `# Arrow Functions

Arrow functions offer a shorter syntax.

## Single Expression

\`\`\`xs
CRIA dobro = (x) => x * 2
SOLTA O GRITO(dobro(5))  // 10
\`\`\`

## Multiple Parameters

\`\`\`xs
CRIA soma = (a, b) => a + b
\`\`\`

## No Parameters

\`\`\`xs
CRIA saudacao = () => "Ola!"
\`\`\`

## Block Body

For multiple statements, use \`{}\`:

\`\`\`xs
CRIA processar = (x) => {
  CRIA r = x * 2
  SOLTA O GRITO("Resultado: " + r)
  VOLTA r
}
\`\`\`

## Differences from Regular Functions

- Arrow functions capture \`ISTO\` from surrounding scope
- Cannot be used as constructors
- Cannot have a name (always anonymous)`,
    challenges: [
      { question: "What is the arrow function syntax?", answer: "(params) => expression", points: 3 },
      { question: "Do arrow functions capture ISTO from the surrounding scope?", answer: "yes", points: 3 },
      { question: "Can arrow functions be used as constructors?", answer: "no", points: 5 },
    ],,
{
    slug: "recursao",
    title: "Recursao",
    order: 39,
    points: 10,
    bodyMd: `# Recursion

Functions can call themselves — XanaScript supports recursion.

## Basic Recursion

\`\`\`xs
CHAMA ESSE CARA fatorial(n) {
  SE LIGA SO (n <= 1) { VOLTA 1 }
  VOLTA n * fatorial(n - 1)
}

SOLTA O GRITO(fatorial(5))  // 120
\`\`\`

## Tail Recursion

The compiler optimizes tail-recursive calls into loops:

\`\`\`xs
CHAMA ESSE CARA fatorialTail(n, acc = 1) {
  SE LIGA SO (n <= 1) { VOLTA acc }
  VOLTA fatorialTail(n - 1, n * acc)  // tail call
}
\`\`\`

## Recursive Data Structures

\`\`\`xs
CHAMA ESSE CARA tamanhoLista(lista) {
  SE LIGA SO (lista.tamanho == 0) { VOLTA 0 }
  VOLTA 1 + tamanhoLista(lista[1::])
}
\`\`\`

## Caution

Without tail recursion optimization, deep recursion can overflow the stack (>10000 calls).`,
    challenges: [
      { question: "What optimization does the compiler apply to tail recursion?", answer: "converts to loop", points: 5 },
      { question: "How deep can recursion go before stack overflow?", answer: "about 10000 calls", points: 3 },
    ],,
{
    slug: "funcoes-puras",
    title: "Funcoes Puras",
    order: 40,
    points: 10,
    bodyMd: `# Pure Functions

Pure functions have no side effects and always return the same output for the same input.

## Pure Example

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b  // no side effects, deterministic
}
\`\`\`

## Impure Example

\`\`\`xs
CRIA total = 0
CHAMA ESSE CARA adicionar(n) {
  total += n  // modifies external state
}
\`\`\`

## Benefits of Purity

- Easier to test (no setup needed)
- Referentially transparent (can reorder/inline)
- Thread-safe (no shared state)
- Memoizable (cache results)

## Pure Annotation

Use \`PURO\` keyword to enforce purity at compile time:

\`\`\`xs
CHAMA ESSE CARA PURO quadrado(x) {
  VOLTA x * x
}
\`\`\`

The compiler rejects side effects in \`PURO\` functions.`,
    challenges: [
      { question: "What makes a function pure?", answer: "no side effects, deterministic", points: 3 },
      { question: "What keyword enforces purity?", answer: "PURO", points: 5 },
      { question: "Name one benefit of pure functions", answer: "easier to test / thread-safe / memoizable", points: 3 },
    ],,
{
    slug: "sobrecarga-de-funcoes",
    title: "Sobrecarga de Funcoes",
    order: 41,
    points: 10,
    bodyMd: `# Function Overloading

Define multiple functions with the same name but different parameter types.

## Type-Based Overloading

\`\`\`xs
CHAMA ESSE CARA mostrar(x: NUMERO) {
  SOLTA O GRITO("Numero: " + x)
}

CHAMA ESSE CARA mostrar(x: TEXTO) {
  SOLTA O GRITO("Texto: " + x)
}

mostrar(42)        // Numero: 42
mostrar("Ola")     // Texto: Ola
\`\`\`

## Parameter Count

\`\`\`xs
CHAMA ESSE CARA criar() { ... }
CHAMA ESSE CARA criar(nome: TEXTO) { ... }
CHAMA ESSE CARA criar(nome: TEXTO, idade: NUMERO) { ... }
\`\`\`

## Resolution

The compiler picks the best match. Ambiguous calls produce a compile error.

Overloading enables expressive APIs without different function names.`,
    challenges: [
      { question: "Can you have multiple functions with the same name?", answer: "yes, with different parameter types", points: 3 },
      { question: "What happens on ambiguous overload?", answer: "compile error", points: 3 },
    ],,
{
    slug: "operacoes-com-lista",
    title: "Operacoes com Lista",
    order: 42,
    points: 5,
    bodyMd: `# List Operations

Core operations for working with lists.

## map, filter, reduce

\`\`\`xs
CRIA nums = [1, 2, 3, 4, 5]
CRIA dobrados = nums.mapa((n) => n * 2)
CRIA pares = nums.filtra((n) => n % 2 == 0)
CRIA soma = nums.reduz((acc, n) => acc + n, 0)
\`\`\`

## find, some, every

\`\`\`xs
CRIA primeiroPar = nums.acha((n) => n % 2 == 0)
CRIA temNegativo = nums.algum((n) => n < 0)
CRIA todosPositivos = nums.todos((n) => n > 0)
\`\`\`

## Sorting

\`\`\`xs
CRIA ordenado = nums.ordena()
CRIA reverso = nums.ordena((a, b) => b - a)
\`\`\`

## Chaining

\`\`\`xs
CRIA resultado = nums
  .filtra((n) => n > 2)
  .mapa((n) => n * 10)
  .reduz((a, n) => a + n, 0)
\`\`\`

Methods return new lists — original is unchanged.`,
    challenges: [
      { question: "What method transforms each element?", answer: "mapa", points: 3 },
      { question: "What method filters elements?", answer: "filtra", points: 3 },
      { question: "Can list methods be chained?", answer: "yes", points: 3 },
    ],,
{
    slug: "compreensao-de-lista",
    title: "Compreensao de Lista",
    order: 43,
    points: 10,
    bodyMd: `# List Comprehensions

Build new lists with a declarative syntax.

## Basic Comprehension

\`\`\`xs
CRIA quadrados = [n * n PARA n EM nums]
\`\`\`

## With Filter

\`\`\`xs
CRIA paresDobrados = [n * 2 PARA n EM nums SE n % 2 == 0]
\`\`\`

## Nested Loops

\`\`\`xs
CRIA pares = [(x, y) PARA x EM [1,2] PARA y EM [3,4]]
// [(1,3), (1,4), (2,3), (2,4)]
\`\`\`

## Comprehension vs Methods

Use comprehensions for readability, \`mapa\`/\`filtra\` for complex transformations.

Comprehensions compile efficiently — similar performance to manual loops.`,
    challenges: [
      { question: "What syntax creates a list comprehension?", answer: "[expr PARA var EM list]", points: 3 },
      { question: "How do you add a filter to a comprehension?", answer: "SE condicao at the end", points: 3 },
      { question: "Can comprehensions have nested loops?", answer: "yes", points: 3 },
    ],,
{
    slug: "tipo-conjunto",
    title: "Tipo: CONJUNTO",
    order: 44,
    points: 5,
    bodyMd: `# Type: CONJUNTO

Sets are unordered collections of unique values.

## Creating Sets

\`\`\`xs
CRIA cores = CONJUNTO{"azul", "verde", "vermelho"}
CRIA vazio = CONJUNTO{}
\`\`\`

## Operations

\`\`\`xs
cores.insere("amarelo")       // add
cores.remove("azul")           // remove
CRIA existe = cores.tem("verde")  // membership
\`\`\`

## Set Theory

\`\`\`xs
CRIA a = CONJUNTO{1, 2, 3}
CRIA b = CONJUNTO{2, 3, 4}
CRIA uniao = a + b           // {1, 2, 3, 4}
CRIA intersec = a * b        // {2, 3}
CRIA diferenca = a - b       // {1}
\`\`\`

## Iteration

\`\`\`xs
PARA CADA (cor EM cores) {
  SOLTA O GRITO(cor)
}
\`\`\``,
    challenges: [
      { question: "What type represents a set?", answer: "CONJUNTO", points: 3 },
      { question: "What operator computes union of two sets?", answer: "+", points: 3 },
      { question: "What operator computes intersection?", answer: "*", points: 5 },
    ],,
{
    slug: "tipo-tupla",
    title: "Tipo: TUPLA",
    order: 45,
    points: 5,
    bodyMd: `# Type: TUPLA

Tuples are fixed-size ordered collections with position types.

## Creating Tuples

\`\`\`xs
CRIA ponto = (10, 20)
CRIA usuario = ("Maria", 30, true)
\`\`\`

## Access by Position

\`\`\`xs
CRIA x = ponto[0]  // 10
CRIA y = ponto[1]  // 20
\`\`\`

## Destructuring

\`\`\`xs
CRIA (nome, idade, ativo) = usuario
SOLTA O GRITO(nome)  // Maria
\`\`\`

## Typed Tuples

\`\`\`xs
CRIA par: (TEXTO, NUMERO) = ("chave", 42)
\`\`\`

Tuples are immutable by default. Use them for returning multiple values from functions.`,
    challenges: [
      { question: "How do you destructure a tuple?", answer: "(var1, var2) = tuple", points: 3 },
      { question: "Are tuples mutable by default?", answer: "no", points: 3 },
      { question: "When should you use a tuple over a list?", answer: "for fixed-size collections with position-typed elements", points: 5 },
    ],,
{
    slug: "tipo-intervalo",
    title: "Tipo: INTERVALO",
    order: 46,
    points: 5,
    bodyMd: `# Type: INTERVALO

Ranges represent a sequence of values.

## Creating Ranges

\`\`\`xs
CRIA r1 = 1..5        // 1, 2, 3, 4, 5
CRIA r2 = 1..<5       // 1, 2, 3, 4 (exclusive end)
CRIA r3 = 0..10..2    // 0, 2, 4, 6, 8, 10 (step)
\`\`\`

## Using Ranges

\`\`\`xs
PARA CADA (i EM 1..5) {
  SOLTA O GRITO(i)  // 1, 2, 3, 4, 5
}
\`\`\`

## Membership

\`\`\`xs
CRIA dentro = 3 EM 1..10  // true
CRIA fora = 20 EM 1..10   // false
\`\`\`

## Slicing

Use ranges for list slicing:

\`\`\`xs
CRIA items = [0, 1, 2, 3, 4, 5]
CRIA slice = items[1..4]  // [1, 2, 3, 4]
\`\`\`

Ranges are lazy — elements are computed on demand.`,
    challenges: [
      { question: "How do you create an inclusive range from 1 to 5?", answer: "1..5", points: 3 },
      { question: "How do you create a range with a step?", answer: "start..end..step", points: 3 },
      { question: "What operator checks membership in a range?", answer: "EM", points: 3 },
    ],,
{
    slug: "loop-para-cada",
    title: "Loop PARA CADA",
    order: 47,
    points: 5,
    bodyMd: `# PARA CADA Loop

Iterate over collections with a clean syntax.

## Basic Syntax

\`\`\`xs
CRIA frutas = ["maca", "banana", "cereja"]
PARA CADA (fruta EM frutas) {
  SOLTA O GRITO(fruta)
}
\`\`\`

## Index Access

\`\`\`xs
PARA CADA ((i, fruta) EM frutas.comIndice()) {
  SOLTA O GRITO(i + ": " + fruta)
}
\`\`\`

## Iterating Dictionaries

\`\`\`xs
PARA CADA (chave EM dict) {
  SOLTA O GRITO(chave + " = " + dict[chave])
}
\`\`\`

## Breaking Early

\`\`\`xs
PARA CADA (n EM nums) {
  SE LIGA SO (n > 100) { INTERROMPE }
  SOLTA O GRITO(n)
}
\`\`\`

\`INTERROMPE\` breaks out of the loop.`,
    challenges: [
      { question: "What keyword iterates over a collection?", answer: "PARA CADA", points: 3 },
      { question: "How do you access the index in PARA CADA?", answer: "destructure (i, item) with comIndice()", points: 5 },
      { question: "What keyword breaks out of a loop?", answer: "INTERROMPE", points: 3 },
    ],,
{
    slug: "loop-enquanto",
    title: "Loop ENQUANTO",
    order: 48,
    points: 5,
    bodyMd: `# ENQUANTO Loop

Loop while a condition is true.

## Basic Syntax

\`\`\`xs
CRIA contador = 0
ENQUANTO (contador < 5) {
  SOLTA O GRITO(contador)
  contador += 1
}
\`\`\`

## Infinite Loop

\`\`\`xs
ENQUANTO (VERDADEIRO) {
  CRIA entrada = leEntrada()
  SE LIGA SO (entrada == "sair") { INTERROMPE }
  processa(entrada)
}
\`\`\`

## Do-While

\`\`\`xs
FAZ {
  CRIA n = sorteia()
  SOLTA O GRITO(n)
} ENQUANTO (n != 0)
\`\`\`

Use \`ENQUANTO\` when the number of iterations is unknown. Use \`PARA CADA\` for iterating collections.`,
    challenges: [
      { question: "What keyword starts a while loop?", answer: "ENQUANTO", points: 3 },
      { question: "What is the do-while syntax?", answer: "FAZ { ... } ENQUANTO (cond)", points: 5 },
      { question: "When should you use ENQUANTO over PARA CADA?", answer: "when iteration count is unknown", points: 3 },
    ],,
{
    slug: "controle-de-loop",
    title: "Controle de Loop: CONTINUE & INTERROMPE",
    order: 49,
    points: 5,
    bodyMd: `# Loop Control

\`CONTINUE\` skips to the next iteration. \`INTERROMPE\` exits the loop.

## CONTINUE

\`\`\`xs
PARA CADA (n EM 1..10) {
  SE LIGA SO (n % 2 == 0) { CONTINUE }
  SOLTA O GRITO(n)  // prints odd numbers
}
\`\`\`

## INTERROMPE

\`\`\`xs
PARA CADA (n EM nums) {
  SE LIGA SO (n < 0) {
    SOLTA O GRITO("Negativo encontrado!")
    INTERROMPE
  }
}
\`\`\`

## Labeled Control

Break/continue to outer loops:

\`\`\`xs
EXTERNO: PARA CADA (i EM 1..3) {
  PARA CADA (j EM 1..3) {
    SE LIGA SO (i * j > 4) { INTERROMPE EXTERNO }
    SOLTA O GRITO(i * j)
  }
}
\`\`\`

Labels make complex loop control readable and precise.`,
    challenges: [
      { question: "What skips to the next iteration?", answer: "CONTINUE", points: 3 },
      { question: "What exits the loop entirely?", answer: "INTERROMPE", points: 3 },
      { question: "How do you break from an outer loop?", answer: "label: INTERROMPE label", points: 5 },
    ],,
{
    slug: "basico-de-classes",
    title: "Basico de Classes com CLASSE",
    order: 50,
    points: 5,
    bodyMd: `# Class Basics

Classes are defined with \`CLASSE\`.

## Class Definition

\`\`\`xs
CLASSE Pessoa {
  CRIA nome
  CRIA idade

  CHAMA ESSE CARA init(nome, idade) {
    ISTO.nome = nome
    ISTO.idade = idade
  }

  CHAMA ESSE CARA saudacao() {
    SOLTA O GRITO("Ola, sou " + ISTO.nome)
  }
}
\`\`\`

## Creating Instances

\`\`\`xs
CRIA p = Pessoa.novo("Maria", 30)
p.saudacao()  // Ola, sou Maria
\`\`\`

## Properties

Properties are declared with \`CRIA\` inside the class body. Use \`ISTO\` to refer to the current instance.

The \`init\` method acts as the constructor.`,
    challenges: [
      { question: "What keyword defines a class?", answer: "CLASSE", points: 3 },
      { question: "What keyword refers to the current instance?", answer: "ISTO", points: 3 },
      { question: "What method acts as the constructor?", answer: "init", points: 3 },
    ],,
{
    slug: "construtores-de-classe",
    title: "Construtores de Classe",
    order: 51,
    points: 5,
    bodyMd: `# Class Constructors

The \`init\` method initializes a new instance.

## Constructor Pattern

\`\`\`xs
CLASSE Produto {
  CRIA nome, preco, estoque

  CHAMA ESSE CARA init(nome, preco, estoque = 0) {
    ISTO.nome = nome
    ISTO.preco = preco
    ISTO.estoque = estoque
  }
}
\`\`\`

## Multiple Constructors

Use overloading:

\`\`\`xs
CLASSE User {
  CRIA nome, email

  CHAMA ESSE CARA init() {
    ISTO.nome = "anonimo"
    ISTO.email = ""
  }

  CHAMA ESSE CARA init(nome, email) {
    ISTO.nome = nome
    ISTO.email = email
  }
}
\`\`\`

## Factory Methods

Static methods that create instances:

\`\`\`xs
CLASSE User {
  CHAMA ESSE CARA ESTATICO criarConvidado() {
    VOLTA User.novo("Convidado", "guest@site.com")
  }
}
\`\`\`

\`ESTATICO\` defines a static method.`,
    challenges: [
      { question: "What method is the constructor?", answer: "init", points: 3 },
      { question: "Can a class have multiple constructors?", answer: "yes, via overloading", points: 5 },
      { question: "What keyword defines a static method?", answer: "ESTATICO", points: 3 },
    ],,
{
    slug: "metodos-de-classe",
    title: "Metodos de Instancia & Estaticos",
    order: 52,
    points: 5,
    bodyMd: `# Instance & Static Methods

Methods can be instance-level or class-level.

## Instance Methods

Operate on an instance via \`ISTO\`:

\`\`\`xs
CLASSE Conta {
  CRIA saldo

  CHAMA ESSE CARA depositar(valor) {
    ISTO.saldo += valor
  }
}
\`\`\`

## Static Methods

Belong to the class, not instances:

\`\`\`xs
CLASSE Math {
  CHAMA ESSE CARA ESTATICO max(a, b) {
    VOLTA a > b ? a : b
  }
}

SOLTA O GRITO(Math.max(10, 20))  // 20
\`\`\`

## Property Getters/Setters

\`\`\`xs
CLASSE Pessoa {
  CRIA _nome

  PEGA nome() { VOLTA ISTO._nome }
  COLOCA nome(valor) { ISTO._nome = valor.paraMaiusculo() }
}
\`\`\`

\`PEGA\` (get) and \`COLOCA\` (set) define computed properties.`,
    challenges: [
      { question: "What keyword defines a static method?", answer: "ESTATICO", points: 3 },
      { question: "What keyword defines a getter?", answer: "PEGA", points: 3 },
      { question: "What keyword defines a setter?", answer: "COLOCA", points: 5 },
    ],,
{
    slug: "encapsulamento",
    title: "Encapsulamento",
    order: 53,
    points: 5,
    bodyMd: `# Encapsulation

Control access to class members.

## Private Members

Prefix with underscore:

\`\`\`xs
CLASSE Banco {
  CRIA _saldo = 0  // private by convention
  CRIA _extrato = []

  CHAMA ESSE CARA depositar(v) {
    ISTO._saldo += v
    ISTO._extrato.empurra("Deposito: " + v)
  }

  PEGA saldo() { VOLTA ISTO._saldo }
}
\`\`\`

## Private Keyword

Use \`PRIVADO\` for enforced privacy:

\`\`\`xs
CLASSE Conta {
  PRIVADO CRIA _saldo
  PRIVADO CHAMA ESSE CARA _log(msg) { ... }
}
\`\`\`

## Public API

Expose only what's needed:

\`\`\`xs
CLASSE API {
  CRIA PRIVADO _url

  CHAMA ESSE CARA buscar() { ... }   // public
  PRIVADO CHAMA ESSE CARA _parse() { ... }
}
\`\`\`

Encapsulation reduces coupling and prevents misuse.`,
    challenges: [
      { question: "What prefix conventionally marks private members?", answer: "_", points: 3 },
      { question: "What keyword enforces private access?", answer: "PRIVADO", points: 5 },
      { question: "What is a benefit of encapsulation?", answer: "reduces coupling / prevents misuse", points: 3 },
    ],,
{
    slug: "propriedades-computadas",
    title: "Propriedades Computadas",
    order: 54,
    points: 10,
    bodyMd: `# Computed Properties

Properties with custom get/set logic.

## Getter

\`\`\`xs
CLASSE Circulo {
  CRIA _raio

  CHAMA ESSE CARA init(r) { ISTO._raio = r }

  PEGA area() {
    VOLTA 3.14159 * ISTO._raio * ISTO._raio
  }

  PEGA circunferencia() {
    VOLTA 2 * 3.14159 * ISTO._raio
  }
}
\`\`\`

## Setter

\`\`\`xs
CLASSE Temperatura {
  CRIA _celsius

  PEGA fahrenheit() { VOLTA ISTO._celsius * 1.8 + 32 }

  COLOCA fahrenheit(v) {
    ISTO._celsius = (v - 32) / 1.8
  }
}
\`\`\`

## Usage

\`\`\`xs
CRIA t = Temperatura.novo()
t.fahrenheit = 212
SOLTA O GRITO(t._celsius)  // 100
\`\`\`

Computed properties look like fields but execute code on access.`,
    challenges: [
      { question: "What defines a getter?", answer: "PEGA", points: 3 },
      { question: "What defines a setter?", answer: "COLOCA", points: 3 },
      { question: "Can computed properties have both get and set?", answer: "yes", points: 3 },
    ],,
{
    slug: "sobrecarga-de-operadores",
    title: "Sobrecarga de Operadores",
    order: 55,
    points: 10,
    bodyMd: `# Operator Overloading

Define custom behavior for operators on your classes.

## Overloadable Operators

\`\`\`xs
CLASSE Vetor {
  CRIA x, y

  CHAMA ESSE CARA init(x, y) {
    ISTO.x = x; ISTO.y = y
  }

  OPERADOR + (outro) {
    VOLTA Vetor.novo(ISTO.x + outro.x, ISTO.y + outro.y)
  }

  OPERADOR * (escalar) {
    VOLTA Vetor.novo(ISTO.x * escalar, ISTO.y * escalar)
  }

  OPERADOR == (outro) {
    VOLTA ISTO.x == outro.x E ISTO.y == outro.y
  }

  OPERADOR TEXTO() {
    VOLTA "Vetor(" + ISTO.x + ", " + ISTO.y + ")"
  }
}
\`\`\`

## Usage

\`\`\`xs
CRIA v1 = Vetor.novo(1, 2)
CRIA v2 = Vetor.novo(3, 4)
CRIA soma = v1 + v2  // Vetor(4, 6)
\`\`\`

Operators make custom types feel native.`,
    challenges: [
      { question: "What keyword defines operator overloading?", answer: "OPERADOR", points: 3 },
      { question: "Which operator can you use for string conversion?", answer: "OPERADOR TEXTO", points: 5 },
      { question: "Can overloading make code more readable?", answer: "yes", points: 3 },
    ],,
{
    slug: "composicao-vs-heranca",
    title: "Composicao vs Heranca",
    order: 56,
    points: 10,
    bodyMd: `# Composition vs Inheritance

Prefer composition over inheritance.

## Composition Example

\`\`\`xs
CLASSE Motor {
  CHAMA ESSE CARA ligar() { SOLTA O GRITO("Motor ligado") }
}

CLASSE Carro {
  CRIA motor

  CHAMA ESSE CARA init() {
    ISTO.motor = Motor.novo()
  }

  CHAMA ESSE CARA ligar() {
    ISTO.motor.ligar()
  }
}
\`\`\`

## When to Use Inheritance

Use when there is a clear "is-a" relationship:

\`\`\`xs
CLASSE Animal { ... }
CLASSE Cachorro EXTENDE Animal { ... }
\`\`\`

## Favor Composition

- More flexible (swap components at runtime)
- Easier to test (mock components)
- Avoids deep hierarchy issues

Use \`EXTENDE\` for true subtype relationships, composition for code reuse.`,
    challenges: [
      { question: "Should you prefer composition or inheritance?", answer: "composition", points: 3 },
      { question: "When is inheritance appropriate?", answer: "when there is a clear is-a relationship", points: 5 },
      { question: "What keyword extends a class?", answer: "EXTENDE", points: 3 },
    ],,
{
    slug: "membros-estaticos",
    title: "Membros Estaticos & Singleton",
    order: 57,
    points: 10,
    bodyMd: `# Static Members & Singleton

Class-level members shared across all instances.

## Static Properties

\`\`\`xs
CLASSE Config {
  CRIA ESTATICO _instancia = null
  CRIA ESTATICO versao = "2.0"

  CHAMA ESSE CARA ESTATICO getInstancia() {
    SE LIGA SO (!Config._instancia) {
      Config._instancia = Config.novo()
    }
    VOLTA Config._instancia
  }
}

SOLTA O GRITO(Config.versao)  // 2.0
\`\`\`

## Singleton Pattern

\`\`\`xs
CLASSE DatabasePool {
  PRIVADO CRIA ESTATICO _pool = null

  CHAMA ESSE CARA ESTATICO conectar() {
    SE LIGA SO (!DatabasePool._pool) {
      DatabasePool._pool = DatabasePool.novo()
    }
    VOLTA DatabasePool._pool
  }

  PRIVADO CHAMA ESSE CARA init() {
    // private constructor
  }
}
\`\`\`

Static members are initialized lazily.`,
    challenges: [
      { question: "What keyword makes a member static?", answer: "ESTATICO", points: 3 },
      { question: "Are static properties shared across instances?", answer: "yes", points: 3 },
      { question: "Can the init constructor be private?", answer: "yes, with PRIVADO", points: 3 },
    ],,
{
    slug: "heranca-com-extende",
    title: "Heranca com EXTENDE",
    order: 58,
    points: 5,
    bodyMd: `# Inheritance Basics

A class can extend another class with \`EXTENDE\`.

## Syntax

\`\`\`xs
CLASSE Animal {
  CRIA nome

  CHAMA ESSE CARA init(nome) { ISTO.nome = nome }
  CHAMA ESSE CARA som() { SOLTA O GRITO("...") }
}

CLASSE Cachorro EXTENDE Animal {
  CHAMA ESSE CARA som() {
    SOLTA O GRITO("Au au!")
  }
}

CRIA rex = Cachorro.novo("Rex")
SOLTA O GRITO(rex.nome)  // Rex (inherited)
rex.som()                // Au au! (overridden)
\`\`\`

## Super Keyword

Call parent methods with \`SUPER\`:

\`\`\`xs
CLASSE Gato EXTENDE Animal {
  CHAMA ESSE CARA som() {
    SOLTA O GRITO("Miau!")
    SUPER.som()
  }
}
\`\`\``,
    challenges: [
      { question: "What keyword extends a class?", answer: "EXTENDE", points: 3 },
      { question: "How do you call a parent method?", answer: "SUPER.metodo()", points: 3 },
      { question: "Can a child class inherit properties?", answer: "yes", points: 3 },
    ],,
{
    slug: "sobrescrita-de-metodos",
    title: "Sobrescrita de Metodos",
    order: 59,
    points: 5,
    bodyMd: `# Method Overriding

Child classes can override methods from the parent.

## Override Rules

\`\`\`xs
CLASSE Forma {
  CHAMA ESSE CARA area() { VOLTA 0 }
}

CLASSE Retangulo EXTENDE Forma {
  CRIA largura, altura

  CHAMA ESSE CARA init(l, a) { ISTO.largura = l; ISTO.altura = a }

  CHAMA ESSE CARA area() {  // override
    VOLTA ISTO.largura * ISTO.altura
  }
}
\`\`\`

## Preventing Override

Use \`FINAL\` to prevent overriding:

\`\`\`xs
CLASSE Base {
  CHAMA ESSE CARA FINAL naoPodeSobrescrever() { ... }
}
\`\`\`

## Abstract Methods

Define method signatures without implementation:

\`\`\`xs
CLASSE Abstrata Forma {
  CHAMA ESSE CARA area()  // abstract — no body
}
\`\`\`

\`FINAL\` prevents override. Methods without a body are abstract.`,
    challenges: [
      { question: "What keyword prevents method overriding?", answer: "FINAL", points: 3 },
      { question: "How do you define an abstract method?", answer: "declare without a body", points: 5 },
      { question: "Can abstract classes be instantiated?", answer: "no", points: 3 },
    ],,
{
    slug: "polimorfismo",
    title: "Polimorfismo",
    order: 60,
    points: 10,
    bodyMd: `# Polymorphism

Objects of different types respond to the same interface.

## Polymorphic Behavior

\`\`\`xs
CLASSE Passaro {
  CHAMA ESSE CARA mover() { SOLTA O GRITO("Voando") }
}

CLASSE Peixe {
  CHAMA ESSE CARA mover() { SOLTA O GRITO("Nadando") }
}

CHAMA ESSE CARA fazerMover(animal) {
  animal.mover()  // works for any object with mover()
}

fazerMover(Passaro.novo())  // Voando
fazerMover(Peixe.novo())    // Nadando
\`\`\`

## With Inheritance

\`\`\`xs
CLASSE Veiculo {
  CHAMA ESSE CARA mover() { }
}

CLASSE Carro EXTENDE Veiculo { CHAMA ESSE CARA mover() { ... } }
CLASSE Bicicleta EXTENDE Veiculo { CHAMA ESSE CARA mover() { ... } }
\`\`\`

Polymorphism enables flexible, extensible designs without conditionals.`,
    challenges: [
      { question: "What is polymorphism?", answer: "objects of different types respond to the same interface", points: 3 },
      { question: "Does polymorphism require inheritance?", answer: "no, duck typing works too", points: 5 },
      { question: "What is a benefit of polymorphism?", answer: "reduces conditionals, enables extensibility", points: 3 },
    ],,
{
    slug: "classes-abstratas",
    title: "Classes Abstratas",
    order: 61,
    points: 10,
    bodyMd: `# Abstract Classes

Abstract classes define a template with some methods unimplemented.

## Defining Abstract Class

\`\`\`xs
CLASSE Abstrata Forma {
  CHAMA ESSE CARA area()  // abstract — no body
  CHAMA ESSE CARA descrever() {
    SOLTA O GRITO("Area: " + ISTO.area())
  }
}

CLASSE Quadrado EXTENDE Forma {
  CRIA lado
  CHAMA ESSE CARA init(l) { ISTO.lado = l }
  CHAMA ESSE CARA area() { VOLTA ISTO.lado * ISTO.lado }
}
\`\`\`

## Rules

- Cannot instantiate abstract classes directly
- Child classes must implement all abstract methods
- Use \`Abstrata\` annotation on the class

Abstract classes provide a contract plus shared implementation.`,
    challenges: [
      { question: "Can you instantiate an abstract class?", answer: "no", points: 3 },
      { question: "What annotation makes a class abstract?", answer: "Abstrata", points: 5 },
      { question: "Must child classes implement all abstract methods?", answer: "yes", points: 3 },
    ],,
{
    slug: "interfaces-com-protocolo",
    title: "Interfaces com PROTOCOLO",
    order: 62,
    points: 10,
    bodyMd: `# Interfaces (PROTOCOLO)

Define a contract without implementation.

## Protocol Definition

\`\`\`xs
PROTOCOLO Imprimivel {
  CHAMA ESSE CARA imprimir(): TEXTO
  CHAMA ESSE CARA formato(): TEXTO
}
\`\`\`

## Implementing a Protocol

\`\`\`xs
CLASSE Documento IMPLEMENTA Imprimivel {
  CRIA conteudo
  CHAMA ESSE CARA init(c) { ISTO.conteudo = c }

  CHAMA ESSE CARA imprimir() {
    SOLTA O GRITO(ISTO.conteudo)
  }

  CHAMA ESSE CARA formato() {
    VOLTA "Documento: " + ISTO.conteudo.tamanho + " chars"
  }
}
\`\`\`

## Multiple Protocols

\`\`\`xs
CLASSE Relatorio IMPLEMENTA Imprimivel, Exportavel { ... }
\`\`\`

Protocols support multiple inheritance of contracts without the diamond problem.`,
    challenges: [
      { question: "What keyword defines an interface?", answer: "PROTOCOLO", points: 3 },
      { question: "What keyword implements a protocol?", answer: "IMPLEMENTA", points: 3 },
      { question: "Can a class implement multiple protocols?", answer: "yes", points: 3 },
    ],,
{
    slug: "heranca-multipla",
    title: "Heranca Multipla via Protocolos",
    order: 63,
    points: 10,
    bodyMd: `# Multiple Inheritance

Protocols allow inheriting multiple contracts.

## Combining Protocols

\`\`\`xs
PROTOCOLO Salvavel {
  CHAMA ESSE CARA salvar(): TEXTO
}

PROTOCOLO Carregavel {
  CHAMA ESSE CARA carregar(dados: TEXTO)
}

CLASSE Arquivo IMPLEMENTA Salvavel, Carregavel {
  CRIA caminho

  CHAMA ESSE CARA init(c) { ISTO.caminho = c }

  CHAMA ESSE CARA salvar() {
    // implementation
  }

  CHAMA ESSE CARA carregar(dados) {
    // implementation
  }
}
\`\`\`

## Nominal vs Structural

Protocols are nominal — you must explicitly declare \`IMPLEMENTA\`. This ensures intent is clear.

## When to Use

Use protocols when different classes share capabilities but not hierarchy.`,
    challenges: [
      { question: "Can a class implement two protocols?", answer: "yes", points: 3 },
      { question: "Are XanaScript protocols nominal or structural?", answer: "nominal", points: 5 },
      { question: "Why use protocols over abstract classes?", answer: "when sharing capabilities across unrelated hierarchies", points: 3 },
    ],,
{
    slug: "injecao-de-dependencia",
    title: "Injecao de Dependencia",
    order: 64,
    points: 10,
    bodyMd: `# Dependency Injection

Pass dependencies rather than creating them internally.

## Without DI (Tight Coupling)

\`\`\`xs
CLASSE Servico {
  CRIA repo = Repositorio.novo()  // hard dependency
}
\`\`\`

## With DI (Loose Coupling)

\`\`\`xs
CLASSE Servico {
  CRIA repo

  CHAMA ESSE CARA init(repo) {
    ISTO.repo = repo  // injected
  }
}
\`\`\`

## Using Interfaces

\`\`\`xs
PROTOCOLO RepoUsuario {
  CHAMA ESSE CARA buscar(id): TEXTO
}

CLASSE Servico {
  CRIA repo: RepoUsuario

  CHAMA ESSE CARA init(repo: RepoUsuario) {
    ISTO.repo = repo
  }
}
\`\`\`

DI enables testing with mocks and swapping implementations.`,
    challenges: [
      { question: "What is dependency injection?", answer: "passing dependencies rather than creating them internally", points: 3 },
      { question: "What is a benefit of DI?", answer: "easier testing and swapping implementations", points: 5 },
      { question: "Does DI work well with protocols?", answer: "yes", points: 3 },
    ],,
{
    slug: "principios-solid",
    title: "Principios SOLID",
    order: 65,
    points: 10,
    bodyMd: `# SOLID Principles

Five principles for maintainable OOP.

## S — Single Responsibility

A class should have one reason to change:

\`\`\`xs
// Bad: both report and save
CLASSE Relatorio {
  CHAMA ESSE CARA gerar() { ... }
  CHAMA ESSE CARA salvar() { ... }
}

// Good: separate concerns
CLASSE Relatorio { CHAMA ESSE CARA gerar() { ... } }
CLASSE Repositorio { CHAMA ESSE CARA salvar(r) { ... } }
\`\`\`

## O — Open/Closed

Open for extension, closed for modification.

## L — Liskov Substitution

Subtypes must be substitutable for base types.

## I — Interface Segregation

Keep protocols focused.

## D — Dependency Inversion

Depend on abstractions, not concretions.

Following SOLID yields maintainable, testable code.`,
    challenges: [
      { question: "What does the S in SOLID stand for?", answer: "Single Responsibility", points: 3 },
      { question: "What does the D in SOLID stand for?", answer: "Dependency Inversion", points: 3 },
      { question: "What does Liskov Substitution mean?", answer: "subtypes must be substitutable for base types", points: 5 },
    ],,
{
    slug: "tratamento-de-erros-com-tente",
    title: "Tratamento de Erros com TENTE",
    order: 66,
    points: 5,
    bodyMd: `# Error Handling

Errors are handled with \`TENTE\` (try), \`CAPTURA\` (catch), \`FINALLY\` (finally).

## Basic Try/Catch

\`\`\`xs
TENTE {
  CRIA resultado = operacaoRiscada()
  SOLTA O GRITO(resultado)
} CAPTURA (erro) {
  SOLTA O GRITO("Erro: " + erro.mensagem)
}
\`\`\`

## Finally Block

Always executes, even on error:

\`\`\`xs
TENTE {
  CRIA arquivo = abrirArquivo("dados.txt")
  processar(arquivo)
} CAPTURA (erro) {
  SOLTA O GRITO("Falha: " + erro)
} FINALLY {
  fecharArquivo(arquivo)
}
\`\`\`

## Multiple Catch

\`\`\`xs
CAPTURA (erro: ErroValidacao) { ... }
CAPTURA (erro: ErroBanco) { ... }
CAPTURA (erro) { ... }  // default
\`\`\`

Use \`TENTE\` for operations that may fail.`,
    challenges: [
      { question: "What keyword starts a try block?", answer: "TENTE", points: 3 },
      { question: "What keyword catches an error?", answer: "CAPTURA", points: 3 },
      { question: "What block always executes?", answer: "FINALLY", points: 3 },
    ],,
{
    slug: "lancando-erros",
    title: "Lancando Erros",
    order: 67,
    points: 5,
    bodyMd: `# Throwing Errors

Use \`JOGAR\` (throw) to raise an error.

## Basic Throw

\`\`\`xs
CHAMA ESSE CARA dividir(a, b) {
  SE LIGA SO (b == 0) {
    JOGAR "Divisao por zero"
  }
  VOLTA a / b
}
\`\`\`

## Custom Error Messages

\`\`\`xs
SE LIGA SO (!usuario) {
  JOGAR "Usuario nao encontrado"
}

SE LIGA SO (saldo < valor) {
  JOGAR "Saldo insuficiente. Disponivel: " + saldo
}
\`\`\`

## Error Objects

\`\`\`xs
JOGAR Erro.novo("Validacao", "Campo obrigatorio")
\`\`\`

## Rethrowing

\`\`\`xs
CAPTURA (erro) {
  SOLTA O GRITO("Log: " + erro)
  JOGAR erro  // rethrow
}
\`\`\`

Only throw errors for exceptional situations, not control flow.`,
    challenges: [
      { question: "What keyword throws an error?", answer: "JOGAR", points: 3 },
      { question: "Can you throw a string?", answer: "yes", points: 3 },
      { question: "What pattern rethrows a caught error?", answer: "JOGAR erro inside CAPTURA", points: 3 },
    ],,
{
    slug: "classes-de-erro-personalizadas",
    title: "Classes de Erro Personalizadas",
    order: 68,
    points: 10,
    bodyMd: `# Custom Error Classes

Create domain-specific errors by extending the base error class.

## Defining Custom Errors

\`\`\`xs
CLASSE ErroAutenticacao EXTENDE Erro {
  CRIA codigo

  CHAMA ESSE CARA init(mensagem, codigo) {
    SUPER.init(mensagem)
    ISTO.codigo = codigo
    ISTO.nome = "ErroAutenticacao"
  }
}

CLASSE ErroValidacao EXTENDE Erro {
  CRIA campo

  CHAMA ESSE CARA init(mensagem, campo) {
    SUPER.init(mensagem)
    ISTO.campo = campo
  }
}
\`\`\`

## Usage

\`\`\`xs
SE LIGA SO (!senha) {
  JOGAR ErroValidacao.novo("Senha obrigatoria", "senha")
}

CAPTURA (erro: ErroValidacao) {
  SOLTA O GRITO("Campo: " + erro.campo)
}
\`\`\`

Custom errors enable precise error handling with domain-specific data.`,
    challenges: [
      { question: "How do you create a custom error?", answer: "extend Erro class", points: 3 },
      { question: "Why use custom errors?", answer: "for domain-specific error data and precise handling", points: 5 },
    ],,
{
    slug: "padroes-de-tratamento-de-erro",
    title: "Padroes de Tratamento de Erro",
    order: 69,
    points: 10,
    bodyMd: `# Error Handling Patterns

Common patterns for robust error handling.

## Guard Clause

Check early, throw immediately:

\`\`\`xs
CHAMA ESSE CARA buscarUsuario(id) {
  SE LIGA SO (!id) { JOGAR "ID obrigatorio" }
  SE LIGA SO (id < 0) { JOGAR "ID invalido" }

  CRIA user = repo.busca(id)
  SE LIGA SO (!user) { JOGAR "Nao encontrado" }

  VOLTA user
}
\`\`\`

## Result Pattern (Without Exceptions)

\`\`\`xs
CLASSE Resultado {
  CRIA sucesso, valor, erro

  CHAMA ESSE CARA ESTATICO ok(valor) {
    VOLTA Resultado.novo(true, valor, null)
  }

  CHAMA ESSE CARA ESTATICO falha(erro) {
    VOLTA Resultado.novo(false, null, erro)
  }
}
\`\`\`

## Using Result

\`\`\`xs
CRIA r = operacao()
SE LIGA SO (r.sucesso) {
  processar(r.valor)
} SENAO {
  SOLTA O GRITO("Erro: " + r.erro)
}
\`\`\``,
    challenges: [
      { question: "What pattern checks conditions early?", answer: "guard clause", points: 3 },
      { question: "What is an alternative to exceptions?", answer: "Result pattern", points: 5 },
      { question: "What type does a guard clause use?", answer: "JOGAR / throw", points: 3 },
    ],,
{
    slug: "validacao-de-entrada",
    title: "Validacao de Entrada",
    order: 70,
    points: 5,
    bodyMd: `# Input Validation

Validate inputs before processing.

## Basic Validation

\`\`\`xs
CHAMA ESSE CARA cadastrarUsuario(dados) {
  SE LIGA SO (!dados.nome OU dados.nome.tamanho < 2) {
    JOGAR "Nome deve ter ao menos 2 caracteres"
  }

  SE LIGA SO (!dados.email OU !dados.email.tem("@")) {
    JOGAR "Email invalido"
  }

  SE LIGA SO (dados.idade < 18) {
    JOGAR "Menor de idade nao permitido"
  }

  // process
}
\`\`\`

## Validation Library

XanaScript provides built-in validation helpers:

\`\`\`xs
import { valida, regra } from "xs:validacao"

CRIA regras = [
  regra("nome", OBRIGATORIO),
  regra("email", EMAIL),
  regra("idade", NUMERICO, { min: 18 })
]

CRIA erros = valida(dados, regras)
\`\`\`

Always validate external input before processing.`,
    challenges: [
      { question: "Should you validate inputs before processing?", answer: "yes", points: 3 },
      { question: "What is a validation rule?", answer: "a condition that input must satisfy", points: 3 },
      { question: "Where should validation happen?", answer: "at system boundaries (API, forms)", points: 3 },
    ],,
{
    slug: "registro-de-erros",
    title: "Registro de Erros",
    order: 71,
    points: 5,
    bodyMd: `# Error Logging

Log errors for debugging and monitoring.

## Basic Logging

\`\`\`xs
TENTE {
  operacao()
} CAPTURA (erro) {
  SOLTA O GRITO("ERRO: " + erro)
  console.erro(erro)
}
\`\`\`

## Structured Logging

\`\`\`xs
CLASSE Logger {
  CHAMA ESSE CARA ESTATICO erro(msg, contexto = {}) {
    CRIA entrada = {
      nivel: "ERRO",
      mensagem: msg,
      timestamp: DataAgora(),
      contexto: contexto
    }
    console.erro(JSON.serializa(entrada))
  }
}

// Usage
Logger.erro("Falha no banco", { db: "usuarios", erro: err })
\`\`\`

## Log Levels

- \`DEBUG\`: development details
- \`INFO\`: normal operations
- \`AVISO\`: warnings
- \`ERRO\`: errors

Log enough to diagnose problems, not so much that logs are noise.`,
    challenges: [
      { question: "What log level is for errors?", answer: "ERRO", points: 3 },
      { question: "Why use structured logging?", answer: "for machine-parseable, searchable logs", points: 5 },
      { question: "What is the trade-off with logging?", answer: "too much = noise, too little = undiagnosable", points: 3 },
    ],,
{
    slug: "estrategias-de-recuperacao",
    title: "Estrategias de Recuperacao de Erros",
    order: 72,
    points: 10,
    bodyMd: `# Error Recovery

Strategies for recovering from failures.

## Retry Pattern

\`\`\`xs
CHAMA ESSE CARA tentarComRetry(fn, tentativas = 3) {
  PARA CADA (i EM 1..tentativas) {
    TENTE {
      VOLTA fn()
    } CAPTURA (erro) {
      SE LIGA SO (i == tentativas) { JOGAR erro }
      SOLTA O GRITO("Tentativa " + i + " falhou. Retentando...")
      esperar(1000 * i)
    }
  }
}
\`\`\`

## Circuit Breaker

Stop calling a failing service temporarily:

\`\`\`xs
CLASSE CircuitBreaker {
  CRIA falhas = 0, limite = 5, aberto = false

  CHAMA ESSE CARA chamar(fn) {
    SE LIGA SO (ISTO.aberto) {
      JOGAR "Circuito aberto"
    }
    TENTE {
      CRIA r = fn()
      ISTO.falhas = 0
      VOLTA r
    } CAPTURA (e) {
      ISTO.falhas += 1
      SE LIGA SO (ISTO.falhas >= ISTO.limite) { ISTO.aberto = true }
      JOGAR e
    }
  }
}
\`\`\`

Choose recovery strategy based on error type and system requirements.`,
    challenges: [
      { question: "What pattern retries a failed operation?", answer: "retry pattern", points: 3 },
      { question: "What pattern stops calling a failing service?", answer: "circuit breaker", points: 5 },
      { question: "Should all errors be retried?", answer: "no, only transient errors", points: 3 },
    ],,
{
    slug: "melhores-praticas-de-erro",
    title: "Melhores Praticas de Tratamento de Erros",
    order: 73,
    points: 10,
    bodyMd: `# Best Practices

Guidelines for robust error handling.

## 1. Fail Fast

Detect errors as early as possible:

\`\`\`xs
CHAMA ESSE CARA processar(dados) {
  SE LIGA SO (!dados) { JOGAR "Dados obrigatorios" }
  // continue...
}
\`\`\`

## 2. Don't Swallow Errors

\`\`\`xs
// Bad
CAPTURA (e) { /* do nothing */ }

// Good
CAPTURA (e) {
  Logger.erro(e)
  JOGAR  // or handle appropriately
}
\`\`\`

## 3. Use Specific Errors

Catch specific types, not generic errors.

## 4. Clean Up Resources

Use \`FINALLY\` for cleanup.

## 5. Document Error Conditions

Document what errors a function can throw.

Following these practices prevents silent failures and data corruption.`,
    challenges: [
      { question: "What does fail fast mean?", answer: "detect errors as early as possible", points: 3 },
      { question: "Is it OK to swallow errors?", answer: "no", points: 3 },
      { question: "Where should cleanup code go?", answer: "FINALLY block", points: 3 },
    ],,
{
    slug: "basico-de-modulos",
    title: "Basico de Modulos",
    order: 74,
    points: 5,
    bodyMd: `# Module Basics

Organize code into reusable modules.

## Exporting

\`\`\`xs
// math.xs
export CHAMA ESSE CARA soma(a, b) { VOLTA a + b }
export CHAMA ESSE CARA multiplicar(a, b) { VOLTA a * b }

export CONSTANTE PI = 3.14159
\`\`\`

## Importing

\`\`\`xs
// main.xs
import { soma, PI } from "./math.xs"

SOLTA O GRITO(soma(2, 3))     // 5
SOLTA O GRITO(PI)             // 3.14159
\`\`\`

## Default Export

\`\`\`xs
// utils.xs
export default CHAMA ESSE CARA log(msg) {
  SOLTA O GRITO("[LOG] " + msg)
}
\`\`\`

## Default Import

\`\`\`xs
import log from "./utils.xs"
log("teste")  // [LOG] teste
\`\`\`

Every file can have one default export and multiple named exports.`,
    challenges: [
      { question: "What keyword exports a value?", answer: "export", points: 3 },
      { question: "What keyword imports a value?", answer: "import", points: 3 },
      { question: "How many default exports can a module have?", answer: "one", points: 3 },
    ],,
{
    slug: "importacoes-exportacoes-nomeadas",
    title: "Importacoes/Exportacoes Nomeadas",
    order: 75,
    points: 5,
    bodyMd: `# Named Imports/Exports

Import and export specific names.

## Named Exports

\`\`\`xs
// shapes.xs
export CLASSE Circulo { ... }
export CLASSE Quadrado { ... }
export CHAMA ESSE CARA areaTotal(...formas) { ... }
\`\`\`

## Named Imports

\`\`\`xs
import { Circulo, areaTotal } from "./shapes.xs"
\`\`\`

## Aliases

Rename imports to avoid conflicts:

\`\`\`xs
import { Circulo as Circ, Quadrado as Quad } from "./shapes.xs"
CRIA c = Circ.novo(5)
\`\`\`

## Re-exporting

\`\`\`xs
export { soma, multiplicar } from "./math.xs"
\`\`\`

## Namespace Import

\`\`\`xs
import * as Math from "./math.xs"
SOLTA O GRITO(Math.soma(1, 2))
\`\`\`

Named imports are explicit and enable tree-shaking.`,
    challenges: [
      { question: "How do you alias an import?", answer: "import { Original as Alias }", points: 3 },
      { question: "How do you import everything from a module?", answer: "import * as name", points: 3 },
      { question: "What is the main benefit of named imports?", answer: "tree-shaking and explicit dependencies", points: 5 },
    ],,
{
    slug: "resolucao-de-modulos",
    title: "Resolucao de Modulos",
    order: 76,
    points: 5,
    bodyMd: `# Module Resolution

How XanaScript finds imported modules.

## Relative Paths

Start with \`./\` or \`../\`:

\`\`\`xs
import { x } from "./utils.xs"
import { y } from "../lib/helper.xs"
\`\`\`

## Package Names

Without a path prefix, resolves from \`node_modules\`:

\`\`\`xs
import { express } from "express"
\`\`\`

## Built-in Modules

Use \`xs:\` prefix for standard library:

\`\`\`xs
import { readFile, writeFile } from "xs:fs"
import { serve } from "xs:http"
\`\`\`

## Resolution Order

1. Built-in (\`xs:*)
2. Relative (\`./\`, \`../\`)
3. Package (node_modules)

The compiler caches resolved paths for fast recompilation.`,
    challenges: [
      { question: "What prefix denotes a relative import?", answer: "./ or ../", points: 3 },
      { question: "What prefix denotes built-in modules?", answer: "xs:", points: 3 },
      { question: "Where does the compiler look for package imports?", answer: "node_modules", points: 3 },
    ],,
{
    slug: "dependencias-circulares",
    title: "Dependencias Circulares",
    order: 77,
    points: 10,
    bodyMd: `# Circular Dependencies

When module A imports from B and B imports from A.

## The Problem

\`\`\`xs
// a.xs
import { bFn } from "./b.xs"
export CHAMA ESSE CARA aFn() { bFn() }

// b.xs
import { aFn } from "./a.xs"
export CHAMA ESSE CARA bFn() { aFn() }
\`\`\`

## How XanaScript Handles It

The compiler detects cycles and allows them if they don't cause infinite initialization:

- Exports are hoisted (available before initialization)
- Runtime error if a circular import is used before its exports resolve

## Best Practices

Avoid cycles by:

- Extracting shared logic into a third module
- Using dependency injection
- Restructuring to one-directional flow

\`\`\`xs
// shared.xs (extracted common code)
export CHAMA ESSE CARA util() { ... }
\`\`\`

Cycles are sometimes unavoidable but should be minimized.`,
    challenges: [
      { question: "Can XanaScript handle circular dependencies?", answer: "yes, with hoisted exports", points: 3 },
      { question: "What is the best way to resolve cycles?", answer: "extract shared logic into a third module", points: 5 },
    ],,
{
    slug: "criando-pacotes",
    title: "Criando Pacotes",
    order: 78,
    points: 10,
    bodyMd: `# Creating Packages

Package your modules for distribution.

## Package Structure

\`\`\`
meu-pacote/
  package.json
  src/
    index.xs
    utils.xs
  README.md
\`\`\`

## package.json

\`\`\`json
{
  "name": "meu-pacote",
  "version": "1.0.0",
  "main": "src/index.xs",
  "xs": {
    "entry": "src/index.xs"
  }
}
\`\`\`

## Entry Point

\`\`\`xs
// src/index.xs
export { soma } from "./utils.xs"
export { Cliente } from "./cliente.xs"
\`\`\`

## Publishing

\`\`\`bash
xs publish
\`\`\`

Or via npm:

\`\`\`bash
npm publish
\`\`\`

Packages enable code sharing across projects and with the community.`,
    challenges: [
      { question: "What file configures a package?", answer: "package.json", points: 3 },
      { question: "What field specifies the entry point?", answer: "main or xs.entry", points: 3 },
      { question: "How do you publish a package?", answer: "xs publish or npm publish", points: 3 },
    ],,
{
    slug: "carregamento-preguicoso",
    title: "Carregamento Preguicoso",
    order: 79,
    points: 10,
    bodyMd: `# Lazy Loading

Load modules on demand to improve startup time.

## Dynamic Import

\`\`\`xs
CHAMA ESSE CARA carregarModulo(nome) {
  CRIA mod = await import("./" + nome + ".xs")
  mod.executar()
}
\`\`\`

## Conditional Loading

\`\`\`xs
SE LIGA SO (processo.OS == "windows") {
  CRIA win = await import("./windows.xs")
  win.configurar()
} SENAO {
  CRIA unix = await import("./unix.xs")
  unix.configurar()
}
\`\`\`

## Lazy vs Eager

- Eager: all code loaded at startup
- Lazy: code loaded when needed

## Benefits

- Faster startup
- Lower memory usage
- Code splitting for large apps

Use lazy loading for rarely-used features or platform-specific code.`,
    challenges: [
      { question: "What function dynamically imports a module?", answer: "import()", points: 3 },
      { question: "What is a benefit of lazy loading?", answer: "faster startup / lower memory", points: 3 },
      { question: "When should you use lazy loading?", answer: "for rarely-used features or platform-specific code", points: 3 },
    ],,
{
    slug: "escopo-de-modulo",
    title: "Escopo de Modulo",
    order: 80,
    points: 5,
    bodyMd: `# Module Scope

Each module has its own scope.

## Top-Level Scope

Variables declared at the top level are module-scoped (not global):

\`\`\`xs
// config.xs
CRIA _senha = "secreta"  // only visible in this module
export CRIA versao = "1.0"
\`\`\`

## Global Variables

Use \`global\` for cross-module state:

\`\`\`xs
// globals.xs
global.appName = "MeuApp"
global.version = "1.0"
\`\`\`

## Import Side Effects

Importing a module executes its top-level code once:

\`\`\`xs
// Executes once when first imported
import "./config.xs"
\`\`\`

## Module Caching

Modules are cached after first import. Subsequent imports use the cached instance.

Module scope prevents naming collisions and encourages encapsulation.`,
    challenges: [
      { question: "Are top-level variables automatically global?", answer: "no, they are module-scoped", points: 3 },
      { question: "What keyword creates a cross-module global?", answer: "global", points: 3 },
      { question: "Are modules cached after first import?", answer: "yes", points: 3 },
    ],,
{
    slug: "padroes-de-modulo",
    title: "Padroes de Modulo",
    order: 81,
    points: 5,
    bodyMd: `# Module Standards

Conventions for organizing modules.

## File Naming

- Use \`kebab-case.xs\` for filenames
- One main export per file
- Index files for barrel exports

## Directory Structure

\`\`\`
src/
  index.xs           // main entry
  components/        // UI components
    button.xs
    input.xs
  services/          // business logic
    auth.xs
    api.xs
  utils/             // helpers
    format.xs
    validacao.xs
\`\`\`

## Barrel Exports

\`\`\`xs
// src/components/index.xs
export { Button } from "./button.xs"
export { Input } from "./input.xs"
\`\`\`

## Module Responsibility

Each module should:
- Do one thing well
- Have a clear public API
- Minimize dependencies

Consistent structure makes navigation predictable.`,
    challenges: [
      { question: "What naming convention is recommended for .xs files?", answer: "kebab-case", points: 3 },
      { question: "What is a barrel export?", answer: "re-exports from multiple files in one index", points: 3 },
      { question: "What should each module do?", answer: "one thing well with a clear API", points: 3 },
    ],,
{
    slug: "leitura-de-arquivos",
    title: "Leitura de Arquivos",
    order: 82,
    points: 5,
    bodyMd: `# Reading Files

Use \`xs:fs\` module for file operations.

## Read File (Sync)

\`\`\`xs
import { readFile } from "xs:fs"

CRIA conteudo = readFile("dados.txt", "utf8")
SOLTA O GRITO(conteudo)
\`\`\`

## Read File (Async)

\`\`\`xs
import { readFileAsync } from "xs:fs"

CRIA conteudo = await readFileAsync("dados.txt")
SOLTA O GRITO(conteudo)
\`\`\`

## Read Lines

\`\`\`xs
import { readLines } from "xs:fs"

PARA CADA (linha EM readLines("dados.txt")) {
  SOLTA O GRITO(linha)
}
\`\`\`

## File Info

\`\`\`xs
import { stat } from "xs:fs"

CRIA info = stat("arquivo.txt")
SOLTA O GRITO(info.tamanho)
SOLTA O GRITO(info.modified)
\`\`\`

Always handle errors when reading files.`,
    challenges: [
      { question: "What module provides file operations?", answer: "xs:fs", points: 3 },
      { question: "What function reads a file synchronously?", answer: "readFile", points: 3 },
      { question: "How do you read a file asynchronously?", answer: "readFileAsync with await", points: 3 },
    ],,
{
    slug: "escrita-de-arquivos",
    title: "Escrita de Arquivos",
    order: 83,
    points: 5,
    bodyMd: `# Writing Files

Write content to files using \`xs:fs\`.

## Write File

\`\`\`xs
import { writeFile } from "xs:fs"

writeFile("saida.txt", "Conteudo do arquivo", "utf8")
\`\`\`

## Append to File

\`\`\`xs
import { appendFile } from "xs:fs"

appendFile("log.txt", "Nova linha\n")
\`\`\`

## Async Write

\`\`\`xs
await writeFileAsync("dados.json", JSON.serializa(objeto))
\`\`\`

## Create Directory

\`\`\`xs
import { mkdir } from "xs:fs"
mkdir("novo-diretorio", { recursivo: true })
\`\`\`

## Check Existence

\`\`\`xs
import { exists } from "xs:fs"
SE LIGA SO (exists("arquivo.txt")) {
  // safe to read
}
\`\`\`

Always close resources and handle write errors.`,
    challenges: [
      { question: "What function writes to a file?", answer: "writeFile", points: 3 },
      { question: "What function appends to a file?", answer: "appendFile", points: 3 },
      { question: "What flag creates parent directories?", answer: "recursivo: true", points: 3 },
    ],,
{
    slug: "manipulacao-de-json",
    title: "Manipulacao de JSON",
    order: 84,
    points: 10,
    bodyMd: `# JSON File Handling

Read and write JSON data.

## Reading JSON

\`\`\`xs
import { readFile } from "xs:fs"

CRIA raw = readFile("config.json", "utf8")
CRIA config = JSON.parse(raw)
SOLTA O GRITO(config.host)
\`\`\`

## Writing JSON

\`\`\`xs
import { writeFile } from "xs:fs"

CRIA dados = {
  nome: "Maria",
  idade: 30,
  ativo: true
}

writeFile("user.json", JSON.serializa(dados, null, 2))
\`\`\`

## JSON.parse Options

\`\`\`xs
// Reviver function transforms values
CRIA data = JSON.parse(raw, (chave, valor) => {
  SE LIGA SO (chave == "data") { VOLTA new Data(valor) }
  VOLTA valor
})
\`\`\`

## Error Handling

\`\`\`xs
TENTE {
  CRIA config = JSON.parse(raw)
} CAPTURA (e) {
  SOLTA O GRITO("JSON invalido: " + e)
}
\`\`\`

JSON is the standard format for structured data exchange.`,
    challenges: [
      { question: "What function parses a JSON string?", answer: "JSON.parse", points: 3 },
      { question: "What function serializes to JSON?", answer: "JSON.serializa", points: 3 },
      { question: "Why handle JSON parse errors?", answer: "because input may be malformed", points: 3 },
    ],,
{
    slug: "fluxos-de-arquivo",
    title: "Fluxos de Arquivo",
    order: 85,
    points: 10,
    bodyMd: `# File Streams

Process large files without loading entirely into memory.

## Reading Stream

\`\`\`xs
import { createReadStream } from "xs:fs"

CRIA stream = createReadStream("grande.txt")

stream.em("dados", (chunk) => {
  processaChunk(chunk)
})

stream.em("fim", () => {
  SOLTA O GRITO("Leitura concluida")
})
\`\`\`

## Writing Stream

\`\`\`xs
import { createWriteStream } from "xs:fs"

CRIA out = createWriteStream("saida.txt")
PARA CADA (item EM dados) {
  out.escreve(item + "\n")
}
out.fecha()
\`\`\`

## Piping

\`\`\`xs
import { createReadStream, createWriteStream } from "xs:fs"

CRIA origem = createReadStream("origem.txt")
CRIA destino = createWriteStream("destino.txt")
origem.pipe(destino)
\`\`\`

Streams prevent memory issues with files larger than available RAM.`,
    challenges: [
      { question: "Why use streams for large files?", answer: "to avoid loading entire file into memory", points: 5 },
      { question: "What event provides data chunks?", answer: "dados", points: 3 },
      { question: "What method connects read to write stream?", answer: "pipe", points: 3 },
    ],,
{
    slug: "manipulacao-de-caminhos",
    title: "Manipulacao de Caminhos",
    order: 86,
    points: 5,
    bodyMd: `# Path Manipulation

Work with file paths using \`xs:path\`.

## Path Operations

\`\`\`xs
import { join, resolve, dirname, basename, extname } from "xs:path"

CRIA full = join("pasta", "sub", "arquivo.xs")
CRIA abs = resolve("./relativo.txt")
CRIA dir = dirname("/a/b/c.txt")  // /a/b
CRIA base = basename("/a/b/c.txt") // c.txt
CRIA ext = extname("arquivo.xs")   // .xs
\`\`\`

## Platform Independence

\`join\` uses the correct separator for the platform:

\`\`\`xs
// Windows: pasta\sub\arquivo
// Linux: pasta/sub/arquivo
CRIA path = join("pasta", "sub", "arquivo")
\`\`\`

## Relative Paths

\`\`\`xs
import { relative } from "xs:path"
CRIA rel = relative("/a/b/c", "/a/d/e")  // ../../d/e
\`\`\`

Always use \`xs:path\` instead of string concatenation for paths.`,
    challenges: [
      { question: "What module provides path utilities?", answer: "xs:path", points: 3 },
      { question: "What function joins path segments?", answer: "join", points: 3 },
      { question: "Why use join instead of string concatenation?", answer: "for platform-independent path separators", points: 3 },
    ],,
{
    slug: "operacoes-com-diretorios",
    title: "Operacoes com Diretorios",
    order: 87,
    points: 5,
    bodyMd: `# Directory Operations

List, create, and remove directories.

## List Directory

\`\`\`xs
import { readdir } from "xs:fs"

CRIA arquivos = readdir("./pasta")
PARA CADA (arquivo EM arquivos) {
  SOLTA O GRITO(arquivo)
}
\`\`\`

## Recursive Listing

\`\`\`xs
import { glob } from "xs:fs"

CRIA todos = glob("src/**/*.xs")
SOLTA O GRITO(todos)  // all .xs files recursively
\`\`\`

## Remove Directory

\`\`\`xs
import { rmdir, remove } from "xs:fs"

rmdir("pasta-vazia")
remove("pasta-com-tudo")  // recursive remove
\`\`\`

## Watch Directory

\`\`\`xs
import { watch } from "xs:fs"

watch("./src", (evento, arquivo) => {
  SOLTA O GRITO(arquivo + " foi " + evento)
})
\`\`\`

Directory operations support building tools like file watchers and build systems.`,
    challenges: [
      { question: "What function lists a directory?", answer: "readdir", points: 3 },
      { question: "What function finds files by pattern?", answer: "glob", points: 3 },
      { question: "What function watches for file changes?", answer: "watch", points: 3 },
    ],,
{
    slug: "arquivos-temporarios",
    title: "Arquivos Temporarios",
    order: 88,
    points: 5,
    bodyMd: `# Temporary Files

Create and manage temporary files.

## Temp File

\`\`\`xs
import { tmpFile, tmpDir } from "xs:fs"

CRIA arquivo = tmpFile({ prefix: "meuapp-", suffix: ".txt" })
arquivo.escreve("dados temporarios")
// arquivo.caminho -> /tmp/meuapp-XXXXX.txt
\`\`\`

## Temp Directory

\`\`\`xs
CRIA dir = tmpDir({ prefix: "build-" })
// dir.caminho -> /tmp/build-XXXXX/
\`\`\`

## Auto Cleanup

\`\`\`xs
CHAMA ESSE CARA processarArquivo() {
  CRIA tmp = tmpFile()
  TENTE {
    // use file
  } FINALLY {
    tmp.remove()  // clean up
  }
}
\`\`\`

Temporary files isolate operations and prevent permanent clutter.`,
    challenges: [
      { question: "What function creates a temporary file?", answer: "tmpFile", points: 3 },
      { question: "Should you clean up temporary files?", answer: "yes, in FINALLY block", points: 3 },
      { question: "What option sets the filename prefix?", answer: "prefix", points: 3 },
    ],,
{
    slug: "codificacao-de-arquivos",
    title: "Codificacao de Arquivos",
    order: 89,
    points: 5,
    bodyMd: `# File Encodings

Handle different text encodings.

## Encoding Options

\`\`\`xs
import { readFile } from "xs:fs"

CRIA utf8 = readFile("texto.txt", "utf8")
CRIA latin1 = readFile("antigo.txt", "latin1")
CRIA bin = readFile("dados.bin", "binary")
\`\`\`

## Binary Data

\`\`\`xs
CRIA buffer = readFile("imagem.png", "binary")
SOLTA O GRITO(buffer.length)  // bytes
\`\`\`

## Writing with Encoding

\`\`\`xs
writeFile("saida.txt", "Conteudo", "utf8")
writeFile("saida.bin", Buffer.de([0xFF, 0xFE]), "binary")
\`\`\`

## BOM Handling

UTF-8 BOM is automatically stripped on read, added on write.

## Detecting Encoding

\`\`\`xs
import { detectEncoding } from "xs:fs"
CRIA enc = detectEncoding("arquivo.txt")
\`\`\`

Using the correct encoding prevents data corruption with special characters.`,
    challenges: [
      { question: "What encoding is default for text files?", answer: "utf8", points: 3 },
      { question: "What mode reads raw bytes?", answer: "binary", points: 3 },
      { question: "What function detects file encoding?", answer: "detectEncoding", points: 3 },
    ],,
{
    slug: "basico-de-assincrono-com-prometa",
    title: "Basico de Assincrono com PROMETA",
    order: 90,
    points: 5,
    bodyMd: `# Async Basics

Promises in XanaScript use \`PROMETA\` (promise).

## Creating a Promise

\`\`\`xs
CRIA promessa = PROMETA.novo((resolver, rejeitar) => {
  SE LIGA SO (sucesso) {
    resolver("Funcionou!")
  } SENAO {
    rejeitar("Falhou!")
  }
})
\`\`\`

## Consuming

\`\`\`xs
promessa
  .entao((valor) => { SOLTA O GRITO(valor) })
  .captura((erro) => { SOLTA O GRITO(erro) })
\`\`\`

## Promise States

- \`Pendente\`: initial state
- \`Resolvida\`: completed successfully
- \`Rejeitada\`: failed

\`PROMETA\` enables non-blocking async operations.`,
    challenges: [
      { question: "What class creates promises?", answer: "PROMETA", points: 3 },
      { question: "What method handles success?", answer: "entao", points: 3 },
      { question: "What method handles failure?", answer: "captura", points: 3 },
    ],,
{
    slug: "async-await",
    title: "Async/Await",
    order: 91,
    points: 10,
    bodyMd: `# Async/Await

Write async code that reads like synchronous code.

## Async Function

\`\`\`xs
CHAMA ESSE CARA ASSINCRONO buscarDados() {
  CRIA resposta = await fetch("https://api.exemplo.com")
  CRIA dados = await resposta.json()
  VOLTA dados
}
\`\`\`

## Await

\`await\` pauses execution until the promise resolves:

\`\`\`xs
CHAMA ESSE CARA ASSINCRONO main() {
  SOLTA O GRITO("Iniciando...")
  CRIA resultado = await operacaoLenta()
  SOLTA O GRITO("Concluido: " + resultado)
}
\`\`\`

## Error Handling

\`\`\`xs
CHAMA ESSE CARA ASSINCRONO seguro() {
  TENTE {
    CRIA r = await operacaoRiscada()
    SOLTA O GRITO(r)
  } CAPTURA (e) {
    SOLTA O GRITO("Erro: " + e)
  }
}
\`\`\`

\`await\` can only be used in \`ASSINCRONO\` functions.`,
    challenges: [
      { question: "What keyword makes a function async?", answer: "ASSINCRONO", points: 3 },
      { question: "What keyword awaits a promise?", answer: "await", points: 3 },
      { question: "Can await be used in non-async functions?", answer: "no", points: 3 },
    ],,
{
    slug: "execucao-paralela",
    title: "Execucao Paralela",
    order: 92,
    points: 10,
    bodyMd: `# Parallel Execution

Run multiple async operations concurrently.

## Promise.all

\`\`\`xs
CRIA [a, b, c] = await PROMETA.tudo([
  buscarUsuario(1),
  buscarUsuario(2),
  buscarUsuario(3)
])
\`\`\`

## Promise.allSettled

Wait for all, regardless of failures:

\`\`\`xs
CRIA resultados = await PROMETA.tudoResolvido([
  operacao1(),
  operacao2()
])

PARA CADA (r EM resultados) {
  SE LIGA SO (r.status == "resolvida") {
    SOLTA O GRITO(r.valor)
  } SENAO {
    SOLTA O GRITO("Falhou: " + r.motivo)
  }
}
\`\`\`

## Promise.race

First to resolve/reject wins:

\`\`\`xs
CRIA resultado = await PROMETA.corrida([
  buscarDados(),
  timeout(5000)
])
\`\`\`

Parallel execution speeds up independent operations.`,
    challenges: [
      { question: "What function waits for all promises?", answer: "PROMETA.tudo", points: 3 },
      { question: "What function waits for all regardless of outcome?", answer: "PROMETA.tudoResolvido", points: 5 },
      { question: "What function returns the first settled promise?", answer: "PROMETA.corrida", points: 3 },
    ],,
{
    slug: "fila-assincrona",
    title: "Fila Assincrona & Throttling",
    order: 93,
    points: 10,
    bodyMd: `# Async Queue

Control concurrency with queues.

## Simple Queue

\`\`\`xs
CLASSE Fila {
  PRIVADO CRIA _tarefas = []
  PRIVADO CRIA _emProgresso = 0
  PRIVADO CRIA _limite

  CHAMA ESSE CARA init(limite = 5) { ISTO._limite = limite }

  CHAMA ESSE CARA adicionar(fn) {
    VOLTA PROMETA.novo((resolver) => {
      ISTO._tarefas.empurra({ fn, resolver })
      ISTO._processar()
    })
  }

  PRIVADO CHAMA ESSE CARA _processar() {
    ENQUANTO (ISTO._emProgresso < ISTO._limite E ISTO._tarefas.tamanho > 0) {
      CRIA { fn, resolver } = ISTO._tarefas.tira()
      ISTO._emProgresso += 1
      fn().entao((r) => {
        ISTO._emProgresso -= 1
        resolver(r)
        ISTO._processar()
      })
    }
  }
}
\`\`\`

Limiting concurrency prevents overwhelming resources.`,
    challenges: [
      { question: "What is a queue used for in async?", answer: "controlling concurrency", points: 3 },
      { question: "Why limit concurrent operations?", answer: "to prevent overwhelming resources", points: 5 },
    ],,
{
    slug: "timers-e-intervalos",
    title: "Timers & Intervalos",
    order: 94,
    points: 5,
    bodyMd: `# Timers & Intervals

Schedule delayed or repeated execution.

## setTimeout

\`\`\`xs
import { setTimeout } from "xs:timers"

CRIA timer = setTimeout(() => {
  SOLTA O GRITO("Passaram 2 segundos")
}, 2000)
\`\`\`

## setInterval

\`\`\`xs
CRIA contador = 0
CRIA intervalo = setInterval(() => {
  contador += 1
  SOLTA O GRITO("Tick: " + contador)

  SE LIGA SO (contador >= 5) {
    clearInterval(intervalo)
  }
}, 1000)
\`\`\`

## Promise-Based Delay

\`\`\`xs
CHAMA ESSE CARA ASSINCRONO esperar(ms) {
  VOLTA PROMETA.novo((resolver) => setTimeout(resolver, ms))
}

await esperar(3000)
\`\`\`

## Clearing

\`\`\`xs
clearTimeout(timer)
clearInterval(intervalo)
\`\`\`

Always clear timers when no longer needed.`,
    challenges: [
      { question: "What function schedules a one-time callback?", answer: "setTimeout", points: 3 },
      { question: "What function schedules repeated callbacks?", answer: "setInterval", points: 3 },
      { question: "How do you stop an interval?", answer: "clearInterval", points: 3 },
    ],,
{
    slug: "web-workers",
    title: "Web Workers / Threads",
    order: 95,
    points: 10,
    bodyMd: `# Web Workers

Run CPU-intensive tasks in separate threads.

## Creating a Worker

\`\`\`xs
import { Worker } from "xs:workers"

CRIA worker = Worker.novo("./heavy-task.xs")

worker.em("mensagem", (dados) => {
  SOLTA O GRITO("Resultado: " + dados)
})

worker.envia({ acao: "processar", dados: [...] })
\`\`\`

## Worker File

\`\`\`xs
// heavy-task.xs
self.em("mensagem", (msg) => {
  CRIA resultado = executarTarefaPesada(msg.dados)
  self.envia(resultado)
})
\`\`\`

## Thread Pool

\`\`\`xs
import { ThreadPool } from "xs:workers"

CRIA pool = ThreadPool.novo(4)  // 4 threads
CRIA resultados = await pool.executar(
  itens,
  (item) => processar(item)
)
\`\`\`

Workers enable true parallelism for CPU-bound work.`,
    challenges: [
      { question: "What module provides workers?", answer: "xs:workers", points: 3 },
      { question: "How do workers communicate?", answer: "via mensagem events / envia()", points: 3 },
      { question: "Why use a thread pool?", answer: "to limit concurrent threads and reuse them", points: 5 },
    ],,
{
    slug: "emissor-de-eventos",
    title: "Emissor de Eventos",
    order: 96,
    points: 5,
    bodyMd: `# Event Emitter

Publish/subscribe pattern for decoupled communication.

## Creating Emitter

\`\`\`xs
import { EventEmitter } from "xs:events"

CRIA emissor = EventEmitter.novo()

emissor.em("dados", (payload) => {
  SOLTA O GRITO("Recebido: " + payload)
})

emissor.emite("dados", { id: 1, nome: "Maria" })
\`\`\`

## Once

\`\`\`xs
emissor.once("conexao", () => {
  SOLTA O GRITO("Primeira conexao (unica vez)")
})
\`\`\`

## Remove Listener

\`\`\`xs
CHAMA ESSE CARA handler(d) { SOLTA O GRITO(d) }
emissor.em("evento", handler)
emissor.removeListener("evento", handler)
\`\`\`

## Custom Events

\`\`\`xs
CLASSE MeuServico EXTENDE EventEmitter {
  CHAMA ESSE CARA buscarDados() {
    // ... fetch data ...
    ISTO.emite("completo", dados)
  }
}
\`\`\`

Event emitters enable loose coupling between components.`,
    challenges: [
      { question: "What method subscribes to an event?", answer: "em", points: 3 },
      { question: "What method emits an event?", answer: "emite", points: 3 },
      { question: "What method subscribes for a single event?", answer: "once", points: 3 },
    ],,
{
    slug: "padroes-assincronos",
    title: "Padroes Assincronos",
    order: 97,
    points: 10,
    bodyMd: `# Async Patterns

Common patterns for robust async code.

## Retry with Backoff

\`\`\`xs
CHAMA ESSE CARA ASSINCRONO tentarComBackoff(fn, maxTentativas = 3) {
  PARA CADA (i EM 1..maxTentativas) {
    TENTE {
      VOLTA await fn()
    } CAPTURA (e) {
      SE LIGA SO (i == maxTentativas) { JOGAR e }
      await esperar(1000 * Math.pow(2, i))
    }
  }
}
\`\`\`

## Timeout

\`\`\`xs
CHAMA ESSE CARA ASSINCRONO comTimeout(promessa, ms) {
  CRIA timeout = PROMETA.novo((_, rej) =>
    setTimeout(() => rej("Timeout"), ms)
  )
  VOLTA PROMETA.corrida([promessa, timeout])
}
\`\`\`

## Sequential vs Parallel

\`\`\`xs
// Sequential (slower, ordered)
PARA CADA (item EM items) {
  CRIA r = await processar(item)
}

// Parallel (faster, unordered)
CRIA resultados = await PROMETA.tudo(
  items.mapa((item) => processar(item))
)
\`\`\`

Choose the right pattern for your use case.`,
    challenges: [
      { question: "What is exponential backoff?", answer: "increasing delay between retries", points: 3 },
      { question: "How do you add a timeout to a promise?", answer: "Promise.race with a rejection timer", points: 5 },
      { question: "When should you use parallel execution?", answer: "when order does not matter", points: 3 },
    ],,
{
    slug: "tipos-uniao",
    title: "Tipos Uniao",
    order: 98,
    points: 5,
    bodyMd: `# Union Types

A value can be one of several types.

## Union Syntax

\`\`\`xs
CRIA id: NUMERO | TEXTO = 42
id = "abc123"  // also valid
\`\`\`

## Type Narrowing

\`\`\`xs
CHAMA ESSE CARA processarId(id: NUMERO | TEXTO) {
  SE LIGA SO (TIPO(id) == NUMERO) {
    SOLTA O GRITO("Numerico: " + id)
  } SENAO {
    SOLTA O GRITO("Texto: " + id)
  }
}
\`\`\`

## Union in Function Params

\`\`\`xs
CHAMA ESSE CARA exibir(valor: TEXTO | NUMERO | BOOLEANO) {
  SOLTA O GRITO(TEXTO(valor))
}
\`\`\`

## Pattern Matching with Unions

\`\`\`xs
COMBINA (id) {
  CASO TIPO NUMERO => buscaPorNumero(id)
  CASO TIPO TEXTO => buscaPorTexto(id)
}
\`\`\`

Unions express "this or that" without class hierarchies.`,
    challenges: [
      { question: "What operator creates a union type?", answer: "|", points: 3 },
      { question: "What technique checks which union variant?", answer: "type narrowing / TIPO()", points: 3 },
      { question: "How do you match union variants?", answer: "COMBINA with CASO TIPO", points: 5 },
    ],,
{
    slug: "tipos-intersecao",
    title: "Tipos Intersecao",
    order: 99,
    points: 5,
    bodyMd: `# Intersection Types

Combine multiple types into one.

## Intersection Syntax

\`\`\`xs
CRIA obj: TipoA & TipoB = {
  // must have all properties of both
}
\`\`\`

## Named Intersection

\`\`\`xs
TIPO UsuarioAdmin = Usuario & Admin

CRIA user: UsuarioAdmin = {
  // from Usuario
  nome: "Maria",
  email: "maria@email.com",
  // from Admin
  permissoes: ["ler", "escrever"],
  nivel: 5
}
\`\`\`

## Mixin Pattern

\`\`\`xs
TIPO ComNome = { nome: TEXTO }
TIPO ComIdade = { idade: NUMERO }
TIPO Pessoa = ComNome & ComIdade
\`\`\`

## Intersection vs Inheritance

Intersection is structural — no class hierarchy needed. More flexible for composing behaviors.

Use \`&\` to merge type requirements.`,
    challenges: [
      { question: "What operator creates an intersection type?", answer: "&", points: 3 },
      { question: "What keyword defines a type alias?", answer: "TIPO", points: 3 },
      { question: "Is intersection structural or nominal?", answer: "structural", points: 3 },
    ],,
{
    slug: "genericos",
    title: "Genericos",
    order: 100,
    points: 10,
    bodyMd: `# Generics

Parameterize types with type variables.

## Generic Function

\`\`\`xs
CHAMA ESSE CARA primeiro<T>(lista: LISTA<T>): T | null {
  SE LIGA SO (lista.tamanho > 0) { VOLTA lista[0] }
  VOLTA null
}

CRIA n = primeiro<NUMERO>([1, 2, 3])
CRIA s = primeiro<TEXTO>(["a", "b"])
\`\`\`

## Generic Class

\`\`\`xs
CLASSE Caixa<T> {
  CRIA conteudo: T

  CHAMA ESSE CARA init(valor: T) { ISTO.conteudo = valor }
  PEGA valor(): T { VOLTA ISTO.conteudo }
}

CRIA cx = Caixa<NUMERO>.novo(42)
SOLTA O GRITO(cx.valor)
\`\`\`

## Constraints

\`\`\`xs
TIPO Comparavel = { CHAMA ESSE CARA comparar(outro): NUMERO }

CHAMA ESSE CARA max<T: Comparavel>(a: T, b: T): T {
  VOLTA a.comparar(b) > 0 ? a : b
}
\`\`\`

Generics enable type-safe reusable code.`,
    challenges: [
      { question: "What syntax declares a generic type parameter?", answer: "<T>", points: 3 },
      { question: "Can you constrain type parameters?", answer: "yes, with T: Constraint", points: 5 },
      { question: "What is a benefit of generics?", answer: "type-safe reusable code", points: 3 },
    ],,
{
    slug: "tipos-mapeados",
    title: "Tipos Mapeados",
    order: 101,
    points: 10,
    bodyMd: `# Mapped Types

Transform types by mapping over their properties.

## Making Properties Optional

\`\`\`xs
TIPO Opcional<T> = {
  [K EM chaves<T>]?: T[K]
}

CRIA user: Opcional<Usuario> = {}  // all optional
\`\`\`

## Readonly

\`\`\`xs
TIPO Imutavel<T> = {
  readonly [K EM chaves<T>]: T[K]
}
\`\`\`

## Property Value Transformation

\`\`\`xs
TIPO ComoTexto<T> = {
  [K EM chaves<T>]: TEXTO
}
\`\`\`

## Practical Use

\`\`\`xs
TIPO FormErrors<T> = {
  [K EM chaves<T>]: TEXTO | null
}
\`\`\`

Mapped types reduce boilerplate in type definitions.`,
    challenges: [
      { question: "What syntax maps over type keys?", answer: "[K in chaves<T>]", points: 3 },
      { question: "Can you make all properties optional with a mapped type?", answer: "yes", points: 5 },
      { question: "What keyword makes properties readonly?", answer: "readonly", points: 3 },
    ],,
{
    slug: "tipos-condicionais",
    title: "Tipos Condicionais",
    order: 102,
    points: 10,
    bodyMd: `# Conditional Types

Types that depend on a condition.

## Basic Conditional

\`\`\`xs
TIPO TipoResultado<T> = T EXTENDE NUMERO ? "numerico" : "outro"

CRIA a: TipoResultado<NUMERO>  // "numerico"
CRIA b: TipoResultado<TEXTO>   // "outro"
\`\`\`

## Nested Conditions

\`\`\`xs
TIPO TipoExato<T> =
  T EXTENDE NUMERO ? "numero" :
  T EXTENDE TEXTO ? "texto" :
  T EXTENDE BOOLEANO ? "booleano" :
  "outro"
\`\`\`

## Extract Array Type

\`\`\`xs
TIPO TipoElemento<T> = T EXTENDE LISTA<infer U> ? U : T

CRIA a: TipoElemento<LISTA<NUMERO>>  // NUMERO
CRIA b: TipoElemento<TEXTO>          // TEXTO
\`\`\`

## Practical: Function Return Type

\`\`\`xs
TIPO Retorno<T> = T EXTENDE CHAMA ESSE CARA (...args: any[]) => infer R ? R : never
\`\`\`

Conditional types enable high-level type transformations.`,
    challenges: [
      { question: "What syntax checks a type condition?", answer: "T EXTENDE U ? A : B", points: 3 },
      { question: "What keyword infers a type in a conditional?", answer: "infer", points: 5 },
      { question: "What is a practical use of conditional types?", answer: "extracting return types or element types", points: 3 },
    ],,
{
    slug: "tipos-literais-de-template",
    title: "Tipos Literais de Template",
    order: 103,
    points: 10,
    bodyMd: `# Template Literal Types

Create string types from templates.

## Basic Template

\`\`\`xs
TIPO Saudacao = "ola, " + TEXTO
CRIA msg: Saudacao = "ola, Maria"  // OK
\`\`\`

## Union Combinations

\`\`\`xs
TIPO Evento = "click" | "focus" | "blur"
TIPO Handler = "on" + Evento  // "onclick" | "onfocus" | "onblur"
\`\`\`

## Pattern Matching

\`\`\`xs
TIPO MatchEvento<T> = T EXTENDE \`on\${infer E}\` ? E : never

CRIA tipo: MatchEvento<"onclick">  // "click"
\`\`\`

## Validation Use

\`\`\`xs
TIPO Rota = \`/\${TEXTO}/\${TEXTO}
CRIA r: Rota = "/usuario/42"  // OK
\`\`\`

Template literal types enable compile-time string validation.`,
    challenges: [
      { question: "What types can template literal types work with?", answer: "string types and unions", points: 3 },
      { question: "Can template literal types parse string patterns?", answer: "yes, with infer", points: 5 },
      { question: "What is a use case?", answer: "type-safe event handlers and routes", points: 3 },
    ],,
{
    slug: "tipos-marcados",
    title: "Tipos Marcados / Nominais",
    order: 104,
    points: 10,
    bodyMd: `# Branded Types

Simulate nominal typing with brands.

## Brand Pattern

\`\`\`xs
TIPO UserId = TEXTO & { readonly __brand: "UserId" }
TIPO ProductId = TEXTO & { readonly __brand: "ProductId" }

CHAMA ESSE CARA criarUserId(id: TEXTO): UserId {
  VOLTA id as UserId
}

CHAMA ESSE CARA buscarUsuario(id: UserId) { ... }
CHAMA ESSE CARA buscarProduto(id: ProductId) { ... }
\`\`\`

## Safety

\`\`\`xs
CRIA uid = criarUserId("abc")
CRIA pid = "xyz" as ProductId

buscarUsuario(uid)   // OK
buscarUsuario(pid)   // Type error!
\`\`\`

## When to Use

- IDs of different entities
- Currency amounts (Dolar vs Euro)
- Units (Metros vs Centimetros)

Branded types prevent mixing semantically different values of the same primitive type.`,
    challenges: [
      { question: "What technique creates nominal typing?", answer: "brand pattern with __brand", points: 3 },
      { question: "Can you pass a ProductId where UserId is expected?", answer: "no, type error", points: 5 },
      { question: "When are branded types useful?", answer: "distinguishing IDs, currencies, units", points: 3 },
    ],,
{
    slug: "operador-satisfaz",
    title: "Operador Satisfaz",
    order: 105,
    points: 10,
    bodyMd: `# Satisfies Operator

Check a value satisfies a type without widening.

## Basic Usage

\`\`\`xs
CRIA config = {
  host: "localhost",
  port: 3000
} SATISFAZ Config

// config.host type is "localhost" literal, not TEXTO
// config.port type is 3000 literal, not NUMERO
\`\`\`

## Without Satisfies

\`\`\`xs
CRIA config: Config = {
  host: "localhost",  // type widens to TEXTO
  port: 3000          // type widens to NUMERO
}
\`\`\`

## Benefits

- Preserves literal types for inference
- Validates shape matches interface
- Enables narrower types elsewhere

\`SATISFAZ\` gives you the best of both worlds: validation + narrow types.`,
    challenges: [
      { question: "What operator checks a type without widening?", answer: "SATISFAZ", points: 3 },
      { question: "What is the benefit over type annotation?", answer: "preserves literal types", points: 5 },
      { question: "Does SATISFAZ validate the shape?", answer: "yes", points: 3 },
    ],,
{
    slug: "reflexao-com-tipo-e-reflete",
    title: "Reflexao com TIPO & REFLETE",
    order: 106,
    points: 5,
    bodyMd: `# Reflection

Inspect types and properties at runtime.

## TIPO() Function

\`\`\`xs
CRIA x = 42
SOLTA O GRITO(TIPO(x))  // NUMERO

CRIA s = "texto"
SOLTA O GRITO(TIPO(s))  // TEXTO
\`\`\`

## REFLETE Module

\`\`\`xs
import { typeInfo, properties, methods } from "xs:reflect"

CRIA info = typeInfo(MinhaClasse)
SOLTA O GRITO(info.nome)      // MinhaClasse
SOLTA O GRITO(info.propriedades)
SOLTA O GRITO(info.metodos)
\`\`\`

## Property Inspection

\`\`\`xs
CRIA props = properties(objeto)
PARA CADA (p EM props) {
  SOLTA O GRITO(p.nome + ": " + p.tipo)
}
\`\`\`

## Check Inheritance

\`\`\`xs
CRIA ehFilho = REFLETE.extends(Cachorro, Animal)
\`\`\`

Reflection enables tools like serializers, ORMs, and DI containers.`,
    challenges: [
      { question: "What function returns a values type?", answer: "TIPO", points: 3 },
      { question: "What module provides reflection?", answer: "xs:reflect", points: 3 },
      { question: "What function checks class inheritance?", answer: "REFLETE.extends", points: 5 },
    ],,
{
    slug: "proxies",
    title: "Proxies",
    order: 107,
    points: 10,
    bodyMd: `# Proxies

Intercept operations on objects.

## Creating a Proxy

\`\`\`xs
import { Proxy } from "xs:reflect"

CRIA alvo = { nome: "Maria" }
CRIA manipulador = {
  PEGA: (obj, prop) => {
    SOLTA O GRITO("Acessando: " + prop)
    VOLTA obj[prop]
  },
  COLOCA: (obj, prop, valor) => {
    SOLTA O GRITO("Modificando: " + prop + " = " + valor)
    obj[prop] = valor
    VOLTA true
  }
}

CRIA proxy = Proxy.novo(alvo, manipulador)
SOLTA O GRITO(proxy.nome)  // Acessando: nome -> Maria
proxy.idade = 30            // Modificando: idade = 30
\`\`\`

## Use Cases

- Logging
- Validation
- Lazy loading
- Reactive programming

Proxies enable metaprogramming without modifying the original object.`,
    challenges: [
      { question: "What class creates an interception layer?", answer: "Proxy", points: 3 },
      { question: "What trap intercepts property reads?", answer: "PEGA (get)", points: 3 },
      { question: "What is a common proxy use case?", answer: "logging, validation, lazy loading", points: 3 },
    ],,
{
    slug: "decoradores",
    title: "Decoradores",
    order: 108,
    points: 10,
    bodyMd: `# Decorators

Annotate and modify classes, methods, and properties.

## Method Decorator

\`\`\`xs
CHAMA ESSE CARA logMetodo(alvo, nome, descritor) {
  CRIA original = descritor.valor
  descritor.valor = (...args) => {
    SOLTA O GRITO("Chamando " + nome)
    VOLTA original(...args)
  }
  VOLTA descritor
}

CLASSE Servico {
  @logMetodo
  CHAMA ESSE CARA processar() {
    SOLTA O GRITO("Processando...")
  }
}
\`\`\`

## Class Decorator

\`\`\`xs
CHAMA ESSE CARA selavel(alvo) {
  alvo.selado = true
}

@selavel
CLASSE Config { ... }
\`\`\`

## Property Decorator

\`\`\`xs
CHAMA ESSE CARA obrigatorio(alvo, nome) {
  // validate property
}
\`\`\`

Decorate with the \`@\` syntax. Decorators are functions that receive metadata.`,
    challenges: [
      { question: "What syntax applies a decorator?", answer: "@nomeDoDecorator", points: 3 },
      { question: "Can decorators modify method behavior?", answer: "yes, via the descriptor", points: 5 },
      { question: "What are decorators useful for?", answer: "logging, validation, metadata", points: 3 },
    ],,
{
    slug: "simbolos",
    title: "Simbolos & Metaprogramacao",
    order: 109,
    points: 10,
    bodyMd: `# Symbols

Unique, immutable identifiers for metaprogramming.

## Creating Symbols

\`\`\`xs
CRIA SIMBOLO id = SIMBOLO()
CRIA SIMBOLO chave = SIMBOLO("descricao")
\`\`\`

## Well-Known Symbols

\`\`\`xs
CRIA SIMBOLO iterator = SIMBOLO.iterator
CRIA SIMBOLO toString = SIMBOLO.toStringTag
\`\`\`

## Hidden Properties

\`\`\`xs
CRIA SIMBOLO _privado = SIMBOLO()

CRIA obj = {
  [_privado]: "secreto",
  publico: "visivel"
}

SOLTA O GRITO(obj.publico)    // visivel
SOLTA O GRITO(obj[_privado])  // secreto (if you have the symbol)
\`\`\`

## Custom Iteration

\`\`\`xs
CLASSE Colecao {
  CRIA items = []

  CHAMA ESSE CARA [SIMBOLO.iterator]() {
    VOLTA ISTO.items.iterator()
  }
}
\`\`\`

Symbols prevent property name collisions.`,
    challenges: [
      { question: "What function creates a symbol?", answer: "SIMBOLO", points: 3 },
      { question: "Can symbol-keyed properties be accessed by string?", answer: "no", points: 3 },
      { question: "What well-known symbol controls iteration?", answer: "SIMBOLO.iterator", points: 5 },
    ],,
{
    slug: "geracao-de-codigo",
    title: "Geracao de Codigo",
    order: 110,
    points: 10,
    bodyMd: `# Code Generation

Generate XanaScript code programmatically.

## AST Building

\`\`\`xs
import { AST } from "xs:compiler"

CRIA programa = AST.Programa({
  corpo: [
    AST.Expressao({
      tipo: "ChamadaFuncao",
      nome: "SOLTA O GRITO",
      args: [AST.Literal("Ola gerado!")]
    })
  ]
})
\`\`\`

## Generate Source

\`\`\`xs
import { generate } from "xs:compiler"

CRIA codigo = generate(programa)
// SOLTA O GRITO("Ola gerado!")
\`\`\`

## Compile String

\`\`\`xs
import { compile } from "xs:compiler"

CRIA bytecode = compile("CRIA x = 42")
\`\`\`

## Eval

\`\`\`xs
import { eval } from "xs:runtime"

CRIA resultado = eval("1 + 2")
// 3
\`\`\`

Code generation enables macros and build tools.`,
    challenges: [
      { question: "What module provides AST building?", answer: "xs:compiler", points: 3 },
      { question: "What function generates source from AST?", answer: "generate", points: 3 },
      { question: "What function compiles a string?", answer: "compile", points: 3 },
    ],,
{
    slug: "serializacao",
    title: "Serializacao",
    order: 111,
    points: 10,
    bodyMd: `# Serialization

Convert objects to and from different formats.

## JSON Serialization

\`\`\`xs
CRIA objeto = { nome: "Maria", idade: 30 }
CRIA json = JSON.serializa(objeto)
CRIA deVolta = JSON.parse(json)
\`\`\`

## Custom Serialization

\`\`\`xs
CLASSE Usuario {
  CRIA nome, senha

  CHAMA ESSE CARA paraJSON() {
    VOLTA {
      nome: ISTO.nome,
      // exclude senha from serialization
    }
  }
}
\`\`\`

## YAML

\`\`\`xs
import { parse, serialize } from "xs:yaml"
CRIA dados = parse(yamlString)
\`\`\`

## Binary Serialization

\`\`\`xs
import { encode, decode } from "xs:binary"

CRIA buffer = encode(objeto)
CRIA original = decode(buffer)
\`\`\`

## Custom Format

Implement \`paraJSON\` on classes to control serialization.`,
    challenges: [
      { question: "What function serializes to JSON?", answer: "JSON.serializa", points: 3 },
      { question: "How do you customize serialization?", answer: "implement paraJSON method", points: 3 },
      { question: "What modules handle non-JSON formats?", answer: "xs:yaml, xs:binary", points: 3 },
    ],,
{
    slug: "anotacoes-e-metadados",
    title: "Anotacoes de Tipo & Metadados",
    order: 112,
    points: 10,
    bodyMd: `# Type Annotations & Metadata

Access and manipulate type metadata.

## Runtime Type Info

\`\`\`xs
CHAMA ESSE CARA mostrarTipo(valor) {
  CRIA tipo = TIPO(valor)

  COMBINA (tipo) {
    CASO NUMERO => SOLTA O GRITO("E um numero")
    CASO TEXTO => SOLTA O GRITO("E um texto")
    CASO _ => SOLTA O GRITO("Tipo: " + tipo)
  }
}
\`\`\`

## instanceof

\`\`\`xs
SE LIGA SO (objeto INSTANCIA DE Classe) {
  // object is instance
}
\`\`\`

## Metadata Annotations

\`\`\`xs
import { Metadata } from "xs:reflect"

CLASSE Controller {
  @Metadata({ rota: "/api/users", metodo: "GET" })
  CHAMA ESSE CARA listar() { ... }
}
\`\`\`

## Reading Metadata

\`\`\`xs
CRIA meta = Metadata.get(Controller.prototype, "listar")
SOLTA O GRITO(meta.rota)  // /api/users
\`\`\`

Metadata enables frameworks and decorator-based architectures.`,
    challenges: [
      { question: "What operator checks instanceof?", answer: "INSTANCIA DE", points: 3 },
      { question: "How do you attach metadata?", answer: "@Metadata({...}) decorator", points: 5 },
      { question: "What function reads metadata?", answer: "Metadata.get", points: 3 },
    ],,
{
    slug: "metaprogramacao-avancada",
    title: "Metaprogramacao Avancada",
    order: 113,
    points: 10,
    bodyMd: `# Advanced Metaprogramming

Techniques for dynamic code behavior.

## Dynamic Dispatch

\`\`\`xs
CRIA metodos = {
  soma: (a, b) => a + b,
  mult: (a, b) => a * b
}

CRIA operacao = "soma"
CRIA resultado = metodos[operacao](2, 3)  // 5
\`\`\`

## Method Missing

\`\`\`xs
CLASSE Delegador {
  CHAMA ESSE CARA metodoFaltando(nome, args) {
    SOLTA O GRITO("Metodo '" + nome + "' nao existe")
  }
}
\`\`\`

## Object Extend

\`\`\`xs
CRIA base = { a: 1 }
CRIA extensao = { b: 2 }
CRIA combinado = { ...base, ...extensao }  // { a: 1, b: 2 }
\`\`\`

## Function Composition

\`\`\`xs
CHAMA ESSE CARA compor(...fns) {
  VOLTA (x) => fns.reduz((acc, fn) => fn(acc), x)
}

CRIA fn = compor((x) => x * 2, (x) => x + 1)
SOLTA O GRITO(fn(5))  // 11
\`\`\`

Metaprogramming enables flexible, dynamic architectures.`,
    challenges: [
      { question: "What pattern dispatches methods dynamically?", answer: "dynamic dispatch with object lookup", points: 3 },
      { question: "What operator spreads object properties?", answer: "...", points: 3 },
      { question: "What is a benefit of metaprogramming?", answer: "flexible, dynamic architectures", points: 3 },
    ],,
{
    slug: "gerenciamento-de-memoria",
    title: "Gerenciamento de Memoria",
    order: 114,
    points: 5,
    bodyMd: `# Memory Management

XanaScript uses automatic garbage collection.

## GC Strategy

Generational garbage collection:
- Young generation: frequent, small collections
- Old generation: infrequent, full collections

## Allocation

\`\`\`xs
CRIA obj = { dados: "..." }  // heap allocated
CRIA num = 42                  // stack allocated (small ints)
\`\`\`

## GC Hints

\`\`\`xs
import { gc } from "xs:runtime"

gc.coletar()          // force collection
gc.desabilitar()      // pause GC
gc.habilitar()        // resume GC
\`\`\`

## Weak References

\`\`\`xs
import { WeakRef } from "xs:runtime"

CRIA ref = WeakRef.novo(objeto)
CRIA obj = ref.deref()  // null if collected
\`\`\`

Understanding GC helps optimize memory-intensive applications.`,
    challenges: [
      { question: "What strategy does the GC use?", answer: "generational collection", points: 3 },
      { question: "Are small integers stack or heap allocated?", answer: "stack", points: 3 },
      { question: "What is a WeakRef?", answer: "a reference that does not prevent GC", points: 5 },
    ],,
{
    slug: "prevencao-de-vazamentos",
    title: "Prevencao de Vazamentos de Memoria",
    order: 115,
    points: 10,
    bodyMd: `# Memory Leak Prevention

Common leaks and how to avoid them.

## Event Listener Leaks

\`\`\`xs
// Bad: listener never removed
CRIA emissor = EventEmitter.novo()
emissor.em("dados", handler)

// Good: remove when done
emissor.removeListener("dados", handler)
\`\`\`

## Closure Leaks

\`\`\`xs
CHAMA ESSE CARA criarGrande() {
  CRIA grande = alocarGrande()  // held by closure

  VOLTA () => {
    SOLTA O GRITO("usando closure")
    // reference to grande keeps it alive
  }
}
\`\`\`

## Timer Leaks

\`\`\`xs
CRIA timer = setInterval(() => {
  // ...
}, 1000)

// Always clear when done
clearInterval(timer)
\`\`\`

## Circular References

\`\`\`xs
// Modern GC handles cycles
// But break explicit refs when possible
objeto.ref = null
\`\`\`

Use heap snapshots and profiling tools to detect leaks.`,
    challenges: [
      { question: "What causes event listener leaks?", answer: "listeners not removed", points: 3 },
      { question: "What causes closure leaks?", answer: "large objects captured in closure scope", points: 5 },
      { question: "How do you prevent timer leaks?", answer: "clearInterval/clearTimeout when done", points: 3 },
    ],,
{
    slug: "perfilamento",
    title: "Perfilamento",
    order: 116,
    points: 10,
    bodyMd: `# Profiling

Measure and analyze performance.

## Timing

\`\`\`xs
import { now, hrTime } from "xs:runtime"

CRIA inicio = hrTime()
// ... code to measure ...
CRIA fim = hrTime()
SOLTA O GRITO("Durou: " + (fim - inicio) + "ns")
\`\`\`

## Built-in Profiler

\`\`\`xs
import { profiler } from "xs:runtime"

profiler.iniciar()
// ... code ...
CRIA relatorio = profiler.parar()
SOLTA O GRITO(relatorio)
\`\`\`

## Memory Profile

\`\`\`xs
import { memory } from "xs:runtime"

CRIA uso = memory.usado()
SOLTA O GRITO("Heap: " + uso.heap + " bytes")
SOLTA O GRITO("Objetos: " + uso.objetos)
\`\`\`

## Profiling Compiler Output

\`\`\`xs
xs run --profile meu-arquivo.xs
\`\`\`

Profile before optimizing to focus on actual bottlenecks.`,
    challenges: [
      { question: "What function returns high-resolution time?", answer: "hrTime", points: 3 },
      { question: "What command profiles execution?", answer: "xs run --profile", points: 3 },
      { question: "What should you do before optimizing?", answer: "profile to find actual bottlenecks", points: 5 },
    ],,
{
    slug: "tecnicas-de-otimizacao",
    title: "Tecnicas de Otimizacao",
    order: 117,
    points: 10,
    bodyMd: `# Optimization Techniques

Write performant XanaScript code.

## Loop Optimization

\`\`\`xs
// Slow: property lookup each iteration
PARA CADA (i EM 0..arr.tamanho-1) { ... }

// Fast: cache length
CRIA len = arr.tamanho
PARA CADA (i EM 0..len-1) { processar(arr[i]) }
\`\`\`

## Avoid Allocations in Loops

\`\`\`xs
// Bad: creates new object each iteration
PARA CADA (i EM 0..10000) {
  CRIA tmp = { a: i, b: i * 2 }
}

// Good: reuse
CRIA tmp = { a: 0, b: 0 }
PARA CADA (i EM 0..10000) {
  tmp.a = i
  tmp.b = i * 2
}
\`\`\`

## Type Stability

Keep variable types consistent (helps JIT):

\`\`\`xs
// Stable
CRIA x = 0
PARA CADA (i EM 0..100) { x += i }

// Unstable (deoptimizes)
CRIA y = 0
PARA CADA (i EM 0..100) { y = i > 50 ? i : "texto" }
\`\`\`

## Use Native Methods

Built-in methods are optimized in C++: prefer them over manual loops.`,
    challenges: [
      { question: "Should you allocate objects inside loops?", answer: "no, reuse when possible", points: 3 },
      { question: "Why keep variable types consistent?", answer: "avoids JIT deoptimization", points: 5 },
      { question: "Are native methods faster than manual loops?", answer: "yes", points: 3 },
    ],,
{
    slug: "otimizacoes-do-compilador",
    title: "Otimizacoes do Compilador",
    order: 118,
    points: 10,
    bodyMd: `# Compiler Optimizations

What the XanaScript compiler does automatically.

## Constant Folding

\`\`\`xs
CRIA x = 5 * 10   // compiled as: CRIA x = 50
\`\`\`

## Dead Code Elimination

\`\`\`xs
CHAMA ESSE CARA teste() {
  VOLTA 1
  SOLTA O GRITO("nunca executado")  // removed
}
\`\`\`

## Inlining

Small functions are inlined at call sites:

\`\`\`xs
CHAMA ESSE CARA dobro(x) { VOLTA x * 2 }
CRIA r = dobro(5)  // compiled as: CRIA r = 5 * 2
\`\`\`

## Loop Unrolling

\`\`\`xs
// Short loops are unrolled
PARA CADA (i EM 0..3) { arr[i] = i }
// becomes:
// arr[0] = 0; arr[1] = 1; arr[2] = 2; arr[3] = 3;
\`\`\`

## Integer Inference

\`NUMERO\` without decimals is inferred as integer, enabling integer-only optimizations.`,
    challenges: [
      { question: "What optimization evaluates expressions at compile time?", answer: "constant folding", points: 3 },
      { question: "What optimization removes unreachable code?", answer: "dead code elimination", points: 3 },
      { question: "What optimization replaces function calls with body?", answer: "inlining", points: 3 },
    ],,
{
    slug: "otimizacao-de-memoria",
    title: "Otimizacao de Memoria",
    order: 119,
    points: 10,
    bodyMd: `# Memory Optimization

Reduce memory usage.

## Object Pooling

\`\`\`xs
CLASSE Pool<T> {
  CRIA _disponiveis = []
  CRIA _fabrica

  CHAMA ESSE CARA init(fabrica) { ISTO._fabrica = fabrica }

  CHAMA ESSE CARA adquirir() {
    SE LIGA SO (ISTO._disponiveis.tamanho > 0) {
      VOLTA ISTO._disponiveis.tira()
    }
    VOLTA ISTO._fabrica()
  }

  CHAMA ESSE CARA devolver(obj) {
    ISTO._disponiveis.empurra(obj)
  }
}
\`\`\`

## Typed Arrays

\`\`\`xs
import { Int32Array, Float64Array } from "xs:binary"

CRIA buffer = Int32Array.novo(1000)  // contiguous, no overhead
\`\`\`

## Lazy Initialization

\`\`\`xs
PEGA dadosCaros() {
  SE LIGA SO (!ISTO._cache) {
    ISTO._cache = calcularDados()
  }
  VOLTA ISTO._cache
}
\`\`\`

## Data Structure Choice

- Lists: general purpose
- Typed arrays: numeric data, low overhead
- Objects with predefined keys: faster than dictionaries`,
    challenges: [
      { question: "What pattern reuses objects?", answer: "object pooling", points: 3 },
      { question: "What data structure is best for numeric arrays?", answer: "Int32Array / Float64Array", points: 5 },
      { question: "When should you use lazy initialization?", answer: "for expensive operations not always needed", points: 3 },
    ],,
{
    slug: "performance-assincrona",
    title: "Performance Assincrona",
    order: 120,
    points: 10,
    bodyMd: `# Async Performance

Optimize asynchronous code.

## Avoid Promise Overhead

\`\`\`xs
// Bad: unnecessary promise wrapper
CHAMA ESSE CARA ASSINCRONO getValor() {
  VOLTA 42  // unnecessary async
}

// Good: sync is fine
CHAMA ESSE CARA getValor() {
  VOLTA 42
}
\`\`\`

## Batch Processing

\`\`\`xs
// Slow: one at a time
PARA CADA (item EM items) {
  await processar(item)
}

// Fast: parallel with limit
CRIA pool = Fila.novo(5)
await PROMETA.tudo(items.mapa((i) => pool.adicionar(() => processar(i))))
\`\`\`

## Avoid Promise.all with Too Many

\`\`\`xs
// Bad: 10000 concurrent promises
await PROMETA.tudo(itens.mapa(processar))

// Good: chunked
PARA CADA (lote EM chunk(itens, 100)) {
  await PROMETA.tudo(lote.mapa(processar))
}
\`\`\`

## Microtask Queues

Await yields to the microtask queue — use for splitting CPU work.`,
    challenges: [
      { question: "Should you mark sync functions as async?", answer: "no, avoid unnecessary async", points: 3 },
      { question: "What is a risk of PROMETA.tudo with many items?", answer: "excessive concurrent execution", points: 5 },
      { question: "How do you limit async concurrency?", answer: "queue with batch processing", points: 3 },
    ],,
{
    slug: "melhores-praticas-de-performance",
    title: "Melhores Praticas de Performance",
    order: 121,
    points: 10,
    bodyMd: `# Performance Best Practices

Summary guidelines for performant code.

## 1. Measure First

Never guess — profile to find real bottlenecks.

## 2. Avoid Premature Optimization

Write clean code first, then optimize bottlenecks.

## 3. Minimize Allocations

- Reuse objects
- Pool expensive resources
- Use stack-allocated types when possible

## 4. Choose Right Data Structures

\`\`\`xs
// Frequent lookups: DICIONARIO
CRIA dict = {}

// Order matters: LISTA
CRIA list = []

// Unique values: CONJUNTO
CRIA set = CONJUNTO{}
\`\`\`

## 5. Batch I/O

- Read/write in chunks
- Use streams for large files
- Buffer network operations

## 6. Leverage Compiler Optimizations

Write idiomatic code — the compiler optimizes common patterns.

Consistent, measurable optimization beats guesswork.`,
    challenges: [
      { question: "What is the first step in optimization?", answer: "measure/profile to find bottlenecks", points: 3 },
      { question: "Should you optimize before measuring?", answer: "no, avoid premature optimization", points: 3 },
      { question: "Should you batch I/O operations?", answer: "yes", points: 3 },
    ],,
{
    slug: "testes-com-teste",
    title: "Testes com TESTE",
    order: 122,
    points: 5,
    bodyMd: `# Testing Basics

XanaScript has a built-in test framework.

## Test Syntax

\`\`\`xs
TESTE "soma de dois numeros" {
  CRIA resultado = 2 + 3
  AFIRMA(resultado == 5)
}
\`\`\`

## Assertions

\`\`\`xs
AFIRMA(condicao)              // assert truthy
AFIRMA.igual(2 + 2, 4)       // assert equal
AFIRMA.diferente(1, 2)       // assert not equal
AFIRMA.verdadeiro(true)      // assert true
AFIRMA.falso(false)          // assert false
AFIRMA.nulo(null)            // assert null
AFIRMA.existe(objeto)        // assert not null
\`\`\`

## Running Tests

\`\`\`bash
xs test
xs test --watch
xs test --coverage
\`\`\`

\`TESTE\` is a built-in keyword, not a library function.`,
    challenges: [
      { question: "What keyword defines a test?", answer: "TESTE", points: 3 },
      { question: "What keyword makes an assertion?", answer: "AFIRMA", points: 3 },
      { question: "What command runs tests?", answer: "xs test", points: 3 },
    ],,
{
    slug: "afirmacoes-avancadas",
    title: "Afirmacoes Avancadas",
    order: 123,
    points: 5,
    bodyMd: `# Advanced Assertions

More assertion patterns.

## Approximate Equality

\`\`\`xs
AFIRMA.proximo(3.14159, 3.14, 0.01)  // within tolerance
\`\`\`

## Throws

\`\`\`xs
AFIRMA.joga(() => {
  dividir(1, 0)
}, "Divisao por zero")
\`\`\`

## Arrays & Objects

\`\`\`xs
AFIRMA.contem([1, 2, 3], 2)
AFIRMA.naoContem([1, 2, 3], 4)

AFIRMA.profundamenteIgual(
  { a: 1, b: { c: 2 } },
  { a: 1, b: { c: 2 } }
)
\`\`\`

## Custom Messages

\`\`\`xs
AFIRMA(temPerfil, "Usuario deve ter perfil")
\`\`\`

## Negation

\`\`\`xs
AFIRMA.nao().igual(1 + 1, 3)
\`\`\`

Good assertions produce clear failure messages.`,
    challenges: [
      { question: "What assertion checks values within tolerance?", answer: "AFIRMA.proximo", points: 3 },
      { question: "What assertion checks an error is thrown?", answer: "AFIRMA.joga", points: 3 },
      { question: "What assertion deeply compares objects?", answer: "AFIRMA.profundamenteIgual", points: 5 },
    ],,
{
    slug: "estrutura-de-testes",
    title: "Estrutura & Organizacao de Testes",
    order: 124,
    points: 5,
    bodyMd: `# Test Structure

Organize tests for maintainability.

## Test Blocks

\`\`\`xs
TESTE "Calculadora" {
  TESTE "soma" {
    AFIRMA.igual(soma(2, 3), 5)
    AFIRMA.igual(soma(-1, 1), 0)
  }

  TESTE "divisao" {
    AFIRMA.igual(dividir(10, 2), 5)
    AFIRMA.joga(() => dividir(1, 0))
  }
}
\`\`\`

## Setup & Teardown

\`\`\`xs
TESTE "Banco de dados" {
  ANTES DE CADA {
    CRIA db = conectar()
  }

  DEPOIS DE CADA {
    db.fechar()
  }

  TESTE "inserir usuario" {
    db.inserir({ nome: "Teste" })
    AFIRMA.igual(db.contar(), 1)
  }
}
\`\`\`

\`ANTES DE CADA\` runs before each nested test. \`DEPOIS DE CADA\` runs after.`,
    challenges: [
      { question: "What block runs before each test?", answer: "ANTES DE CADA", points: 3 },
      { question: "What block runs after each test?", answer: "DEPOIS DE CADA", points: 3 },
      { question: "Can tests be nested?", answer: "yes", points: 3 },
    ],,
{
    slug: "mocks-e-stubs",
    title: "Mocks & Stubs",
    order: 125,
    points: 10,
    bodyMd: `# Mocks & Stubs

Isolate units under test.

## Mock Function

\`\`\`xs
import { mock } from "xs:test"

CRIA fn = mock.fn()
fn("a", "b")

AFIRMA.igual(fn.chamadas.tamanho, 1)
AFIRMA.igual(fn.chamadas[0].args, ["a", "b"])
\`\`\`

## Mock Return Values

\`\`\`xs
CRIA fn = mock.fn(() => 42)
AFIRMA.igual(fn(), 42)
\`\`\`

## Mock Module

\`\`\`xs
mock.modulo("./database.xs", {
  buscar: () => PROMETA.resolvida({ id: 1 }),
  salvar: mock.fn()
})
\`\`\`

## Spy

\`\`\`xs
CRIA spy = mock.espia(objeto, "metodo")
objeto.metodo()
AFIRMA.igual(spy.chamadas.tamanho, 1)
\`\`\`

Mocks isolate code from external dependencies.`,
    challenges: [
      { question: "What creates a mock function?", answer: "mock.fn", points: 3 },
      { question: "What function spies on an existing method?", answer: "mock.espia", points: 3 },
      { question: "What module provides mocking?", answer: "xs:test", points: 3 },
    ],,
{
    slug: "cobertura-de-codigo",
    title: "Cobertura de Codigo",
    order: 126,
    points: 10,
    bodyMd: `# Code Coverage

Measure which code is exercised by tests.

## Running Coverage

\`\`\`bash
xs test --coverage
\`\`\`

## Coverage Metrics

- **Statements**: lines executed
- **Branches**: if/else paths taken
- **Functions**: function calls made
- **Lines**: line-level execution

## Coverage Report

\`\`\`
File             | % Stmts | % Branch | % Funcs | % Lines
----------------|---------|----------|---------|--------
src/math.xs     |   95.45 |    88.89 |     100 |   95.45
src/user.xs     |   82.35 |    75.00 |   66.67 |   82.35
----------------|---------|----------|---------|--------
Total           |   90.12 |    83.33 |   88.89 |   90.12
\`\`\`

## Coverage Thresholds

\`\`\`bash
xs test --coverage --min-coverage 80
\`\`\`

Aim for high coverage but remember: 100% coverage doesn't mean bug-free.`,
    challenges: [
      { question: "What command runs tests with coverage?", answer: "xs test --coverage", points: 3 },
      { question: "Name one coverage metric", answer: "statements / branches / functions / lines", points: 3 },
      { question: "Does 100% coverage guarantee no bugs?", answer: "no", points: 3 },
    ],,
{
    slug: "testes-baseados-em-propriedades",
    title: "Testes Baseados em Propriedades",
    order: 127,
    points: 10,
    bodyMd: `# Property-Based Testing

Test properties that should always hold.

## Basic Property

\`\`\`xs
TESTE "soma e comutativa" {
  TESTA TODO { a: NUMERO, b: NUMERO }
  AFIRMA.igual(soma(a, b), soma(b, a))
}
\`\`\`

## Generators

\`\`\`xs
import { gerar } from "xs:test"

TESTE "inversao de lista" {
  TESTA TODO {
    lista: gerar.lista(gerar.numero(), { minLen: 1 })
  }

  CRIA invertida = lista.inverter()
  CRIA deVolta = invertida.inverter()
  AFIRMA.profundamenteIgual(lista, deVolta)
}
\`\`\`

## Shrinking

When a property fails, the test runner shrinks to the minimal failing case.

## Benefits

- Finds edge cases you didn't think of
- Tests behaviors, not hardcoded examples
- Documented invariants

Property tests complement example-based tests.`,
    challenges: [
      { question: "What keyword starts a property test?", answer: "TESTA TODO", points: 3 },
      { question: "What is shrinking?", answer: "finding the minimal failing case", points: 5 },
      { question: "What is a benefit of property tests?", answer: "finds unexpected edge cases", points: 3 },
    ],,
{
    slug: "testes-de-integracao",
    title: "Testes de Integracao",
    order: 128,
    points: 10,
    bodyMd: `# Integration Testing

Test components working together.

## API Tests

\`\`\`xs
TESTE "API de usuarios" {
  CRIA app = criarApp()
  CRIA resposta = await app.get("/api/usuarios")

  AFIRMA.igual(resposta.status, 200)
  AFIRMA.igual(resposta.json().tamanho, 3)
}
\`\`\`

## Database Tests

\`\`\`xs
TESTE "repositorio de usuarios" {
  ANTES DE CADA {
    CRIA db = criarDBTeste()
    CRIA repo = RepositorioUsuario.novo(db)
  }

  DEPOIS DE CADA {
    db.limpar()
    db.fechar()
  }

  TESTE "cria e busca usuario" {
    CRIA user = await repo.criar({ nome: "Teste" })
    CRIA encontrado = await repo.buscar(user.id)
    AFIRMA.igual(encontrado.nome, "Teste")
  }
}
\`\`\`

## Test Doubles

Use real dependencies in integration tests, mocks in unit tests.`,
    challenges: [
      { question: "What is integration testing?", answer: "testing components working together", points: 3 },
      { question: "Should you use mocks in integration tests?", answer: "no, use real dependencies", points: 5 },
      { question: "What should you do in DEPOIS DE CADA for DB tests?", answer: "clean up data and close connection", points: 3 },
    ],,
{
    slug: "tdd-e-estrategias",
    title: "TDD & Estrategias de Teste",
    order: 129,
    points: 10,
    bodyMd: `# TDD & Testing Strategies

Test-Driven Development workflow.

## Red-Green-Refactor

1. **Red**: Write a failing test first
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while tests stay green

## Testing Pyramid

\`\`\`
    /\
   /  \     E2E (few)
  /    \
 /------\   Integration (some)
/--------\
/----------\ Unit (many)
\`\`\`

## What to Test

- Core business logic (highest ROI)
- Edge cases and boundaries
- Error paths
- Public API (not internals)

## What Not to Test

- Boilerplate code
- Third-party behavior
- Implementation details

Write tests that give confidence to refactor.`,
    challenges: [
      { question: "What are the three steps of TDD?", answer: "Red, Green, Refactor", points: 3 },
      { question: "What type of test should be most numerous?", answer: "unit tests", points: 3 },
      { question: "Should you test private methods?", answer: "no, test public API", points: 5 },
    ],,
{
    slug: "introducao-ao-orm",
    title: "Introducao ao ORM TABELA",
    order: 130,
    points: 5,
    bodyMd: `# TABELA ORM

XanaScript has a built-in ORM with first-class syntax.

## Model Definition

\`\`\`xs
TABELA Usuario {
  CAMPO nome: TEXTO
  CAMPO email: TEXTO
  CAMPO idade: NUMERO
  CAMPO ativo: BOOLEANO = true
}
\`\`\`

## CRUD Operations

\`\`\`xs
// Create
CRIA user = Usuario.criar({ nome: "Maria", email: "m@e.com" })

// Read
CRIA encontrado = Usuario.buscar(user.id)

// Update
encontrado.atualizar({ nome: "Mariana" })

// Delete
encontrado.deletar()
\`\`\`

## Powered by

The ORM generates SQL or NoSQL queries behind the scenes.

\`TABELA\` is a language keyword, not a library.`,
    challenges: [
      { question: "What keyword defines an ORM model?", answer: "TABELA", points: 3 },
      { question: "What keyword defines a field?", answer: "CAMPO", points: 3 },
      { question: "Is TABELA a library or a language feature?", answer: "language feature", points: 3 },
    ],,
{
    slug: "campos-e-opcoes",
    title: "Tipos & Opcoes de Campo",
    order: 131,
    points: 5,
    bodyMd: `# Field Types & Options

Configure model fields with constraints.

## Field Types

\`\`\`xs
TABELA Produto {
  CAMPO id: NUMERO { chave: true }
  CAMPO nome: TEXTO { obrigatorio: true }
  CAMPO preco: NUMERO { min: 0 }
  CAMPO descricao: TEXTO?  // optional
  CAMPO criadoEm: DATA { padrao: DataAgora }
}
\`\`\`

## Options

| Option | Description |
|--------|-------------|
| \`chave\` | Primary key |
| \`obrigatorio\` | NOT NULL |
| \`unico\` | UNIQUE constraint |
| \`padrao\` | Default value |
| \`min\`/\`max\` | Numeric range |
| \`ref\` | Foreign key reference |

## Auto Fields

\`criadoEm\` and \`atualizadoEm\` can be auto-managed.`,
    challenges: [
      { question: "What option marks a field as primary key?", answer: "chave: true", points: 3 },
      { question: "What option sets a default value?", answer: "padrao", points: 3 },
      { question: "What option makes a field required?", answer: "obrigatorio: true", points: 3 },
    ],,
{
    slug: "consultas",
    title: "Consultas de Dados",
    order: 132,
    points: 10,
    bodyMd: `# Querying Data

Filter, sort, and paginate data.

## Basic Queries

\`\`\`xs
// All records
CRIA todos = Usuario.todos()

// Filter
CRIA ativos = Usuario.ondetem({ ativo: true })

// First match
CRIA admin = Usuario.acha({ perfil: "admin" })
\`\`\`

## Complex Filters

\`\`\`xs
CRIA resultados = Usuario.ondetem({
  idade: { $gte: 18 },
  nome: { $contem: "Silva" },
  ativo: true
})
\`\`\`

## Sorting & Pagination

\`\`\`xs
CRIA pagina = Usuario.ondetem({ ativo: true })
  .ordena({ nome: "asc" })
  .pular(0)
  .limite(10)
\`\`\`

## Aggregation

\`\`\`xs
CRIA media = Usuario.media("idade")
CRIA total = Usuario.contar({ ativo: true })
\`\`\``,
    challenges: [
      { question: "What method returns all records?", answer: "todos", points: 3 },
      { question: "What method filters records?", answer: "ondetem", points: 3 },
      { question: "What method limits results?", answer: "limite", points: 3 },
    ],,
{
    slug: "relacionamentos",
    title: "Relacionamentos",
    order: 133,
    points: 10,
    bodyMd: `# Relationships

Define relationships between models.

## Belongs To

\`\`\`xs
TABELA Post {
  CAMPO titulo: TEXTO
  CAMPO autorId: NUMERO { ref: Usuario }

  RELACAO autor: Usuario {
    tipo: pertenceA
    chave: autorId
  }
}
\`\`\`

## Has Many

\`\`\`xs
TABELA Usuario {
  CAMPO nome: TEXTO

  RELACAO posts: Post[] {
    tipo: temMuitos
    chaveEstrangeira: autorId
  }
}
\`\`\`

## Many to Many

\`\`\`xs
TABELA Aluno {
  RELACAO cursos: Curso[] {
    tipo: temMuitos
    atraves: Matricula
  }
}
\`\`\`

## Accessing Relations

\`\`\`xs
CRIA posts = usuario.posts  // lazy load
CRIA posts = await usuario.posts.carregar()  // eager load
\`\`\``,
    challenges: [
      { question: "What keyword defines a relationship?", answer: "RELACAO", points: 3 },
      { question: "What type is a foreign key relationship?", answer: "pertenceA", points: 3 },
      { question: "Can relations be lazy loaded?", answer: "yes", points: 3 },
    ],,
{
    slug: "migracoes",
    title: "Migracoes",
    order: 134,
    points: 10,
    bodyMd: `# Migrations

Manage database schema changes.

## Auto Migration

\`\`\`xs
xs db migrate
\`\`\`

XanaScript infers schema from \`TABELA\` definitions.

## Manual Migration

\`\`\`xs
// migrations/001_criar_usuarios.xs
MIGRACAO criarUsuarios {
  PARA CIMA {
    TABELA Usuario {
      CAMPO id: NUMERO { chave: true }
      CAMPO nome: TEXTO { obrigatorio: true }
      CAMPO email: TEXTO { unico: true }
    }
  }

  PARA BAIXO {
    REMOVER TABELA Usuario
  }
}
\`\`\`

## Running Migrations

\`\`\`bash
xs db migrate        # apply pending
xs db migrate --rollback  # revert last
xs db migrate --status    # show status
\`\`\`

Migrations keep database schema versioned and reproducible.`,
    challenges: [
      { question: "What command runs migrations?", answer: "xs db migrate", points: 3 },
      { question: "What block defines the forward migration?", answer: "PARA CIMA", points: 3 },
      { question: "What block defines the rollback?", answer: "PARA BAIXO", points: 3 },
    ],,
{
    slug: "semeadura",
    title: "Semeadura de Banco de Dados",
    order: 135,
    points: 10,
    bodyMd: `# Database Seeding

Populate database with test or initial data.

## Seed Script

\`\`\`xs
// seeds/desenvolvimento.xs
SEMEADOR dadosIniciais {
  ANTES {
    Usuario.deletarTudo()
  }

  SEMEAR {
    CRIA admin = Usuario.criar({
      nome: "Admin",
      email: "admin@email.com",
      perfil: "admin"
    })

    CRIA user = Usuario.criar({
      nome: "Maria",
      email: "maria@email.com"
    })

    Post.criar({
      titulo: "Bem-vindo",
      conteudo: "Primeiro post!",
      autorId: admin.id
    })
  }
}
\`\`\`

## Running Seeds

\`\`\`bash
xs db seed
xs db seed --env producao
\`\`\`

Seeds provide consistent starting data for development and testing.`,
    challenges: [
      { question: "What keyword defines a seeder?", answer: "SEMEADOR", points: 3 },
      { question: "What block inserts data?", answer: "SEMEAR", points: 3 },
      { question: "What block runs before seeding?", answer: "ANTES", points: 3 },
    ],,
{
    slug: "transacoes",
    title: "Transacoes",
    order: 136,
    points: 10,
    bodyMd: `# Transactions

Ensure data consistency across operations.

## Basic Transaction

\`\`\`xs
TRANSACAO {
  CRIA conta = Conta.buscar(contaId)
  conta.atualizar({ saldo: conta.saldo - 100 })

  CRIA destino = Conta.buscar(destinoId)
  destino.atualizar({ saldo: destino.saldo + 100 })
}
// Auto-committed on success, rolled back on error
\`\`\`

## Manual Control

\`\`\`xs
CRIA tx = TRANSACAO.iniciar()
TENTE {
  tx.executar(() => {
    contaDebitar(100)
    contaCreditar(100)
  })
  tx.confirmar()
} CAPTURA (e) {
  tx.reverter()
  JOGAR e
}
\`\`\`

## Nested Transactions

Savepoints for partial rollback:

\`\`\`xs
TRANSACAO {
  operacao1()
  TRANSACAO {
    operacao2()  // can rollback independently
  }
}
\`\`\`

Transactions maintain database integrity.`,
    challenges: [
      { question: "What keyword starts a transaction?", answer: "TRANSACAO", points: 3 },
      { question: "What method commits a transaction?", answer: "confirmar", points: 3 },
      { question: "What method rolls back?", answer: "reverter", points: 3 },
    ],,
{
    slug: "performance-do-orm",
    title: "Performance do ORM",
    order: 137,
    points: 10,
    bodyMd: `# ORM Performance

Optimize database operations.

## N+1 Problem

\`\`\`xs
// BAD: N+1 queries
PARA CADA (post EM Post.todos()) {
  SOLTA O GRITO(post.autor)  // extra query each iteration
}

// GOOD: eager load
PARA CADA (post EM Post.todos().incluir("autor")) {
  SOLTA O GRITO(post.autor)  // already loaded
}
\`\`\`

## Batch Operations

\`\`\`xs
// BAD: individual inserts
PARA CADA (item EM items) {
  Item.criar(item)
}

// GOOD: batch insert
Item.inserirVarios(items)
\`\`\`

## Indexing

\`\`\`xs
TABELA Usuario {
  CAMPO email: TEXTO { unico: true, indice: true }
  CAMPO nome: TEXTO { indice: true }
}
\`\`\`

## Query Optimization

- Select only needed fields
- Use pagination
- Avoid N+1 with eager loading
- Index query columns`,
    challenges: [
      { question: "What problem causes extra queries in loops?", answer: "N+1 problem", points: 3 },
      { question: "What method prevents N+1?", answer: "incluir (eager loading)", points: 3 },
      { question: "What helps query performance?", answer: "indexes on queried columns", points: 3 },
    ],,
{
    slug: "introducao-ao-wasm",
    title: "Introducao ao WASM",
    order: 138,
    points: 5,
    bodyMd: `# Introduction to WebAssembly

XanaScript can compile directly to WebAssembly.

## Why WASM?

- Near-native performance
- Run in browsers, servers, embedded devices
- Deterministic execution

## Compiling to WASM

\`\`\`bash
xs build --target wasm entrada.xs -o saida.wasm
\`\`\`

## XanaScript to WASM

\`\`\`xs
// fib.xs — compiles to WASM
CHAMA ESSE CARA fib(n) {
  SE LIGA SO (n <= 1) { VOLTA n }
  VOLTA fib(n - 1) + fib(n - 2)
}

// Export for WASM
EXPORTA fib
\`\`\`

## Running WASM

\`\`\`js
// JavaScript host
const wasm = await WebAssembly.instantiateStreaming(
  fetch("fib.wasm")
)
console.log(wasm.instance.exports.fib(10))
\`\`\`

Direct WASM emission, no Emscripten required.`,
    challenges: [
      { question: "What flag compiles to WASM?", answer: "--target wasm", points: 3 },
      { question: "What keyword exports a function for WASM?", answer: "EXPORTA", points: 3 },
      { question: "Does XanaScript require Emscripten for WASM?", answer: "no", points: 3 },
    ],,
{
    slug: "memoria-wasm",
    title: "Gerenciamento de Memoria WASM",
    order: 139,
    points: 10,
    bodyMd: `# WASM Memory

Manage linear memory in WebAssembly.

## Memory Declaration

\`\`\`xs
MEMORIA 1  // 1 page (64KB)
MEMORIA 10 // 10 pages (640KB)
\`\`\`

## Reading/Writing Memory

\`\`\`xs
CRIA offset = 0
CRIA valor = 42

MEMORIA.ESCREVER_INT32(offset, valor)
CRIA lido = MEMORIA.LER_INT32(offset)
\`\`\`

## String Operations

\`\`\`xs
CHAMA ESSE CARA escreverString(ptr, texto) {
  PARA CADA (i EM 0..texto.tamanho) {
    MEMORIA.ESCREVER_INT8(ptr + i, texto.charCodeAt(i))
  }
  MEMORIA.ESCREVER_INT8(ptr + texto.tamanho, 0)  // null terminator
}
\`\`\`

## Grow Memory

\`\`\`xs
MEMORIA.CRESCER(5)  // add 5 pages
CRIA paginas = MEMORIA.PAGINAS()  // current page count
\`\`\`

Manual memory control enables zero-overhead data structures.`,
    challenges: [
      { question: "What keyword declares WASM memory?", answer: "MEMORIA", points: 3 },
      { question: "What is the page size?", answer: "64KB", points: 3 },
      { question: "What function grows WASM memory?", answer: "MEMORIA.CRESCER", points: 3 },
    ],,
{
    slug: "importacoes-exportacoes-wasm",
    title: "Importacoes & Exportacoes WASM",
    order: 140,
    points: 10,
    bodyMd: `# WASM Imports & Exports

Call host functions from WASM and expose functions to host.

## Exports

\`\`\`xs
EXPORTA soma
EXPORTA multiplicar

CHAMA ESSE CARA soma(a, b) { VOLTA a + b }
CHAMA ESSE CARA multiplicar(a, b) { VOLTA a * b }
\`\`\`

## Imports

\`\`\`xs
IMPORTA "env" "log" como log

CHAMA ESSE CARA main() {
  log(42)  // calls host env.log function
}
\`\`\`

## Import Module

\`\`\`xs
IMPORTA "js" "console.log" como jsLog

CHAMA ESSE CARA renderizar() {
  jsLog("Renderizando...")
}
\`\`\`

## Host Integration

\`\`\`js
WebAssembly.instantiate(wasm, {
  env: {
    log: (x) => console.log(x)
  },
  js: {
    "console.log": (msg) => console.log(msg)
  }
})
\`\`\`

Imports/exports are the bridge between WASM and host.`,
    challenges: [
      { question: "What keyword exposes a WASM function?", answer: "EXPORTA", points: 3 },
      { question: "What keyword imports a host function?", answer: "IMPORTA", points: 3 },
      { question: "How does the host provide imported functions?", answer: "via the imports object in instantiate", points: 5 },
    ],,
{
    slug: "tipos-e-conversao-wasm",
    title: "Tipos & Conversao WASM",
    order: 141,
    points: 10,
    bodyMd: `# WASM Types

WASM supports only i32, i64, f32, f64 natively.

## Supported Types

\`\`\`xs
// Direct WASM types
CRIA a: I32 = 42
CRIA b: I64 = 10000000000n
CRIA c: F32 = 3.14
CRIA d: F64 = 3.1415926535
\`\`\`

## Type Conversion

\`\`\`xs
CRIA i = I32(3.14)     // 3 (truncate)
CRIA f = F64(42)       // 42.0

CRIA ptr = I32(heapPtr)  // pointers are i32
\`\`\`

## Function Signatures

\`\`\`xs
CHAMA ESSE CARA processar(
  ptr: I32,
  len: I32,
  flag: I32
): I32 {
  // WASM-compatible signature
}
\`\`\`

## Limitations

- No strings, objects, or closures in WASM exports
- Pass primitives or pointers to linear memory
- Strings must be manually encoded/decoded

Understanding WASM types avoids runtime conversion overhead.`,
    challenges: [
      { question: "What are the native WASM integer types?", answer: "I32 and I64", points: 3 },
      { question: "Can you pass strings directly to WASM exports?", answer: "no, use pointers to linear memory", points: 5 },
      { question: "What function converts to 32-bit integer?", answer: "I32", points: 3 },
    ],,
{
    slug: "otimizacao-wasm",
    title: "Otimizacao WASM",
    order: 142,
    points: 10,
    bodyMd: `# WASM Optimization

Optimize XanaScript code for WASM output.

## Avoid Dynamic Features

\`\`\`xs
// SLOW in WASM: dynamic dispatch
CRIA fn = metodos[nome]

// FAST in WASM: direct call
SE LIGA SO (nome == "soma") { fn = soma }
SE LIGA SO (nome == "mult") { fn = mult }
\`\`\`

## Use Local Variables

\`\`\`xs
// FAST: locals are in registers
CHAMA ESSE CARA sum(n) {
  CRIA total = 0
  PARA CADA (i EM 0..n) { total += i }
  VOLTA total
}
\`\`\`

## Minimize Memory Access

\`\`\`xs
// SLOW: reading/writing linear memory
CRIA val = MEMORIA.LER_INT32(ptr)
MEMORIA.ESCREVER_INT32(ptr, val + 1)

// FAST: use local variables
CRIA val = carregarValor()
val += 1
\`\`\`

## Optimize Flags

\`\`\`bash
xs build --target wasm --optimize tamanho
xs build --target wasm --optimize velocidade
\`\`\`

WASM benefits from predictable, simple code patterns.`,
    challenges: [
      { question: "What is faster in WASM: direct call or dynamic dispatch?", answer: "direct call", points: 3 },
      { question: "What compiler flag optimizes for speed?", answer: "--optimize velocidade", points: 3 },
      { question: "Where are local variables stored in WASM?", answer: "in registers (locals)", points: 5 },
    ],,
{
    slug: "depuracao-wasm",
    title: "Depuracao WASM",
    order: 143,
    points: 10,
    bodyMd: `# Debugging WASM

Debug WebAssembly modules.

## Source Maps

\`\`\`bash
xs build --target wasm --source-map entrada.xs
\`\`\`

## Logging

\`\`\`xs
IMPORTA "env" "log" como log

CHAMA ESSE CARA debug(valor) {
  log(valor)  // appears in host console
}
\`\`\`

## Return Error Codes

\`\`\`xs
CHAMA ESSE CARA dividir(a, b): I32 {
  SE LIGA SO (b == 0) { VOLTA -1 }  // error code
  VOLTA a / b
}
\`\`\`

## WASM Tools

\`\`\`bash
# Validate wasm
wasm-validate saida.wasm

# View WAT (text format)
wasm2wat saida.wasm -o saida.wat

# Run with debug
xs run --target wasm --debug entrada.xs
\`\`\`

Debugging WASM requires host-side tooling and careful error handling.`,
    challenges: [
      { question: "What flag generates source maps?", answer: "--source-map", points: 3 },
      { question: "What tool converts WASM to text format?", answer: "wasm2wat", points: 3 },
      { question: "How do you signal errors in WASM?", answer: "return error codes", points: 3 },
    ],,
{
    slug: "integracao-wasm",
    title: "Integracao de Runtime WASM",
    order: 144,
    points: 10,
    bodyMd: `# WASM Runtime

Embed WASM in different environments.

## Browser

\`\`\`js
const wasm = await WebAssembly.instantiateStreaming(
  fetch("app.wasm"),
  imports
)
wasm.instance.exports.main()
\`\`\`

## Node.js

\`\`\`js
const fs = require("fs")
const wasm = new WebAssembly.Module(fs.readFileSync("app.wasm"))
const instance = new WebAssembly.Instance(wasm, imports)
instance.exports.main()
\`\`\`

## WASI (System Interface)

\`\`\`xs
// WASI-compatible XanaScript
import { fd_write } from "wasi:fd"

CHAMA ESSE CARA main() {
  fd_write(1, "Ola WASI!\n")
}
\`\`\`

\`\`\`bash
xs build --target wasm --wasi entrada.xs
wasmtime saida.wasm
\`\`\`

WASI enables system calls (files, networking) from WASM.`,
    challenges: [
      { question: "What is WASI?", answer: "WebAssembly System Interface", points: 3 },
      { question: "Can WASM run in the browser?", answer: "yes", points: 3 },
      { question: "What runtime runs WASI modules?", answer: "wasmtime", points: 3 },
    ],,
{
    slug: "melhores-praticas-wasm",
    title: "Melhores Praticas WASM",
    order: 145,
    points: 10,
    bodyMd: `# WASM Best Practices

Guidelines for effective WASM development.

## 1. Profile First

Measure whether WASM actually improves performance for your use case.

## 2. Minimize Cross-Boundary Calls

Each host-WASM call has overhead. Batch operations:

\`\`\`xs
// BAD: many small calls
PARA CADA (i EM 0..1000) { hostLog(i) }

// GOOD: batch
CRIA buffer = []
PARA CADA (i EM 0..1000) { buffer.empurra(i) }
hostProcessBuffer(buffer)
\`\`\`

## 3. Use Appropriate Types

Stick to I32/F64 for best performance.

## 4. Manage Memory Manually

Track allocations to avoid leaks:

\`\`\`xs
CHAMA ESSE CARA alocar(tamanho: I32): I32 { ... }
CHAMA ESSE CARA liberar(ptr: I32) { ... }
\`\`\`

## 5. Test on Target Platform

WASM behavior can differ across runtimes (browser vs wasmtime vs wasmer).

WASM excels for compute-heavy, deterministic workloads.`,
    challenges: [
      { question: "What adds overhead in WASM?", answer: "cross-boundary host calls", points: 3 },
      { question: "What is the best numeric type for WASM?", answer: "I32 or F64", points: 3 },
      { question: "Should WASM behavior be tested across platforms?", answer: "yes", points: 3 },
    ],,
{
    slug: "introducao-a-macros",
    title: "Introducao a Macros",
    order: 146,
    points: 5,
    bodyMd: `# Introduction to Macros

Compile-time code transformations.

## What are Macros?

Macros are functions that run at compile time, transforming AST nodes.

\`\`\`xs
MACRO duplicar(expr) {
  VOLTA [expr, expr]
}

CRIA resultado = duplicar(console.log("teste"))
// Expands to:
// console.log("teste")
// console.log("teste")
\`\`\`

## Zero Runtime Cost

Macros execute at compile time — expanded code has no macro overhead.

## When to Use

- Code generation
- DSL embedding
- Boilerplate reduction
- Compile-time checks

\`MACRO\` runs during compilation, not at runtime.`,
    challenges: [
      { question: "What keyword defines a macro?", answer: "MACRO", points: 3 },
      { question: "When do macros execute?", answer: "at compile time", points: 3 },
      { question: "Do macros have runtime overhead?", answer: "no, they expand at compile time", points: 3 },
    ],,
{
    slug: "sintaxe-de-macro",
    title: "Sintaxe & Padroes de Macro",
    order: 147,
    points: 10,
    bodyMd: `# Macro Syntax

Pattern matching and transformation.

## Simple Pattern

\`\`\`xs
MACRO repetir(n, expr) {
  CRIA resultado = []
  PARA CADA (i EM 0..n) {
    resultado.empurra(expr)
  }
  VOLTA resultado
}

repetir(3, SOLTA O GRITO("Oi"))
// Expands to:
// SOLTA O GRITO("Oi")
// SOLTA O GRITO("Oi")
// SOLTA O GRITO("Oi")
\`\`\`

## AST Access

\`\`\`xs
MACRO logvar(nome) {
  VOLTA [
    SOLTA O GRITO("Variavel: " + nome),
    nome
  ]
}
\`\`\`

## Hygiene

Macros respect variable scoping (hygienic):

\`\`\`xs
MACRO trocar(a, b) {
  CRIA tmp = a  // unique temporary, won't conflict
  a = b
  b = tmp
}
\`\`\`

Macros operate on syntax trees, not strings.`,
    challenges: [
      { question: "Do XanaScript macros operate on strings or AST?", answer: "AST", points: 3 },
      { question: "What makes a macro hygienic?", answer: "it respects variable scoping", points: 5 },
      { question: "What does a macro return?", answer: "AST nodes to substitute", points: 3 },
    ],,
{
    slug: "macros-avancadas",
    title: "Tecnicas Avancadas de Macro",
    order: 148,
    points: 10,
    bodyMd: `# Advanced Macros

Parameterized and recursive macros.

## Conditional Macro

\`\`\`xs
MACRO assertEqual(a, b) {
  SE LIGA SO (a !== b) {
    JOGAR "Assertion failed: " + a + " != " + b
  }
}
\`\`\`

## Recursive Macro

\`\`\`xs
MACRO range(n) {
  SE LIGA SO (n <= 0) {
    VOLTA []
  } SENAO {
    VOLTA [...range(n - 1), n]
  }
}

CRIA nums = range(5)  // [1, 2, 3, 4, 5]
\`\`\`

## Multi-Statement Macro

\`\`\`xs
MACRO medirTempo(expr) {
  CRIA inicio = hrTime()
  CRIA resultado = expr
  CRIA fim = hrTime()
  SOLTA O GRITO("Durou: " + (fim - inicio) + "ns")
  VOLTA resultado
}

CRIA r = medirTempo(calcularPesado())
\`\`\`

## Compile-Time Validation

\`\`\`xs
MACRO validarEmail(email) {
  SE LIGA SO (!email.tem("@")) {
    ERRO_COMPILACAO "Email invalido: " + email
  }
  VOLTA email
}
\`\`\`

\`ERRO_COMPILACAO\` halts compilation with a message.`,
    challenges: [
      { question: "What function stops compilation with an error?", answer: "ERRO_COMPILACAO", points: 3 },
      { question: "Can macros be recursive?", answer: "yes", points: 3 },
      { question: "Can a macro return multiple expressions?", answer: "yes, as an array", points: 3 },
    ],,
{
    slug: "execucao-em-tempo-de-compilacao",
    title: "Execucao em Tempo de Compilacao",
    order: 149,
    points: 10,
    bodyMd: `# Compile-Time Execution

Run arbitrary code at compile time.

## Compile-Time Compute

\`\`\`xs
MACRO factorial(n) {
  CHAMA ESSE CARA calc(x) {
    SE LIGA SO (x <= 1) { VOLTA 1 }
    VOLTA x * calc(x - 1)
  }

  VOLTA calc(n)
}

CRIA r = factorial(10)  // pre-computed to 3628800 at compile time
\`\`\`

## File Loading

\`\`\`xs
MACRO incluirArquivo(caminho) {
  CRIA conteudo = fs.readFileSync(caminho, "utf8")
  VOLTA parse(conteudo)  // parse as XanaScript AST
}

incluirArquivo("template.xs")
\`\`\`

## Environment Checks

\`\`\`xs
MACRO assertBuild(cond, msg) {
  SE LIGA SO (!cond) {
    ERRO_COMPILACAO msg
  }
}

assertBuild(process.env.NODE_ENV === "production", "Must build in production")
\`\`\`

Compile-time execution enables powerful build-time metaprogramming.`,
    challenges: [
      { question: "Can macros perform I/O at compile time?", answer: "yes", points: 3 },
      { question: "What does ERRO_COMPILACAO do?", answer: "halts compilation with an error message", points: 3 },
      { question: "What is compile-time compute useful for?", answer: "pre-computing values, build-time checks", points: 3 },
    ],,
{
    slug: "exemplos-praticos-de-macros",
    title: "Exemplos Praticos de Macros",
    order: 150,
    points: 10,
    bodyMd: `# Practical Macros

Real-world macro patterns.

## Enum-Like

\`\`\`xs
MACRO enum(nome, ...valores) {
  CRIA obj = {}
  CRIA i = 0
  PARA CADA (v EM valores) {
    obj[v] = i
    i += 1
  }
  VOLTA obj
}

CRIA Cores = enum("Cores", "Vermelho", "Azul", "Verde")
// { Vermelho: 0, Azul: 1, Verde: 2 }
\`\`\`

## Lazy Getter

\`\`\`xs
MACRO lazy(prop, expr) {
  CRIA _\${prop} = null
  PEGA \${prop}() {
    SE LIGA SO (_\${prop} == null) {
      _\${prop} = expr
    }
    VOLTA _\${prop}
  }
}
\`\`\`

## Builder Pattern

\`\`\`xs
MACRO build(obj, ...props) {
  CRIA result = {}
  PARA CADA (p EM props) {
    result[p.chave] = p.valor
  }
  VOLTA result
}

CRIA user = build({}, { chave: "nome", valor: "Maria" })
\`\`\`

Macros reduce boilerplate across your codebase.`,
    challenges: [
      { question: "Can macros generate enum-like objects?", answer: "yes", points: 3 },
      { question: "What pattern creates lazy-initialized properties?", answer: "lazy macro", points: 5 },
      { question: "What is a benefit of macros?", answer: "reducing boilerplate at compile time", points: 3 },
    ],,
{
    slug: "testando-macros",
    title: "Testando Macros",
    order: 151,
    points: 10,
    bodyMd: `# Testing Macros

Verify macro expansion produces correct code.

## Expansion Test

\`\`\`xs
TESTE "macro repetir" {
  CRIA expanded = MACRO_EXPANDE(repetir(3, SOLTA O GRITO("x")))
  AFIRMA.igual(expanded.tamanho, 3)
}
\`\`\`

## Snapshot Testing

\`\`\`xs
TESTE "macro enum snapshot" {
  CRIA expanded = MACRO_EXPANDE(
    enum("Dias", "Seg", "Ter", "Qua")
  )
  CONFIRMA_SNAPSHOT(expanded)
}
\`\`\`

## Compile-Time Errors

\`\`\`xs
TESTE "macro validation" {
  AFIRMA.ERRO_COMPILACAO(() => {
    validarEmail("invalido")
  })
}
\`\`\`

## Test Tools

\`\`\`bash
xs macro-test           # test macro expansions
xs macro-test --watch   # watch mode
\`\`\`

Test macros to ensure they generate correct code across edge cases.`,
    challenges: [
      { question: "What function expands a macro for testing?", answer: "MACRO_EXPANDE", points: 3 },
      { question: "What is snapshot testing for macros?", answer: "comparing expanded output to a saved snapshot", points: 5 },
      { question: "How do you test compile-time errors?", answer: "AFIRMA.ERRO_COMPILACAO", points: 3 },
    ],,
{
    slug: "melhores-praticas-de-macros",
    title: "Melhores Praticas de Macros",
    order: 152,
    points: 10,
    bodyMd: `# Macro Best Practices

Guidelines for safe, maintainable macros.

## 1. Keep Macros Simple

Complex macros are hard to debug. Prefer functions when possible.

## 2. Document Expansion

\`\`\`xs
// Macro: assert(cond, msg)
// Expands to: if (!cond) { throw msg }
MACRO assert(cond, msg) { ... }
\`\`\`

## 3. Avoid Side Effects

Macros should be pure — no I/O, no mutation of external state (except during compile time).

## 4. Test Macros

Use \`MACRO_EXPANDE\` and snapshot testing.

## 5. Use Hygiene

Don't introduce variable names that might conflict:

\`\`\`xs
// BAD: may shadow existing variable
CRIA temp = expr

// GOOD: use unique names
CRIA _macro_temp_\${ID} = expr
\`\`\`

## 6. Prefer Functions First

Only use macros when you genuinely need compile-time transformation.`,
    challenges: [
      { question: "Should macros be simple or complex?", answer: "simple — complex macros are hard to debug", points: 3 },
      { question: "Should macros have side effects?", answer: "no, prefer pure macros", points: 3 },
      { question: "What should you prefer before using macros?", answer: "regular functions", points: 3 },
    ],,
{
    slug: "introducao-a-dsl",
    title: "Linguagens Especificas de Dominio",
    order: 153,
    points: 10,
    bodyMd: `# Domain-Specific Languages

Embedded DSLs via macros and metaprogramming.

## What is a DSL?

A mini-language tailored to a specific domain, embedded in XanaScript.

## DSL via Macros

\`\`\`xs
MACRO rota(path, metodo, handler) {
  VOLTA {
    path: path,
    metodo: metodo,
    handler: handler
  }
}

CRIA rotas = [
  rota("/api/users", "GET", listarUsuarios),
  rota("/api/users", "POST", criarUsuario),
  rota("/api/users/:id", "GET", buscarUsuario)
]
\`\`\`

## Query DSL

\`\`\`xs
MACRO consulta(tabela, ...condicoes) {
  CRIA query = "SELECT * FROM " + tabela
  SE LIGA SO (condicoes.tamanho > 0) {
    query += " WHERE " + condicoes.join(" AND ")
  }
  VOLTA executarSQL(query)
}

CRIA admins = consulta("usuarios", "perfil = 'admin'", "ativo = true")
\`\`\`

DSLs make code read like the domain language.`,
    challenges: [
      { question: "What technique enables DSLs in XanaScript?", answer: "macros and metaprogramming", points: 3 },
      { question: "What is a benefit of DSLs?", answer: "code reads like domain language", points: 3 },
      { question: "Can DSLs be embedded in XanaScript?", answer: "yes, via macros", points: 3 },
    ],,
{
    slug: "exemplo-dsl-html",
    title: "Exemplo de DSL HTML",
    order: 154,
    points: 10,
    bodyMd: `# HTML DSL

Build HTML with XanaScript DSL.

## Element Macros

\`\`\`xs
MACRO div(...children) {
  VOLTA \`<div>\${children.join("")}</div>\`
}

MACRO h1(texto) {
  VOLTA \`<h1>\${texto}</h1>\`
}

MACRO p(texto) {
  VOLTA \`<p>\${texto}</p>\`
}
\`\`\`

## Usage

\`\`\`xs
CRIA pagina = div(
  h1("Bem-vindo"),
  p("Este e um paragrafo."),
  p("Outro paragrafo.")
)

// Output:
// <div><h1>Bem-vindo</h1><p>...</p><p>...</p></div>
\`\`\`

## With Attributes

\`\`\`xs
MACRO attrs(...pares) {
  CRIA resultado = {}
  PARA CADA (p EM pares) { resultado[p[0]] = p[1] }
  VOLTA resultado
}

MACRO divAttr(attrs, ...children) {
  CRIA attrStr = Object.entries(attrs)
    .mapa(([k, v]) => \` \${k}="\${v}"\`)
    .join("")
  VOLTA \`<div\${attrStr}>\${children.join("")}</div>\`
}
\`\`\`

DSL-based HTML generation is type-safe and composable.`,
    challenges: [
      { question: "Can you create an HTML DSL with macros?", answer: "yes", points: 3 },
      { question: "Is DSL-based HTML generation type-safe?", answer: "yes", points: 3 },
      { question: "What is an advantage over string concatenation?", answer: "composability and type safety", points: 5 },
    ],,
{
    slug: "testando-dsl",
    title: "Testando DSL",
    order: 155,
    points: 10,
    bodyMd: `# Testing DSL

Create a testing DSL for expressive test definitions.

## Test DSL

\`\`\`xs
MACRO testSuite(nome, ...testes) {
  SOLTA O GRITO("Suite: " + nome)
  PARA CADA (t EM testes) {
    TENTE {
      t()
      SOLTA O GRITO("  OK: " + t.nome)
    } CAPTURA (e) {
      SOLTA O GRITO("  FALHOU: " + t.nome + " - " + e)
    }
  }
}

MACRO test(nome, fn) {
  fn.nome = nome
  VOLTA fn
}

MACRO assert(cond, msg = "Assertion failed") {
  SE LIGA SO (!cond) { JOGAR msg }
}

// Usage
testSuite("Matematica",
  test("soma", () => {
    assert(2 + 2 == 4)
  }),
  test("multiplicacao", () => {
    assert(3 * 3 == 9)
  })
)
\`\`\`

Creating custom DSLs lets you design the perfect syntax for each problem domain.`,
    challenges: [
      { question: "What is a DSL?", answer: "a domain-specific language embedded in the host language", points: 3 },
      { question: "What macro groups tests in the DSL example?", answer: "testSuite", points: 3 },
      { question: "What is an advantage of a testing DSL?", answer: "expressive, readable test definitions", points: 3 },
    ],,
{
    slug: "melhores-praticas-finais",
    title: "Melhores Praticas Finais & Proximos Passos",
    order: 156,
    points: 5,
    bodyMd: `# Best Practices & Next Steps

Your journey with XanaScript — what to do next.

## Style Guide

- Use \`CRIA\` for mutable, \`CONSTANTE\` for immutable
- Prefer \`COMBINA\` over chained \`SE LIGA SO\` when matching values
- Name classes with PascalCase, variables with camelCase
- Keep functions small (< 20 lines)
- Use \`PURO\` for pure functions

## Code Review Checklist

- [ ] Types are correct and useful
- [ ] Error paths are handled
- [ ] No swallowed exceptions
- [ ] Names are descriptive in Portuguese
- [ ] Tests cover edge cases
- [ ] Performance is reasonable

## Learning Path Forward

1. Build a CLI tool using \`xs:fs\` and \`xs:path\`
2. Create a web server with the HTTP library
3. Model real data with \`TABELA\` ORM
4. Write a macro to eliminate boilerplate
5. Profile and optimize a performance bottleneck
6. Compile a module to WASM and embed in a web page

## Community & Resources

- Official docs: https://xanascript.xyz/docs
- GitHub: https://github.com/xanascript/xanascript
- Discord: https://xanascript.xyz/discord

Parabens! You now know XanaScript from fundamentals to advanced metaprogramming.`,
    challenges: [
      { question: "Should you prefer CRIA or CONSTANTE for immutable values?", answer: "CONSTANTE", points: 3 },
      { question: "What naming convention for classes?", answer: "PascalCase", points: 3 },
      { question: "What should you build to practice XanaScript?", answer: "a CLI tool, web server, or ORM model", points: 3 },
    ],
  },
];
];


// Simple markdown to HTML converter for seed data
function mdToHtml(md) {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => '<pre><code>' + code.trim() + '</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\| (.+) \|$/gm, (line) => {
      const cells = line.slice(1, -1).split('|').map(c => c.trim());
      return '<tr><td>' + cells.join('</td><td>') + '</td></tr>';
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hHlLIuOpPrtT])/gm, function(m) { return m ? m : ''; });
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p><\/([a-z]+)><\/p>/g, '</$1>');
  return html;
}

// Process lessons: generate bodyHtml from bodyMd
const processedLessons = lessons.map(l => ({
  ...l,
  bodyHtml: l.bodyHtml || mdToHtml(l.bodyMd),
  challenges: l.challenges.map(c => ({
    question: c.question || c.q,
    answer: c.answer || c.a,
    points: c.points || c.p || 3
  }))
}));

export async function seedCoursePt() {
  await Course.deleteOne({ slug: "curso-completo-xanascript" });

  const course = await Course.create({
    title: "Complete XanaScript Mastery",
    slug: "curso-completo-xanascript",
    lang: "en",
    description: "Aprenda XanaScript do zero ao avancado. 156 aulas cobrindo cada aspecto da linguagem — sintaxe, orientacao a objetos, ORM, WebAssembly, testes, macros, e muito mais.",
    image: "",
    category: "Programming",
    level: "beginner",
    duration: "40h",
    published: true,
    lessons: processedLessons,
  });

  console.log(`Course created: ${course.title}`);
  console.log(`Lessons: ${course.lessons.length}`);
  console.log(`Total points: ${course.totalPoints}`);
  console.log(`Course ID: ${course._id}`);
  return course;
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    await seedCoursePt();
    await mongoose.disconnect();
    console.log("Done!");
  } catch (e) {
    console.error("Seed failed:", e);
    process.exit(1);
  }
}

seed();
