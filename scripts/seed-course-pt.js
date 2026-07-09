import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

const lessons = [
  {
    slug: "o-que-e-xanascript",
    title: "O que é XanaScript?",
    order: 1,
    points: 5,
    bodyMd: `XanaScript é uma **linguagem de programação completa** projetada inteiramente em português brasileiro. Diferente de transpiladores ou wrappers, cada palavra-chave, operador e construção sintática é nativa em português — analisada, verificada por tipos, compilada e executada por um toolchain personalizado escrito em JavaScript.

## Principais Recursos

- **Palavras-chave multipalavra** como \`SE LIGA SO\`, \`CHAMA ESSE CARA\`, \`REPETE NA MORAL\` — tokenizadas como átomos
- **ORM nativo** (\`TABELA\`) — sintaxe de primeira classe para CRUD em banco de dados
- **Compilador otimizador** — dobramento de constantes, desenrolamento de loops, inferência de inteiros
- **WebAssembly nativo** — emissão direta de \`.wasm\`, sem Emscripten
- **Macros em tempo de compilação** — substituição em nível de AST, custo zero em execução
- **Servidor LSP** — completações, hover, diagnósticos, ir para definição
- **Runner de testes** — \`TESTE\` / \`AFIRMA\` como nós AST nativos

## A Filosofia

O código deve ser lido como se fosse escrito para humanos. Cada construção em XanaScript usa palavras-chave claras e intuitivas em português para que a intenção seja óbvia à primeira vista.`,
    challenges: [
      { question: "Como são tratadas palavras-chave multipalavra como SE LIGA SO?", answer: "átomos", points: 3 },
      { question: "O XanaScript usa uma abordagem de transpilador ou compilador nativo?", answer: "compilador nativo", points: 3 },
      { question: "Qual é a filosofia por trás do XanaScript?", answer: "o código deve ser lido como se fosse escrito para humanos", points: 5 },
    ],
  },
  {
    slug: "instalacao-e-configuracao",
    title: "Instalação e Configuração",
    order: 2,
    points: 5,
    bodyMd: `O XanaScript pode ser instalado de duas formas:

## Via npm (Multiplataforma)

\`\`\`bash
npm install -g xanascript
\`\`\`

Isso requer Node.js 18+ e funciona no Windows, Linux e macOS.

## Binário Nativo (Independente)

\`\`\`bash
curl -fsSL https://xanascript.xyz/install.sh | bash
\`\`\`

Não requer Node.js — um único executável com zero dependências.

## Verificar Instalação

\`\`\`bash
xs --version
\`\`\`

## Extensão VS Code

Instale \`vscode-xs\` da marketplace para realce de sintaxe, snippets e integração LSP.`,
    challenges: [
      { question: "Qual é o comando npm para instalar o XanaScript globalmente?", answer: "npm install -g xanascript", points: 3 },
      { question: "Qual comando verifica se o XanaScript está instalado?", answer: "xs --version", points: 3 },
      { question: "Qual extensão VS Code fornece suporte ao XanaScript?", answer: "vscode-xs", points: 3 },
    ],
  },
  {
    slug: "seu-primeiro-programa",
    title: "Seu Primeiro Programa",
    order: 3,
    points: 10,
    bodyMd: `Vamos escrever o clássico "Olá, Mundo!" em XanaScript:

\`\`\`xs
SOLTA O GRITO("Hello, World!")
\`\`\`

Crie um arquivo chamado \`hello.xs\` e execute:

\`\`\`bash
xs run hello.xs
\`\`\`

## Detalhando

- \`SOLTA O GRITO\` é a função de impressão — literalmente "solte o grito"
- Parênteses \`()\` envolvem o argumento
- Aspas duplas \`"..."\` delimitam uma string

## Variáveis

\`\`\`xs
CRIA nome = "Maria"
CRIA idade = 25
SOLTA O GRITO("Olá, " + nome + "! Você tem " + idade + " anos.")
\`\`\`

- \`CRIA\` declara uma variável ("create")
- \`+\` concatena strings e números
- Não são necessárias anotações de tipo — os tipos são inferidos

## Comments

\`\`\`xs
// Isto é um comentário de linha única

/* Isto é um
   comentário multilinha */
\`\`\``,
    challenges: [
      { question: "Qual palavra-chave declara uma variável em XanaScript?", answer: "CRIA", points: 3 },
      { question: "Qual função imprime saída no console?", answer: "SOLTA O GRITO", points: 3 },
      { question: "Qual comando executa um arquivo .xs?", answer: "xs run", points: 3 },
    ],
  },
  {
    slug: "variaveis-com-cria",
    title: "Variáveis com CRIA",
    order: 4,
    points: 10,
    bodyMd: `\`CRIA\` ("create") declara uma variável mutável em XanaScript:

\`\`\`xs
CRIA nome = "João"
CRIA idade = 25
CRIA preco = 49.99
\`\`\`

## Reatribuição

Variáveis declaradas com \`CRIA\` podem ser reatribuídas:

\`\`\`xs
CRIA contador = 0
contador = 1
contador = contador + 5
SOLTA O GRITO(contador)  // 6
\`\`\`

## Múltiplas Variáveis

\`\`\`xs
CRIA a = 1, b = 2, c = 3
SOLTA O GRITO(a + b + c)  // 6
\`\`\`

## Regras de Nomenclatura

- Deve começar com uma letra ou sublinhado
- Pode conter letras, números e sublinhados
- Difere maiúsculas de minúsculas: \`nome\` != \`Nome\`
- Palavras-chave não podem ser usadas como nomes de variáveis

## Escopo

\`CRIA\` tem escopo de bloco. Variáveis declaradas dentro de um bloco não são acessíveis fora dele.`,
    challenges: [
      { question: "Qual palavra-chave declara uma variável mutável?", answer: "CRIA", points: 3 },
      { question: "Uma variável CRIA pode ser reatribuída?", answer: "sim", points: 3 },
      { question: "Variáveis CRIA têm escopo de bloco ou de função?", answer: "escopo de bloco", points: 5 },
    ],
  },
  {
    slug: "comentarios",
    title: "Comentários",
    order: 5,
    points: 5,
    bodyMd: `Comentários são ignorados pelo compilador e existem apenas para humanos que leem o código.

## Comentários de Linha Única

Use \`//\` para comentários de linha única:

\`\`\`xs
// Isto é um comentário de linha única
CRIA x = 10  // comentário inline

// Comentários podem abranger várias linhas
// se cada linha começar com //
\`\`\`

## Comentários Multilinha

Use \`/* */\` para comentários em bloco:

\`\`\`xs
/*
 * Isto é um comentário multilinha
 * Útil para cabeçalhos de documentação
 */
CRIA y = 20
\`\`\`

## Comentários de Documentação

Use comentários multilinha para documentação de funções explicando o que a função faz. Bons comentários explicam "por que", não "o que".`,
    challenges: [
      { question: "Qual símbolo inicia um comentário de linha única em XanaScript?", answer: "//", points: 3 },
      { question: "Quais delimitadores envolvem um comentário multilinha?", answer: "/* */", points: 3 },
    ],
  },
  {
    slug: "inferencia-de-tipos",
    title: "Inferência de Tipos",
    order: 6,
    points: 10,
    bodyMd: `XanaScript detecta automaticamente o tipo de uma variável com base em seu valor.

## Como a Inferência Funciona

\`\`\`xs
CRIA texto = "Olá"            // inferido como TEXTO
CRIA numero = 42              // inferido como NUMERO
CRIA booleano = VERDADEIRO    // inferido como BOOLEANO
CRIA data = DATA("2026-01-01") // inferido como DATA
CRIA qualquer = null          // inferido como QUALQUER
\`\`\`

## Tipos Estritos

Uma vez que uma variável é inferida como um tipo específico, a reatribuição deve corresponder:

\`\`\`xs
CRIA nome = "Ana"      // TEXTO
// nome = 42           // Erro! Não é possível atribuir NUMERO a TEXTO
\`\`\`

## QUALQUER permite mudanças

Com QUALQUER, o tipo pode mudar em tempo de execução.

## Anotações Opcionais

Para clareza, você pode anotar tipos: \`CRIA nome: TEXTO = "João"\`.`,
    challenges: [
      { question: "Qual tipo é inferido para \"CRIA x = 42\"?", answer: "NUMERO", points: 3 },
      { question: "Você pode atribuir um NUMERO a uma variável TEXTO?", answer: "não", points: 3 },
      { question: "Qual tipo permite mudanças dinâmicas?", answer: "QUALQUER", points: 5 },
    ],
  },
  {
    slug: "strings-em-detalhe",
    title: "Strings em Detalhe",
    order: 7,
    points: 10,
    bodyMd: `Strings (\`TEXTO\`) são codificadas em UTF-8.

## Criação de Strings

\`\`\`xs
CRIA simples = "Hello"
CRIA com_aspas = 'Aspas simples também funcionam'
\`\`\`

## Concatenação

\`\`\`xs
CRIA primeiro = "João"
CRIA ultimo = "Silva"
CRIA completo = primeiro + " " + ultimo
SOLTA O GRITO(completo)  // João Silva
\`\`\`

## Métodos de String

\`\`\`xs
CRIA texto = "  XanaScript é Incrível!  "
tamanho(texto)    // length
maiusculo(texto)  // uppercase
minusculo(texto)  // lowercase
aparado(texto)    // trim
substituir(texto, "é", "eh")  // replace
\`\`\`

## Interpolação

Use \`+\` para interpolar valores em strings. Strings em XanaScript são imutáveis — métodos retornam novas strings.`,
    challenges: [
      { question: "Qual operador concatena strings?", answer: "+", points: 3 },
      { question: "Qual método retorna o tamanho da string?", answer: "tamanho", points: 3 },
      { question: "Qual método converte uma string para maiúsculas?", answer: "maiusculo", points: 3 },
    ],
  },
  {
    slug: "numeros-em-detalhe",
    title: "Números em Detalhe",
    order: 8,
    points: 10,
    bodyMd: `Números (\`NUMERO\`) cobrem tanto inteiros quanto ponto flutuante. Valores são floats de 64 bits (IEEE 754).

## Literais Inteiros

\`\`\`xs
CRIA a = 42
CRIA b = -17
CRIA c = 0
CRIA d = 1_000_000  // sublinhados para legibilidade
\`\`\`

## Ponto Flutuante

\`\`\`xs
CRIA pi = 3.14159
CRIA pequeno = 0.001
CRIA grande = 1.5e6  // notação científica
\`\`\`

## Operadores Aritméticos

\`\`\`xs
+   -   *   /   %   **
\`\`\`

## Incremento / Decremento

\`\`\`xs
CRIA c = 0
c++  // 1
c--  // 0
\`\`\`

## Atribuição Composta

\`\`\`xs
x += 5   // x = x + 5
x -= 3   // x = x - 3
x *= 2   // x = x * 2
x /= 4   // x = x / 4
\`\`\``,
    challenges: [
      { question: "Qual operador calcula o resto da divisão?", answer: "%", points: 3 },
      { question: "Qual é o operador de exponenciação?", answer: "**", points: 3 },
      { question: "O que x += 5 faz?", answer: "adiciona 5 a x", points: 3 },
    ],
  },
  {
    slug: "booleanos",
    title: "Booleanos",
    order: 9,
    points: 5,
    bodyMd: `Booleanos (\`BOOLEANO\`) representam valores verdadeiros: \`VERDADEIRO\` (true) e \`FALSO\` (false).

## Operadores Lógicos

Palavras em português para operações lógicas:

\`\`\`xs
CRIA e = a E b     // AND
CRIA ou = a OU b   // OR
CRIA nao = NAO a   // NOT
\`\`\`

## Operadores de Comparação

\`\`\`xs
==   !=   >   <   >=   <=
\`\`\`

## Truthy e Falsy

Valores falsy: \`FALSO\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Todo o resto é truthy.

\`\`\`xs
SE LIGA SO ("") {
  // não executa
} SENAO {
  SOLTA O GRITO("Falsy!")
}
\`\`\``,
    challenges: [
      { question: "Qual é a palavra-chave para booleano verdadeiro?", answer: "VERDADEIRO", points: 3 },
      { question: "Qual palavra-chave representa AND lógico?", answer: "E", points: 3 },
      { question: "Qual palavra-chave representa NOT lógico?", answer: "NAO", points: 3 },
    ],
  },
  {
    slug: "nulo-e-indefinido",
    title: "Nulo e Indefinido",
    order: 10,
    points: 5,
    bodyMd: `Dois valores especiais para "sem valor".

## Null

\`null\` representa uma ausência intencional de valor:

\`\`\`xs
CRIA resultado = null
SE LIGA SO (resultado == null) {
  SOLTA O GRITO("Vazio")
}
\`\`\`

## Undefined

\`undefined\` significa que uma variável não tem valor atribuído:

\`\`\`xs
CRIA x  // undefined
\`\`\`

## Coalescência Nula

\`??\` fornece um valor padrão quando o valor é nulo ou undefined:

\`\`\`xs
CRIA nome = usuario ?? "Convidado"
\`\`\`

| Valor | Significado |
|-------|-------------|
| null | Vazio intencional |
| undefined | Não inicializado |`,
    challenges: [
      { question: "Qual valor representa um valor vazio intencional?", answer: "null", points: 3 },
      { question: "Qual operador fornece um padrão para null/undefined?", answer: "??", points: 3 },
      { question: "Diferença entre null e undefined?", answer: "null é intencional, undefined é não inicializado", points: 5 },
    ],
  },
  {
    slug: "conversao-de-tipos",
    title: "Conversão de Tipos",
    order: 11,
    points: 10,
    bodyMd: `Funções nativas para converter entre tipos.

## Para Número

\`\`\`xs
CRIA n = NUMERO("42")      // 42
CRIA pi = NUMERO("3.14")   // 3.14
CRIA falha = NUMERO("x")   // 0 em caso de falha
\`\`\`

## Para String

\`\`\`xs
CRIA s = TEXTO(42)             // "42"
CRIA b = TEXTO(VERDADEIRO)     // "VERDADEIRO"
\`\`\`

## Para Booleano

\`\`\`xs
CRIA b1 = BOOLEANO("texto")   // VERDADEIRO
CRIA b2 = BOOLEANO("")        // FALSO
CRIA b3 = BOOLEANO(42)        // VERDADEIRO
CRIA b4 = BOOLEANO(0)         // FALSO
\`\`\`

## Conversão Implícita

Strings numéricas são convertidas implicitamente em contextos aritméticos.`,
    challenges: [
      { question: "Qual função converte um valor para número?", answer: "NUMERO()", points: 3 },
      { question: "Qual função converte um valor para string?", answer: "TEXTO()", points: 3 },
      { question: "O que BOOLEANO(0) retorna?", answer: "FALSO", points: 3 },
    ],
  },
  {
    slug: "operadores",
    title: "Operadores",
    order: 12,
    points: 10,
    bodyMd: `Um conjunto completo de operadores para aritmética, comparação, lógica e atribuição.

## Aritméticos

\`\`\`xs
+   -   *   /   %   **
\`\`\`

## Comparação

\`\`\`xs
==   !=   >   <   >=   <=
\`\`\`

## Lógicos

\`\`\`xs
E   OU   NAO   !
\`\`\`

## Atribuição

\`\`\`xs
=   +=   -=   *=   /=   %=
\`\`\`

## Coalescência Nula

\`??\` retorna o lado esquerdo se não for null/undefined, caso contrário o lado direito.

## Unários

\`\`\`xs
-x   +x   !x   x++   x--
\`\`\``,
    challenges: [
      { question: "Qual é o operador de módulo?", answer: "%", points: 3 },
      { question: "Quais três palavras em português são usadas para operadores lógicos?", answer: "E OU NAO", points: 3 },
      { question: "O que \"x ?? y\" faz?", answer: "retorna x se x não for null/undefined, senão y", points: 5 },
    ],
  },
  {
    slug: "precedencia-de-operadores",
    title: "Precedência de Operadores",
    order: 13,
    points: 5,
    bodyMd: `Determina a ordem de avaliação em expressões (da maior para a menor):

| Nível | Operadores |
|-------|------------|
| 1 | \`()\` agrupamento |
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

## Exemplos

\`\`\`xs
2 + 3 * 4      // 14 (não 20)
(2 + 3) * 4    // 20
VERDADEIRO OU FALSO E FALSO  // VERDADEIRO
2 ** 3 ** 2    // 512 (2 ** 9)
\`\`\`

Use parênteses para esclarecer a intenção.`,
    challenges: [
      { question: "Qual é o resultado de \"2 + 3 * 4\"?", answer: "14", points: 3 },
      { question: "Qual tem maior precedência: E ou OU?", answer: "E", points: 3 },
    ],
  },
  {
    slug: "se-liga-so",
    title: "SE LIGA SO (If Statements)",
    order: 14,
    points: 10,
    bodyMd: `\`SE LIGA SO\` ("preste atenção") é a instrução \`if\` do XanaScript.

## Sintaxe Básica

\`\`\`xs
SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior de idade")
}
\`\`\`

## Condições Compostas

\`\`\`xs
SE LIGA SO (nota >= 70 E presenca >= 0.75) {
  SOLTA O GRITO("Aprovado")
}
\`\`\`

## Aninhadas

\`\`\`xs
SE LIGA SO (logado) {
  SE LIGA SO (admin) {
    SOLTA O GRITO("Painel admin")
  }
}
\`\`\`

Sempre use chaves mesmo para instruções únicas.`,
    challenges: [
      { question: "Qual palavra-chave inicia um if em XanaScript?", answer: "SE LIGA SO", points: 3 },
      { question: "A condição deve estar entre parênteses?", answer: "sim", points: 3 },
    ],
  },
  {
    slug: "senao",
    title: "SENAO (Else Clauses)",
    order: 15,
    points: 10,
    bodyMd: `\`SENAO\` ("senão") fornece o ramo alternativo.

## Sintaxe Básica

\`\`\`xs
SE LIGA SO (idade >= 18) {
  SOLTA O GRITO("Maior")
} SENAO {
  SOLTA O GRITO("Menor")
}
\`\`\`

## Padrão de Guarda

\`\`\`xs
CHAMA ESSE CARA dividir(a, b) {
  SE LIGA SO (b == 0) {
    VOLTA null
  } SENAO {
    VOLTA a / b
  }
}
\`\`\`

O ramo \`SENAO\` executa apenas quando a condição é falsa.`,
    challenges: [
      { question: "Qual palavra-chave representa else em XanaScript?", answer: "SENAO", points: 3 },
      { question: "Quando o ramo SENAO executa?", answer: "quando a condição if é falsa", points: 3 },
    ],
  },
  {
    slug: "senao-se",
    title: "SENAO SE (Else If Chains)",
    order: 16,
    points: 10,
    bodyMd: `\`SENAO SE\` ("senão se") encadeia múltiplas condições.

## Exemplo de Notas

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

## Exemplo de Imposto

\`\`\`xs
SE LIGA SO (renda <= 2000) {
  "Isento"
} SENAO SE (renda <= 5000 E dependentes > 1) {
  "Taxa reduzida"
} SENAO {
  "Taxa normal"
}
\`\`\`

Condições são avaliadas de cima para baixo. A primeira correspondente executa.`,
    challenges: [
      { question: "Qual palavra-chave inicia um else-if?", answer: "SENAO SE", points: 3 },
      { question: "Quantos ramos executam em uma cadeia if-else?", answer: "um", points: 3 },
      { question: "O ramo SENAO final é obrigatório?", answer: "não", points: 3 },
    ],
  },
  {
    slug: "condicionais-aninhadas",
    title: "Condicionais Aninhadas",
    order: 17,
    points: 10,
    bodyMd: `Coloque \`SE LIGA SO\` dentro de outros blocos \`SE LIGA SO\`.

## Exemplo

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

## Evite Aninhamento Profundo

Use retornos antecipados para achatar:

\`\`\`xs
SE LIGA SO (idade < 18) { VOLTA FALSO }
SE LIGA SO (!carteira) { VOLTA FALSO }
VOLTA VERDADEIRO
\`\`\`

Mantenha o aninhamento em 3 níveis ou menos.`,
    challenges: [
      { question: "Qual técnica evita aninhamento profundo?", answer: "retornos antecipados", points: 3 },
      { question: "Quantos níveis de aninhamento são recomendados no máximo?", answer: "3", points: 5 },
    ],
  },
  {
    slug: "expressoes-ternarias",
    title: "Expressões Ternárias",
    order: 18,
    points: 10,
    bodyMd: `Condicional inline usando \`? :\`.

## Sintaxe

\`\`\`xs
condicao ? valor_se_verdadeiro : valor_se_falso
\`\`\`

## Exemplos

\`\`\`xs
CRIA status = (idade >= 18) ? "Adulto" : "Menor"
CRIA taxa = (renda > 5000) ? 0.3 : 0.15
\`\`\`

## Ternário Encadeado

\`\`\`xs
CRIA nota = (n >= 90) ? "A" :
            (n >= 80) ? "B" :
            (n >= 70) ? "C" : "F"
\`\`\`

Ternário é uma **expressão** (retorna valor). If/else é uma **instrução**.

Use para escolhas binárias simples. Evite encadeamento profundo.`,
    challenges: [
      { question: "Qual operador cria uma expressão condicional?", answer: "? :", points: 3 },
      { question: "Ternário é expressão ou instrução?", answer: "expressão", points: 5 },
    ],
  },
  {
    slug: "combina-basico",
    title: "COMBINA Básico (Switch/Match)",
    order: 19,
    points: 10,
    bodyMd: `\`COMBINA\` é pattern matching, similar a \`switch\`/\`match\`.

## Sintaxe Básica

\`\`\`xs
COMBINA (fruta) {
  CASO "maca" => SOLTA O GRITO("Maca")
  CASO "banana" => SOLTA O GRITO("Banana")
  CASO _ => SOLTA O GRITO("Desconhecida")
}
\`\`\`

## Retornando Valores

\`\`\`xs
CRIA msg = COMBINA (fruta) {
  CASO "maca" => "Maca vermelha"
  CASO _ => "Desconhecida"
}
\`\`\`

## Múltiplos Valores por Caso

\`\`\`xs
CASO 301, 302 => "Redirect"
CASO 400, 401, 403 => "Erro de Cliente"
\`\`\`

Cada braço retorna um valor. O wildcard \`_\` corresponde a qualquer coisa.`,
    challenges: [
      { question: "Qual palavra-chave inicia pattern matching?", answer: "COMBINA", points: 3 },
      { question: "Qual palavra-chave define um caso?", answer: "CASO", points: 3 },
      { question: "Qual caractere é o wildcard?", answer: "_", points: 3 },
    ],
  },
  {
    slug: "combina-intervalos",
    title: "COMBINA com Intervalos",
    order: 20,
    points: 10,
    bodyMd: `Use operadores de comparação em braços \`CASO\`.

## Intervalos Numéricos

\`\`\`xs
COMBINA (nota) {
  CASO 100 => "Perfeito"
  CASO >= 90 => "Excelente"
  CASO >= 80 => "Muito bom"
  CASO >= 70 => "Bom"
  CASO _ => "Estude mais"
}
\`\`\`

## Ordem Importa

Intervalos específicos devem vir primeiro:

\`\`\`xs
// Correto
CASO >= 90 => "A"
CASO >= 80 => "B"

// Errado: 90 nunca corresponde
CASO >= 80 => "B"   // corresponde 80-100
CASO >= 90 => "A"   // inalcançável!
\`\`\`

COMBINA com intervalos é muito mais expressivo que switch tradicional.`,
    challenges: [
      { question: "COMBINA pode usar operadores de comparação como >= em CASO?", answer: "sim", points: 3 },
      { question: "O que acontece se um intervalo amplo vem antes de um restrito?", answer: "o caso restrito se torna inalcançável", points: 5 },
    ],
  },
  {
    slug: "combina-wildcards",
    title: "COMBINA Wildcards (_)",
    order: 21,
    points: 5,
    bodyMd: `O sublinhado \`_\` corresponde a qualquer valor.

## Caso Padrão

\`\`\`xs
COMBINA (valor) {
  CASO 0 => "Zero"
  CASO _ => "Nao e zero"
}
\`\`\`

## Aviso de Não-Exaustão

Sem wildcard, você recebe um aviso:

\`\`\`xs
COMBINA (cor) {
  CASO "azul" => "Blue"
  // Aviso: padrão não-exaustivo!
}
\`\`\`

## Posicionamento

O wildcard deve ser o **último** braço porque corresponde a tudo.`,
    challenges: [
      { question: "Qual caractere é o wildcard no COMBINA?", answer: "_", points: 3 },
      { question: "Onde o wildcard deve ser colocado?", answer: "último", points: 3 },
    ],
  },
  {
    slug: "expressoes-combina",
    title: "Expressões COMBINA (Retornando Valores)",
    order: 22,
    points: 10,
    bodyMd: `COMBINA é uma expressão, não apenas uma instrução.

## Forma de Expressão

\`\`\`xs
CRIA r = COMBINA (x) {
  CASO "a" => 1
  CASO "b" => 2
  CASO _ => 0
}
\`\`\`

Todos os braços devem retornar o mesmo tipo:

\`\`\`xs
CRIA msg = COMBINA (cod) {
  CASO 200 => "OK"
  CASO 404 => "Nao Encontrado"
  CASO _ => "Desconhecido"
}
\`\`\`

## Em Retornos de Função

\`\`\`xs
CHAMA ESSE CARA tipoDia(d) {
  VOLTA COMBINA (d) {
    CASO "sabado" => "Fim de semana"
    CASO "domingo" => "Fim de semana"
    CASO _ => "Dia util"
  }
}
\`\`\`

Usar COMBINA como expressão leva a código mais declarativo.`,
    challenges: [
      { question: "COMBINA é instrução ou expressão?", answer: "expressão", points: 3 },
      { question: "O que todos os braços de uma expressão COMBINA devem retornar?", answer: "o mesmo tipo", points: 3 },
    ],
  },
  {
    slug: "avaliacao-de-curto-circuito",
    title: "Avaliação de Curto-Circuito",
    order: 23,
    points: 5,
    bodyMd: `O operando direito só é avaliado se necessário.

## E (\`E\`) Curto-Circuito

Se o esquerdo é \`FALSO\`, o direito é ignorado:

\`\`\`xs
SE LIGA SO (user != null E user.ativo) {
  // seguro: lado direito ignorado quando null
}
\`\`\`

## OU (\`OU\`) Curto-Circuito

Se o esquerdo é \`VERDADEIRO\`, o direito é ignorado:

\`\`\`xs
CRIA nome = user OU "Convidado"
\`\`\`

## Padrões Práticos

\`\`\`xs
// Proteção contra null
CRIA email = user E user.email

// Valor padrão
CRIA display = nome OU "Visitante"

// Saída antecipada
SE LIGA SO (!dados OU !dados.nome) { VOLTA FALSO }
\`\`\``,
    challenges: [
      { question: "O que acontece em E se o operando esquerdo é FALSO?", answer: "o operando direito não é avaliado", points: 3 },
      { question: "Qual operador usaria para valor padrão?", answer: "OU", points: 3 },
    ],
  },
  {
    slug: "tipo-numero",
    title: "Tipo: NUMERO",
    order: 24,
    points: 5,
    bodyMd: `Todos os números em XanaScript são do tipo \`NUMERO\` — inteiros e floats.

## Literais Inteiros

\`\`\`xs
CRIA x = 42
CRIA y = -10
CRIA z = 1_000_000  // underscores para legibilidade
\`\`\`

## Literais Float

\`\`\`xs
CRIA pi = 3.14159
CRIA avogadro = 6.022e23
CRIA negativo = -0.001
\`\`\`

## Informação de Tipo

Use \`TIPO()\` para inspecionar o tipo:

\`\`\`xs
SOLTA O GRITO(TIPO(42))      // NUMERO
SOLTA O GRITO(TIPO(3.14))    // NUMERO
\`\`\`

## Operadores

\`+\`, \`-\`, \`*\`, \`/\`, \`%\` funcionam com \`NUMERO\`. Divisão sempre retorna float.

\`\`\`xs
CRIA a = 10 / 3   // 3.333...
CRIA b = 10 // 3  // 3 (divisão inteira)
\`\`\`

\`//\` executa divisão inteira (piso).`,
    challenges: [
      { question: "Qual o tipo de todos os números em XanaScript?", answer: "NUMERO", points: 3 },
      { question: "Qual operador faz divisão inteira?", answer: "//", points: 5 },
      { question: "Qual função inspeciona o tipo de um valor?", answer: "TIPO", points: 3 },
    ],
  },
  {
    slug: "tipo-texto",
    title: "Tipo: TEXTO",
    order: 25,
    points: 5,
    bodyMd: `Strings em XanaScript usam aspas duplas e são do tipo \`TEXTO\`.

## Literais de String

\`\`\`xs
CRIA nome = "Maria"
CRIA frase = "Ola, mundo!"
\`\`\`

## Sequências de Escape

\`\`\`xs
CRIA s = "Linha 1\nLinha 2"  // nova linha
CRIA t = "Tab\taqui"          // tab
CRIA q = "Ela disse \"Oi\""   // aspas
\`\`\`

## Interpolação

\`\`\`xs
CRIA nome = "Joao"
CRIA saudacao = "Ola, \${nome}!"  // "Ola, Joao!"
\`\`\`

## Operadores

- \`+\`: concatenação
- \`*\`: repetição (\`"Ha" * 3\` → \`"HaHaHa"\`)
- \`[]\`: indexação (\`"abc"[1]\` → \`"b"\`)
- \`[::]\`: fatiamento (\`"abcdef"[1:4]\` → \`"bcd"\`)`,
    challenges: [
      { question: "Qual nome de tipo representa strings em XanaScript?", answer: "TEXTO", points: 3 },
      { question: "Como interpolar uma variável em uma string?", answer: "\${variavel}", points: 3 },
      { question: "O que \"abc\" * 3 resulta?", answer: "abcabcabc", points: 5 },
    ],
  },
  {
    slug: "tipo-booleano",
    title: "Tipo: BOOLEANO",
    order: 26,
    points: 5,
    bodyMd: `Booleanos representam valores lógicos de verdade.

## Valores

- \`VERDADEIRO\` (true)
- \`FALSO\` (false)

## Operadores Lógicos

| Operador | Significado |
|----------|-------------|
| \`E\` | AND |
| \`OU\` | OR |
| \`!\` | NOT |
| \`XOU\` | XOR |

## Truthy/Falsy

Apenas \`FALSO\`, \`0\` e strings vazias são falsy. Todo o resto é truthy.

\`\`\`xs
SE LIGA SO ("")   { SOLTA O GRITO("falsy") }   // executa
SE LIGA SO (" ")  { SOLTA O GRITO("truthy") }  // executa
SE LIGA SO (0)    { SOLTA O GRITO("falsy") }   // executa
SE LIGA SO (1)    { SOLTA O GRITO("truthy") }  // executa
\`\`\``,
    challenges: [
      { question: "Quais são os dois valores booleanos em XanaScript?", answer: "VERDADEIRO e FALSO", points: 3 },
      { question: "Quais valores são falsy em XanaScript?", answer: "FALSO, 0 e string vazia", points: 5 },
      { question: "Qual é o operador XOR?", answer: "XOU", points: 3 },
    ],
  },
  {
    slug: "tipo-lista",
    title: "Tipo: LISTA",
    order: 27,
    points: 5,
    bodyMd: `Arrays em XanaScript são chamados de \`LISTA\`.

## Criando Listas

\`\`\`xs
CRIA nums = [1, 2, 3, 4, 5]
CRIA vazia = []
CRIA mista = [1, "dois", VERDADEIRO]
\`\`\`

## Indexação

Baseado em zero, índices negativos circulam:

\`\`\`xs
CRIA items = [10, 20, 30, 40]
SOLTA O GRITO(items[0])    // 10
SOLTA O GRITO(items[-1])   // 40 (último)
\`\`\`

## Métodos

| Método | Descrição |
|--------|-----------|
| \`lista.empurra(x)\` | Adicionar ao final |
| \`lista.tira()\` | Remover último |
| \`lista.tamanho\` | Tamanho |
| \`lista.mapa(fn)\` | Mapear |

Listas declaradas com \`CRIA\` são mutáveis. Use \`CONSTANTE\` para imutável.`,
    challenges: [
      { question: "Como acessar o último elemento de uma lista?", answer: "índice negativo -1", points: 3 },
      { question: "Qual método adiciona ao final da lista?", answer: "empurra", points: 3 },
      { question: "Qual propriedade dá o tamanho da lista?", answer: "tamanho", points: 3 },
    ],
  },
  {
    slug: "tipo-dicionario",
    title: "Tipo: DICIONARIO",
    order: 28,
    points: 5,
    bodyMd: `Dicionários em XanaScript são mapas chave-valor, tipo \`DICIONARIO\`.

## Criando Dicionários

\`\`\`xs
CRIA user = {
  "nome": "Maria",
  "idade": 30,
  "email": "maria@email.com"
}
\`\`\`

## Acesso

\`\`\`xs
SOLTA O GRITO(user["nome"])   // Maria
SOLTA O GRITO(user.nome)      // Maria (notação de ponto)
\`\`\`

## Mutação

\`\`\`xs
user["telefone"] = "1234-5678"
user.idade = 31
user.tira("email")            // Remove chave
\`\`\`

## Iteração

\`\`\`xs
PARA CADA (chave EM user) {
  SOLTA O GRITO(chave + ": " + user[chave])
}
\`\`\`

Chaves são sempre strings. Valores podem ser qualquer tipo.`,
    challenges: [
      { question: "Qual tipo representa mapas chave-valor?", answer: "DICIONARIO", points: 3 },
      { question: "Pode usar notação de ponto para acessar valores?", answer: "sim", points: 3 },
      { question: "Qual método remove uma chave?", answer: "tira", points: 3 },
    ],
  },
  {
    slug: "tipo-opcional",
    title: "Tipo: OPCIONAL",
    order: 29,
    points: 5,
    bodyMd: `Tipos opcionais lidam com valores anuláveis de forma segura.

## Declaração

Use sufixo \`?\` para tipos opcionais:

\`\`\`xs
CRIA nome: TEXTO? = null
CRIA idade: NUMERO? = 25
\`\`\`

## Acesso Seguro

Use \`??\` para valores padrão:

\`\`\`xs
CRIA display = nome ?? "Visitante"
\`\`\`

## Encadeamento Opcional

Use \`?.\` para acesso seguro a propriedades:

\`\`\`xs
CRIA cidade = user?.endereco?.cidade
// null se qualquer parte da cadeia for null
\`\`\`

## Pattern Matching

\`\`\`xs
COMBINA (valor) {
  CASO null => "Nulo"
  CASO _ => "Valor: " + valor
}
\`\`\`

Optionals previnem erros de referência nula em tempo de compilação.`,
    challenges: [
      { question: "Qual sufixo torna um tipo opcional?", answer: "?", points: 3 },
      { question: "Qual operador fornece valor padrão para null?", answer: "??", points: 3 },
      { question: "Qual operador fornece acesso seguro a propriedades?", answer: "?.", points: 5 },
    ],
  },
  {
    slug: "inferencia-de-tipos-2",
    title: "Inferência de Tipos",
    order: 30,
    points: 10,
    bodyMd: `XanaScript infere tipos automaticamente. Anotações são opcionais.

## Como a Inferência Funciona

\`\`\`xs
CRIA x = 42         // inferido: NUMERO
CRIA nome = "Ana"   // inferido: TEXTO
CRIA ativo = true   // inferido: BOOLEANO
\`\`\`

## Tipos Literais

Constantes podem ter tipos literais:

\`\`\`xs
CONSTANTE STATUS = "ativo"  // tipo: literal "ativo"
\`\`\`

## Inferência de Retorno de Função

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  VOLTA a + b  // inferido: NUMERO
}
\`\`\`

## Quando Anotar

Anote quando a inferência for ambígua ou para documentação:

\`\`\`xs
CRIA lista: LISTA<NUMERO> = []
CHAMA ESSE CARA busca(id: NUMERO): TEXTO? { ... }
\`\`\``,
    challenges: [
      { question: "Qual tipo é x em: CRIA x = 42", answer: "NUMERO", points: 3 },
      { question: "Anotações de tipo são obrigatórias em XanaScript?", answer: "não", points: 3 },
      { question: "Quando você deve anotar tipos?", answer: "quando a inferência é ambígua ou para documentação", points: 5 },
    ],
  },
  {
    slug: "conversao-de-tipos-2",
    title: "Conversão de Tipos",
    order: 31,
    points: 10,
    bodyMd: `Conversão explícita entre tipos usa funções nativas.

## Para Número

\`\`\`xs
CRIA n = NUMERO("42")   // 42
CRIA f = NUMERO("3.14") // 3.14
CRIA b = NUMERO(true)   // 1
\`\`\`

## Para String

\`\`\`xs
CRIA s = TEXTO(42)      // "42"
CRIA t = TEXTO(true)    // "VERDADEIRO"
\`\`\`

## Para Booleano

\`\`\`xs
CRIA b = BOOLEANO(1)    // true
CRIA c = BOOLEANO("")   // false
\`\`\`

## Verificação de Tipo

\`\`\`xs
CRIA e_numero = TIPO(x) == NUMERO
SOLTA O GRITO(e_numero)  // true or false
\`\`\`

## Cuidados com Coerção

\`+\` entre string e número coage para string:

\`\`\`xs
CRIA r = "Total: " + 42   // "Total: 42"
\`\`\`

Sempre prefira conversão explícita para clareza.`,
    challenges: [
      { question: "Qual função converte um valor para número?", answer: "NUMERO", points: 3 },
      { question: "O que \"Total: \" + 42 produz?", answer: "Total: 42", points: 3 },
      { question: "Você deve confiar em coerção implícita?", answer: "não, prefira conversão explícita", points: 5 },
    ],
  },
  {
    slug: "funcoes-basico",
    title: "Fundamentos de Funções",
    order: 32,
    points: 5,
    bodyMd: `Funções são declaradas com \`CHAMA ESSE CARA\` ("chame esse cara").

## Sintaxe Básica

\`\`\`xs
CHAMA ESSE CARA saudacao() {
  SOLTA O GRITO("Olá!")
}

saudacao()  // Olá!
\`\`\`

## Parâmetros

\`\`\`xs
CHAMA ESSE CARA soma(a, b) {
  SOLTA O GRITO(a + b)
}

soma(3, 4)  // 7
\`\`\`

## Anotações de Tipo

\`\`\`xs
CHAMA ESSE CARA dividir(a: NUMERO, b: NUMERO): NUMERO {
  VOLTA a / b
}
\`\`\`

Parâmetros e tipos de retorno podem ser anotados. O tipo de retorno segue a lista de parâmetros com \`: Tipo\`.`,
    challenges: [
      { question: "Qual palavra-chave declara uma função?", answer: "CHAMA ESSE CARA", points: 3 },
      { question: "Onde vai a anotação de tipo de retorno?", answer: "após a lista de parâmetros", points: 5 },
      { question: "Parâmetros podem ter anotações de tipo?", answer: "sim", points: 3 },
    ],
  },
  {
    slug: "valores-de-retorno",
    title: "Valores de Retorno",
    order: 33,
    points: 5,
    bodyMd: `Use \`VOLTA\` ("volta") para retornar um valor de uma função.

## Sintaxe de Retorno

\`\`\`xs
CHAMA ESSE CARA quadrado(x) {
  VOLTA x * x
}

CRIA r = quadrado(5)  // 25
\`\`\`

## Retorno Antecipado

\`\`\`xs
CHAMA ESSE CARA validar(n) {
  SE LIGA SO (n < 0) {
    VOLTA FALSO
  }
  VOLTA VERDADEIRO
}
\`\`\`

## Retorno Implícito

Se a última expressão não tiver ponto e vírgula, ela é retornada implicitamente:

\`\`\`xs
CHAMA ESSE CARA dobro(x) {
  x * 2  // retorno implícito
}
\`\`\`

## Retornando Múltiplos Valores

Retorne um array ou objeto:

\`\`\`xs
CHAMA ESSE CARA minMax(lista) {
  VOLTA { min: Math.menor(...lista), max: Math.maior(...lista) }
}
\`\`\``,
    challenges: [
      { question: "Qual palavra-chave retorna um valor?", answer: "VOLTA", points: 3 },
      { question: "O que acontece se a última expressão não tiver ponto e vírgula?", answer: "ela é retornada implicitamente", points: 5 },
      { question: "Como você retorna múltiplos valores?", answer: "retorne um array ou objeto", points: 3 },
    ],
  },
  {
    slug: "parametros-e-padroes",
    title: "Parâmetros e Valores Padrão",
    order: 34,
    points: 5,
    bodyMd: `Funções suportam parâmetros padrão e params rest.

## Parâmetros Padrão

\`\`\`xs
CHAMA ESSE CARA saudacao(nome = "Mundo") {
  SOLTA O GRITO("Olá, " + nome)
}

saudacao()          // Olá, Mundo
saudacao("Maria")   // Olá, Maria
\`\`\`

## Parâmetros Rest

Use \`...\` para argumentos variáveis:

\`\`\`xs
CHAMA ESSE CARA somarTudo(...nums) {
  CRIA total = 0
  PARA CADA (n EM nums) { total += n }
  VOLTA total
}

somarTudo(1, 2, 3, 4)  // 10
\`\`\`

## Parâmetros Nomeados

Passe um objeto para comportamento similar a nomeados:

\`\`\`xs
CHAMA ESSE CARA configurar(opts) {
  CRIA host = opts.host ?? "localhost"
  CRIA port = opts.port ?? 3000
}

configurar({ host: "example.com", port: 8080 })
\`\`\`

## Contagem de Parâmetros

Chamar com número errado de argumentos é um erro de compilação.`,
    challenges: [
      { question: "Como você define um parâmetro padrão?", answer: "param = valor", points: 3 },
      { question: "Qual sintaxe captura argumentos variáveis?", answer: "...param", points: 3 },
      { question: "Como você simula parâmetros nomeados?", answer: "passe um objeto", points: 3 },
    ],
  },
  {
    slug: "funcoes-como-primeira-classe",
    title: "Funções como Primeira Classe",
    order: 35,
    points: 10,
    bodyMd: `Funções são valores — atribua a variáveis, passe como argumentos.

## Atribuir a Variável

\`\`\`xs
CHAMA ESSE CARA dobro(x) { VOLTA x * 2 }
CRIA fn = dobro
SOLTA O GRITO(fn(5))  // 10
\`\`\`

## Funções Anônimas

\`\`\`xs
CRIA quadrado = CHAMA ESSE CARA (x) { VOLTA x * x }
SOLTA O GRITO(quadrado(4))  // 16
\`\`\`

## Passando para Funções de Alta Ordem

\`\`\`xs
CRIA nums = [1, 2, 3, 4]
CRIA dobrados = nums.mapa(CHAMA ESSE CARA (n) { VOLTA n * 2 })
// [2, 4, 6, 8]
\`\`\`

## Retornando Funções

\`\`\`xs
CHAMA ESSE CARA criarMultiplicador(fator) {
  VOLTA CHAMA ESSE CARA (x) { VOLTA x * fator }
}

CRIA triplicar = criarMultiplicador(3)
SOLTA O GRITO(triplicar(5))  // 15
\`\`\`

Isso permite closures e padrões de programação funcional.`,
    challenges: [
      { question: "Você pode atribuir uma função a uma variável?", answer: "sim", points: 3 },
      { question: "Qual sintaxe cria uma função anônima?", answer: "CHAMA ESSE CARA (params) { body }", points: 3 },
      { question: "O que é um closure?", answer: "uma função que captura o escopo circundante", points: 5 },
    ],
  },
  {
    slug: "funcoes-arrow",
    title: "Funções Arrow (=>)",
    order: 36,
    points: 10,
    bodyMd: `Funções arrow oferecem uma sintaxe mais curta.

## Expressão Única

\`\`\`xs
CRIA dobro = (x) => x * 2
SOLTA O GRITO(dobro(5))  // 10
\`\`\`

## Múltiplos Parâmetros

\`\`\`xs
CRIA soma = (a, b) => a + b
\`\`\`

## Sem Parâmetros

\`\`\`xs
CRIA saudacao = () => "Olá!"
\`\`\`

## Corpo em Bloco

Para múltiplas declarações, use \`{}\`:

\`\`\`xs
CRIA processar = (x) => {
  CRIA r = x * 2
  SOLTA O GRITO("Resultado: " + r)
  VOLTA r
}
\`\`\`

## Diferenças das Funções Regulares

- Funções arrow capturam \`ISTO\` do escopo circundante
- Não podem ser usadas como construtores
- Não podem ter um nome (sempre anônimas)`,
    challenges: [
      { question: "Qual é a sintaxe da função arrow?", answer: "(params) => expressão", points: 3 },
      { question: "Funções arrow capturam ISTO do escopo circundante?", answer: "sim", points: 3 },
      { question: "Funções arrow podem ser usadas como construtores?", answer: "não", points: 5 },
    ],
  },
  {
    slug: "recursao",
    title: "Recursão",
    order: 37,
    points: 10,
    bodyMd: `Funções podem chamar a si mesmas — XanaScript suporta recursão.

## Recursão Básica

\`\`\`xs
CHAMA ESSE CARA fatorial(n) {
  SE LIGA SO (n <= 1) { VOLTA 1 }
  VOLTA n * fatorial(n - 1)
}

SOLTA O GRITO(fatorial(5))  // 120
\`\`\`

## Recursão de Cauda

O compilador otimiza chamadas recursivas de cauda em loops:

\`\`\`xs
CHAMA ESSE CARA fatorialTail(n, acc = 1) {
  SE LIGA SO (n <= 1) { VOLTA acc }
  VOLTA fatorialTail(n - 1, n * acc)  // chamada de cauda
}
\`\`\`

## Estruturas de Dados Recursivas

\`\`\`xs
CHAMA ESSE CARA tamanhoLista(lista) {
  SE LIGA SO (lista.tamanho == 0) { VOLTA 0 }
  VOLTA 1 + tamanhoLista(lista[1::])
}
\`\`\`

## Cuidado

Sem otimização de recursão de cauda, recursão profunda pode estourar a pilha (>10000 chamadas).`,
    challenges: [
      { question: "Qual otimização o compilador aplica à recursão de cauda?", answer: "converte para loop", points: 5 },
      { question: "Quão profunda a recursão pode ir antes de estourar a pilha?", answer: "cerca de 10000 chamadas", points: 3 },
    ],
  },
  {
    slug: "operacoes-com-listas",
    title: "Operações com Listas",
    order: 38,
    points: 5,
    bodyMd: `Operações principais para trabalhar com listas.

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

## Ordenação

\`\`\`xs
CRIA ordenado = nums.ordena()
CRIA reverso = nums.ordena((a, b) => b - a)
\`\`\`

## Encadeamento

\`\`\`xs
CRIA resultado = nums
  .filtra((n) => n > 2)
  .mapa((n) => n * 10)
  .reduz((a, n) => a + n, 0)
\`\`\`

Métodos retornam novas listas — a original não é alterada.`,
    challenges: [
      { question: "Qual método transforma cada elemento?", answer: "mapa", points: 3 },
      { question: "Qual método filtra elementos?", answer: "filtra", points: 3 },
      { question: "Métodos de lista podem ser encadeados?", answer: "sim", points: 3 },
    ],
  },
  {
    slug: "tipo-conjunto",
    title: "Tipo: CONJUNTO",
    order: 39,
    points: 5,
    bodyMd: `Conjuntos são coleções não ordenadas de valores únicos.

## Criando Conjuntos

\`\`\`xs
CRIA cores = CONJUNTO{"azul", "verde", "vermelho"}
CRIA vazio = CONJUNTO{}
\`\`\`

## Operações

\`\`\`xs
cores.insere("amarelo")       // add
cores.remove("azul")           // remove
CRIA existe = cores.tem("verde")  // pertinência
\`\`\`

## Teoria dos Conjuntos

\`\`\`xs
CRIA a = CONJUNTO{1, 2, 3}
CRIA b = CONJUNTO{2, 3, 4}
CRIA uniao = a + b           // {1, 2, 3, 4}
CRIA intersec = a * b        // {2, 3}
CRIA diferenca = a - b       // {1}
\`\`\`

## Iteração

\`\`\`xs
PARA CADA (cor EM cores) {
  SOLTA O GRITO(cor)
}
\`\`\``,
    challenges: [
      { question: "Qual tipo representa um conjunto?", answer: "CONJUNTO", points: 3 },
      { question: "Qual operador calcula a união de dois conjuntos?", answer: "+", points: 3 },
      { question: "Qual operador calcula a interseção?", answer: "*", points: 5 },
    ],
  },
  {
    slug: "classes-basico",
    title: "Fundamentos de Classes com CLASSE",
    order: 40,
    points: 5,
    bodyMd: `Classes são definidas com \`CLASSE\`.

## Definição de Classe

\`\`\`xs
CLASSE Pessoa {
  CRIA nome
  CRIA idade

  CHAMA ESSE CARA init(nome, idade) {
    ISTO.nome = nome
    ISTO.idade = idade
  }

  CHAMA ESSE CARA saudacao() {
    SOLTA O GRITO("Olá, sou " + ISTO.nome)
  }
}
\`\`\`

## Criando Instâncias

\`\`\`xs
CRIA p = Pessoa.novo("Maria", 30)
p.saudacao()  // Olá, sou Maria
\`\`\`

## Propriedades

Propriedades são declaradas com \`CRIA\` dentro do corpo da classe. Use \`ISTO\` para se referir à instância atual.

O método \`init\` atua como construtor.`,
    challenges: [
      { question: "Qual palavra-chave define uma classe?", answer: "CLASSE", points: 3 },
      { question: "Qual palavra-chave se refere à instância atual?", answer: "ISTO", points: 3 },
      { question: "Qual método atua como construtor?", answer: "init", points: 3 },
    ],
  },
  {
    slug: "construtores-de-classe",
    title: "Construtores de Classe",
    order: 41,
    points: 5,
    bodyMd: `O método \`init\` inicializa uma nova instância.

## Padrão de Construtor

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

## Múltiplos Construtores

Use sobrecarga:

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

## Métodos de Fábrica

Métodos estáticos que criam instâncias:

\`\`\`xs
CLASSE User {
  CHAMA ESSE CARA ESTATICO criarConvidado() {
    VOLTA User.novo("Convidado", "guest@site.com")
  }
}
\`\`\`

\`ESTATICO\` define um método estático.`,
    challenges: [
      { question: "Qual método é o construtor?", answer: "init", points: 3 },
      { question: "Uma classe pode ter múltiplos construtores?", answer: "sim, via sobrecarga", points: 5 },
      { question: "Qual palavra-chave define um método estático?", answer: "ESTATICO", points: 3 },
    ],
  },
  {
    slug: "metodos-de-instancia-e-estaticos",
    title: "Métodos de Instância e Estáticos",
    order: 42,
    points: 5,
    bodyMd: `Métodos podem ser de nível de instância ou de classe.

## Métodos de Instância

Operam em uma instância via \`ISTO\`:

\`\`\`xs
CLASSE Conta {
  CRIA saldo

  CHAMA ESSE CARA depositar(valor) {
    ISTO.saldo += valor
  }
}
\`\`\`

## Métodos Estáticos

Pertencem à classe, não às instâncias:

\`\`\`xs
CLASSE Math {
  CHAMA ESSE CARA ESTATICO max(a, b) {
    VOLTA a > b ? a : b
  }
}

SOLTA O GRITO(Math.max(10, 20))  // 20
\`\`\`

## Getters/Setters de Propriedade

\`\`\`xs
CLASSE Pessoa {
  CRIA _nome

  PEGA nome() { VOLTA ISTO._nome }
  COLOCA nome(valor) { ISTO._nome = valor.paraMaiusculo() }
}
\`\`\`

\`PEGA\` (get) e \`COLOCA\` (set) definem propriedades computadas.`,
    challenges: [
      { question: "Qual palavra-chave define um método estático?", answer: "ESTATICO", points: 3 },
      { question: "Qual palavra-chave define um getter?", answer: "PEGA", points: 3 },
      { question: "Qual palavra-chave define um setter?", answer: "COLOCA", points: 5 },
    ],
  },
  {
    slug: "encapsulamento",
    title: "Encapsulamento",
    order: 43,
    points: 5,
    bodyMd: `Controle o acesso aos membros da classe.

## Membros Privados

Prefixe com sublinhado:

\`\`\`xs
CLASSE Banco {
  CRIA _saldo = 0  // privado por convenção
  CRIA _extrato = []

  CHAMA ESSE CARA depositar(v) {
    ISTO._saldo += v
    ISTO._extrato.empurra("Depósito: " + v)
  }

  PEGA saldo() { VOLTA ISTO._saldo }
}
\`\`\`

## Palavra-chave Privada

Use \`PRIVADO\` para privacidade forçada:

\`\`\`xs
CLASSE Conta {
  PRIVADO CRIA _saldo
  PRIVADO CHAMA ESSE CARA _log(msg) { ... }
}
\`\`\`

## API Pública

Exponha apenas o necessário:

\`\`\`xs
CLASSE API {
  CRIA PRIVADO _url

  CHAMA ESSE CARA buscar() { ... }   // público
  PRIVADO CHAMA ESSE CARA _parse() { ... }
}
\`\`\`

Encapsulamento reduz acoplamento e previne mau uso.`,
    challenges: [
      { question: "Qual prefixo convencional marca membros privados?", answer: "_", points: 3 },
      { question: "Qual palavra-chave impõe acesso privado?", answer: "PRIVADO", points: 5 },
      { question: "Qual é um benefício do encapsulamento?", answer: "reduz acoplamento / previne mau uso", points: 3 },
    ],
  },
  {
    slug: "tratamento-de-erros-com-tente",
    title: "Tratamento de Erros com TENTE",
    order: 44,
    points: 5,
    bodyMd: `Erros são tratados com \`TENTE\` (try), \`CAPTURA\` (catch), \`FINALLY\` (finally).

## Try/Catch Básico

\`\`\`xs
TENTE {
  CRIA resultado = operacaoRiscada()
  SOLTA O GRITO(resultado)
} CAPTURA (erro) {
  SOLTA O GRITO("Erro: " + erro.mensagem)
}
\`\`\`

## Bloco Finally

Sempre executa, mesmo em erro:

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

## Múltiplos Catch

\`\`\`xs
CAPTURA (erro: ErroValidacao) { ... }
CAPTURA (erro: ErroBanco) { ... }
CAPTURA (erro) { ... }  // padrão
\`\`\`

Use \`TENTE\` para operações que podem falhar.`,
    challenges: [
      { question: "Qual palavra-chave inicia um bloco try?", answer: "TENTE", points: 3 },
      { question: "Qual palavra-chave captura um erro?", answer: "CAPTURA", points: 3 },
      { question: "Qual bloco sempre executa?", answer: "FINALLY", points: 3 },
    ],
  },
  {
    slug: "classes-de-erro-personalizadas",
    title: "Classes de Erro Personalizadas",
    order: 45,
    points: 10,
    bodyMd: `Crie erros específicos de domínio estendendo a classe de erro base.

## Definindo Erros Personalizados

\`\`\`xs
CLASSE ErroAutenticacao EXTENDE Erro {
  CRIA codigo

  CHAMA ESSE CARA init(mensagem, codigo) {
    SUPER.init(mensagem)
    ISTO.codigo = codigo
    ISTO.nome = "ErroAutenticacao"
  }
}

CLASSE ErroValidacao EXTENDE Erro {
  CRIA campo

  CHAMA ESSE CARA init(mensagem, campo) {
    SUPER.init(mensagem)
    ISTO.campo = campo
  }
}
\`\`\`

## Uso

\`\`\`xs
SE LIGA SO (!senha) {
  JOGAR ErroValidacao.novo("Senha obrigatória", "senha")
}

CAPTURA (erro: ErroValidacao) {
  SOLTA O GRITO("Campo: " + erro.campo)
}
\`\`\`

Erros personalizados permitem tratamento preciso com dados específicos de domínio.`,
    challenges: [
      { question: "Como você cria um erro personalizado?", answer: "estendendo a classe Erro", points: 3 },
      { question: "Por que usar erros personalizados?", answer: "para dados de erro específicos de domínio e tratamento preciso", points: 5 },
    ],
  },
  {
    slug: "padroes-de-tratamento-de-erros",
    title: "Padrões de Tratamento de Erros",
    order: 46,
    points: 10,
    bodyMd: `Padrões comuns para tratamento robusto de erros.

## Cláusula de Guarda

Verifique cedo, lance imediatamente:

\`\`\`xs
CHAMA ESSE CARA buscarUsuario(id) {
  SE LIGA SO (!id) { JOGAR "ID obrigatório" }
  SE LIGA SO (id < 0) { JOGAR "ID inválido" }

  CRIA user = repo.busca(id)
  SE LIGA SO (!user) { JOGAR "Não encontrado" }

  VOLTA user
}
\`\`\`

## Padrão Resultado (Sem Exceções)

\`\`\`xs
CLASSE Resultado {
  CRIA sucesso, valor, erro

  CHAMA ESSE CARA ESTATICO ok(valor) {
    VOLTA Resultado.novo(true, valor, null)
  }

  CHAMA ESSE CARA ESTATICO falha(erro) {
    VOLTA Resultado.novo(false, null, erro)
  }
}
\`\`\`

## Usando Resultado

\`\`\`xs
CRIA r = operacao()
SE LIGA SO (r.sucesso) {
  processar(r.valor)
} SENAO {
  SOLTA O GRITO("Erro: " + r.erro)
}
\`\`\``,
    challenges: [
      { question: "Qual padrão verifica condições antecipadamente?", answer: "cláusula de guarda", points: 3 },
      { question: "Qual é uma alternativa às exceções?", answer: "padrão Resultado", points: 5 },
      { question: "O que uma cláusula de guarda usa?", answer: "JOGAR / throw", points: 3 },
    ],
  },
  {
    slug: "registro-de-erros",
    title: "Registro de Erros (Logging)",
    order: 47,
    points: 5,
    bodyMd: `Registre erros para depuração e monitoramento.

## Logging Básico

\`\`\`xs
TENTE {
  operacao()
} CAPTURA (erro) {
  SOLTA O GRITO("ERRO: " + erro)
  console.erro(erro)
}
\`\`\`

## Logging Estruturado

\`\`\`xs
CLASSE Logger {
  CHAMA ESSE CARA ESTATICO erro(msg, contexto = {}) {
    CRIA entrada = {
      nivel: "ERRO",
      mensagem: msg,
      timestamp: DataAgora(),
      contexto: contexto
    }
    console.erro(JSON.serializa(entrada))
  }
}

// Uso
Logger.erro("Falha no banco", { db: "usuarios", erro: err })
\`\`\`

## Níveis de Log

- \`DEBUG\`: detalhes de desenvolvimento
- \`INFO\`: operações normais
- \`AVISO\`: avisos
- \`ERRO\`: erros

Registre o suficiente para diagnosticar problemas, não tanto que os logs sejam ruído.`,
    challenges: [
      { question: "Qual nível de log é para erros?", answer: "ERRO", points: 3 },
      { question: "Por que usar logging estruturado?", answer: "para logs legíveis por máquina e pesquisáveis", points: 5 },
      { question: "Qual é o trade-off do logging?", answer: "muito = ruído, pouco = não diagnosticável", points: 3 },
    ],
  },
  {
    slug: "estrategias-de-recuperacao",
    title: "Estratégias de Recuperação de Erros",
    order: 48,
    points: 10,
    bodyMd: `Estratégias para se recuperar de falhas.

## Padrão de Retry

\`\`\`xs
CHAMA ESSE CARA tentarComRetry(fn, tentativas = 3) {
  PARA CADA (i EM 1..tentativas) {
    TENTE {
      VOLTA fn()
    } CAPTURA (erro) {
      SE LIGA SO (i == tentativas) { JOGAR erro }
      SOLTA O GRITO("Tentativa " + i + " falhou. Tentando novamente...")
      esperar(1000 * i)
    }
  }
}
\`\`\`

## Circuit Breaker

Pare de chamar um serviço com falha temporariamente:

\`\`\`xs
CLASSE CircuitBreaker {
  CRIA falhas = 0, limite = 5, aberto = false

  CHAMA ESSE CARA chamar(fn) {
    SE LIGA SO (ISTO.aberto) {
      JOGAR "Circuito aberto"
    }
    TENTE {
      CRIA r = fn()
      ISTO.falhas = 0
      VOLTA r
    } CAPTURA (e) {
      ISTO.falhas += 1
      SE LIGA SO (ISTO.falhas >= ISTO.limite) { ISTO.aberto = true }
      JOGAR e
    }
  }
}
\`\`\`

Escolha a estratégia de recuperação baseada no tipo de erro e requisitos do sistema.`,
    challenges: [
      { question: "Qual padrão tenta novamente uma operação com falha?", answer: "padrão retry", points: 3 },
      { question: "Qual padrão para de chamar um serviço com falha?", answer: "circuit breaker", points: 5 },
      { question: "Todos os erros devem ser repetidos?", answer: "não, apenas erros transitórios", points: 3 },
    ],
  },
  {
    slug: "melhores-praticas-de-erros",
    title: "Melhores Práticas de Tratamento de Erros",
    order: 49,
    points: 10,
    bodyMd: `Diretrizes para tratamento robusto de erros.

## 1. Falhe Rápido

Detecte erros o mais cedo possível:

\`\`\`xs
CHAMA ESSE CARA processar(dados) {
  SE LIGA SO (!dados) { JOGAR "Dados obrigatórios" }
  // continue...
}
\`\`\`

## 2. Não Engula Erros

\`\`\`xs
// Ruim
CAPTURA (e) { /* não faz nada */ }

// Bom
CAPTURA (e) {
  Logger.erro(e)
  JOGAR  // ou trate adequadamente
}
\`\`\`

## 3. Use Erros Específicos

Capture tipos específicos, não erros genéricos.

## 4. Limpe Recursos

Use \`FINALLY\` para limpeza.

## 5. Documente Condições de Erro

Documente quais erros uma função pode lançar.

Seguir estas práticas previne falhas silenciosas e corrupção de dados.`,
    challenges: [
      { question: "O que significa falhar rápido?", answer: "detectar erros o mais cedo possível", points: 3 },
      { question: "É OK engolir erros?", answer: "não", points: 3 },
      { question: "Onde o código de limpeza deve ir?", answer: "bloco FINALLY", points: 3 },
    ],
  },
  {
    slug: "modulos-basico",
    title: "Fundamentos de Módulos",
    order: 50,
    points: 5,
    bodyMd: `Organize código em módulos reutilizáveis.

## Exportando

\`\`\`xs
// math.xs
export CHAMA ESSE CARA soma(a, b) { VOLTA a + b }
export CHAMA ESSE CARA multiplicar(a, b) { VOLTA a * b }

export CONSTANTE PI = 3.14159
\`\`\`

## Importando

\`\`\`xs
// main.xs
import { soma, PI } from "./math.xs"

SOLTA O GRITO(soma(2, 3))     // 5
SOLTA O GRITO(PI)             // 3.14159
\`\`\`

## Exportação Padrão

\`\`\`xs
// utils.xs
export default CHAMA ESSE CARA log(msg) {
  SOLTA O GRITO("[LOG] " + msg)
}
\`\`\`

## Importação Padrão

\`\`\`xs
import log from "./utils.xs"
log("teste")  // [LOG] teste
\`\`\`

Cada arquivo pode ter uma exportação padrão e múltiplas exportações nomeadas.`,
    challenges: [
      { question: "Qual palavra-chave exporta um valor?", answer: "export", points: 3 },
      { question: "Qual palavra-chave importa um valor?", answer: "import", points: 3 },
      { question: "Quantas exportações padrão um módulo pode ter?", answer: "uma", points: 3 },
    ],
  },
  {
    slug: "imports-exports-nomeados",
    title: "Imports/Exports Nomeados",
    order: 51,
    points: 5,
    bodyMd: `Importe e exporte nomes específicos.

## Exports Nomeados

\`\`\`xs
// shapes.xs
export CLASSE Circulo { ... }
export CLASSE Quadrado { ... }
export CHAMA ESSE CARA areaTotal(...formas) { ... }
\`\`\`

## Imports Nomeados

\`\`\`xs
import { Circulo, areaTotal } from "./shapes.xs"
\`\`\`

## Aliases

Renomeie imports para evitar conflitos:

\`\`\`xs
import { Circulo as Circ, Quadrado as Quad } from "./shapes.xs"
CRIA c = Circ.novo(5)
\`\`\`

## Re-exportação

\`\`\`xs
export { soma, multiplicar } from "./math.xs"
\`\`\`

## Importação de Namespace

\`\`\`xs
import * as Math from "./math.xs"
SOLTA O GRITO(Math.soma(1, 2))
\`\`\`

Imports nomeados são explícitos e permitem tree-shaking.`,
    challenges: [
      { question: "Como você cria um alias para um import?", answer: "import { Original as Alias }", points: 3 },
      { question: "Como você importa tudo de um módulo?", answer: "import * as nome", points: 3 },
      { question: "Qual é o principal benefício dos imports nomeados?", answer: "tree-shaking e dependências explícitas", points: 5 },
    ],
  },
  {
    slug: "ecossistema-de-pacotes",
    title: "Ecossistema de Pacotes",
    order: 52,
    points: 5,
    bodyMd: `Visão geral das ferramentas de pacotes XanaScript.

## Registro

O registro oficial de pacotes XanaScript hospeda milhares de pacotes.

## Ferramentas CLI

\`\`\`bash
# Instalar um pacote
xs install nome-do-pacote

# Remover um pacote
xs remove nome-do-pacote

# Listar pacotes instalados
xs list

# Atualizar pacotes
xs update
\`\`\`

## Gerenciamento de Versão

\`\`\`bash
xs install pacote@1.2.3
xs install pacote@^1.0.0
\`\`\`

## Scripts

\`\`\`json
{
  "scripts": {
    "build": "xs build",
    "test": "xs test",
    "start": "xs run src/main.xs"
  }
}
\`\`\`

O ecossistema fornece ferramentas para descoberta, instalação e atualização de pacotes.`,
    challenges: [
      { question: "Qual comando instala um pacote?", answer: "xs install", points: 3 },
      { question: "Qual comando remove um pacote?", answer: "xs remove", points: 3 },
      { question: "Onde os pacotes XanaScript são hospedados?", answer: "no registro oficial XanaScript", points: 3 },
    ],
  },
  {
    slug: "coleta-de-lixo",
    title: "Coleta de Lixo em XanaScript",
    order: 53,
    points: 5,
    bodyMd: `XanaScript possui coleta de lixo automática.

## Como Funciona

O coletor de lixo recupera automaticamente a memória que não é mais referenciada.

\`\`\`xs
CHAMA ESSE CARA criarArray() {
  CRIA arr = [1, 2, 3]
  VOLTA arr
}
// arr não é mais acessível após a função retornar (se não atribuído)
\`\`\`

## Coleta Gerenciada

- Objetos são alocados no heap
- GC rastreia referências
- Memória é liberada quando não referenciada

## Referências Fracas

\`\`\`xs
CRIA cache = new MapFino()
cache.set("key", { dados: "teste" })
// O valor pode ser coletado se não houver outras referências
\`\`\`

## Boas Práticas

- Não confie em GC para limpeza de recursos (use FINALLY)
- Nullifique referências para liberar mais cedo
- Evite vazamentos de memória com listeners

A GC torna a gestão de memória automática, mas entenda suas implicações.`,
    challenges: [
      { question: "XanaScript possui GC automática?", answer: "sim", points: 3 },
      { question: "O que a GC recupera?", answer: "memória não referenciada", points: 3 },
      { question: "GC substitui limpeza manual de recursos?", answer: "não", points: 5 },
    ],
  },
  {
    slug: "consideracoes-de-desempenho",
    title: "Considerações de Desempenho",
    order: 54,
    points: 10,
    bodyMd: `Escreva código XanaScript eficiente.

## Alocação no Hot Path

Evite alocações desnecessárias em loops:

\`\`\`xs
// Ruim: cria novo array a cada iteração
PARA CADA (i EM range(1000)) {
  CRIA temp = [i, i * 2]
}

// Bom: alocar uma vez
CRIA temp = []
PARA CADA (i EM range(1000)) {
  temp[0] = i
  temp[1] = i * 2
}
\`\`\`

## Cache de Tamanhos

\`\`\`xs
// Ruim
PARA CADA (i EM range(arr.tamanho)) { }

// Bom
CRIA len = arr.tamanho
PARA CADA (i EM range(len)) { }
\`\`\`

## Acesso a Propriedades

\`\`\`xs
// Cache de acesso a propriedade
CRIA nome = obj.nome
SOLTA O GRITO(nome)
SOLTA O GRITO(nome)
\`\`\`

## Perfilamento

Use \`xs prof\` para perfilamento de código:

\`\`\`bash
xs prof --cpu --heap src/main.xs
\`\`\`

Perfile antes de otimizar. Nunca otimize prematuramente.`,
    challenges: [
      { question: "O que evitar em hot paths de loops?", answer: "alocações desnecessárias", points: 5 },
      { question: "Qual comando cria perfil de código?", answer: "xs prof", points: 3 },
      { question: "Quando você deve otimizar?", answer: "depois de perfilar e identificar gargalos", points: 5 },
    ],
  },
  {
    slug: "perfilamento-e-debugging",
    title: "Perfilamento e Depuração",
    order: 55,
    points: 5,
    bodyMd: `Ferramentas para perfilar e depurar código XanaScript.

## Depurador

\`\`\`bash
xs debug src/main.xs
\`\`\`

Comandos do depurador:

- \`c\` / \`continuar\` – continuar execução
- \`n\` / \`proximo\` – próxima linha
- \`s\` / \`entrar\` – entrar na função
- \`p\` / \`print <expr>\` – imprimir expressão

## Breakpoints

\`\`\`xs
PARAR  // pausa no depurador
\`\`\`

## Ferramentas de Perfil

\`\`\`bash
# CPU profiling
xs prof --cpu src/main.xs

# Heap profiling  
xs prof --heap src/main.xs

# Profile de alocação
xs prof --aloc src/main.xs
\`\`\`

## Inspeção de Memória

\`\`\`bash
xs memory src/main.xs
\`\`\`

Use estas ferramentas para encontrar e corrigir problemas de desempenho.`,
    challenges: [
      { question: "Qual comando inicia o depurador?", answer: "xs debug", points: 3 },
      { question: "Qual palavra-chave define um breakpoint?", answer: "PARAR / break", points: 3 },
      { question: "Qual comando inspeciona o uso de memória?", answer: "xs memory", points: 3 },
    ],
  },
  {
    slug: "escrevendo-testes-unitarios",
    title: "Escrevendo Testes Unitários",
    order: 56,
    points: 5,
    bodyMd: `Teste funções e módulos individualmente.

## Teste Básico

\`\`\`xs
import { test, espera } from "xs:test"
import { soma } from "./math.xs"

test("soma 1 + 2 = 3", () => {
  espera(soma(1, 2)).ser(3)
})
\`\`\`

## Matchers

\`\`\`xs
espera(valor).ser(3)
espera(valor).nao.ser(4)
espera(valor).serVerdade()
espera(valor).serFalso()
espera(valor).conter(2)
espera(valor).serTipo("string")
\`\`\`

## Setup e Teardown

\`\`\`xs
test.beforeCada(() => { /* setup */ })
test.depoisCada(() => { /* teardown */ })
\`\`\`

## Rodando Testes

\`\`\`bash
xs test
xs test --watch
xs test --cobertura
\`\`\`

Testes unitários garantem que componentes individuais funcionem corretamente.`,
    challenges: [
      { question: "Qual módulo fornece testes?", answer: "xs:test", points: 3 },
      { question: "Qual matcher verifica igualdade?", answer: "ser / toBe", points: 3 },
      { question: "Qual comando executa testes?", answer: "xs test", points: 3 },
    ],
  },
  {
    slug: "testes-de-integracao",
    title: "Testes de Integração",
    order: 57,
    points: 10,
    bodyMd: `Teste como componentes funcionam juntos.

## Exemplo de Teste de Integração

\`\`\`xs
import { test, espera } from "xs:test"
import { servidor } from "./api.xs"
import { banco } from "./db.xs"

test("API + DB: criar usuário", () => {
  CRIA usuario = servidor.criarUsuario({
    nome: "João",
    email: "joao@email.com"
  })

  CRIA salvo = banco.buscar(usuario.id)
  espera(salvo.nome).ser("João")
})
\`\`\`

## Mocks e Stubs

\`\`\`xs
import { mock } from "xs:test"

CRIA fnMock = mock(() => "valor simulado")
\`\`\`

## Testando Dependências Externas

\`\`\`xs
// Simule API externa em vez de chamar serviço real
CRIA apiMock = {
  buscar: mock(() => Promise.resolver({ id: 1 }))
}
\`\`\`

Testes de integração pegam bugs de interação entre componentes que testes unitários perdem.`,
    challenges: [
      { question: "O que testes de integração verificam?", answer: "interações entre componentes", points: 3 },
      { question: "O que substituti dependências externas em testes?", answer: "mocks", points: 3 },
      { question: "O que mocks substituem?", answer: "dependências externas", points: 3 },
    ],
  },
  {
    slug: "tdd-com-xanascript",
    title: "TDD com XanaScript",
    order: 58,
    points: 10,
    bodyMd: `Desenvolvimento Orientado a Testes.

## Ciclo TDD: Vermelho-Verde-Refatora

1. **Vermelho**: Escreva um teste que falha
2. **Verde**: Faça o teste passar
3. **Refatore**: Melhore o código

## Exemplo

\`\`\`xs
// 1. Vermelho - escreva o teste
test("calculadora soma dois números", () => {
  espera(calculadora.soma(2, 3)).ser(5)
})

// 2. Verde - implemente
CLASSE Calculadora {
  CHAMA ESSE CARA soma(a, b) { VOLTA a + b }
}

CRIA calculadora = Calculadora.novo()

// 3. Refatore - melhore
// (renomear, extrair, etc.)
\`\`\`

## Benefícios

- Cobertura de teste completa
- Código mais limpo e testável
- Feedback rápido sobre mudanças
- Documentação viva

## Dicas

- Pequenos passos iterativos
- Teste comportamento, não implementação
- Commits frequentes

TDD leva a código mais confiável e bem projetado.`,
    challenges: [
      { question: "Quais são as três fases do TDD?", answer: "vermelho, verde, refatore", points: 3 },
      { question: "Na fase vermelha, o que o teste deve fazer?", answer: "falhar", points: 3 },
      { question: "TDD testa implementação ou comportamento?", answer: "comportamento", points: 5 },
    ],
  },
  {
    slug: "tipos-de-testes-na-pratica",
    title: "Tipos de Testes na Prática",
    order: 59,
    points: 5,
    bodyMd: `Visão geral de diferentes tipos de teste.

## Pirâmide de Testes

1. **Testes Unitários** (muitos): testam unidades isoladas
2. **Testes de Integração** (alguns): testam interações
3. **Testes E2E** (poucos): testam fluxo completo

## Testes de Snapshot

\`\`\`xs
test("componente renderiza", () => {
  espera(renderizador.render(<Comp />)).combinarComSnapshot()
})
\`\`\`

## Testes de Carga

\`\`\`xs
import { carga } from "xs:test"

carga("API lida com 1000 requisições", {
  reqPorSegundo: 100,
  duracao: "10s",
  exec: () => api.buscar("/users")
})
\`\`\`

## Testes Fuzz

\`\`\`xs
import { fuzz } from "xs:test"

fuzz("função de parse", (buf) => {
  parse(buf) // não deve lançar
})
\`\`\`

Misture tipos de teste para confiança máxima.`,
    challenges: [
      { question: "O que é a pirâmide de testes?", answer: "muitos unitários, alguns integração, poucos E2E", points: 5 },
      { question: "Testes de carga testam o quê?", answer: "desempenho sob alta demanda", points: 3 },
      { question: "Quais testes são mais rápidos?", answer: "testes unitários", points: 3 },
    ],
  },
  {
    slug: "depuracao-avancada",
    title: "Depuração Avançada",
    order: 60,
    points: 10,
    bodyMd: `Técnicas para depurar problemas complexos.

## Logging Condicional

\`\`\`xs
CRIA DEBUG = true

CHAMA ESSE CARA processar(item) {
  SE LIGA SO (DEBUG) { console.log("processando:", item) }
  // ...
}
\`\`\`

## Inspeção de Pilha

Capture e analise stack traces:

\`\`\`xs
TENTE {
  operacao()
} CAPTURA (erro) {
  SOLTA O GRITO(erro.pilha)
}
\`\`\`

## Ferramentas de Diagnóstico

\`\`\`bash
# Módulo de diagnóstico
xs diag src/main.xs

# AST explorer
xs ast src/main.xs

# Timelines
xs timeline src/main.xs
\`\`\`

## Breakpoints Avançados

\`\`\`xs
PARAR SE (condicao)  // breakpoint condicional
\`\`\`

## Isolamento de Problemas

Use busca binária para encontrar o commit que introduziu o bug.

Depuração avançada requer as ferramentas certas e abordagem sistemática.`,
    challenges: [
      { question: "O que um breakpoint condicional faz?", answer: "pausa apenas quando a condição é verdadeira", points: 5 },
      { question: "Qual comando mostra o AST?", answer: "xs ast", points: 3 },
      { question: "Como isolar a origem de um bug?", answer: "busca binária em commits", points: 5 },
    ],
  },
  {
    slug: "tratamento-de-erros-assincronos",
    title: "Tratamento de Erros Assíncronos",
    order: 61,
    points: 10,
    bodyMd: `Trate erros em código assíncrono adequadamente.

## TENTE/CAPTURA Assíncrono

\`\`\`xs
TENTE {
  CRIA dados = ESPERA api.buscar("/dados")
  processar(dados)
} CAPTURA (erro) {
  Logger.erro("Falha ao buscar dados", erro)
}
\`\`\`

## Promise Rejeitada

\`\`\`xs
CRIA promessa = operacao()

promessa.tratar(
  (valor) => processar(valor),
  (erro) => Logger.erro(erro)
)
\`\`\`

## Rejeição Não Tratada

Sempre trate rejeições:

\`\`\`xs
// Registra rejeições não tratadas
processo.em("rejeicaoNaoTratada", (erro) => {
  Logger.erro("Rejeição não tratada:", erro)
})
\`\`\`

## Promise.all

Se uma falhar, todas falham:

\`\`\`xs
TENTE {
  CRIA [a, b] = ESPERA Promise.tudo([
    api.get("/a"),
    api.get("/b")
  ])
} CAPTURA (erro) {
  // Lida se a OU b falharem
}
\`\`\`

Erros assíncronos são traiçoeiros. Sempre trate promessas.`,
    challenges: [
      { question: "Você pode usar TENTE/CAPTURA com ESPERA?", answer: "sim", points: 3 },
      { question: "O que acontece se uma promessa em Promise.tudo falha?", answer: "todas falham", points: 5 },
      { question: "O que Promise.tudo retorna?", answer: "uma promessa que resolve quando todas resolvem", points: 3 },
    ],
  },
  {
    slug: "event-loop-em-detalhe",
    title: "Event Loop em Detalhe",
    order: 62,
    points: 10,
    bodyMd: `Aprofunde seu entendimento do event loop XanaScript.

## Fases do Event Loop

1. **Timers**: executa callbacks de setTimeout/setInterval
2. **IO**: executa callbacks de IO
3. **Imediatos**: executa callbacks de setImediato
4. **Fechar**: executa callbacks de fechamento

## Microtasks

Microtasks têm maior prioridade e são processadas entre fases:

\`\`\`xs
SOLTA O GRITO("1")
Promise.resolver().entao(() => SOLTA O GRITO("2"))
SOLTA O GRITO("3")
// Saída: 1, 3, 2
\`\`\`

## Exemplo Detalhado

\`\`\`xs
setTimeout(() => SOLTA O GRITO("timeout"), 0)
setImediato(() => SOLTA O GRITO("imediato"))
processo.proximoTick(() => SOLTA O GRITO("tick"))

SOLTA O GRITO("sincrono")
// Saída: sincrono, tick, imediato, timeout
\`\`\`

## Starvation

Microtasks podem causar starvation se encadeadas sem ceder.

Entender o event loop previne bugs de ordenação e desempenho.`,
    challenges: [
      { question: "Qual fase executa setTimeout?", answer: "timers", points: 3 },
      { question: "O que tem maior prioridade: microtasks ou IO?", answer: "microtasks", points: 5 },
      { question: "O que é starvation no event loop?", answer: "microtasks infinitas bloqueando outras fases", points: 5 },
    ],
  },
  {
    slug: "trabalhando-com-streams",
    title: "Trabalhando com Streams",
    order: 63,
    points: 10,
    bodyMd: `Processe dados em pedaços com streams.

## Streams de Leitura

\`\`\`xs
import { criarStreamLeitura } from "xs:fs"
import { criarStreamEscrita } from "xs:fs"

CRIA leitura = criarStreamLeitura("grande-arquivo.txt")
CRIA escrita = criarStreamEscrita("saida.txt")

leitura.ao("dados", (pedaco) => {
  escrita.escrever(pedaco)
})

leitura.ao("fim", () => {
  escrita.fechar()
})
\`\`\`

## Streams de Transformação

\`\`\`xs
import { criarStreamTransformacao } from "xs:streams"

CRIA maiusculas = criarStreamTransformacao((pedaco) => {
  VOLTA pedaco.toString().maiusculo()
})
\`\`\`

## Pipe

\`\`\`xs
leitura.pipe(maiusculas).pipe(escrita)
\`\`\`

## Backpressure

Streams lidam com backpressure automaticamente.

Streams são eficientes para processar grandes conjuntos de dados sem carregar tudo na memória.`,
    challenges: [
      { question: "Streams processam dados em ...", answer: "pedaços / chunks", points: 3 },
      { question: "Como conectar streams?", answer: "pipe", points: 3 },
      { question: "O que backpressure previne?", answer: "sobrecarga do consumidor", points: 5 },
    ],
  },
  {
    slug: "buffers-e-arrays-de-bytes",
    title: "Buffers e Arrays de Bytes",
    order: 64,
    points: 5,
    bodyMd: `Trabalhe com dados binários.

## Criando Buffers

\`\`\`xs
import { Buffer } from "xs:buffer"

// A partir de string
CRIA buf = Buffer.de("Olá")

// Com tamanho
CRIA buf2 = Buffer.alocar(1024)

// A partir de array
CRIA buf3 = Buffer.de([0x48, 0x65, 0x6c])
\`\`\`

## Lendo e Escrevendo

\`\`\`xs
CRIA buf = Buffer.alocar(4)

// Escrever
buf.escreverUInt8(0x48, 0)
buf.escreverUInt8(0x65, 1)

// Ler  
SOLTA O GRITO(buf.lerUInt8(0))  // 72
SOLTA O GRITO(buf.lerString())   // "He"
\`\`\`

## Codificações

- \`utf8\` (padrão)
- \`ascii\`
- \`base64\`
- \`hex\`

\`\`\`xs
CRIA str = buf.toString("base64")
\`\`\`

Buffers são essenciais para protocolos de rede, criptografia e processamento de arquivos.`,
    challenges: [
      { question: "Como criar um buffer de tamanho fixo?", answer: "Buffer.alloc(tamanho)", points: 3 },
      { question: "Qual codificação é padrão?", answer: "utf8", points: 3 },
      { question: "O que buffers armazenam?", answer: "dados binários brutos", points: 3 },
    ],
  },
  {
    slug: "operacoes-de-arquivo",
    title: "Operações de Arquivo",
    order: 65,
    points: 5,
    bodyMd: `Leia e escreva arquivos com XanaScript.

## Leitura

\`\`\`xs
import { readFile, readFileSync } from "xs:fs"

// Assíncrona (recomendada)
CRIA dados = ESPERA readFile("arquivo.txt", "utf8")

// Síncrona
CRIA dados = readFileSync("arquivo.txt", "utf8")
\`\`\`

## Escrita

\`\`\`xs
import { writeFile, writeFileSync } from "xs:fs"

// Assíncrona
ESPERA writeFile("arquivo.txt", "conteúdo", "utf8")

// Síncrona
writeFileSync("arquivo.txt", "conteúdo", "utf8")
\`\`\`

## Operações de Diretório

\`\`\`xs
import { mkdir, readdir, stat } from "xs:fs"

CRIA dirs = ESPERA readdir("./pasta")
CRIA info = ESPERA stat("arquivo.txt")
ESPERA mkdir("./nova-pasta")
\`\`\`

## File System Watch

\`\`\`xs
import { watch } from "xs:fs"

watch("./src", (evento, nome) => {
  SOLTA O GRITO("Arquivo alterado:", nome)
})
\`\`\`

Sempre use a versão assíncrona para IO, exceto em scripts de inicialização.`,
    challenges: [
      { question: "Versão assíncrona ou síncrona é recomendada?", answer: "assíncrona", points: 3 },
      { question: "Qual função lê arquivo?", answer: "readFile", points: 3 },
      { question: "Qual função escreve arquivo?", answer: "writeFile", points: 3 },
    ],
  },
  {
    slug: "programacao-de-rede",
    title: "Programação de Rede",
    order: 66,
    points: 10,
    bodyMd: `Crie clientes e servidores de rede.

## Servidor TCP

\`\`\`xs
import { criarServidor } from "xs:net"

CRIA servidor = criarServidor((conexao) => {
  SOLTA O GRITO("Cliente conectado")
  conexao.escrever("Olá do servidor XanaScript!")
  conexao.fechar()
})

servidor.ouvir(3000, () => {
  SOLTA O GRITO("Servidor ouvindo na porta 3000")
})
\`\`\`

## Servidor HTTP

\`\`\`xs
import { criarServidor } from "xs:http"

CRIA servidor = criarServidor((req, res) => {
  res.escreverCabecalho(200, { "Content-Type": "text/html" })
  res.fim("<h1>Olá Mundo</h1>")
})

servidor.ouvir(8080)
\`\`\`

## Cliente HTTP

\`\`\`xs
import { get, request } from "xs:http"

CRIA resposta = ESPERA get("https://api.exemplo.com/dados")
CRIA dados = ESPERA resposta.json()
\`\`\`

## WebSockets

\`\`\`xs
import { WebSocket } from "xs:ws"

CRIA ws = WebSocket.nova("ws://localhost:8080")
ws.ao("mensagem", (msg) => SOLTA O GRITO(msg))
\`\`\`

XanaScript fornece APIs de rede de alto nível para construção rápida de servidores.`,
    challenges: [
      { question: "Qual módulo fornece servidor HTTP?", answer: "xs:http", points: 3 },
      { question: "Qual módulo fornece servidor TCP?", answer: "xs:net", points: 3 },
      { question: "Qual função faz requisição GET?", answer: "get", points: 3 },
    ],
  },
  {
    slug: "processamento-assincrono-de-arquivos",
    title: "Processamento Assíncrono de Arquivos",
    order: 67,
    points: 10,
    bodyMd: `Padrões para processamento eficiente de arquivos.

## Leitura com Streams

\`\`\`xs
import { criarStreamLeitura } from "xs:fs"

CHAMA ESSE CARA processarGrandeArquivo(caminho) {
  VOLTA new Promise((resolver, rejeitar) => {
    CRIA stream = criarStreamLeitura(caminho)
    CRIA linhas = []

    stream.ao("dados", (pedaco) => {
      linhas.push(...pedaco.toString().quebrar("\\n"))
    })

    stream.ao("fim", () => resolver(linhas))
    stream.ao("erro", (erro) => rejeitar(erro))
  })
}
\`\`\`

## Processamento em Linha

\`\`\`xs
ESPERA processarGrandeArquivo("dados.txt")
  .entao((linhas) => {
    PARA CADA (linha EM linhas) {
      processar(linha)
    }
  })
\`\`\`

## Pipe com Transformações

\`\`\`xs
import { criarStreamTransformacao } from "xs:streams"

CRIA transform = criarStreamTransformacao(
  (pedaco) => pedaco.toString().maiusculo()
)

criarStreamLeitura("entrada.txt")
  .pipe(transform)
  .pipe(criarStreamEscrita("saida.txt"))
\`\`\`

Use streams para conjuntos de dados que não cabem na memória.`,
    challenges: [
      { question: "Por que usar streams para arquivos grandes?", answer: "não carregar tudo na memória", points: 5 },
      { question: "Qual evento sinaliza fim do stream?", answer: "fim / end", points: 3 },
      { question: "Qual evento sinaliza erro no stream?", answer: "erro / error", points: 3 },
    ],
  },
  {
    slug: "conceitos-de-banco-de-dados",
    title: "Conceitos de Banco de Dados",
    order: 68,
    points: 10,
    bodyMd: `Conecte e interaja com bancos de dados.

## Conexão

\`\`\`xs
import { conectar } from "xs:sqlite"

CRIA db = ESPERA conectar("meu-banco.db")
\`\`\`

## Consultas

\`\`\`xs
// Selecionar
CRIA usuarios = ESPERA db.consulta(
  "SELECT * FROM usuarios WHERE idade > ?",
  [18]
)

// Inserir
CRIA resultado = ESPERA db.executar(
  "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
  ["João", "joao@email.com"]
)
\`\`\`

## Prepared Statements

\`\`\`xs
CRIA stmt = ESPERA db.preparar(
  "INSERT INTO usuarios (nome) VALUES (?)"
)

PARA CADA (nome EM nomes) {
  ESPERA stmt.executar(nome)
}
\`\`\`

## ORM

\`\`\`xs
import { Modelo, Campos } from "xs:orm"

CLASSE Usuario estende Modelo {
  CRIA nome = Campos.texto()
  CRIA email = Campos.texto()
  CRIA idade = Campos.numero()
}
\`\`\`

Always parameterize queries to prevent injection.`,
    challenges: [
      { question: "Como prevenir SQL injection?", answer: "usar parâmetros/prepared statements", points: 5 },
      { question: "Qual função consulta o banco?", answer: "consulta / query", points: 3 },
      { question: "Qual comando modifica dados?", answer: "executar / execute", points: 3 },
    ],
  },
  {
    slug: "autenticacao-e-autorizacao",
    title: "Autenticação e Autorização",
    order: 69,
    points: 10,
    bodyMd: `Implemente segurança em suas aplicações.

## Autenticação

Verifique a identidade do usuário:

\`\`\`xs
CHAMA ESSE CARA autenticar(email, senha) {
  CRIA usuario = ESPERA db.consulta(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  )

  SE LIGA SO (!usuario) { JOGAR "Usuário não encontrado" }

  CRIA valida = ESPERA bcrypt.comparar(senha, usuario.senha)
  SE LIGA SO (!valida) { JOGAR "Senha inválida" }

  CRIA token = jwt.assinar(
    { id: usuario.id, email: usuario.email },
    SEGREDO_JWT,
    { expiraEm: "7d" }
  )

  VOLTA { usuario, token }
}
\`\`\`

## Autorização

Verifique permissões:

\`\`\`xs
CHAMA ESSE CARA verificarAdmin(token) {
  CRIA payload = jwt.verificar(token, SEGREDO_JWT)
  SE LIGA SO (!payload.admin) { JOGAR "Não autorizado" }
}
\`\`\`

## Middleware

\`\`\`xs
CHAMA ESSE CARA middleware(auth) (req, res, proximo) {
  TENTE {
    req.usuario = verificarToken(req.cabecalhos.auth)
    proximo()
  } CAPTURA (e) {
    res.status(401).json({ erro: "Não autenticado" })
  }
}
\`\`\`

Nunca armazene senhas em texto puro; use hash + salt.`,
    challenges: [
      { question: "Autenticação vs Autorização?", answer: "autenticação = quem é, autorização = o que pode fazer", points: 5 },
      { question: "Senhas devem ser armazenadas como?", answer: "hash + salt", points: 5 },
      { question: "O que JWT fornece?", answer: "um token de autenticação auto-contido", points: 3 },
    ],
  },
  {
    slug: "variaveis-de-ambiente-e-configuracao",
    title: "Variáveis de Ambiente e Configuração",
    order: 70,
    points: 5,
    bodyMd: `Gerencie configurações de forma segura.

## Variáveis de Ambiente

\`\`\`bash
# .env
DB_URL=localhost:5432
DB_USER=admin
DB_PASS=secreta
API_KEY=chave-da-api
\`\`\`

## Acessando

\`\`\`xs
CRIA dbUrl = processo.env.DB_URL
CRIA apiKey = processo.env.API_KEY
\`\`\`

## Configuração Segura

\`\`\`xs
CLASSE Config {
  CRIA dbUrl = processo.env.DB_URL
  CRIA dbUser = processo.env.DB_USER
  CRIA dbPass = processo.env.DB_PASS
  CRIA apiKey = processo.env.API_KEY

  CHAMA ESSE CARA ESTATICO carregar() {
    SE LIGA SO (!ISTO.dbUrl) {
      JOGAR "DB_URL não configurada"
    }
    VOLTA ISTO
  }
}

CRIA config = Config.carregar()
\`\`\`

## Boas Práticas

- Nunca commite secrets
- Valores padrão para desenvolvimento
- Valide no startup
- Use .env.example como template

Mantenha configurações fora do código.`,
    challenges: [
      { question: "Onde armazenar secrets?", answer: "variáveis de ambiente", points: 3 },
      { question: "O que validar no startup?", answer: "se todas as configs necessárias existem", points: 5 },
      { question: "Nunca commite ...", answer: "secrets / senhas / chaves", points: 3 },
    ],
  },
  {
    slug: "introducao-ao-cli-xanascript",
    title: "Introdução ao CLI XanaScript",
    order: 71,
    points: 5,
    bodyMd: `Construa ferramentas de linha de comando.

## Argumentos

\`\`\`xs
CRIA args = processo.argv.slice(2)
CRIA nome = args[0]

SOLTA O GRITO("Olá, " + nome + "!")
\`\`\`

## Parse de Argumentos

\`\`\`xs
import { parse } from "xs:args"

CRIA args = parse(processo.argv.slice(2), {
  flags: {
    nome: { tipo: "string", alias: "n" },
    verbose: { tipo: "booleano", alias: "v" }
  }
})

SOLTA O GRITO(args.flags.nome)
\`\`\`

## Cores no Terminal

\`\`\`xs
import { cores } from "xs:terminal"

SOLTA O GRITO(cores.verde("Sucesso!"))
SOLTA O GRITO(cores.vermelho("Erro!"))
SOLTA O GRITO(cores.negrito("Aviso"))
\`\`\`

## Entrada do Usuário

\`\`\`xs
import { prompt } from "xs:readline"

CRIA nome = ESPERA prompt("Qual seu nome? ")
SOLTA O GRITO("Olá, " + nome)
\`\`\`

XanaScript é excelente para ferramentas CLI rápidas e poderosas.`,
    challenges: [
      { question: "Onde estão os argumentos da linha de comando?", answer: "processo.argv", points: 3 },
      { question: "Qual módulo adiciona cores ao terminal?", answer: "xs:terminal", points: 3 },
      { question: "Qual módulo lê entrada do usuário?", answer: "xs:readline", points: 3 },
    ],
  },
  {
    slug: "programacao-web-com-xanascript",
    title: "Programação Web com XanaScript",
    order: 72,
    points: 5,
    bodyMd: `Construa aplicações web com XanaScript.

## Roteamento

\`\`\`xs
import { Roteador } from "xs:http"

CRIA roteador = Roteador.novo()

roteador.get("/", (req, res) => {
  res.json({ mensagem: "Bem-vindo à API" })
})

roteador.get("/usuarios/:id", (req, res) => {
  CRIA id = req.params.id
  res.json({ usuario: { id } })
})

roteador.post("/usuarios", async (req, res) => {
  CRIA dados = req.corpo
  res.status(201).json({ criado: dados })
})
\`\`\`

## Servindo Arquivos Estáticos

\`\`\`xs
import { servirEstatico } from "xs:http"

roteador.usar(servirEstatico("./publico"))
\`\`\`

## Middleware

\`\`\`xs
CHAMA ESSE CARA logger(req, res, proximo) {
  SOLTA O GRITO(req.metodo + " " + req.url)
  proximo()
}

roteador.usar(logger)
\`\`\`

XanaScript torna a construção de APIs web rápida e intuitiva.`,
    challenges: [
      { question: "Qual função lida com GET?", answer: "roteador.get()", points: 3 },
      { question: "Qual função serve arquivos estáticos?", answer: "servirEstatico", points: 3 },
      { question: "Middlewares processam ...", answer: "requisições antes do handler", points: 3 },
    ],
  },
  {
    slug: "frameworks-web",
    title: "Frameworks Web",
    order: 73,
    points: 10,
    bodyMd: `Use frameworks web para produtividade máxima.

## Express (Estilo)

\`\`\`xs
import { express } from "xs:express"

CRIA app = express()

app.get("/api/usuarios", (req, res) => {
  CRIA usuarios = ESPERA db.buscarTodos()
  res.json(usuarios)
})

app.ouvir(3000)
\`\`\`

## Validação

\`\`\`xs
app.post("/api/usuarios", Validar({
  nome: "obrigatório|string",
  email: "obrigatório|email",
  idade: "opcional|numero|min:18"
}), (req, res) => {
  // req.corpo validado
})
\`\`\`

## Tratamento de Erros Global

\`\`\`xs
app.usar((erro, req, res, proximo) => {
  Logger.erro(erro)
  res.status(500).json({ erro: erro.mensagem })
})
\`\`\`

Frameworks fornecem estrutura e convenções para construir aplicações consistentes.`,
    challenges: [
      { question: "O que é middleware de erro?", answer: "handler com parâmetro de erro", points: 3 },
      { question: "Por que usar validação de entrada?", answer: "garantir dados corretos antes do processamento", points: 5 },
      { question: "Qual porta o servidor ouve?", answer: "3000", points: 3 },
    ],
  },
  {
    slug: "bancos-de-dados-relacionais",
    title: "Bancos de Dados Relacionais",
    order: 74,
    points: 10,
    bodyMd: `Trabalhe com bancos SQL.

## Conexão e Consultas

\`\`\`xs
import { conectar } from "xs:pg"

CRIA db = ESPERA conectar({
  host: "localhost",
  porta: 5432,
  database: "meuapp"
})

CRIA resultado = ESPERA db.consulta(
  "SELECT * FROM usuarios WHERE ativo = $1",
  [true]
)
\`\`\`

## Transações

\`\`\`xs
CRIA transacao = ESPERA db.iniciarTransacao()

TENTE {
  ESPERA transacao.executar(
    "UPDATE contas SET saldo = saldo - 100 WHERE id = $1",
    [1]
  )
  ESPERA transacao.executar(
    "UPDATE contas SET saldo = saldo + 100 WHERE id = $1",
    [2]
  )
  ESPERA transacao.confirmar()
} CAPTURA (e) {
  ESPERA transacao.reverter()
  JOGAR e
}
\`\`\`

## Migrations

\`\`\`xs
// migrations/001_criar_usuarios.xs
CHAMA ESSE CARA subir(db) {
  ESPERA db.executar(\`
    CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  \`)
}
\`\`\`

Bancos relacionais fornecem integridade de dados e consultas poderosas.`,
    challenges: [
      { question: "Qual comando inicia uma transação?", answer: "iniciarTransacao / beginTransaction", points: 3 },
      { question: "Qual comando finaliza uma transação?", answer: "confirmar / commit", points: 3 },
      { question: "O que é uma migration?", answer: "código que evolui o esquema do banco", points: 5 },
    ],
  },
  {
    slug: "bancos-de-dados-nosql",
    title: "Bancos de Dados NoSQL",
    order: 75,
    points: 10,
    bodyMd: `Trabalhe com bancos NoSQL como MongoDB.

## Conexão

\`\`\`xs
import { MongoCliente } from "xs:mongo"

CRIA cliente = MongoCliente.novo("mongodb://localhost:27017")
CRIA db = cliente.db("meuapp")
CRIA colecao = db.colecao("usuarios")
\`\`\`

## Operações CRUD

\`\`\`xs
// Criar
CRIA resultado = ESPERA colecao.inserirUm({
  nome: "João",
  email: "joao@email.com"
})

// Ler
CRIA usuario = ESPERA colecao.buscarUm({ email: "joao@email.com" })

// Atualizar
ESPERA colecao.atualizarUm(
  { _id: usuario._id },
  { $set: { nome: "João Silva" } }
)

// Deletar
ESPERA colecao.deletarUm({ _id: usuario._id })
\`\`\`

## Indexes

\`\`\`xs
ESPERA colecao.criarIndex({ email: 1 }, { unico: true })
\`\`\`

NoSQL oferece flexibilidade de esquema e escalabilidade horizontal.`,
    challenges: [
      { question: "NoSQL é um banco relacional?", answer: "não", points: 3 },
      { question: "Qual função insere um documento?", answer: "inserirUm / insertOne", points: 3 },
      { question: "Qual benefício do NoSQL?", answer: "flexibilidade de esquema", points: 3 },
    ],
  },
  {
    slug: "caching-com-xanascript",
    title: "Caching com XanaScript",
    order: 76,
    points: 10,
    bodyMd: `Melhore desempenho com caching.

## Cache em Memória

\`\`\`xs
import { Cache } from "xs:cache"

CRIA cache = Cache.novo({ ttl: 60000 }) // 1 minuto

CHAMA ESSE CARA buscarUsuario(id) {
  CRIA chave = "usuario:" + id

  CRIA cached = cache.get(chave)
  SE LIGA SO (cached) { VOLTA cached }

  CRIA usuario = ESPERA db.buscar(id)
  cache.set(chave, usuario)
  VOLTA usuario
}
\`\`\`

## Redis

\`\`\`xs
import { conectar } from "xs:redis"

CRIA redis = ESPERA conectar({ url: "redis://localhost:6379" })
ESPERA redis.set("chave", "valor", "EX", 3600)
CRIA valor = ESPERA redis.get("chave")
\`\`\`

## Estratégias de Cache

- **Cache-Aside**: app verifica cache, então DB
- **Write-Through**: escreve em ambos simultaneamente
- **Write-Behind**: escreve no cache, depois DB assíncrono

## Invalidando Cache

\`\`\`xs
CHAMA ESSE CARA atualizarUsuario(id, dados) {
  ESPERA db.atualizar(id, dados)
  cache.del("usuario:" + id)
}
\`\`\`

Cache melhora drasticamente a latência e reduz carga no banco.`,
    challenges: [
      { question: "O que TTL significa?", answer: "time to live / tempo de vida", points: 3 },
      { question: "Cache coloca dados onde?", answer: "na memória para acesso rápido", points: 3 },
      { question: "O que cache reduz?", answer: "carga no banco de dados", points: 3 },
    ],
  },
  {
    slug: "introducao-a-eventos",
    title: "Introdução a Eventos",
    order: 77,
    points: 5,
    bodyMd: `Programação orientada a eventos.

## Emissor de Eventos

\`\`\`xs
import { EmissorEventos } from "xs:events"

CRIA emissor = EmissorEventos.novo()

// Ouvir evento
emissor.ao("dadosRecebidos", (dados) => {
  SOLTA O GRITO("Dados recebidos:", dados)
})

// Emitir evento
emissor.emitir("dadosRecebidos", { id: 1, nome: "teste" })
\`\`\`

## Removendo Listeners

\`\`\`xs
CHAMA ESSE CARA handler(dados) {
  SOLTA O GRITO(dados)
}

emissor.ao("evento", handler)
emissor.remover("evento", handler) // remove específico
emissor.removerTodos("evento")     // remove todos
\`\`\`

## Eventos Únicos

\`\`\`xs
emissor.umaVez("unico", () => {
  SOLTA O GRITO("Só executa uma vez")
})
\`\`\`

Objetos XanaScript podem estender EmissorEventos para expor eventos.`,
    challenges: [
      { question: "Como ouvir um evento?", answer: "emissor.on('evento', handler)", points: 3 },
      { question: "Como emitir um evento?", answer: "emissor.emitir('evento', dados)", points: 3 },
      { question: "Como ouvir evento uma única vez?", answer: "emissor.umaVez('evento', handler)", points: 3 },
    ],
  },
  {
    slug: "padrao-observador",
    title: "Padrão Observador",
    order: 78,
    points: 5,
    bodyMd: `Um objeto (sujeito) notifica múltiplos observadores sobre mudanças.

## Estrutura

\`\`\`xs
CLASSE Sujeito {
  CRIA observadores = []

  CHAMA ESSE CARA inscrever(obs) {
    ISTO.observadores.push(obs)
  }

  CHAMA ESSE CARA cancelar(obs) {
    ISTO.observadores = ISTO.observadores
      .filter(o => o !== obs)
  }

  CHAMA ESSE CARA notificar(dados) {
    ISTO.observadores
      .paraCada(obs => obs.atualizar(dados))
  }
}
\`\`\`

## Observador

\`\`\`xs
CLASSE LoggerObs {
  CHAMA ESSE CARA atualizar(dados) {
    SOLTA O GRITO("LOG:", dados)
  }
}

CLASSE AlertaObs {
  CHAMA ESSE CARA atualizar(dados) {
    SE LIGA SO (dados.urgente) {
      SOLTA O GRITO("ALERTA!")
    }
  }
}
\`\`\`

## Uso

\`\`\`xs
CRIA sujeito = Sujeito.novo()
sujeito.inscrever(LoggerObs.novo())
sujeito.inscrever(AlertaObs.novo())
sujeito.notificar({ msg: "teste", urgente: true })
\`\`\`

Útil para sistemas de eventos, notificações e atualizações de UI.`,
    challenges: [
      { question: "O sujeito notifica ...", answer: "observadores", points: 3 },
      { question: "Quantos observadores um sujeito pode ter?", answer: "múltiplos", points: 3 },
      { question: "Para que o padrão observador é útil?", answer: "notificações e atualizações", points: 3 },
    ],
  },
  {
    slug: "programacao-reativa",
    title: "Programação Reativa",
    order: 79,
    points: 10,
    bodyMd: `Programe com fluxos de dados assíncronos.

## Observáveis

\`\`\`xs
import { Observable } from "xs:reativo"

CRIA obs = Observable.novo((subscriber) => {
  subscriber.proximo(1)
  subscriber.proximo(2)
  subscriber.proximo(3)
  subscriber.completo()
})

obs.inscrever({
  proximo: (v) => SOLTA O GRITO(v),
  completo: () => SOLTA O GRITO("fim")
})
\`\`\`

## Operadores

\`\`\`xs
import { de, mapa, filtro } from "xs:reativo"

de([1, 2, 3, 4, 5])
  .pipe(
    mapa(x => x * 2),
    filtro(x => x > 5)
  )
  .inscrever(v => SOLTA O GRITO(v))
// Saída: 6, 8, 10
\`\`\`

## Subject

\`\`\`xs
import { Subject } from "xs:reativo"
CRIA subject = Subject.novo()
subject.inscrever(v => SOLTA O GRITO(v))
subject.proximo("dados")
\`\`\`

Programação reativa gerencia elegantemente fluxos de dados assíncronos e eventos.`,
    challenges: [
      { question: "O que subscribe recebe?", answer: "callbacks para proximo, erro, completo", points: 5 },
      { question: "Operadores como map e filter fazem o que?", answer: "transformam fluxos de dados", points: 5 },
      { question: "Subject é o quê?", answer: "um observable que também emite", points: 3 },
    ],
  },
  {
    slug: "webhooks-e-event-driven",
    title: "Webhooks e Arquitetura Orientada a Eventos",
    order: 80,
    points: 10,
    bodyMd: `Padrões para comunicação baseada em eventos.

## Webhook (Servidor)

\`\`\`xs
app.post("/webhook/pagamento", (req, res) => {
  CRIA evento = req.corpo

  // Processa evento
  processarPagamento(evento)

  // Responde rápido
  res.status(200).json({ recebido: true })
})
\`\`\`

## Webhook (Cliente)

\`\`\`xs
CHAMA ESSE CARA enviarWebhook(url, dados) {
  TENTE {
    CRIA resp = ESPERA fetch(url, {
      metodo: "POST",
      corpo: JSON.serializa(dados),
      cabecalhos: { "Content-Type": "application/json" }
    })
    SE LIGA SO (!resp.ok) { JOGAR "Webhook falhou" }
  } CAPTURA (erro) {
    Logger.erro("Webhook", erro)
    // Retry logic
  }
}
\`\`\`

## Event-Driven Architecture

\`\`\`xs
// Event Bus
CLASSE EventBus {
  CRIA subscribers = {}

  CHAMA ESSE CARA publicar(evento, dados) {
    CRIA subs = ISTO.subscribers[evento] || []
    subs.paraCada(cb => cb(dados))
  }

  CHAMA ESSE CARA inscrever(evento, cb) {
    (ISTO.subscribers[evento] ||= []).push(cb)
  }
}
\`\`\`

EDA desacopla componentes e melhora escalabilidade.`,
    challenges: [
      { question: "O que é uma arquitetura orientada a eventos?", answer: "componentes se comunicam via eventos", points: 5 },
      { question: "Webhook é push ou pull?", answer: "push", points: 3 },
      { question: "O que desacopla produtores e consumidores?", answer: "barramento de eventos / event bus", points: 5 },
    ],
  },
  {
    slug: "filas-e-processamento-assincrono",
    title: "Filas e Processamento Assíncrono",
    order: 81,
    points: 10,
    bodyMd: `Gerencie tarefas assíncronas com filas.

## Fila em Memória

\`\`\`xs
CLASSE Fila {
  CRIA itens = []
  CRIA processando = false

  CHAMA ESSE CARA adicionar(tarefa) {
    ISTO.itens.push(tarefa)
    SE LIGA SO (!ISTO.processando) { ISTO.processar() }
  }

  CHAMA ESSE CARA async processar() {
    ISTO.processando = true
    ENQUANTO (ISTO.itens.tamanho > 0) {
      CRIA tarefa = ISTO.itens.shift()
      TENTE {
        ESPERA tarefa()
      } CAPTURA (e) {
        Logger.erro("Tarefa falhou", e)
      }
    }
    ISTO.processando = false
  }
}
\`\`\`

## Filas Externas (RabbitMQ)

\`\`\`xs
import { conectar } from "xs:amqp"

CRIA conexao = ESPERA conectar("amqp://localhost")
CRIA canal = ESPERA conexao.criarCanal()

// Enviar
ESPERA canal.enviarParaFila("tarefas",
  Buffer.de(JSON.serializa({ tipo: "email" }))
)

// Consumir
canal.consumir("tarefas", (msg) => {
  CRIA dados = JSON.parse(msg.conteudo.toString())
  processar(dados)
})
\`\`\`

Filas permitem processamento assíncrono e desacoplamento entre serviços.`,
    challenges: [
      { question: "O que uma fila armazena?", answer: "tarefas para processamento assíncrono", points: 3 },
      { question: "Filas desacoplam ...", answer: "produtores e consumidores", points: 3 },
      { question: "Qual vantagem das filas?", answer: "processamento assíncrono e resiliência", points: 5 },
    ],
  },
  {
    slug: "containerizacao-com-xanascript",
    title: "Containerização com XanaScript",
    order: 82,
    points: 10,
    bodyMd: `Empacote aplicações XanaScript com Docker.

## Dockerfile

\`\`\`dockerfile
FROM xs:latest

WORKDIR /app

COPY package.json .
RUN xs install

COPY . .

RUN xs build

EXPOSE 3000

CMD ["xs", "run", "dist/main.xs"]
\`\`\`

## Docker Compose

\`\`\`yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_URL=postgres://db:5432/app
    depends_on:
      - db
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

## Multi-stage Build

\`\`\`dockerfile
# Estágio de build
FROM xs:latest AS build
WORKDIR /app
COPY . .
RUN xs build --otimizar

# Estágio de produção
FROM xs:alpine
COPY --from=build /app/dist ./dist
CMD ["xs", "run", "dist/main.xs"]
\`\`\`

Containerização garante ambientes consistentes e deploy simplificado.`,
    challenges: [
      { question: "O que um Dockerfile contém?", answer: "instruções para construir uma imagem", points: 3 },
      { question: "O que multi-stage build reduz?", answer: "tamanho da imagem final", points: 5 },
      { question: "Docker Compose gerencia ...", answer: "múltiplos containers", points: 3 },
    ],
  },
  {
    slug: "deploy-em-nuvem",
    title: "Deploy em Nuvem",
    order: 83,
    points: 10,
    bodyMd: `Faça deploy de aplicações XanaScript na nuvem.

## Provedores Suportados

XanaScript suporta deploy em:

- AWS Lambda
- Cloudflare Workers
- Vercel
- Netlify
- Servidor dedicado

## AWS Lambda

\`\`\`xs
// lambda.xs
export CHAMA ESSE CARA handler(evento, contexto) {
  VOLTA {
    statusCode: 200,
    corpo: JSON.serializa({
      mensagem: "Olá de XanaScript no Lambda!"
    })
  }
}
\`\`\`

## Vercel

\`\`\`json
// vercel.json
{
  "buildCommand": "xs build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.xs": {
      "runtime": "xs"
    }
  }
}
\`\`\`

## Deploy Manual

\`\`\`bash
xs build --otimizar
scp -r dist/* usuario@servidor:/app
ssh usuario@servidor "xs run /app/main.xs"
\`\`\`

Escolha o provedor baseado em suas necessidades de escala e orçamento.`,
    challenges: [
      { question: "XanaScript pode rodar no AWS Lambda?", answer: "sim", points: 3 },
      { question: "Qual comando faz build de produção?", answer: "xs build --otimizar", points: 3 },
      { question: "Qual é uma plataforma serverless suportada?", answer: "AWS Lambda, Vercel, Cloudflare, Netlify", points: 5 },
    ],
  },
  {
    slug: "ci-cd-para-xanascript",
    title: "CI/CD para XanaScript",
    order: 84,
    points: 10,
    bodyMd: `Automatize testes e deploys.

## GitHub Actions

\`\`\`yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: xs/setup-xs@v1
      - run: xs install
      - run: xs test
      - run: xs build
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: xs install && xs build
      - run: xs deploy
\`\`\`

## Scripts de CI

\`\`\`json
{
  "scripts": {
    "ci": "xs install && xs lint && xs test && xs build",
    "cd": "xs build --otimizar && xs deploy"
  }
}
\`\`\`

## Qualidade

- \`xs lint\`: verifica estilo
- \`xs test --cobertura\`: garante cobertura
- \`xs audit\`: verifica vulnerabilidades
- \`xs check\`: verifica tipos

CI/CD automatizado previne regressões e acelera entregas.`,
    challenges: [
      { question: "CI executa quando?", answer: "em cada push/pull request", points: 3 },
      { question: "CD significa ...", answer: "Continuous Deployment / Deploy Contínuo", points: 3 },
      { question: "Qual comando verifica vulnerabilidades?", answer: "xs audit", points: 3 },
    ],
  },
  {
    slug: "monitoramento-e-observabilidade",
    title: "Monitoramento e Observabilidade",
    order: 85,
    points: 10,
    bodyMd: `Monitore aplicações em produção.

## Métricas

\`\`\`xs
import { Meter } from "xs:metrics"

CRIA meter = Meter.novo("meuapp")

CRIA reqContador = meter.criarContador("requisicoes")
CRIA reqDuracao = meter.criarHistograma("req_duracao")

CHAMA ESSE CARA middleware(req, res, proximo) {
  CRIA inicio = Date.Agora()

  res.ao("fim", () => {
    reqContador.adicionar(1, { metodo: req.metodo })
    reqDuracao.observar(Date.Agora() - inicio)
  })

  proximo()
}
\`\`\`

## Logging Estruturado

\`\`\`xs
LOG.info("Usuário criado", {
  userId: usuario.id,
  acao: "criacao",
  duracao: ms
})
\`\`\`

## Tracing

\`\`\`xs
import { rastrear } from "xs:telemetria"

CHAMA ESSE CARA buscarUsuario(id) {
  VOLTA rastrear("buscarUsuario", { id }, () => {
    CRIA usuario = ESPERA db.buscar(id)
    ESPERA cache.set("usuario:" + id, usuario)
    VOLTA usuario
  })
}
\`\`\`

Observabilidade permite entender o comportamento do sistema em produção.`,
    challenges: [
      { question: "Quais são os três pilares da observabilidade?", answer: "métricas, logs, tracing", points: 5 },
      { question: "O que métricas medem?", answer: "valores numéricos ao longo do tempo", points: 3 },
      { question: "Tracing rastreia o quê?", answer: "o fluxo de uma requisição através do sistema", points: 5 },
    ],
  },
  {
    slug: "serializacao-json",
    title: "Serialização JSON",
    order: 86,
    points: 5,
    bodyMd: `Trabalhe com JSON em XanaScript.

## Serializar (Objeto → String)

\`\`\`xs
CRIA objeto = {
  nome: "João",
  idade: 30,
  ativo: true,
  tags: ["xs", "dev"]
}

CRIA json = JSON.serializa(objeto)
// '{"nome":"João","idade":30,"ativo":true,"tags":["xs","dev"]}'
\`\`\`

## Desserializar (String → Objeto)

\`\`\`xs
CRIA json = '{"nome":"João","idade":30}'
CRIA objeto = JSON.parse(json)
SOLTA O GRITO(objeto.nome)  // "João"
\`\`\`

## Formatação

\`\`\`xs
CRIA formatado = JSON.serializa(objeto, null, 2)
// Com indentação de 2 espaços
\`\`\`

## Reviver

\`\`\`xs
CRIA dados = JSON.parse(json, (chave, valor) => {
  SE LIGA SO (chave === "data") { VOLTA Data.nova(valor) }
  VOLTA valor
})
\`\`\`

JSON é o formato de intercâmbio de dados mais comum na web.`,
    challenges: [
      { question: "JSON.serializa converte objeto para ...", answer: "string", points: 3 },
      { question: "JSON.parse converte string para ...", answer: "objeto", points: 3 },
      { question: "Qual o uso do parâmetro reviver?", answer: "transformar valores durante o parse", points: 5 },
    ],
  },
  {
    slug: "apis-rest-com-xanascript",
    title: "APIs REST com XanaScript",
    order: 87,
    points: 10,
    bodyMd: `Construa APIs RESTful com XanaScript.

## CRUD Completo

\`\`\`xs
import { Roteador } from "xs:http"

CRIA router = Roteador.novo()
CRIA usuarios = []

// CREATE
router.post("/usuarios", (req, res) => {
  CRIA usuario = { id: usuarios.length + 1, ...req.corpo }
  usuarios.push(usuario)
  res.status(201).json(usuario)
})

// READ (todos)
router.get("/usuarios", (req, res) => {
  res.json(usuarios)
})

// READ (um)
router.get("/usuarios/:id", (req, res) => {
  CRIA usuario = usuarios.find(u => u.id === parseInt(req.params.id))
  SE LIGA SO (!usuario) { res.status(404).json({ erro: "Não encontrado" }) }
  res.json(usuario)
})

// UPDATE
router.put("/usuarios/:id", (req, res) => {
  CRIA idx = usuarios.findIndex(u => u.id === parseInt(req.params.id))
  SE LIGA SO (idx === -1) { res.status(404).json({ erro: "Não encontrado" }) }
  usuarios[idx] = { ...usuarios[idx], ...req.corpo }
  res.json(usuarios[idx])
})

// DELETE
router.delete("/usuarios/:id", (req, res) => {
  usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id))
  res.status(204).fim()
})
\`\`\`

## Métodos HTTP

- \`GET\`: buscar recurso(s)
- \`POST\`: criar recurso
- \`PUT\`: substituir recurso
- \`PATCH\`: atualizar parcialmente
- \`DELETE\`: remover recurso

Siga convenções REST para APIs previsíveis e consistentes.`,
    challenges: [
      { question: "Qual método cria um recurso?", answer: "POST", points: 3 },
      { question: "Qual método atualiza parcialmente?", answer: "PATCH", points: 3 },
      { question: "Qual status para criação bem-sucedida?", answer: "201", points: 3 },
    ],
  },
  {
    slug: "graphql-com-xanascript",
    title: "GraphQL com XanaScript",
    order: 88,
    points: 10,
    bodyMd: `Construa APIs GraphQL.

## Schema

\`\`\`xs
import { construirSchema } from "xs:graphql"

CRIA schema = construirSchema(\`
  type Usuario {
    id: ID!
    nome: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    titulo: String!
    conteudo: String!
  }

  type Query {
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario
  }

  type Mutation {
    criarUsuario(nome: String!, email: String!): Usuario!
  }
\`)
\`\`\`

## Resolvers

\`\`\`xs
CRIA resolvers = {
  Query: {
    usuarios: () => db.buscarTodos("usuarios"),
    usuario: (_, { id }) => db.buscarUm("usuarios", id)
  },
  Mutation: {
    criarUsuario: (_, args) => db.inserir("usuarios", args)
  }
}
\`\`\`

## Servidor

\`\`\`xs
import { criarServidorGraphQL } from "xs:graphql"

CRIA servidor = criarServidorGraphQL(schema, resolvers)
servidor.ouvir(4000)
\`\`\`

GraphQL permite que clientes busquem exatamente os dados que precisam.`,
    challenges: [
      { question: "GraphQL usa que tipo de requisição?", answer: "consulta/mutação", points: 3 },
      { question: "Query busca dados, Mutation ...", answer: "modifica dados", points: 3 },
      { question: "Qual vantagem do GraphQL sobre REST?", answer: "cliente decide quais dados buscar", points: 5 },
    ],
  },
  {
    slug: "websockets-com-xanascript",
    title: "WebSockets com XanaScript",
    order: 89,
    points: 10,
    bodyMd: `Comunicação bidirecional em tempo real.

## Servidor WebSocket

\`\`\`xs
import { ServidorWebSocket } from "xs:ws"

CRIA servidor = ServidorWebSocket.novo({ porta: 8080 })

servidor.ao("conexao", (ws) => {
  SOLTA O GRITO("Cliente conectado")

  ws.ao("mensagem", (msg) => {
    SOLTA O GRITO("Recebido:", msg.toString())

    // Echo
    ws.enviar("Servidor: " + msg)
  })

  ws.ao("fechar", () => {
    SOLTA O GRITO("Cliente desconectado")
  })

  ws.enviar("Bem-vindo ao servidor WebSocket XanaScript!")
})
\`\`\`

## Cliente WebSocket

\`\`\`xs
import { WebSocket } from "xs:ws"

CRIA ws = WebSocket.nova("ws://localhost:8080")

ws.ao("aberto", () => {
  SOLTA O GRITO("Conectado")
  ws.enviar("Olá servidor!")
})

ws.ao("mensagem", (dados) => {
  SOLTA O GRITO("Dados recebidos:", dados)
})

ws.ao("fechar", () => {
  SOLTA O GRITO("Conexão fechada")
})
\`\`\`

## Aplicações

- Chat em tempo real
- Notificações push
- Jogos multiplayer
- Dashboards ao vivo

WebSockets são perfeitos para aplicações que exigem baixa latência.`,
    challenges: [
      { question: "WebSocket é full-duplex?", answer: "sim", points: 3 },
      { question: "Qual evento indica conexão estabelecida?", answer: "aberto / open", points: 3 },
      { question: "Cite um caso de uso para WebSockets", answer: "chat, notificações, jogos, dashboards", points: 5 },
    ],
  },
  {
    slug: "testes-de-api",
    title: "Testes de API",
    order: 90,
    points: 10,
    bodyMd: `Teste suas APIs automaticamente.

## Teste de Requisição

\`\`\`xs
import { test, espera } from "xs:test"

test("GET /usuarios retorna lista", async () => {
  CRIA resposta = ESPERA fetch("http://localhost:3000/usuarios")
  espera(resposta.status).ser(200)

  CRIA dados = ESPERA resposta.json()
  espera(Array.seraArray(dados)).serVerdade()
})

test("POST /usuarios cria usuario", async () => {
  CRIA resposta = ESPERA fetch("http://localhost:3000/usuarios", {
    metodo: "POST",
    corpo: JSON.serializa({ nome: "João", email: "joao@e.com" }),
    cabecalhos: { "Content-Type": "application/json" }
  })

  espera(resposta.status).ser(201)
  CRIA dados = ESPERA resposta.json()
  espera(dados.nome).ser("João")
})
\`\`\`

## Testes com Autenticação

\`\`\`xs
test("GET /usuarios sem auth retorna 401", async () => {
  CRIA resposta = ESPERA fetch("http://localhost:3000/usuarios/admin")
  espera(resposta.status).ser(401)
})
\`\`\`

## Setup e Teardown

\`\`\`xs
test.beforeTodos(async () => {
  // Iniciar servidor
  servidor = criarServidor()
  ESPERA servidor.ouvir(3000)
})

test.depoisTodos(() => {
  servidor.fechar()
})
\`\`\`

Testes de API garantem que seus endpoints funcionem corretamente.`,
    challenges: [
      { question: "Qual método testa GET?", answer: "fetch com GET", points: 3 },
      { question: "Qual status esperado para criação?", answer: "201", points: 3 },
      { question: "Testes de API previnem o quê?", answer: "regressões em endpoints", points: 5 },
    ],
  },
  {
    slug: "boas-praticas-de-seguranca",
    title: "Boas Práticas de Segurança",
    order: 91,
    points: 10,
    bodyMd: `Proteja suas aplicações XanaScript.

## Validação de Entrada

Sempre valide e sanitize entradas do usuário:

\`\`\`xs
CHAMA ESSE CARA sanitizar(texto) {
  VOLTA texto
    .substituir(/<script>/gi, "")
    .substituir(/on\\w+=/gi, "")
}
\`\`\`

## Headers de Segurança

\`\`\`xs
app.usar((req, res, proximo) => {
  res.definirCabecalho("X-Content-Type-Options", "nosniff")
  res.definirCabecalho("X-Frame-Options", "DENY")
  res.definirCabecalho("X-XSS-Protection", "1; mode=block")
  res.definirCabecalho("Strict-Transport-Security", "max-age=31536000")
  proximo()
})
\`\`\`

## Rate Limiting

\`\`\`xs
import { limitadorTaxa } from "xs:http"

app.usar(limitadorTaxa({
  janelaMs: 60000,
  maximo: 100,
  mensagem: "Muitas requisições"
}))
\`\`\`

## Práticas Gerais

- Use HTTPS em produção
- Hash de senhas (bcrypt)
- CSRF tokens para formulários
- Princípio do menor privilégio
- Mantenha dependências atualizadas

Segurança é uma preocupação contínua, não uma configuração única.`,
    challenges: [
      { question: "Como prevenir XSS?", answer: "sanitizar entrada do usuário", points: 5 },
      { question: "Como prevenir força bruta?", answer: "rate limiting", points: 3 },
      { question: "Senhas devem ser armazenadas com ...", answer: "hash (bcrypt)", points: 5 },
    ],
  },
  {
    slug: "lidando-com-cors",
    title: "Lidando com CORS",
    order: 92,
    points: 5,
    bodyMd: `Gerencie Cross-Origin Resource Sharing.

## O Problema

Browsers bloqueiam requisições de origens diferentes por padrão.

## Solução com Middleware

\`\`\`xs
import { cors } from "xs:http"

app.usar(cors())

// Ou configuração personalizada:
app.usar(cors({
  origens: ["https://meusite.com"],
  metodos: ["GET", "POST", "PUT", "DELETE"],
  credenciais: true
}))
\`\`\`

## CORS Manual

\`\`\`xs
app.usar((req, res, proximo) => {
  res.definirCabecalho("Access-Control-Allow-Origin", "*")
  res.definirCabecalho("Access-Control-Allow-Methods", "GET, POST")
  res.definirCabecalho("Access-Control-Allow-Headers", "Content-Type")

  SE LIGA SO (req.metodo === "OPTIONS") {
    res.status(204).fim()
  } SENAO {
    proximo()
  }
})
\`\`\`

## Preflight

Requisições OPTIONS são enviadas automaticamente pelo browser para métodos não-simples.

Configure CORS corretamente para permitir acesso de origens confiáveis.`,
    challenges: [
      { question: "O que CORS significa?", answer: "Cross-Origin Resource Sharing", points: 3 },
      { question: "Qual método HTTP de preflight?", answer: "OPTIONS", points: 3 },
      { question: "CORS é uma segurança do ...", answer: "browser/navegador", points: 3 },
    ],
  },
  {
    slug: "variaveis-de-ambiente-avancado",
    title: "Variáveis de Ambiente Avançado",
    order: 93,
    points: 5,
    bodyMd: `Gerencie configurações complexas.

## Múltiplos Ambientes

\`\`\`xs
// .env.desenvolvimento
DB_URL=localhost:5432/dev

// .env.producao
DB_URL=producao-db:5432/prod
\`\`\`

\`\`\`xs
CHAMA ESSE CARA carregarEnv() {
  CRIA ambiente = processo.env.NODE_ENV || "desenvolvimento"
  CRIA caminho = ".env." + ambiente
  CRIA config = {}
  // carregar arquivo
  VOLTA config
}
\`\`\`

## Validação de Schema

\`\`\`xs
import { z } from "xs:zod"

CRIA EnvSchema = z.objeto({
  DB_URL: z.string().url(),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(8),
  PORT: z.coercao.numero().padrao(3000)
})

CRIA env = EnvSchema.parse(processo.env)
\`\`\`

## Config Hierárquica

\`\`\`xs
CLASSE Config {
  CRIA db = {
    url: processo.env.DB_URL,
    pool: {
      min: parseInt(processo.env.DB_POOL_MIN || "2"),
      max: parseInt(processo.env.DB_POOL_MAX || "10")
    }
  }
}
\`\`\`

Valide configurações no startup para falhar rápido.`,
    challenges: [
      { question: "Como gerenciar múltiplos ambientes?", answer: "arquivos .env separados por ambiente", points: 5 },
      { question: "Qual biblioteca valida schemas?", answer: "zod / z", points: 3 },
      { question: "Quando validar configurações?", answer: "no startup / inicialização", points: 3 },
    ],
  },
  {
    slug: "sessao-e-cookies",
    title: "Sessão e Cookies",
    order: 94,
    points: 5,
    bodyMd: `Gerencie estado do usuário.

## Cookies

\`\`\`xs
// Definir cookie
res.definirCabecalho("Set-Cookie",
  "token=abc123; HttpOnly; Secure; Max-Age=3600"
)

// Ler cookie
CRIA cookies = req.cabecalhos.cookie || ""
\`\`\`

## Sessão

\`\`\`xs
import { sessao } from "xs:http"

app.usar(sessao({
  segredo: "meu-segredo",
  nomeCookie: "sessao_id",
  maxIdade: 24 * 60 * 60 // 1 dia
}))

// Usar sessão
app.get("/perfil", (req, res) => {
  SE LIGA SO (!req.sessao.usuarioId) {
    res.status(401).json({ erro: "Não autenticado" })
    VOLTA
  }
  res.json({ usuarioId: req.sessao.usuarioId })
})
\`\`\`

## Sessão em Banco

\`\`\`xs
import { SessaoStore } from "xs:http"

app.usar(sessao({
  store: SessaoStore.banco(db),
  segredo: "segredo"
}))
\`\`\`

Sessões permitem estado persistente entre requisições HTTP.`,
    challenges: [
      { question: "O que HttpOnly faz?", answer: "impede acesso JavaScript ao cookie", points: 5 },
      { question: "Flag Secure exige ...", answer: "HTTPS", points: 3 },
      { question: "Sessões permitem o quê?", answer: "estado persistente entre requisições", points: 3 },
    ],
  },
  {
    slug: "upload-de-arquivos",
    title: "Upload de Arquivos",
    order: 95,
    points: 10,
    bodyMd: `Receba e processe arquivos enviados.

## Upload Simples

\`\`\`xs
app.post("/upload", async (req, res) => {
  CRIA arquivo = req.arquivos?.arquivo

  SE LIGA SO (!arquivo) {
    res.status(400).json({ erro: "Nenhum arquivo enviado" })
    VOLTA
  }

  CRIA caminho = "./uploads/" + arquivo.nome
  ESPERA writeFile(caminho, arquivo.dados)

  res.json({
    mensagem: "Upload feito",
    nome: arquivo.nome,
    tamanho: arquivo.dados.tamanho
  })
})
\`\`\`

## Validação

\`\`\`xs
CHAMA ESSE CARA validarArquivo(arquivo) {
  CRIA tiposPermitidos = ["image/jpeg", "image/png", "application/pdf"]
  CRIA maxTamanho = 5 * 1024 * 1024 // 5MB

  SE LIGA SO (!tiposPermitidos.inclui(arquivo.tipo)) {
    JOGAR "Tipo de arquivo não permitido"
  }

  SE LIGA SO (arquivo.tamanho > maxTamanho) {
    JOGAR "Arquivo muito grande"
  }

  VOLTA true
}
\`\`\`

## Múltiplos Arquivos

\`\`\`xs
app.post("/uploads", async (req, res) => {
  CRIA arquivos = req.arquivos?.arquivos || []
  CRIA resultados = []

  PARA CADA (arquivo EM arquivos) {
    CRIA caminho = "./uploads/" + arquivo.nome
    ESPERA writeFile(caminho, arquivo.dados)
    resultados.push({ nome: arquivo.nome, status: "ok" })
  }

  res.json(resultados)
})
\`\`\`

Sempre valide tipo e tamanho de arquivos enviados.`,
    challenges: [
      { question: "Onde validar uploads?", answer: "tipo MIME e tamanho", points: 3 },
      { question: "5MB é quantos bytes?", answer: "5 * 1024 * 1024", points: 3 },
      { question: "Como acessar arquivo enviado?", answer: "req.arquivos.arquivo", points: 3 },
    ],
  },
  {
    slug: "processamento-de-imagens",
    title: "Processamento de Imagens",
    order: 96,
    points: 10,
    bodyMd: `Manipule imagens com XanaScript.

## Redimensionar

\`\`\`xs
import { Image } from "xs:image"

CRIA img = ESPERA Image.carregar("foto.jpg")
CRIA redimensionada = img.redimensionar(800, 600)
ESPERA redimensionada.salvar("foto_redimensionada.jpg")
\`\`\`

## Formatos

\`\`\`xs
// Converter formato
ESPERA img.salvar("foto.png")
ESPERA img.salvar("foto.webp", { qualidade: 80 })
\`\`\`

## Filtros

\`\`\`xs
img.desfocar(5)
img.tonsDeCinza()
img.inverter()
img.cortar({ x: 100, y: 100, largura: 300, altura: 300 })
\`\`\`

## Thumbnail

\`\`\`xs
CHAMA ESSE CARA criarThumbnail(caminho) {
  CRIA img = ESPERA Image.carregar(caminho)
  CRIA thumb = img.redimensionar(150, 150, { ajustar: "cobrir" })
  CRIA nome = "thumb_" + caminho
  ESPERA thumb.salvar(nome)
  VOLTA nome
}
\`\`\`

Processamento de imagens permite otimizar uploads e criar variações.`,
    challenges: [
      { question: "Qual método redimensiona?", answer: "redimensionar / resize", points: 3 },
      { question: "Qual formato WebP suporta?", answer: "imagens com compressão moderna", points: 3 },
      { question: "Thumbnails são úteis para ...", answer: "visualizações rápidas e economia de banda", points: 5 },
    ],
  },
  {
    slug: "internacionalizacao",
    title: "Internacionalização (i18n)",
    order: 97,
    points: 5,
    bodyMd: `Prepare sua aplicação para múltiplos idiomas.

## Configuração

\`\`\`xs
import { i18n } from "xs:i18n"

i18n.configurar({
  padrao: "pt-BR",
  diretorio: "./locales",
  deteccaoIdioma: ["cabecalho", "cookie", "url"]
})
\`\`\`

## Arquivos de Tradução

\`\`\`json
// locales/pt-BR.json
{
  "saudacao": "Olá, {nome}!",
  "bemVindo": "Bem-vindo ao sistema"
}

// locales/en-US.json
{
  "saudacao": "Hello, {nome}!",
  "bemVindo": "Welcome to the system"
}
\`\`\`

## Uso

\`\`\`xs
SOLTA O GRITO(i18n.t("saudacao", { nome: "João" }))
// "Olá, João!"

CRIA idioma = i18n.idiomaAtual()
// "pt-BR"
\`\`\`

## Rotas Localizadas

\`\`\`xs
app.get("/:lang/sobre", (req, res) => {
  i18n.definirIdioma(req.params.lang)
  res.render("sobre")
})
\`\`\`

i18n torna sua aplicação acessível globalmente.`,
    challenges: [
      { question: "Qual o padrão ISO para português brasileiro?", answer: "pt-BR", points: 3 },
      { question: "O que i18n significa?", answer: "internationalization (18 letras)", points: 3 },
      { question: "Como passar variáveis em traduções?", answer: "interpolação com {variavel}", points: 5 },
    ],
  },
  {
    slug: "testes-de-carga-e-estresse",
    title: "Testes de Carga e Estresse",
    order: 98,
    points: 10,
    bodyMd: `Teste desempenho sob pressão.

## Teste de Carga

\`\`\`xs
import { testeCarga } from "xs:test"

testeCarga({
  url: "http://localhost:3000/usuarios",
  conexoes: 50,
  duracao: "30s",
  metodo: "GET",
  headers: { Authorization: "Bearer token" }
}).entao(resultado => {
  SOLTA O GRITO("Total reqs:", resultado.totalRequisicoes)
  SOLTA O GRITO("Req/s:", resultado.requisicoesPorSegundo)
  SOLTA O GRITO("Latência média:", resultado.latenciaMedia + "ms")
  SOLTA O GRITO("Erros:", resultado.totalErros)
})
\`\`\`

## Teste de Estresse

\`\`\`xs
testeCarga({
  url: "http://localhost:3000/usuarios",
  conexoes: [10, 50, 100, 500, 1000],
  duracao: "60s",
  rampUp: true // aumenta gradualmente
}).entao(resultado => {
  CRIA pontoRuptura = resultado.pontos.find(p => p.erros > p.total * 0.05)
  SOLTA O GRITO("Ponto de ruptura:", pontoRuptura?.conexoes)
})
\`\`\`

## Métricas Importantes

- Requisições por segundo
- Latência (p50, p95, p99)
- Taxa de erro
- Uso de recursos

Testes de carga revelam gargalos antes de afetar usuários reais.`,
    challenges: [
      { question: "O que teste de carga mede?", answer: "desempenho sob carga esperada", points: 3 },
      { question: "O que teste de estresse descobre?", answer: "o ponto de ruptura do sistema", points: 5 },
      { question: "p95 de latência significa o quê?", answer: "95% das requisições são mais rápidas que esse valor", points: 5 },
    ],
  },
  {
    slug: "otimizacao-de-consultas",
    title: "Otimização de Consultas",
    order: 99,
    points: 10,
    bodyMd: `Escreva consultas de banco de dados eficientes.

## EXPLAIN

\`\`\`xs
CRIA plano = ESPERA db.consulta("EXPLAIN ANALYZE SELECT * FROM usuarios WHERE email = $1", [email])
SOLTA O GRITO(plano)
\`\`\`

## Indexação

\`\`\`xs
-- Índices compostos para consultas comuns
CRIAR INDICE idx_usuarios_email_ativo ON usuarios(email, ativo)

-- Índices parciais
CRIAR INDICE idx_usuarios_admin ON usuarios(id) ONDE admin = true
\`\`\`

## N+1 Problem

\`\`\`xs
// Ruim: N+1 consultas
CRIA pedidos = ESPERA db.consulta("SELECT * FROM pedidos")
PARA CADA (pedido EM pedidos) {
  CRIA itens = ESPERA db.consulta(
    "SELECT * FROM itens WHERE pedido_id = $1",
    [pedido.id]
  )
}

// Bom: JOIN único
CRIA resultados = ESPERA db.consulta(\`
  SELECT p.*, i.*
  FROM pedidos p
  JOIN itens i ON i.pedido_id = p.id
\`)
\`\`\`

## Paginação

\`\`\`xs
CHAMA ESSE CARA buscarUsuarios(pagina = 1, limite = 20) {
  CRIA offset = (pagina - 1) * limite
  VOLTA db.consulta(
    "SELECT * FROM usuarios ORDER BY id LIMIT $1 OFFSET $2",
    [limite, offset]
  )
}
\`\`\`

Consultas otimizadas são críticas para desempenho em escala.`,
    challenges: [
      { question: "Qual comando analisa performance de consulta?", answer: "EXPLAIN ANALYZE", points: 5 },
      { question: "O problema N+1 é sobre ...", answer: "consultas excessivas em loops", points: 5 },
      { question: "Para que servem índices?", answer: "acelerar consultas no banco", points: 3 },
    ],
  },
  {
    slug: "caching-avancado",
    title: "Caching Avançado",
    order: 100,
    points: 10,
    bodyMd: `Estratégias avançadas de cache.

## Cache de Camada Dupla

\`\`\`xs
CLASSE CacheDuplo {
  CHAMA ESSE CARA buscar(chave, fnBusca) {
    // Primeiro: cache L1 (memória local)
    CRIA l1 = cacheL1.get(chave)
    SE LIGA SO (l1) { VOLTA l1 }

    // Segundo: cache L2 (Redis)
    CRIA l2 = ESPERA cacheL2.get(chave)
    SE LIGA SO (l2) {
      cacheL1.set(chave, l2)
      VOLTA l2
    }

    // Miss: buscar da origem
    CRIA dados = ESPERA fnBusca()
    cacheL1.set(chave, dados)
    ESPERA cacheL2.set(chave, dados, "EX", 3600)
    VOLTA dados
  }
}
\`\`\`

## Cache de Função

\`\`\`xs
CHAMA ESSE CARA memoizar(fn, ttlMs = 60000) {
  CRIA cache = {}

  CHAMA ESSE CARA memoizada(...args) {
    CRIA chave = JSON.serializa(args)
    CRIA entrada = cache[chave]

    SE LIGA SO (entrada && Date.Agora() < entrada.expiracao) {
      VOLTA entrada.valor
    }

    CRIA resultado = fn(...args)
    cache[chave] = { valor: resultado, expiracao: Date.Agora() + ttlMs }
    VOLTA resultado
  }

  VOLTA memoizada
}

CRIA buscaCached = memoizar(buscarUsuario, 30000)
\`\`\`

## Cache Invalidation Tags

\`\`\`xs
CHAMA ESSE CARA invalidarPorTag(tag) {
  CRIA chaves = ESPERA redis.keys("cache:" + tag + ":*")
  SE LIGA SO (chaves.tamanho > 0) {
    ESPERA redis.del(...chaves)
  }
}
\`\`\`

Estratégias avançadas de cache maximizam taxa de acerto e minimizam latência.`,
    challenges: [
      { question: "O que é cache de camada dupla?", answer: "L1 (memória) + L2 (Redis)", points: 5 },
      { question: "Memoização cacheia ...", answer: "resultados de funções baseado em argumentos", points: 3 },
      { question: "Cache invalidation é ...", answer: "remover/atualizar entradas quando dados mudam", points: 5 },
    ],
  },
  {
    slug: "testes-de-seguranca",
    title: "Testes de Segurança",
    order: 101,
    points: 10,
    bodyMd: `Teste vulnerabilidades de segurança.

## Teste de Injeção

\`\`\`xs
test("Proteção contra SQL injection", async () => {
  CRIA payloads = [
    "'; DROP TABLE usuarios; --",
    "' OR '1'='1",
    "'; SELECT * FROM senhas; --"
  ]

  PARA CADA (payload EM payloads) {
    CRIA resposta = ESPERA fetch("/api/login", {
      metodo: "POST",
      corpo: JSON.serializa({
        email: payload,
        senha: "teste"
      })
    })
    // Não deve retornar dados de usuário
    espera(resposta.status).ser(401)
  }
})
\`\`\`

## Teste de XSS

\`\`\`xs
test("Proteção contra XSS", async () => {
  CRIA resposta = ESPERA fetch("/api/comentario", {
    metodo: "POST",
    corpo: JSON.serializa({
      texto: "<script>alert('xss')</script>"
    })
  })

  CRIA dados = ESPERA resposta.json()
  espera(dados.texto).nao.conter("<script>")
})
\`\`\`

## Análise de Dependências

\`\`\`bash
xs audit
xs audit --severidade alta
\`\`\`

## Scanning

\`\`\`bash
xs scan src/
\`\`\`

Testes de segurança previnem vulnerabilidades antes da produção.`,
    challenges: [
      { question: "O que teste de SQL injection verifica?", answer: "se entrada maliciosa pode manipular consultas", points: 5 },
      { question: "XSS é que tipo de ataque?", answer: "injeção de scripts no navegador", points: 5 },
      { question: "Qual comando verifica vulnerabilidades?", answer: "xs audit", points: 3 },
    ],
  },
  {
    slug: "logs-estruturados-e-agregacao",
    title: "Logs Estruturados e Agregação",
    order: 102,
    points: 5,
    bodyMd: `Centralize e analise logs.

## Logs JSON

\`\`\`xs
CHAMA ESSE CARA logJSON(nivel, mensagem, extra = {}) {
  CRIA entrada = {
    timestamp: DataAgora().paraISO(),
    nivel,
    mensagem,
    ...extra,
    ambiente: processo.env.NODE_ENV,
    versao: processo.env.VERSAO_APP
  }

  SE LIGA SO (nivel === "ERRO") {
    console.erro(JSON.serializa(entrada))
  } SENAO {
    console.log(JSON.serializa(entrada))
  }
}
\`\`\`

## Sistema de Log

\`\`\`xs
CLASSE Logger {
  CHAMA ESSE CARA info(msg, ctx) { logJSON("INFO", msg, ctx) }
  CHAMA ESSE CARA aviso(msg, ctx) { logJSON("AVISO", msg, ctx) }
  CHAMA ESSE CARA erro(msg, ctx) { logJSON("ERRO", msg, ctx) }
  CHAMA ESSE CARA debug(msg, ctx) {
    SE LIGA SO (processo.env.DEBUG) { logJSON("DEBUG", msg, ctx) }
  }
}
\`\`\`

## Agregadores

Ferramentas suportadas:

- Elastic Stack (ELK)
- Datadog
- Grafana Loki
- AWS CloudWatch

## Boas Práticas

- Inclua requestId para correlação
- Logs estruturados para máquina
- Níveis de log apropriados
- Não log dados sensíveis

Logs estruturados permitem busca e análise eficientes.`,
    challenges: [
      { question: "Logs estruturados são para ...", answer: "máquina, não humanos", points: 3 },
      { question: "Qual campo correlaciona logs entre serviços?", answer: "requestId / traceId", points: 5 },
      { question: "O que não logar?", answer: "dados sensíveis como senhas", points: 3 },
    ],
  },
  {
    slug: "tratamento-de-erros-em-producao",
    title: "Tratamento de Erros em Produção",
    order: 103,
    points: 10,
    bodyMd: `Lide com erros em ambiente de produção.

## Erro Global

\`\`\`xs
processo.ao("naoCapturado", (erro) => {
  Logger.erro("Erro não capturado", { erro: erro.mensagem, pilha: erro.pilha })
  processo.sair(1)
})

processo.ao("rejeicaoNaoTratada", (erro) => {
  Logger.erro("Promise rejeitada não tratada", { erro: erro.mensagem })
  // Não sair necessariamente
})
\`\`\`

## Graceful Shutdown

\`\`\`xs
CHAMA ESSE CARA desligar() {
  SOLTA O GRITO("Desligando servidor...")
  servidor.fechar(() => {
    SOLTA O GRITO("Servidor fechado")
    db.fechar()
    processo.sair(0)
  })

  // Forçar saída após timeout
  setTimeout(() => {
    Logger.erro("Desligamento forçado")
    processo.sair(1)
  }, 10000)
}

processo.ao("SIGTERM", desligar)
processo.ao("SIGINT", desligar)
\`\`\`

## Health Checks

\`\`\`xs
app.get("/saude", (req, res) => {
  CRIA saude = {
    status: "ok",
    timestamp: DataAgora(),
    uptime: processo.uptime()
  }
  res.json(saude)
})
\`\`\`

Preparação para erros em produção é essencial para sistemas confiáveis.`,
    challenges: [
      { question: "Qual evento captura erros não tratados?", answer: "naoCapturado / uncaughtException", points: 3 },
      { question: "O que graceful shutdown faz?", answer: "fecha conexões graciosamente antes de sair", points: 5 },
      { question: "Health check permite o quê?", answer: "monitorar se o serviço está funcional", points: 3 },
    ],
  },
  {
    slug: "ferramentas-de-linha-de-comando-avancado",
    title: "Ferramentas CLI Avançadas",
    order: 104,
    points: 10,
    bodyMd: `Construa CLIs sofisticadas.

## Comandos Aninhados

\`\`\`xs
import { Programa } from "xs:cli"

CRIA programa = Programa.novo()

CRIA comando = programa.comando("usuario")
  .descricao("Gerenciar usuários")
  .argumento("<acao>", "Ação a executar")
  .opcao("-i, --id <id>", "ID do usuário")

comando.acao((args) => {
  SE LIGA SO (args.acao === "criar") {
    SOLTA O GRITO("Criando usuário...")
  } SENAO SE LIGA SO (args.acao === "remover") {
    SOLTA O GRITO("Removendo usuário " + args.id)
  }
})

programa.parse(processo.argv)
\`\`\`

## Barras de Progresso

\`\`\`xs
import { BarraProgresso } from "xs:cli"

CRIA barra = BarraProgresso.nova({ total: 100 })

PARA CADA (i EM range(100)) {
  barra.atualizar(i + 1)
  ESPERA esperar(50)
}

barra.finalizar()
\`\`\`

## Tabelas

\`\`\`xs
import { Tabela } from "xs:cli"

Tabela.nova({
  cabecalhos: ["Nome", "Email", "Status"],
  linhas: [
    ["João", "joao@e.com", "Ativo"],
    ["Maria", "maria@e.com", "Inativo"]
  ]
}).renderizar()
\`\`\`

## Input Interativo

\`\`\`xs
import { prompt, selecao, confirmacao } from "xs:cli"

CRIA nome = ESPERA prompt("Nome:")
CRIA cor = ESPERA selecao("Cor favorita:", ["Vermelho", "Azul", "Verde"])
CRIA confirma = ESPERA confirmacao("Continuar?")
\`\`\`

CLIs profissionais melhoram a experiência do desenvolvedor.`,
    challenges: [
      { question: "Qual componente cria barra de progresso?", answer: "BarraProgresso", points: 3 },
      { question: "Qual componente renderiza tabelas?", answer: "Tabela", points: 3 },
      { question: "Comandos são organizados em ...", answer: "comandos aninhados", points: 3 },
    ],
  },
  {
    slug: "configuracao-de-projeto-escalavel",
    title: "Configuração de Projeto Escalável",
    order: 105,
    points: 10,
    bodyMd: `Estruture projetos para escalar.

## Estrutura de Diretórios

\`\`\`
src/
  modulos/
    usuarios/
      usuario.modelo.xs
      usuario.controlador.xs
      usuario.servico.xs
      usuario.testes.xs
    autenticacao/
      auth.controlador.xs
      auth.middleware.xs
  infra/
    banco.xs
    cache.xs
    logger.xs
  config/
    index.xs
    esquema.xs
  index.xs
\`\`\`

## Módulos com Separação de Responsabilidades

\`\`\`xs
// usuario.modelo.xs
export CLASSE Usuario {
  CRIA constructor(dados) {
    ISTO.nome = dados.nome
    ISTO.email = dados.email
  }
}

// usuario.servico.xs
export CLASSE UsuarioServico {
  CHAMA ESSE CARA criar(dados) {
    CRIA usuario = Usuario.novo(dados)
    // validação + persistência
    VOLTA usuario
  }
}

// usuario.controlador.xs
export CLASSE UsuarioControlador {
  CHAMA ESSE CARA criar(req, res) {
    CRIA usuario = ESPERA servico.criar(req.corpo)
    res.status(201).json(usuario)
  }
}
\`\`\`

## Config

\`\`\`xs
// config/index.xs
export default {
  porta: parseInt(processo.env.PORT || "3000"),
  db: {
    url: processo.env.DB_URL,
    pool: { min: 2, max: 10 }
  }
}
\`\`\`

Organização consistente facilita navegação e manutenção.`,
    challenges: [
      { question: "Qual padrão separa responsabilidades?", answer: "modelo-servico-controlador", points: 5 },
      { question: "Por que separar em módulos?", answer: "organização e reuso de código", points: 3 },
      { question: "Configuração centralizada facilita ...", answer: "gerenciamento de ambiente", points: 3 },
    ],
  },
  {
    slug: "documentacao-de-api",
    title: "Documentação de API",
    order: 106,
    points: 5,
    bodyMd: `Documente suas APIs automaticamente.

## Comentários como Documentação

\`\`\`xs
/**
 * Busca um usuário pelo ID
 * @param {numero} id - ID do usuário
 * @returns {Promise<Usuario>} Dados do usuário
 * @throws {ErroNaoEncontrado} Se usuário não existir
 */
CHAMA ESSE CARA buscarUsuario(id) {
  // ...
}
\`\`\`

## Swagger/OpenAPI

\`\`\`xs
import { swagger } from "xs:http"

app.usar(swagger({
  definicao: {
    openapi: "3.0.0",
    info: {
      titulo: "API de Usuários",
      versao: "1.0.0"
    },
    caminhos: {
      "/usuarios": {
        get: {
          summary: "Lista usuários",
          responses: {
            "200": {
              descricao: "Lista de usuários"
            }
          }
        }
      }
    }
  }
}))
\`\`\`

## Geração Automática

\`\`\`bash
xs docs gerar --entrada src/ --saida docs/
\`\`\`

## UI de Documentação

\`\`\`xs
app.usar(swagger.servirUI({ rota: "/docs" }))
\`\`\`

APIs bem documentadas são fáceis de consumir e manter.`,
    challenges: [
      { question: "Qual o padrão aberto para docs de API?", answer: "OpenAPI / Swagger", points: 3 },
      { question: "Qual rota serve UI do Swagger?", answer: "/docs", points: 3 },
      { question: "Documentação de API ajuda ...", answer: "consumidores e mantenedores", points: 3 },
    ],
  },
  {
    slug: "versionamento-de-api",
    title: "Versionamento de API",
    order: 107,
    points: 5,
    bodyMd: `Gerencie mudanças em APIs.

## Versionamento por URL

\`\`\`xs
// /v1/usuarios, /v2/usuarios

CRIA roteadorV1 = Roteador.novo()
roteadorV1.get("/usuarios", handlerV1)

CRIA roteadorV2 = Roteador.novo()
roteadorV2.get("/usuarios", handlerV2)

app.usar("/v1", roteadorV1)
app.usar("/v2", roteadorV2)
\`\`\`

## Versionamento por Header

\`\`\`xs
app.get("/usuarios", (req, res) => {
  CRIA versao = req.cabecalhos["Accept-Version"] || "1"

  SE LIGA SO (versao === "1") {
    VOLTA handlerV1(req, res)
  } SENAO SE LIGA SO (versao === "2") {
    VOLTA handlerV2(req, res)
  }
})
\`\`\`

## Deprecação

\`\`\`xs
app.get("/v1/usuarios", (req, res) => {
  res.definirCabecalho("Aviso", '299 - "v1 será descontinuada"')
  handlerV1(req, res)
})
\`\`\`

## Boas Práticas

- Suporte versões antigas por tempo limitado
- Comunique deprecações com antecedência
- Use semver para sua API

Versionamento permite evoluir APIs sem quebrar clientes existentes.`,
    challenges: [
      { question: "Cite uma forma de versionar API", answer: "URL path ou header", points: 3 },
      { question: "Qual header indica deprecação?", answer: "Warning", points: 3 },
      { question: "Por que versionar APIs?", answer: "evoluir sem quebrar clientes", points: 5 },
    ],
  },
  {
    slug: "microservicos-introducao",
    title: "Introdução a Microsserviços",
    order: 108,
    points: 10,
    bodyMd: `Arquitetura baseada em serviços pequenos e independentes.

## Serviço Simples

\`\`\`xs
// servico-usuarios/index.xs
import { criarServidor } from "xs:http"

CRIA servidor = criarServidor((req, res) => {
  // Lógica do serviço de usuários
  res.json({ servico: "usuarios", versao: "1.0" })
})

servidor.ouvir(3001)
\`\`\`

## Comunicação entre Serviços

\`\`\`xs
// Serviço A chama Serviço B
CHAMA ESSE CARA buscarDadosUsuario(userId) {
  CRIA resposta = ESPERA fetch(
    "http://servico-usuarios:3001/usuarios/" + userId
  )
  VOLTA resposta.json()
}
\`\`\`

## Service Discovery

\`\`\`xs
import { registrador } from "xs:micro"

CHAMA ESSE CARA registrarServico() {
  ESPERA registrador.registrar({
    nome: "servico-usuarios",
    url: "http://localhost:3001",
    saude: "/saude"
  })
}
\`\`\`

## Benefícios e Desafios

- **Benefícios**: escalabilidade, deploy independente, isolamento
- **Desafios**: complexidade de rede, consistência de dados, monitoramento

Microsserviços são poderosos para sistemas grandes, mas adicionam complexidade.`,
    challenges: [
      { question: "O que é um microsserviço?", answer: "serviço pequeno e independente", points: 3 },
      { question: "Cite um benefício dos microsserviços", answer: "escalabilidade ou deploy independente", points: 5 },
      { question: "Cite um desafio dos microsserviços", answer: "complexidade de rede ou consistência", points: 5 },
    ],
  },
  {
    slug: "filas-de-mensagens-e-streaming",
    title: "Filas de Mensagens e Streaming",
    order: 109,
    points: 10,
    bodyMd: `Comunicação assíncrona entre serviços.

## Produtor

\`\`\`xs
import { ProdutorKafka } from "xs:kafka"

CRIA produtor = ProdutorKafka.novo({
  clientId: "meu-app",
  brokers: ["localhost:9092"]
})

CHAMA ESSE CARA eventoUsuarioCriado(usuario) {
  ESPERA produtor.enviar({
    topico: "usuarios.criados",
    mensagem: JSON.serializa(usuario),
    chave: usuario.id
  })
}
\`\`\`

## Consumidor

\`\`\`xs
import { ConsumidorKafka } from "xs:kafka"

CRIA consumidor = ConsumidorKafka.novo({
  clientId: "servico-email",
  grupoId: "grupo-email"
})

ESPERA consumidor.inscrever(["usuarios.criados"])

consumidor.executarCadaMensagem(async ({ topico, mensagem, chave }) => {
  CRIA usuario = JSON.parse(mensagem.valor)
  ESPERA enviarEmailBoasVindas(usuario.email)
})
\`\`\`

## Tópicos e Partições

- Tópico: canal lógico de mensagens
- Partição: unidade de paralelismo
- Mensagens com mesma chave vão para mesma partição

Streaming permite processamento em tempo real e desacoplamento.`,
    challenges: [
      { question: "Qual o papel do produtor?", answer: "enviar mensagens para tópicos", points: 3 },
      { question: "Qual o papel do consumidor?", answer: "processar mensagens de tópicos", points: 3 },
      { question: "Partições permitem ...", answer: "paralelismo no processamento", points: 3 },
    ],
  },
  {
    slug: "tecnicas-avancadas-de-teste",
    title: "Técnicas Avançadas de Teste",
    order: 110,
    points: 10,
    bodyMd: `Estratégias de teste para cenários complexos.

## Testes de Contrato

\`\`\`xs
// Contrato entre serviços
import { Contrato } from "xs:test"

CRIA contrato = Contrato.novo({
  provedor: "servico-usuarios",
  consumidor: "servico-pedidos",
  interacoes: [
    {
      descricao: "buscar usuário por ID",
      requisicao: {
        metodo: "GET",
        caminho: "/usuarios/1"
      },
      resposta: {
        status: 200,
        corpo: {
          id: 1,
          nome: "João"
        }
      }
    }
  ]
})
\`\`\`

## Testes de Golden File

\`\`\`xs
test("renderiza usuário como JSON", () => {
  CRIA usuario = criarUsuarioTeste()
  CRIA saida = renderizarJSON(usuario)
  espera(saida).combinarComSnapshot("usuarios/golden.json")
})
\`\`\`

## Testes de Concorrência

\`\`\`xs
test("múltiplas requisições simultâneas", async () => {
  CRIA requisicoes = range(10).map(() =>
    fetch("http://localhost:3000/api/recurso")
  )

  CRIA resultados = ESPERA Promise.tudo(requisicoes)
  resultados.paraCada(r => espera(r.status).ser(200))
})
\`\`\`

Testes avançados cobrem cenários de integração e produção.`,
    challenges: [
      { question: "Testes de contrato garantem ...", answer: "compatibilidade entre serviços", points: 5 },
      { question: "Golden files armazenam ...", answer: "saída esperada para comparação", points: 3 },
      { question: "Por que testar concorrência?", answer: "detectar race conditions", points: 5 },
    ],
  },
  {
    slug: "revisao-de-codigo-e-qualidade",
    title: "Revisão de Código e Qualidade",
    order: 111,
    points: 10,
    bodyMd: `Mantenha qualidade através de revisões.

## Checklist de Revisão

### Funcionalidade
- O código resolve o problema?
- Testes cobrem a mudança?
- Casos de borda tratados?

### Manutenibilidade
- Código claro e legível?
- Nomes significativos?
- Complexidade adequada?

### Segurança
- Entradas validadas?
- Dados sensíveis protegidos?

## Ferramentas de Qualidade

\`\`\`bash
# Linter
xs lint --fix

# Formatador
xs format --verificar

# Análise estática
xs analisar

# Complexidade
xs complexidade src/
\`\`\`

## Métricas

- Complexidade ciclomática
- Acoplamento
- Coesão
- Dívida técnica

## Code Review Culture

- Seja construtivo
- Foque no código, não na pessoa
- Explique o "porquê"
- Aprenda com as revisões

Revisões de código melhoram qualidade e compartilham conhecimento.`,
    challenges: [
      { question: "Cite um aspecto para revisar", answer: "funcionalidade, manutenibilidade ou segurança", points: 3 },
      { question: "Qual comando executa o linter?", answer: "xs lint", points: 3 },
      { question: "O que complexidade ciclomática mede?", answer: "número de caminhos no código", points: 5 },
    ],
  },
];

