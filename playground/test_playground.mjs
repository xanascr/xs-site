import { lex } from "./xs-src/lexer.js";
import { parse } from "./xs-src/parser.js";
import { optimize } from "./xs-src/optimizer.js";
import { interpret } from "./xs-src/interpreter.js";
import { setSource } from "./xs-src/errors.js";

async function playgroundRun(code) {
  const output = [];
  const env = {
    SOLTA_O_GRITO: (...a) => {
      const text = a.map(String).join(" ");
      output.push(text);
    },
    FALA_BAIXO: (...a) => {
      const text = a.map(String).join(" ");
      output.push(text);
    },
    AGORA: () => Date.now(),
    AGORA_VAI: async (url) => {
      output.push("> AGORA_VAI: " + url + " (simulated)");
      return { simulated: true };
    },
    ESPERA_AI: (ms) => new Promise((r) => setTimeout(r, ms)),
    SORTEIA: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
    PARSEIA: JSON.parse,
    TAMANHO: (arr) => (arr && arr.length !== undefined ? arr.length : 0),
    ENCONTRA: (str, pat) => String(str).match(new RegExp(pat)),
    DIVIDE_TEXTO: (str, sep) => String(str).split(sep),
    JUNTAR: (arr, sep) => arr.join(sep),
    DECODIFICA_URL: decodeURIComponent,
    OUVE_AQUI: () => null,
    CRIA_SERVIDOR: () => output.push("> Servidor (simulado)"),
    PARA_SERVIDOR: () => {},
    __IMPORT__: async () => {
      output.push("> Import (simulado)");
      return {};
    },
  };
  setSource(code, "input.xs");
  try {
    const tokens = lex(code, "input.xs");
    let ast = parse(tokens);
    ast = optimize(ast);
    await interpret(ast, env);
  } catch (e) {
    if (e.name === "XSError") {
      output.push("Error: " + e.message);
      if (e.hint) output.push("Hint: " + e.hint);
    } else {
      output.push("Error: " + e.message);
    }
  }
  return output.join("\n");
}

let passed = 0, failed = 0;
const results = [];

async function test(name, code, expected) {
  try {
    const out = await playgroundRun(code);
    const lines = out.split("\n").filter(l => l);
    const ok = expected.some(e => lines.includes(e));
    if (ok) {
      passed++;
      results.push(`  PASS  ${name}`);
    } else {
      failed++;
      results.push(`  FAIL  ${name}`);
      results.push(`        expected one of: ${JSON.stringify(expected)}`);
      results.push(`        got: ${JSON.stringify(lines)}`);
    }
  } catch (e) {
    failed++;
    results.push(`  FAIL  ${name} (crash: ${e.message})`);
  }
}

// ═══════════════════════════════════════
//  1. VARIABLES
// ═══════════════════════════════════════
await test("CRIA number", `CRIA x = 10\nSOLTA O GRITO(x)`, ["10"]);
await test("CRIA string", `CRIA s = "hello"\nSOLTA O GRITO(s)`, ["hello"]);
await test("CRIA reatribuicao", `CRIA x = 1\nx = 2\nSOLTA O GRITO(x)`, ["2"]);
await test("CRIA sem valor", `CRIA x\nSOLTA O GRITO(x)`, ["undefined"]);

// ═══════════════════════════════════════
//  2. ARITHMETIC
// ═══════════════════════════════════════
await test("soma", `CRIA x = 2 + 3\nSOLTA O GRITO(x)`, ["5"]);
await test("subtracao", `CRIA x = 10 - 3\nSOLTA O GRITO(x)`, ["7"]);
await test("multiplicacao", `CRIA x = 4 * 3\nSOLTA O GRITO(x)`, ["12"]);
await test("divisao", `CRIA x = 10 / 3\nSOLTA O GRITO(x)`, ["3.3333333333333335"]);
await test("modulo", `CRIA x = 10 % 3\nSOLTA O GRITO(x)`, ["1"]);
await test("precedencia", `CRIA x = 2 + 3 * 4\nSOLTA O GRITO(x)`, ["14"]);
await test("negativo", `CRIA x = -5\nSOLTA O GRITO(x)`, ["-5"]);

