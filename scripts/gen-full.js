import fs from 'fs';

// Compact lesson generator
// Each lesson: [slug, title, order, points, bodyMd, [[q,a,p], ...]]
const L = [];

function a(slug, title, order, points, md, ch) {
  L.push({ slug, title, order, points, bodyMd: md, challenges: ch.map(c => ({ q: c[0], a: c[1], p: c[2] })) });
}

// MD template helper - just returns the string
const m = (s) => s;

// ====== MODULE 1: FUNDAMENTALS (1-15) ======
a('what-is-xanascript', 'What is XanaScript?', 1, 5, m(
'# What is XanaScript?\n\nXanaScript is a **full programming language** designed entirely in Brazilian Portuguese. Unlike transpilers or wrappers, every keyword, operator, and syntax construct is native Portuguese — parsed, type-checked, compiled, and executed by a custom toolchain written in JavaScript.\n\n## Key Features\n\n- **Multi-word keywords** like \`SE LIGA SO\`, \`CHAMA ESSE CARA\`, \`REPETE NA MORAL\` — lexed as atomic tokens\n- **Built-in ORM** (\`TABELA\`) — first-class syntax for database CRUD\n- **Optimizing compiler** — constant folding, loop unrolling, integer inference\n- **Native WebAssembly** — direct \`.wasm\` binary emission, no Emscripten\n- **Compile-time macros** — AST-level substitution, zero runtime cost\n- **LSP server** — completions, hover, diagnostics, go-to-definition\n- **Test runner** — \`TESTE\` / \`AFIRMA\` as native AST nodes\n\n## The Philosophy\n\nCode should read like it\'s written for humans. Every construct in XanaScript uses clear, intuitive Portuguese keywords so the intent is obvious at a glance.'),
[
  ['What type of tokens are multi-word keywords like SE LIGA SO treated as?', 'atomic', 3],
  ['Does XanaScript use a transpiler approach or a native compiler?', 'native compiler', 3],
  ['What is the philosophy behind XanaScript?', 'code should read like it is written for humans', 5]
]
);

a('installation-setup', 'Installation & Setup', 2, 5, m(
'# Installation & Setup\n\nXanaScript can be installed in two ways:\n\n## Via npm (Cross-platform)\n\n```bash\nnpm install -g xanascript\n```\n\nThis requires Node.js 18+ and works on Windows, Linux, and macOS.\n\n## Native Binary (Standalone)\n\n```bash\ncurl -fsSL https://xanascript.xyz/install.sh | bash\n```\n\nNo Node.js required — a single executable with zero dependencies.\n\n## Verify Installation\n\n```bash\nxs --version\n```\n\n## VS Code Extension\n\nInstall \`vscode-xs\` from the marketplace for syntax highlighting, snippets, and LSP integration.'),
[
  ['What is the npm command to install XanaScript globally?', 'npm install -g xanascript', 3],
  ['What command verifies XanaScript is installed?', 'xs --version', 3],
  ['What VS Code extension provides XanaScript support?', 'vscode-xs', 3]
]
);

a('your-first-program', 'Your First Program', 3, 10, m(
'# Your First Program\n\nLet\'s write the classic "Hello, World!" in XanaScript:\n\n```xs\nSOLTA O GRITO("Hello, World!")\n```\n\nCreate a file called \`hello.xs\` and run it:\n\n```bash\nxs run hello.xs\n```\n\n## Breaking It Down\n\n- \`SOLTA O GRITO\` is the print function — literally "shout it out"\n- Parentheses \`()\` wrap the argument\n- Double quotes \`"..."\` delimit a string\n\n## Variables\n\n```xs\nCRIA nome = "Maria"\nCRIA idade = 25\nSOLTA O GRITO("Ola, " + nome + "! Voce tem " + idade + " anos.")\n```\n\n- \`CRIA\` declares a variable ("create")\n- \`+\` concatenates strings and numbers\n- No type annotations needed — types are inferred\n\n## Comments\n\n```xs\n// This is a single-line comment\n\n/* This is a\n   multi-line comment */\n```'),
[
  ['What keyword declares a variable in XanaScript?', 'CRIA', 3],
  ['What function prints output to the console?', 'SOLTA O GRITO', 3],
  ['What command runs a .xs file?', 'xs run', 3]
]
);

a('variables-cria', 'Variables with CRIA', 4, 10, m(
'# Variables with CRIA\n\n\`CRIA\` ("create") declares a mutable variable in XanaScript:\n\n```xs\nCRIA nome = "Joao"\nCRIA idade = 25\nCRIA preco = 49.99\n```\n\n## Reassignment\n\nVariables declared with \`CRIA\` can be reassigned:\n\n```xs\nCRIA contador = 0\ncontador = 1\ncontador = contador + 5\nSOLTA O GRITO(contador)  // 6\n```\n\n## Multiple Variables\n\n```xs\nCRIA a = 1, b = 2, c = 3\nSOLTA O GRITO(a + b + c)  // 6\n```\n\n## Naming Rules\n\n- Must start with a letter or underscore\n- Can contain letters, numbers, and underscores\n- Case-sensitive: \`nome\` != \`Nome\`\n- Keywords cannot be used as variable names\n\n## Scope\n\n\`CRIA\` is block-scoped. Variables declared inside a block are not accessible outside.'),
[
  ['What keyword declares a mutable variable?', 'CRIA', 3],
  ['Can a CRIA variable be reassigned?', 'yes', 3],
  ['Are CRIA variables block-scoped or function-scoped?', 'block-scoped', 5]
]
);

a('constants-constante', 'Constants with CONSTANTE', 5, 10, m(
'# Constants with CONSTANTE\n\n\`CONSTANTE\` declares an immutable, read-only binding:\n\n```xs\nCONSTANTE PI = 3.14159\nCONSTANTE NOME_APP = "XanaScript"\nCONSTANTE VERSAO = "1.0.0"\n```\n\n## Reassignment is Forbidden\n\n```xs\nCONSTANTE MAX_USERS = 100\n// MAX_USERS = 200  // Error! Cannot reassign a constant\n```\n\n## When to Use\n\n- Values that should never change (mathematical constants, configuration)\n- API endpoints, environment names\n- Any binding to protect from accidental mutation\n\n## CRIA vs CONSTANTE\n\n| Aspect | CRIA | CONSTANTE |\n|--------|------|-----------|\n| Mutable | Yes | No |\n| Reassign | Allowed | Forbidden |\n\n## Best Practice\n\nAlways prefer \`CONSTANTE\` by default. Only use \`CRIA\` when the value needs to change.'),
[
  ['What keyword creates an immutable variable?', 'CONSTANTE', 3],
  ['Can a CONSTANTE be reassigned?', 'no', 3],
  ['Which should you prefer by default: CRIA or CONSTANTE?', 'CONSTANTE', 5]
]
);

a('comments', 'Comments', 6, 5, m(
'# Comments\n\nComments are ignored by the compiler and exist only for humans reading the code.\n\n## Single-Line Comments\n\nUse \`//\` for single-line comments:\n\n```xs\n// This is a single-line comment\nCRIA x = 10  // inline comment\n\n// Comments can span multiple lines\n// if each line starts with //\n```\n\n## Multi-Line Comments\n\nUse \`/* */\` for block comments:\n\n```xs\n/*\n * This is a multi-line comment\n * Useful for documentation headers\n */\nCRIA y = 20\n```\n\n## Documentation Comments\n\nUse multi-line comments for function documentation explaining what the function does. Good comments explain "why", not "what".'),
[
  ['What symbol starts a single-line comment in XanaScript?', '//', 3],
  ['What delimiters wrap a multi-line comment?', '/* */', 3]
]
);

a('data-types', 'Data Types', 7, 10, m(
'# Data Types\n\nXanaScript has five built-in types.\n\n## TEXTO (String)\n\n```xs\nCRIA saudacao = "Ola, Mundo!"\nCRIA vazio = ""\n```\n\n## NUMERO (Number)\n\n```xs\nCRIA inteiro = 42\nCRIA decimal = 3.14\nCRIA negativo = -10\n```\n\n## BOOLEANO (Boolean)\n\n```xs\nCRIA ativo = VERDADEIRO   // true\nCRIA inativo = FALSO      // false\n```\n\n## DATA (Date)\n\n```xs\nCRIA hoje = DATA("2026-07-08")\n```\n\n## QUALQUER (Any)\n\n```xs\nCRIA flexivel = QUALQUER("pode ser qualquer coisa")\nflexivel = 42  // OK\n```\n\nEach type serves a specific purpose. Type inference handles them automatically.'),
[
  ['How many built-in data types does XanaScript have?', '5', 3],
  ['What is the keyword for boolean true?', 'VERDADEIRO', 3],
  ['What type allows any value to be assigned?', 'QUALQUER', 3]
]
);

a('type-inference', 'Type Inference', 8, 10, m(
'# Type Inference\n\nXanaScript automatically detects the type of a variable based on its value.\n\n## How Inference Works\n\n```xs\nCRIA texto = "Ola"            // inferred as TEXTO\nCRIA numero = 42              // inferred as NUMERO\nCRIA booleano = VERDADEIRO    // inferred as BOOLEANO\nCRIA data = DATA("2026-01-01") // inferred as DATA\nCRIA qualquer = null          // inferred as QUALQUER\n```\n\n## Strict Types\n\nOnce a variable is inferred as a specific type, reassignment must match:\n\n```xs\nCRIA nome = "Ana"      // TEXTO\n// nome = 42           // Error! Cannot assign NUMERO to TEXTO\n```\n\n## QUALQUER allows changes\n\nWith QUALQUER, the type can change at runtime.\n\n## Optional Annotations\n\nFor clarity, you can annotate types: \`CRIA nome: TEXTO = "Joao"\`.'),
[
  ['What type is inferred for "CRIA x = 42"?', 'NUMERO', 3],
  ['Can you assign a NUMERO to a TEXTO variable?', 'no', 3],
  ['What type allows dynamic changes?', 'QUALQUER', 5]
]
);

a('strings-in-depth', 'Strings in Depth', 9, 10, m(
'# Strings in Depth\n\nStrings (\`TEXTO\`) are UTF-8 encoded.\n\n## String Creation\n\n```xs\nCRIA simples = "Hello"\nCRIA com_aspas = \'Aspas simples tambem funcionam\'\n```\n\n## Concatenation\n\n```xs\nCRIA primeiro = "Joao"\nCRIA ultimo = "Silva"\nCRIA completo = primeiro + " " + ultimo\nSOLTA O GRITO(completo)  // Joao Silva\n```\n\n## String Methods\n\n```xs\nCRIA texto = "  XanaScript e Incrivel!  "\ntamanho(texto)    // length\nmaiusculo(texto)  // uppercase\nminusculo(texto)  // lowercase\naparado(texto)    // trim\nsubstituir(texto, "e", "eh")  // replace\n```\n\n## Interpolation\n\nUse \`+\` to interpolate values into strings. Strings in XanaScript are immutable — methods return new strings.'),
[
  ['What operator concatenates strings?', '+', 3],
  ['What method returns string length?', 'tamanho', 3],
  ['What method converts a string to uppercase?', 'maiusculo', 3]
]
);

a('numbers-in-depth', 'Numbers in Depth', 10, 10, m(
'# Numbers in Depth\n\nNumbers (\`NUMERO\`) cover both integers and floating-point. Values are 64-bit floats (IEEE 754).\n\n## Integer Literals\n\n```xs\nCRIA a = 42\nCRIA b = -17\nCRIA c = 0\nCRIA d = 1_000_000  // underscores for readability\n```\n\n## Floating-Point\n\n```xs\nCRIA pi = 3.14159\nCRIA pequeno = 0.001\nCRIA grande = 1.5e6  // scientific notation\n```\n\n## Arithmetic Operators\n\n```xs\n+   -   *   /   %   **\n```\n\n## Increment / Decrement\n\n```xs\nCRIA c = 0\nc++  // 1\nc--  // 0\n```\n\n## Compound Assignment\n\n```xs\nx += 5   // x = x + 5\nx -= 3   // x = x - 3\nx *= 2   // x = x * 2\nx /= 4   // x = x / 4\n```'),
[
  ['What operator computes the remainder of division?', '%', 3],
  ['What is the exponentiation operator?', '**', 3],
  ['What does x += 5 do?', 'adds 5 to x', 3]
]
);

a('booleans', 'Booleans', 11, 5, m(
'# Booleans\n\nBooleans (\`BOOLEANO\`) represent truth values: \`VERDADEIRO\` (true) and \`FALSO\` (false).\n\n## Logical Operators\n\nPortuguese words for logical operations:\n\n```xs\nCRIA e = a E b     // AND\nCRIA ou = a OU b   // OR\nCRIA nao = NAO a   // NOT\n```\n\n## Comparison Operators\n\n```xs\n==   !=   >   <   >=   <=\n```\n\n## Truthy and Falsy\n\nFalsy values: \`FALSO\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Everything else is truthy.\n\n```xs\nSE LIGA SO ("") {\n  // won\'t execute\n} SENAO {\n  SOLTA O GRITO("Falsy!")\n}\n```'),
[
  ['What is the keyword for boolean true?', 'VERDADEIRO', 3],
  ['What keyword represents logical AND?', 'E', 3],
  ['What keyword represents logical NOT?', 'NAO', 3]
]
);

a('null-undefined', 'Null and Undefined', 12, 5, m(
'# Null and Undefined\n\nTwo special values for "no value".\n\n## Null\n\n\`null\` represents an intentional absence of value:\n\n```xs\nCRIA resultado = null\nSE LIGA SO (resultado == null) {\n  SOLTA O GRITO("Vazio")\n}\n```\n\n## Undefined\n\n\`undefined\` means a variable has no assigned value:\n\n```xs\nCRIA x  // undefined\n```\n\n## Nullish Coalescing\n\n\`??\` provides a default when value is null or undefined:\n\n```xs\nCRIA nome = usuario ?? "Convidado"\n```\n\n| Value | Meaning |\n|-------|---------|\n| null | Intentional empty |\n| undefined | Uninitialized |'),
[
  ['What value represents an intentional empty value?', 'null', 3],
  ['What operator provides a default for null/undefined?', '??', 3],
  ['Difference between null and undefined?', 'null is intentional, undefined is uninitialized', 5]
]
);

a('type-conversion', 'Type Conversion', 13, 10, m(
'# Type Conversion\n\nBuilt-in functions for converting between types.\n\n## To Number\n\n```xs\nCRIA n = NUMERO("42")      // 42\nCRIA pi = NUMERO("3.14")   // 3.14\nCRIA falha = NUMERO("x")   // 0 on failure\n```\n\n## To String\n\n```xs\nCRIA s = TEXTO(42)             // "42"\nCRIA b = TEXTO(VERDADEIRO)     // "VERDADEIRO"\n```\n\n## To Boolean\n\n```xs\nCRIA b1 = BOOLEANO("texto")   // VERDADEIRO\nCRIA b2 = BOOLEANO("")        // FALSO\nCRIA b3 = BOOLEANO(42)        // VERDADEIRO\nCRIA b4 = BOOLEANO(0)         // FALSO\n```\n\n## Implicit Conversion\n\nNumeric strings are implicitly converted in arithmetic contexts.'),
[
  ['What function converts a value to a number?', 'NUMERO()', 3],
  ['What function converts a value to a string?', 'TEXTO()', 3],
  ['What does BOOLEANO(0) return?', 'FALSO', 3]
]
);

a('operators', 'Operators', 14, 10, m(
'# Operators\n\nA full set of operators for arithmetic, comparison, logic, and assignment.\n\n## Arithmetic\n\n```xs\n+   -   *   /   %   **\n```\n\n## Comparison\n\n```xs\n==   !=   >   <   >=   <=\n```\n\n## Logical\n\n```xs\nE   OU   NAO   !\n```\n\n## Assignment\n\n```xs\n=   +=   -=   *=   /=   %=\n```\n\n## Nullish Coalescing\n\n\`??\` returns the left side if it is not null/undefined, otherwise the right side.\n\n## Unary\n\n```xs\n-x   +x   !x   x++   x--\n```'),
[
  ['What is the modulo operator?', '%', 3],
  ['What three Portuguese words are used for logical operators?', 'E OU NAO', 3],
  ['What does "x ?? y" do?', 'returns x if x is not null/undefined, otherwise y', 5]
]
);

a('operator-precedence', 'Operator Precedence', 15, 5, m(
'# Operator Precedence\n\nDetermines evaluation order in expressions (highest to lowest):\n\n| Level | Operators |\n|-------|-----------|\n| 1 | \`()\` grouping |\n| 2 | \`**\` |\n| 3 | \`!\` \`NAO\` \`++\` \`--\` |\n| 4 | \`*\` \`/\` \`%\` |\n| 5 | \`+\` \`-\` |\n| 6 | \`<\` \`<=\` \`>\` \`>=\` |\n| 7 | \`==\` \`!=\` |\n| 8 | \`E\` (AND) |\n| 9 | \`OU\` (OR) |\n| 10 | \`??\` |\n| 11 | \`=\` \`+=\` \`-=\` |\n\n## Examples\n\n```xs\n2 + 3 * 4      // 14 (not 20)\n(2 + 3) * 4    // 20\nVERDADEIRO OU FALSO E FALSO  // VERDADEIRO\n2 ** 3 ** 2    // 512 (2 ** 9)\n```\n\nUse parentheses to clarify intent.'),
[
  ['What is the result of "2 + 3 * 4"?', '14', 3],
  ['Which has higher precedence: E or OU?', 'E', 3]
]
);

// ====== MODULE 2: CONTROL FLOW (16-25) ======
a('se-liga-so', 'SE LIGA SO (If Statements)', 16, 10, m(
'# SE LIGA SO — If Statements\n\n\`SE LIGA SO\` ("pay attention") is XanaScript\'s \`if\` statement.\n\n## Basic Syntax\n\n```xs\nSE LIGA SO (idade >= 18) {\n  SOLTA O GRITO("Maior de idade")\n}\n```\n\nConditions in parentheses, body in curly braces.\n\n## Compound Conditions\n\n```xs\nSE LIGA SO (nota >= 70 E presenca >= 0.75) {\n  SOLTA O GRITO("Aprovado")\n}\n```\n\n## Nested\n\n```xs\nSE LIGA SO (logado) {\n  SE LIGA SO (admin) {\n    SOLTA O GRITO("Painel admin")\n  }\n}\n```\n\nAlways use curly braces even for single statements.'),
[
  ['What keyword starts an if statement in XanaScript?', 'SE LIGA SO', 3],
  ['Must the condition be wrapped in parentheses?', 'yes', 3]
]
);

a('senao', 'SENAO (Else Clauses)', 17, 10, m(
'# SENAO — Else Clauses\n\n\`SENAO\` ("otherwise") provides the alternative branch.\n\n## Basic Syntax\n\n```xs\nSE LIGA SO (idade >= 18) {\n  SOLTA O GRITO("Maior")\n} SENAO {\n  SOLTA O GRITO("Menor")\n}\n```\n\n## Guard Pattern\n\n```xs\nCHAMA ESSE CARA dividir(a, b) {\n  SE LIGA SO (b == 0) {\n    VOLTA null\n  } SENAO {\n    VOLTA a / b\n  }\n}\n```\n\nThe \`SENAO\` branch runs only when the condition is false, providing a complete fork in program flow.'),
[
  ['What keyword represents else in XanaScript?', 'SENAO', 3],
  ['When does the SENAO branch execute?', 'when the if condition is false', 3]
]
);

a('senao-se', 'SENAO SE (Else If Chains)', 18, 10, m(
'# SENAO SE — Else If Chains\n\n\`SENAO SE\` ("otherwise if") chains multiple conditions.\n\n## Grade Example\n\n```xs\nSE LIGA SO (nota >= 90) {\n  SOLTA O GRITO("A")\n} SENAO SE (nota >= 80) {\n  SOLTA O GRITO("B")\n} SENAO SE (nota >= 70) {\n  SOLTA O GRITO("C")\n} SENAO {\n  SOLTA O GRITO("F")\n}\n```\n\n## Tax Example\n\n```xs\nSE LIGA SO (renda <= 2000) {\n  "Isento"\n} SENAO SE (renda <= 5000 E dependentes > 1) {\n  "Taxa reduzida"\n} SENAO {\n  "Taxa normal"\n}\n```\n\nConditions are evaluated top-to-bottom. First match executes. Final SENAO is optional.'),
[
  ['What keyword starts an else-if branch?', 'SENAO SE', 3],
  ['How many branches execute in an if-else if chain?', 'one', 3],
  ['Is the final SENAO branch required?', 'no', 3]
]
);

a('nested-conditionals', 'Nested Conditionals', 19, 10, m(
'# Nested Conditionals\n\nPlace \`SE LIGA SO\` inside other \`SE LIGA SO\` blocks.\n\n## Example\n\n```xs\nSE LIGA SO (logado) {\n  SE LIGA SO (admin) {\n    SOLTA O GRITO("Admin")\n  } SENAO {\n    SOLTA O GRITO("Usuario")\n  }\n} SENAO {\n  SOLTA O GRITO("Login necessario")\n}\n```\n\n## Avoid Deep Nesting\n\nUse early returns to flatten code:\n\n```xs\nSE LIGA SO (idade < 18) { VOLTA FALSO }\nSE LIGA SO (!carteira) { VOLTA FALSO }\nVOLTA VERDADEIRO\n```\n\nIndent each level by 2 spaces. Keep nesting to 3 levels or less.'),
[
  ['What technique avoids deep nesting?', 'early returns', 3],
  ['How many levels of nesting is recommended maximum?', '3', 5]
]
);

a('ternary-expressions', 'Ternary/Conditional Expressions', 20, 10, m(
'# Ternary/Conditional Expressions\n\nInline conditional using \`? :\`.\n\n## Syntax\n\n```xs\ncondicao ? valor_se_verdadeiro : valor_se_falso\n```\n\n## Examples\n\n```xs\nCRIA status = (idade >= 18) ? "Adulto" : "Menor"\nCRIA taxa = (renda > 5000) ? 0.3 : 0.15\n```\n\n## Chained Ternary\n\n```xs\nCRIA nota = (n >= 90) ? "A" :\n            (n >= 80) ? "B" :\n            (n >= 70) ? "C" : "F"\n```\n\nTernary is an **expression** (returns a value). If/else is a **statement**.\n\nUse for simple binary choices. Avoid deep chaining.'),
[
  ['What operator creates a conditional expression?', '? :', 3],
  ['Is ternary an expression or a statement?', 'expression', 5]
]
);

a('combina-basics', 'COMBINA Basics (Switch/Match)', 21, 10, m(
'# COMBINA Basics\n\n\`COMBINA\` is pattern matching, similar to \`switch\`/\`match\`.\n\n## Basic Syntax\n\n```xs\nCOMBINA (fruta) {\n  CASO "maca" => SOLTA O GRITO("Maca")\n  CASO "banana" => SOLTA O GRITO("Banana")\n  CASO _ => SOLTA O GRITO("Desconhecida")\n}\n```\n\n## Returning Values\n\n```xs\nCRIA msg = COMBINA (fruta) {\n  CASO "maca" => "Maca vermelha"\n  CASO _ => "Desconhecida"\n}\n```\n\n## Multiple Values per Case\n\n```xs\nCASO 301, 302 => "Redirect"\nCASO 400, 401, 403 => "Client Error"\n```\n\nEach arm returns a value. Wildcard \`_\` matches anything.'),
[
  ['What keyword starts pattern matching in XanaScript?', 'COMBINA', 3],
  ['What keyword defines a case?', 'CASO', 3],
  ['What character is the wildcard?', '_', 3]
]
);

a('combina-ranges', 'COMBINA with Ranges', 22, 10, m(
'# COMBINA with Ranges\n\nUse comparison operators in \`CASO\` arms.\n\n## Numeric Ranges\n\n```xs\nCOMBINA (nota) {\n  CASO 100 => "Perfeito"\n  CASO >= 90 => "Excelente"\n  CASO >= 80 => "Muito bom"\n  CASO >= 70 => "Bom"\n  CASO _ => "Estude mais"\n}\n```\n\n## Order Matters\n\nSpecific ranges must come first:\n\n```xs\n// Correct\nCASO >= 90 => "A"\nCASO >= 80 => "B"\n\n// Wrong: 90 never matches\nCASO >= 80 => "B"   // matches 80-100\nCASO >= 90 => "A"   // unreachable!\n```\n\nRange matching makes COMBINA far more expressive than traditional switch statements.'),
[
  ['Can COMBINA use comparison operators like >= in CASO arms?', 'yes', 3],
  ['What happens if a broader range comes before a narrower one?', 'the narrower case becomes unreachable', 5]
]
);

