import mongoose from "mongoose";
import "dotenv/config";

import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import PageContent from "../models/PageContent.js";
import Course from "../models/Course.js";
import { Quiz } from "../models/Quiz.js";

const docs = [
  { title: "Instalação", slug: "instalacao", category: "primeiros-passos", body: "# Instalação\n\n```bash\nnpm install -g xanascript\n```\n\nVerifique a instalação:\n\n```bash\nxs --version\n```\n\n## Hello World\n\nCrie `ola.xs`:\n\n```js\nSOLTA O GRITO(\"Olá, mundo!\")\n```\n\nExecute:\n\n```bash\nxs run ola.xs\n```", order: 1 },
  { title: "Sintaxe Básica", slug: "sintaxe-basica", category: "primeiros-passos", body: "# Sintaxe Básica\n\nComentários:\n\n```js\n// Comentário de uma linha\n```\n\nDelimitadores: `()` `{}` `[]`, ponto e vírgula opcional.\n\nIndentação: sensível a contexto (blocos), mas não obrigatória.", order: 2 },
  { title: "Variáveis (CRIA)", slug: "cria", category: "basico", body: "# CRIA\n\nDeclara uma variável:\n\n```js\nCRIA nome = \"XanaScript\"\nCRIA ano = 2026\nCRIA ativo = VERDADEIRO\n```\n\nReatribuição:\n\n```js\nCRIA x = 10\nx = 20\n```", order: 1 },
  { title: "Tipos Primitivos", slug: "tipos", category: "basico", body: "# Tipos\n\n| Tipo | Exemplo |\n|------|---------|\n| Número | `42`, `3.14`, `-10` |\n| Texto | `\"hello\"`, `'mundo'` |\n| Booleano | `VERDADEIRO`, `FALSO` |\n| Nulo | `NULO` |\n| Array | `[1, 2, 3]` |\n| Objeto | `{chave: \"valor\"}` |", order: 2 },
  { title: "Operadores", slug: "operadores", category: "basico", body: "# Operadores\n\nAritméticos: `+` `-` `*` `/` `%` `**`\n\nComparação: `==` `!=` `>` `<` `>=` `<=`\n\nLógicos: `&&` `||` `!`\n\nBitwise: `&` `|` `^` `~` `<<` `>>`\n\nAtribuição: `=` `+=` `-=` `*=` `/=` `%=` `&=` `|=` `^=` `<<=` `>>=`\n\nIncremento: `++` `--`", order: 3 },
  { title: "SE / SENAO", slug: "se-senao", category: "controle", body: "# SE / SENAO\n\n```js\nSE LIGA SO (x > 10) {\n  SOLTA O GRITO(\"maior\")\n} SENAO {\n  SOLTA O GRITO(\"menor ou igual\")\n}\n```\n\nSENAO SE:\n\n```js\nSE LIGA SO (x > 10) {\n  SOLTA O GRITO(\"maior\")\n} SENAO SE (x == 10) {\n  SOLTA O GRITO(\"igual\")\n} SENAO {\n  SOLTA O GRITO(\"menor\")\n}\n```", order: 1 },
  { title: "ESCOLHE / CASO / PADRAO", slug: "escolhe", category: "controle", body: "# ESCOLHE\n\n```js\nESCOLHE (x) {\n  CASO 1 => \"um\"\n  CASO 2 => \"dois\"\n  CASO 3, 4 => \"três ou quatro\"\n  PADRAO => \"outro\"\n}\n```", order: 2 },
  { title: "COMBINA (Pattern Matching)", slug: "combina", category: "controle", body: "# COMBINA\n\nPattern matching com destruturação:\n\n```js\nCRISA descrever = (x) => COMBINA (x) {\n  CASO 0 => \"zero\"\n  CASO 1 => \"um\"\n  CASO _ => \"muitos\"\n}\n\n// Em arrays\nCRIA primeiro = (lista) => COMBINA (lista) {\n  CASO [] => \"vazio\"\n  CASO [x] => \"um item\"\n  CASO [x, _] => \"dois itens\"\n  CASO _ => \"muitos\"\n}\n```", order: 3 },
  { title: "TENTA / PEGA", slug: "tenta-pega", category: "controle", body: "# TENTA / PEGA\n\n```js\nTENTA {\n  CRIA resultado = 10 / 0\n} PEGA (erro) {\n  SOLTA O GRITO(\"Deu ruim: \" + erro)\n}\n```\n\nERRO (throw):\n\n```js\nTENTA {\n  SE LIGA SO (x < 0) {\n    ERRO(\"Valor negativo não permitido\")\n  }\n} PEGA (e) {\n  SOLTA O GRITO(e)\n}\n```", order: 4 },
  { title: "REPETE (Laços)", slug: "repete", category: "controle", body: "# REPETE NA MORAL (for)\n\n```js\nREPETE NA MORAL (CRIA i = 0; i < 10; i++) {\n  SOLTA O GRITO(i)\n}\n```\n\n# REPETE AI (while)\n\n```js\nCRIA i = 0\nREPETE AI (i < 5) {\n  SOLTA O GRITO(i)\n  i++\n}\n```\n\n# VOA (break) / CONTINUA\n\n```js\nREPETE NA MORAL (CRIA i = 0; i < 10; i++) {\n  SE LIGA SO (i == 5) { VOA() }\n  SE LIGA SO (i == 3) { CONTINUA() }\n  SOLTA O GRITO(i)\n}\n```", order: 5 },
  { title: "Funções (CHAMA ESSE CARA)", slug: "funcoes", category: "funcoes", body: "# CHAMA ESSE CARA\n\n```js\nCHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b\n}\n\nSOLTA O GRITO(soma(3, 4))  // 7\n```\n\n# Arrow functions\n\n```js\nCRIA dobro = (x) => x * 2\nCRIA soma = (a, b) => a + b\n```\n\n# Parâmetro padrão\n\n```js\nCHAMA ESSE CARA saudacao(nome = \"mundo\") {\n  SOLTA O GRITO(\"Olá, \" + nome)\n}\n```", order: 1 },
  { title: "Closures", slug: "closures", category: "funcoes", body: "# Closures\n\n```js\nCHAMA ESSE CARA contador() {\n  CRIA count = 0\n  VOLTA () => {\n    count++\n    VOLTA count\n  }\n}\n\nCRIA c = contador()\nSOLTA O GRITO(c())  // 1\nSOLTA O GRITO(c())  // 2\n```", order: 2 },
  { title: "Classes (CLASSE)", slug: "classes", category: "oo", body: "# CLASSE\n\n```js\nCLASSE Animal {\n  CONSTRUTOR(nome) {\n    ISTO.nome = nome\n  }\n  METODO fala() {\n    SOLTA O GRITO(ISTO.nome + \" faz au\")\n  }\n}\n\nCRIA dog = NOVA Animal(\"Rex\")\ndog.fala()\n```\n\n# HERDA\n\n```js\nCLASSE Gato HERDA Animal {\n  METODO fala() {\n    SOLTA O GRITO(ISTO.nome + \" faz miau\")\n  }\n}\n```\n\n# ISTO (this)\n\n`ISTO` refere-se à instância atual dentro de `METODO` e `CONSTRUTOR`.", order: 1 },
  { title: "Módulos (IMPORTA / EXPORTA)", slug: "modulos", category: "modulos", body: "# IMPORTA / EXPORTA\n\n```js\n// math.xs\nEXPORTA CHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b\n}\n\n// main.xs\nIMPORTA \"./math.xs\" AS matematica\nSOLTA O GRITO(matematica.soma(2, 3))\n```\n\nIMPORTA de npm:\n\n```js\nIMPORTA \"axios\" AS http\n```", order: 1 },
  { title: "TABELA (ORM)", slug: "tabela", category: "orm", body: "# TABELA - ORM Embutido\n\n```js\nTABELA Produto {\n  nome: TEXTO\n  preco: NUMERO\n  estoque: NUMERO\n}\n\nCRIA repo = CRIA Produto\nrepo.CRIAR({nome: \"Teclado\", preco: 250, estoque: 10})\n\nSOLTA O GRITO(repo.LISTA())\n```\n\nOperações: `CRIAR`, `LISTA`, `ENCONTRAR`, `ATUALIZAR`, `DELETAR`, `ENCONTRAR_UM`.\n\nFiltros: `{preco: {$gte: 200}}`, `{nome: {$contem: \"key\"}}`.", order: 1 },
  { title: "Funções Embutidas", slug: "builtins", category: "builtins", body: "# Funções Embutidas\n\n| Função | Descrição |\n|--------|-----------|\n| `SOLTA O GRITO(x)` | console.log |\n| `FALA_BAIXO(x)` | console.warn |\n| `AGORA_VAI(url)` | HTTP GET request |\n| `ESPERA_AI(ms)` | setTimeout (Promise) |\n| `SORTEIA(min, max)` | Número aleatório |\n| `PARSEIA(json)` | JSON.parse |\n| `TAMANHO(x)` | length de array/string |\n| `OUVE_AQUI(chave)` | ENV variable |\n| `DIVIDE_TEXTO(s, sep)` | String split |\n| `JUNTAR(arr, sep)` | Array join |\n| `ENCONTRA(str, regex)` | Regex match |\n| `DECODIFICA_URL(url)` | URL decode |\n| `AGORA()` | Date.now() |\n| `AFIRMA(cond)` | Assert truthy |\n| `ASSUNTO(a, b)` | Assert equal |", order: 1 },
  { title: "Async / Await", slug: "async", category: "avancado", body: "# ASSINCRONO\n\n```js\nCRIA fetchUser = ASSINCRONO (id) => {\n  CRIA res = AGORA_VAI(\"https://api.exemplo.com/users/\" + id)\n  CRIA data = PARSEIA(res)\n  VOLTA data\n}\n\nCRIA run = ASSINCRONO () => {\n  CRIA user = ESPERA_AI fetchUser(1)\n  SOLTA O GRITO(user.nome)\n}\n\nESPERA_AI run()\n```", order: 1 },
  { title: "Servidor HTTP", slug: "servidor-http", category: "avancado", body: "# Servidor HTTP Embutido\n\n```js\nCRIA SERVIDOR porta handler\n```\n\n```js\nCHAMA ESSE CARA handler(req, res) {\n  res.json({mensagem: \"Olá!\"})\n}\n\nCRIA SERVIDOR(3000, handler)\n```\n\nPara finalizar:\n\n```js\nPARA_SERVIDOR(server)\n```", order: 2 },
  { title: "CLI", slug: "cli", category: "cli", body: "# CLI (Linha de Comando)\n\n```bash\nxs run arquivo.xs      # Executar\nxs build arquivo.xs     # Compilar para JS\nxs build --wasm file.xs  # Compilar para WASM\nxs init                  # Criar novo projeto\nxs fmt arquivo.xs        # Formatar código\nxs test                  # Rodar testes\nxs publish               # Publicar pacote\nxs install <pacote>      # Instalar pacote\n```", order: 1 },
  { title: "Testes", slug: "testes", category: "testes", body: "# TESTE / AFIRMA / ASSUNTO\n\n```js\nTESTE \"soma\" {\n  CRIA resultado = 2 + 3\n  ASSUNTO(resultado, 5)\n}\n\nTESTE \"verdadeiro\" {\n  AFIRMA(10 > 5)\n  AFIRMA(VERDADEIRO)\n}\n\nTESTE \"arrays\" {\n  CRIA arr = [1, 2, 3]\n  ASSUNTO(TAMANHO(arr), 3)\n}\n```\n\nExecute:\n\n```bash\nxs test\n```", order: 1 },
  { title: "Macros", slug: "macros", category: "avancado", body: "# MACRO\n\n```js\nMACRO quadrado(x) {\n  VOLTA x * x\n}\n\nSOLTA O GRITO(quadrado(5))  // 25\n```\n\nMacros expandem em tempo de compilação.", order: 3 },
  { title: "TAREFA (Task Runner)", slug: "tarefa", category: "avancado", body: "# TAREFA\n\n```js\nTAREFA limpar() {\n  SOLTA O GRITO(\"Limpando...\")\n}\n\nTAREFA testar() {\n  SOLTA O GRITO(\"Testando...\")\n}\n\nTAREFA padrao = [\"limpar\", \"testar\"]\n```\n\nExecute:\n\n```bash\nxs run tarefa limpar\n```", order: 4 },
];