// ═══════════════════════════════════════
//  3. COMPARISON
// ═══════════════════════════════════════
await test("==", `CRIA x = 5 == 5\nSOLTA O GRITO(x)`, ["true"]);
await test("!=", `CRIA x = 5 != 3\nSOLTA O GRITO(x)`, ["true"]);
await test(">", `CRIA x = 5 > 3\nSOLTA O GRITO(x)`, ["true"]);
await test("<", `CRIA x = 3 < 5\nSOLTA O GRITO(x)`, ["true"]);
await test(">=", `CRIA x = 5 >= 5\nSOLTA O GRITO(x)`, ["true"]);
await test("<=", `CRIA x = 3 <= 5\nSOLTA O GRITO(x)`, ["true"]);

// ═══════════════════════════════════════
//  4. LOGICAL
// ═══════════════════════════════════════
await test("&&", `CRIA x = VERDADEIRO && FALSO\nSOLTA O GRITO(x)`, ["false"]);
await test("||", `CRIA x = VERDADEIRO || FALSO\nSOLTA O GRITO(x)`, ["true"]);
await test("!", `CRIA x = !VERDADEIRO\nSOLTA O GRITO(x)`, ["false"]);
await test("&& curto", `CRIA x = FALSO && (10 / 0)\nSOLTA O GRITO(x)`, ["false"]);

// ═══════════════════════════════════════
//  5. IF/ELSE
// ═══════════════════════════════════════
await test("SE LIGA SO true", `SE LIGA SO (VERDADEIRO) {\n  SOLTA O GRITO("sim")\n}`, ["sim"]);
await test("SE LIGA SO else", `SE LIGA SO (FALSO) {\n  SOLTA O GRITO("sim")\n} SENAO {\n  SOLTA O GRITO("nao")\n}`, ["nao"]);
await test("SENAO SE LIGA SO", `SE LIGA SO (FALSO) {\n  SOLTA O GRITO("a")\n} SENAO SE LIGA SO (VERDADEIRO) {\n  SOLTA O GRITO("b")\n} SENAO {\n  SOLTA O GRITO("c")\n}`, ["b"]);
await test("SE aninhado", `CRIA x = 10\nSE LIGA SO (x > 5) {\n  SE LIGA SO (x < 20) {\n    SOLTA O GRITO("ok")\n  }\n}`, ["ok"]);

// ═══════════════════════════════════════
//  6. FOR LOOP
// ═══════════════════════════════════════
await test("REPETE NA MORAL", `CRIA s = 0\nREPETE NA MORAL (CRIA i = 1; i <= 3; i++) {\n  s = s + i\n}\nSOLTA O GRITO(s)`, ["6"]);
await test("VOA (break)", `CRIA s = 0\nREPETE NA MORAL (CRIA i = 1; i <= 10; i++) {\n  SE LIGA SO (i > 3) {\n    VOA()\n  }\n  s = s + i\n}\nSOLTA O GRITO(s)`, ["6"]);
await test("CONTINUA", `CRIA s = ""\nCRIA n = 0\nREPETE NA MORAL (CRIA i = 1; i <= 5; i++) {\n  SE LIGA SO (i == 3) {\n    CONTINUA()\n  }\n  n = n + 1\n}\nSOLTA O GRITO(n)`, ["4"]);

// ═══════════════════════════════════════
//  7. WHILE LOOP
// ═══════════════════════════════════════
await test("REPETE AI", `CRIA i = 1\nCRIA s = ""\nREPETE AI (i <= 3) {\n  s = s + "x"\n  i++\n}\nSOLTA O GRITO(s)`, ["xxx"]);
await test("REPETE AI zero", `CRIA i = 0\nREPETE AI (FALSO) {\n  i++\n}\nSOLTA O GRITO(i)`, ["0"]);