a('combina-wildcards', 'COMBINA Wildcards (_)', 23, 5, m(
'# COMBINA Wildcards\n\nThe underscore \`_\` matches any value.\n\n## Default Case\n\n```xs\nCOMBINA (valor) {\n  CASO 0 => "Zero"\n  CASO _ => "Nao e zero"\n}\n```\n\n## Non-Exhaustive Warning\n\nWithout wildcard, you get a warning:\n\n```xs\nCOMBINA (cor) {\n  CASO "azul" => "Blue"\n  // Warning: non-exhaustive pattern!\n}\n```\n\n## Placement\n\nThe wildcard must be the **last** arm because it matches everything. Always include a \`_\` wildcard to handle unexpected values gracefully.'),
[
  ['What character is the wildcard in COMBINA?', '_', 3],
  ['Where must the wildcard be placed?', 'last', 3]
]
);

a('combina-expressions', 'COMBINA Expressions (Returning Values)', 24, 10, m(
'# COMBINA Expressions\n\nCOMBINA is an expression, not just a statement.\n\n## Expression Form\n\n```xs\nCRIA r = COMBINA (x) {\n  CASO "a" => 1\n  CASO "b" => 2\n  CASO _ => 0\n}\n```\n\nAll arms should return the same type:\n\n```xs\nCRIA msg = COMBINA (cod) {\n  CASO 200 => "OK"\n  CASO 404 => "Not Found"\n  CASO _ => "Unknown"\n}\n```\n\n## In Function Returns\n\n```xs\nCHAMA ESSE CARA tipoDia(d) {\n  VOLTA COMBINA (d) {\n    CASO "sabado" => "Fim de semana"\n    CASO "domingo" => "Fim de semana"\n    CASO _ => "Dia util"\n  }\n}\n```\n\nUsing COMBINA as expression leads to more declarative code.'),
[
  ['Is COMBINA a statement or an expression?', 'expression', 3],
  ['What should all arms of a COMBINA expression return?', 'the same type', 3]
]
);

a('short-circuit-evaluation', 'Short-Circuit Evaluation', 25, 5, m(
'# Short-Circuit Evaluation\n\nRight operand only evaluated if necessary.\n\n## AND (\`E\`) Short-Circuit\n\nIf left is \`FALSO\`, right is skipped:\n\n```xs\nSE LIGA SO (user != null E user.ativo) {\n  // safe: right side skipped when null\n}\n```\n\n## OR (\`OU\`) Short-Circuit\n\nIf left is \`VERDADEIRO\`, right is skipped:\n\n```xs\nCRIA nome = user OU "Convidado"\n```\n\n## Practical Patterns\n\n```xs\n// Guard against null\nCRIA email = user E user.email\n\n// Default value\nCRIA display = nome OU "Visitante"\n\n// Early exit\nSE LIGA SO (!dados OU !dados.nome) { VOLTA FALSO }\n```'),
[
  ['What happens in E if the left operand is FALSO?', 'the right operand is not evaluated', 3],
  ['What operator would you use for a default value pattern?', 'OU', 3]
]
);

// ====== MODULE 3: DATA TYPES (26-33) ======
a('type-numero', 'Type: NUMERO', 26, 5, m(
'# Type: NUMERO\n\nAll numbers in XanaScript are of type \`NUMERO\` — both integers and floats.\n\n## Integer Literals\n\n```xs\nCRIA x = 42\nCRIA y = -10\nCRIA z = 1_000_000  // underscores for readability\n```\n\n## Float Literals\n\n```xs\nCRIA pi = 3.14159\nCRIA avogadro = 6.022e23\nCRIA negativo = -0.001\n```\n\n## Type Information\n\nUse \`TIPO()\` to inspect the type:\n\n```xs\nSOLTA O GRITO(TIPO(42))      // NUMERO\nSOLTA O GRITO(TIPO(3.14))    // NUMERO\n```\n\n## Operators\n\n\`+\`, \`-\`, \`*\`, \`/\`, \`%\` work with \`NUMERO\`. Division always returns a float.\n\n```xs\nCRIA a = 10 / 3   // 3.333...\nCRIA b = 10 // 3  // 3 (integer division)\n```\n\n\`//\` performs integer division (floor).'),
[
  ['What type are all numbers in XanaScript?', 'NUMERO', 3],
  ['What operator performs integer division?', '//', 5],
  ['What function inspects a values type?', 'TIPO', 3]
]
);

a('type-texto', 'Type: TEXTO', 27, 5, m(
'# Type: TEXTO\n\nStrings in XanaScript use double quotes and are type \`TEXTO\`.\n\n## String Literals\n\n```xs\nCRIA nome = "Maria"\nCRIA frase = "Ola, mundo!"\n```\n\n## Escape Sequences\n\n```xs\nCRIA s = "Linha 1\\nLinha 2"  // newline\nCRIA t = "Tab\\taqui"          // tab\nCRIA q = "Ela disse \\"Oi\\""   // quote\n```\n\n## Interpolation\n\n```xs\nCRIA nome = "Joao"\nCRIA saudacao = "Ola, ${nome}!"  // "Ola, Joao!"\n```\n\n## Operators\n\n- \`+\`: concatenation\n- \`*\`: repetition (\`"Ha" * 3\` → \`"HaHaHa"\`)\n- \`[]\`: indexing (\`"abc"[1]\` → \`"b"\`)\n- \`[::]\`: slicing (\`"abcdef"[1:4]\` → \`"bcd"\`)'),
[
  ['What type name represents strings in XanaScript?', 'TEXTO', 3],
  ['How do you interpolate a variable into a string?', '${variable}', 3],
  ['What does "abc" * 3 evaluate to?', 'abcabcabc', 5]
]
);

a('type-booleano', 'Type: BOOLEANO', 28, 5, m(
'# Type: BOOLEANO\n\nBooleans represent logical truth values.\n\n## Values\n\n- \`VERDADEIRO\` (true)\n- \`FALSO\` (false)\n\n## Logical Operators\n\n| Operator | Meaning |\n|----------|--------|\n| \`E\` | AND |\n| \`OU\` | OR |\n| \`!\` | NOT |\n| \`XOU\` | XOR |\n\n## Truthy/Falsy\n\nOnly \`FALSO\`, \`0\`, and empty strings are falsy. Everything else is truthy.\n\n```xs\nSE LIGA SO ("")   { SOLTA O GRITO("falsy") }   // runs\nSE LIGA SO (" ")  { SOLTA O GRITO("truthy") }  // runs\nSE LIGA SO (0)    { SOLTA O GRITO("falsy") }   // runs\nSE LIGA SO (1)    { SOLTA O GRITO("truthy") }  // runs\n```'),
[
  ['What are the two boolean values in XanaScript?', 'VERDADEIRO and FALSO', 3],
  ['What values are falsy in XanaScript?', 'FALSO, 0, and empty string', 5],
  ['What is the XOR operator?', 'XOU', 3]
]
);

a('type-lista', 'Type: LISTA', 29, 5, m(
'# Type: LISTA\n\nArrays in XanaScript are called \`LISTA\`.\n\n## Creating Lists\n\n```xs\nCRIA nums = [1, 2, 3, 4, 5]\nCRIA vazia = []\nCRIA mista = [1, "dois", VERDADEIRO]\n```\n\n## Indexing\n\nZero-based, negative indices wrap around:\n\n```xs\nCRIA items = [10, 20, 30, 40]\nSOLTA O GRITO(items[0])    // 10\nSOLTA O GRITO(items[-1])   // 40 (last)\n```\n\n## Methods\n\n| Method | Description |\n|--------|-------------|\n| \`lista.empurra(x)\` | Append |\n| \`lista.tira()\` | Pop last |\n| \`lista.tamanho\` | Length |\n| \`lista.mapa(fn)\` | Map |\n\n## Mutability\n\nLists declared with \`CRIA\` are mutable. Use \`CONSTANTE\` for immutable.'),
[
  ['How do you access the last element of a list?', 'negative index -1', 3],
  ['What method appends to a list?', 'empurra', 3],
  ['What property gives the length of a list?', 'tamanho', 3]
]
);

a('type-dicionario', 'Type: DICIONARIO', 30, 5, m(
'# Type: DICIONARIO\n\nDictionaries in XanaScript are key-value maps, type \`DICIONARIO\`.\n\n## Creating Dictionaries\n\n```xs\nCRIA user = {\n  "nome": "Maria",\n  "idade": 30,\n  "email": "maria@email.com"\n}\n```\n\n## Access\n\n```xs\nSOLTA O GRITO(user["nome"])   // Maria\nSOLTA O GRITO(user.nome)      // Maria (dot notation)\n```\n\n## Mutating\n\n```xs\nuser["telefone"] = "1234-5678"\nuser.idade = 31\nuser.tira("email")            // Remove key\n```\n\n## Iteration\n\n```xs\nPARA CADA (chave EM user) {\n  SOLTA O GRITO(chave + ": " + user[chave])\n}\n```\n\nKeys are always strings. Values can be any type.'),
[
  ['What type represents key-value maps?', 'DICIONARIO', 3],
  ['Can you use dot notation to access dictionary values?', 'yes', 3],
  ['What method removes a key from a dictionary?', 'tira', 3]
]
);

a('type-opcional', 'Type: OPCIONAL', 31, 5, m(
'# Type: OPCIONAL\n\nOptional types handle nullable values safely.\n\n## Declaration\n\nUse \`?\` suffix for optional types:\n\n```xs\nCRIA nome: TEXTO? = null\nCRIA idade: NUMERO? = 25\n```\n\n## Safe Access\n\nUse \`??\` for default values:\n\n```xs\nCRIA display = nome ?? "Visitante"\n```\n\n## Optional Chaining\n\nUse \`?.\` for safe property access:\n\n```xs\nCRIA cidade = user?.endereco?.cidade\n// null if any chain part is null\n```\n\n## Pattern Matching\n\n```xs\nCOMBINA (valor) {\n  CASO null => "Nulo"\n  CASO _ => "Valor: " + valor\n}\n```\n\nOptionals prevent null reference errors at compile time.'),
[
  ['What suffix makes a type optional?', '?', 3],
  ['What operator provides a default for null?', '??', 3],
  ['What operator provides safe property access?', '?.', 5]
]
);

a('type-inference', 'Type Inference', 32, 10, m(
'# Type Inference\n\nXanaScript infers types automatically. Annotations are optional.\n\n## How Inference Works\n\n```xs\nCRIA x = 42         // inferred: NUMERO\nCRIA nome = "Ana"   // inferred: TEXTO\nCRIA ativo = true   // inferred: BOOLEANO\n```\n\n## Literal Types\n\nConstants can have literal types:\n\n```xs\nCONSTANTE STATUS = "ativo"  // type: "ativo" literal\n```\n\n## Function Return Inference\n\n```xs\nCHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b  // inferred: NUMERO\n}\n```\n\n## When to Annotate\n\nAnnotate when inference is ambiguous or for documentation:\n\n```xs\nCRIA lista: LISTA<NUMERO> = []\nCHAMA ESSE CARA busca(id: NUMERO): TEXTO? { ... }\n```'),
[
  ['What type is x in: CRIA x = 42', 'NUMERO', 3],
  ['Are type annotations required in XanaScript?', 'no', 3],
  ['When should you annotate types?', 'when inference is ambiguous or for documentation', 5]
]
);

a('type-conversion', 'Type Conversion', 33, 10, m(
'# Type Conversion\n\nExplicit conversion between types uses built-in functions.\n\n## To Number\n\n```xs\nCRIA n = NUMERO("42")   // 42\nCRIA f = NUMERO("3.14") // 3.14\nCRIA b = NUMERO(true)   // 1\n```\n\n## To String\n\n```xs\nCRIA s = TEXTO(42)      // "42"\nCRIA t = TEXTO(true)    // "VERDADEIRO"\n```\n\n## To Boolean\n\n```xs\nCRIA b = BOOLEANO(1)    // true\nCRIA c = BOOLEANO("")   // false\n```\n\n## Type Checking\n\n```xs\nCRIA e_numero = TIPO(x) == NUMERO\nSOLTA O GRITO(e_numero)  // true or false\n```\n\n## Coercion Caveats\n\n\`+\` between string and number coerces to string:\n\n```xs\nCRIA r = "Total: " + 42   // "Total: 42"\n```\n\nAlways prefer explicit conversion for clarity.'),
[
  ['What function converts a value to a number?', 'NUMERO', 3],
  ['What does "Total: " + 42 produce?', 'Total: 42', 3],
  ['Should you rely on implicit coercion?', 'no, prefer explicit conversion', 5]
]
);

// ====== MODULE 4: FUNCTIONS (34-41) ======
a('function-basics', 'Function Basics', 34, 5, m(
'# Function Basics\n\nFunctions are declared with \`CHAMA ESSE CARA\` ("call this guy").\n\n## Basic Syntax\n\n```xs\nCHAMA ESSE CARA saudacao() {\n  SOLTA O GRITO("Ola!")\n}\n\nsaudacao()  // Ola!\n```\n\n## Parameters\n\n```xs\nCHAMA ESSE CARA soma(a, b) {\n  SOLTA O GRITO(a + b)\n}\n\nsoma(3, 4)  // 7\n```\n\n## Type Annotations\n\n```xs\nCHAMA ESSE CARA dividir(a: NUMERO, b: NUMERO): NUMERO {\n  VOLTA a / b\n}\n```\n\nParameters and return types can be annotated. The return type follows the parameter list with \`: Tipo\`.'),
[
  ['What keyword declares a function?', 'CHAMA ESSE CARA', 3],
  ['Where does the return type annotation go?', 'after the parameter list', 5],
  ['Can parameters have type annotations?', 'yes', 3]
]
);

a('function-return', 'Return Values', 35, 5, m(
'# Return Values\n\nUse \`VOLTA\` ("return") to return a value from a function.\n\n## Return Syntax\n\n```xs\nCHAMA ESSE CARA quadrado(x) {\n  VOLTA x * x\n}\n\nCRIA r = quadrado(5)  // 25\n```\n\n## Early Return\n\n```xs\nCHAMA ESSE CARA validar(n) {\n  SE LIGA SO (n < 0) {\n    VOLTA FALSO\n  }\n  VOLTA VERDADEIRO\n}\n```\n\n## Implicit Return\n\nIf the last expression lacks a semicolon, it\'s returned implicitly:\n\n```xs\nCHAMA ESSE CARA dobro(x) {\n  x * 2  // implicit return\n}\n```\n\n## Returning Multiple Values\n\nReturn an array or object:\n\n```xs\nCHAMA ESSE CARA minMax(lista) {\n  VOLTA { min: Math.menor(...lista), max: Math.maior(...lista) }\n}\n```'),
[
  ['What keyword returns a value?', 'VOLTA', 3],
  ['What happens if the last expression has no semicolon?', 'it is returned implicitly', 5],
  ['How do you return multiple values?', 'return an array or object', 3]
]
);

a('function-params', 'Parameters & Defaults', 36, 5, m(
'# Parameters & Defaults\n\nFunctions support default parameters and rest params.\n\n## Default Parameters\n\n```xs\nCHAMA ESSE CARA saudacao(nome = "Mundo") {\n  SOLTA O GRITO("Ola, " + nome)\n}\n\nsaudacao()          // Ola, Mundo\nsaudacao("Maria")   // Ola, Maria\n```\n\n## Rest Parameters\n\nUse \`...\` for variable arguments:\n\n```xs\nCHAMA ESSE CARA somarTudo(...nums) {\n  CRIA total = 0\n  PARA CADA (n EM nums) { total += n }\n  VOLTA total\n}\n\nsomarTudo(1, 2, 3, 4)  // 10\n```\n\n## Named Parameters\n\nPass an object for named-like behavior:\n\n```xs\nCHAMA ESSE CARA configurar(opts) {\n  CRIA host = opts.host ?? "localhost"\n  CRIA port = opts.port ?? 3000\n}\n\nconfigurar({ host: "example.com", port: 8080 })\n```\n\n## Parameter Count\n\nCalling with wrong argument count is a compile error.'),
[
  ['How do you define a default parameter?', 'param = valor', 3],
  ['What syntax captures variable arguments?', '...param', 3],
  ['How do you simulate named parameters?', 'pass an object', 3]
]
);

a('function-first-class', 'Functions as First-Class', 37, 10, m(
'# Functions as First-Class\n\nFunctions are values — assign them to variables, pass as arguments.\n\n## Assign to Variable\n\n```xs\nCHAMA ESSE CARA dobro(x) { VOLTA x * 2 }\nCRIA fn = dobro\nSOLTA O GRITO(fn(5))  // 10\n```\n\n## Anonymous Functions\n\n```xs\nCRIA quadrado = CHAMA ESSE CARA (x) { VOLTA x * x }\nSOLTA O GRITO(quadrado(4))  // 16\n```\n\n## Passing to Higher-Order Functions\n\n```xs\nCRIA nums = [1, 2, 3, 4]\nCRIA dobrados = nums.mapa(CHAMA ESSE CARA (n) { VOLTA n * 2 })\n// [2, 4, 6, 8]\n```\n\n## Returning Functions\n\n```xs\nCHAMA ESSE CARA criarMultiplicador(fator) {\n  VOLTA CHAMA ESSE CARA (x) { VOLTA x * fator }\n}\n\nCRIA triplicar = criarMultiplicador(3)\nSOLTA O GRITO(triplicar(5))  // 15\n```\n\nThis enables closures and functional programming patterns.'),
[
  ['Can you assign a function to a variable?', 'yes', 3],
  ['What syntax creates an anonymous function?', 'CHAMA ESSE CARA (params) { body }', 3],
  ['What is a closure?', 'a function that captures surrounding scope', 5]
]
);

a('function-arrow', 'Arrow Functions (=>)', 38, 10, m(
'# Arrow Functions\n\nArrow functions offer a shorter syntax.\n\n## Single Expression\n\n```xs\nCRIA dobro = (x) => x * 2\nSOLTA O GRITO(dobro(5))  // 10\n```\n\n## Multiple Parameters\n\n```xs\nCRIA soma = (a, b) => a + b\n```\n\n## No Parameters\n\n```xs\nCRIA saudacao = () => "Ola!"\n```\n\n## Block Body\n\nFor multiple statements, use \`{}\`:\n\n```xs\nCRIA processar = (x) => {\n  CRIA r = x * 2\n  SOLTA O GRITO("Resultado: " + r)\n  VOLTA r\n}\n```\n\n## Differences from Regular Functions\n\n- Arrow functions capture \`ISTO\` from surrounding scope\n- Cannot be used as constructors\n- Cannot have a name (always anonymous)'),
[
  ['What is the arrow function syntax?', '(params) => expression', 3],
  ['Do arrow functions capture ISTO from the surrounding scope?', 'yes', 3],
  ['Can arrow functions be used as constructors?', 'no', 5]
]
);

a('function-recursion', 'Recursion', 39, 10, m(
'# Recursion\n\nFunctions can call themselves — XanaScript supports recursion.\n\n## Basic Recursion\n\n```xs\nCHAMA ESSE CARA fatorial(n) {\n  SE LIGA SO (n <= 1) { VOLTA 1 }\n  VOLTA n * fatorial(n - 1)\n}\n\nSOLTA O GRITO(fatorial(5))  // 120\n```\n\n## Tail Recursion\n\nThe compiler optimizes tail-recursive calls into loops:\n\n```xs\nCHAMA ESSE CARA fatorialTail(n, acc = 1) {\n  SE LIGA SO (n <= 1) { VOLTA acc }\n  VOLTA fatorialTail(n - 1, n * acc)  // tail call\n}\n```\n\n## Recursive Data Structures\n\n```xs\nCHAMA ESSE CARA tamanhoLista(lista) {\n  SE LIGA SO (lista.tamanho == 0) { VOLTA 0 }\n  VOLTA 1 + tamanhoLista(lista[1::])\n}\n```\n\n## Caution\n\nWithout tail recursion optimization, deep recursion can overflow the stack (>10000 calls).'),
[
  ['What optimization does the compiler apply to tail recursion?', 'converts to loop', 5],
  ['How deep can recursion go before stack overflow?', 'about 10000 calls', 3]
]
);

a('function-purity', 'Pure Functions', 40, 10, m(
'# Pure Functions\n\nPure functions have no side effects and always return the same output for the same input.\n\n## Pure Example\n\n```xs\nCHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b  // no side effects, deterministic\n}\n```\n\n## Impure Example\n\n```xs\nCRIA total = 0\nCHAMA ESSE CARA adicionar(n) {\n  total += n  // modifies external state\n}\n```\n\n## Benefits of Purity\n\n- Easier to test (no setup needed)\n- Referentially transparent (can reorder/inline)\n- Thread-safe (no shared state)\n- Memoizable (cache results)\n\n## Pure Annotation\n\nUse \`PURO\` keyword to enforce purity at compile time:\n\n```xs\nCHAMA ESSE CARA PURO quadrado(x) {\n  VOLTA x * x\n}\n```\n\nThe compiler rejects side effects in \`PURO\` functions.'),
[
  ['What makes a function pure?', 'no side effects, deterministic', 3],
  ['What keyword enforces purity?', 'PURO', 5],
  ['Name one benefit of pure functions', 'easier to test / thread-safe / memoizable', 3]
]
);

a('function-overloading', 'Function Overloading', 41, 10, m(
'# Function Overloading\n\nDefine multiple functions with the same name but different parameter types.\n\n## Type-Based Overloading\n\n```xs\nCHAMA ESSE CARA mostrar(x: NUMERO) {\n  SOLTA O GRITO("Numero: " + x)\n}\n\nCHAMA ESSE CARA mostrar(x: TEXTO) {\n  SOLTA O GRITO("Texto: " + x)\n}\n\nmostrar(42)        // Numero: 42\nmostrar("Ola")     // Texto: Ola\n```\n\n## Parameter Count\n\n```xs\nCHAMA ESSE CARA criar() { ... }\nCHAMA ESSE CARA criar(nome: TEXTO) { ... }\nCHAMA ESSE CARA criar(nome: TEXTO, idade: NUMERO) { ... }\n```\n\n## Resolution\n\nThe compiler picks the best match. Ambiguous calls produce a compile error.\n\nOverloading enables expressive APIs without different function names.'),
[
  ['Can you have multiple functions with the same name?', 'yes, with different parameter types', 3],
  ['What happens on ambiguous overload?', 'compile error', 3]
]
);

// ====== MODULE 5: COLLECTIONS & ITERATION (42-49) ======
a('list-operations', 'List Operations', 42, 5, m(
'# List Operations\n\nCore operations for working with lists.\n\n## map, filter, reduce\n\n```xs\nCRIA nums = [1, 2, 3, 4, 5]\nCRIA dobrados = nums.mapa((n) => n * 2)\nCRIA pares = nums.filtra((n) => n % 2 == 0)\nCRIA soma = nums.reduz((acc, n) => acc + n, 0)\n```\n\n## find, some, every\n\n```xs\nCRIA primeiroPar = nums.acha((n) => n % 2 == 0)\nCRIA temNegativo = nums.algum((n) => n < 0)\nCRIA todosPositivos = nums.todos((n) => n > 0)\n```\n\n## Sorting\n\n```xs\nCRIA ordenado = nums.ordena()\nCRIA reverso = nums.ordena((a, b) => b - a)\n```\n\n## Chaining\n\n```xs\nCRIA resultado = nums\n  .filtra((n) => n > 2)\n  .mapa((n) => n * 10)\n  .reduz((a, n) => a + n, 0)\n```\n\nMethods return new lists — original is unchanged.'),
[
  ['What method transforms each element?', 'mapa', 3],
  ['What method filters elements?', 'filtra', 3],
  ['Can list methods be chained?', 'yes', 3]
]
);

