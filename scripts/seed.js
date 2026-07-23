import mongoose from "mongoose";
import "dotenv/config";

import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import PageContent from "../models/PageContent.js";

const docs = [
  { title: "Primeiros Passos", slug: "primeiros-passos", category: "primeiros-passos", body: "# Primeiros Passos\n\nInstale o XanaScript:\n\n```bash\nnpm install -g xanascript\n```\n\nCrie um arquivo `ola.xs`:\n\n```xs\nSOLTA O GRITO(\"Olá, mundo!\")\n```\n\nExecute:\n\n```bash\nxs run ola.xs\n```", order: 1 },
  { title: "Variáveis", slug: "variaveis", category: "basico", body: "# Variáveis\n\nUse `CRIA` para declarar variáveis:\n\n```xs\nCRIA nome = \"XanaScript\"\nCRIA ano = 2026\nCRIA ativo = VERDADEIRO\n```", order: 1 },
  { title: "Tipos", slug: "tipos", category: "basico", body: "# Tipos\n\n- `NUMERO` — números inteiros e decimais\n- `TEXTO` — strings\n- `BOOLEANO` — `VERDADEIRO` / `FALSO`\n- `NULO` — valor nulo", order: 2 },
  { title: "Estruturas de Controle", slug: "controle", category: "controle", body: "# SE / SE LIGA SO\n\n```xs\nSE LIGA SO x > 10 {\n  SOLTA O GRITO(\"grande\")\n} SENAO {\n  SOLTA O GRITO(\"pequeno\")\n}\n```\n\n# ESCOLHE / CASO / PADRAO\n\n```xs\nESCOLHE x {\n  CASO 1 => \"um\"\n  CASO 2 => \"dois\"\n  PADRAO => \"outro\"\n}\n```", order: 1 },
  { title: "Laços", slug: "lacos", category: "controle", body: "# REPETE NA MORAL\n\n```xs\nREPETE NA MORAL (CRIA i = 0; i < 10; i++) {\n  SOLTA O GRITO(i)\n}\n```\n\n# REPETE AI (while)\n\n```xs\nCRIA i = 0\nREPETE AI (i < 5) {\n  SOLTA O GRITO(i)\n  i++\n}\n```", order: 2 },
  { title: "Funções", slug: "funcoes", category: "funcoes", body: "# CHAMA ESSE CARA\n\n```xs\nCHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b\n}\n\nSOLTA O GRITO(soma(3, 4))\n```\n\n# Arrow functions\n\n```xs\nCRIA dobro = (x) => x * 2\n```", order: 1 },
  { title: "Orientação a Objetos", slug: "oo", category: "oo", body: "# CLASSE\n\n```xs\nCLASSE Animal {\n  CONSTRUTOR(nome) {\n    ISTO.nome = nome\n  }\n  METODO fala() {\n    SOLTA O GRITO(ISTO.nome + \" faz au\")\n  }\n}\n\nCRIA dog = NOVA Animal(\"Rex\")\ndog.fala()\n```\n\n# HERDA\n\n```xs\nCLASSE Gato HERDA Animal {\n  METODO fala() {\n    SOLTA O GRITO(ISTO.nome + \" faz miau\")\n  }\n}\n```", order: 1 },
  { title: "TABELA (ORM)", slug: "tabela", category: "orm", body: "# TABELA\n\n```xs\nTABELA Produto {\n  nome: TEXTO\n  preco: NUMERO\n  estoque: NUMERO\n}\n\nCRIA repo = CRIA Produto\nrepo.CRIAR({nome: \"Teclado\", preco: 250, estoque: 10})\n\nLISTA = repo.LISTA()\nSOLTA O GRITO(LISTA)\n```", order: 1 },
  { title: "Módulos", slug: "modulos", category: "modulos", body: "# IMPORTA / EXPORTA\n\n```xs\n// math.xs\nEXPORTA CHAMA ESSE CARA soma(a, b) {\n  VOLTA a + b\n}\n\n// main.xs\nIMPORTA \"./math.xs\" AS matematica\nSOLTA O GRITO(matematica.soma(2, 3))\n```", order: 1 },
  { title: "COMBINA (Pattern Matching)", slug: "combina", category: "controle", body: "# COMBINA\n\n```xs\nCRIA descrever = (x) => COMBINA (x) {\n  CASO 0 => \"zero\"\n  CASO 1 => \"um\"\n  CASO _ => \"muitos\"\n}\n```", order: 3 },
  { title: "TENTA / PEGA", slug: "tenta-pega", category: "controle", body: "# TENTA / PEGA\n\n```xs\nTENTA {\n  CRIA resultado = 10 / 0\n} PEGA (erro) {\n  SOLTA O GRITO(\"Deu erro: \" + erro)\n}\n```", order: 4 },
  { title: "CLI (Linha de Comando)", slug: "cli", category: "cli", body: "# Comandos\n\n```bash\nxs run arquivo.xs    # Executar\nxs build arquivo.xs  # Compilar para JS\nxs fmt arquivo.xs    # Formatar\nxs test              # Rodar testes\nxs publish           # Publicar pacote\n```", order: 1 },
  { title: "TESTE", slug: "teste", category: "testes", body: "# TESTE / AFIRMA / ASSUNTO\n\n```xs\nTESTE \"soma funciona\" {\n  CRIA resultado = 2 + 3\n  ASSUNTO(resultado, 5)\n}\n\nTESTE \"valor é verdadeiro\" {\n  AFIRMA(VERDADEIRO)\n}\n```", order: 1 },
  { title: "Builtins", slug: "builtins", category: "builtins", body: "# Funções Embutidas\n\n| Função | Descrição |\n|--------|-----------|\n| `SOLTA O GRITO(x)` | Imprime |\n| `FALA_BAIXO(x)` | console.warn |\n| `AGORA_VAI(url)` | HTTP GET |\n| `ESPERA_AI(ms)` | setTimeout |\n| `SORTEIA(min, max)` | Número aleatório |\n| `PARSEIA(json)` | JSON.parse |\n| `TAMANHO(x)` | length de array/string |\n| `OUVE_AQUI(chave)` | ENV variable |\n| `DIVIDE_TEXTO(s, sep)` | String split |\n| `JUNTAR(arr, sep)` | Array join |", order: 1 },
  { title: "WebAssembly", slug: "wasm", category: "avancado", body: "# WASM\n\n```bash\nxs build --wasm arquivo.xs -o saida.wasm\n```\n\nXanaScript pode compilar para WebAssembly, gerando binários `.wasm` com funções exportadas.", order: 1 },
];