const examples = [
  { title: "Olá Mundo", slug: "ola-mundo", code: "SOLTA O GRITO(\"Olá, mundo!\")", description: "Primeiro programa", category: "basico", order: 1 },
  { title: "Fibonacci", slug: "fibonacci", code: "CHAMA ESSE CARA fib(n) {\n  SE LIGA SO (n <= 1) { VOLTA n }\n  VOLTA fib(n - 1) + fib(n - 2)\n}\n\nSOLTA O GRITO(fib(10))", description: "Sequência de Fibonacci recursiva", category: "funcoes", order: 2 },
  { title: "CRUD ORM", slug: "crud-orm", code: "TABELA Produto {\n  nome: TEXTO\n  preco: NUMERO\n}\n\nCRIA repo = CRIA Produto\nrepo.CRIAR({nome: \"Mouse\", preco: 120})\nrepo.CRIAR({nome: \"Teclado\", preco: 250})\nSOLTA O GRITO(repo.LISTA())", description: "CRUD automático com ORM embutido", category: "orm", order: 1 },
  { title: "Pattern Matching", slug: "pattern-matching", code: "CRIA describe = (n) => COMBINA (n) {\n  CASO 0 => \"zero\"\n  CASO 1 => \"um\"\n  CASO _ => \"muitos\"\n}\n\nSOLTA O GRITO(describe(0))\nSOLTA O GRITO(describe(1))\nSOLTA O GRITO(describe(42))", description: "Pattern matching com COMBINA", category: "controle", order: 1 },
  { title: "Async HTTP", slug: "async-http", code: "CRIA run = ASSINCRONO () => {\n  TENTA {\n    CRIA res = AGORA_VAI(\"https://jsonplaceholder.typicode.com/todos/1\")\n    CRIA data = PARSEIA(res)\n    SOLTA O GRITO(data.title)\n  } PEGA (err) {\n    SOLTA O GRITO(\"Erro: \" + err)\n  }\n}\n\nESPERA_AI run()", description: "Requisição HTTP assíncrona", category: "avancado", order: 1 },
  { title: "Servidor HTTP", slug: "servidor-http", code: "CHAMA ESSE CARA handler(req, res) {\n  res.json({mensagem: \"Olá do XanaScript!\"})\n}\n\nCRIA SERVIDOR(3000, handler)\nSOLTA O GRITO(\"Servidor rodando :3000\")", description: "Servidor HTTP embutido", category: "avancado", order: 2 },
  { title: "Classes", slug: "classes", code: "CLASSE Animal {\n  CONSTRUTOR(nome) {\n    ISTO.nome = nome\n  }\n  METODO fala() {\n    SOLTA O GRITO(ISTO.nome + \" faz au\")\n  }\n}\n\nCRIA dog = NOVA Animal(\"Rex\")\ndog.fala()", description: "Orientação a objetos com CLASSE", category: "oo", order: 1 },
  { title: "Números Primos", slug: "primos", code: "CHAMA ESSE CARA ehPrimo(n) {\n  SE LIGA SO (n < 2) { VOLTA FALSO }\n  REPETE NA MORAL (CRIA i = 2; i * i <= n; i++) {\n    SE LIGA SO (n % i == 0) { VOLTA FALSO }\n  }\n  VOLTA VERDADEIRO\n}\n\nSOLTA O GRITO(ehPrimo(17))  // VERDADEIRO\nSOLTA O GRITO(ehPrimo(4))   // FALSO", description: "Função com laço e condicional", category: "controle", order: 2 },
];