a('list-comprehension', 'List Comprehensions', 43, 10, m(
'# List Comprehensions\n\nBuild new lists with a declarative syntax.\n\n## Basic Comprehension\n\n```xs\nCRIA quadrados = [n * n PARA n EM nums]\n```\n\n## With Filter\n\n```xs\nCRIA paresDobrados = [n * 2 PARA n EM nums SE n % 2 == 0]\n```\n\n## Nested Loops\n\n```xs\nCRIA pares = [(x, y) PARA x EM [1,2] PARA y EM [3,4]]\n// [(1,3), (1,4), (2,3), (2,4)]\n```\n\n## Comprehension vs Methods\n\nUse comprehensions for readability, \`mapa\`/\`filtra\` for complex transformations.\n\nComprehensions compile efficiently — similar performance to manual loops.'),
[
  ['What syntax creates a list comprehension?', '[expr PARA var EM list]', 3],
  ['How do you add a filter to a comprehension?', 'SE condicao at the end', 3],
  ['Can comprehensions have nested loops?', 'yes', 3]
]
);

a('set-type', 'Type: CONJUNTO', 44, 5, m(
'# Type: CONJUNTO\n\nSets are unordered collections of unique values.\n\n## Creating Sets\n\n```xs\nCRIA cores = CONJUNTO{"azul", "verde", "vermelho"}\nCRIA vazio = CONJUNTO{}\n```\n\n## Operations\n\n```xs\ncores.insere("amarelo")       // add\ncores.remove("azul")           // remove\nCRIA existe = cores.tem("verde")  // membership\n```\n\n## Set Theory\n\n```xs\nCRIA a = CONJUNTO{1, 2, 3}\nCRIA b = CONJUNTO{2, 3, 4}\nCRIA uniao = a + b           // {1, 2, 3, 4}\nCRIA intersec = a * b        // {2, 3}\nCRIA diferenca = a - b       // {1}\n```\n\n## Iteration\n\n```xs\nPARA CADA (cor EM cores) {\n  SOLTA O GRITO(cor)\n}\n```'),
[
  ['What type represents a set?', 'CONJUNTO', 3],
  ['What operator computes union of two sets?', '+', 3],
  ['What operator computes intersection?', '*', 5]
]
);

a('tuple-type', 'Type: TUPLA', 45, 5, m(
'# Type: TUPLA\n\nTuples are fixed-size ordered collections with position types.\n\n## Creating Tuples\n\n```xs\nCRIA ponto = (10, 20)\nCRIA usuario = ("Maria", 30, true)\n```\n\n## Access by Position\n\n```xs\nCRIA x = ponto[0]  // 10\nCRIA y = ponto[1]  // 20\n```\n\n## Destructuring\n\n```xs\nCRIA (nome, idade, ativo) = usuario\nSOLTA O GRITO(nome)  // Maria\n```\n\n## Typed Tuples\n\n```xs\nCRIA par: (TEXTO, NUMERO) = ("chave", 42)\n```\n\nTuples are immutable by default. Use them for returning multiple values from functions.'),
[
  ['How do you destructure a tuple?', '(var1, var2) = tuple', 3],
  ['Are tuples mutable by default?', 'no', 3],
  ['When should you use a tuple over a list?', 'for fixed-size collections with position-typed elements', 5]
]
);

a('range-type', 'Type: INTERVALO', 46, 5, m(
'# Type: INTERVALO\n\nRanges represent a sequence of values.\n\n## Creating Ranges\n\n```xs\nCRIA r1 = 1..5        // 1, 2, 3, 4, 5\nCRIA r2 = 1..<5       // 1, 2, 3, 4 (exclusive end)\nCRIA r3 = 0..10..2    // 0, 2, 4, 6, 8, 10 (step)\n```\n\n## Using Ranges\n\n```xs\nPARA CADA (i EM 1..5) {\n  SOLTA O GRITO(i)  // 1, 2, 3, 4, 5\n}\n```\n\n## Membership\n\n```xs\nCRIA dentro = 3 EM 1..10  // true\nCRIA fora = 20 EM 1..10   // false\n```\n\n## Slicing\n\nUse ranges for list slicing:\n\n```xs\nCRIA items = [0, 1, 2, 3, 4, 5]\nCRIA slice = items[1..4]  // [1, 2, 3, 4]\n```\n\nRanges are lazy — elements are computed on demand.'),
[
  ['How do you create an inclusive range from 1 to 5?', '1..5', 3],
  ['How do you create a range with a step?', 'start..end..step', 3],
  ['What operator checks membership in a range?', 'EM', 3]
]
);

a('iteration-para-cada', 'PARA CADA Loop', 47, 5, m(
'# PARA CADA Loop\n\nIterate over collections with a clean syntax.\n\n## Basic Syntax\n\n```xs\nCRIA frutas = ["maca", "banana", "cereja"]\nPARA CADA (fruta EM frutas) {\n  SOLTA O GRITO(fruta)\n}\n```\n\n## Index Access\n\n```xs\nPARA CADA ((i, fruta) EM frutas.comIndice()) {\n  SOLTA O GRITO(i + ": " + fruta)\n}\n```\n\n## Iterating Dictionaries\n\n```xs\nPARA CADA (chave EM dict) {\n  SOLTA O GRITO(chave + " = " + dict[chave])\n}\n```\n\n## Breaking Early\n\n```xs\nPARA CADA (n EM nums) {\n  SE LIGA SO (n > 100) { INTERROMPE }\n  SOLTA O GRITO(n)\n}\n```\n\n\`INTERROMPE\` breaks out of the loop.'),
[
  ['What keyword iterates over a collection?', 'PARA CADA', 3],
  ['How do you access the index in PARA CADA?', 'destructure (i, item) with comIndice()', 5],
  ['What keyword breaks out of a loop?', 'INTERROMPE', 3]
]
);

a('iteration-while', 'ENQUANTO Loop', 48, 5, m(
'# ENQUANTO Loop\n\nLoop while a condition is true.\n\n## Basic Syntax\n\n```xs\nCRIA contador = 0\nENQUANTO (contador < 5) {\n  SOLTA O GRITO(contador)\n  contador += 1\n}\n```\n\n## Infinite Loop\n\n```xs\nENQUANTO (VERDADEIRO) {\n  CRIA entrada = leEntrada()\n  SE LIGA SO (entrada == "sair") { INTERROMPE }\n  processa(entrada)\n}\n```\n\n## Do-While\n\n```xs\nFAZ {\n  CRIA n = sorteia()\n  SOLTA O GRITO(n)\n} ENQUANTO (n != 0)\n```\n\nUse \`ENQUANTO\` when the number of iterations is unknown. Use \`PARA CADA\` for iterating collections.'),
[
  ['What keyword starts a while loop?', 'ENQUANTO', 3],
  ['What is the do-while syntax?', 'FAZ { ... } ENQUANTO (cond)', 5],
  ['When should you use ENQUANTO over PARA CADA?', 'when iteration count is unknown', 3]
]
);

a('iteration-control', 'Loop Control: CONTINUE & INTERROMPE', 49, 5, m(
'# Loop Control\n\n\`CONTINUE\` skips to the next iteration. \`INTERROMPE\` exits the loop.\n\n## CONTINUE\n\n```xs\nPARA CADA (n EM 1..10) {\n  SE LIGA SO (n % 2 == 0) { CONTINUE }\n  SOLTA O GRITO(n)  // prints odd numbers\n}\n```\n\n## INTERROMPE\n\n```xs\nPARA CADA (n EM nums) {\n  SE LIGA SO (n < 0) {\n    SOLTA O GRITO("Negativo encontrado!")\n    INTERROMPE\n  }\n}\n```\n\n## Labeled Control\n\nBreak/continue to outer loops:\n\n```xs\nEXTERNO: PARA CADA (i EM 1..3) {\n  PARA CADA (j EM 1..3) {\n    SE LIGA SO (i * j > 4) { INTERROMPE EXTERNO }\n    SOLTA O GRITO(i * j)\n  }\n}\n```\n\nLabels make complex loop control readable and precise.'),
[
  ['What skips to the next iteration?', 'CONTINUE', 3],
  ['What exits the loop entirely?', 'INTERROMPE', 3],
  ['How do you break from an outer loop?', 'label: INTERROMPE label', 5]
]
);

// ====== MODULE 6: OBJECT ORIENTATION (50-57) ======
a('class-basics', 'Class Basics with CLASSE', 50, 5, m(
'# Class Basics\n\nClasses are defined with \`CLASSE\`.\n\n## Class Definition\n\n```xs\nCLASSE Pessoa {\n  CRIA nome\n  CRIA idade\n\n  CHAMA ESSE CARA init(nome, idade) {\n    ISTO.nome = nome\n    ISTO.idade = idade\n  }\n\n  CHAMA ESSE CARA saudacao() {\n    SOLTA O GRITO("Ola, sou " + ISTO.nome)\n  }\n}\n```\n\n## Creating Instances\n\n```xs\nCRIA p = Pessoa.novo("Maria", 30)\np.saudacao()  // Ola, sou Maria\n```\n\n## Properties\n\nProperties are declared with \`CRIA\` inside the class body. Use \`ISTO\` to refer to the current instance.\n\nThe \`init\` method acts as the constructor.'),
[
  ['What keyword defines a class?', 'CLASSE', 3],
  ['What keyword refers to the current instance?', 'ISTO', 3],
  ['What method acts as the constructor?', 'init', 3]
]
);

a('class-constructor', 'Class Constructors', 51, 5, m(
'# Class Constructors\n\nThe \`init\` method initializes a new instance.\n\n## Constructor Pattern\n\n```xs\nCLASSE Produto {\n  CRIA nome, preco, estoque\n\n  CHAMA ESSE CARA init(nome, preco, estoque = 0) {\n    ISTO.nome = nome\n    ISTO.preco = preco\n    ISTO.estoque = estoque\n  }\n}\n```\n\n## Multiple Constructors\n\nUse overloading:\n\n```xs\nCLASSE User {\n  CRIA nome, email\n\n  CHAMA ESSE CARA init() {\n    ISTO.nome = "anonimo"\n    ISTO.email = ""\n  }\n\n  CHAMA ESSE CARA init(nome, email) {\n    ISTO.nome = nome\n    ISTO.email = email\n  }\n}\n```\n\n## Factory Methods\n\nStatic methods that create instances:\n\n```xs\nCLASSE User {\n  CHAMA ESSE CARA ESTATICO criarConvidado() {\n    VOLTA User.novo("Convidado", "guest@site.com")\n  }\n}\n```\n\n\`ESTATICO\` defines a static method.'),
[
  ['What method is the constructor?', 'init', 3],
  ['Can a class have multiple constructors?', 'yes, via overloading', 5],
  ['What keyword defines a static method?', 'ESTATICO', 3]
]
);

a('class-methods', 'Instance & Static Methods', 52, 5, m(
'# Instance & Static Methods\n\nMethods can be instance-level or class-level.\n\n## Instance Methods\n\nOperate on an instance via \`ISTO\`:\n\n```xs\nCLASSE Conta {\n  CRIA saldo\n\n  CHAMA ESSE CARA depositar(valor) {\n    ISTO.saldo += valor\n  }\n}\n```\n\n## Static Methods\n\nBelong to the class, not instances:\n\n```xs\nCLASSE Math {\n  CHAMA ESSE CARA ESTATICO max(a, b) {\n    VOLTA a > b ? a : b\n  }\n}\n\nSOLTA O GRITO(Math.max(10, 20))  // 20\n```\n\n## Property Getters/Setters\n\n```xs\nCLASSE Pessoa {\n  CRIA _nome\n\n  PEGA nome() { VOLTA ISTO._nome }\n  COLOCA nome(valor) { ISTO._nome = valor.paraMaiusculo() }\n}\n```\n\n\`PEGA\` (get) and \`COLOCA\` (set) define computed properties.'),
[
  ['What keyword defines a static method?', 'ESTATICO', 3],
  ['What keyword defines a getter?', 'PEGA', 3],
  ['What keyword defines a setter?', 'COLOCA', 5]
]
);

a('class-encapsulation', 'Encapsulation', 53, 5, m(
'# Encapsulation\n\nControl access to class members.\n\n## Private Members\n\nPrefix with underscore:\n\n```xs\nCLASSE Banco {\n  CRIA _saldo = 0  // private by convention\n  CRIA _extrato = []\n\n  CHAMA ESSE CARA depositar(v) {\n    ISTO._saldo += v\n    ISTO._extrato.empurra("Deposito: " + v)\n  }\n\n  PEGA saldo() { VOLTA ISTO._saldo }\n}\n```\n\n## Private Keyword\n\nUse \`PRIVADO\` for enforced privacy:\n\n```xs\nCLASSE Conta {\n  PRIVADO CRIA _saldo\n  PRIVADO CHAMA ESSE CARA _log(msg) { ... }\n}\n```\n\n## Public API\n\nExpose only what\'s needed:\n\n```xs\nCLASSE API {\n  CRIA PRIVADO _url\n\n  CHAMA ESSE CARA buscar() { ... }   // public\n  PRIVADO CHAMA ESSE CARA _parse() { ... }\n}\n```\n\nEncapsulation reduces coupling and prevents misuse.'),
[
  ['What prefix conventionally marks private members?', '_', 3],
  ['What keyword enforces private access?', 'PRIVADO', 5],
  ['What is a benefit of encapsulation?', 'reduces coupling / prevents misuse', 3]
]
);

a('class-properties', 'Computed Properties', 54, 10, m(
'# Computed Properties\n\nProperties with custom get/set logic.\n\n## Getter\n\n```xs\nCLASSE Circulo {\n  CRIA _raio\n\n  CHAMA ESSE CARA init(r) { ISTO._raio = r }\n\n  PEGA area() {\n    VOLTA 3.14159 * ISTO._raio * ISTO._raio\n  }\n\n  PEGA circunferencia() {\n    VOLTA 2 * 3.14159 * ISTO._raio\n  }\n}\n```\n\n## Setter\n\n```xs\nCLASSE Temperatura {\n  CRIA _celsius\n\n  PEGA fahrenheit() { VOLTA ISTO._celsius * 1.8 + 32 }\n\n  COLOCA fahrenheit(v) {\n    ISTO._celsius = (v - 32) / 1.8\n  }\n}\n```\n\n## Usage\n\n```xs\nCRIA t = Temperatura.novo()\nt.fahrenheit = 212\nSOLTA O GRITO(t._celsius)  // 100\n```\n\nComputed properties look like fields but execute code on access.'),
[
  ['What defines a getter?', 'PEGA', 3],
  ['What defines a setter?', 'COLOCA', 3],
  ['Can computed properties have both get and set?', 'yes', 3]
]
);

a('class-operator', 'Operator Overloading', 55, 10, m(
'# Operator Overloading\n\nDefine custom behavior for operators on your classes.\n\n## Overloadable Operators\n\n```xs\nCLASSE Vetor {\n  CRIA x, y\n\n  CHAMA ESSE CARA init(x, y) {\n    ISTO.x = x; ISTO.y = y\n  }\n\n  OPERADOR + (outro) {\n    VOLTA Vetor.novo(ISTO.x + outro.x, ISTO.y + outro.y)\n  }\n\n  OPERADOR * (escalar) {\n    VOLTA Vetor.novo(ISTO.x * escalar, ISTO.y * escalar)\n  }\n\n  OPERADOR == (outro) {\n    VOLTA ISTO.x == outro.x E ISTO.y == outro.y\n  }\n\n  OPERADOR TEXTO() {\n    VOLTA "Vetor(" + ISTO.x + ", " + ISTO.y + ")"\n  }\n}\n```\n\n## Usage\n\n```xs\nCRIA v1 = Vetor.novo(1, 2)\nCRIA v2 = Vetor.novo(3, 4)\nCRIA soma = v1 + v2  // Vetor(4, 6)\n```\n\nOperators make custom types feel native.'),
[
  ['What keyword defines operator overloading?', 'OPERADOR', 3],
  ['Which operator can you use for string conversion?', 'OPERADOR TEXTO', 5],
  ['Can overloading make code more readable?', 'yes', 3]
]
);

a('class-composition', 'Composition vs Inheritance', 56, 10, m(
'# Composition vs Inheritance\n\nPrefer composition over inheritance.\n\n## Composition Example\n\n```xs\nCLASSE Motor {\n  CHAMA ESSE CARA ligar() { SOLTA O GRITO("Motor ligado") }\n}\n\nCLASSE Carro {\n  CRIA motor\n\n  CHAMA ESSE CARA init() {\n    ISTO.motor = Motor.novo()\n  }\n\n  CHAMA ESSE CARA ligar() {\n    ISTO.motor.ligar()\n  }\n}\n```\n\n## When to Use Inheritance\n\nUse when there is a clear "is-a" relationship:\n\n```xs\nCLASSE Animal { ... }\nCLASSE Cachorro EXTENDE Animal { ... }\n```\n\n## Favor Composition\n\n- More flexible (swap components at runtime)\n- Easier to test (mock components)\n- Avoids deep hierarchy issues\n\nUse \`EXTENDE\` for true subtype relationships, composition for code reuse.'),
[
  ['Should you prefer composition or inheritance?', 'composition', 3],
  ['When is inheritance appropriate?', 'when there is a clear is-a relationship', 5],
  ['What keyword extends a class?', 'EXTENDE', 3]
]
);

a('class-static', 'Static Members & Singleton', 57, 10, m(
'# Static Members & Singleton\n\nClass-level members shared across all instances.\n\n## Static Properties\n\n```xs\nCLASSE Config {\n  CRIA ESTATICO _instancia = null\n  CRIA ESTATICO versao = "2.0"\n\n  CHAMA ESSE CARA ESTATICO getInstancia() {\n    SE LIGA SO (!Config._instancia) {\n      Config._instancia = Config.novo()\n    }\n    VOLTA Config._instancia\n  }\n}\n\nSOLTA O GRITO(Config.versao)  // 2.0\n```\n\n## Singleton Pattern\n\n```xs\nCLASSE DatabasePool {\n  PRIVADO CRIA ESTATICO _pool = null\n\n  CHAMA ESSE CARA ESTATICO conectar() {\n    SE LIGA SO (!DatabasePool._pool) {\n      DatabasePool._pool = DatabasePool.novo()\n    }\n    VOLTA DatabasePool._pool\n  }\n\n  PRIVADO CHAMA ESSE CARA init() {\n    // private constructor\n  }\n}\n```\n\nStatic members are initialized lazily.'),
[
  ['What keyword makes a member static?', 'ESTATICO', 3],
  ['Are static properties shared across instances?', 'yes', 3],
  ['Can the init constructor be private?', 'yes, with PRIVADO', 3]
]
);

// ====== MODULE 7: INHERITANCE & POLYMORPHISM (58-65) ======
a('inheritance-basics', 'Inheritance with EXTENDE', 58, 5, m(
'# Inheritance Basics\n\nA class can extend another class with \`EXTENDE\`.\n\n## Syntax\n\n```xs\nCLASSE Animal {\n  CRIA nome\n\n  CHAMA ESSE CARA init(nome) { ISTO.nome = nome }\n  CHAMA ESSE CARA som() { SOLTA O GRITO("...") }\n}\n\nCLASSE Cachorro EXTENDE Animal {\n  CHAMA ESSE CARA som() {\n    SOLTA O GRITO("Au au!")\n  }\n}\n\nCRIA rex = Cachorro.novo("Rex")\nSOLTA O GRITO(rex.nome)  // Rex (inherited)\nrex.som()                // Au au! (overridden)\n```\n\n## Super Keyword\n\nCall parent methods with \`SUPER\`:\n\n```xs\nCLASSE Gato EXTENDE Animal {\n  CHAMA ESSE CARA som() {\n    SOLTA O GRITO("Miau!")\n    SUPER.som()\n  }\n}\n```'),
[
  ['What keyword extends a class?', 'EXTENDE', 3],
  ['How do you call a parent method?', 'SUPER.metodo()', 3],
  ['Can a child class inherit properties?', 'yes', 3]
]
);

a('method-override', 'Method Overriding', 59, 5, m(
'# Method Overriding\n\nChild classes can override methods from the parent.\n\n## Override Rules\n\n```xs\nCLASSE Forma {\n  CHAMA ESSE CARA area() { VOLTA 0 }\n}\n\nCLASSE Retangulo EXTENDE Forma {\n  CRIA largura, altura\n\n  CHAMA ESSE CARA init(l, a) { ISTO.largura = l; ISTO.altura = a }\n\n  CHAMA ESSE CARA area() {  // override\n    VOLTA ISTO.largura * ISTO.altura\n  }\n}\n```\n\n## Preventing Override\n\nUse \`FINAL\` to prevent overriding:\n\n```xs\nCLASSE Base {\n  CHAMA ESSE CARA FINAL naoPodeSobrescrever() { ... }\n}\n```\n\n## Abstract Methods\n\nDefine method signatures without implementation:\n\n```xs\nCLASSE Abstrata Forma {\n  CHAMA ESSE CARA area()  // abstract — no body\n}\n```\n\n\`FINAL\` prevents override. Methods without a body are abstract.'),
[
  ['What keyword prevents method overriding?', 'FINAL', 3],
  ['How do you define an abstract method?', 'declare without a body', 5],
  ['Can abstract classes be instantiated?', 'no', 3]
]
);

a('polymorphism', 'Polymorphism', 60, 10, m(
'# Polymorphism\n\nObjects of different types respond to the same interface.\n\n## Polymorphic Behavior\n\n```xs\nCLASSE Passaro {\n  CHAMA ESSE CARA mover() { SOLTA O GRITO("Voando") }\n}\n\nCLASSE Peixe {\n  CHAMA ESSE CARA mover() { SOLTA O GRITO("Nadando") }\n}\n\nCHAMA ESSE CARA fazerMover(animal) {\n  animal.mover()  // works for any object with mover()\n}\n\nfazerMover(Passaro.novo())  // Voando\nfazerMover(Peixe.novo())    // Nadando\n```\n\n## With Inheritance\n\n```xs\nCLASSE Veiculo {\n  CHAMA ESSE CARA mover() { }\n}\n\nCLASSE Carro EXTENDE Veiculo { CHAMA ESSE CARA mover() { ... } }\nCLASSE Bicicleta EXTENDE Veiculo { CHAMA ESSE CARA mover() { ... } }\n```\n\nPolymorphism enables flexible, extensible designs without conditionals.'),
[
  ['What is polymorphism?', 'objects of different types respond to the same interface', 3],
  ['Does polymorphism require inheritance?', 'no, duck typing works too', 5],
  ['What is a benefit of polymorphism?', 'reduces conditionals, enables extensibility', 3]
]
);

a('abstract-classes', 'Abstract Classes', 61, 10, m(
'# Abstract Classes\n\nAbstract classes define a template with some methods unimplemented.\n\n## Defining Abstract Class\n\n```xs\nCLASSE Abstrata Forma {\n  CHAMA ESSE CARA area()  // abstract — no body\n  CHAMA ESSE CARA descrever() {\n    SOLTA O GRITO("Area: " + ISTO.area())\n  }\n}\n\nCLASSE Quadrado EXTENDE Forma {\n  CRIA lado\n  CHAMA ESSE CARA init(l) { ISTO.lado = l }\n  CHAMA ESSE CARA area() { VOLTA ISTO.lado * ISTO.lado }\n}\n```\n\n## Rules\n\n- Cannot instantiate abstract classes directly\n- Child classes must implement all abstract methods\n- Use \`Abstrata\` annotation on the class\n\nAbstract classes provide a contract plus shared implementation.'),
[
  ['Can you instantiate an abstract class?', 'no', 3],
  ['What annotation makes a class abstract?', 'Abstrata', 5],
  ['Must child classes implement all abstract methods?', 'yes', 3]
]
);

a('interfaces', 'Interfaces with PROTOCOLO', 62, 10, m(
'# Interfaces (PROTOCOLO)\n\nDefine a contract without implementation.\n\n## Protocol Definition\n\n```xs\nPROTOCOLO Imprimivel {\n  CHAMA ESSE CARA imprimir(): TEXTO\n  CHAMA ESSE CARA formato(): TEXTO\n}\n```\n\n## Implementing a Protocol\n\n```xs\nCLASSE Documento IMPLEMENTA Imprimivel {\n  CRIA conteudo\n  CHAMA ESSE CARA init(c) { ISTO.conteudo = c }\n\n  CHAMA ESSE CARA imprimir() {\n    SOLTA O GRITO(ISTO.conteudo)\n  }\n\n  CHAMA ESSE CARA formato() {\n    VOLTA "Documento: " + ISTO.conteudo.tamanho + " chars"\n  }\n}\n```\n\n## Multiple Protocols\n\n```xs\nCLASSE Relatorio IMPLEMENTA Imprimivel, Exportavel { ... }\n```\n\nProtocols support multiple inheritance of contracts without the diamond problem.'),
[
  ['What keyword defines an interface?', 'PROTOCOLO', 3],
  ['What keyword implements a protocol?', 'IMPLEMENTA', 3],
  ['Can a class implement multiple protocols?', 'yes', 3]
]
);