const examples = [
  { title: "Olá Mundo", slug: "ola-mundo", code: "SOLTA O GRITO(\"Olá, mundo!\")", description: "Primeiro programa", category: "basico", order: 1 },
  { title: "Fibonacci", slug: "fibonacci", code: "CHAMA ESSE CARA fib(n) {\n  SE LIGA SO (n <= 1) { VOLTA n }\n  VOLTA fib(n - 1) + fib(n - 2)\n}\n\nSOLTA O GRITO(fib(10))", description: "Sequência de Fibonacci recursiva", category: "funcoes", order: 2 },
  { title: "CRUD com ORM", slug: "crud-orm", code: "TABELA Produto {\n  nome: TEXTO\n  preco: NUMERO\n}\n\nCRIA repo = CRIA Produto\nrepo.CRIAR({nome: \"Mouse\", preco: 120})\nrepo.CRIAR({nome: \"Teclado\", preco: 250})\nSOLTA O GRITO(repo.LISTA())", description: "CRUD automático com tabela ORM", category: "orm", order: 1 },
  { title: "Servidor HTTP", slug: "servidor-http", code: "CHAMA ESSE CARA handler(req, res) {\n  res.json({mensagem: \"Olá do XanaScript!\"})\n}\n\nCRIA SERVIDOR(3000, handler)\nSOLTA O GRITO(\"Servidor rodando :3000\")", description: "Servidor HTTP embutido", category: "avancado", order: 1 },
  { title: "Pattern Matching", slug: "pattern-matching", code: "CRIA describe = (n) => COMBINA (n) {\n  CASO 0 => \"zero\"\n  CASO 1 => \"um\"\n  CASO _ => \"muitos\"\n}\n\nSOLTA O GRITO(describe(0))\nSOLTA O GRITO(describe(1))\nSOLTA O GRITO(describe(42))", description: "Pattern matching com COMBINA", category: "controle", order: 1 },
  { title: "Async/Await", slug: "async-await", code: "CRIA run = ASSINCRONO () => {\n  TENTA {\n    CRIA res = AGORA VAI(\"https://jsonplaceholder.typicode.com/todos/1\")\n    CRIA data = PARSEIA(res)\n    ESPERA AI 1000\n    SOLTA O GRITO(data.title)\n  } PEGA (err) {\n    SOLTA O GRITO(\"Erro: \" + err)\n  }\n}\n\nESPERA AI run()", description: "Requisição HTTP assíncrona", category: "avancado", order: 2 },
];

const pages = [
  { key: "home", title: "Página Inicial", content: { hero: { title: "Programe em Português", subtitle: "XanaScript é uma linguagem de programação com sintaxe em português, ORM embutido e suporte a WebAssembly." } } },
  { key: "features", title: "Funcionalidades", content: { items: [{ title: "Sintaxe em Português", desc: "Código natural para falantes de português." }] } },
];

export async function seed() {
  console.log("[seed] Iniciando seed...");

  const docCount = await DocArticle.countDocuments();
  if (docCount === 0) {
    await DocArticle.insertMany(docs);
    console.log(`[seed] ${docs.length} artigos de documentação criados`);
  }

  const exCount = await PlaygroundExample.countDocuments();
  if (exCount === 0) {
    await PlaygroundExample.insertMany(examples);
    console.log(`[seed] ${examples.length} exemplos de playground criados`);
  }

  const pageCount = await PageContent.countDocuments();
  if (pageCount === 0) {
    await PageContent.insertMany(pages);
    console.log(`[seed] ${pages.length} páginas criadas`);
  }

  console.log("[seed] Seed concluído");
}

if (process.argv[1]?.includes("seed")) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => seed())
    .then(() => process.exit(0))
    .catch(e => { console.error(e); process.exit(1); });
}