const courseData = {
  title: "Fundamentos do XanaScript",
  slug: "fundamentos",
  description: "Aprenda XanaScript do zero: sintaxe, tipos, controle de fluxo, funções, OO e ORM.",
  level: "beginner",
  published: true,
  modules: [
    {
      title: "Introdução",
      slug: "introducao",
      order: 1,
      lessons: [
        { slug: "instalacao", title: "Instalação e Hello World", bodyMd: "Instale com `npm install -g xanascript`. Crie `ola.xs`:\n\n```js\nSOLTA O GRITO(\"Olá, mundo!\")\n```\n\nExecute:\n\n```bash\nxs run ola.xs\n```", order: 1, points: 5 },
        { slug: "sintaxe", title: "Sintaxe Básica", bodyMd: "Comentários com `//`. Delimitadores: `() {} []`. Ponto e vírgula opcional.", order: 2, points: 5 },
      ],
    },
    {
      title: "Variáveis e Tipos",
      slug: "variaveis-tipos",
      order: 2,
      lessons: [
        { slug: "cria", title: "CRIA — Declaração de Variáveis", bodyMd: "Use `CRIA` para declarar:\n\n```js\nCRIA nome = \"XanaScript\"\nCRIA ano = 2026\n```", order: 1, points: 10 },
        { slug: "tipos", title: "Tipos Primitivos", bodyMd: "Número, Texto, Booleano (`VERDADEIRO`/`FALSO`), Nulo (`NULO`).", order: 2, points: 10 },
        { slug: "operadores", title: "Operadores", bodyMd: "Aritméticos, comparação, lógicos e bitwise.", order: 3, points: 10 },
      ],
    },
    {
      title: "Controle de Fluxo",
      slug: "controle",
      order: 3,
      lessons: [
        { slug: "se-senao", title: "SE / SENAO", bodyMd: "```js\nSE LIGA SO (x > 10) {\n  SOLTA O GRITO(\"maior\")\n} SENAO {\n  SOLTA O GRITO(\"menor\")\n}\n```", order: 1, points: 10 },
        { slug: "escolhe", title: "ESCOLHE / CASO / PADRAO", bodyMd: "Switch-style pattern matching.", order: 2, points: 10 },
        { slug: "repete", title: "REPETE NA MORAL / REPETE AI", bodyMd: "Laços for e while com `VOA()` e `CONTINUA()`.", order: 3, points: 10 },
        { slug: "tenta-pega", title: "TENTA / PEGA", bodyMd: "Tratamento de erros.", order: 4, points: 10 },
      ],
    },
    {
      title: "Funções",
      slug: "funcoes",
      order: 4,
      lessons: [
        { slug: "declaracao", title: "Declaração com CHAMA ESSE CARA", bodyMd: "```js\nCHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b\n}\n```", order: 1, points: 10 },
        { slug: "arrow", title: "Arrow Functions e Closures", bodyMd: "```js\nCRIA dobro = (x) => x * 2\n```", order: 2, points: 10 },
      ],
    },
    {
      title: "Orientação a Objetos",
      slug: "oo",
      order: 5,
      lessons: [
        { slug: "classes", title: "CLASSE / HERDA / ISTO / NOVA", bodyMd: "```js\nCLASSE Animal {\n  CONSTRUTOR(nome) {\n    ISTO.nome = nome\n  }\n  METODO fala() {\n    SOLTA O GRITO(ISTO.nome + \" faz au\")\n  }\n}\n```", order: 1, points: 15 },
      ],
    },
    {
      title: "Projeto Final",
      slug: "projeto",
      order: 6,
      lessons: [
        { slug: "crud-orm", title: "CRUD com ORM", bodyMd: "```js\nTABELA Produto {\n  nome: TEXTO\n  preco: NUMERO\n}\n\nCRIA repo = CRIA Produto\nrepo.CRIAR({nome: \"Teclado\", preco: 250})\nSOLTA O GRITO(repo.LISTA())\n```", order: 1, points: 20 },
      ],
    },
  ],
};