a('multiple-inheritance', 'Multiple Inheritance via Protocols', 63, 10, m(
'# Multiple Inheritance\n\nProtocols allow inheriting multiple contracts.\n\n## Combining Protocols\n\n```xs\nPROTOCOLO Salvavel {\n  CHAMA ESSE CARA salvar(): TEXTO\n}\n\nPROTOCOLO Carregavel {\n  CHAMA ESSE CARA carregar(dados: TEXTO)\n}\n\nCLASSE Arquivo IMPLEMENTA Salvavel, Carregavel {\n  CRIA caminho\n\n  CHAMA ESSE CARA init(c) { ISTO.caminho = c }\n\n  CHAMA ESSE CARA salvar() {\n    // implementation\n  }\n\n  CHAMA ESSE CARA carregar(dados) {\n    // implementation\n  }\n}\n```\n\n## Nominal vs Structural\n\nProtocols are nominal — you must explicitly declare \`IMPLEMENTA\`. This ensures intent is clear.\n\n## When to Use\n\nUse protocols when different classes share capabilities but not hierarchy.'),
[
  ['Can a class implement two protocols?', 'yes', 3],
  ['Are XanaScript protocols nominal or structural?', 'nominal', 5],
  ['Why use protocols over abstract classes?', 'when sharing capabilities across unrelated hierarchies', 3]
]
);

a('dependency-injection', 'Dependency Injection', 64, 10, m(
'# Dependency Injection\n\nPass dependencies rather than creating them internally.\n\n## Without DI (Tight Coupling)\n\n```xs\nCLASSE Servico {\n  CRIA repo = Repositorio.novo()  // hard dependency\n}\n```\n\n## With DI (Loose Coupling)\n\n```xs\nCLASSE Servico {\n  CRIA repo\n\n  CHAMA ESSE CARA init(repo) {\n    ISTO.repo = repo  // injected\n  }\n}\n```\n\n## Using Interfaces\n\n```xs\nPROTOCOLO RepoUsuario {\n  CHAMA ESSE CARA buscar(id): TEXTO\n}\n\nCLASSE Servico {\n  CRIA repo: RepoUsuario\n\n  CHAMA ESSE CARA init(repo: RepoUsuario) {\n    ISTO.repo = repo\n  }\n}\n```\n\nDI enables testing with mocks and swapping implementations.'),
[
  ['What is dependency injection?', 'passing dependencies rather than creating them internally', 3],
  ['What is a benefit of DI?', 'easier testing and swapping implementations', 5],
  ['Does DI work well with protocols?', 'yes', 3]
]
);

a('solid-overview', 'SOLID Principles', 65, 10, m(
'# SOLID Principles\n\nFive principles for maintainable OOP.\n\n## S — Single Responsibility\n\nA class should have one reason to change:\n\n```xs\n// Bad: both report and save\nCLASSE Relatorio {\n  CHAMA ESSE CARA gerar() { ... }\n  CHAMA ESSE CARA salvar() { ... }\n}\n\n// Good: separate concerns\nCLASSE Relatorio { CHAMA ESSE CARA gerar() { ... } }\nCLASSE Repositorio { CHAMA ESSE CARA salvar(r) { ... } }\n```\n\n## O — Open/Closed\n\nOpen for extension, closed for modification.\n\n## L — Liskov Substitution\n\nSubtypes must be substitutable for base types.\n\n## I — Interface Segregation\n\nKeep protocols focused.\n\n## D — Dependency Inversion\n\nDepend on abstractions, not concretions.\n\nFollowing SOLID yields maintainable, testable code.'),
[
  ['What does the S in SOLID stand for?', 'Single Responsibility', 3],
  ['What does the D in SOLID stand for?', 'Dependency Inversion', 3],
  ['What does Liskov Substitution mean?', 'subtypes must be substitutable for base types', 5]
]
);

// ====== MODULE 8: ERROR HANDLING (66-73) ======
a('error-basics', 'Error Handling with TENTE', 66, 5, m(
'# Error Handling\n\nErrors are handled with \`TENTE\` (try), \`CAPTURA\` (catch), \`FINALLY\` (finally).\n\n## Basic Try/Catch\n\n```xs\nTENTE {\n  CRIA resultado = operacaoRiscada()\n  SOLTA O GRITO(resultado)\n} CAPTURA (erro) {\n  SOLTA O GRITO("Erro: " + erro.mensagem)\n}\n```\n\n## Finally Block\n\nAlways executes, even on error:\n\n```xs\nTENTE {\n  CRIA arquivo = abrirArquivo("dados.txt")\n  processar(arquivo)\n} CAPTURA (erro) {\n  SOLTA O GRITO("Falha: " + erro)\n} FINALLY {\n  fecharArquivo(arquivo)\n}\n```\n\n## Multiple Catch\n\n```xs\nCAPTURA (erro: ErroValidacao) { ... }\nCAPTURA (erro: ErroBanco) { ... }\nCAPTURA (erro) { ... }  // default\n```\n\nUse \`TENTE\` for operations that may fail.'),
[
  ['What keyword starts a try block?', 'TENTE', 3],
  ['What keyword catches an error?', 'CAPTURA', 3],
  ['What block always executes?', 'FINALLY', 3]
]
);

a('throwing-errors', 'Throwing Errors', 67, 5, m(
'# Throwing Errors\n\nUse \`JOGAR\` (throw) to raise an error.\n\n## Basic Throw\n\n```xs\nCHAMA ESSE CARA dividir(a, b) {\n  SE LIGA SO (b == 0) {\n    JOGAR "Divisao por zero"\n  }\n  VOLTA a / b\n}\n```\n\n## Custom Error Messages\n\n```xs\nSE LIGA SO (!usuario) {\n  JOGAR "Usuario nao encontrado"\n}\n\nSE LIGA SO (saldo < valor) {\n  JOGAR "Saldo insuficiente. Disponivel: " + saldo\n}\n```\n\n## Error Objects\n\n```xs\nJOGAR Erro.novo("Validacao", "Campo obrigatorio")\n```\n\n## Rethrowing\n\n```xs\nCAPTURA (erro) {\n  SOLTA O GRITO("Log: " + erro)\n  JOGAR erro  // rethrow\n}\n```\n\nOnly throw errors for exceptional situations, not control flow.'),
[
  ['What keyword throws an error?', 'JOGAR', 3],
  ['Can you throw a string?', 'yes', 3],
  ['What pattern rethrows a caught error?', 'JOGAR erro inside CAPTURA', 3]
]
);

a('custom-errors', 'Custom Error Classes', 68, 10, m(
'# Custom Error Classes\n\nCreate domain-specific errors by extending the base error class.\n\n## Defining Custom Errors\n\n```xs\nCLASSE ErroAutenticacao EXTENDE Erro {\n  CRIA codigo\n\n  CHAMA ESSE CARA init(mensagem, codigo) {\n    SUPER.init(mensagem)\n    ISTO.codigo = codigo\n    ISTO.nome = "ErroAutenticacao"\n  }\n}\n\nCLASSE ErroValidacao EXTENDE Erro {\n  CRIA campo\n\n  CHAMA ESSE CARA init(mensagem, campo) {\n    SUPER.init(mensagem)\n    ISTO.campo = campo\n  }\n}\n```\n\n## Usage\n\n```xs\nSE LIGA SO (!senha) {\n  JOGAR ErroValidacao.novo("Senha obrigatoria", "senha")\n}\n\nCAPTURA (erro: ErroValidacao) {\n  SOLTA O GRITO("Campo: " + erro.campo)\n}\n```\n\nCustom errors enable precise error handling with domain-specific data.'),
[
  ['How do you create a custom error?', 'extend Erro class', 3],
  ['Why use custom errors?', 'for domain-specific error data and precise handling', 5]
]
);

a('error-patterns', 'Error Handling Patterns', 69, 10, m(
'# Error Handling Patterns\n\nCommon patterns for robust error handling.\n\n## Guard Clause\n\nCheck early, throw immediately:\n\n```xs\nCHAMA ESSE CARA buscarUsuario(id) {\n  SE LIGA SO (!id) { JOGAR "ID obrigatorio" }\n  SE LIGA SO (id < 0) { JOGAR "ID invalido" }\n\n  CRIA user = repo.busca(id)\n  SE LIGA SO (!user) { JOGAR "Nao encontrado" }\n\n  VOLTA user\n}\n```\n\n## Result Pattern (Without Exceptions)\n\n```xs\nCLASSE Resultado {\n  CRIA sucesso, valor, erro\n\n  CHAMA ESSE CARA ESTATICO ok(valor) {\n    VOLTA Resultado.novo(true, valor, null)\n  }\n\n  CHAMA ESSE CARA ESTATICO falha(erro) {\n    VOLTA Resultado.novo(false, null, erro)\n  }\n}\n```\n\n## Using Result\n\n```xs\nCRIA r = operacao()\nSE LIGA SO (r.sucesso) {\n  processar(r.valor)\n} SENAO {\n  SOLTA O GRITO("Erro: " + r.erro)\n}\n```'),
[
  ['What pattern checks conditions early?', 'guard clause', 3],
  ['What is an alternative to exceptions?', 'Result pattern', 5],
  ['What type does a guard clause use?', 'JOGAR / throw', 3]
]
);

a('error-validation', 'Input Validation', 70, 5, m(
'# Input Validation\n\nValidate inputs before processing.\n\n## Basic Validation\n\n```xs\nCHAMA ESSE CARA cadastrarUsuario(dados) {\n  SE LIGA SO (!dados.nome OU dados.nome.tamanho < 2) {\n    JOGAR "Nome deve ter ao menos 2 caracteres"\n  }\n\n  SE LIGA SO (!dados.email OU !dados.email.tem("@")) {\n    JOGAR "Email invalido"\n  }\n\n  SE LIGA SO (dados.idade < 18) {\n    JOGAR "Menor de idade nao permitido"\n  }\n\n  // process\n}\n```\n\n## Validation Library\n\nXanaScript provides built-in validation helpers:\n\n```xs\nimport { valida, regra } from "xs:validacao"\n\nCRIA regras = [\n  regra("nome", OBRIGATORIO),\n  regra("email", EMAIL),\n  regra("idade", NUMERICO, { min: 18 })\n]\n\nCRIA erros = valida(dados, regras)\n```\n\nAlways validate external input before processing.'),
[
  ['Should you validate inputs before processing?', 'yes', 3],
  ['What is a validation rule?', 'a condition that input must satisfy', 3],
  ['Where should validation happen?', 'at system boundaries (API, forms)', 3]
]
);

a('error-logging', 'Error Logging', 71, 5, m(
'# Error Logging\n\nLog errors for debugging and monitoring.\n\n## Basic Logging\n\n```xs\nTENTE {\n  operacao()\n} CAPTURA (erro) {\n  SOLTA O GRITO("ERRO: " + erro)\n  console.erro(erro)\n}\n```\n\n## Structured Logging\n\n```xs\nCLASSE Logger {\n  CHAMA ESSE CARA ESTATICO erro(msg, contexto = {}) {\n    CRIA entrada = {\n      nivel: "ERRO",\n      mensagem: msg,\n      timestamp: DataAgora(),\n      contexto: contexto\n    }\n    console.erro(JSON.serializa(entrada))\n  }\n}\n\n// Usage\nLogger.erro("Falha no banco", { db: "usuarios", erro: err })\n```\n\n## Log Levels\n\n- \`DEBUG\`: development details\n- \`INFO\`: normal operations\n- \`AVISO\`: warnings\n- \`ERRO\`: errors\n\nLog enough to diagnose problems, not so much that logs are noise.'),
[
  ['What log level is for errors?', 'ERRO', 3],
  ['Why use structured logging?', 'for machine-parseable, searchable logs', 5],
  ['What is the trade-off with logging?', 'too much = noise, too little = undiagnosable', 3]
]
);

a('error-recovery', 'Error Recovery Strategies', 72, 10, m(
'# Error Recovery\n\nStrategies for recovering from failures.\n\n## Retry Pattern\n\n```xs\nCHAMA ESSE CARA tentarComRetry(fn, tentativas = 3) {\n  PARA CADA (i EM 1..tentativas) {\n    TENTE {\n      VOLTA fn()\n    } CAPTURA (erro) {\n      SE LIGA SO (i == tentativas) { JOGAR erro }\n      SOLTA O GRITO("Tentativa " + i + " falhou. Retentando...")\n      esperar(1000 * i)\n    }\n  }\n}\n```\n\n## Circuit Breaker\n\nStop calling a failing service temporarily:\n\n```xs\nCLASSE CircuitBreaker {\n  CRIA falhas = 0, limite = 5, aberto = false\n\n  CHAMA ESSE CARA chamar(fn) {\n    SE LIGA SO (ISTO.aberto) {\n      JOGAR "Circuito aberto"\n    }\n    TENTE {\n      CRIA r = fn()\n      ISTO.falhas = 0\n      VOLTA r\n    } CAPTURA (e) {\n      ISTO.falhas += 1\n      SE LIGA SO (ISTO.falhas >= ISTO.limite) { ISTO.aberto = true }\n      JOGAR e\n    }\n  }\n}\n```\n\nChoose recovery strategy based on error type and system requirements.'),
[
  ['What pattern retries a failed operation?', 'retry pattern', 3],
  ['What pattern stops calling a failing service?', 'circuit breaker', 5],
  ['Should all errors be retried?', 'no, only transient errors', 3]
]
);

a('error-best-practices', 'Error Handling Best Practices', 73, 10, m(
'# Best Practices\n\nGuidelines for robust error handling.\n\n## 1. Fail Fast\n\nDetect errors as early as possible:\n\n```xs\nCHAMA ESSE CARA processar(dados) {\n  SE LIGA SO (!dados) { JOGAR "Dados obrigatorios" }\n  // continue...\n}\n```\n\n## 2. Don\'t Swallow Errors\n\n```xs\n// Bad\nCAPTURA (e) { /* do nothing */ }\n\n// Good\nCAPTURA (e) {\n  Logger.erro(e)\n  JOGAR  // or handle appropriately\n}\n```\n\n## 3. Use Specific Errors\n\nCatch specific types, not generic errors.\n\n## 4. Clean Up Resources\n\nUse \`FINALLY\` for cleanup.\n\n## 5. Document Error Conditions\n\nDocument what errors a function can throw.\n\nFollowing these practices prevents silent failures and data corruption.'),
[
  ['What does fail fast mean?', 'detect errors as early as possible', 3],
  ['Is it OK to swallow errors?', 'no', 3],
  ['Where should cleanup code go?', 'FINALLY block', 3]
]
);

// ====== MODULE 9: MODULES & IMPORTS (74-81) ======
a('module-basics', 'Module Basics', 74, 5, m(
'# Module Basics\n\nOrganize code into reusable modules.\n\n## Exporting\n\n```xs\n// math.xs\nexport CHAMA ESSE CARA soma(a, b) { VOLTA a + b }\nexport CHAMA ESSE CARA multiplicar(a, b) { VOLTA a * b }\n\nexport CONSTANTE PI = 3.14159\n```\n\n## Importing\n\n```xs\n// main.xs\nimport { soma, PI } from "./math.xs"\n\nSOLTA O GRITO(soma(2, 3))     // 5\nSOLTA O GRITO(PI)             // 3.14159\n```\n\n## Default Export\n\n```xs\n// utils.xs\nexport default CHAMA ESSE CARA log(msg) {\n  SOLTA O GRITO("[LOG] " + msg)\n}\n```\n\n## Default Import\n\n```xs\nimport log from "./utils.xs"\nlog("teste")  // [LOG] teste\n```\n\nEvery file can have one default export and multiple named exports.'),
[
  ['What keyword exports a value?', 'export', 3],
  ['What keyword imports a value?', 'import', 3],
  ['How many default exports can a module have?', 'one', 3]
]
);

a('module-named', 'Named Imports/Exports', 75, 5, m(
'# Named Imports/Exports\n\nImport and export specific names.\n\n## Named Exports\n\n```xs\n// shapes.xs\nexport CLASSE Circulo { ... }\nexport CLASSE Quadrado { ... }\nexport CHAMA ESSE CARA areaTotal(...formas) { ... }\n```\n\n## Named Imports\n\n```xs\nimport { Circulo, areaTotal } from "./shapes.xs"\n```\n\n## Aliases\n\nRename imports to avoid conflicts:\n\n```xs\nimport { Circulo as Circ, Quadrado as Quad } from "./shapes.xs"\nCRIA c = Circ.novo(5)\n```\n\n## Re-exporting\n\n```xs\nexport { soma, multiplicar } from "./math.xs"\n```\n\n## Namespace Import\n\n```xs\nimport * as Math from "./math.xs"\nSOLTA O GRITO(Math.soma(1, 2))\n```\n\nNamed imports are explicit and enable tree-shaking.'),
[
  ['How do you alias an import?', 'import { Original as Alias }', 3],
  ['How do you import everything from a module?', 'import * as name', 3],
  ['What is the main benefit of named imports?', 'tree-shaking and explicit dependencies', 5]
]
);

a('module-resolution', 'Module Resolution', 76, 5, m(
'# Module Resolution\n\nHow XanaScript finds imported modules.\n\n## Relative Paths\n\nStart with \`./\` or \`../\`:\n\n```xs\nimport { x } from "./utils.xs"\nimport { y } from "../lib/helper.xs"\n```\n\n## Package Names\n\nWithout a path prefix, resolves from \`node_modules\`:\n\n```xs\nimport { express } from "express"\n```\n\n## Built-in Modules\n\nUse \`xs:\` prefix for standard library:\n\n```xs\nimport { readFile, writeFile } from "xs:fs"\nimport { serve } from "xs:http"\n```\n\n## Resolution Order\n\n1. Built-in (\`xs:\*)\n2. Relative (\`./\`, \`../\`)\n3. Package (node_modules)\n\nThe compiler caches resolved paths for fast recompilation.'),
[
  ['What prefix denotes a relative import?', './ or ../', 3],
  ['What prefix denotes built-in modules?', 'xs:', 3],
  ['Where does the compiler look for package imports?', 'node_modules', 3]
]
);

a('module-circular', 'Circular Dependencies', 77, 10, m(
'# Circular Dependencies\n\nWhen module A imports from B and B imports from A.\n\n## The Problem\n\n```xs\n// a.xs\nimport { bFn } from "./b.xs"\nexport CHAMA ESSE CARA aFn() { bFn() }\n\n// b.xs\nimport { aFn } from "./a.xs"\nexport CHAMA ESSE CARA bFn() { aFn() }\n```\n\n## How XanaScript Handles It\n\nThe compiler detects cycles and allows them if they don\'t cause infinite initialization:\n\n- Exports are hoisted (available before initialization)\n- Runtime error if a circular import is used before its exports resolve\n\n## Best Practices\n\nAvoid cycles by:\n\n- Extracting shared logic into a third module\n- Using dependency injection\n- Restructuring to one-directional flow\n\n```xs\n// shared.xs (extracted common code)\nexport CHAMA ESSE CARA util() { ... }\n```\n\nCycles are sometimes unavoidable but should be minimized.'),
[
  ['Can XanaScript handle circular dependencies?', 'yes, with hoisted exports', 3],
  ['What is the best way to resolve cycles?', 'extract shared logic into a third module', 5]
]
);

a('module-packages', 'Creating Packages', 78, 10, m(
'# Creating Packages\n\nPackage your modules for distribution.\n\n## Package Structure\n\n```\nmeu-pacote/\n  package.json\n  src/\n    index.xs\n    utils.xs\n  README.md\n```\n\n## package.json\n\n```json\n{\n  "name": "meu-pacote",\n  "version": "1.0.0",\n  "main": "src/index.xs",\n  "xs": {\n    "entry": "src/index.xs"\n  }\n}\n```\n\n## Entry Point\n\n```xs\n// src/index.xs\nexport { soma } from "./utils.xs"\nexport { Cliente } from "./cliente.xs"\n```\n\n## Publishing\n\n```bash\nxs publish\n```\n\nOr via npm:\n\n```bash\nnpm publish\n```\n\nPackages enable code sharing across projects and with the community.'),
[
  ['What file configures a package?', 'package.json', 3],
  ['What field specifies the entry point?', 'main or xs.entry', 3],
  ['How do you publish a package?', 'xs publish or npm publish', 3]
]
);

a('module-lazy', 'Lazy Loading', 79, 10, m(
'# Lazy Loading\n\nLoad modules on demand to improve startup time.\n\n## Dynamic Import\n\n```xs\nCHAMA ESSE CARA carregarModulo(nome) {\n  CRIA mod = await import("./" + nome + ".xs")\n  mod.executar()\n}\n```\n\n## Conditional Loading\n\n```xs\nSE LIGA SO (processo.OS == "windows") {\n  CRIA win = await import("./windows.xs")\n  win.configurar()\n} SENAO {\n  CRIA unix = await import("./unix.xs")\n  unix.configurar()\n}\n```\n\n## Lazy vs Eager\n\n- Eager: all code loaded at startup\n- Lazy: code loaded when needed\n\n## Benefits\n\n- Faster startup\n- Lower memory usage\n- Code splitting for large apps\n\nUse lazy loading for rarely-used features or platform-specific code.'),
[
  ['What function dynamically imports a module?', 'import()', 3],
  ['What is a benefit of lazy loading?', 'faster startup / lower memory', 3],
  ['When should you use lazy loading?', 'for rarely-used features or platform-specific code', 3]
]
);

a('module-scope', 'Module Scope', 80, 5, m(
'# Module Scope\n\nEach module has its own scope.\n\n## Top-Level Scope\n\nVariables declared at the top level are module-scoped (not global):\n\n```xs\n// config.xs\nCRIA _senha = "secreta"  // only visible in this module\nexport CRIA versao = "1.0\"\n```\n\n## Global Variables\n\nUse \`global\` for cross-module state:\n\n```xs\n// globals.xs\nglobal.appName = "MeuApp"\nglobal.version = "1.0\"\n```\n\n## Import Side Effects\n\nImporting a module executes its top-level code once:\n\n```xs\n// Executes once when first imported\nimport "./config.xs"\n```\n\n## Module Caching\n\nModules are cached after first import. Subsequent imports use the cached instance.\n\nModule scope prevents naming collisions and encourages encapsulation.'),
[
  ['Are top-level variables automatically global?', 'no, they are module-scoped', 3],
  ['What keyword creates a cross-module global?', 'global', 3],
  ['Are modules cached after first import?', 'yes', 3]
]
);

a('module-standards', 'Module Standards', 81, 5, m(
'# Module Standards\n\nConventions for organizing modules.\n\n## File Naming\n\n- Use \`kebab-case.xs\` for filenames\n- One main export per file\n- Index files for barrel exports\n\n## Directory Structure\n\n```\nsrc/\n  index.xs           // main entry\n  components/        // UI components\n    button.xs\n    input.xs\n  services/          // business logic\n    auth.xs\n    api.xs\n  utils/             // helpers\n    format.xs\n    validacao.xs\n```\n\n## Barrel Exports\n\n```xs\n// src/components/index.xs\nexport { Button } from "./button.xs"\nexport { Input } from "./input.xs"\n```\n\n## Module Responsibility\n\nEach module should:\n- Do one thing well\n- Have a clear public API\n- Minimize dependencies\n\nConsistent structure makes navigation predictable.'),
[
  ['What naming convention is recommended for .xs files?', 'kebab-case', 3],
  ['What is a barrel export?', 're-exports from multiple files in one index', 3],
  ['What should each module do?', 'one thing well with a clear API', 3]
]
);

// ====== MODULE 10: FILE I/O (82-89) ======
a('file-read', 'Reading Files', 82, 5, m(
'# Reading Files\n\nUse \`xs:fs\` module for file operations.\n\n## Read File (Sync)\n\n```xs\nimport { readFile } from "xs:fs"\n\nCRIA conteudo = readFile("dados.txt", "utf8")\nSOLTA O GRITO(conteudo)\n```\n\n## Read File (Async)\n\n```xs\nimport { readFileAsync } from "xs:fs"\n\nCRIA conteudo = await readFileAsync("dados.txt")\nSOLTA O GRITO(conteudo)\n```\n\n## Read Lines\n\n```xs\nimport { readLines } from "xs:fs"\n\nPARA CADA (linha EM readLines("dados.txt")) {\n  SOLTA O GRITO(linha)\n}\n```\n\n## File Info\n\n```xs\nimport { stat } from "xs:fs"\n\nCRIA info = stat("arquivo.txt")\nSOLTA O GRITO(info.tamanho)\nSOLTA O GRITO(info.modified)\n```\n\nAlways handle errors when reading files.'),
[
  ['What module provides file operations?', 'xs:fs', 3],
  ['What function reads a file synchronously?', 'readFile', 3],
  ['How do you read a file asynchronously?', 'readFileAsync with await', 3]
]
);

