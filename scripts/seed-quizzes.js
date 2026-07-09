import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import ModuleQuiz from "../models/ModuleQuiz.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

async function seedQuizzes() {
  await mongoose.connect(MONGODB_URI);

  const MODULE_SIZE = 7;
  const questionsByModule = {
    0: [
      { question: "What type of tokens are multi-word keywords like SE LIGA SO treated as?", type: "text", answer: "atomic", points: 5 },
      { question: "Which directive loads files at compile time?", type: "text", answer: "INCLUI", points: 5 },
      { question: "What is the correct keyword to declare a constant variable?", type: "multiple", options: ["CONSTANTE", "VAR", "FIXA", "IMUTAVEL"], answer: "CONSTANTE", points: 5 },
      { question: "How do you define a function that returns a value?", type: "multiple", options: ["CRIA FUNCAO", "DEFINE", "CRIA FUNCAO RETORNA", "FUNCAO"], answer: "CRIA FUNCAO RETORNA", points: 10 },
      { question: "What built-in ORM command does XanaScript have for database operations?", type: "text", answer: "TABELA", points: 5 },
      { question: "The SE LIGA SO token is lexed as a single atomic token — true or false?", type: "multiple", options: ["true", "false"], answer: "true", points: 5 },
      { question: "Which keyword ends a conditional block?", type: "text", answer: "TCHAU", points: 5 },
      { question: "What is the output of: IMPRIMA 2 + 3 * 4", type: "text", answer: "14", points: 5 },
      { question: "How do you create a function with no return value?", type: "multiple", options: ["CRIA FUNCAO", "CRIA FUNCAO RETORNA", "FUNCAO VAZIA", "DEFINE"], answer: "CRIA FUNCAO", points: 5 },
      { question: "What keyword is used to define a class?", type: "text", answer: "CLASSE", points: 10 },
    ],
    1: [
      { question: "Which keyword starts a loop in XanaScript?", type: "text", answer: "REPETE", points: 5 },
      { question: "What does the loop modifier NA MORAL do when used after REPETE?", type: "multiple", options: ["Infinite loop", "Loop once", "Loop with step 1", "Break after first"], answer: "Infinite loop", points: 10 },
      { question: "How do you create an array?", type: "text", answer: "CRIA ARRAY", points: 5 },
      { question: "What keyword is used for equality comparison?", type: "multiple", options: ["IGUALZINHO", "=", "==", "==="], answer: "IGUALZINHO", points: 5 },
      { question: "How do you access an array element at index i?", type: "text", answer: "acessa", points: 5 },
      { question: "What is the boolean AND operator keyword in XanaScript?", type: "text", answer: "E", points: 5 },
      { question: "Which keyword handles pattern matching?", type: "text", answer: "COMBINA", points: 10 },
      { question: "The VAR keyword declares a mutable variable — true or false?", type: "multiple", options: ["true", "false"], answer: "true", points: 5 },
    ],
    2: [
      { question: "What function handles errors in XanaScript?", type: "text", answer: "TENTA", points: 5 },
      { question: "Which keyword catches an error?", type: "multiple", options: ["PEGA", "CAPTURA", "EXCECAO", "ERRO"], answer: "PEGA", points: 5 },
      { question: "What is the correct syntax to import another file at runtime?", type: "multiple", options: ["usa", "INCLUI", "IMPORTA", "IMPORT"], answer: "usa", points: 5 },
      { question: "What keyword starts a test block?", type: "text", answer: "TESTE", points: 5 },
      { question: "How do you assert a condition in a test?", type: "text", answer: "AFIRMA", points: 5 },
      { question: "Which keyword creates a macro?", type: "multiple", options: ["MACRO", "CRIA MACRO", "DEFINE MACRO", "MACRO CRIA"], answer: "CRIA MACRO", points: 10 },
      { question: "What is the keyword to return a value from a macro at compile time?", type: "text", answer: "RETORNA", points: 5 },
    ],
    3: [
      { question: "How do you create an HTTP server in XanaScript?", type: "text", answer: "CRIA SERVIDOR", points: 5 },
      { question: "What method is called to respond to a request?", type: "multiple", options: ["RESPONDE", "RESPONDA", "ENVIA", "RETORNA"], answer: "RESPONDE", points: 10 },
      { question: "Which keyword handles query parameters in a route?", type: "multiple", options: ["PARAMETRO", "PARAM", "QUERY", "RECEBE"], answer: "PARAMETRO", points: 5 },
      { question: "How do you set the response content type?", type: "text", answer: "TIPO", points: 5 },
      { question: "What method serves a static file?", type: "multiple", options: ["ARQUIVO", "SERVE", "ESTATICO", "STATIC"], answer: "ARQUIVO", points: 5 },
      { question: "How do you redirect a request?", type: "text", answer: "REDIRECIONA", points: 5 },
    ],
    4: [
      { question: "What is the keyword to create a database table?", type: "text", answer: "TABELA", points: 5 },
      { question: "How do you query all rows from a table?", type: "multiple", options: ["BUSCA TUDO", "TUDO", "PEGA TUDO", "SELECIONA"], answer: "PEGA TUDO", points: 10 },
      { question: "What keyword filters a query by condition?", type: "multiple", options: ["FILTRA", "ONDE", "WHERE", "CONDICAO"], answer: "ONDE", points: 5 },
      { question: "How do you insert a new record?", type: "text", answer: "INSERE", points: 5 },
      { question: "What keyword updates existing records?", type: "text", answer: "ATUALIZA", points: 5 },
      { question: "How do you delete records?", type: "text", answer: "DELETA", points: 5 },
    ],
    5: [
      { question: "How do you define inheritance between classes?", type: "multiple", options: ["HERDA", "EXTENDS", "ESTENDE", "HERANCA"], answer: "HERDA", points: 10 },
      { question: "What keyword calls the parent class constructor?", type: "multiple", options: ["SUPER", "PAI", "CHAMA PAI", "SUPERIOR"], answer: "CHAMA PAI", points: 10 },
      { question: "How do you invoke a function?", type: "text", answer: "CHAMA", points: 5 },
      { question: "What is the keyword for creating a new class instance?", type: "multiple", options: ["NOVO", "INSTANCIA", "CRIA INSTANCIA", "NEW"], answer: "NOVO", points: 5 },
      { question: "How do you declare a method inside a class?", type: "text", answer: "METODO", points: 5 },
      { question: "What keyword marks a method or property as private?", type: "multiple", options: ["PRIVADO", "PRIVADA", "PRIVATE", "SEGREDO"], answer: "PRIVADO", points: 5 },
      { question: "How do you call a method on an object?", type: "text", answer: "CHAMA", points: 5 },
    ],
    6: [
      { question: "What does the compiler do with constant expressions like 2 + 3 * 2?", type: "multiple", options: ["Constant folding", "Inlining", "Loop unrolling", "Dead code elimination"], answer: "Constant folding", points: 10 },
      { question: "What optimization technique unrolls REPETE loops with small fixed bounds?", type: "text", answer: "loop unrolling", points: 5 },
      { question: "Which keyword enables compile-time macro expansion?", type: "multiple", options: ["CRIA MACRO", "DEFINE", "MACRO", "INCLUI"], answer: "CRIA MACRO", points: 10 },
      { question: "What is the native binary target format for XanaScript?", type: "text", answer: "WebAssembly", points: 5 },
      { question: "How do you output a WebAssembly file from the compiler?", type: "text", answer: "GERA", points: 5 },
      { question: "What does the LSP server provide?", type: "multiple", options: ["Completions, hover, diagnostics", "Code formatting only", "Syntax highlighting", "Debugging"], answer: "Completions, hover, diagnostics", points: 5 },
    ],
    7: [
      { question: "What is the correct syntax for a template string?", type: "multiple", options: ["`texto ${expr}`", "'texto ${expr}'", '"texto ${expr}"', "template(expr)"], answer: "`texto ${expr}`", points: 5 },
      { question: "How do you create a range from 1 to 10?", type: "text", answer: "1..10", points: 5 },
      { question: "What keyword extracts values from an array into variables?", type: "multiple", options: ["DESTRUTURA", "EXTRAI", "DESESTRUTURA", "ABRE"], answer: "DESTRUTURA", points: 10 },
      { question: "What is the null-coalescing operator in XanaScript?", type: "multiple", options: ["??", "OU", "OU ENTAO", "OU_ENTAO"], answer: "OU ENTAO", points: 5 },
      { question: "How do you declare an optional parameter with a default value?", type: "text", answer: "PADRAO", points: 5 },
      { question: "What keyword handles async/await style operations?", type: "text", answer: "AGUARDA", points: 5 },
    ],
    8: [
      { question: "How do you compile and run a .xs file from the CLI?", type: "multiple", options: ["xs run arquivo.xs", "xs compile arquivo.xs", "xs build arquivo.xs", "xs exec arquivo.xs"], answer: "xs run arquivo.xs", points: 5 },
      { question: "What command installs XanaScript packages?", type: "text", answer: "xs install", points: 5 },
      { question: "What is the package registry domain?", type: "text", answer: "xanascript.xyz", points: 5 },
      { question: "How do you list installed packages?", type: "multiple", options: ["xs list", "xs packages", "ls packages", "xs ls"], answer: "xs list", points: 5 },
      { question: "What command runs all tests in the current project?", type: "multiple", options: ["xs test", "xs run test", "xs test all", "teste"], answer: "xs test", points: 5 },
      { question: "How do you format a XanaScript source file?", type: "text", answer: "xs format", points: 5 },
    ],
  };

  const moduleCount = Object.keys(questionsByModule).length;

  // Seed pt course
  const coursePt = await Course.findOne({ slug: "curso-completo-xanascript" }).lean();
  if (coursePt) {
    const ptQuestionsByModule = {
      0: [
        { question: "Como são tratadas palavras-chave multipalavra como SE LIGA SO?", type: "text", answer: "átomos", points: 5 },
        { question: "Qual diretiva carrega arquivos em tempo de compilação?", type: "text", answer: "INCLUI", points: 5 },
        { question: "Qual a palavra-chave correta para declarar uma constante?", type: "multiple", options: ["CONSTANTE", "VAR", "FIXA", "IMUTAVEL"], answer: "CONSTANTE", points: 5 },
        { question: "Como definir uma função que retorna um valor?", type: "multiple", options: ["CRIA FUNCAO", "DEFINE", "CRIA FUNCAO RETORNA", "FUNCAO"], answer: "CRIA FUNCAO RETORNA", points: 10 },
        { question: "Qual comando ORM nativo o XanaScript fornece para banco de dados?", type: "text", answer: "TABELA", points: 5 },
        { question: "O token SE LIGA SO é tratado como um token único — verdadeiro ou falso?", type: "multiple", options: ["verdadeiro", "falso"], answer: "verdadeiro", points: 5 },
        { question: "Qual palavra-chave encerra um bloco condicional?", type: "text", answer: "TCHAU", points: 5 },
        { question: "Qual a saída de: IMPRIMA 2 + 3 * 2", type: "text", answer: "14", points: 5 },
        { question: "Como criar uma função sem retorno?", type: "multiple", options: ["CRIA FUNCAO", "CRIA FUNCAO RETORNA", "FUNCAO VAZIA", "DEFINE"], answer: "CRIA FUNCAO", points: 5 },
        { question: "Qual palavra-chave define uma classe?", type: "text", answer: "CLASSE", points: 10 },
      ],
      1: [
        { question: "Qual palavra-chave inicia um loop em XanaScript?", type: "text", answer: "REPETE", points: 5 },
        { question: "O que o modificador NA MORAL faz após REPETE?", type: "multiple", options: ["Loop infinito", "Loop único", "Step 1", "Break após primeira iteração"], answer: "Loop infinito", points: 10 },
        { question: "Como criar um array?", type: "text", answer: "CRIA ARRAY", points: 5 },
        { question: "Qual palavra-chave é usada para comparação de igualdade?", type: "multiple", options: ["IGUALZINHO", "=", "==", "==="], answer: "IGUALZINHO", points: 5 },
        { question: "Como acessar um elemento do array no índice i?", type: "text", answer: "acessa", points: 5 },
        { question: "Qual o operador AND booleano em XanaScript?", type: "text", answer: "E", points: 5 },
        { question: "Qual palavra-chave faz pattern matching?", type: "text", answer: "COMBINA", points: 10 },
        { question: "VAR declara uma variável mutável — verdadeiro ou falso?", type: "multiple", options: ["verdadeiro", "falso"], answer: "verdadeiro", points: 5 },
      ],
      2: [
        { question: "Qual função lida com erros em XanaScript?", type: "text", answer: "TENTA", points: 5 },
        { question: "Qual palavra-chave captura um erro?", type: "multiple", options: ["PEGA", "CAPTURA", "EXCECAO", "ERRO"], answer: "PEGA", points: 5 },
        { question: "Como importar outro módulo em tempo de execução?", type: "multiple", options: ["usa", "INCLUI", "IMPORTA", "IMPORT"], answer: "usa", points: 5 },
        { question: "Qual palavra-chave inicia um teste?", type: "text", answer: "TESTE", points: 5 },
        { question: "Como afirmar uma condição em um teste?", type: "text", answer: "AFIRMA", points: 5 },
        { question: "Qual palavra-chave cria uma macro?", type: "multiple", options: ["MACRO", "CRIA MACRO", "DEFINE MACRO", "MACRO CRIA"], answer: "CRIA MACRO", points: 10 },
        { question: "Qual a palavra-chave para retornar valor de macro em tempo de compilação?", type: "text", answer: "RETORNA", points: 5 },
      ],
      3: [
        { question: "Como criar um servidor HTTP em XanaScript?", type: "text", answer: "CRIA SERVIDOR", points: 5 },
        { question: "Qual método é chamado para responder a uma requisição?", type: "multiple", options: ["RESPONDE", "RESPONDA", "ENVIA", "RETORNA"], answer: "RESPONDE", points: 10 },
        { question: "Qual palavra-chave lida com parâmetros de query?", type: "multiple", options: ["PARAMETRO", "PARAM", "QUERY", "RECEBE"], answer: "PARAMETRO", points: 5 },
        { question: "Como definir o content-type da resposta?", type: "text", answer: "TIPO", points: 5 },
        { question: "Qual método serve arquivo estático?", type: "multiple", options: ["ARQUIVO", "SILVE", "ESTATICO", "STATIC"], answer: "ARQUIVO", points: 5 },
        { question: "Como redirecionar uma requisição?", type: "text", answer: "REDIRECIONA", points: 5 },
      ],
      4: [
        { question: "Qual palavra-chave cria uma tabela no banco?", type: "text", answer: "TABELA", points: 5 },
        { question: "Como consultar todas as linhas de uma tabela?", type: "multiple", options: ["BUSCA TUDO", "TUDO", "PEGA TUDO", "SELECIONA"], answer: "PEGA TUDO", points: 10 },
        { question: "Qual palavra-chave filtra resultados por condição?", type: "multiple", options: ["FILTRA", "ONDE", "WHERE", "CONDICAO"], answer: "ONDE", points: 5 },
        { question: "Como inserir um novo registro?", type: "text", answer: "INSERE", points: 5 },
        { question: "Qual palavra-chave atualiza registros existentes?", type: "text", answer: "ATUALIZA", points: 5 },
        { question: "Como deletar registros?", type: "text", answer: "DELETA", points: 5 },
      ],
      5: [
        { question: "Como definir herança entre classes?", type: "multiple", options: ["HERDA", "EXTENDS", "ESTENDE", "HERANCA"], answer: "HERDA", points: 10 },
        { question: "Qual palavra-chave chama o construtor da classe pai?", type: "multiple", options: ["SUPER", "PAI", "CHAMA PAI", "SUPERIOR"], answer: "CHAMA PAI", points: 10 },
        { question: "Como invocar uma função?", type: "multiple", options: ["CHAMA", "INVOCA", "EXECUTA", "RODA"], answer: "CHAMA", points: 5 },
        { question: "Qual palavra-chave cria uma nova instância?", type: "multiple", options: ["NOVO", "INSTANCIA", "CRIA INSTANCIA", "NEW"], answer: "NOVO", points: 5 },
        { question: "Como declarar um método dentro de uma classe?", type: "text", answer: "METODO", points: 5 },
        { question: "Qual palavra-chave marca propriedade/método como privado?", type: "multiple", options: ["PRIVADO", "PRIVADA", "PRIVATE", "SEGREDO"], answer: "PRIVADO", points: 5 },
        { question: "Como chamar um método em um objeto?", type: "text", answer: "CHAMA", points: 5 },
      ],
      6: [
        { question: "O que o compilador faz com expressões constantes como 2 + 3 * 2?", type: "multiple", options: ["Constant folding", "Inlining", "Loop unrolling", "Dead code elimination"], answer: "Constant folding", points: 10 },
        { question: "Qual otimização desenrola loops pequenos?", type: "text", answer: "loop unrolling", points: 5 },
        { question: "Qual palavra-chave faz expansão de macro em tempo de compilação?", type: "multiple", options: ["CRIA MACRO", "DEFINE", "MACRO", "INCLUI"], answer: "CRIA MACRO", points: 10 },
        { question: "Qual o formato binário nativo do XanaScript?", type: "text", answer: "WebAssembly", points: 5 },
        { question: "Como gerar um arquivo WebAssembly pelo compilador?", type: "text", answer: "GERA", points: 5 },
        { question: "O que o servidor LSP fornece?", type: "multiple", options: ["Completions, hover, diagnósticos", "Formatação apenas", "Syntax highlight apenas", "Debug"], answer: "Completions, hover, diagnósticos", points: 5 },
      ],
      7: [
        { question: "Qual a sintaxe correta para template string?", type: "multiple", options: ["`texto ${expr}`", "'texto ${expr}'", '"texto ${expr}"', "texto(expr)"], answer: "`texto ${expr}`", points: 5 },
        { question: "Como definir um range de 1 a 10?", type: "text", answer: "1..10", points: 5 },
        { question: "Qual palavra-chave extrai valores de array em variáveis?", type: "multiple", options: ["DESTRUTURA", "EXTRAI", "DESESTRUTURA", "ABRE"], answer: "DESTRUTURA", points: 10 },
        { question: "Qual o operador null-coalescing?", type: "multiple", options: ["??", "OU", "OU ENTAO", "SE_ENTAO"], answer: "OU ENTAO", points: 5 },
        { question: "Como declarar parâmetro opcional com valor padrão?", type: "text", answer: "PADRAO", points: 5 },
        { question: "Qual palavra-chave lida com async/await?", type: "text", answer: "AGUARDA", points: 5 },
      ],
      8: [
        { question: "Como compilar e executar um .xs pelo CLI?", type: "multiple", options: ["xs run arquivo.xs", "xs compile arquivo.xs", "xs build arquivo.xs", "xs exec arquivo.xs"], answer: "xs run arquivo.xs", points: 5 },
        { question: "Qual comando instala pacotes XanaScript?", type: "text", answer: "xs install", points: 5 },
        { question: "Qual a URL do registro de pacotes?", type: "text", answer: "xanascript.xyz", points: 5 },
        { question: "Como listar pacotes instalados?", type: "multiple", options: ["xs list", "xs packages", "ls packages", "xs ls"], answer: "xs list", points: 5 },
        { question: "Qual comando executa todos os testes?", type: "multiple", options: ["xs test", "xs run test", "xs test all", "teste"], answer: "xs test", points: 5 },
        { question: "Como formatar um arquivo XanaScript?", type: "text", answer: "xs format", points: 5 },
      ],
    };

    const totalLessons = coursePt.lessons.length;
    for (let modIdx = 0; modIdx < Math.ceil(totalLessons / MODULE_SIZE); modIdx++) {
      const start = modIdx * MODULE_SIZE;
      const end = Math.min((modIdx + 1) * MODULE_SIZE, totalLessons);
      const lessonSlugs = coursePt.lessons.slice(start, end).map(l => l.slug);
      const questions = ptQuestionsByModule[modIdx] || [
        { question: `Questão de revisão do módulo ${modIdx + 1}`, type: "text", answer: "XanaScript", points: 10 },
      ];
      await ModuleQuiz.findOneAndUpdate(
        { courseId: coursePt._id, moduleIndex: modIdx },
        { courseId: coursePt._id, moduleIndex: modIdx, title: `Módulo ${modIdx + 1} - Quiz`, questions, lessonSlugs, passingScore: 70 },
        { upsert: true }
      );
      console.log(`Quiz criado para course pt módulo ${modIdx + 1} (aulas ${start + 1}-${end})`);
    }
  }

  await mongoose.disconnect();
  console.log("Seed quizzes concluído!");
}

seedQuizzes().catch(e => { console.error("Erro:", e.message); process.exit(1); });