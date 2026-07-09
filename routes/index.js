import { Router } from "express";
import semver from "semver";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Package from "../models/Package.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Certificate from "../models/Certificate.js";
import ModuleQuiz from "../models/ModuleQuiz.js";
import { sanitizeHtml } from "../services/sanitize.js";

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
  {
    title: "Bitwise Operators",
    lang: "xs",
    code: `CRIA a = 0b1100\nCRIA b = 0b1010\n\nSOLTA O GRITO("a & b =", a & b)   // 8 (1000)\nSOLTA O GRITO("a | b =", a | b)   // 14 (1110)\nSOLTA O GRITO("a ^ b =", a ^ b)   // 6 (0110)\nSOLTA O GRITO("~a    =", ~a)      // -13\nSOLTA O GRITO("1 << 3 =", 1 << 3) // 8\nSOLTA O GRITO("16 >> 2 =", 16 >> 2) // 4\n\n// Compound assignment\nCRIA x = 5\nx |= 2  // x = 5 | 2 = 7\nx &= 3  // x = 7 & 3 = 3\nSOLTA O GRITO("x =", x)`,
    desc: "Bitwise operations (| & ^ ~ << >>) with compound assignment, ideal for flags and binary protocols."
  },
  {
    title: "Base64 Encoding",
    lang: "xs",
    code: `IMPORTA "base64" AS b64\n\nCRIA original = "Hello World!"\nCRIA encoded = b64.encode(original)\nCRIA decoded = b64.decode(encoded)\n\nSOLTA O GRITO("Original:", original)\nSOLTA O GRITO("Encoded:", encoded)\nSOLTA O GRITO("Decoded:", decoded)\n\n// URL-safe variant\nCRIA urlSafe = b64.encodeURL("https://example.com")\nSOLTA O GRITO("URL-safe:", urlSafe)\n\n// File/bytes support\nCRIA bytes = [72, 101, 108, 108, 111]\nCRIA fileB64 = b64.encodeFile(bytes)\nSOLTA O GRITO("File B64:", fileB64)\n\n// Validation\nSOLTA O GRITO("Valid?", b64.isValid(encoded))`,
    desc: "Base64 encode/decode for strings, bytes, and URLs using native bitwise operators."
  },
  {
    title: "Macros (Compile-time)",
    lang: "xs",
    code: `MACRO measure(name, expr) {\n  VOLTA [\n    'CRIA __start = AGORA()',\n    expr[0],\n    'SOLTA O GRITO("' + name + ': " + (AGORA() - __start) + "ms")'\n  ]\n}\n\nmeasure("loop", REPETE NA MORAL (CRIA i = 0; i < 1000; i += 1) {\n  CRIA _ = i * i\n})\n\nMACRO assert(cond) {\n  CRIA code = TEXTO(cond)\n  VOLTA [\n    "SE LIGA SO (!(" + code + ")) { SOLTA O GRITO('FAIL: " + code + "') }"\n  ]\n}\n\nassert(2 + 2 == 4)\nassert(3 * 3 == 9)`,
    desc: "Compile-time macros that receive AST nodes and generate code, useful for metaprogramming."
  },
  {
    title: "Classes & OOP",
    lang: "xs",
    code: `CLASSE Animal {\n  CONSTRUTOR(nome) {\n    ISTO.nome = nome\n  }\n  METODO speak() {\n    SOLTA O GRITO(ISTO.nome + " makes a sound")\n  }\n}\n\nCLASSE Dog HERDA Animal {\n  METODO speak() {\n    SOLTA O GRITO(ISTO.nome + " says: Woof!")\n  }\n}\n\nCRIA a = NOVA Animal("Generic")\nCRIA d = NOVA Dog("Rex")\na.speak()\nd.speak()\n\nSOLTA O GRITO("d is Dog?", d instanceof Dog)\nSOLTA O GRITO("d is Animal?", d instanceof Animal)`,
    desc: "Class-based OOP with inheritance, constructor, methods, and instanceof operator."
  },
  {
    title: "Error Handling",
    lang: "xs",
    code: `CHAMA ESSE CARA divideSafe(a, b) {\n  TENTA {\n    SE LIGA SO (b == 0) {\n      SOLTA O GRITO("Cannot divide by zero!")\n      VOLTA null\n    }\n    VOLTA a / b\n  } PEGA (err) {\n    SOLTA O GRITO("Error: " + err)\n    VOLTA null\n  }\n}\n\nSOLTA O GRITO("10 / 2 =", divideSafe(10, 2))\nSOLTA O GRITO("10 / 0 =", divideSafe(10, 0))\n\nCHAMA ESSE CARA parseJSON(texto) {\n  TENTA {\n    CRIA data = PARSEIA(texto)\n    SOLTA O GRITO("Parsed:", data)\n  } PEGA (err) {\n    SOLTA O GRITO("Invalid JSON: " + err)\n  }\n}\n\nparseJSON('{"name": "XS", "version": 2}')\nparseJSON("not valid json")`,
    desc: "Try/catch error handling with safe division and JSON parsing examples."
  },
  {
    title: "Tasks & Scheduling",
    lang: "xs",
    code: `TAREFA "backup" {\n  SOLTA O GRITO("Running backup...")\n  ESPERA AI(1000)\n  SOLTA O GRITO("Backup complete!")\n}\n\nTAREFA "sendReport" {\n  SOLTA O GRITO("Sending report...")\n  ESPERA AI(500)\n  SOLTA O GRITO("Report sent!")\n}\n\nSOLTA O GRITO("Starting tasks...")\nESPERA AI(100)\nSOLTA O GRITO("Main program continues...")`,
    desc: "Named async tasks for background operations like backups, reports, and scheduled jobs."
  },
];