a('file-write', 'Writing Files', 83, 5, m(
'# Writing Files\n\nWrite content to files using \`xs:fs\`.\n\n## Write File\n\n```xs\nimport { writeFile } from "xs:fs"\n\nwriteFile("saida.txt", "Conteudo do arquivo", "utf8")\n```\n\n## Append to File\n\n```xs\nimport { appendFile } from "xs:fs"\n\nappendFile("log.txt", "Nova linha\\n")\n```\n\n## Async Write\n\n```xs\nawait writeFileAsync("dados.json", JSON.serializa(objeto))\n```\n\n## Create Directory\n\n```xs\nimport { mkdir } from "xs:fs"\nmkdir("novo-diretorio", { recursivo: true })\n```\n\n## Check Existence\n\n```xs\nimport { exists } from "xs:fs"\nSE LIGA SO (exists("arquivo.txt")) {\n  // safe to read\n}\n```\n\nAlways close resources and handle write errors.'),
[
  ['What function writes to a file?', 'writeFile', 3],
  ['What function appends to a file?', 'appendFile', 3],
  ['What flag creates parent directories?', 'recursivo: true', 3]
]
);

a('file-json', 'JSON File Handling', 84, 10, m(
'# JSON File Handling\n\nRead and write JSON data.\n\n## Reading JSON\n\n```xs\nimport { readFile } from "xs:fs"\n\nCRIA raw = readFile("config.json", "utf8")\nCRIA config = JSON.parse(raw)\nSOLTA O GRITO(config.host)\n```\n\n## Writing JSON\n\n```xs\nimport { writeFile } from "xs:fs"\n\nCRIA dados = {\n  nome: "Maria",\n  idade: 30,\n  ativo: true\n}\n\nwriteFile("user.json", JSON.serializa(dados, null, 2))\n```\n\n## JSON.parse Options\n\n```xs\n// Reviver function transforms values\nCRIA data = JSON.parse(raw, (chave, valor) => {\n  SE LIGA SO (chave == "data") { VOLTA new Data(valor) }\n  VOLTA valor\n})\n```\n\n## Error Handling\n\n```xs\nTENTE {\n  CRIA config = JSON.parse(raw)\n} CAPTURA (e) {\n  SOLTA O GRITO("JSON invalido: " + e)\n}\n```\n\nJSON is the standard format for structured data exchange.'),
[
  ['What function parses a JSON string?', 'JSON.parse', 3],
  ['What function serializes to JSON?', 'JSON.serializa', 3],
  ['Why handle JSON parse errors?', 'because input may be malformed', 3]
]
);

a('file-streams', 'File Streams', 85, 10, m(
'# File Streams\n\nProcess large files without loading entirely into memory.\n\n## Reading Stream\n\n```xs\nimport { createReadStream } from "xs:fs"\n\nCRIA stream = createReadStream("grande.txt")\n\nstream.em("dados", (chunk) => {\n  processaChunk(chunk)\n})\n\nstream.em("fim", () => {\n  SOLTA O GRITO("Leitura concluida")\n})\n```\n\n## Writing Stream\n\n```xs\nimport { createWriteStream } from "xs:fs"\n\nCRIA out = createWriteStream("saida.txt")\nPARA CADA (item EM dados) {\n  out.escreve(item + "\\n")\n}\nout.fecha()\n```\n\n## Piping\n\n```xs\nimport { createReadStream, createWriteStream } from "xs:fs"\n\nCRIA origem = createReadStream("origem.txt")\nCRIA destino = createWriteStream("destino.txt")\norigem.pipe(destino)\n```\n\nStreams prevent memory issues with files larger than available RAM.'),
[
  ['Why use streams for large files?', 'to avoid loading entire file into memory', 5],
  ['What event provides data chunks?', 'dados', 3],
  ['What method connects read to write stream?', 'pipe', 3]
]
);

a('file-paths', 'Path Manipulation', 86, 5, m(
'# Path Manipulation\n\nWork with file paths using \`xs:path\`.\n\n## Path Operations\n\n```xs\nimport { join, resolve, dirname, basename, extname } from "xs:path"\n\nCRIA full = join("pasta", "sub", "arquivo.xs")\nCRIA abs = resolve("./relativo.txt")\nCRIA dir = dirname("/a/b/c.txt\")  // /a/b\nCRIA base = basename("/a/b/c.txt\") // c.txt\nCRIA ext = extname("arquivo.xs\")   // .xs\n```\n\n## Platform Independence\n\n\`join\` uses the correct separator for the platform:\n\n```xs\n// Windows: pasta\\sub\\arquivo\n// Linux: pasta/sub/arquivo\nCRIA path = join("pasta", "sub", "arquivo")\n```\n\n## Relative Paths\n\n```xs\nimport { relative } from "xs:path"\nCRIA rel = relative("/a/b/c", "/a/d/e\")  // ../../d/e\n```\n\nAlways use \`xs:path\` instead of string concatenation for paths.'),
[
  ['What module provides path utilities?', 'xs:path', 3],
  ['What function joins path segments?', 'join', 3],
  ['Why use join instead of string concatenation?', 'for platform-independent path separators', 3]
]
);

a('file-directories', 'Directory Operations', 87, 5, m(
'# Directory Operations\n\nList, create, and remove directories.\n\n## List Directory\n\n```xs\nimport { readdir } from "xs:fs"\n\nCRIA arquivos = readdir("./pasta")\nPARA CADA (arquivo EM arquivos) {\n  SOLTA O GRITO(arquivo)\n}\n```\n\n## Recursive Listing\n\n```xs\nimport { glob } from "xs:fs"\n\nCRIA todos = glob("src/**/*.xs\")\nSOLTA O GRITO(todos)  // all .xs files recursively\n```\n\n## Remove Directory\n\n```xs\nimport { rmdir, remove } from "xs:fs"\n\nrmdir("pasta-vazia\")\nremove("pasta-com-tudo\")  // recursive remove\n```\n\n## Watch Directory\n\n```xs\nimport { watch } from "xs:fs"\n\nwatch("./src", (evento, arquivo) => {\n  SOLTA O GRITO(arquivo + " foi " + evento)\n})\n```\n\nDirectory operations support building tools like file watchers and build systems.'),
[
  ['What function lists a directory?', 'readdir', 3],
  ['What function finds files by pattern?', 'glob', 3],
  ['What function watches for file changes?', 'watch', 3]
]
);

a('file-temp', 'Temporary Files', 88, 5, m(
'# Temporary Files\n\nCreate and manage temporary files.\n\n## Temp File\n\n```xs\nimport { tmpFile, tmpDir } from "xs:fs"\n\nCRIA arquivo = tmpFile({ prefix: "meuapp-", suffix: ".txt\" })\narquivo.escreve("dados temporarios\")\n// arquivo.caminho -> /tmp/meuapp-XXXXX.txt\n```\n\n## Temp Directory\n\n```xs\nCRIA dir = tmpDir({ prefix: "build-\" })\n// dir.caminho -> /tmp/build-XXXXX/\n```\n\n## Auto Cleanup\n\n```xs\nCHAMA ESSE CARA processarArquivo() {\n  CRIA tmp = tmpFile()\n  TENTE {\n    // use file\n  } FINALLY {\n    tmp.remove()  // clean up\n  }\n}\n```\n\nTemporary files isolate operations and prevent permanent clutter.'),
[
  ['What function creates a temporary file?', 'tmpFile', 3],
  ['Should you clean up temporary files?', 'yes, in FINALLY block', 3],
  ['What option sets the filename prefix?', 'prefix', 3]
]
);

a('file-encoding', 'File Encodings', 89, 5, m(
'# File Encodings\n\nHandle different text encodings.\n\n## Encoding Options\n\n```xs\nimport { readFile } from "xs:fs"\n\nCRIA utf8 = readFile("texto.txt\", \"utf8\")\nCRIA latin1 = readFile("antigo.txt\", \"latin1\")\nCRIA bin = readFile("dados.bin\", \"binary\")\n```\n\n## Binary Data\n\n```xs\nCRIA buffer = readFile("imagem.png\", \"binary\")\nSOLTA O GRITO(buffer.length)  // bytes\n```\n\n## Writing with Encoding\n\n```xs\nwriteFile("saida.txt\", \"Conteudo\", \"utf8\")\nwriteFile("saida.bin\", Buffer.de([0xFF, 0xFE]), \"binary\")\n```\n\n## BOM Handling\n\nUTF-8 BOM is automatically stripped on read, added on write.\n\n## Detecting Encoding\n\n```xs\nimport { detectEncoding } from "xs:fs\"\nCRIA enc = detectEncoding("arquivo.txt\")\n```\n\nUsing the correct encoding prevents data corruption with special characters.'),
[
  ['What encoding is default for text files?', 'utf8', 3],
  ['What mode reads raw bytes?', 'binary', 3],
  ['What function detects file encoding?', 'detectEncoding', 3]
]
);

// ====== MODULE 11: ASYNC & CONCURRENCY (90-97) ======
a('async-basics', 'Async Basics with PROMETA', 90, 5, m(
'# Async Basics\n\nPromises in XanaScript use \`PROMETA\` (promise).\n\n## Creating a Promise\n\n```xs\nCRIA promessa = PROMETA.novo((resolver, rejeitar) => {\n  SE LIGA SO (sucesso) {\n    resolver("Funcionou!")\n  } SENAO {\n    rejeitar("Falhou!")\n  }\n})\n```\n\n## Consuming\n\n```xs\npromessa\n  .entao((valor) => { SOLTA O GRITO(valor) })\n  .captura((erro) => { SOLTA O GRITO(erro) })\n```\n\n## Promise States\n\n- \`Pendente\`: initial state\n- \`Resolvida\`: completed successfully\n- \`Rejeitada\`: failed\n\n\`PROMETA\` enables non-blocking async operations.'),
[
  ['What class creates promises?', 'PROMETA', 3],
  ['What method handles success?', 'entao', 3],
  ['What method handles failure?', 'captura', 3]
]
);

a('async-await', 'Async/Await', 91, 10, m(
'# Async/Await\n\nWrite async code that reads like synchronous code.\n\n## Async Function\n\n```xs\nCHAMA ESSE CARA ASSINCRONO buscarDados() {\n  CRIA resposta = await fetch("https://api.exemplo.com")\n  CRIA dados = await resposta.json()\n  VOLTA dados\n}\n```\n\n## Await\n\n\`await\` pauses execution until the promise resolves:\n\n```xs\nCHAMA ESSE CARA ASSINCRONO main() {\n  SOLTA O GRITO("Iniciando...")\n  CRIA resultado = await operacaoLenta()\n  SOLTA O GRITO("Concluido: " + resultado)\n}\n```\n\n## Error Handling\n\n```xs\nCHAMA ESSE CARA ASSINCRONO seguro() {\n  TENTE {\n    CRIA r = await operacaoRiscada()\n    SOLTA O GRITO(r)\n  } CAPTURA (e) {\n    SOLTA O GRITO("Erro: " + e)\n  }\n}\n```\n\n\`await\` can only be used in \`ASSINCRONO\` functions.'),
[
  ['What keyword makes a function async?', 'ASSINCRONO', 3],
  ['What keyword awaits a promise?', 'await', 3],
  ['Can await be used in non-async functions?', 'no', 3]
]
);

a('async-parallel', 'Parallel Execution', 92, 10, m(
'# Parallel Execution\n\nRun multiple async operations concurrently.\n\n## Promise.all\n\n```xs\nCRIA [a, b, c] = await PROMETA.tudo([\n  buscarUsuario(1),\n  buscarUsuario(2),\n  buscarUsuario(3)\n])\n```\n\n## Promise.allSettled\n\nWait for all, regardless of failures:\n\n```xs\nCRIA resultados = await PROMETA.tudoResolvido([\n  operacao1(),\n  operacao2()\n])\n\nPARA CADA (r EM resultados) {\n  SE LIGA SO (r.status == "resolvida") {\n    SOLTA O GRITO(r.valor)\n  } SENAO {\n    SOLTA O GRITO("Falhou: " + r.motivo)\n  }\n}\n```\n\n## Promise.race\n\nFirst to resolve/reject wins:\n\n```xs\nCRIA resultado = await PROMETA.corrida([\n  buscarDados(),\n  timeout(5000)\n])\n```\n\nParallel execution speeds up independent operations.'),
[
  ['What function waits for all promises?', 'PROMETA.tudo', 3],
  ['What function waits for all regardless of outcome?', 'PROMETA.tudoResolvido', 5],
  ['What function returns the first settled promise?', 'PROMETA.corrida', 3]
]
);

a('async-queue', 'Async Queue & Throttling', 93, 10, m(
'# Async Queue\n\nControl concurrency with queues.\n\n## Simple Queue\n\n```xs\nCLASSE Fila {\n  PRIVADO CRIA _tarefas = []\n  PRIVADO CRIA _emProgresso = 0\n  PRIVADO CRIA _limite\n\n  CHAMA ESSE CARA init(limite = 5) { ISTO._limite = limite }\n\n  CHAMA ESSE CARA adicionar(fn) {\n    VOLTA PROMETA.novo((resolver) => {\n      ISTO._tarefas.empurra({ fn, resolver })\n      ISTO._processar()\n    })\n  }\n\n  PRIVADO CHAMA ESSE CARA _processar() {\n    ENQUANTO (ISTO._emProgresso < ISTO._limite E ISTO._tarefas.tamanho > 0) {\n      CRIA { fn, resolver } = ISTO._tarefas.tira()\n      ISTO._emProgresso += 1\n      fn().entao((r) => {\n        ISTO._emProgresso -= 1\n        resolver(r)\n        ISTO._processar()\n      })\n    }\n  }\n}\n```\n\nLimiting concurrency prevents overwhelming resources.'),
[
  ['What is a queue used for in async?', 'controlling concurrency', 3],
  ['Why limit concurrent operations?', 'to prevent overwhelming resources', 5]
]
);

a('async-timers', 'Timers & Intervals', 94, 5, m(
'# Timers & Intervals\n\nSchedule delayed or repeated execution.\n\n## setTimeout\n\n```xs\nimport { setTimeout } from "xs:timers"\n\nCRIA timer = setTimeout(() => {\n  SOLTA O GRITO("Passaram 2 segundos")\n}, 2000)\n```\n\n## setInterval\n\n```xs\nCRIA contador = 0\nCRIA intervalo = setInterval(() => {\n  contador += 1\n  SOLTA O GRITO("Tick: " + contador)\n\n  SE LIGA SO (contador >= 5) {\n    clearInterval(intervalo)\n  }\n}, 1000)\n```\n\n## Promise-Based Delay\n\n```xs\nCHAMA ESSE CARA ASSINCRONO esperar(ms) {\n  VOLTA PROMETA.novo((resolver) => setTimeout(resolver, ms))\n}\n\nawait esperar(3000)\n```\n\n## Clearing\n\n```xs\nclearTimeout(timer)\nclearInterval(intervalo)\n```\n\nAlways clear timers when no longer needed.'),
[
  ['What function schedules a one-time callback?', 'setTimeout', 3],
  ['What function schedules repeated callbacks?', 'setInterval', 3],
  ['How do you stop an interval?', 'clearInterval', 3]
]
);

a('async-workers', 'Web Workers / Threads', 95, 10, m(
'# Web Workers\n\nRun CPU-intensive tasks in separate threads.\n\n## Creating a Worker\n\n```xs\nimport { Worker } from "xs:workers"\n\nCRIA worker = Worker.novo("./heavy-task.xs")\n\nworker.em("mensagem", (dados) => {\n  SOLTA O GRITO("Resultado: " + dados)\n})\n\nworker.envia({ acao: "processar", dados: [...] })\n```\n\n## Worker File\n\n```xs\n// heavy-task.xs\nself.em("mensagem", (msg) => {\n  CRIA resultado = executarTarefaPesada(msg.dados)\n  self.envia(resultado)\n})\n```\n\n## Thread Pool\n\n```xs\nimport { ThreadPool } from "xs:workers"\n\nCRIA pool = ThreadPool.novo(4)  // 4 threads\nCRIA resultados = await pool.executar(\n  itens,\n  (item) => processar(item)\n)\n```\n\nWorkers enable true parallelism for CPU-bound work.'),
[
  ['What module provides workers?', 'xs:workers', 3],
  ['How do workers communicate?', 'via mensagem events / envia()', 3],
  ['Why use a thread pool?', 'to limit concurrent threads and reuse them', 5]
]
);

a('async-eventemitter', 'Event Emitter', 96, 5, m(
'# Event Emitter\n\nPublish/subscribe pattern for decoupled communication.\n\n## Creating Emitter\n\n```xs\nimport { EventEmitter } from "xs:events"\n\nCRIA emissor = EventEmitter.novo()\n\nemissor.em("dados", (payload) => {\n  SOLTA O GRITO("Recebido: " + payload)\n})\n\nemissor.emite("dados", { id: 1, nome: "Maria" })\n```\n\n## Once\n\n```xs\nemissor.once("conexao", () => {\n  SOLTA O GRITO("Primeira conexao (unica vez)")\n})\n```\n\n## Remove Listener\n\n```xs\nCHAMA ESSE CARA handler(d) { SOLTA O GRITO(d) }\nemissor.em("evento", handler)\nemissor.removeListener("evento\", handler)\n```\n\n## Custom Events\n\n```xs\nCLASSE MeuServico EXTENDE EventEmitter {\n  CHAMA ESSE CARA buscarDados() {\n    // ... fetch data ...\n    ISTO.emite("completo", dados)\n  }\n}\n```\n\nEvent emitters enable loose coupling between components.'),
[
  ['What method subscribes to an event?', 'em', 3],
  ['What method emits an event?', 'emite', 3],
  ['What method subscribes for a single event?', 'once', 3]
]
);

a('async-patterns', 'Async Patterns', 97, 10, m(
'# Async Patterns\n\nCommon patterns for robust async code.\n\n## Retry with Backoff\n\n```xs\nCHAMA ESSE CARA ASSINCRONO tentarComBackoff(fn, maxTentativas = 3) {\n  PARA CADA (i EM 1..maxTentativas) {\n    TENTE {\n      VOLTA await fn()\n    } CAPTURA (e) {\n      SE LIGA SO (i == maxTentativas) { JOGAR e }\n      await esperar(1000 * Math.pow(2, i))\n    }\n  }\n}\n```\n\n## Timeout\n\n```xs\nCHAMA ESSE CARA ASSINCRONO comTimeout(promessa, ms) {\n  CRIA timeout = PROMETA.novo((_, rej) =>\n    setTimeout(() => rej("Timeout"), ms)\n  )\n  VOLTA PROMETA.corrida([promessa, timeout])\n}\n```\n\n## Sequential vs Parallel\n\n```xs\n// Sequential (slower, ordered)\nPARA CADA (item EM items) {\n  CRIA r = await processar(item)\n}\n\n// Parallel (faster, unordered)\nCRIA resultados = await PROMETA.tudo(\n  items.mapa((item) => processar(item))\n)\n```\n\nChoose the right pattern for your use case.'),
[
  ['What is exponential backoff?', 'increasing delay between retries', 3],
  ['How do you add a timeout to a promise?', 'Promise.race with a rejection timer', 5],
  ['When should you use parallel execution?', 'when order does not matter', 3]
]
);

// ====== MODULE 12: ADVANCED TYPES (98-105) ======
a('type-union', 'Union Types', 98, 5, m(
'# Union Types\n\nA value can be one of several types.\n\n## Union Syntax\n\n```xs\nCRIA id: NUMERO | TEXTO = 42\nid = "abc123"  // also valid\n```\n\n## Type Narrowing\n\n```xs\nCHAMA ESSE CARA processarId(id: NUMERO | TEXTO) {\n  SE LIGA SO (TIPO(id) == NUMERO) {\n    SOLTA O GRITO("Numerico: " + id)\n  } SENAO {\n    SOLTA O GRITO("Texto: " + id)\n  }\n}\n```\n\n## Union in Function Params\n\n```xs\nCHAMA ESSE CARA exibir(valor: TEXTO | NUMERO | BOOLEANO) {\n  SOLTA O GRITO(TEXTO(valor))\n}\n```\n\n## Pattern Matching with Unions\n\n```xs\nCOMBINA (id) {\n  CASO TIPO NUMERO => buscaPorNumero(id)\n  CASO TIPO TEXTO => buscaPorTexto(id)\n}\n```\n\nUnions express "this or that" without class hierarchies.'),
[
  ['What operator creates a union type?', '|', 3],
  ['What technique checks which union variant?', 'type narrowing / TIPO()', 3],
  ['How do you match union variants?', 'COMBINA with CASO TIPO', 5]
]
);

a('type-intersection', 'Intersection Types', 99, 5, m(
'# Intersection Types\n\nCombine multiple types into one.\n\n## Intersection Syntax\n\n```xs\nCRIA obj: TipoA & TipoB = {\n  // must have all properties of both\n}\n```\n\n## Named Intersection\n\n```xs\nTIPO UsuarioAdmin = Usuario & Admin\n\nCRIA user: UsuarioAdmin = {\n  // from Usuario\n  nome: "Maria",\n  email: "maria@email.com\",\n  // from Admin\n  permissoes: ["ler", "escrever\"],\n  nivel: 5\n}\n```\n\n## Mixin Pattern\n\n```xs\nTIPO ComNome = { nome: TEXTO }\nTIPO ComIdade = { idade: NUMERO }\nTIPO Pessoa = ComNome & ComIdade\n```\n\n## Intersection vs Inheritance\n\nIntersection is structural — no class hierarchy needed. More flexible for composing behaviors.\n\nUse \`&\` to merge type requirements.'),
[
  ['What operator creates an intersection type?', '&', 3],
  ['What keyword defines a type alias?', 'TIPO', 3],
  ['Is intersection structural or nominal?', 'structural', 3]
]
);

a('type-generics', 'Generics', 100, 10, m(
'# Generics\n\nParameterize types with type variables.\n\n## Generic Function\n\n```xs\nCHAMA ESSE CARA primeiro<T>(lista: LISTA<T>): T | null {\n  SE LIGA SO (lista.tamanho > 0) { VOLTA lista[0] }\n  VOLTA null\n}\n\nCRIA n = primeiro<NUMERO>([1, 2, 3])\nCRIA s = primeiro<TEXTO>(["a", \"b\"])\n```\n\n## Generic Class\n\n```xs\nCLASSE Caixa<T> {\n  CRIA conteudo: T\n\n  CHAMA ESSE CARA init(valor: T) { ISTO.conteudo = valor }\n  PEGA valor(): T { VOLTA ISTO.conteudo }\n}\n\nCRIA cx = Caixa<NUMERO>.novo(42)\nSOLTA O GRITO(cx.valor)\n```\n\n## Constraints\n\n```xs\nTIPO Comparavel = { CHAMA ESSE CARA comparar(outro): NUMERO }\n\nCHAMA ESSE CARA max<T: Comparavel>(a: T, b: T): T {\n  VOLTA a.comparar(b) > 0 ? a : b\n}\n```\n\nGenerics enable type-safe reusable code.'),
[
  ['What syntax declares a generic type parameter?', '<T>', 3],
  ['Can you constrain type parameters?', 'yes, with T: Constraint', 5],
  ['What is a benefit of generics?', 'type-safe reusable code', 3]
]
);

a('type-mapped', 'Mapped Types', 101, 10, m(
'# Mapped Types\n\nTransform types by mapping over their properties.\n\n## Making Properties Optional\n\n```xs\nTIPO Opcional<T> = {\n  [K EM chaves<T>]?: T[K]\n}\n\nCRIA user: Opcional<Usuario> = {}  // all optional\n```\n\n## Readonly\n\n```xs\nTIPO Imutavel<T> = {\n  readonly [K EM chaves<T>]: T[K]\n}\n```\n\n## Property Value Transformation\n\n```xs\nTIPO ComoTexto<T> = {\n  [K EM chaves<T>]: TEXTO\n}\n```\n\n## Practical Use\n\n```xs\nTIPO FormErrors<T> = {\n  [K EM chaves<T>]: TEXTO | null\n}\n```\n\nMapped types reduce boilerplate in type definitions.'),
[
  ['What syntax maps over type keys?', '[K in chaves<T>]', 3],
  ['Can you make all properties optional with a mapped type?', 'yes', 5],
  ['What keyword makes properties readonly?', 'readonly', 3]
]
);

