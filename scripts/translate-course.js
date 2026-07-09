import "dotenv/config";
import fs from "fs";

const enPath = "scripts/seed-course.js";
const ptPath = "scripts/seed-course-pt.js";

const enCode = fs.readFileSync(enPath, "utf8");

// Extract the processedLessons array
const start = enCode.indexOf("const processedLessons = [");
const end = enCode.indexOf("];", start) + 2;
const arrayStr = enCode.slice(start, end);

// Parse lessons using eval-like approach — safer to regex-extract fields
const slugs = [...enCode.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
const titles = [...enCode.matchAll(/title: "([^"]+)"/g)].map(m => m[1]);
const bodyMds = enCode.split('bodyMd: `').slice(1).map(b => b.split('`,\n    challenges')[0]);

console.log(`Found ${slugs.length} slugs, ${titles.length} titles, ${bodyMds.length} bodyMd blocks`);

// For now — manual fix: use EN bodyMd directly but change headings/title references to PT
// Better approach: use translation API
const TRANSLATE = process.argv.includes("--translate");

if (TRANSLATE) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) { console.error("Set GEMINI_API_KEY in .env"); process.exit(1); }

  async function translate(text) {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Translate this lesson body to Brazilian Portuguese. Keep XanaScript code examples unchanged. Output ONLY the translated markdown, no commentary:\n\n${text}` }]
        }]
      })
    });
    const data = await resp.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || text;
  }

  const ptLessons = [];
  for (let i = 0; i < bodyMds.length; i++) {
    console.log(`Translating lesson ${i + 1}/${bodyMds.length}: ${titles[i]}`);
    const ptBody = await translate(bodyMds[i]);
    ptLessons.push(ptBody);
  }

  // Generate the PT file
  let ptCode = `import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

const processedLessons = [\n`;

  // Build slug mapping
  const ptSlugs = [
    "o-que-e-xanascript", "instalacao-e-configuracao", "seu-primeiro-programa",
    "variaveis-com-cria", "constantes-com-constante", "comentarios",
    "tipos-de-dados", "inferencia-de-tipos", "strings-em-detalhes",
    "numeros-em-detalhes", "booleanos-e-logica", "operadores-aritmeticos",
    "operadores-relacionais", "operadores-logicos", "operadores-bitwise",
    "operadores-atribuicao", "operadores-outros", "estruturas-if",
    "switch-case", "ternario", "lacos-for", "lacos-while",
    "lacos-para-cada", "break-e-continue", "funcoes-basicas",
    "parametros-e-retorno", "arrow-functions", "escopo-e-closures",
    "funcoes-recursivas", "funcoes-de-alta-ordem", "arrays",
    "arrays-funcoes-embutidas", "objetos-e-dicionarios", "sets",
    "maps", "datas-e-tempos", "json", "classes",
    "heranca", "metodos-estaticos", "getters-e-setters",
    "propriedades-privadas", "mixins", "programacao-assincrona",
    "async-e-await", "promises", "try-catch",
    "erros-personalizados", "finally", "modulos-importacao",
    "modulos-exportacao", "importacao-dinamica", "manipulacao-arquivos",
    "entrada-saida", "variaveis-de-ambiente", "process.argv",
    "http-server", "rotas-e-middleware", "requisicoes-http",
    "respostas-json", "cookies-e-sessoes", "websockets",
    "orm-com-tabela", "operacoes-crud", "consultas-filtradas",
    "relacionamentos", "migracoes", "transacoes",
    "indices-e-performance", "testes", "testes-afirma",
    "testes-assincronos", "mocks-e-stubs", "cobertura-de-testes",
    "testes-de-integracao", "regex", "expressoes-regulares",
    "grupos-e-capturas", "substituicao", "flags",
    "unicode-em-regex", "webassembly", "wasm-importacao",
    "wasm-funcoes", "wasm-memoria", "wasm-performance",
    "macros", "macros-condicionais", "macros-de-expressao",
    "macros-de-bloco", "macros-recursivas", "lsp-server",
    "lsp-completions", "lsp-hover", "lsp-diagnostics",
    "lsp-go-to-definition", "lsp-refactoring", "cli",
    "cli-argumentos", "cli-cores", "cli-interativo",
    "configuracao", "templating", "motor-de-templates",
    "variaveis-em-templates", "condicionais-em-templates",
    "loops-em-templates", "heranca-em-templates", "types",
    "tipos-avancados", "type-aliases", "tipos-parametrizados",
    "generics", "pattern-matching", "combinacao-de-padroes",
    "pattern-matching-avancado", "interpolacao-de-string",
    "tagged-templates", "optimizacao", "perfilamento",
    "benchmarking", "loop-unrolling", "constant-folding",
    "comunicacao-assincrona", "event-emitter", "streams",
    "buffers", "worker-threads", "child-process",
    "criptografia", "hash", "hmac",
    "cifra-simetrica", "cifra-assimetrica", "assinatura-digital",
    "certificados", "jwt", "oauth2",
    "openid-connect", "autenticacao-2fa", "deploy",
    "docker", "kubernetes", "ci-cd",
    "monitoramento-logging", "debugging-avancado", "boas-praticas",
    "proximo-curso"
  ];

  // Map: extract challenges from original
  const challengesRaw = enCode.match(/challenges: \[([\s\S]*?)\],\n  \}/g);

  for (let i = 0; i < bodyMds.length; i++) {
    const ptslug = ptSlugs[i] || slugs[i];
    const ptTitle = titles[i]; // Will need PT titles too
    ptCode += `  {\n    slug: "${ptslug}",\n    title: "${titles[i]}",\n    order: ${i + 1},\n    points: 10,\n    bodyMd: \`${ptLessons[i].replace(/`/g, "\\`")}\`,\n    challenges: [\n      { question: "Pergunta ${i + 1}", answer: "resposta", points: 5 },\n    ],\n  },\n`;
  }

  ptCode += `];\n\nexport async function seedCoursePt() {\n  await mongoose.connect(MONGODB_URI);\n  await Course.deleteOne({ slug: "curso-completo-xanascript" });\n  const course = await Course.create({\n    title: "Curso Completo de XanaScript",\n    slug: "curso-completo-xanascript",\n    lang: "pt",\n    description: "Aprenda XanaScript do zero ao avançado com 156 aulas.",\n    image: "",\n    category: "Programação",\n    level: "beginner",\n    duration: "40h",\n    published: true,\n    lessons: processedLessons,\n  });\n  console.log(\`Curso criado: \${course.title}\`);\n  console.log(\`Aulas: \${course.lessons.length}\`);\n  console.log(\`Total de pontos: \${course.totalPoints}\`);\n  await mongoose.disconnect();\n  return course;\n}\n\nasync function seed() {\n  try {\n    await seedCoursePt();\n    console.log("Seed concluído!");\n  } catch (e) {\n    console.error("Erro:", e.message);\n    process.exit(1);\n  }\n}\n\nseed();\n`;

  fs.writeFileSync(ptPath, ptCode);
  console.log(`Written to ${ptPath}`);
} else {
  console.log("Run with --translate to use Gemini API for translation");
  console.log("Or set GEMINI_API_KEY in .env");
}