router.get("/", (req, res) => {
  const lang = req.lang || "en";
  if (lang !== "en") {
    return res.redirect(`/${lang}/`);
  }
  res.render("en/index", { lang: "en", examples, changelog, benchmarks, page: "home" });
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

// Helper to get enrollment from cookie
async function getEnrollment(courseId, req) {
  const token = req.headers.cookie?.match(/xs_token=([^;]+)/)?.[1];
  if (!token) return null;
  try {
    const jwt = (await import("jsonwebtoken")).default;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return await Enrollment.findOne({ userId: payload.id, courseId }).lean();
  } catch { return null; }
}

// ── Courses ──────────────────────────────────────────────────────────────
// ── Dashboard ────────────────────────────────────────────────────────────
router.get("/:lang(en|pt|es)?/dashboard", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const token = req.headers.cookie?.match(/xs_token=([^;]+)/)?.[1];
    let userData = null;
    if (token) {
      const jwt = (await import("jsonwebtoken")).default;
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const User = (await import("../models/User.js")).default;
        userData = await User.findById(payload.id).select("xp level streak username email").lean();
      } catch {}
    }
    res.render(`${lang}/dashboard`, { lang, user: userData, page: "dashboard" });
  } catch { res.status(404).render(`${lang}/404`, { lang }); }
});

router.get("/:lang(en|pt|es)?/courses", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    let courses = await Course.find({ published: true, lang }).select("title slug description image category level duration totalPoints").sort({ createdAt: -1 }).lean();
    if (!courses.length) {
      courses = await Course.find({ published: true }).select("title slug description image category level duration totalPoints").sort({ createdAt: -1 }).lean();
    }
    res.render(`${lang}/courses/index`, { lang, courses, page: "courses" });
  } catch {
    res.render(`${lang}/courses/index`, { lang, courses: [], page: "courses" });
  }
});

router.get("/:lang(en|pt|es)?/courses/:slug", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true }).lean();
    if (!course) return res.status(404).render(`${lang}/404`, { lang });
    const enrollment = await getEnrollment(course._id, req);
    res.render(`${lang}/courses/show`, { lang, course, enrollment, page: "courses" });
  } catch {
    res.status(404).render(`${lang}/404`, { lang });
  }
});

router.get("/:lang(en|pt|es)?/courses/:slug/lessons/:lessonSlug", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true }).lean();
    if (!course) return res.status(404).render(`${lang}/404`, { lang });
    const lesson = course.lessons.find(l => l.slug === req.params.lessonSlug);
    if (!lesson) return res.status(404).render(`${lang}/404`, { lang });

    const marked = (await import("marked")).marked;
    const lessonHtml = lesson.bodyMd ? marked.parse(lesson.bodyMd, { async: false }) : (lesson.bodyHtml || lesson.contentHtml || lesson.content || "");
    const enrollment = await getEnrollment(course._id, req);

    res.render(`${lang}/courses/lesson`, { lang, course, lesson, lessonHtml, enrollment, page: "courses" });
  } catch {
    res.status(404).render(`${lang}/404`, { lang });
  }
});

router.get("/:lang(en|pt|es)?/courses/:slug/quiz/:moduleIdx", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true }).lean();
    if (!course) return res.status(404).render(`${lang}/404`, { lang });
    const moduleIndex = parseInt(req.params.moduleIdx);
    if (isNaN(moduleIndex)) return res.status(404).render(`${lang}/404`, { lang });
    const quiz = await ModuleQuiz.findOne({ courseId: course._id, moduleIndex }).lean();
    if (!quiz) return res.status(404).render(`${lang}/404`, { lang });
    res.render(`${lang}/courses/quiz`, { lang, course, quiz, moduleIndex, page: "courses" });
  } catch { res.status(404).render(`${lang}/404`, { lang }); }
});

router.get("/:lang(en|pt|es)?/courses/:slug/certificate", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true }).lean();
    if (!course) return res.status(404).render(`${lang}/404`, { lang });

    let enrollment = null;
    let certificate = null;
    const token = req.headers.cookie?.match(/xs_token=([^;]+)/)?.[1];
    if (token) {
      try {
        const jwt = (await import("jsonwebtoken")).default;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        enrollment = await Enrollment.findOne({ userId: payload.id, courseId: course._id }).lean();
        certificate = await Certificate.findOne({ userId: payload.id, courseId: course._id }).lean();
      } catch {}
    }
    res.render(`${lang}/courses/certificate`, { lang, course, enrollment, certificate, page: "courses" });
  } catch {
    res.status(404).render(`${lang}/404`, { lang });
  }
});