a('type-conditional', 'Conditional Types', 102, 10, m(
'# Conditional Types\n\nTypes that depend on a condition.\n\n## Basic Conditional\n\n```xs\nTIPO TipoResultado<T> = T EXTENDE NUMERO ? "numerico" : "outro"\n\nCRIA a: TipoResultado<NUMERO>  // "numerico"\nCRIA b: TipoResultado<TEXTO>   // "outro"\n```\n\n## Nested Conditions\n\n```xs\nTIPO TipoExato<T> =\n  T EXTENDE NUMERO ? "numero" :\n  T EXTENDE TEXTO ? "texto" :\n  T EXTENDE BOOLEANO ? "booleano" :\n  "outro"\n```\n\n## Extract Array Type\n\n```xs\nTIPO TipoElemento<T> = T EXTENDE LISTA<infer U> ? U : T\n\nCRIA a: TipoElemento<LISTA<NUMERO>>  // NUMERO\nCRIA b: TipoElemento<TEXTO>          // TEXTO\n```\n\n## Practical: Function Return Type\n\n```xs\nTIPO Retorno<T> = T EXTENDE CHAMA ESSE CARA (...args: any[]) => infer R ? R : never\n```\n\nConditional types enable high-level type transformations.'),
[
  ['What syntax checks a type condition?', 'T EXTENDE U ? A : B', 3],
  ['What keyword infers a type in a conditional?', 'infer', 5],
  ['What is a practical use of conditional types?', 'extracting return types or element types', 3]
]
);

a('type-template-literal', 'Template Literal Types', 103, 10, m(
'# Template Literal Types\n\nCreate string types from templates.\n\n## Basic Template\n\n```xs\nTIPO Saudacao = "ola, " + TEXTO\nCRIA msg: Saudacao = "ola, Maria\"  // OK\n```\n\n## Union Combinations\n\n```xs\nTIPO Evento = "click" | "focus" | "blur\"\nTIPO Handler = "on" + Evento  // "onclick" | "onfocus" | "onblur"\n```\n\n## Pattern Matching\n\n```xs\nTIPO MatchEvento<T> = T EXTENDE \`on${infer E}\` ? E : never\n\nCRIA tipo: MatchEvento<"onclick\">  // "click"\n```\n\n## Validation Use\n\n```xs\nTIPO Rota = \`/${TEXTO}/${TEXTO}\nCRIA r: Rota = "/usuario/42\"  // OK\n```\n\nTemplate literal types enable compile-time string validation.'),
[
  ['What types can template literal types work with?', 'string types and unions', 3],
  ['Can template literal types parse string patterns?', 'yes, with infer', 5],
  ['What is a use case?', 'type-safe event handlers and routes', 3]
]
);

a('type-branded', 'Branded / Nominal Types', 104, 10, m(
'# Branded Types\n\nSimulate nominal typing with brands.\n\n## Brand Pattern\n\n```xs\nTIPO UserId = TEXTO & { readonly __brand: "UserId\" }\nTIPO ProductId = TEXTO & { readonly __brand: "ProductId\" }\n\nCHAMA ESSE CARA criarUserId(id: TEXTO): UserId {\n  VOLTA id as UserId\n}\n\nCHAMA ESSE CARA buscarUsuario(id: UserId) { ... }\nCHAMA ESSE CARA buscarProduto(id: ProductId) { ... }\n```\n\n## Safety\n\n```xs\nCRIA uid = criarUserId("abc\")\nCRIA pid = "xyz" as ProductId\n\nbuscarUsuario(uid)   // OK\nbuscarUsuario(pid)   // Type error!\n```\n\n## When to Use\n\n- IDs of different entities\n- Currency amounts (Dolar vs Euro)\n- Units (Metros vs Centimetros)\n\nBranded types prevent mixing semantically different values of the same primitive type.'),
[
  ['What technique creates nominal typing?', 'brand pattern with __brand', 3],
  ['Can you pass a ProductId where UserId is expected?', 'no, type error', 5],
  ['When are branded types useful?', 'distinguishing IDs, currencies, units', 3]
]
);

a('type-satisfies', 'Satisfies Operator', 105, 10, m(
'# Satisfies Operator\n\nCheck a value satisfies a type without widening.\n\n## Basic Usage\n\n```xs\nCRIA config = {\n  host: "localhost\",\n  port: 3000\n} SATISFAZ Config\n\n// config.host type is "localhost" literal, not TEXTO\n// config.port type is 3000 literal, not NUMERO\n```\n\n## Without Satisfies\n\n```xs\nCRIA config: Config = {\n  host: "localhost\",  // type widens to TEXTO\n  port: 3000          // type widens to NUMERO\n}\n```\n\n## Benefits\n\n- Preserves literal types for inference\n- Validates shape matches interface\n- Enables narrower types elsewhere\n\n\`SATISFAZ\` gives you the best of both worlds: validation + narrow types.'),
[
  ['What operator checks a type without widening?', 'SATISFAZ', 3],
  ['What is the benefit over type annotation?', 'preserves literal types', 5],
  ['Does SATISFAZ validate the shape?', 'yes', 3]
]
);

// ====== MODULE 13: REFLECTION & METAPROGRAMMING (106-113) ======
a('reflection-basics', 'Reflection with TIPO & REFLETE', 106, 5, m(
'# Reflection\n\nInspect types and properties at runtime.\n\n## TIPO() Function\n\n```xs\nCRIA x = 42\nSOLTA O GRITO(TIPO(x))  // NUMERO\n\nCRIA s = "texto"\nSOLTA O GRITO(TIPO(s))  // TEXTO\n```\n\n## REFLETE Module\n\n```xs\nimport { typeInfo, properties, methods } from "xs:reflect"\n\nCRIA info = typeInfo(MinhaClasse)\nSOLTA O GRITO(info.nome)      // MinhaClasse\nSOLTA O GRITO(info.propriedades)\nSOLTA O GRITO(info.metodos)\n```\n\n## Property Inspection\n\n```xs\nCRIA props = properties(objeto)\nPARA CADA (p EM props) {\n  SOLTA O GRITO(p.nome + ": " + p.tipo)\n}\n```\n\n## Check Inheritance\n\n```xs\nCRIA ehFilho = REFLETE.extends(Cachorro, Animal)\n```\n\nReflection enables tools like serializers, ORMs, and DI containers.'),
[
  ['What function returns a values type?', 'TIPO', 3],
  ['What module provides reflection?', 'xs:reflect', 3],
  ['What function checks class inheritance?', 'REFLETE.extends', 5]
]
);

a('reflection-proxy', 'Proxies', 107, 10, m(
'# Proxies\n\nIntercept operations on objects.\n\n## Creating a Proxy\n\n```xs\nimport { Proxy } from "xs:reflect"\n\nCRIA alvo = { nome: "Maria\" }\nCRIA manipulador = {\n  PEGA: (obj, prop) => {\n    SOLTA O GRITO("Acessando: " + prop)\n    VOLTA obj[prop]\n  },\n  COLOCA: (obj, prop, valor) => {\n    SOLTA O GRITO("Modificando: " + prop + " = " + valor)\n    obj[prop] = valor\n    VOLTA true\n  }\n}\n\nCRIA proxy = Proxy.novo(alvo, manipulador)\nSOLTA O GRITO(proxy.nome)  // Acessando: nome -> Maria\nproxy.idade = 30            // Modificando: idade = 30\n```\n\n## Use Cases\n\n- Logging\n- Validation\n- Lazy loading\n- Reactive programming\n\nProxies enable metaprogramming without modifying the original object.'),
[
  ['What class creates an interception layer?', 'Proxy', 3],
  ['What trap intercepts property reads?', 'PEGA (get)', 3],
  ['What is a common proxy use case?', 'logging, validation, lazy loading', 3]
]
);

a('reflection-decorators', 'Decorators', 108, 10, m(
'# Decorators\n\nAnnotate and modify classes, methods, and properties.\n\n## Method Decorator\n\n```xs\nCHAMA ESSE CARA logMetodo(alvo, nome, descritor) {\n  CRIA original = descritor.valor\n  descritor.valor = (...args) => {\n    SOLTA O GRITO("Chamando " + nome)\n    VOLTA original(...args)\n  }\n  VOLTA descritor\n}\n\nCLASSE Servico {\n  @logMetodo\n  CHAMA ESSE CARA processar() {\n    SOLTA O GRITO("Processando...")\n  }\n}\n```\n\n## Class Decorator\n\n```xs\nCHAMA ESSE CARA selavel(alvo) {\n  alvo.selado = true\n}\n\n@selavel\nCLASSE Config { ... }\n```\n\n## Property Decorator\n\n```xs\nCHAMA ESSE CARA obrigatorio(alvo, nome) {\n  // validate property\n}\n```\n\nDecorate with the \`@\` syntax. Decorators are functions that receive metadata.'),
[
  ['What syntax applies a decorator?', '@nomeDoDecorator', 3],
  ['Can decorators modify method behavior?', 'yes, via the descriptor', 5],
  ['What are decorators useful for?', 'logging, validation, metadata', 3]
]
);

a('reflection-symbols', 'Symbols & Metaprogramming', 109, 10, m(
'# Symbols\n\nUnique, immutable identifiers for metaprogramming.\n\n## Creating Symbols\n\n```xs\nCRIA SIMBOLO id = SIMBOLO()\nCRIA SIMBOLO chave = SIMBOLO("descricao\")\n```\n\n## Well-Known Symbols\n\n```xs\nCRIA SIMBOLO iterator = SIMBOLO.iterator\nCRIA SIMBOLO toString = SIMBOLO.toStringTag\n```\n\n## Hidden Properties\n\n```xs\nCRIA SIMBOLO _privado = SIMBOLO()\n\nCRIA obj = {\n  [_privado]: "secreto\",\n  publico: "visivel\"\n}\n\nSOLTA O GRITO(obj.publico)    // visivel\nSOLTA O GRITO(obj[_privado])  // secreto (if you have the symbol)\n```\n\n## Custom Iteration\n\n```xs\nCLASSE Colecao {\n  CRIA items = []\n\n  CHAMA ESSE CARA [SIMBOLO.iterator]() {\n    VOLTA ISTO.items.iterator()\n  }\n}\n```\n\nSymbols prevent property name collisions.'),
[
  ['What function creates a symbol?', 'SIMBOLO', 3],
  ['Can symbol-keyed properties be accessed by string?', 'no', 3],
  ['What well-known symbol controls iteration?', 'SIMBOLO.iterator', 5]
]
);

a('reflection-codegen', 'Code Generation', 110, 10, m(
'# Code Generation\n\nGenerate XanaScript code programmatically.\n\n## AST Building\n\n```xs\nimport { AST } from "xs:compiler"\n\nCRIA programa = AST.Programa({\n  corpo: [\n    AST.Expressao({\n      tipo: "ChamadaFuncao\",\n      nome: "SOLTA O GRITO\",\n      args: [AST.Literal("Ola gerado!\")]\n    })\n  ]\n})\n```\n\n## Generate Source\n\n```xs\nimport { generate } from "xs:compiler"\n\nCRIA codigo = generate(programa)\n// SOLTA O GRITO("Ola gerado!")\n```\n\n## Compile String\n\n```xs\nimport { compile } from "xs:compiler"\n\nCRIA bytecode = compile("CRIA x = 42")\n```\n\n## Eval\n\n```xs\nimport { eval } from "xs:runtime"\n\nCRIA resultado = eval("1 + 2")\n// 3\n```\n\nCode generation enables macros and build tools.'),
[
  ['What module provides AST building?', 'xs:compiler', 3],
  ['What function generates source from AST?', 'generate', 3],
  ['What function compiles a string?', 'compile', 3]
]
);

a('reflection-serialize', 'Serialization', 111, 10, m(
'# Serialization\n\nConvert objects to and from different formats.\n\n## JSON Serialization\n\n```xs\nCRIA objeto = { nome: "Maria\", idade: 30 }\nCRIA json = JSON.serializa(objeto)\nCRIA deVolta = JSON.parse(json)\n```\n\n## Custom Serialization\n\n```xs\nCLASSE Usuario {\n  CRIA nome, senha\n\n  CHAMA ESSE CARA paraJSON() {\n    VOLTA {\n      nome: ISTO.nome,\n      // exclude senha from serialization\n    }\n  }\n}\n```\n\n## YAML\n\n```xs\nimport { parse, serialize } from "xs:yaml\"\nCRIA dados = parse(yamlString)\n```\n\n## Binary Serialization\n\n```xs\nimport { encode, decode } from "xs:binary\"\n\nCRIA buffer = encode(objeto)\nCRIA original = decode(buffer)\n```\n\n## Custom Format\n\nImplement \`paraJSON\` on classes to control serialization.'),
[
  ['What function serializes to JSON?', 'JSON.serializa', 3],
  ['How do you customize serialization?', 'implement paraJSON method', 3],
  ['What modules handle non-JSON formats?', 'xs:yaml, xs:binary', 3]
]
);

a('reflection-annotations', 'Type Annotations & Metadata', 112, 10, m(
'# Type Annotations & Metadata\n\nAccess and manipulate type metadata.\n\n## Runtime Type Info\n\n```xs\nCHAMA ESSE CARA mostrarTipo(valor) {\n  CRIA tipo = TIPO(valor)\n\n  COMBINA (tipo) {\n    CASO NUMERO => SOLTA O GRITO("E um numero\")\n    CASO TEXTO => SOLTA O GRITO("E um texto\")\n    CASO _ => SOLTA O GRITO("Tipo: " + tipo)\n  }\n}\n```\n\n## instanceof\n\n```xs\nSE LIGA SO (objeto INSTANCIA DE Classe) {\n  // object is instance\n}\n```\n\n## Metadata Annotations\n\n```xs\nimport { Metadata } from "xs:reflect\"\n\nCLASSE Controller {\n  @Metadata({ rota: "/api/users\", metodo: "GET\" })\n  CHAMA ESSE CARA listar() { ... }\n}\n```\n\n## Reading Metadata\n\n```xs\nCRIA meta = Metadata.get(Controller.prototype, "listar\")\nSOLTA O GRITO(meta.rota)  // /api/users\n```\n\nMetadata enables frameworks and decorator-based architectures.'),
[
  ['What operator checks instanceof?', 'INSTANCIA DE', 3],
  ['How do you attach metadata?', '@Metadata({...}) decorator', 5],
  ['What function reads metadata?', 'Metadata.get', 3]
]
);

a('reflection-advanced', 'Advanced Metaprogramming', 113, 10, m(
'# Advanced Metaprogramming\n\nTechniques for dynamic code behavior.\n\n## Dynamic Dispatch\n\n```xs\nCRIA metodos = {\n  soma: (a, b) => a + b,\n  mult: (a, b) => a * b\n}\n\nCRIA operacao = "soma\"\nCRIA resultado = metodos[operacao](2, 3)  // 5\n```\n\n## Method Missing\n\n```xs\nCLASSE Delegador {\n  CHAMA ESSE CARA metodoFaltando(nome, args) {\n    SOLTA O GRITO("Metodo \'" + nome + "\' nao existe\")\n  }\n}\n```\n\n## Object Extend\n\n```xs\nCRIA base = { a: 1 }\nCRIA extensao = { b: 2 }\nCRIA combinado = { ...base, ...extensao }  // { a: 1, b: 2 }\n```\n\n## Function Composition\n\n```xs\nCHAMA ESSE CARA compor(...fns) {\n  VOLTA (x) => fns.reduz((acc, fn) => fn(acc), x)\n}\n\nCRIA fn = compor((x) => x * 2, (x) => x + 1)\nSOLTA O GRITO(fn(5))  // 11\n```\n\nMetaprogramming enables flexible, dynamic architectures.'),
[
  ['What pattern dispatches methods dynamically?', 'dynamic dispatch with object lookup', 3],
  ['What operator spreads object properties?', '...', 3],
  ['What is a benefit of metaprogramming?', 'flexible, dynamic architectures', 3]
]
);

// ====== MODULE 14: MEMORY & PERFORMANCE (114-121) ======
a('memory-basics', 'Memory Management', 114, 5, m(
'# Memory Management\n\nXanaScript uses automatic garbage collection.\n\n## GC Strategy\n\nGenerational garbage collection:\n- Young generation: frequent, small collections\n- Old generation: infrequent, full collections\n\n## Allocation\n\n```xs\nCRIA obj = { dados: "..." }  // heap allocated\nCRIA num = 42                  // stack allocated (small ints)\n```\n\n## GC Hints\n\n```xs\nimport { gc } from "xs:runtime\"\n\ngc.coletar()          // force collection\ngc.desabilitar()      // pause GC\ngc.habilitar()        // resume GC\n```\n\n## Weak References\n\n```xs\nimport { WeakRef } from "xs:runtime\"\n\nCRIA ref = WeakRef.novo(objeto)\nCRIA obj = ref.deref()  // null if collected\n```\n\nUnderstanding GC helps optimize memory-intensive applications.'),
[
  ['What strategy does the GC use?', 'generational collection', 3],
  ['Are small integers stack or heap allocated?', 'stack', 3],
  ['What is a WeakRef?', 'a reference that does not prevent GC', 5]
]
);

a('memory-leaks', 'Memory Leak Prevention', 115, 10, m(
'# Memory Leak Prevention\n\nCommon leaks and how to avoid them.\n\n## Event Listener Leaks\n\n```xs\n// Bad: listener never removed\nCRIA emissor = EventEmitter.novo()\nemissor.em("dados", handler)\n\n// Good: remove when done\nemissor.removeListener("dados\", handler)\n```\n\n## Closure Leaks\n\n```xs\nCHAMA ESSE CARA criarGrande() {\n  CRIA grande = alocarGrande()  // held by closure\n\n  VOLTA () => {\n    SOLTA O GRITO("usando closure\")\n    // reference to grande keeps it alive\n  }\n}\n```\n\n## Timer Leaks\n\n```xs\nCRIA timer = setInterval(() => {\n  // ...\n}, 1000)\n\n// Always clear when done\nclearInterval(timer)\n```\n\n## Circular References\n\n```xs\n// Modern GC handles cycles\n// But break explicit refs when possible\nobjeto.ref = null\n```\n\nUse heap snapshots and profiling tools to detect leaks.'),
[
  ['What causes event listener leaks?', 'listeners not removed', 3],
  ['What causes closure leaks?', 'large objects captured in closure scope', 5],
  ['How do you prevent timer leaks?', 'clearInterval/clearTimeout when done', 3]
]
);

a('performance-profiling', 'Profiling', 116, 10, m(
'# Profiling\n\nMeasure and analyze performance.\n\n## Timing\n\n```xs\nimport { now, hrTime } from "xs:runtime\"\n\nCRIA inicio = hrTime()\n// ... code to measure ...\nCRIA fim = hrTime()\nSOLTA O GRITO("Durou: " + (fim - inicio) + "ns\")\n```\n\n## Built-in Profiler\n\n```xs\nimport { profiler } from "xs:runtime\"\n\nprofiler.iniciar()\n// ... code ...\nCRIA relatorio = profiler.parar()\nSOLTA O GRITO(relatorio)\n```\n\n## Memory Profile\n\n```xs\nimport { memory } from "xs:runtime\"\n\nCRIA uso = memory.usado()\nSOLTA O GRITO("Heap: " + uso.heap + \" bytes\")\nSOLTA O GRITO("Objetos: \" + uso.objetos)\n```\n\n## Profiling Compiler Output\n\n```xs\nxs run --profile meu-arquivo.xs\n```\n\nProfile before optimizing to focus on actual bottlenecks.'),
[
  ['What function returns high-resolution time?', 'hrTime', 3],
  ['What command profiles execution?', 'xs run --profile', 3],
  ['What should you do before optimizing?', 'profile to find actual bottlenecks', 5]
]
);

a('performance-optimization', 'Optimization Techniques', 117, 10, m(
'# Optimization Techniques\n\nWrite performant XanaScript code.\n\n## Loop Optimization\n\n```xs\n// Slow: property lookup each iteration\nPARA CADA (i EM 0..arr.tamanho-1) { ... }\n\n// Fast: cache length\nCRIA len = arr.tamanho\nPARA CADA (i EM 0..len-1) { processar(arr[i]) }\n```\n\n## Avoid Allocations in Loops\n\n```xs\n// Bad: creates new object each iteration\nPARA CADA (i EM 0..10000) {\n  CRIA tmp = { a: i, b: i * 2 }\n}\n\n// Good: reuse\nCRIA tmp = { a: 0, b: 0 }\nPARA CADA (i EM 0..10000) {\n  tmp.a = i\n  tmp.b = i * 2\n}\n```\n\n## Type Stability\n\nKeep variable types consistent (helps JIT):\n\n```xs\n// Stable\nCRIA x = 0\nPARA CADA (i EM 0..100) { x += i }\n\n// Unstable (deoptimizes)\nCRIA y = 0\nPARA CADA (i EM 0..100) { y = i > 50 ? i : \"texto\" }\n```\n\n## Use Native Methods\n\nBuilt-in methods are optimized in C++: prefer them over manual loops.'),
[
  ['Should you allocate objects inside loops?', 'no, reuse when possible', 3],
  ['Why keep variable types consistent?', 'avoids JIT deoptimization', 5],
  ['Are native methods faster than manual loops?', 'yes', 3]
]
);

a('performance-compiler', 'Compiler Optimizations', 118, 10, m(
'# Compiler Optimizations\n\nWhat the XanaScript compiler does automatically.\n\n## Constant Folding\n\n```xs\nCRIA x = 5 * 10   // compiled as: CRIA x = 50\n```\n\n## Dead Code Elimination\n\n```xs\nCHAMA ESSE CARA teste() {\n  VOLTA 1\n  SOLTA O GRITO("nunca executado\")  // removed\n}\n```\n\n## Inlining\n\nSmall functions are inlined at call sites:\n\n```xs\nCHAMA ESSE CARA dobro(x) { VOLTA x * 2 }\nCRIA r = dobro(5)  // compiled as: CRIA r = 5 * 2\n```\n\n## Loop Unrolling\n\n```xs\n// Short loops are unrolled\nPARA CADA (i EM 0..3) { arr[i] = i }\n// becomes:\n// arr[0] = 0; arr[1] = 1; arr[2] = 2; arr[3] = 3;\n```\n\n## Integer Inference\n\n\`NUMERO\` without decimals is inferred as integer, enabling integer-only optimizations.'),
[
  ['What optimization evaluates expressions at compile time?', 'constant folding', 3],
  ['What optimization removes unreachable code?', 'dead code elimination', 3],
  ['What optimization replaces function calls with body?', 'inlining', 3]
]
);

a('performance-memory', 'Memory Optimization', 119, 10, m(
'# Memory Optimization\n\nReduce memory usage.\n\n## Object Pooling\n\n```xs\nCLASSE Pool<T> {\n  CRIA _disponiveis = []\n  CRIA _fabrica\n\n  CHAMA ESSE CARA init(fabrica) { ISTO._fabrica = fabrica }\n\n  CHAMA ESSE CARA adquirir() {\n    SE LIGA SO (ISTO._disponiveis.tamanho > 0) {\n      VOLTA ISTO._disponiveis.tira()\n    }\n    VOLTA ISTO._fabrica()\n  }\n\n  CHAMA ESSE CARA devolver(obj) {\n    ISTO._disponiveis.empurra(obj)\n  }\n}\n```\n\n## Typed Arrays\n\n```xs\nimport { Int32Array, Float64Array } from "xs:binary\"\n\nCRIA buffer = Int32Array.novo(1000)  // contiguous, no overhead\n```\n\n## Lazy Initialization\n\n```xs\nPEGA dadosCaros() {\n  SE LIGA SO (!ISTO._cache) {\n    ISTO._cache = calcularDados()\n  }\n  VOLTA ISTO._cache\n}\n```\n\n## Data Structure Choice\n\n- Lists: general purpose\n- Typed arrays: numeric data, low overhead\n- Objects with predefined keys: faster than dictionaries'),
[
  ['What pattern reuses objects?', 'object pooling', 3],
  ['What data structure is best for numeric arrays?', 'Int32Array / Float64Array', 5],
  ['When should you use lazy initialization?', 'for expensive operations not always needed', 3]
]
);