const quizData = {
  course: null,
  moduleSlug: "introducao",
  title: "Quiz - Introdução",
  published: true,
  questions: [
    { question: "Qual comando instala o XanaScript?", options: ["npm install xanascript", "npm install -g xanascript", "pip install xanascript", "apt-get install xanascript"], answer: "npm install -g xanascript", points: 5 },
    { question: "Qual função imprime texto no console?", options: ["FALA(\"texto\")", "SOLTA O GRITO(\"texto\")", "PRINT(\"texto\")", "CONSOLE(\"texto\")"], answer: "SOLTA O GRITO(\"texto\")", points: 5 },
    { question: "Como declarar uma variável em XanaScript?", options: ["VAR x = 10", "LET x = 10", "CRIA x = 10", "DECLARE x = 10"], answer: "CRIA x = 10", points: 5 },
    { question: "Qual palavra-chave representa verdadeiro?", options: ["TRUE", "VERDADE", "VERDADEIRO", "SIM"], answer: "VERDADEIRO", points: 5 },
  ],
};

export async function seed() {
  console.log("[seed] Iniciando seed...");

  const docCount = await DocArticle.countDocuments();
  if (docCount === 0) {
    await DocArticle.insertMany(docs);
    console.log(`[seed] ${docs.length} artigos criados`);
  }

  const exCount = await PlaygroundExample.countDocuments();
  if (exCount === 0) {
    await PlaygroundExample.insertMany(examples);
    console.log(`[seed] ${examples.length} exemplos criados`);
  }

  const pageCount = await PageContent.countDocuments();
  if (pageCount === 0) {
    await PageContent.insertMany([
      { key: "home", title: "Página Inicial", content: { hero: { title: "Programe em Português", subtitle: "XanaScript é uma linguagem de programação com sintaxe em português." } } },
    ]);
    console.log("[seed] Páginas criadas");
  }

  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    const course = await Course.create(courseData);
    console.log(`[seed] Curso "${course.title}" criado`);

    const quizDataWithCourse = { ...quizData, course: course._id };
    await Quiz.create(quizDataWithCourse);
    console.log("[seed] Quiz criado");
  }

  console.log("[seed] Seed concluído!");
}

if (process.argv[1]?.includes("seed") || process.env.npm_lifecycle_event === "seed") {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => seed())
    .then(() => process.exit(0))
    .catch(e => { console.error(e); process.exit(1); });
}
