import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

const lessons = [
  {
    slug: "what-is-xanascript",
    title: "What is XanaScript?",
    order: 1,
    points: 5,
    bodyMd: `XanaScript is a **full programming language** designed entirely in Brazilian Portuguese. Unlike transpilers or wrappers, every keyword, operator, and syntax construct is native Portuguese — parsed, type-checked, compiled, and executed by a custom toolchain written in JavaScript.

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
    ],
  },
  {
    slug: "installation-setup",
    title: "Installation & Setup",
    order: 2,
    points: 5,
    bodyMd: `XanaScript can be installed in two ways:

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
    ],
  },
  {
    slug: "your-first-program",
    title: "Your First Program",
    order: 3,
    points: 10,
    bodyMd: `Let's write the classic "Hello, World!" in XanaScript:

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
    ],
  },
  {
    slug: "variables-cria",
    title: "Variables with CRIA",
    order: 4,
    points: 10,
    bodyMd: `\`CRIA\` ("create") declares a mutable variable in XanaScript:

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
    ],
  },
  {
    slug: "comments",
    title: "Comments",
    order: 5,
    points: 5,
    bodyMd: `Comments are ignored by the compiler and exist only for humans reading the code.

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
    ],
  },
  {
    slug: "type-inference",
    title: "Type Inference",
    order: 6,
    points: 10,
    bodyMd: `XanaScript automatically detects the type of a variable based on its value.

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
    ],
  },
  {
    slug: "strings-in-depth",
    title: "Strings in Depth",
    order: 7,
    points: 10,
    bodyMd: `Strings (\`TEXTO\`) are UTF-8 encoded.

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
    ],
  },
  {
    slug: "numbers-in-depth",
    title: "Numbers in Depth",
    order: 8,
    points: 10,
    bodyMd: `Numbers (\`NUMERO\`) cover both integers and floating-point. Values are 64-bit floats (IEEE 754).

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
    ],
  },
  {
    slug: "booleans",
    title: "Booleans",
    order: 9,
    points: 5,
    bodyMd: `Booleans (\`BOOLEANO\`) represent truth values: \`VERDADEIRO\` (true) and \`FALSO\` (false).

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
    ],
  },
  {
    slug: "null-undefined",
    title: "Null and Undefined",
    order: 10,
    points: 5,
    bodyMd: `Two special values for "no value".

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
    ],
  },
  {
    slug: "type-conversion",
    title: "Type Conversion",
    order: 11,
    points: 10,
    bodyMd: `Built-in functions for converting between types.

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
    ],
  },
  {
    slug: "operators",
    title: "Operators",
    order: 12,
    points: 10,
    bodyMd: `A full set of operators for arithmetic, comparison, logic, and assignment.

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
    ],
  },
  {
    slug: "operator-precedence",
    title: "Operator Precedence",
    order: 13,
    points: 5,
    bodyMd: `Determines evaluation order in expressions (highest to lowest):

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
    ],
  },
  {
    slug: "se-liga-so",
    title: "SE LIGA SO (If Statements)",
    order: 14,
    points: 10,
    bodyMd: `\`SE LIGA SO\` ("pay attention") is XanaScript's \`if\` statement.

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
    ],
  },
  {
    slug: "senao",
    title: "SENAO (Else Clauses)",
    order: 15,
    points: 10,
    bodyMd: `\`SENAO\` ("otherwise") provides the alternative branch.

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
    ],
  },
  {
    slug: "senao-se",
    title: "SENAO SE (Else If Chains)",
    order: 16,
    points: 10,
    bodyMd: `\`SENAO SE\` ("otherwise if") chains multiple conditions.

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
    ],
  },
  {
    slug: "nested-conditionals",
    title: "Nested Conditionals",
    order: 17,
    points: 10,
    bodyMd: `Place \`SE LIGA SO\` inside other \`SE LIGA SO\` blocks.

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
    ],
  },
  {
    slug: "ternary-expressions",
    title: "Ternary/Conditional Expressions",
    order: 18,
    points: 10,
    bodyMd: `Inline conditional using \`? :\`.

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
    ],
  },
  {
    slug: "combina-basics",
    title: "COMBINA Basics (Switch/Match)",
    order: 19,
    points: 10,
    bodyMd: `\`COMBINA\` is pattern matching, similar to \`switch\`/\`match\`.

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
    ],
  },
  {
    slug: "combina-ranges",
    title: "COMBINA with Ranges",
    order: 20,
    points: 10,
    bodyMd: `Use comparison operators in \`CASO\` arms.

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
    ],
  },
  {
    slug: "combina-wildcards",
    title: "COMBINA Wildcards (_)",
    order: 21,
    points: 5,
    bodyMd: `The underscore \`_\` matches any value.

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
    ],
  },
  {
    slug: "combina-expressions",
    title: "COMBINA Expressions (Returning Values)",
    order: 22,
    points: 10,
    bodyMd: `COMBINA is an expression, not just a statement.

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
    ],
  },
  {
    slug: "short-circuit-evaluation",
    title: "Short-Circuit Evaluation",
    order: 23,
    points: 5,
    bodyMd: `Right operand only evaluated if necessary.

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
    ],
  },
  {
    slug: "type-numero",
    title: "Type: NUMERO",
    order: 24,
    points: 5,
    bodyMd: `All numbers in XanaScript are of type \`NUMERO\` — both integers and floats.

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
    ],
  },
  {
    slug: "type-texto",
    title: "Type: TEXTO",
    order: 25,
    points: 5,
    bodyMd: `Strings in XanaScript use double quotes and are type \`TEXTO\`.

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
    ],
  },
  {
    slug: "type-booleano",
    title: "Type: BOOLEANO",
    order: 26,
    points: 5,
    bodyMd: `Booleans represent logical truth values.

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
    ],
  },
  {
    slug: "type-lista",
    title: "Type: LISTA",
    order: 27,
    points: 5,
    bodyMd: `Arrays in XanaScript are called \`LISTA\`.

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
    ],
  },
  {
    slug: "type-dicionario",
    title: "Type: DICIONARIO",
    order: 28,
    points: 5,
    bodyMd: `Dictionaries in XanaScript are key-value maps, type \`DICIONARIO\`.

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
    ],
  },
  {
    slug: "type-opcional",
    title: "Type: OPCIONAL",
    order: 29,
    points: 5,
    bodyMd: `Optional types handle nullable values safely.

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
    ],
  },
  {
    slug: "type-inference",
    title: "Type Inference",
    order: 30,
    points: 10,
    bodyMd: `XanaScript infers types automatically. Annotations are optional.

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
    ],
  },
  {
    slug: "type-conversion",
    title: "Type Conversion",
    order: 31,
    points: 10,
    bodyMd: `Explicit conversion between types uses built-in functions.

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
    ],
  },
  {
    slug: "function-basics",
    title: "Function Basics",
    order: 32,
    points: 5,
    bodyMd: `Functions are declared with \`CHAMA ESSE CARA\` ("call this guy").

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
    ],
  },
  {
    slug: "function-return",
    title: "Return Values",
    order: 33,
    points: 5,
    bodyMd: `Use \`VOLTA\` ("return") to return a value from a function.

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
    ],
  },
  {
    slug: "function-params",
    title: "Parameters & Defaults",
    order: 34,
    points: 5,
    bodyMd: `Functions support default parameters and rest params.

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
    ],
  },
  {
    slug: "function-first-class",
    title: "Functions as First-Class",
    order: 35,
    points: 10,
    bodyMd: `Functions are values — assign them to variables, pass as arguments.

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
    ],
  },
  {
    slug: "function-arrow",
    title: "Arrow Functions (=>)",
    order: 36,
    points: 10,
    bodyMd: `Arrow functions offer a shorter syntax.

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
    ],
  },
  {
    slug: "function-recursion",
    title: "Recursion",
    order: 37,
    points: 10,
    bodyMd: `Functions can call themselves — XanaScript supports recursion.

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
    ],
  },
  {
    slug: "list-operations",
    title: "List Operations",
    order: 38,
    points: 5,
    bodyMd: `Core operations for working with lists.

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
    ],
  },
  {
    slug: "set-type",
    title: "Type: CONJUNTO",
    order: 39,
    points: 5,
    bodyMd: `Sets are unordered collections of unique values.

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
    ],
  },
  {
    slug: "class-basics",
    title: "Class Basics with CLASSE",
    order: 40,
    points: 5,
    bodyMd: `Classes are defined with \`CLASSE\`.

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
    ],
  },
  {
    slug: "class-constructor",
    title: "Class Constructors",
    order: 41,
    points: 5,
    bodyMd: `The \`init\` method initializes a new instance.

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
    ],
  },
  {
    slug: "class-methods",
    title: "Instance & Static Methods",
    order: 42,
    points: 5,
    bodyMd: `Methods can be instance-level or class-level.

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
    ],
  },
  {
    slug: "class-properties",
    title: "Computed Properties",
    order: 43,
    points: 10,
    bodyMd: `Properties with custom get/set logic.

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
    ],
  },
  {
    slug: "error-basics",
    title: "Error Handling with TENTE",
    order: 44,
    points: 5,
    bodyMd: `Errors are handled with \`TENTE\` (try), \`CAPTURA\` (catch), \`FINALLY\` (finally).

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
    ],
  },
  {
    slug: "module-basics",
    title: "Module Basics",
    order: 45,
    points: 5,
    bodyMd: `Organize code into reusable modules.

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
    ],
  },
  {
    slug: "module-named",
    title: "Named Imports/Exports",
    order: 46,
    points: 5,
    bodyMd: `Import and export specific names.

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
    ],
  },
  {
    slug: "async-await",
    title: "Async/Await",
    order: 47,
    points: 10,
    bodyMd: `Write async code that reads like synchronous code.

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
    ],
  },
  {
    slug: "testing-basics",
    title: "Testing with TESTE",
    order: 48,
    points: 5,
    bodyMd: `XanaScript has a built-in test framework.

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
    ],
  },
  {
    slug: "orm-intro",
    title: "Introduction to TABELA ORM",
    order: 49,
    points: 5,
    bodyMd: `XanaScript has a built-in ORM with first-class syntax.

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
    ],
  },
  {
    slug: "orm-fields",
    title: "Field Types & Options",
    order: 50,
    points: 5,
    bodyMd: `Configure model fields with constraints.

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
    ],
  },
  {
    slug: "orm-queries",
    title: "Querying Data",
    order: 51,
    points: 10,
    bodyMd: `Filter, sort, and paginate data.

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
    ],
  },
  {
    slug: "orm-relations",
    title: "Relationships",
    order: 52,
    points: 10,
    bodyMd: `Define relationships between models.

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
    ],
  },
  {
    slug: "wasm-intro",
    title: "Introduction to WASM",
    order: 53,
    points: 5,
    bodyMd: `XanaScript can compile directly to WebAssembly.

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
    ],
  },
  {
    slug: "macros-intro",
    title: "Introduction to Macros",
    order: 54,
    points: 5,
    bodyMd: `Compile-time code transformations.

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
    ],
  },
  {
    slug: "best-practices-index",
    title: "Final Best Practices & Next Steps",
    order: 55,
    points: 5,
    bodyMd: `Your journey with XanaScript — what to do next.

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

export async function seedCourse() {
  await Course.deleteOne({ slug: "complete-xanascript" });

  const course = await Course.create({
    title: "Complete XanaScript Mastery",
    slug: "complete-xanascript",
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
    await seedCourse();
    await mongoose.disconnect();
    console.log("Done!");
  } catch (e) {
    console.error("Seed failed:", e);
    process.exit(1);
  }
}

seed();