a('performance-async', 'Async Performance', 120, 10, m(
'# Async Performance\n\nOptimize asynchronous code.\n\n## Avoid Promise Overhead\n\n```xs\n// Bad: unnecessary promise wrapper\nCHAMA ESSE CARA ASSINCRONO getValor() {\n  VOLTA 42  // unnecessary async\n}\n\n// Good: sync is fine\nCHAMA ESSE CARA getValor() {\n  VOLTA 42\n}\n```\n\n## Batch Processing\n\n```xs\n// Slow: one at a time\nPARA CADA (item EM items) {\n  await processar(item)\n}\n\n// Fast: parallel with limit\nCRIA pool = Fila.novo(5)\nawait PROMETA.tudo(items.mapa((i) => pool.adicionar(() => processar(i))))\n```\n\n## Avoid Promise.all with Too Many\n\n```xs\n// Bad: 10000 concurrent promises\nawait PROMETA.tudo(itens.mapa(processar))\n\n// Good: chunked\nPARA CADA (lote EM chunk(itens, 100)) {\n  await PROMETA.tudo(lote.mapa(processar))\n}\n```\n\n## Microtask Queues\n\nAwait yields to the microtask queue — use for splitting CPU work.'),
[
  ['Should you mark sync functions as async?', 'no, avoid unnecessary async', 3],
  ['What is a risk of PROMETA.tudo with many items?', 'excessive concurrent execution', 5],
  ['How do you limit async concurrency?', 'queue with batch processing', 3]
]
);

a('performance-best-practices', 'Performance Best Practices', 121, 10, m(
'# Performance Best Practices\n\nSummary guidelines for performant code.\n\n## 1. Measure First\n\nNever guess — profile to find real bottlenecks.\n\n## 2. Avoid Premature Optimization\n\nWrite clean code first, then optimize bottlenecks.\n\n## 3. Minimize Allocations\n\n- Reuse objects\n- Pool expensive resources\n- Use stack-allocated types when possible\n\n## 4. Choose Right Data Structures\n\n```xs\n// Frequent lookups: DICIONARIO\nCRIA dict = {}\n\n// Order matters: LISTA\nCRIA list = []\n\n// Unique values: CONJUNTO\nCRIA set = CONJUNTO{}\n```\n\n## 5. Batch I/O\n\n- Read/write in chunks\n- Use streams for large files\n- Buffer network operations\n\n## 6. Leverage Compiler Optimizations\n\nWrite idiomatic code — the compiler optimizes common patterns.\n\nConsistent, measurable optimization beats guesswork.'),
[
  ['What is the first step in optimization?', 'measure/profile to find bottlenecks', 3],
  ['Should you optimize before measuring?', 'no, avoid premature optimization', 3],
  ['Should you batch I/O operations?', 'yes', 3]
]
);

// ====== MODULE 15: TESTING (122-129) ======
a('testing-basics', 'Testing with TESTE', 122, 5, m(
'# Testing Basics\n\nXanaScript has a built-in test framework.\n\n## Test Syntax\n\n```xs\nTESTE "soma de dois numeros" {\n  CRIA resultado = 2 + 3\n  AFIRMA(resultado == 5)\n}\n```\n\n## Assertions\n\n```xs\nAFIRMA(condicao)              // assert truthy\nAFIRMA.igual(2 + 2, 4)       // assert equal\nAFIRMA.diferente(1, 2)       // assert not equal\nAFIRMA.verdadeiro(true)      // assert true\nAFIRMA.falso(false)          // assert false\nAFIRMA.nulo(null)            // assert null\nAFIRMA.existe(objeto)        // assert not null\n```\n\n## Running Tests\n\n```bash\nxs test\nxs test --watch\nxs test --coverage\n```\n\n\`TESTE\` is a built-in keyword, not a library function.'),
[
  ['What keyword defines a test?', 'TESTE', 3],
  ['What keyword makes an assertion?', 'AFIRMA', 3],
  ['What command runs tests?', 'xs test', 3]
]
);

a('testing-assertions', 'Advanced Assertions', 123, 5, m(
'# Advanced Assertions\n\nMore assertion patterns.\n\n## Approximate Equality\n\n```xs\nAFIRMA.proximo(3.14159, 3.14, 0.01)  // within tolerance\n```\n\n## Throws\n\n```xs\nAFIRMA.joga(() => {\n  dividir(1, 0)\n}, "Divisao por zero\")\n```\n\n## Arrays & Objects\n\n```xs\nAFIRMA.contem([1, 2, 3], 2)\nAFIRMA.naoContem([1, 2, 3], 4)\n\nAFIRMA.profundamenteIgual(\n  { a: 1, b: { c: 2 } },\n  { a: 1, b: { c: 2 } }\n)\n```\n\n## Custom Messages\n\n```xs\nAFIRMA(temPerfil, "Usuario deve ter perfil\")\n```\n\n## Negation\n\n```xs\nAFIRMA.nao().igual(1 + 1, 3)\n```\n\nGood assertions produce clear failure messages.'),
[
  ['What assertion checks values within tolerance?', 'AFIRMA.proximo', 3],
  ['What assertion checks an error is thrown?', 'AFIRMA.joga', 3],
  ['What assertion deeply compares objects?', 'AFIRMA.profundamenteIgual', 5]
]
);

a('testing-structure', 'Test Structure & Organization', 124, 5, m(
'# Test Structure\n\nOrganize tests for maintainability.\n\n## Test Blocks\n\n```xs\nTESTE "Calculadora" {\n  TESTE "soma" {\n    AFIRMA.igual(soma(2, 3), 5)\n    AFIRMA.igual(soma(-1, 1), 0)\n  }\n\n  TESTE "divisao" {\n    AFIRMA.igual(dividir(10, 2), 5)\n    AFIRMA.joga(() => dividir(1, 0))\n  }\n}\n```\n\n## Setup & Teardown\n\n```xs\nTESTE "Banco de dados" {\n  ANTES DE CADA {\n    CRIA db = conectar()\n  }\n\n  DEPOIS DE CADA {\n    db.fechar()\n  }\n\n  TESTE "inserir usuario\" {\n    db.inserir({ nome: \"Teste\" })\n    AFIRMA.igual(db.contar(), 1)\n  }\n}\n```\n\n\`ANTES DE CADA\` runs before each nested test. \`DEPOIS DE CADA\` runs after.'),
[
  ['What block runs before each test?', 'ANTES DE CADA', 3],
  ['What block runs after each test?', 'DEPOIS DE CADA', 3],
  ['Can tests be nested?', 'yes', 3]
]
);

a('testing-mocks', 'Mocks & Stubs', 125, 10, m(
'# Mocks & Stubs\n\nIsolate units under test.\n\n## Mock Function\n\n```xs\nimport { mock } from "xs:test\"\n\nCRIA fn = mock.fn()\nfn("a\", \"b\")\n\nAFIRMA.igual(fn.chamadas.tamanho, 1)\nAFIRMA.igual(fn.chamadas[0].args, [\"a\", \"b\"])\n```\n\n## Mock Return Values\n\n```xs\nCRIA fn = mock.fn(() => 42)\nAFIRMA.igual(fn(), 42)\n```\n\n## Mock Module\n\n```xs\nmock.modulo("./database.xs\", {\n  buscar: () => PROMETA.resolvida({ id: 1 }),\n  salvar: mock.fn()\n})\n```\n\n## Spy\n\n```xs\nCRIA spy = mock.espia(objeto, \"metodo\")\nobjeto.metodo()\nAFIRMA.igual(spy.chamadas.tamanho, 1)\n```\n\nMocks isolate code from external dependencies.'),
[
  ['What creates a mock function?', 'mock.fn', 3],
  ['What function spies on an existing method?', 'mock.espia', 3],
  ['What module provides mocking?', 'xs:test', 3]
]
);

a('testing-coverage', 'Code Coverage', 126, 10, m(
'# Code Coverage\n\nMeasure which code is exercised by tests.\n\n## Running Coverage\n\n```bash\nxs test --coverage\n```\n\n## Coverage Metrics\n\n- **Statements**: lines executed\n- **Branches**: if/else paths taken\n- **Functions**: function calls made\n- **Lines**: line-level execution\n\n## Coverage Report\n\n```\nFile             | % Stmts | % Branch | % Funcs | % Lines\n----------------|---------|----------|---------|--------\nsrc/math.xs     |   95.45 |    88.89 |     100 |   95.45\nsrc/user.xs     |   82.35 |    75.00 |   66.67 |   82.35\n----------------|---------|----------|---------|--------\nTotal           |   90.12 |    83.33 |   88.89 |   90.12\n```\n\n## Coverage Thresholds\n\n```bash\nxs test --coverage --min-coverage 80\n```\n\nAim for high coverage but remember: 100% coverage doesn\'t mean bug-free.'),
[
  ['What command runs tests with coverage?', 'xs test --coverage', 3],
  ['Name one coverage metric', 'statements / branches / functions / lines', 3],
  ['Does 100% coverage guarantee no bugs?', 'no', 3]
]
);

a('testing-property', 'Property-Based Testing', 127, 10, m(
'# Property-Based Testing\n\nTest properties that should always hold.\n\n## Basic Property\n\n```xs\nTESTE "soma e comutativa" {\n  TESTA TODO { a: NUMERO, b: NUMERO }\n  AFIRMA.igual(soma(a, b), soma(b, a))\n}\n```\n\n## Generators\n\n```xs\nimport { gerar } from "xs:test\"\n\nTESTE "inversao de lista" {\n  TESTA TODO {\n    lista: gerar.lista(gerar.numero(), { minLen: 1 })\n  }\n\n  CRIA invertida = lista.inverter()\n  CRIA deVolta = invertida.inverter()\n  AFIRMA.profundamenteIgual(lista, deVolta)\n}\n```\n\n## Shrinking\n\nWhen a property fails, the test runner shrinks to the minimal failing case.\n\n## Benefits\n\n- Finds edge cases you didn\'t think of\n- Tests behaviors, not hardcoded examples\n- Documented invariants\n\nProperty tests complement example-based tests.'),
[
  ['What keyword starts a property test?', 'TESTA TODO', 3],
  ['What is shrinking?', 'finding the minimal failing case', 5],
  ['What is a benefit of property tests?', 'finds unexpected edge cases', 3]
]
);

a('testing-integration', 'Integration Testing', 128, 10, m(
'# Integration Testing\n\nTest components working together.\n\n## API Tests\n\n```xs\nTESTE "API de usuarios" {\n  CRIA app = criarApp()\n  CRIA resposta = await app.get(\"/api/usuarios\")\n\n  AFIRMA.igual(resposta.status, 200)\n  AFIRMA.igual(resposta.json().tamanho, 3)\n}\n```\n\n## Database Tests\n\n```xs\nTESTE "repositorio de usuarios\" {\n  ANTES DE CADA {\n    CRIA db = criarDBTeste()\n    CRIA repo = RepositorioUsuario.novo(db)\n  }\n\n  DEPOIS DE CADA {\n    db.limpar()\n    db.fechar()\n  }\n\n  TESTE "cria e busca usuario\" {\n    CRIA user = await repo.criar({ nome: \"Teste\" })\n    CRIA encontrado = await repo.buscar(user.id)\n    AFIRMA.igual(encontrado.nome, \"Teste\")\n  }\n}\n```\n\n## Test Doubles\n\nUse real dependencies in integration tests, mocks in unit tests.'),
[
  ['What is integration testing?', 'testing components working together', 3],
  ['Should you use mocks in integration tests?', 'no, use real dependencies', 5],
  ['What should you do in DEPOIS DE CADA for DB tests?', 'clean up data and close connection', 3]
]
);

a('testing-tdd', 'TDD & Testing Strategies', 129, 10, m(
'# TDD & Testing Strategies\n\nTest-Driven Development workflow.\n\n## Red-Green-Refactor\n\n1. **Red**: Write a failing test first\n2. **Green**: Write minimal code to pass\n3. **Refactor**: Improve code while tests stay green\n\n## Testing Pyramid\n\n```\n    /\\\n   /  \\     E2E (few)\n  /    \\\n /------\\   Integration (some)\n/--------\\\n/----------\\ Unit (many)\n```\n\n## What to Test\n\n- Core business logic (highest ROI)\n- Edge cases and boundaries\n- Error paths\n- Public API (not internals)\n\n## What Not to Test\n\n- Boilerplate code\n- Third-party behavior\n- Implementation details\n\nWrite tests that give confidence to refactor.'),
[
  ['What are the three steps of TDD?', 'Red, Green, Refactor', 3],
  ['What type of test should be most numerous?', 'unit tests', 3],
  ['Should you test private methods?', 'no, test public API', 5]
]
);

// ====== MODULE 16: ORM / DATABASE (130-137) ======
a('orm-intro', 'Introduction to TABELA ORM', 130, 5, m(
'# TABELA ORM\n\nXanaScript has a built-in ORM with first-class syntax.\n\n## Model Definition\n\n```xs\nTABELA Usuario {\n  CAMPO nome: TEXTO\n  CAMPO email: TEXTO\n  CAMPO idade: NUMERO\n  CAMPO ativo: BOOLEANO = true\n}\n```\n\n## CRUD Operations\n\n```xs\n// Create\nCRIA user = Usuario.criar({ nome: \"Maria\", email: \"m@e.com\" })\n\n// Read\nCRIA encontrado = Usuario.buscar(user.id)\n\n// Update\nencontrado.atualizar({ nome: \"Mariana\" })\n\n// Delete\nencontrado.deletar()\n```\n\n## Powered by\n\nThe ORM generates SQL or NoSQL queries behind the scenes.\n\n\`TABELA\` is a language keyword, not a library.'),
[
  ['What keyword defines an ORM model?', 'TABELA', 3],
  ['What keyword defines a field?', 'CAMPO', 3],
  ['Is TABELA a library or a language feature?', 'language feature', 3]
]
);

a('orm-fields', 'Field Types & Options', 131, 5, m(
'# Field Types & Options\n\nConfigure model fields with constraints.\n\n## Field Types\n\n```xs\nTABELA Produto {\n  CAMPO id: NUMERO { chave: true }\n  CAMPO nome: TEXTO { obrigatorio: true }\n  CAMPO preco: NUMERO { min: 0 }\n  CAMPO descricao: TEXTO?  // optional\n  CAMPO criadoEm: DATA { padrao: DataAgora }\n}\n```\n\n## Options\n\n| Option | Description |\n|--------|-------------|\n| \`chave\` | Primary key |\n| \`obrigatorio\` | NOT NULL |\n| \`unico\` | UNIQUE constraint |\n| \`padrao\` | Default value |\n| \`min\`/\`max\` | Numeric range |\n| \`ref\` | Foreign key reference |\n\n## Auto Fields\n\n\`criadoEm\` and \`atualizadoEm\` can be auto-managed.'),
[
  ['What option marks a field as primary key?', 'chave: true', 3],
  ['What option sets a default value?', 'padrao', 3],
  ['What option makes a field required?', 'obrigatorio: true', 3]
]
);

a('orm-queries', 'Querying Data', 132, 10, m(
'# Querying Data\n\nFilter, sort, and paginate data.\n\n## Basic Queries\n\n```xs\n// All records\nCRIA todos = Usuario.todos()\n\n// Filter\nCRIA ativos = Usuario.ondetem({ ativo: true })\n\n// First match\nCRIA admin = Usuario.acha({ perfil: \"admin\" })\n```\n\n## Complex Filters\n\n```xs\nCRIA resultados = Usuario.ondetem({\n  idade: { $gte: 18 },\n  nome: { $contem: \"Silva\" },\n  ativo: true\n})\n```\n\n## Sorting & Pagination\n\n```xs\nCRIA pagina = Usuario.ondetem({ ativo: true })\n  .ordena({ nome: \"asc\" })\n  .pular(0)\n  .limite(10)\n```\n\n## Aggregation\n\n```xs\nCRIA media = Usuario.media(\"idade\")\nCRIA total = Usuario.contar({ ativo: true })\n```'),
[
  ['What method returns all records?', 'todos', 3],
  ['What method filters records?', 'ondetem', 3],
  ['What method limits results?', 'limite', 3]
]
);

a('orm-relations', 'Relationships', 133, 10, m(
'# Relationships\n\nDefine relationships between models.\n\n## Belongs To\n\n```xs\nTABELA Post {\n  CAMPO titulo: TEXTO\n  CAMPO autorId: NUMERO { ref: Usuario }\n\n  RELACAO autor: Usuario {\n    tipo: pertenceA\n    chave: autorId\n  }\n}\n```\n\n## Has Many\n\n```xs\nTABELA Usuario {\n  CAMPO nome: TEXTO\n\n  RELACAO posts: Post[] {\n    tipo: temMuitos\n    chaveEstrangeira: autorId\n  }\n}\n```\n\n## Many to Many\n\n```xs\nTABELA Aluno {\n  RELACAO cursos: Curso[] {\n    tipo: temMuitos\n    atraves: Matricula\n  }\n}\n```\n\n## Accessing Relations\n\n```xs\nCRIA posts = usuario.posts  // lazy load\nCRIA posts = await usuario.posts.carregar()  // eager load\n```'),
[
  ['What keyword defines a relationship?', 'RELACAO', 3],
  ['What type is a foreign key relationship?', 'pertenceA', 3],
  ['Can relations be lazy loaded?', 'yes', 3]
]
);

a('orm-migrations', 'Migrations', 134, 10, m(
'# Migrations\n\nManage database schema changes.\n\n## Auto Migration\n\n```xs\nxs db migrate\n```\n\nXanaScript infers schema from \`TABELA\` definitions.\n\n## Manual Migration\n\n```xs\n// migrations/001_criar_usuarios.xs\nMIGRACAO criarUsuarios {\n  PARA CIMA {\n    TABELA Usuario {\n      CAMPO id: NUMERO { chave: true }\n      CAMPO nome: TEXTO { obrigatorio: true }\n      CAMPO email: TEXTO { unico: true }\n    }\n  }\n\n  PARA BAIXO {\n    REMOVER TABELA Usuario\n  }\n}\n```\n\n## Running Migrations\n\n```bash\nxs db migrate        # apply pending\nxs db migrate --rollback  # revert last\nxs db migrate --status    # show status\n```\n\nMigrations keep database schema versioned and reproducible.'),
[
  ['What command runs migrations?', 'xs db migrate', 3],
  ['What block defines the forward migration?', 'PARA CIMA', 3],
  ['What block defines the rollback?', 'PARA BAIXO', 3]
]
);

a('orm-seeding', 'Database Seeding', 135, 10, m(
'# Database Seeding\n\nPopulate database with test or initial data.\n\n## Seed Script\n\n```xs\n// seeds/desenvolvimento.xs\nSEMEADOR dadosIniciais {\n  ANTES {\n    Usuario.deletarTudo()\n  }\n\n  SEMEAR {\n    CRIA admin = Usuario.criar({\n      nome: \"Admin\",\n      email: \"admin@email.com\",\n      perfil: \"admin\"\n    })\n\n    CRIA user = Usuario.criar({\n      nome: \"Maria\",\n      email: \"maria@email.com\"\n    })\n\n    Post.criar({\n      titulo: \"Bem-vindo\",\n      conteudo: \"Primeiro post!\",\n      autorId: admin.id\n    })\n  }\n}\n```\n\n## Running Seeds\n\n```bash\nxs db seed\nxs db seed --env producao\n```\n\nSeeds provide consistent starting data for development and testing.'),
[
  ['What keyword defines a seeder?', 'SEMEADOR', 3],
  ['What block inserts data?', 'SEMEAR', 3],
  ['What block runs before seeding?', 'ANTES', 3]
]
);

a('orm-transactions', 'Transactions', 136, 10, m(
'# Transactions\n\nEnsure data consistency across operations.\n\n## Basic Transaction\n\n```xs\nTRANSACAO {\n  CRIA conta = Conta.buscar(contaId)\n  conta.atualizar({ saldo: conta.saldo - 100 })\n\n  CRIA destino = Conta.buscar(destinoId)\n  destino.atualizar({ saldo: destino.saldo + 100 })\n}\n// Auto-committed on success, rolled back on error\n```\n\n## Manual Control\n\n```xs\nCRIA tx = TRANSACAO.iniciar()\nTENTE {\n  tx.executar(() => {\n    contaDebitar(100)\n    contaCreditar(100)\n  })\n  tx.confirmar()\n} CAPTURA (e) {\n  tx.reverter()\n  JOGAR e\n}\n```\n\n## Nested Transactions\n\nSavepoints for partial rollback:\n\n```xs\nTRANSACAO {\n  operacao1()\n  TRANSACAO {\n    operacao2()  // can rollback independently\n  }\n}\n```\n\nTransactions maintain database integrity.'),
[
  ['What keyword starts a transaction?', 'TRANSACAO', 3],
  ['What method commits a transaction?', 'confirmar', 3],
  ['What method rolls back?', 'reverter', 3]
]
);

a('orm-performance', 'ORM Performance', 137, 10, m(
'# ORM Performance\n\nOptimize database operations.\n\n## N+1 Problem\n\n```xs\n// BAD: N+1 queries\nPARA CADA (post EM Post.todos()) {\n  SOLTA O GRITO(post.autor)  // extra query each iteration\n}\n\n// GOOD: eager load\nPARA CADA (post EM Post.todos().incluir(\"autor\")) {\n  SOLTA O GRITO(post.autor)  // already loaded\n}\n```\n\n## Batch Operations\n\n```xs\n// BAD: individual inserts\nPARA CADA (item EM items) {\n  Item.criar(item)\n}\n\n// GOOD: batch insert\nItem.inserirVarios(items)\n```\n\n## Indexing\n\n```xs\nTABELA Usuario {\n  CAMPO email: TEXTO { unico: true, indice: true }\n  CAMPO nome: TEXTO { indice: true }\n}\n```\n\n## Query Optimization\n\n- Select only needed fields\n- Use pagination\n- Avoid N+1 with eager loading\n- Index query columns'),
[
  ['What problem causes extra queries in loops?', 'N+1 problem', 3],
  ['What method prevents N+1?', 'incluir (eager loading)', 3],
  ['What helps query performance?', 'indexes on queried columns', 3]
]
);

// ====== MODULE 17: WEBASSEMBLY (138-145) ======
a('wasm-intro', 'Introduction to WASM', 138, 5, m(
'# Introduction to WebAssembly\n\nXanaScript can compile directly to WebAssembly.\n\n## Why WASM?\n\n- Near-native performance\n- Run in browsers, servers, embedded devices\n- Deterministic execution\n\n## Compiling to WASM\n\n```bash\nxs build --target wasm entrada.xs -o saida.wasm\n```\n\n## XanaScript to WASM\n\n```xs\n// fib.xs — compiles to WASM\nCHAMA ESSE CARA fib(n) {\n  SE LIGA SO (n <= 1) { VOLTA n }\n  VOLTA fib(n - 1) + fib(n - 2)\n}\n\n// Export for WASM\nEXPORTA fib\n```\n\n## Running WASM\n\n```js\n// JavaScript host\nconst wasm = await WebAssembly.instantiateStreaming(\n  fetch("fib.wasm\")\n)\nconsole.log(wasm.instance.exports.fib(10))\n```\n\nDirect WASM emission, no Emscripten required.'),
[
  ['What flag compiles to WASM?', '--target wasm', 3],
  ['What keyword exports a function for WASM?', 'EXPORTA', 3],
  ['Does XanaScript require Emscripten for WASM?', 'no', 3]
]
);

a('wasm-memory', 'WASM Memory Management', 139, 10, m(
'# WASM Memory\n\nManage linear memory in WebAssembly.\n\n## Memory Declaration\n\n```xs\nMEMORIA 1  // 1 page (64KB)\nMEMORIA 10 // 10 pages (640KB)\n```\n\n## Reading/Writing Memory\n\n```xs\nCRIA offset = 0\nCRIA valor = 42\n\nMEMORIA.ESCREVER_INT32(offset, valor)\nCRIA lido = MEMORIA.LER_INT32(offset)\n```\n\n## String Operations\n\n```xs\nCHAMA ESSE CARA escreverString(ptr, texto) {\n  PARA CADA (i EM 0..texto.tamanho) {\n    MEMORIA.ESCREVER_INT8(ptr + i, texto.charCodeAt(i))\n  }\n  MEMORIA.ESCREVER_INT8(ptr + texto.tamanho, 0)  // null terminator\n}\n```\n\n## Grow Memory\n\n```xs\nMEMORIA.CRESCER(5)  // add 5 pages\nCRIA paginas = MEMORIA.PAGINAS()  // current page count\n```\n\nManual memory control enables zero-overhead data structures.'),
[
  ['What keyword declares WASM memory?', 'MEMORIA', 3],
  ['What is the page size?', '64KB', 3],
  ['What function grows WASM memory?', 'MEMORIA.CRESCER', 3]
]
);