router.get("/:lang(en|pt|es)?/certificates/validate", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/certificates/validate`, { lang, page: "certificates", result: null });
});

router.get("/:lang(en|pt|es)?/admin/certificates", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/admin/certificates`, { lang, page: "admin" });
});

router.get("/:lang(en|pt|es)?/signup", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/signup`, { lang, page: "signup" });
});

router.get("/:lang(en|pt|es)?/settings", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/settings`, { lang, page: "settings" });
});

router.get("/:lang(en|pt|es)?/admin", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/admin`, { lang, page: "admin" });
});

router.get("/:lang(en|pt|es)?/donate", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/donate`, { lang, page: "donate" });
});

router.get("/:lang(en|pt|es)?/privacy", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/privacy`, { lang, page: "privacy" });
});

router.get("/:lang(en|pt|es)?/leaderboard", async (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/leaderboard`, { lang, page: "leaderboard" });
});

router.get("/:lang(en|pt|es)?/playground", (req, res) => {
  res.render("en/playground", { lang: req.params.lang || "en", code: req.query.code || "", page: "playground" });
});

router.get("/:lang(en|pt|es)?/forgot-password", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/forgot-password`, { lang, page: "forgot-password", sent: req.query.sent, error: req.query.error });
});

router.get("/:lang(en|pt|es)?/reset-password", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/reset-password`, { lang, page: "reset-password", token: req.query.token || "" });
});

router.get("/:lang(en|pt|es)?/reset-password/:token", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/reset-password`, { lang, page: "reset-password", token: req.params.token });
});

// ── Packages (lang-prefixed) ────────────────────────────────────────────
function sanitizeSearch(q) {
  return (q || "").replace(/[(){}\[\]"'~*?\\-]/g, " ").trim().slice(0, 100);
}

router.get("/:lang(en|pt|es)?/packages", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const q = sanitizeSearch(req.query.q);
    const filter = { status: "approved" };
    if (q) filter.$text = { $search: q };
    const packages = await Package.find(filter).sort({ downloads: -1 }).limit(50).lean();
    res.render(`${lang}/packages/index`, { lang, packages, query: q, page: "packages" });
  } catch {
    res.render(`${lang}/packages/index`, { lang, packages: [], query: "", page: "packages" });
  }
});

router.get("/:lang(en|pt|es)?/packages/dashboard", (req, res) => {
  const lang = req.params.lang || "en";
  res.render(`${lang}/packages/dashboard`, { lang, page: "packages" });
});

router.get("/:lang(en|pt|es)?/packages/:name", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" }).lean();
    if (!pkg) return res.status(404).render(`${lang}/404`, { lang });

    // Get versions list (sorted newest first)
    const versions = (pkg.versions || [])
      .map(v => v.version)
      .sort((a, b) => semver.rcompare(a, b));

    if (pkg.readme) pkg.readmeSanitized = sanitizeHtml(pkg.readme);
    res.render(`${lang}/packages/show`, { lang, pkg, versions, page: "packages" });
  } catch (e) {
    console.error("Error rendering package show:", e);
    res.status(404).render(`${lang}/404`, { lang });
  }
});

router.get("/:lang(en|pt|es)?/packages/:name/:version", async (req, res) => {
  const lang = req.params.lang || "en";
  try {
    const pkg = await Package.findOne({ name: req.params.name, status: "approved" }).lean();
    if (!pkg) return res.status(404).render(`${lang}/404`, { lang });

    const reqVer = req.params.version;
    const versionData = (pkg.versions || []).find(v => v.version === reqVer);
    if (!versionData) return res.status(404).render(`${lang}/404`, { lang });

    // Override with version-specific data
    pkg.version = versionData.version;
    if (versionData.description) pkg.description = versionData.description;
    if (versionData.license) pkg.license = versionData.license;
    if (versionData.repository) pkg.repository = versionData.repository;
    if (versionData.keywords?.length > 0) pkg.keywords = versionData.keywords;
    if (versionData.readme) pkg.readme = versionData.readme;
    if (versionData.s3Key) pkg.s3Key = versionData.s3Key;
    if (versionData.fileSize) pkg.fileSize = versionData.fileSize;
    if (versionData.dependencies?.length > 0) pkg.dependencies = versionData.dependencies;

    const versions = (pkg.versions || [])
      .map(v => v.version)
      .sort((a, b) => semver.rcompare(a, b));

    if (pkg.readme) pkg.readmeSanitized = sanitizeHtml(pkg.readme);
    res.render(`${lang}/packages/show`, { lang, pkg, versions, page: "packages" });
  } catch {
    res.status(404).render(`${lang}/404`, { lang });
  }
});

export default router;