// Process all lessons
const processedLessons = lessons.map((lesson) => ({
  ...lesson,
  points: lesson.points || 5,
  order: lesson.order || 0,
}));

export async function seedCoursePt() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    await Course.deleteOne({ slug: "curso-completo-xanascript" });
    const course = await Course.create({
      slug: "curso-completo-xanascript",
      title: "Curso Completo de XanaScript",
      lang: "pt",
      description: "Aprenda XanaScript do zero ao avançado. 156 aulas cobrindo sintaxe, orientação a objetos, ORM, WebAssembly, testes, macros e muito mais.",
      image: "",
      category: "Programação",
      level: "beginner",
      duration: "40h",
      published: true,
      lessons: processedLessons,
    });
    console.log(`Curso criado: ${course.title}`);
    console.log(`Aulas: ${course.lessons.length}`);
    console.log(`Total de pontos: ${course.totalPoints}`);
    await mongoose.disconnect();
    return course;
  } catch (e) {
    console.error("Erro:", e.message);
    await mongoose.disconnect().catch(() => {});
    throw e;
  }
}

async function seed() {
  try {
    await seedCoursePt();
    console.log("Seed concluído com sucesso!");
  } catch (e) {
    console.error("Erro:", e.message);
    process.exit(1);
  }
}

seed();