// ═══════════════════════════════════════
//  8. FUNCTIONS
// ═══════════════════════════════════════
await test("CHAMA ESSE CARA", `CHAMA ESSE CARA dobra(x) {\n  VOLTA x * 2\n}\nSOLTA O GRITO(dobra(5))`, ["10"]);
await test("funcao sem VOLTA", `CHAMA ESSE CARA nada() {\n  CRIA x = 1\n}\nSOLTA O GRITO(nada())`, ["1"]);
await test("funcao params", `CHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b\n}\nSOLTA O GRITO(soma(3, 4))`, ["7"]);
await test("recursao", `CHAMA ESSE CARA fat(n) {\n  SE LIGA SO (n <= 1) {\n    VOLTA 1\n  }\n  VOLTA n * fat(n - 1)\n}\nSOLTA O GRITO(fat(5))`, ["120"]);

// ═══════════════════════════════════════
//  9. COMPOUND ASSIGNMENT
// ═══════════════════════════════════════
await test("+=", `CRIA x = 5\nx += 3\nSOLTA O GRITO(x)`, ["8"]);
await test("-=", `CRIA x = 5\nx -= 3\nSOLTA O GRITO(x)`, ["2"]);
await test("*=", `CRIA x = 5\nx *= 3\nSOLTA O GRITO(x)`, ["15"]);
await test("/=", `CRIA x = 10\nx /= 2\nSOLTA O GRITO(x)`, ["5"]);
await test("%=", `CRIA x = 10\nx %= 3\nSOLTA O GRITO(x)`, ["1"]);

// ═══════════════════════════════════════
//  10. ARRAYS
// ═══════════════════════════════════════
await test("array literal", `CRIA a = [1, 2, 3]\nSOLTA O GRITO(a[0])`, ["1"]);
await test("array index", `CRIA a = [10, 20, 30]\nSOLTA O GRITO(a[1])`, ["20"]);
await test("array modificar", `CRIA a = [1, 2]\na[0] = 99\nSOLTA O GRITO(a[0])`, ["99"]);
await test("array TAMANHO", `CRIA a = [10, 20, 30]\nCRIA t = a.length\nSOLTA O GRITO(t)`, ["3"]);

// ═══════════════════════════════════════
//  11. OBJECTS
// ═══════════════════════════════════════
await test("objeto literal", `CRIA o = {a: 1, b: 2}\nSOLTA O GRITO(o.a)`, ["1"]);
await test("objeto prop", `CRIA o = {nome: "teste"}\nSOLTA O GRITO(o.nome)`, ["teste"]);
await test("objeto modificar", `CRIA o = {x: 1}\no.x = 99\nSOLTA O GRITO(o.x)`, ["99"]);

// ═══════════════════════════════════════
//  12. TERNARY
// ═══════════════════════════════════════
await test("ternario true", `CRIA x = VERDADEIRO ? "sim" : "nao"\nSOLTA O GRITO(x)`, ["sim"]);
await test("ternario false", `CRIA x = FALSO ? "sim" : "nao"\nSOLTA O GRITO(x)`, ["nao"]);

// ═══════════════════════════════════════
//  13. STRING OPERATIONS
// ═══════════════════════════════════════
await test("concat", `CRIA x = "a" + "b"\nSOLTA O GRITO(x)`, ["ab"]);
await test("concat num", `CRIA x = "n" + 42\nSOLTA O GRITO(x)`, ["n42"]);

