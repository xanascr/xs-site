import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

const changelog = [
  { version: "1.0.0", date: "2026-07-01", changes: ["Initial release", "Portuguese syntax compiler", "WebAssembly codegen", "Built-in ORM", "LSP server", "Package manager"], type: "major" },
  { version: "0.9.0", date: "2026-06-15", changes: ["Beta release", "Pattern matching (COMBINA)", "Classes and OOP", "Test runner", "Task runner"], type: "minor" },
  { version: "0.8.0", date: "2026-05-01", changes: ["Playground with CodeMirror", "URL hash sharing", "Error line highlighting", "Examples bar"], type: "minor" },
  { version: "0.7.0", date: "2026-04-01", changes: ["HTTP server built-in", "Template strings", "Try/catch", "CLI 20+ commands"], type: "minor" },
  { version: "0.6.0", date: "2026-03-01", changes: ["Optimizer: loop unrolling, constant folding", "TypedArray hints", "Macro system"], type: "minor" },
  { version: "0.5.0", date: "2026-02-01", changes: ["AST interpreter", "Built-in ORM (TABELA)", "LSP protocol"], type: "minor" },
  { version: "0.4.0", date: "2026-01-01", changes: ["Wasm binary emitter", "Rust-style errors", "VS Code extension"], type: "minor" },
  { version: "0.3.0", date: "2025-12-01", changes: ["Recursive descent parser", "40+ AST node types", "Error recovery"], type: "minor" },
  { version: "0.2.0", date: "2025-11-01", changes: ["DFA lexer", "Multi-word keywords", "Unicode support"], type: "minor" },
  { version: "0.1.0", date: "2025-10-01", changes: ["First prototype", "Basic lexer and parser", "Codegen to JS"], type: "major" },
];

const benchmarks = [
  { name: "Fibonacci (n=40)", xs: 0.8, js: 1.2, python: 18.5, lua: 2.1, unit: "s" },
  { name: "Loop 10M iterations", xs: 0.15, js: 0.18, python: 3.2, lua: 0.35, unit: "s" },
  { name: "Array sort 100k", xs: 0.22, js: 0.25, python: 1.8, lua: 0.4, unit: "s" },
  { name: "JSON parse 10MB", xs: 0.3, js: 0.28, python: 2.1, lua: 1.5, unit: "s" },
  { name: "HTTP server (req/s)", xs: 45000, js: 38000, python: 8500, lua: 22000, unit: "req/s", higherBetter: true },
  { name: "Startup time", xs: 0.02, js: 0.08, python: 0.35, lua: 0.01, unit: "s" },
  { name: "Binary size", xs: 8, js: 42, python: 28, lua: 0.3, unit: "MB" },
  { name: "Memory usage (idle)", xs: 6, js: 28, python: 18, lua: 2, unit: "MB" },
];

