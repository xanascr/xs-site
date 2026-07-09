import fs from "fs";

const fakeSlugs = new Set([
  // EN
  "constants-constante","iteration-para-cada","iteration-while","iteration-control",
  "function-purity","function-overloading","async-basics",
  "reflection-basics","reflection-proxy","reflection-decorators","reflection-symbols",
  "reflection-codegen","reflection-serialize","reflection-annotations","reflection-advanced",
  "data-types","tuple-type","range-type","inheritance-basics",
  "interfaces","multiple-inheritance","memory-basics","memory-leaks",
  "dsl-intro","dsl-html","dsl-testing","abstract-classes",
  "computed-properties","class-operator","class-encapsulation","class-composition",
  "class-static","method-override","polymorphism","dependency-injection","solid-overview",
  "type-union","type-intersection","type-generics","type-mapped","type-conditional",
  "type-template-literal","type-branded","type-satisfies",
  "throwing-errors","custom-errors","error-patterns","error-validation",
  "error-logging","error-recovery","error-best-practices",
  "module-resolution","module-circular","module-packages","module-lazy","module-scope","module-standards",
  "file-read","file-write","file-json","file-streams","file-paths",
  "file-directories","file-temp","file-encoding",
  "async-parallel","async-queue","async-timers","async-workers","async-eventemitter","async-patterns",
  "performance-profiling","performance-optimization","performance-compiler",
  "performance-memory","performance-async","performance-best-practices",
  "testing-assertions","testing-structure","testing-mocks","testing-coverage",
  "testing-property","testing-integration","testing-tdd",
  "orm-migrations","orm-seeding","orm-transactions","orm-performance",
  "wasm-memory","wasm-imports","wasm-types","wasm-optimization","wasm-debug","wasm-runtime","wasm-best-practices",
  "macros-syntax","macros-advanced","macros-compiletime","macros-practical","macros-testing","macros-best-practices",
  "list-comprehension",
  // PT — all that teach non-existent features
  "constantes-com-constante","tipos-de-dados",
  "funcoes-puras","sobrecarga-de-funcoes",
  "compreensao-de-listas","tipo-tupla","tipo-intervalo",
  "loop-para-cada","loop-enquanto","controle-de-loop",
  "propriedades-computadas","sobrecarga-de-operadores","composicao-vs-heranca",
  "membros-estaticos-e-singleton","heranca-com-extende","sobrescrita-de-metodos",
  "polimorfismo","classes-abstratas","interfaces-com-protocolo",
  "heranca-multipla-via-protocolos","injecao-de-dependencia","principios-solid",
  "lancando-erros","validacao-de-entrada",
  "resolucao-de-modulos","dependencias-circulares","criando-pacotes",
  "otimizacoes-do-compilador",
  "cobertura-de-testes",
  "introducao-ao-typescript-no-xanascript","decorators-e-metaprogramacao",
  "programacao-funcional-avancada",
  "padroes-de-arquitetura","design-patterns-comportamentais",
  "design-patterns-estruturais","design-patterns-criacionais",
  "introducao-a-testes-e2e","testes-baseados-em-propriedades",
  "testes-de-mutacao","tecnicas-de-refatoracao","refatoracao-avancada",
  "arquitetura-funcional","domain-driven-design","event-sourcing","cqrs",
]);

function filterFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  const arrStart = "const lessons = [";
  const arrEnd = "];";
  const s = content.indexOf(arrStart);
  const e = content.indexOf(arrEnd, s + arrStart.length) + 2;
  const before = content.slice(0, s);
  const arrayPart = content.slice(s, e);
  const after = content.slice(e);

  const lines = arrayPart.split("\n");
  const kept = [];
  let objLines = [];
  let inObj = false;
  let depth = 0;
  let inBacktick = false;
  let removed = 0;

  function flushObj() {
    if (objLines.length === 0) return;
    const text = objLines.join("\n");
    const m = text.match(/slug: "([^"]+)"/);
    const slug = m ? m[1] : "";
    if (slug && fakeSlugs.has(slug)) {
      removed++;
      return;
    }
    kept.push(...objLines);
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!inObj && trimmed === "{") {
      inObj = true;
      depth = 1;
      objLines = [line];
      continue;
    }
    if (inObj) {
      objLines.push(line);
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "`" && (i === 0 || line[i - 1] !== "\\")) {
          inBacktick = !inBacktick;
        }
        if (!inBacktick) {
          if (line[i] === "{") depth++;
          if (line[i] === "}") depth--;
        }
      }
      if (depth === 0) {
        flushObj();
        inObj = false;
        objLines = [];
      }
    } else {
      kept.push(line);
    }
  }
  if (inObj && objLines.length > 0) flushObj();

  let output = kept.join("\n");
  let order = 0;
  output = output.replace(/order: \d+/g, () => { order++; return `order: ${order}`; });
  fs.writeFileSync(filePath, before + output + after);
  return removed;
}

const enRemoved = filterFile("scripts/seed-course.js");
const ptRemoved = filterFile("scripts/seed-course-pt.js");
console.log(`EN: removed ${enRemoved}`);
console.log(`PT: removed ${ptRemoved}`);

const en = fs.readFileSync("scripts/seed-course.js", "utf8");
const pt = fs.readFileSync("scripts/seed-course-pt.js", "utf8");
const enSlugs = (en.match(/slug: "/g) || []).length - 1;
const ptSlugs = (pt.match(/slug: "/g) || []).length - 1;
console.log(`EN remaining: ${enSlugs}`);
console.log(`PT remaining: ${ptSlugs}`);

import { execSync } from "child_process";
try { execSync("node --check scripts/seed-course.js", { stdio: "pipe" }); console.log("EN: OK"); }
catch { console.log("EN: FAIL"); }
try { execSync("node --check scripts/seed-course-pt.js", { stdio: "pipe" }); console.log("PT: OK"); }
catch { console.log("PT: FAIL"); }