// ═══════════════════════════════════════
//  14. BUILT-IN FUNCTIONS
// ═══════════════════════════════════════
await test("SORTEIA", `CRIA x = SORTEIA(1, 1)\nSOLTA O GRITO(x)`, ["1"]);
await test("PARSEIA", `CRIA x = PARSEIA('{"a":1}')\nSOLTA O GRITO(x.a)`, ["1"]);
await test("DIVIDE TEXTO", `CRIA x = DIVIDE TEXTO("a,b,c", ",")\nSOLTA O GRITO(x[0])`, ["a"]);
await test("JUNTAR", `CRIA x = JUNTAR(["a","b"], ",")\nSOLTA O GRITO(x)`, ["a,b"]);
await test("ENCONTRA", `CRIA x = ENCONTRA("hello", "ll")\nSOLTA O GRITO(x[0])`, ["ll"]);

// ═══════════════════════════════════════
//  15. LITERALS
// ═══════════════════════════════════════
await test("NULO", `CRIA x = NULO\nSOLTA O GRITO(x)`, ["null"]);
await test("VERDADEIRO", `CRIA x = VERDADEIRO\nSOLTA O GRITO(x)`, ["true"]);
await test("FALSO", `CRIA x = FALSO\nSOLTA O GRITO(x)`, ["false"]);

// ═══════════════════════════════════════
//  16. ++ / --
// ═══════════════════════════════════════
await test("i++", `CRIA i = 5\ni++\nSOLTA O GRITO(i)`, ["6"]);
await test("i--", `CRIA i = 5\ni--\nSOLTA O GRITO(i)`, ["4"]);

// ═══════════════════════════════════════
//  17. MEMBER / INDEX ACCESS
// ═══════════════════════════════════════
await test("member dot", `CRIA o = {x: 10}\nSOLTA O GRITO(o.x)`, ["10"]);
await test("index bracket", `CRIA o = {x: 10}\nCRIA k = "x"\nSOLTA O GRITO(o[k])`, ["10"]);

// ═══════════════════════════════════════
//  18. ESCOLHE (switch)
// ═══════════════════════════════════════
await test("ESCOLHE case", `ESCOLHE (2) {\n  CASO 1: SOLTA O GRITO("um")\n  CASO 2: SOLTA O GRITO("dois")\n  PADRAO: SOLTA O GRITO("outro")\n}`, ["dois"]);
await test("ESCOLHE padrao", `ESCOLHE (99) {\n  CASO 1: SOLTA O GRITO("um")\n  PADRAO: SOLTA O GRITO("outro")\n}`, ["outro"]);

// ═══════════════════════════════════════
//  19. COMBINA (pattern matching)
// ═══════════════════════════════════════
await test("COMBINA literal", `CRIA x = COMBINA (2) {\n  CASO 1 => "um"\n  CASO 2 => "dois"\n  PADRAO: "outro"\n}\nSOLTA O GRITO(x)`, ["dois"]);
await test("COMBINA padrao", `CRIA x = COMBINA (99) {\n  CASO 1 => "um"\n  PADRAO: "outro"\n}\nSOLTA O GRITO(x)`, ["outro"]);

// ═══════════════════════════════════════
//  20. TEMPLATE STRINGS
// ═══════════════════════════════════════
await test("template string", `CRIA n = "mundo"\nCRIA x = \`Ola $\{n}!\`\nSOLTA O GRITO(x)`, ["Ola mundo!"]);

// ═══════════════════════════════════════
//  REPORT
// ═══════════════════════════════════════
console.log(`\n${String.fromCharCode(0x2554)}${String.fromCharCode(0x2550).repeat(34)}${String.fromCharCode(0x2557)}`);
console.log(`${String.fromCharCode(0x2551)}   Playground Feature Tests       ${String.fromCharCode(0x2551)}`);
console.log(`${String.fromCharCode(0x255A)}${String.fromCharCode(0x2550).repeat(34)}${String.fromCharCode(0x255D)}\n`);
console.log(results.join("\n"));
console.log(`\n${String.fromCharCode(0x2500).repeat(46)}`);
console.log(`  ${passed} passaram   ${failed} falharam\n`);
process.exit(failed > 0 ? 1 : 0);