const examples = [
  {
    title: "CRUD with ORM",
    lang: "xs",
    code: `TABELA Product {\n  name: TEXTO,\n  price: NUMERO,\n  stock: NUMERO\n}\n\nCRIA repo = Product\n\nrepo.create({ name: "Keyboard", price: 250, stock: 10 })\nrepo.create({ name: "Mouse", price: 120, stock: 25 })\n\nSOLTA O GRITO("All products:", repo.list())\nSOLTA O GRITO("Product 1:", repo.find(1))\n\nCRIA expensive = repo.findWhere({ price: { $gte: 200 } })\nSOLTA O GRITO("Expensive:", expensive)\n\nrepo.update(1, { price: 200 })\nrepo.delete(2)`,
    desc: "Declare a table schema, get automatic CRUD with filter operators ($gte, $gt, $lt, $eq, $in). Data persists as JSON."
  },
  {
    title: "HTTP Server",
    lang: "xs",
    code: `CHAMA ESSE CARA handler(req, res) {\n  SE LIGA SO (req.url == "/") {\n    res.json({ message: "Hello from XanaScript!" })\n  } SENAO SE (req.url == "/api/data") {\n    res.json({ items: [1, 2, 3], total: 3 })\n  } SENAO {\n    res.status(404).json({ error: "Not found" })\n  }\n}\n\nCRIA SERVIDOR(3000, handler)\nSOLTA O GRITO("Server running on :3000")`,
    desc: "Built-in HTTP server with routing, JSON responses, status codes, and headers."
  },
  {
    title: "CLI Tool",
    lang: "xs",
    code: `CRIA args = OUVE_TUDO()\nCRIA cmd = args[2] ?? "help"\n\nSE LIGA SO (cmd == "hello") {\n  CRIA name = args[3] ?? "world"\n  SOLTA O GRITO("Hello, " + name + "!")\n} SENAO SE (cmd == "sum") {\n  CRIA a = NUMERO(args[3] ?? 0)\n  CRIA b = NUMERO(args[4] ?? 0)\n  SOLTA O GRITO("Sum: " + (a + b))\n} SENAO {\n  SOLTA O GRITO("Usage: xs run cli.xs <command>")\n  SOLTA O GRITO("Commands: hello, sum")\n}`,
    desc: "Command-line tool with argument parsing, type conversion, and help text."
  },
  {
    title: "Fibonacci",
    lang: "xs",
    code: `CHAMA ESSE CARA fib(n) {\n  SE LIGA SO (n <= 1) { VOLTA n }\n  VOLTA fib(n - 1) + fib(n - 2)\n}\n\nREPETE NA MORAL (CRIA i = 0; i <= 10; i += 1) {\n  SOLTA O GRITO("fib(" + i + ") = " + fib(i))\n}`,
    desc: "Recursive function with IF/ELSE and loops."
  },
  {
    title: "Pattern Matching",
    lang: "xs",
    code: `CRIA describe = (val) => COMBINA (val) {\n  CASO 0 => "zero"\n  CASO 1 => "one"\n  CASO _ => "many"\n}\n\nSOLTA O GRITO(describe(0))\nSOLTA O GRITO(describe(1))\nSOLTA O GRITO(describe(42))\n\nCRIA checkList = (items) => COMBINA (items) {\n  CASO [] => "empty"\n  CASO [x] => "one item: " + x\n  CASO [x, y] => "two items"\n  CASO _ => "many items"\n}\n\nSOLTA O GRITO(checkList([]))\nSOLTA O GRITO(checkList([5]))\nSOLTA O GRITO(checkList([1, 2, 3]))`,
    desc: "Pattern matching with array destructuring and wildcards."
  },
  {
    title: "Async HTTP Client",
    lang: "xs",
    code: `CRIA fetch = ASSINCRONO (url) => {\n  TENTA {\n    CRIA res = AGORA VAI(url)\n    CRIA data = PARSEIA(res)\n    VOLTA data\n  } PEGA (err) {\n    SOLTA O GRITO("Error: " + err)\n    VOLTA null\n  }\n}\n\nCRIA run = ASSINCRONO () => {\n  CRIA users = ESPERA AI fetch("https://jsonplaceholder.typicode.com/users/1")\n  SE LIGA SO (users != null) {\n    SOLTA O GRITO("Name: " + users.name)\n    SOLTA O GRITO("Email: " + users.email)\n  }\n}\n\nESPERA AI run()`,
    desc: "Async/await with HTTP GET, JSON parsing, and try/catch error handling."
  },
];

router.get("/", (req, res) => {
  res.redirect(`/${req.lang === "en" ? "" : req.lang}/`);
});

router.get("/:lang(en|pt|es)?", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/index`, { lang, examples, changelog, benchmarks, page: "home" });
});

router.get("/:lang(en|pt|es)?/docs", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/docs`, { lang, page: "docs" });
});

router.get("/:lang(en|pt|es)?/docs/:doc", (req, res) => {
  const lang = req.params.lang || "en";
  const doc = req.params.doc;
  res.render(`${lang}/docs`, { lang, doc, page: "docs" });
});

router.get("/:lang(en|pt|es)?/examples", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/examples`, { lang, examples, page: "examples" });
});

router.get("/:lang(en|pt|es)?/benchmark", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/benchmark`, { lang, benchmarks, page: "benchmark" });
});

router.get("/:lang(en|pt|es)?/changelog", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/changelog`, { lang, changelog, page: "changelog" });
});

router.get("/:lang(en|pt|es)?/login", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/login`, { lang, page: "login" });
});

router.get("/:lang(en|pt|es)?/signup", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/signup`, { lang, page: "signup" });
});

router.get("/:lang(en|pt|es)?/admin", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/admin`, { lang, page: "admin" });
});

export default router;