a('wasm-imports', 'WASM Imports & Exports', 140, 10, m(
'# WASM Imports & Exports\n\nCall host functions from WASM and expose functions to host.\n\n## Exports\n\n```xs\nEXPORTA soma\nEXPORTA multiplicar\n\nCHAMA ESSE CARA soma(a, b) { VOLTA a + b }\nCHAMA ESSE CARA multiplicar(a, b) { VOLTA a * b }\n```\n\n## Imports\n\n```xs\nIMPORTA \"env\" \"log\" como log\n\nCHAMA ESSE CARA main() {\n  log(42)  // calls host env.log function\n}\n```\n\n## Import Module\n\n```xs\nIMPORTA \"js\" \"console.log\" como jsLog\n\nCHAMA ESSE CARA renderizar() {\n  jsLog("Renderizando...\")\n}\n```\n\n## Host Integration\n\n```js\nWebAssembly.instantiate(wasm, {\n  env: {\n    log: (x) => console.log(x)\n  },\n  js: {\n    \"console.log\": (msg) => console.log(msg)\n  }\n})\n```\n\nImports/exports are the bridge between WASM and host.'),
[
  ['What keyword exposes a WASM function?', 'EXPORTA', 3],
  ['What keyword imports a host function?', 'IMPORTA', 3],
  ['How does the host provide imported functions?', 'via the imports object in instantiate', 5]
]
);

a('wasm-types', 'WASM Types & Conversion', 141, 10, m(
'# WASM Types\n\nWASM supports only i32, i64, f32, f64 natively.\n\n## Supported Types\n\n```xs\n// Direct WASM types\nCRIA a: I32 = 42\nCRIA b: I64 = 10000000000n\nCRIA c: F32 = 3.14\nCRIA d: F64 = 3.1415926535\n```\n\n## Type Conversion\n\n```xs\nCRIA i = I32(3.14)     // 3 (truncate)\nCRIA f = F64(42)       // 42.0\n\nCRIA ptr = I32(heapPtr)  // pointers are i32\n```\n\n## Function Signatures\n\n```xs\nCHAMA ESSE CARA processar(\n  ptr: I32,\n  len: I32,\n  flag: I32\n): I32 {\n  // WASM-compatible signature\n}\n```\n\n## Limitations\n\n- No strings, objects, or closures in WASM exports\n- Pass primitives or pointers to linear memory\n- Strings must be manually encoded/decoded\n\nUnderstanding WASM types avoids runtime conversion overhead.'),
[
  ['What are the native WASM integer types?', 'I32 and I64', 3],
  ['Can you pass strings directly to WASM exports?', 'no, use pointers to linear memory', 5],
  ['What function converts to 32-bit integer?', 'I32', 3]
]
);

a('wasm-optimization', 'WASM Optimization', 142, 10, m(
'# WASM Optimization\n\nOptimize XanaScript code for WASM output.\n\n## Avoid Dynamic Features\n\n```xs\n// SLOW in WASM: dynamic dispatch\nCRIA fn = metodos[nome]\n\n// FAST in WASM: direct call\nSE LIGA SO (nome == \"soma\") { fn = soma }\nSE LIGA SO (nome == \"mult\") { fn = mult }\n```\n\n## Use Local Variables\n\n```xs\n// FAST: locals are in registers\nCHAMA ESSE CARA sum(n) {\n  CRIA total = 0\n  PARA CADA (i EM 0..n) { total += i }\n  VOLTA total\n}\n```\n\n## Minimize Memory Access\n\n```xs\n// SLOW: reading/writing linear memory\nCRIA val = MEMORIA.LER_INT32(ptr)\nMEMORIA.ESCREVER_INT32(ptr, val + 1)\n\n// FAST: use local variables\nCRIA val = carregarValor()\nval += 1\n```\n\n## Optimize Flags\n\n```bash\nxs build --target wasm --optimize tamanho\nxs build --target wasm --optimize velocidade\n```\n\nWASM benefits from predictable, simple code patterns.'),
[
  ['What is faster in WASM: direct call or dynamic dispatch?', 'direct call', 3],
  ['What compiler flag optimizes for speed?', '--optimize velocidade', 3],
  ['Where are local variables stored in WASM?', 'in registers (locals)', 5]
]
);

a('wasm-debug', 'Debugging WASM', 143, 10, m(
'# Debugging WASM\n\nDebug WebAssembly modules.\n\n## Source Maps\n\n```bash\nxs build --target wasm --source-map entrada.xs\n```\n\n## Logging\n\n```xs\nIMPORTA \"env\" \"log\" como log\n\nCHAMA ESSE CARA debug(valor) {\n  log(valor)  // appears in host console\n}\n```\n\n## Return Error Codes\n\n```xs\nCHAMA ESSE CARA dividir(a, b): I32 {\n  SE LIGA SO (b == 0) { VOLTA -1 }  // error code\n  VOLTA a / b\n}\n```\n\n## WASM Tools\n\n```bash\n# Validate wasm\nwasm-validate saida.wasm\n\n# View WAT (text format)\nwasm2wat saida.wasm -o saida.wat\n\n# Run with debug\nxs run --target wasm --debug entrada.xs\n```\n\nDebugging WASM requires host-side tooling and careful error handling.'),
[
  ['What flag generates source maps?', '--source-map', 3],
  ['What tool converts WASM to text format?', 'wasm2wat', 3],
  ['How do you signal errors in WASM?', 'return error codes', 3]
]
);

a('wasm-runtime', 'WASM Runtime Integration', 144, 10, m(
'# WASM Runtime\n\nEmbed WASM in different environments.\n\n## Browser\n\n```js\nconst wasm = await WebAssembly.instantiateStreaming(\n  fetch("app.wasm\"),\n  imports\n)\nwasm.instance.exports.main()\n```\n\n## Node.js\n\n```js\nconst fs = require(\"fs\")\nconst wasm = new WebAssembly.Module(fs.readFileSync(\"app.wasm\"))\nconst instance = new WebAssembly.Instance(wasm, imports)\ninstance.exports.main()\n```\n\n## WASI (System Interface)\n\n```xs\n// WASI-compatible XanaScript\nimport { fd_write } from \"wasi:fd\"\n\nCHAMA ESSE CARA main() {\n  fd_write(1, \"Ola WASI!\\n\")\n}\n```\n\n```bash\nxs build --target wasm --wasi entrada.xs\nwasmtime saida.wasm\n```\n\nWASI enables system calls (files, networking) from WASM.'),
[
  ['What is WASI?', 'WebAssembly System Interface', 3],
  ['Can WASM run in the browser?', 'yes', 3],
  ['What runtime runs WASI modules?', 'wasmtime', 3]
]
);

a('wasm-best-practices', 'WASM Best Practices', 145, 10, m(
'# WASM Best Practices\n\nGuidelines for effective WASM development.\n\n## 1. Profile First\n\nMeasure whether WASM actually improves performance for your use case.\n\n## 2. Minimize Cross-Boundary Calls\n\nEach host-WASM call has overhead. Batch operations:\n\n```xs\n// BAD: many small calls\nPARA CADA (i EM 0..1000) { hostLog(i) }\n\n// GOOD: batch\nCRIA buffer = []\nPARA CADA (i EM 0..1000) { buffer.empurra(i) }\nhostProcessBuffer(buffer)\n```\n\n## 3. Use Appropriate Types\n\nStick to I32/F64 for best performance.\n\n## 4. Manage Memory Manually\n\nTrack allocations to avoid leaks:\n\n```xs\nCHAMA ESSE CARA alocar(tamanho: I32): I32 { ... }\nCHAMA ESSE CARA liberar(ptr: I32) { ... }\n```\n\n## 5. Test on Target Platform\n\nWASM behavior can differ across runtimes (browser vs wasmtime vs wasmer).\n\nWASM excels for compute-heavy, deterministic workloads.'),
[
  ['What adds overhead in WASM?', 'cross-boundary host calls', 3],
  ['What is the best numeric type for WASM?', 'I32 or F64', 3],
  ['Should WASM behavior be tested across platforms?', 'yes', 3]
]
);

// ====== MODULE 18: MACROS (146-153) ======
a('macros-intro', 'Introduction to Macros', 146, 5, m(
'# Introduction to Macros\n\nCompile-time code transformations.\n\n## What are Macros?\n\nMacros are functions that run at compile time, transforming AST nodes.\n\n```xs\nMACRO duplicar(expr) {\n  VOLTA [expr, expr]\n}\n\nCRIA resultado = duplicar(console.log(\"teste\"))\n// Expands to:\n// console.log(\"teste\")\n// console.log(\"teste\")\n```\n\n## Zero Runtime Cost\n\nMacros execute at compile time — expanded code has no macro overhead.\n\n## When to Use\n\n- Code generation\n- DSL embedding\n- Boilerplate reduction\n- Compile-time checks\n\n\`MACRO\` runs during compilation, not at runtime.'),
[
  ['What keyword defines a macro?', 'MACRO', 3],
  ['When do macros execute?', 'at compile time', 3],
  ['Do macros have runtime overhead?', 'no, they expand at compile time', 3]
]
);

a('macros-syntax', 'Macro Syntax & Patterns', 147, 10, m(
'# Macro Syntax\n\nPattern matching and transformation.\n\n## Simple Pattern\n\n```xs\nMACRO repetir(n, expr) {\n  CRIA resultado = []\n  PARA CADA (i EM 0..n) {\n    resultado.empurra(expr)\n  }\n  VOLTA resultado\n}\n\nrepetir(3, SOLTA O GRITO(\"Oi\"))\n// Expands to:\n// SOLTA O GRITO(\"Oi\")\n// SOLTA O GRITO(\"Oi\")\n// SOLTA O GRITO(\"Oi\")\n```\n\n## AST Access\n\n```xs\nMACRO logvar(nome) {\n  VOLTA [\n    SOLTA O GRITO(\"Variavel: \" + nome),\n    nome\n  ]\n}\n```\n\n## Hygiene\n\nMacros respect variable scoping (hygienic):\n\n```xs\nMACRO trocar(a, b) {\n  CRIA tmp = a  // unique temporary, won\'t conflict\n  a = b\n  b = tmp\n}\n```\n\nMacros operate on syntax trees, not strings.'),
[
  ['Do XanaScript macros operate on strings or AST?', 'AST', 3],
  ['What makes a macro hygienic?', 'it respects variable scoping', 5],
  ['What does a macro return?', 'AST nodes to substitute', 3]
]
);

a('macros-advanced', 'Advanced Macro Techniques', 148, 10, m(
'# Advanced Macros\n\nParameterized and recursive macros.\n\n## Conditional Macro\n\n```xs\nMACRO assertEqual(a, b) {\n  SE LIGA SO (a !== b) {\n    JOGAR \"Assertion failed: \" + a + \" != \" + b\n  }\n}\n```\n\n## Recursive Macro\n\n```xs\nMACRO range(n) {\n  SE LIGA SO (n <= 0) {\n    VOLTA []\n  } SENAO {\n    VOLTA [...range(n - 1), n]\n  }\n}\n\nCRIA nums = range(5)  // [1, 2, 3, 4, 5]\n```\n\n## Multi-Statement Macro\n\n```xs\nMACRO medirTempo(expr) {\n  CRIA inicio = hrTime()\n  CRIA resultado = expr\n  CRIA fim = hrTime()\n  SOLTA O GRITO(\"Durou: \" + (fim - inicio) + \"ns\")\n  VOLTA resultado\n}\n\nCRIA r = medirTempo(calcularPesado())\n```\n\n## Compile-Time Validation\n\n```xs\nMACRO validarEmail(email) {\n  SE LIGA SO (!email.tem(\"@\")) {\n    ERRO_COMPILACAO \"Email invalido: \" + email\n  }\n  VOLTA email\n}\n```\n\n\`ERRO_COMPILACAO\` halts compilation with a message.'),
[
  ['What function stops compilation with an error?', 'ERRO_COMPILACAO', 3],
  ['Can macros be recursive?', 'yes', 3],
  ['Can a macro return multiple expressions?', 'yes, as an array', 3]
]
);

a('macros-compiletime', 'Compile-Time Execution', 149, 10, m(
'# Compile-Time Execution\n\nRun arbitrary code at compile time.\n\n## Compile-Time Compute\n\n```xs\nMACRO factorial(n) {\n  CHAMA ESSE CARA calc(x) {\n    SE LIGA SO (x <= 1) { VOLTA 1 }\n    VOLTA x * calc(x - 1)\n  }\n\n  VOLTA calc(n)\n}\n\nCRIA r = factorial(10)  // pre-computed to 3628800 at compile time\n```\n\n## File Loading\n\n```xs\nMACRO incluirArquivo(caminho) {\n  CRIA conteudo = fs.readFileSync(caminho, \"utf8\")\n  VOLTA parse(conteudo)  // parse as XanaScript AST\n}\n\nincluirArquivo(\"template.xs\")\n```\n\n## Environment Checks\n\n```xs\nMACRO assertBuild(cond, msg) {\n  SE LIGA SO (!cond) {\n    ERRO_COMPILACAO msg\n  }\n}\n\nassertBuild(process.env.NODE_ENV === \"production\", \"Must build in production\")\n```\n\nCompile-time execution enables powerful build-time metaprogramming.'),
[
  ['Can macros perform I/O at compile time?', 'yes', 3],
  ['What does ERRO_COMPILACAO do?', 'halts compilation with an error message', 3],
  ['What is compile-time compute useful for?', 'pre-computing values, build-time checks', 3]
]
);

a('macros-practical', 'Practical Macro Examples', 150, 10, m(
'# Practical Macros\n\nReal-world macro patterns.\n\n## Enum-Like\n\n```xs\nMACRO enum(nome, ...valores) {\n  CRIA obj = {}\n  CRIA i = 0\n  PARA CADA (v EM valores) {\n    obj[v] = i\n    i += 1\n  }\n  VOLTA obj\n}\n\nCRIA Cores = enum(\"Cores\", \"Vermelho\", \"Azul\", \"Verde\")\n// { Vermelho: 0, Azul: 1, Verde: 2 }\n```\n\n## Lazy Getter\n\n```xs\nMACRO lazy(prop, expr) {\n  CRIA _${prop} = null\n  PEGA ${prop}() {\n    SE LIGA SO (_${prop} == null) {\n      _${prop} = expr\n    }\n    VOLTA _${prop}\n  }\n}\n```\n\n## Builder Pattern\n\n```xs\nMACRO build(obj, ...props) {\n  CRIA result = {}\n  PARA CADA (p EM props) {\n    result[p.chave] = p.valor\n  }\n  VOLTA result\n}\n\nCRIA user = build({}, { chave: \"nome\", valor: \"Maria\" })\n```\n\nMacros reduce boilerplate across your codebase.'),
[
  ['Can macros generate enum-like objects?', 'yes', 3],
  ['What pattern creates lazy-initialized properties?', 'lazy macro', 5],
  ['What is a benefit of macros?', 'reducing boilerplate at compile time', 3]
]
);

a('macros-testing', 'Testing Macros', 151, 10, m(
'# Testing Macros\n\nVerify macro expansion produces correct code.\n\n## Expansion Test\n\n```xs\nTESTE \"macro repetir\" {\n  CRIA expanded = MACRO_EXPANDE(repetir(3, SOLTA O GRITO(\"x\")))\n  AFIRMA.igual(expanded.tamanho, 3)\n}\n```\n\n## Snapshot Testing\n\n```xs\nTESTE \"macro enum snapshot\" {\n  CRIA expanded = MACRO_EXPANDE(\n    enum(\"Dias\", \"Seg\", \"Ter\", \"Qua\")\n  )\n  CONFIRMA_SNAPSHOT(expanded)\n}\n```\n\n## Compile-Time Errors\n\n```xs\nTESTE \"macro validation\" {\n  AFIRMA.ERRO_COMPILACAO(() => {\n    validarEmail(\"invalido\")\n  })\n}\n```\n\n## Test Tools\n\n```bash\nxs macro-test           # test macro expansions\nxs macro-test --watch   # watch mode\n```\n\nTest macros to ensure they generate correct code across edge cases.'),
[
  ['What function expands a macro for testing?', 'MACRO_EXPANDE', 3],
  ['What is snapshot testing for macros?', 'comparing expanded output to a saved snapshot', 5],
  ['How do you test compile-time errors?', 'AFIRMA.ERRO_COMPILACAO', 3]
]
);

a('macros-best-practices', 'Macro Best Practices', 152, 10, m(
'# Macro Best Practices\n\nGuidelines for safe, maintainable macros.\n\n## 1. Keep Macros Simple\n\nComplex macros are hard to debug. Prefer functions when possible.\n\n## 2. Document Expansion\n\n```xs\n// Macro: assert(cond, msg)\n// Expands to: if (!cond) { throw msg }\nMACRO assert(cond, msg) { ... }\n```\n\n## 3. Avoid Side Effects\n\nMacros should be pure — no I/O, no mutation of external state (except during compile time).\n\n## 4. Test Macros\n\nUse \`MACRO_EXPANDE\` and snapshot testing.\n\n## 5. Use Hygiene\n\nDon\'t introduce variable names that might conflict:\n\n```xs\n// BAD: may shadow existing variable\nCRIA temp = expr\n\n// GOOD: use unique names\nCRIA _macro_temp_${ID} = expr\n```\n\n## 6. Prefer Functions First\n\nOnly use macros when you genuinely need compile-time transformation.'),
[
  ['Should macros be simple or complex?', 'simple — complex macros are hard to debug', 3],
  ['Should macros have side effects?', 'no, prefer pure macros', 3],
  ['What should you prefer before using macros?', 'regular functions', 3]
]
);

// ====== MODULE 19: DSLS (153-155) ======
a('dsl-intro', 'Domain-Specific Languages', 153, 10, m(
'# Domain-Specific Languages\n\nEmbedded DSLs via macros and metaprogramming.\n\n## What is a DSL?\n\nA mini-language tailored to a specific domain, embedded in XanaScript.\n\n## DSL via Macros\n\n```xs\nMACRO rota(path, metodo, handler) {\n  VOLTA {\n    path: path,\n    metodo: metodo,\n    handler: handler\n  }\n}\n\nCRIA rotas = [\n  rota(\"/api/users\", \"GET\", listarUsuarios),\n  rota(\"/api/users\", \"POST\", criarUsuario),\n  rota(\"/api/users/:id\", \"GET\", buscarUsuario)\n]\n```\n\n## Query DSL\n\n```xs\nMACRO consulta(tabela, ...condicoes) {\n  CRIA query = \"SELECT * FROM \" + tabela\n  SE LIGA SO (condicoes.tamanho > 0) {\n    query += \" WHERE \" + condicoes.join(\" AND \")\n  }\n  VOLTA executarSQL(query)\n}\n\nCRIA admins = consulta(\"usuarios\", \"perfil = \'admin\'\", \"ativo = true\")\n```\n\nDSLs make code read like the domain language.'),
[
  ['What technique enables DSLs in XanaScript?', 'macros and metaprogramming', 3],
  ['What is a benefit of DSLs?', 'code reads like domain language', 3],
  ['Can DSLs be embedded in XanaScript?', 'yes, via macros', 3]
]
);

a('dsl-html', 'HTML DSL Example', 154, 10, m(
'# HTML DSL\n\nBuild HTML with XanaScript DSL.\n\n## Element Macros\n\n```xs\nMACRO div(...children) {\n  VOLTA `<div>${children.join(\"\")}</div>`\n}\n\nMACRO h1(texto) {\n  VOLTA `<h1>${texto}</h1>`\n}\n\nMACRO p(texto) {\n  VOLTA `<p>${texto}</p>`\n}\n```\n\n## Usage\n\n```xs\nCRIA pagina = div(\n  h1(\"Bem-vindo\"),\n  p(\"Este e um paragrafo.\"),\n  p(\"Outro paragrafo.\")\n)\n\n// Output:\n// <div><h1>Bem-vindo</h1><p>...</p><p>...</p></div>\n```\n\n## With Attributes\n\n```xs\nMACRO attrs(...pares) {\n  CRIA resultado = {}\n  PARA CADA (p EM pares) { resultado[p[0]] = p[1] }\n  VOLTA resultado\n}\n\nMACRO divAttr(attrs, ...children) {\n  CRIA attrStr = Object.entries(attrs)\n    .mapa(([k, v]) => ` ${k}=\"${v}\"`)\n    .join(\"\")\n  VOLTA `<div${attrStr}>${children.join(\"\")}</div>`\n}\n```\n\nDSL-based HTML generation is type-safe and composable.'),
[
  ['Can you create an HTML DSL with macros?', 'yes', 3],
  ['Is DSL-based HTML generation type-safe?', 'yes', 3],
  ['What is an advantage over string concatenation?', 'composability and type safety', 5]
]
);

a('dsl-testing', 'Testing DSL', 155, 10, m(
'# Testing DSL\n\nCreate a testing DSL for expressive test definitions.\n\n## Test DSL\n\n```xs\nMACRO testSuite(nome, ...testes) {\n  SOLTA O GRITO(\"Suite: \" + nome)\n  PARA CADA (t EM testes) {\n    TENTE {\n      t()\n      SOLTA O GRITO(\"  OK: \" + t.nome)\n    } CAPTURA (e) {\n      SOLTA O GRITO(\"  FALHOU: \" + t.nome + \" - \" + e)\n    }\n  }\n}\n\nMACRO test(nome, fn) {\n  fn.nome = nome\n  VOLTA fn\n}\n\nMACRO assert(cond, msg = \"Assertion failed\") {\n  SE LIGA SO (!cond) { JOGAR msg }\n}\n\n// Usage\ntestSuite(\"Matematica\",\n  test(\"soma\", () => {\n    assert(2 + 2 == 4)\n  }),\n  test(\"multiplicacao\", () => {\n    assert(3 * 3 == 9)\n  })\n)\n```\n\nCreating custom DSLs lets you design the perfect syntax for each problem domain.'),
[
  ['What is a DSL?', 'a domain-specific language embedded in the host language', 3],
  ['What macro groups tests in the DSL example?', 'testSuite', 3],
  ['What is an advantage of a testing DSL?', 'expressive, readable test definitions', 3]
]
);

// ====== MODULE 20: BEST PRACTICES (156) ======
a('best-practices-index', 'Final Best Practices & Next Steps', 156, 5, m(
'# Best Practices & Next Steps\n\nYour journey with XanaScript — what to do next.\n\n## Style Guide\n\n- Use \`CRIA\` for mutable, \`CONSTANTE\` for immutable\n- Prefer \`COMBINA\` over chained \`SE LIGA SO\` when matching values\n- Name classes with PascalCase, variables with camelCase\n- Keep functions small (< 20 lines)\n- Use \`PURO\` for pure functions\n\n## Code Review Checklist\n\n- [ ] Types are correct and useful\n- [ ] Error paths are handled\n- [ ] No swallowed exceptions\n- [ ] Names are descriptive in Portuguese\n- [ ] Tests cover edge cases\n- [ ] Performance is reasonable\n\n## Learning Path Forward\n\n1. Build a CLI tool using \`xs:fs\` and \`xs:path\`\n2. Create a web server with the HTTP library\n3. Model real data with \`TABELA\` ORM\n4. Write a macro to eliminate boilerplate\n5. Profile and optimize a performance bottleneck\n6. Compile a module to WASM and embed in a web page\n\n## Community & Resources\n\n- Official docs: https://xanascript.xyz/docs\n- GitHub: https://github.com/xanascript/xanascript\n- Discord: https://xanascript.xyz/discord\n\nParabens! You now know XanaScript from fundamentals to advanced metaprogramming.'),
[
  ['Should you prefer CRIA or CONSTANTE for immutable values?', 'CONSTANTE', 3],
  ['What naming convention for classes?', 'PascalCase', 3],
  ['What should you build to practice XanaScript?', 'a CLI tool, web server, or ORM model', 3]
]
);

// Export for the build script
export default L;