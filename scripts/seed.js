import mongoose from "mongoose";
import "dotenv/config";

import DocArticle from "../models/DocArticle.js";
import PlaygroundExample from "../models/PlaygroundExample.js";
import PageContent from "../models/PageContent.js";
import Course from "../models/Course.js";
import { Quiz } from "../models/Quiz.js";

const docs = [
  {
    title: "Instalação",
    slug: "instalacao",
    category: "primeiros-passos",
    order: 1,
    body: `# Instalação

O XanaScript roda em **Windows, macOS e Linux** via Node.js (versão 18+). Instale globalmente com npm:

\`\`\`bash
npm install -g xanascript
\`\`\`

Verifique a instalação:

\`\`\`bash
xana --version
\`\`\`

O binário é o comando **\`xana\`** (também responde a \`xs\` como alias). Com ele você tem CLI, compilador, ORM e ferramentas de teste tudo em um.

## Primeiro programa

Crie um arquivo \`ola.xs\`:

\`\`\`js
grita-ae("Olá, mundo!")
\`\`\`

Execute:

\`\`\`bash
xana roda ola.xs
\`\`\`

Pronto. Você acabou de rodar seu primeiro código em português.`,
  },
  {
    title: "Primeiro Programa",
    slug: "primeiro-programa",
    category: "primeiros-passos",
    order: 2,
    body: `# Primeiro Programa

O jeito mais rápido de conhecer o XanaScript é um \`grita-ae\` (o print da linguagem):

\`\`\`js
grita-ae("Hello, World!")
\`\`\`

## Estrutura de um programa

Todo código XanaScript roda de cima pra baixo. Não precisa de função \`main\`:

\`\`\`js
cria nome = "XanaScript"
grita-ae("Bem-vindo ao " + nome)
\`\`\`

## Variáveis e valores

\`\`\`js
cria idade = 25          // número
cria nome = "Ana"        // texto
cria ativo = verdadeiro  // booleano
cria nada = nulo         // nulo
cria lista = [1, 2, 3]   // array
cria objeto = { chave: "valor" }  // objeto
\`\`\`

## Comentários

\`\`\`js
// comentário de uma linha
/* comentário de múltiplas linhas */
\`\`\`

## Rodando

| Comando | O que faz |
|---------|-----------|
| \`xana roda ola.xs\` | executa o arquivo |
| \`xana\` | entra no REPL interativo |
| \`xana verifica ola.xs\` | valida o código sem rodar |
| \`xana monta ola.xs\` | compila para JavaScript |

## Ponto e vírgula?

O ponto e vírgula é **opcional**. Quebras de linha separam comandos.`,
  },
  {
    title: "Variáveis",
    slug: "variaveis",
    category: "basico",
    order: 1,
    body: `# Variáveis

O XanaScript tem três formas de declarar variáveis:

| Keyword | Papel | Equivale a |
|---------|-------|------------|
| \`cria\` | variável mutável | \`let\` / \`var\` |
| \`lei\`  | constante (imutável) | \`const\` |
| \`fofoca\` | variável global | \`global\` |

## cria (mutável)

\`\`\`js
cria contador = 0
contador = contador + 1
contador += 5
contador++
grita-ae(contador)  // 7
\`\`\`

## lei (constante)

\`lei\` não pode ser reatribuída. Tentar mudar gera erro de compilação:

\`\`\`js
lei MAX = 100
grita-ae(MAX)
// MAX = 200  // ERRO: lei não pode ser reatribuída
\`\`\`

## fofoca (global)

Declarada fora de blocos, fica visível em todo o programa:

\`\`\`js
fofoca config = { debug: verdadeiro }

resolve mostraConfig() {
  grita-ae(config.debug)
}
\`\`\`

## Nomeação

Nomes seguem padrão camelCase (\`nomeCompleto\`), podem começar com \`_\`, e não podem ser uma keyword da linguagem.

## Escopo

Variáveis declaradas dentro de \`{}\` não vazam para fora. Cada bloco (\`se-pah\`, \`repete-na-moral\`, \`resolve\`, etc.) cria seu próprio escopo.`,
  },
  {
    title: "Tipos de Dados",
    slug: "tipos",
    category: "basico",
    order: 2,
    body: `# Tipos de Dados

## Tipos primitivos

| Tipo | Valor em XanaScript | Descrição |
|------|--------------------|-----------|
| \`eh-numero\` | \`10\`, \`3.14\`, \`-5\` | números (inteiros e decimais) |
| \`eh-palavra\` | \`"texto"\`, \`'texto'\` | strings |
| \`vdd?\` | \`verdadeiro\`, \`falso\` | booleanos |
| \`eh-nada\` | \`nulo\` | ausência de valor |
| \`sla\` | qualquer coisa | tipo dinâmico |
| \`sepah<T>\` | \`nulo\` ou \`T\` | opcional |

\`\`\`js
cria n: eh-numero = 42
cria s: eh-palavra = "olá"
cria b: vdd? = verdadeiro
cria x: sla = "qualquer coisa"
\`\`\`

## Coleções

| Tipo | Valor | Descrição |
|------|-------|-----------|
| \`sus<T>\` | \`[1, 2, 3]\` | array (lista) |
| \`bagulho\` | \`{ a: 1 }\` | objeto |
| \`crush<A, B>\` | \`[1, "um"]\` | par (tupla) |

\`\`\`js
cria nums: sus<eh-numero> = [1, 2, 3]
cria obj: bagulho = { nome: "Ana", idade: 25 }
cria par: crush<eh-numero, eh-palavra> = [1, "um"]
\`\`\`

## Declarando tipos próprios com tipo

\`\`\`js
tipo Usuario {
  nome: eh-palavra,
  idade: eh-numero
}

cria u: Usuario = { nome: "Ana", idade: 25 }
\`\`\`

## Checagem em runtime

| Função | Retorna |
|--------|---------|
| \`tipo-de(x)\` | tipo do valor |
| \`instancia-de(x, Classe)\` | se é instância |

## Conversão

\`\`\`js
cria texto = traduz-ai(42)       // "42"
cria numero = 42
grita-ae(traduz-ai(numero))
\`\`\``,
  },
  {
    title: "Operadores",
    slug: "operadores",
    category: "basico",
    order: 3,
    body: `# Operadores

## Aritméticos

\`\`\`js
cria soma = 10 + 5     // 15
cria sub = 10 - 5      // 5
cria mult = 10 * 5     // 50
cria div = 10 / 5      // 2
cria resto = 10 % 3    // 1
cria pot = 2 ** 3      // 8
\`\`\`

## Comparação

\`\`\`js
10 == 10    // verdadeiro (igual)
10 != 5     // verdadeiro (diferente)
10 > 5      // verdadeiro
10 < 5      // falso
10 >= 10    // verdadeiro
10 <= 9     // falso
\`\`\`

Existem também os estritos \`===\` e \`!==\`, e o operador de regex \`~=\`:

\`\`\`js
"ana" ~= "^a"   // verdadeiro (regex)
\`\`\`

## Lógicos

\`\`\`js
verdadeiro && falso   // falso
verdadeiro || falso   // verdadeiro
!verdadeiro           // falso
\`\`\`

## Bitwise

\`\`\`js
5 & 3    // 1
5 | 3    // 7
5 ^ 3    // 6
~5       // -6
1 << 2   // 4
8 >> 1   // 4
\`\`\`

## Null coalescing e optional chaining

\`\`\`js
cria x = nulo ?? "padrão"    // "padrão"
cria y = obj?.campo          // nulo se obj for nulo
\`\`\`

## Atribuição composta

\`\`\`js
cria n = 10
n += 5    // 15
n -= 2    // 13
n *= 2    // 26
n /= 13   // 2
n %= 2    // 0
n++       // 1
n--       // 0
\`\`\`

## Ternário

\`\`\`js
cria status = idade >= 18 ? "maior" : "menor"
\`\`\`

## Spread

\`\`\`js
cria a = [1, 2]
cria b = [...a, 3]    // [1, 2, 3]
\`\`\``,
  },
  {
    title: "Se-pah (condicional)",
    slug: "se-pah",
    category: "controle",
    order: 1,
    body: `# se-pah (if)

\`\`\`js
se-pah (idade >= 18) {
  grita-ae("maior de idade")
} ai {
  grita-ae("menor de idade")
}
\`\`\`

## ai se-pah (else if)

\`\`\`js
se-pah (nota >= 7) {
  grita-ae("aprovado")
} ai se-pah (nota >= 5) {
  grita-ae("recuperação")
} ai {
  grita-ae("reprovado")
}
\`\`\`

## Sem bloco (uma linha)

\`\`\`js
se-pah (ok) grita-ae("deu certo")
\`\`\`

## Exemplo real

\`\`\`js
cria idade = 18

se-pah (idade >= 18) {
  grita-ae("maior de idade")
} ai {
  grita-ae("menor de idade")
}
\`\`\``,
  },
  {
    title: "repete-na-moral (for)",
    slug: "repete-na-moral",
    category: "controle",
    order: 2,
    body: `# repete-na-moral (for)

Laço clássico com contador:

\`\`\`js
repete-na-moral (cria i = 0; i < 5; i = i + 1) {
  grita-ae(i)
}
\`\`\`

Saída:

\`\`\`text
0
1
2
3
4
\`\`\`

## Métodos de incremento

\`\`\`js
repete-na-moral (cria i = 0; i < 10; i++) {
  grita-ae(i)
}

repete-na-moral (cria i = 10; i > 0; i--) {
  grita-ae(i)
}
\`\`\`

## Percorrendo arrays

\`\`\`js
cria frutas = ["maçã", "banana", "uva"]
repete-na-moral (cria i = 0; i < tamanho(frutas); i++) {
  grita-ae(frutas[i])
}
\`\`\`

## Break e continue

\`\`\`js
repete-na-moral (cria i = 0; i < 10; i = i + 1) {
  se-pah (i == 3) {
    segue-o-baile()   // pula pra próxima iteração
  }
  se-pah (i == 7) {
    mete-o-pe()       // sai do laço
  }
  grita-ae(i)
}
\`\`\`

Saída: \`0 1 2 4 5 6\``,
  },
  {
    title: "repete-enquanto (while)",
    slug: "repete-enquanto",
    category: "controle",
    order: 3,
    body: `# repete-enquanto (while)

\`\`\`js
cria i = 0
repete-enquanto (i < 5) {
  grita-ae(i)
  i = i + 1
}
\`\`\`

Saída: \`0 1 2 3 4\`

## Loop infinito controlado

\`\`\`js
cria n = 0
repete-enquanto (verdadeiro) {
  n = n + 1
  se-pah (n == 100) {
    mete-o-pe()
  }
}
grita-ae(n)  // 100
\`\`\`

## Exemplo: adivinhar número

\`\`\`js
cria alvo = escolhe(1, 10)
cria chute = 0

repete-enquanto (chute != alvo) {
  chute = chute + 1
}

grita-ae("Acertou em " + chute + " tentativas")
\`\`\``,
  },
  {
    title: "vai-de (switch)",
    slug: "vai-de",
    category: "controle",
    order: 4,
    body: `# vai-de (switch)

O \`vai-de\` é o switch do XanaScript — escolhe um caminho pelo valor:

\`\`\`js
cria dia = "terça"

vai-de (dia) {
  se-for "segunda": grita-ae("começou a semana")
  se-for "sexta": grita-ae("sextou!")
  se-nao-der: grita-ae("dia normal")
}
\`\`\`

## Múltiplos casos

\`\`\`js
cria n = 2

vai-de (n) {
  se-for 1:
  se-for 2:
    grita-ae("baixo")
  se-for 3, 4:
    grita-ae("médio")
  se-nao-der:
    grita-ae("alto")
}
\`\`\`

## Como expressão

\`\`\`js
cria fib = (n) => vai-de (n) {
  se-for 0 => 0
  se-for 1 => 1
  se-nao-der => fib(n - 1) + fib(n - 2)
}

grita-ae(fib(10))  // 55
\`\`\``,
  },
  {
    title: "ve-se (pattern matching)",
    slug: "ve-se",
    category: "controle",
    order: 5,
    body: `# ve-se (pattern matching)

Pattern matching combina um valor contra vários padrões:

\`\`\`js
cria descrever = (n) => ve-se (n) {
  bateu-com 0: "zero"
  bateu-com 1: "um"
  qualquer-coisa: "muitos"
}

grita-ae(descrever(0))   // zero
grita-ae(descrever(42))  // muitos
\`\`\`

## Wildcard

O \`_\` também funciona como curinga (ignora o valor):

\`\`\`js
cria rotular = (x) => ve-se (x) {
  bateu-com 0: "nada"
  bateu-com _: "tem coisa"
}
\`\`\`

## Comparando valores específicos

\`\`\`js
cria verifica = (cor) => ve-se (cor) {
  bateu-com "vermelho": "quente"
  bateu-com "azul": "frio"
  qualquer-coisa: "neutro"
}
\`\`\``,
  },
  {
    title: "tenta / fodeu (erros)",
    slug: "tenta-fodeu",
    category: "controle",
    order: 6,
    body: `# tenta / fodeu (try/catch)

Trate erros em português:

\`\`\`js
tenta {
  cria resultado = 10 / 0
} fodeu (erro) {
  grita-ae("Deu ruim: " + erro)
}
\`\`\`

## no-fim (finally)

Bloco que roda sempre, com ou sem erro:

\`\`\`js
tenta {
  cria dados = desembola(texto)
} fodeu (erro) {
  grita-ae("JSON inválido: " + erro)
} no-fim {
  grita-ae("operação terminou")
}
\`\`\`

## Exemplo real

\`\`\`js
tenta {
  cria dados = desembola("{\"nome\": \"Ana\"}")
  grita-ae(dados.nome)
} fodeu (err) {
  grita-ae("Erro: " + err)
}
\`\`\`

## Erros em async

\`\`\`js
cria run = assincrono () => {
  tenta {
    cria res = stalkeia("https://api.exemplo.com/users/1")
    grita-ae(res)
  } fodeu (err) {
    grita-ae("Falha na rede: " + err)
  }
}

aguenta-ai run()
\`\`\``,
  },
  {
    title: "Funções (resolve)",
    slug: "resolve",
    category: "funcoes",
    order: 1,
    body: `# Funções (resolve)

\`\`\`js
resolve soma(a, b) {
  volta a + b
}

cria r = soma(2, 3)
grita-ae(r)  // 5
\`\`\`

## volta (return)

\`\`\`js
resolve ehPar(n) {
  volta n % 2 == 0
}

grita-ae(ehPar(4))   // verdadeiro
grita-ae(ehPar(7))   // falso
\`\`\`

## Funções tipadas

\`\`\`js
resolve soma(a: eh-numero, b: eh-numero): eh-numero {
  volta a + b
}
\`\`\`

## Funções genéricas

\`\`\`js
resolve identidade<T>(x: T): T {
  volta x
}

grita-ae(identidade(42))
grita-ae(identidade("olá"))
\`\`\`

## Arrow functions

\`\`\`js
cria dobrar = (x) => x * 2
cria somar = (a, b) => { volta a + b }

grita-ae(dobrar(21))  // 42
\`\`\`

## Arrow async

\`\`\`js
cria buscar = assincrono (url) => {
  volta stalkeia(url)
}
\`\`\`

## Funções de primeira classe

Funções podem ser passadas como argumento:

\`\`\`js
resolve aplicar(fn, valor) {
  volta fn(valor)
}

grita-ae(aplicar((x) => x * 10, 4))  // 40
\`\`\`

## Closures

\`\`\`js
resolve criarContador() {
  cria count = 0
  volta () => {
    count = count + 1
    volta count
  }
}

cria c = criarContador()
grita-ae(c())  // 1
grita-ae(c())  // 2
grita-ae(c())  // 3
\`\`\``,
  },
  {
    title: "Async",
    slug: "async",
    category: "funcoes",
    order: 2,
    body: `# Async

## Arrow assíncrona

\`\`\`js
cria buscarUsuario = assincrono (id) => {
  cria res = stalkeia("https://jsonplaceholder.typicode.com/todos/" + id)
  volta res
}
\`\`\`

## Aguardando com aguenta-ai

\`\`\`js
cria main = assincrono () => {
  cria dados = aguenta-ai buscarUsuario(1)
  grita-ae(dados)
}

aguenta-ai main()
\`\`\`

## Sleep (aguenta-ai com número)

\`\`\`js
grita-ae("começando...")
aguenta-ai(1000)
grita-ae("1 segundo depois")
\`\`\`

## Combinando com try/catch

\`\`\`js
cria buscar = assincrono () => {
  tenta {
    cria dados = aguenta-ai stalkeia("https://api.exemplo.com/dados")
    grita-ae("Dados:", dados)
  } fodeu (erro) {
    grita-ae("Falha: " + erro)
  }
}

aguenta-ai buscar()
\`\`\``,
  },
  {
    title: "Classes",
    slug: "classes",
    category: "oo",
    order: 1,
    body: `# Classes

Orientação a objetos com \`classe\`, \`spawna\` (construtor) e \`esse-cara\` (this):

\`\`\`js
classe Animal {
  spawna(nome) {
    esse-cara.nome = nome
  }
  metodo falar() {
    volta "Au au " + esse-cara.nome
  }
}

cria a = novo Animal("Bidu")
grita-ae(a.nome)        // Bidu
grita-ae(a.falar())     // Au au Bidu
\`\`\`

## herda (extends)

\`\`\`js
classe Animal {
  spawna(nome) {
    esse-cara.nome = nome
  }
  metodo falar() {
    volta "faz barulho"
  }
}

classe Cachorro herda Animal {
  metodo falar() {
    volta "Au au " + esse-cara.nome
  }
}

cria rex = novo Cachorro("Rex")
grita-ae(rex.falar())  // Au au Rex
\`\`\`

## Resumo de keywords de POO

| Keyword | Função |
|---------|--------|
| \`classe\` | declara classe |
| \`herda\` | herança (extends) |
| \`spawna\` | construtor |
| \`esse-cara\` | this |
| \`novo\` | cria instância |
| \`metodo\` | método da classe |`,
  },
  {
    title: "Módulos",
    slug: "modulos",
    category: "modulos",
    order: 1,
    body: `# Módulos

## manda-ai (export)

\`\`\`js
// math.xs
manda-ai soma

resolve soma(a, b) {
  volta a + b
}
\`\`\`

## traz-ai (import)

\`\`\`js
// main.xs
traz-ai "./math.xs" as matematica
grita-ae(matematica.soma(2, 3))  // 5
\`\`\`

## Import como expressão

\`\`\`js
cria mod = traz-ai "./mod_aux.xs"
\`\`\`

## Biblioteca padrão

\`\`\`js
traz-ai "string" as str
traz-ai "math" as M

grita-ae(str.maiuscula("olá"))   // OLÁ
grita-ae(M.soma(2, 3))            // 5
\`\`\`

## Módulos Node.js

Qualquer pacote npm disponível pode ser importado:

\`\`\`js
traz-ai "axios" as http
\`\`\`

## Import cíclico

A linguagem detecta imports cíclicos (A importa B que importa A) e retorna erro de compilação.`,
  },
  {
    title: "ORM (DB)",
    slug: "orm",
    category: "orm",
    order: 1,
    body: `# ORM embutido (DB)

O XanaScript tem ORM embutido com **typesafety**: declare um \`DB\` e ganhe CRUD automático, sem dependências.

## Declarando uma tabela

\`\`\`js
DB Usuario {
  nome: eh-palavra,
  idade: eh-numero,
  email: eh-palavra
}
\`\`\`

Os tipos de coluna aceitam \`eh-palavra\`, \`eh-numero\`, \`eh-booleano\`, \`eh-data\`, \`eh-qualquer\` (e variantes maiúsculas \`TEXTO\`, \`NUMERO\`, \`BOOLEANO\`, \`DATA\`, \`QUALQUER\`).

## CRUD completo

\`\`\`js
DB Usuario {
  nome: eh-palavra,
  idade: eh-numero,
  email: eh-palavra
}

cria repo = Usuario

// CREATE
repo.bota-ai({ nome: "João", idade: 30, email: "joao@email.com" })
repo.bota-ai({ nome: "Maria", idade: 25, email: "maria@email.com" })

// READ (lista todos)
cria todos = repo.vê()
grita-ae(todos)

// READ (por id)
cria usuario = repo.acha(1)
grita-ae("Usuário 1:", usuario)

// UPDATE
repo.alterakkkk(1, { nome: "João Silva", idade: 31 })

// DELETE
repo.apaga-ae(3)

// FILTER
cria jovens = repo.achaOnde({ idade: 25 })

// COUNT
grita-ae("Total:", repo.quantos?())
\`\`\`

## Métodos do DB

| Método | Descrição |
|--------|-----------|
| \`bota-ai(dados)\` | insere; retorna com \`id\` e \`criadoEm\` |
| \`vê()\` | lista todos |
| \`acha(id)\` | busca por id (ou \`nulo\`) |
| \`altera(id, mudancas)\` | atualiza |
| \`alterakkkk(id, mudancas)\` | alias de \`altera\` |
| \`apaga-ae(id)\` | deleta |
| \`achaOnde(filtro)\` | filtra por campos |
| \`select(campos)\` | retorna só campos selecionados |
| \`quantos?()\` | conta registros |
| \`limpar()\` | apaga tudo |

## Validação

As colunas são validadas contra o tipo declarado. Inserir um valor de tipo errado lista os campos inválidos.

## Armazenamento

Os dados ficam em \`.db/<modelo>.json\` no diretório do projeto. Antes de cada save é criado um backup \`.bak\`, com restauração automática se o arquivo corromper.`,
  },
  {
    title: "Funções Embutidas",
    slug: "builtins",
    category: "builtins",
    order: 1,
    body: `# Funções Embutidas

Todas as funções builtin, prontas sem import:

## Saída

| Função | Descrição |
|--------|-----------|
| \`grita-ae(...)\` | imprime no stdout |
| \`sussurra(...)\` | imprime no stderr |

\`\`\`js
grita-ae("mensagem normal")
sussurra("aviso importante")
\`\`\`

## Utilitários

| Função | Descrição |
|--------|-----------|
| \`horinha()\` | timestamp atual (ms) |
| \`traduz-ai(x)\` | converte para texto |
| \`tamanho(x)\` | tamanho de string/array |
| \`desembola(json)\` | JSON.parse |
| \`embrulha(valor, espaco?)\` | JSON.stringify |
| \`hash(texto)\` | SHA-256 hex |
| \`url(s)\` | encodeURIComponent |
| \`decodifica-url(s)\` | URL decode |
| \`data-agora()\` | data ISO atual |
| \`data-de-ms(ms)\` | ms → data ISO |

## Strings

| Função | Descrição |
|--------|-----------|
| \`divide-texto(texto, sep)\` | split |
| \`juntar(arr, sep)\` | join |
| \`encontra(s, sub)\` | regex match (array ou nulo) |

## Rede e ambiente

| Função | Descrição |
|--------|-----------|
| \`stalkeia(url)\` | HTTP GET → JSON (timeout 3s) |
| \`bisbilhota(chave)\` | variável de ambiente |

## Tempo e aleatório

| Função | Descrição |
|--------|-----------|
| \`aguenta-ai(ms)\` | sleep |
| \`escolhe(min, max)\` | inteiro aleatório |

\`\`\`js
cria num = escolhe(1, 6)
grita-ae("Dado: " + num)
\`\`\``,
  },
  {
    title: "Servidor HTTP",
    slug: "servidor-http",
    category: "avancado",
    order: 1,
    body: `# Servidor HTTP embutido

O XanaScript tem servidor HTTP nativo com \`escuta\`:

\`\`\`js
escuta(3000, (req, res) => {
  grita-ae(req.metodo, req.url)

  se-pah (req.url == "/") {
    res.enviar("Bem-vindo ao XanaScript Server!")
  } ai se-pah (req.url == "/json") {
    res.json({ mensagem: "Olá!", versao: "3.0" })
  } ai {
    res.status(404).enviar("404 - Rota não encontrada")
  }
})

grita-ae("Servidor rodando em http://localhost:3000")
\`\`\`

## Objeto da requisição (req)

| Campo | Descrição |
|-------|-----------|
| \`req.url\` | caminho da URL |
| \`req.metodo\` | método HTTP (GET, POST...) |
| \`req.cabecalhos\` | cabeçalhos |
| \`req.corpo\` | corpo da requisição |

## Objeto da resposta (res)

| Método | Descrição |
|--------|-----------|
| \`res.enviar(dados, tipo?)\` | envia resposta |
| \`res.json(dados)\` | envia JSON |
| \`res.status(codigo)\` | define status (chainable) |
| \`res.cabecalho(chave, valor)\` | define cabeçalho (chainable) |

## Parando o servidor

\`\`\`js
cria server = escuta(3000, handler)
terminamos!(server)
\`\`\``,
  },
  {
    title: "Biblioteca Padrão (std/)",
    slug: "biblioteca-padrao",
    category: "builtins",
    order: 2,
    body: `# Biblioteca Padrão

Módulos em XanaScript puro que acompanham a linguagem, importados com \`traz-ai\`:

## math

\`\`\`js
traz-ai "math" as M

grita-ae(M.soma(2, 3))        // 5
grita-ae(M.abs(-7))            // 7
grita-ae(M.max(1, 9, 4))       // 9
grita-ae(M.clamp(15, 0, 10))   // 10
\`\`\`

Exports: \`soma\`, \`sub\`, \`mul\`, \`div\`, \`mod\`, \`abs\`, \`max\`, \`min\`, \`clamp\`

## string

\`\`\`js
traz-ai "string" as str

grita-ae(str.maiuscula("olá"))   // OLÁ
grita-ae(str.minuscula("OLÁ"))   // olá
grita-ae(str.tem("banana", "na"))  // verdadeiro
\`\`\`

Exports: \`maiuscula\`, \`minuscula\`, \`aparada\`, \`começa-com\`, \`termina-com\`, \`tem\`, \`troca\`, \`invertida\`, \`repete\`, \`primeira-maiuscula\`, \`fatia\`

## array

\`\`\`js
traz-ai "array" as arr

grita-ae(arr.primeiro([1, 2, 3]))    // 1
grita-ae(arr.ultimo([1, 2, 3]))      // 3
grita-ae(arr.soma-arr([1, 2, 3]))    // 6
\`\`\`

Exports: \`primeiro\`, \`ultimo\`, \`tem-elemento\`, \`acha-indice\`, \`fatia-arr\`, \`junta-arr\`, \`inverte-arr\`, \`soma-arr\`, \`media\`, \`maior\`, \`menor\`, \`empurra\`, \`tira-ultimo\`, \`unico\`

## datas

\`\`\`js
traz-ai "datas" as d

grita-ae(d.agora-ms())    // timestamp ms
grita-ae(d.agora())        // data ISO
\`\`\`

Exports: \`agora-ms\`, \`agora\`, \`do-ms\`, \`diferenca-ms\`

## json

\`\`\`js
traz-ai "json" as j

grita-ae(j.em-json({ a: 1 }))      // {"a":1}
grita-ae(j.de-json("{\\"a\\":1}"))  // objeto
\`\`\`

Exports: \`em-json\`, \`em-json-bonito\`, \`de-json\`, \`hash-sha256\``,
  },
  {
    title: "Macros (tpm)",
    slug: "macros",
    category: "avancado",
    order: 2,
    body: `# Macros (tpm)

Macros expandem em **tempo de compilação** — o código é reescrito antes de rodar.

\`\`\`js
tpm quadrado(x) {
  x * x
}

tpm cubo(x) {
  x * quadrado(x)
}

cria r1 = quadrado(5)
grita-ae("quadrado(5) =", r1)  // 25
\`\`\`

## Como funciona

Quando o compilador encontra \`quadrado(5)\`, ele **substitui** pela expressão \`5 * 5\` antes da execução. Nenhuma chamada de função acontece em runtime.

## Composição

Macros podem chamar outras macros:

\`\`\`js
tpm dobro(x) { x * 2 }
tpm quadruplo(x) { dobro(dobro(x)) }

grita-ae(quadruplo(3))  // 12
\`\`\`

## Diferença para funções

| | Função | Macro |
|---|--------|-------|
| Quando roda | runtime | compilação |
| Overhead de chamada | sim | não |
| Pode usar em tipos/expressions de compile-time | não | sim |`,
  },
  {
    title: "Testes (crush)",
    slug: "testes",
    category: "testes",
    order: 1,
    body: `# Testes (crush)

Testes com \`crush\`, \`deu-match\` e \`date\`:

\`\`\`js
crush "adição básica" {
  cria r = 2 + 3
  deu-match(r == 5)
}

crush "date" {
  date(2 + 2, 4)
}
\`\`\`

## Formas de escrever

\`\`\`js
crush("com parênteses") {
  deu-match(verdadeiro)
}

crush "sem parênteses" {
  deu-match(verdadeiro)
}
\`\`\`

## Assertions

| Função | Verifica |
|--------|----------|
| \`deu-match(condicao)\` | condição é verdadeira |
| \`date(real, esperado)\` | valores iguais |

\`\`\`js
crush "arrays" {
  cria arr = [1, 2, 3]
  date(tamanho(arr), 3)
}

crush "funções" {
  resolve soma(a, b) { volta a + b }
  date(soma(2, 3), 5)
}
\`\`\`

## Rodando

Procura arquivos \`*test*.xs\` no projeto:

\`\`\`bash
xana test
\`\`\``,
  },
  {
    title: "Tarefas",
    slug: "tarefas",
    category: "avancado",
    order: 3,
    body: `# Tarefas (task runner)

Declare tarefas com \`tarefa\` e rode pelo CLI:

\`\`\`js
tarefa "build" {
  grita-ae("building...")
}

tarefa "deploy" {
  grita-ae("deploying...")
}
\`\`\`

## Sem aspas

\`\`\`js
tarefa limpar {
  grita-ae("limpando...")
}
\`\`\`

## Rodando uma tarefa

\`\`\`bash
xana build
\`\`\`

O nome após \`xana\` procura a tarefa correspondente.

## Exemplo completo

\`\`\`js
tarefa "test" {
  grita-ae("rodando testes...")
}

tarefa "publish" {
  grita-ae("publicando pacote...")
}
\`\`\``,
  },
  {
    title: "CLI",
    slug: "cli",
    category: "cli",
    order: 1,
    body: `# CLI (Linha de Comando)

O binário é **\`xana\`** (alias \`xs\`).

## Comandos principais

| Comando | Descrição |
|---------|-----------|
| \`xana\` | REPL interativo |
| \`xana roda arquivo.xs\` | executa |
| \`xana verifica arquivo.xs\` | valida sem rodar |
| \`xana monta arquivo.xs\` | compila para JavaScript |
| \`xana monta --wasm arquivo.xs\` | compila para WebAssembly |
| \`xana monta --otimizado arquivo.xs\` | compilação otimizada |
| \`xana monta --standalone arquivo.xs\` | bundle standalone |
| \`xana test\` | roda testes |
| \`xana dev\` | modo desenvolvimento |
| \`xana fmt arquivo.xs\` | formata código |
| \`xana repl\` | REPL |
| \`xana lsp\` | servidor LSP |
| \`xana docs\` | abre documentação |
| \`xana init\` | cria projeto |
| \`xana install <pacote>\` | instala pacote |
| \`xana publish\` | publica pacote |
| \`xana bench\` | benchmark |
| \`xana debuga\` | depurador (DAP) |

## Alias em português

Alguns comandos respondem por alias em português: \`xana roda\`, \`xana verifica\`, \`xana monta\`.

## Manifesto do projeto

Projetos usam \`bglh.json\` como manifesto de pacote, e os dados do ORM ficam em \`.db/\`.`,
  },
  {
    title: "Template Strings",
    slug: "template-strings",
    category: "basico",
    order: 4,
    body: `# Template Strings

Interpole valores dentro de texto com crase e \`\${}\`:

\`\`\`js
cria nome = "XanaScript"
cria ano = 2026

grita-ae(\`Bem-vindo ao \${nome}!\`)
grita-ae(\`Ano: \${ano}\`)
\`\`\`

## Expressões dentro

\`\`\`js
cria a = 10
cria b = 20

grita-ae(\`Soma: \${a + b}\`)  // Soma: 30
\`\`\`

## Exemplo real

\`\`\`js
cria produto = { nome: "Teclado", preco: 250 }

grita-ae(\`O \${produto.nome} custa R\$\${produto.preco}\`)
\`\`\``,
  },
];

const examples = [
  { title: "Olá Mundo", slug: "ola-mundo", code: "grita-ae(\"Olá, mundo!\")", description: "Primeiro programa", category: "basico", order: 1 },
  { title: "Fibonacci", slug: "fibonacci", code: "resolve fib(n) {\n  se-pah (n <= 1) { volta n }\n  volta fib(n - 1) + fib(n - 2)\n}\n\ngrita-ae(fib(10))", description: "Sequência de Fibonacci recursiva", category: "funcoes", order: 2 },
  { title: "Pattern Matching", slug: "pattern-matching", code: "cria describe = (n) => ve-se (n) {\n  bateu-com 0: \"zero\"\n  bateu-com 1: \"um\"\n  qualquer-coisa: \"muitos\"\n}\n\ngrita-ae(describe(0))\ngrita-ae(describe(1))\ngrita-ae(describe(42))", description: "Pattern matching com ve-se", category: "controle", order: 1 },
  { title: "Classes", slug: "classes", code: "classe Animal {\n  spawna(nome) {\n    esse-cara.nome = nome\n  }\n  metodo falar() {\n    grita-ae(esse-cara.nome + \" faz au\")\n  }\n}\n\ncria dog = novo Animal(\"Rex\")\ndog.falar()", description: "Orientação a objetos com classe", category: "oo", order: 1 },
  { title: "CRUD ORM", slug: "crud-orm", code: "DB Produto {\n  nome: eh-palavra\n  preco: eh-numero\n}\n\ncria repo = Produto\n\nrepo.bota-ai({ nome: \"Mouse\", preco: 120 })\nrepo.bota-ai({ nome: \"Teclado\", preco: 250 })\n\ncria todos = repo.vê()\ngrita-ae(todos)", description: "CRUD automático com ORM embutido", category: "orm", order: 1 },
  { title: "Async HTTP", slug: "async-http", code: "cria buscar = assincrono () => {\n  tenta {\n    cria res = stalkeia(\"https://jsonplaceholder.typicode.com/todos/1\")\n    grita-ae(res)\n  } fodeu (erro) {\n    grita-ae(\"Falha: \" + erro)\n  }\n}\n\naguenta-ai buscar()", description: "Requisição HTTP assíncrona", category: "avancado", order: 1 },
  { title: "Servidor HTTP", slug: "servidor-http", code: "escuta(3000, (req, res) => {\n  se-pah (req.url == \"/\") {\n    res.enviar(\"Bem-vindo ao XanaScript Server!\")\n  } ai se-pah (req.url == \"/json\") {\n    res.json({ mensagem: \"Olá!\", versao: \"3.0\" })\n  } ai {\n    res.status(404).enviar(\"404 - Rota não encontrada\")\n  }\n})\n\ngrita-ae(\"Servidor rodando em http://localhost:3000\")", description: "Servidor HTTP embutido", category: "avancado", order: 2 },
  { title: "Números Primos", slug: "primos", code: "resolve ehPrimo(n) {\n  se-pah (n < 2) { volta falso }\n  repete-na-moral (cria i = 2; i * i <= n; i++) {\n    se-pah (n % i == 0) { volta falso }\n  }\n  volta verdadeiro\n}\n\ngrita-ae(ehPrimo(17))  // verdadeiro\ngrita-ae(ehPrimo(4))   // falso", description: "Função com laço e condicional", category: "controle", order: 2 },
  { title: "FizzBuzz", slug: "fizzbuzz", code: "repete-na-moral (cria i = 1; i <= 15; i = i + 1) {\n  se-pah (i % 15 == 0) {\n    grita-ae(\"FizzBuzz\")\n  } ai se-pah (i % 3 == 0) {\n    grita-ae(\"Fizz\")\n  } ai se-pah (i % 5 == 0) {\n    grita-ae(\"Buzz\")\n  } ai {\n    grita-ae(i)\n  }\n}", description: "Clássico desafio de lógica", category: "desafios", order: 1 },
  { title: "Two Sum", slug: "two-sum", code: "resolve achaPar(nums, alvo) {\n  repete-na-moral (cria i = 0; i < tamanho(nums); i++) {\n    repete-na-moral (cria j = i + 1; j < tamanho(nums); j++) {\n      se-pah (nums[i] + nums[j] == alvo) {\n        volta [i, j]\n      }\n    }\n  }\n  volta [-1, -1]\n}\n\ngrita-ae(achaPar([2, 7, 11, 15], 9))\ngrita-ae(achaPar([3, 2, 4], 6))", description: "Encontra o par que soma o alvo", category: "desafios", order: 2 },
  { title: "Palíndromo", slug: "palindromo", code: "resolve ehPalindromo(texto) {\n  cria invertido = \"\"\n  repete-na-moral (cria i = tamanho(texto) - 1; i >= 0; i = i - 1) {\n    invertido = invertido + texto[i]\n  }\n  volta texto == invertido\n}\n\ngrita-ae(ehPalindromo(\"arara\"))   // verdadeiro\ngrita-ae(ehPalindromo(\"casa\"))    // falso", description: "Checa se a palavra lê igual dos dois lados", category: "desafios", order: 3 },
  { title: "Maior Número", slug: "maior-numero", code: "resolve achaMaior(nums) {\n  cria maior = nums[0]\n  repete-na-moral (cria i = 1; i < tamanho(nums); i++) {\n    se-pah (nums[i] > maior) {\n      maior = nums[i]\n    }\n  }\n  volta maior\n}\n\ngrita-ae(achaMaior([3, 7, 2, 9, 5]))  // 9", description: "Encontra o maior valor de uma lista", category: "desafios", order: 4 },
  { title: "Conta Vogais", slug: "conta-vogais", code: "resolve contaVogais(texto) {\n  cria vogais = [\"a\", \"e\", \"i\", \"o\", \"u\"]\n  cria total = 0\n  repete-na-moral (cria i = 0; i < tamanho(texto); i++) {\n    repete-na-moral (cria j = 0; j < tamanho(vogais); j++) {\n      se-pah (texto[i] == vogais[j]) {\n        total = total + 1\n      }\n    }\n  }\n  volta total\n}\n\ngrita-ae(contaVogais(\"xanascript\"))  // 3", description: "Conta quantas vogais tem numa palavra", category: "desafios", order: 5 },
  { title: "Fatorial", slug: "fatorial", code: "resolve fatorial(n) {\n  se-pah (n <= 1) { volta 1 }\n  volta n * fatorial(n - 1)\n}\n\ngrita-ae(fatorial(5))   // 120\ngrita-ae(fatorial(10))  // 3628800", description: "Cálculo recursivo de fatorial", category: "desafios", order: 6 },
  { title: "Soma de Pares", slug: "soma-pares", code: "resolve somaPares(nums) {\n  cria total = 0\n  repete-na-moral (cria i = 0; i < tamanho(nums); i++) {\n    se-pah (nums[i] % 2 == 0) {\n      total = total + nums[i]\n    }\n  }\n  volta total\n}\n\ngrita-ae(somaPares([1, 2, 3, 4, 5, 6]))  // 12", description: "Soma só os números pares", category: "desafios", order: 7 },
  { title: "Inverte Array", slug: "inverte-array", code: "resolve inverte(nums) {\n  cria resultado = []\n  repete-na-moral (cria i = tamanho(nums) - 1; i >= 0; i = i - 1) {\n    resultado = [...resultado, nums[i]]\n  }\n  volta resultado\n}\n\ngrita-ae(inverte([1, 2, 3, 4, 5]))  // [5, 4, 3, 2, 1]", description: "Inverte a ordem de uma lista", category: "desafios", order: 8 },
  { title: "Conta Palavras", slug: "conta-palavras", code: "resolve contaPalavras(texto) {\n  cria total = 1\n  repete-na-moral (cria i = 0; i < tamanho(texto); i++) {\n    se-pah (texto[i] == \" \") {\n      total = total + 1\n    }\n  }\n  volta total\n}\n\ngrita-ae(contaPalavras(\"xana script e brabo\"))  // 4", description: "Conta quantas palavras tem na frase", category: "desafios", order: 9 },
  { title: "Soma Dígitos", slug: "soma-digitos", code: "resolve somaDigitos(n) {\n  cria total = 0\n  repete-enquanto (n > 0) {\n    cria d = n % 10\n    total = total + d\n    n = (n - d) / 10\n  }\n  volta total\n}\n\ngrita-ae(somaDigitos(1234))  // 10", description: "Soma os dígitos de um número", category: "desafios", order: 10 },
  { title: "Anagrama", slug: "anagrama", code: "resolve ehAnagrama(a, b) {\n  se-pah (tamanho(a) != tamanho(b)) { volta falso }\n  cria letras = []\n  repete-na-moral (cria i = 0; i < tamanho(a); i++) {\n    letras = [...letras, a[i]]\n  }\n  repete-na-moral (cria j = 0; j < tamanho(b); j++) {\n    cria achou = falso\n    repete-na-moral (cria k = 0; k < tamanho(letras); k++) {\n      se-pah (letras[k] == b[j]) {\n        letras = [...letras.slice(0, k), ...letras.slice(k + 1)]\n        achou = verdadeiro\n        mete-o-pe()\n      }\n    }\n    se-pah (achou == falso) { volta falso }\n  }\n  volta tamanho(letras) == 0\n}\n\ngrita-ae(ehAnagrama(\"amor\", \"roma\"))  // verdadeiro", description: "Checa se duas palavras têm as mesmas letras", category: "desafios", order: 11 },
  { title: "Ordena Array", slug: "ordena-array", code: "resolve ordena(nums) {\n  cria n = tamanho(nums)\n  repete-na-moral (cria i = 0; i < n - 1; i++) {\n    repete-na-moral (cria j = 0; j < n - i - 1; j++) {\n      se-pah (nums[j] > nums[j + 1]) {\n        cria temp = nums[j]\n        nums[j] = nums[j + 1]\n        nums[j + 1] = temp\n      }\n    }\n  }\n  volta nums\n}\n\ngrita-ae(ordena([5, 2, 9, 1, 7]))  // [1, 2, 5, 7, 9]", description: "Ordena uma lista (bubble sort)", category: "desafios", order: 12 },
  { title: "Remove Duplicados", slug: "remove-duplicados", code: "resolve removeDuplicados(nums) {\n  cria resultado = []\n  repete-na-moral (cria i = 0; i < tamanho(nums); i++) {\n    cria jaTem = falso\n    repete-na-moral (cria j = 0; j < tamanho(resultado); j++) {\n      se-pah (resultado[j] == nums[i]) {\n        jaTem = verdadeiro\n      }\n    }\n    se-pah (jaTem == falso) {\n      resultado = [...resultado, nums[i]]\n    }\n  }\n  volta resultado\n}\n\ngrita-ae(removeDuplicados([1, 2, 2, 3, 1, 4]))  // [1, 2, 3, 4]", description: "Remove valores repetidos de uma lista", category: "desafios", order: 13 },
  { title: "Média de Notas", slug: "media-notas", code: "resolve media(notas) {\n  cria total = 0\n  repete-na-moral (cria i = 0; i < tamanho(notas); i++) {\n    total = total + notas[i]\n  }\n  volta total / tamanho(notas)\n}\n\ngrita-ae(media([7, 8, 9, 10]))  // 8.5", description: "Calcula a média de uma lista de notas", category: "desafios", order: 14 },
  { title: "Potência", slug: "potencia", code: "resolve potencia(base, expoente) {\n  cria resultado = 1\n  repete-na-moral (cria i = 0; i < expoente; i++) {\n    resultado = resultado * base\n  }\n  volta resultado\n}\n\ngrita-ae(potencia(2, 10))  // 1024", description: "Calcula base elevada ao expoente", category: "desafios", order: 15 },
  { title: "Conta Letra", slug: "conta-letra", code: "resolve contaLetra(texto, letra) {\n  cria total = 0\n  repete-na-moral (cria i = 0; i < tamanho(texto); i++) {\n    se-pah (texto[i] == letra) {\n      total = total + 1\n    }\n  }\n  volta total\n}\n\ngrita-ae(contaLetra(\"banana\", \"a\"))  // 3", description: "Conta quantas vezes uma letra aparece", category: "desafios", order: 16 },
  { title: "Maior Palavra", slug: "maior-palavra", code: "resolve maiorPalavra(frase) {\n  cria palavras = frase.split(\" \")\n  cria maior = palavras[0]\n  repete-na-moral (cria i = 1; i < tamanho(palavras); i++) {\n    se-pah (tamanho(palavras[i]) > tamanho(maior)) {\n      maior = palavras[i]\n    }\n  }\n  volta maior\n}\n\ngrita-ae(maiorPalavra(\"o xanascript e muito brabo\"))  // xanascript", description: "Encontra a palavra mais longa da frase", category: "desafios", order: 17 },
  { title: "Tabuada", slug: "tabuada", code: "resolve tabuada(n) {\n  repete-na-moral (cria i = 1; i <= 10; i++) {\n    grita-ae(n + \" x \" + i + \" = \" + n * i)\n  }\n}\n\ntabuada(7)", description: "Imprime a tabuada de um número", category: "desafios", order: 18 },
  { title: "Número Perfeito", slug: "numero-perfeito", code: "resolve ehPerfeito(n) {\n  cria soma = 0\n  repete-na-moral (cria i = 1; i < n; i++) {\n    se-pah (n % i == 0) {\n      soma = soma + i\n    }\n  }\n  volta soma == n\n}\n\ngrita-ae(ehPerfeito(6))    // verdadeiro (1+2+3)\ngrita-ae(ehPerfeito(28))   // verdadeiro\ngrita-ae(ehPerfeito(12))   // falso", description: "Número igual à soma dos seus divisores", category: "desafios", order: 19 },
  { title: "Fibonacci Iterativo", slug: "fibonacci-iterativo", code: "resolve fibIterativo(n) {\n  cria a = 0\n  cria b = 1\n  repete-na-moral (cria i = 0; i < n; i++) {\n    cria temp = a + b\n    a = b\n    b = temp\n  }\n  volta a\n}\n\ngrita-ae(fibIterativo(10))  // 55", description: "Fibonacci sem recursão, só laço", category: "desafios", order: 20 },
];

const courseData = {
  title: "Fundamentos do XanaScript",
  slug: "fundamentos",
  description: "Aprenda XanaScript do zero entendendo o PORQUÊ: sintaxe, tipos, controle de fluxo, funções, POO, módulos e ORM — cada conceito explicado com contexto real.",
  level: "beginner",
  published: true,
  modules: [
    {
      title: "Introdução",
      slug: "introducao",
      order: 1,
      lessons: [
        {
          slug: "instalacao",
          title: "Instalação e Hello World",
          bodyMd: `O XanaScript roda em **Windows, macOS e Linux** porque é construído sobre o Node.js — o mesmo motor que roda JavaScript. Isso significa que, se você já tem Node 18+ instalado, a instalação é uma linha:

\`\`\`bash
npm install -g xanascript
\`\`\`

O **-g** é importante: instala o comando \`xana\` globalmente, disponível em qualquer pasta do seu terminal. Se rodar um \`xana\` e der "comando não encontrado", é porque faltou o \`-g\`.

Verifique se deu certo:

\`\`\`bash
xana --version
\`\`\`

## Primeiro programa

Crie um arquivo \`ola.xs\`:

\`\`\`js
grita-ae("Olá, mundo!")
\`\`\`

Execute:

\`\`\`bash
xana roda ola.xs
\`\`\`

Você vai ver \`Olá, mundo!\` no terminal. O \`grita-ae\` é o "print" da linguagem — e o nome já explica o que ele faz: grita algo pra você ouvir.

## Por que \`grita-ae\` e não \`console.log\`?

XanaScript usa palavras em português pra que **a intenção do código seja óbvia pra quem lê**. \`grita-ae\` é uma metáfora que gruda na memória: você não decora sintaxe, você reconhece a intenção.`,
          order: 1, points: 5,
        },
        {
          slug: "sintaxe",
          title: "Sintaxe Básica e Comentários",
          bodyMd: `Antes de escrever mais código, entenda as regras do "alfabeto" da linguagem.

## Comentários

\`\`\`js
// comentário de uma linha

/*
  comentário de
  múltiplas linhas
*/
\`\`\`

Comentários não são executados — servem pra **explicar o porquê**, não o quê. Um bom comentário responde "por que esse código existe?", não "o que essa linha faz?" (isso o código já mostra).

## Delimitadores

XanaScript usa os mesmos símbolos de outras linguagens:

| Símbolo | Uso |
|---------|-----|
| \`()\` | parâmetros, condições e agrupamento |
| \`{}\` | blocos de código (corpo de funções, laços, condicionais) |
| \`[]\` | arrays (listas) |

## Ponto e vírgula

O ponto e vírgula é **opcional**. Quebras de linha separam comandos:

\`\`\`js
grita-ae("primeiro")
grita-ae("segundo")

grita-ae("terceiro"); grita-ae("quarto")
\`\`\`

Mas cuidado: dentro de blocos \`{}\`, usar ponto e vírgula no lugar de quebra de linha pode quebrar o parse. Use quebras de linha — é o estilo natural da linguagem.

## Estrutura de um programa

Todo código roda **de cima pra baixo**, sem precisar de uma função \`main\`:

\`\`\`js
cria nome = "XanaScript"
grita-ae("Bem-vindo ao " + nome)
\`\`\`

## Rodando de vários jeitos

| Comando | O que faz |
|---------|-----------|
| \`xana roda ola.xs\` | executa o arquivo |
| \`xana\` | entra no REPL interativo (teste rápido) |
| \`xana verifica ola.xs\` | valida o código SEM rodar (pega erro cedo) |
| \`xana monta ola.xs\` | compila pra JavaScript e mostra o resultado |

O \`verifica\` é seu melhor amigo pra depurar: ele roda o compilador inteiro sem executar nada, então erros de sintaxe e tipos aparecem antes de qualquer efeito colateral.`,
          order: 2, points: 5,
        },
      ],
    },
    {
      title: "Variáveis e Tipos",
      slug: "variaveis-tipos",
      order: 2,
      lessons: [
        {
          slug: "cria",
          title: "cria / lei / fofoca — Declarando Variáveis",
          bodyMd: `Variáveis guardam valores na memória pra você usar depois. O XanaScript tem três jeitos de declarar, cada um com um propósito diferente:

| Keyword | Papel | Equivale a |
|---------|-------|------------|
| \`cria\` | variável mutável (pode mudar) | \`let\` / \`var\` |
| \`lei\`  | constante (não pode mudar) | \`const\` |
| \`fofoca\` | variável global (visível em todo o programa) | \`global\` |

## cria (mutável)

\`\`\`js
cria contador = 0
contador = contador + 1
contador += 5
contador++
grita-ae(contador)  // 7
\`\`\`

Use \`cria\` quando o valor vai mudar durante o programa — contadores, acumuladores, entradas do usuário.

## lei (constante)

\`lei\` **não pode ser reatribuída**. Tentar mudar gera erro de compilação:

\`\`\`js
lei MAX = 100
grita-ae(MAX)
// MAX = 200  // ERRO: lei não pode ser reatribuída
\`\`\`

## Por que usar \`lei\` se \`cria\` funciona?

Porque **constantes protegem você de você mesmo**. Quando um valor nunca muda (uma taxa de imposto, uma URL de API, uma configuração), declará-lo com \`lei\` faz o compilador reclamar se alguém tentar alterá-lo. É uma garantia grátis contra bugs de "valor mudou sem querer". O compilador também consegue otimizar melhor constantes.

## fofoca (global)

Declarada fora de blocos, fica visível em todo o programa — inclusive dentro de funções:

\`\`\`js
fofoca config = { debug: verdadeiro }

resolve mostraConfig() {
  grita-ae(config.debug)  // acessa a global de dentro da função
}
\`\`\`

Use globais com moderação: tudo que é global pode ser alterado de qualquer lugar, o que dificulta descobrir **quem** mudou. Prefira passar valores por parâmetro.

## Escopo

Cada bloco \`{}\` cria seu próprio escopo. Variáveis declaradas dentro não vazam pra fora:

\`\`\`js
se-pah (verdadeiro) {
  cria interna = 42
}
// grita-ae(interna)  // ERRO: interna não existe aqui
\`\`\`

## Nomeação

Siga **camelCase** (\`nomeCompleto\`, \`totalDaVenda\`), comece com letra ou \`_\`, e nunca use uma keyword da linguagem como nome.`,
          order: 1, points: 10,
        },
        {
          slug: "tipos",
          title: "Tipos Primitivos e Anotações",
          bodyMd: `Todo valor tem um **tipo** — a informação de que "tipo de coisa" ele é. O tipo decide o que você pode fazer com o valor (somar, concatenar, comparar) e evita erros bobos.

## Tipos primitivos

| Tipo | Valor em XanaScript | Descrição |
|------|--------------------|-----------|
| \`eh-numero\` | \`10\`, \`3.14\`, \`-5\` | números inteiros e decimais |
| \`eh-palavra\` | \`"texto"\`, \`'texto'\` | strings (texto) |
| \`vdd?\` | \`verdadeiro\`, \`falso\` | booleanos |
| \`eh-nada\` | \`nulo\` | ausência de valor |
| \`sla\` | qualquer coisa | tipo dinâmico (coringa) |

\`\`\`js
cria n: eh-numero = 42
cria s: eh-palavra = "olá"
cria b: vdd? = verdadeiro
cria x: sla = "qualquer coisa"
\`\`\`

## Por que anotar o tipo?

XanaScript é **opcionalmente tipado**: você pode declarar sem tipo (\`cria n = 42\`) e a linguagem infere. Mas anotar traz dois benefícios:

1. **Documentação viva** — quem lê o código sabe na hora o que esperar.
2. **Segurança** — o compilador avisa se você tentar fazer algo incompatível.

## Tipos de coleção

| Tipo | Valor | Descrição |
|------|-------|-----------|
| \`sus<T>\` | \`[1, 2, 3]\` | array (lista) |
| \`bagulho\` | \`{ a: 1 }\` | objeto |
| \`crush<A, B>\` | \`[1, "um"]\` | par (tupla) |

\`\`\`js
cria nums: sus<eh-numero> = [1, 2, 3]
cria obj: bagulho = { nome: "Ana", idade: 25 }
cria par: crush<eh-numero, eh-palavra> = [1, "um"]
\`\`\`

## Tipos próprios com tipo

Pra evitar repetir anotações, defina seu próprio tipo:

\`\`\`js
tipo Usuario {
  nome: eh-palavra,
  idade: eh-numero
}

cria u: Usuario = { nome: "Ana", idade: 25 }
\`\`\`

## Por que nulo é um tipo separado?

\`nulo\` representa **"não há valor aqui"**. Separar "existe um número" de "não existe nada" força você a decidir o que fazer quando o valor não vier — é a base de sistemas que não quebram silenciosamente.

## Checando tipos em runtime

\`\`\`js
tipo-de(42)          // eh-numero
tipo-de("oi")        // eh-palavra
instancia-de(x, Classe)  // verdadeiro se x é instância
\`\`\``,
          order: 2, points: 10,
        },
        {
          slug: "operadores",
          title: "Operadores e Precedência",
          bodyMd: `Operadores são os "verbos" da linguagem: combinam e comparam valores. Entender a **precedência** (qual opera primeiro) evita resultados surpreendentes.

## Aritméticos

\`\`\`js
cria soma = 10 + 5     // 15
cria sub = 10 - 5      // 5
cria mult = 10 * 5     // 50
cria div = 10 / 5      // 2
cria resto = 10 % 3    // 1
cria pot = 2 ** 3      // 8
\`\`\`

## Por que existe o módulo (\`%\`)?

O resto da divisão parece inútil até você perceber que ele responde "esse número é par?" (\`n % 2 == 0\`) e "esse ano é bissexto?" (\`ano % 4 == 0\`). É a ferramenta de divisibilidade.

## Precedência — a ordem importa

Da mesma forma que \`2 + 3 * 4\` é \`14\` (multiplicação primeiro), XanaScript respeita a ordem matemática:

\`\`\`js
cria r = 2 + 3 * 4    // 14, NÃO 20
cria r2 = (2 + 3) * 4 // 20, parênteses forçam a ordem
\`\`\`

**Regra de ouro:** quando a precedência não for óbvia, use parênteses. Código claro vale mais que código "esperto".

## Comparação

\`\`\`js
10 == 10    // verdadeiro (igual)
10 != 5     // verdadeiro (diferente)
10 > 5      // verdadeiro
10 < 5      // falso
10 >= 10    // verdadeiro
10 <= 9     // falso
\`\`\`

## Estrito vs solto: \`==\` e \`===\`

\`==\` compara o **valor** (e pode converter tipos). \`===\` compara valor **e tipo**:

\`\`\`js
1 == "1"      // verdadeiro (converte)
1 === "1"     // falso (tipos diferentes)
\`\`\`

Use **\`===\` por padrão** pra evitar bugs de conversão implícita. A igualdade estrita é a que não surpreende.

## Regex

O operador \`~=\` testa se o texto casa com uma expressão regular:

\`\`\`js
"ana" ~= "^a"   // verdadeiro
"bob" ~= "^a"   // falso
\`\`\`

## Lógicos

\`\`\`js
verdadeiro && falso   // falso (e)
verdadeiro || falso   // verdadeiro (ou)
!verdadeiro           // falso (não)
\`\`\`

## O segredo do \`&&\` e \`||\`: short-circuit

\`&&\` e \`||\` **param de avaliar quando já sabem a resposta**:

\`\`\`js
falso && fazAlgo()    // fazAlgo NUNCA roda (já é falso)
verdadeiro || fazAlgo()  // fazAlgo NUNCA roda (já é verdadeiro)
\`\`\`

Isso é útil pra guardas:

\`\`\`js
se-pah (usuario && usuario.ativo) { ... }
\`\`\`

## Null coalescing e optional chaining

\`\`\`js
cria x = nulo ?? "padrão"   // "padrão" (se esquerda for nulo, usa direita)
cria y = obj?.campo         // nulo se obj for nulo (sem quebrar)
\`\`\`

O \`??\` é o "fallback": dá um valor padrão quando o primeiro é nulo. O \`?.\` é o "acesso seguro": navega sem estourar erro se o objeto não existir. Juntos eliminam a dor de cabeça "não pode ler propriedade de nulo".

## Atribuição composta

\`\`\`js
cria n = 10
n += 5    // 15
n -= 2    // 13
n *= 2    // 26
n /= 13   // 2
n %= 2    // 0
n++       // 1
n--       // 0
\`\`\`

\`n += 5\` é açúcar sintático de \`n = n + 5\`: mais curto e menos propenso a erro de digitação.

## Ternário

\`\`\`js
cria status = idade >= 18 ? "maior" : "menor"
\`\`\`

O ternário é um \`se-pah\` em formato de expressão: retorna um valor de um dos dois lados. Use pra escolhas simples de uma linha.

## Spread

\`\`\`js
cria a = [1, 2]
cria b = [...a, 3]    // [1, 2, 3]
\`\`\`

O \`...\` "espalha" os elementos de um array dentro de outro — o jeito mais seguro de **copiar** e **combinar** listas sem mutar a original.`,
          order: 3, points: 10,
        },
        {
          slug: "colecoes",
          title: "Arrays e Objetos na Prática",
          bodyMd: `Quase todo programa lida com **coleções**: listas de itens, registros com campos. Em XanaScript, arrays e objetos cobrem isso.

## Arrays (listas) com sus

\`\`\`js
cria frutas = ["maçã", "banana", "uva"]
grita-ae(frutas[0])         // maçã (índices começam em 0)
grita-ae(tamanho(frutas))   // 3
frutas[1] = "morango"
grita-ae(frutas)
\`\`\`

## Por que o índice começa em 0?

Computadores contam offsets (distância do início), não posições. O primeiro elemento está a 0 de distância do começo. É convenção herdada do C que todas as linguagens mantêm — por isso \`frutas[0]\` é o primeiro item.

## Percorrendo com repete-na-moral

\`\`\`js
repete-na-moral (cria i = 0; i < tamanho(frutas); i++) {
  grita-ae(frutas[i])
}
\`\`\`

## Objetos (registros) com bagulho

Objetos agrupam dados relacionados sob um nome:

\`\`\`js
cria usuario = { nome: "Ana", idade: 25, ativo: verdadeiro }
grita-ae(usuario.nome)   // Ana
grita-ae(usuario.idade)  // 25
\`\`\`

## Por que objetos?

Sem objetos, você guardaria cada campo em uma variável solta (\`nome\`, \`idade\`, \`ativo\`) — que se multiplica sem controle. Objetos **agrupam o que pertence junto** e permitem passar o registro inteiro pra uma função:

\`\`\`js
resolve apresenta(pessoa) {
  grita-ae(pessoa.nome + " tem " + pessoa.idade + " anos")
}

apresenta(usuario)
\`\`\`

## Alterando objetos

\`\`\`js
usuario.idade = 26
usuario.cidade = "São Paulo"   // adiciona campo novo
grita-ae(usuario)
\`\`\`

## Combinando arrays e objetos

O padrão mais comum em programação real: um **array de objetos** (uma lista de registros):

\`\`\`js
cria usuarios = [
  { nome: "Ana", idade: 25 },
  { nome: "Bob", idade: 30 },
  { nome: "Cris", idade: 22 }
]

repete-na-moral (cria i = 0; i < tamanho(usuarios); i++) {
  grita-ae(usuarios[i].nome + " - " + usuarios[i].idade + " anos")
}
\`\`\`

É assim que bancos de dados, APIs e arquivos JSON representam dados: uma lista de registros, cada um com os mesmos campos. Entender esse padrão destrava tudo o que vem depois — incluindo o ORM.`,
          order: 4, points: 10,
        },
      ],
    },
    {
      title: "Controle de Fluxo",
      slug: "controle",
      order: 3,
      lessons: [
        {
          slug: "se-pah",
          title: "se-pah / ai — Condicionais",
          bodyMd: `Condicionais fazem o programa **decidir** o caminho. O \`se-pah\` é o "if" do XanaScript.

\`\`\`js
cria idade = 18

se-pah (idade >= 18) {
  grita-ae("maior de idade")
} ai {
  grita-ae("menor de idade")
}
\`\`\`

## Por que chamamos de "se-pah"?

\`se-pah\` (abreviação de "se pá", gíria pra "talvez") expressa exatamente o que um if faz: **"se calhar disso, faço A; senão, faço B"**. A condição dentro dos \`()\` é avaliada como verdadeiro ou falso.

## ai se-pah (else if)

Pra mais de dois caminhos, encadeie:

\`\`\`js
cria nota = 6

se-pah (nota >= 7) {
  grita-ae("aprovado")
} ai se-pah (nota >= 5) {
  grita-ae("recuperação")
} ai {
  grita-ae("reprovado")
}
\`\`\`

A ordem importa: o primeiro \`se-pah\` verdadeiro vence e os outros nem são avaliados. Ponha as condições **mais específicas primeiro**.

## Sem bloco (uma linha)

Quando o corpo tem só uma instrução:

\`\`\`js
se-pah (ok) grita-ae("deu certo")
\`\`\`

## O que conta como "verdadeiro"?

A condição espera um booleano. Valores como \`nulo\` ou \`0\` são avaliados como **falso** em contexto booleano — um atalho comum e seguro:

\`\`\`js
cria usuario = nulo
se-pah (usuario) {
  // não roda: nulo é falso
}
\`\`\`

## Exemplo real: validação de entrada

\`\`\`js
cria senha = "123"

se-pah (tamanho(senha) < 8) {
  grita-ae("senha fraca: precisa de 8+ caracteres")
} ai {
  grita-ae("senha ok")
}
\`\`\``,
          order: 1, points: 10,
        },
        {
          slug: "vai-de",
          title: "vai-de — Escolhendo pelo Valor",
          bodyMd: `O \`vai-de\` é o switch do XanaScript. Quando você compara uma **mesma variável contra vários valores**, ele fica mais legível que uma cadeia de \`se-pah\`.

\`\`\`js
cria dia = "terça"

vai-de (dia) {
  se-for "segunda": grita-ae("começou a semana")
  se-for "sexta": grita-ae("sextou!")
  se-nao-der: grita-ae("dia normal")
}
\`\`\`

## Por que usar vai-de em vez de vários se-pah?

Compare:

\`\`\`js
// Com se-pah
se-pah (dia == "segunda") { ... }
ai se-pah (dia == "sexta") { ... }
ai { ... }

// Com vai-de
vai-de (dia) {
  se-for "segunda": ...
  se-for "sexta": ...
  se-nao-der: ...
}
\`\`\`

O \`vai-de\` deixa claro que **todos os casos falam da mesma variável** — o leitor não precisa verificar "essa condição é sobre qual variável?" a cada linha.

## Múltiplos casos

Quando vários valores caem no mesmo caminho:

\`\`\`js
cria n = 2

vai-de (n) {
  se-for 1:
  se-for 2:
    grita-ae("baixo")
  se-for 3, 4:
    grita-ae("médio")
  se-nao-der:
    grita-ae("alto")
}
\`\`\`

## Como expressão

O \`vai-de\` também **retorna um valor** — use no lugar de um ternário complexo:

\`\`\`js
cria fib = (n) => vai-de (n) {
  se-for 0 => 0
  se-for 1 => 1
  se-nao-der => fib(n - 1) + fib(n - 2)
}

grita-ae(fib(10))  // 55
\`\`\`

Isso é Fibonacci com pattern matching: a função se define pelos casos em vez de por uma lógica imperativa. Quando você vê \`se-for 0 => 0\`, lê direto: "se n for 0, vale 0".`,
          order: 2, points: 10,
        },
        {
          slug: "ve-se",
          title: "ve-se — Pattern Matching",
          bodyMd: `O \`ve-se\` é o pattern matching: combina um valor contra vários **padrões**, não só valores. É o parente poderoso do \`vai-de\`.

\`\`\`js
cria descrever = (n) => ve-se (n) {
  bateu-com 0: "zero"
  bateu-com 1: "um"
  qualquer-coisa: "muitos"
}

grita-ae(descrever(0))   // zero
grita-ae(descrever(42))  // muitos
\`\`\`

## Por que pattern matching é mais seguro que if?

No \`se-pah\` você compara com \`==\` manualmente e **esquece casos** fácil. No \`ve-se\`, você é forçado a pensar em todos os casos porque a estrutura exige um padrão pra cada situação — e o \`qualquer-coisa\` (o caso "resto") documenta explicitamente o que acontece com o que não casou.

## Wildcard (\`_\`)

O \`_\` é um curinga que ignora o valor:

\`\`\`js
cria rotular = (x) => ve-se (x) {
  bateu-com 0: "nada"
  bateu-com _: "tem coisa"
}
\`\`\`

## Comparando valores específicos

\`\`\`js
cria verifica = (cor) => ve-se (cor) {
  bateu-com "vermelho": "quente"
  bateu-com "azul": "frio"
  qualquer-coisa: "neutro"
}
\`\`\`

## Ordem dos padrões importa

O primeiro padrão que casa vence. Ponha os **casos específicos antes dos genéricos** — se \`bateu-com _\` viesse primeiro, nada mais seria testado.`,
          order: 3, points: 10,
        },
        {
          slug: "repete",
          title: "repete — Laços e Iteração",
          bodyMd: `Laços executam um bloco **repetidamente**. O XanaScript tem dois: \`repete-na-moral\` (for) e \`repete-enquanto\` (while).

## repete-na-moral (for) — "quando você sabe quantas vezes"

\`\`\`js
repete-na-moral (cria i = 0; i < 5; i = i + 1) {
  grita-ae(i)
}
\`\`\`

Saída: \`0 1 2 3 4\`

Três partes: **inicialização** (\`cria i = 0\`), **condição** (\`i < 5\`) e **passo** (\`i = i + 1\`). O loop roda enquanto a condição for verdadeira.

## Por que três partes?

Cada parte responde uma pergunta: **onde começa? até quando? como anda?** Separar isso torna o laço previsível — o contador não fica escondido dentro do corpo.

## A forma mais comum: \`i++\`

\`\`\`js
repete-na-moral (cria i = 10; i > 0; i--) {
  grita-ae(i)
}
\`\`\`

## Percorrendo arrays

Este é o padrão nº 1 de laços na prática — passar por cada elemento:

\`\`\`js
cria frutas = ["maçã", "banana", "uva"]
repete-na-moral (cria i = 0; i < tamanho(frutas); i++) {
  grita-ae(frutas[i])
}
\`\`\`

## repete-enquanto (while) — "enquanto a condição for verdadeira"

Use quando **você não sabe quantas vezes** vai rodar — só sabe a condição de parada:

\`\`\`js
cria i = 0
repete-enquanto (i < 5) {
  grita-ae(i)
  i = i + 1
}
\`\`\`

## A diferença essencial

| Laço | Quando usar |
|------|-------------|
| \`repete-na-moral\` | quantidade conhecida / percorrer coleção |
| \`repete-enquanto\` | parada depende de condição que muda durante o loop |

## mete-o-pe (break) e segue-o-baile (continue)

\`mete-o-pe\` **sai** do laço; \`segue-o-baile\` **pula** pra próxima iteração:

\`\`\`js
repete-na-moral (cria i = 0; i < 10; i = i + 1) {
  se-pah (i == 3) {
    segue-o-baile()   // pula o 3
  }
  se-pah (i == 7) {
    mete-o-pe()       // para no 7
  }
  grita-ae(i)
}
\`\`\`

Saída: \`0 1 2 4 5 6\`

## Loop infinito — e como escapar

\`repete-enquanto (verdadeiro)\` nunca para sozinho. Rode-o só com uma saída interna:

\`\`\`js
cria n = 0
repete-enquanto (verdadeiro) {
  n = n + 1
  se-pah (n == 100) {
    mete-o-pe()
  }
}
grita-ae(n)  // 100
\`\`\`

## Exemplo real: adivinhar número

\`\`\`js
cria alvo = escolhe(1, 10)
cria chute = 0

repete-enquanto (chute != alvo) {
  chute = chute + 1
}

grita-ae("Acertou em " + chute + " tentativas")
\`\`\``,
          order: 4, points: 10,
        },
        {
          slug: "tenta-fodeu",
          title: "tenta / fodeu — Tratando Erros",
          bodyMd: `Erros acontecem: arquivo não existe, JSON quebrado, API fora do ar. Código que não trata erros **quebra no meio do caminho**. O \`tenta / fodeu\` é a rede de segurança.

\`\`\`js
tenta {
  cria resultado = 10 / 0
} fodeu (erro) {
  grita-ae("Deu ruim: " + erro)
}
\`\`\`

## Por que tratar erros é essencial?

Sem tratamento, um erro **aborta o programa inteiro** no meio da execução. Com tratamento, você decide o que fazer: mostrar uma mensagem amigável, tentar de novo, usar um valor padrão.

## no-fim (finally) — roda sempre

O bloco \`no-fim\` roda com ou sem erro — perfeito pra limpeza:

\`\`\`js
tenta {
  cria dados = desembola(texto)
} fodeu (erro) {
  grita-ae("JSON inválido: " + erro)
} no-fim {
  grita-ae("operação terminou")
}
\`\`\`

## Exemplo real: JSON que pode falhar

\`desembola\` (JSON.parse) é o erro mais comum de se tratar:

\`\`\`js
tenta {
  cria dados = desembola("{\"nome\": \"Ana\"}")
  grita-ae(dados.nome)
} fodeu (err) {
  grita-ae("Erro: " + err)
}
\`\`\`

Se o JSON for inválido, o programa não quebra — imprime o erro e segue.

## O fluxo de controle do tenta

1. Roda o bloco \`tenta\`.
2. Se tudo der certo → pula o \`fodeu\`, roda \`no-fim\`, segue.
3. Se der erro → pula pra \`fodeu\` (com o erro na variável), roda \`no-fim\`, segue.

## Erros em código assíncrono

Erros de rede (API fora do ar, timeout) só aparecem depois do await — por isso o tenta é indispensável:

\`\`\`js
cria run = assincrono () => {
  tenta {
    cria res = stalkeia("https://api.exemplo.com/users/1")
    grita-ae(res)
  } fodeu (err) {
    grita-ae("Falha na rede: " + err)
  }
}

aguenta-ai run()
\`\`\``,
          order: 5, points: 10,
        },
      ],
    },
    {
      title: "Funções",
      slug: "funcoes",
      order: 4,
      lessons: [
        {
          slug: "declaracao",
          title: "Declaração com resolve",
          bodyMd: `Funções são blocos de código **reutilizáveis** com nome. Em vez de copiar e colar a mesma lógica, você escreve uma vez e chama quantas vezes precisar.

\`\`\`js
resolve soma(a, b) {
  volta a + b
}

cria r = soma(2, 3)
grita-ae(r)  // 5
\`\`\`

## Por que funções existem?

Três motivos:

1. **Reuso** — escreva uma vez, use em N lugares.
2. **Nomeação** — \`soma(a, b)\` diz o que faz melhor que \`a + b\` solto no meio do código.
3. **Testabilidade** — uma função pura é fácil de testar: mesmo entrada → mesma saída.

## volta (return)

O \`volta\` **devolve** um valor pro chamador e encerra a função:

\`\`\`js
resolve ehPar(n) {
  volta n % 2 == 0
}

grita-ae(ehPar(4))   // verdadeiro
grita-ae(ehPar(7))   // falso
\`\`\`

## Funções tipadas — documentação viva

\`\`\`js
resolve soma(a: eh-numero, b: eh-numero): eh-numero {
  volta a + b
}
\`\`\`

A assinatura já diz: "recebe dois números, devolve um número". O compilador valida as chamadas.

## Funções genéricas

Quando a função funciona pra qualquer tipo:

\`\`\`js
resolve identidade<T>(x: T): T {
  volta x
}

grita-ae(identidade(42))
grita-ae(identidade("olá"))
\`\`\`

## Funções de primeira classe

Em XanaScript, funções são **valores**: podem ser passadas como argumento:

\`\`\`js
resolve aplicar(fn, valor) {
  volta fn(valor)
}

grita-ae(aplicar((x) => x * 10, 4))  // 40
\`\`\`

## Por que "primeira classe" importa?

É o que permite passar \`fn\` como parâmetro — a base de callbacks, eventos e o servidor HTTP (\`escuta(3000, handler)\` recebe uma função!). Se funções não fossem valores, você não poderia "plugá-las" em lugares.`,
          order: 1, points: 10,
        },
        {
          slug: "arrow",
          title: "Arrow Functions e Closures",
          bodyMd: `Arrow functions são a forma **curta** de escrever funções. Ótimas pra funções pequenas e pra callbacks.

\`\`\`js
cria dobrar = (x) => x * 2
cria somar = (a, b) => { volta a + b }

grita-ae(dobrar(21))  // 42
\`\`\`

## Por que duas formas?

O \`resolve\` é pra funções nomeadas e com corpo (a "norma"). A arrow é pra funções **descartáveis** — aquelas que você passa direto como argumento:

\`\`\`js
// Sem arrow, o handler seria uma função inteira nomeada
escuta(3000, (req, res) => res.enviar("olá"))
\`\`\`

## Closures — a função que "lembra"

Uma closure é uma função que **captura variáveis do lugar onde nasceu**, mesmo depois desse lugar terminar:

\`\`\`js
resolve criarContador() {
  cria count = 0
  volta () => {
    count = count + 1
    volta count
  }
}

cria c = criarContador()
grita-ae(c())  // 1
grita-ae(c())  // 2
grita-ae(c())  // 3
\`\`\`

## Por que a closure funciona?

Quando \`criarContador\` termina, a variável \`count\` deveria sumir. Mas a arrow interna **segurou uma referência** a ela. Cada chamada a \`c\` mexe no MESMO \`count\` — por isso ele sobe 1, 2, 3. Cada chamada a \`criarContador()\` cria um contador independente.

## Aplicação real de closures

O exemplo mais comum: **estado privado** — dados que só a função conhece. É o embrião de objetos e de contadores de tentativas, caches, geradores.`,
          order: 2, points: 10,
        },
        {
          slug: "async",
          title: "Async e Requisições",
          bodyMd: `Programas reais precisam esperar: buscar dados de uma API, ler arquivos, dormir por um tempo. **Async** permite fazer essas esperas sem travar o programa. O XanaScript usa \`assincrono\` e \`aguenta-ai\`.

## Por que async existe?

Operações de rede são **lentas** (milissegundos a segundos). Se o código esperasse parado, nada mais rodaria. Async permite: "inicie a requisição, e quando ela voltar, continue daqui". O \`aguenta-ai\` é o ponto onde você para e espera o resultado.

## Arrow assíncrona

\`\`\`js
cria buscarUsuario = assincrono (id) => {
  cria res = stalkeia("https://jsonplaceholder.typicode.com/todos/" + id)
  volta res
}
\`\`\`

## Aguardando com aguenta-ai

\`\`\`js
cria main = assincrono () => {
  cria dados = aguenta-ai buscarUsuario(1)
  grita-ae(dados)
}

aguenta-ai main()
\`\`\`

Repare: \`aguenta-ai\` antes de uma **chamada de função** espera o resultado dela; \`aguenta-ai(1000)\` com um **número** dorme 1 segundo.

## Sleep

\`\`\`js
grita-ae("começando...")
aguenta-ai(1000)
grita-ae("1 segundo depois")
\`\`\`

## Combinando async com tenta / fodeu

Regra de ouro: **toda operação de rede deve ter tratamento de erro**:

\`\`\`js
cria buscar = assincrono () => {
  tenta {
    cria dados = aguenta-ai stalkeia("https://api.exemplo.com/dados")
    grita-ae("Dados:", dados)
  } fodeu (erro) {
    grita-ae("Falha: " + erro)
  }
}

aguenta-ai buscar()
\`\`\`

Se a API estiver fora do ar, o \`fodeu\` pega o erro e o programa continua vivo.

## O fluxo mental do async

1. \`assincrono () => {...}\` → a função vira um "script que pode esperar".
2. \`aguenta-ai algo()\` → "pausa aqui, espera o \`algo\` terminar, e me dá o resultado".
3. Erros dentro do corpo → vão pro \`fodeu\` mais próximo.

É a mesma lógica do dia a dia: você manda entregar um pedido (async), espera o entregador (aguenta-ai), e se não vier (erro), você reclama (fodeu).`,
          order: 3, points: 10,
        },
      ],
    },
    {
      title: "Orientação a Objetos",
      slug: "oo",
      order: 5,
      lessons: [
        {
          slug: "classes",
          title: "classe / spawna / esse-cara / novo",
          bodyMd: `Classes são **plantas** de objetos: definem os dados (atributos) e o comportamento (métodos) que cada instância terá. O XanaScript usa \`classe\`, \`spawna\` (construtor), \`esse-cara\` (this) e \`novo\` (instancia).

\`\`\`js
classe Animal {
  spawna(nome) {
    esse-cara.nome = nome
  }
  metodo falar() {
    volta "Au au " + esse-cara.nome
  }
}

cria a = novo Animal("Bidu")
grita-ae(a.nome)        // Bidu
grita-ae(a.falar())     // Au au Bidu
\`\`\`

## O que cada keyword faz?

| Keyword | Função |
|---------|--------|
| \`classe\` | declara a classe (o molde) |
| \`spawna\` | construtor: roda ao criar instância, monta o objeto |
| \`esse-cara\` | "this": refere-se à instância atual |
| \`novo\` | cria uma instância nova a partir da classe |
| \`metodo\` | função que pertence à classe |

## Por que classes existem?

Você já viu objetos (\`{ nome: "Ana", idade: 25 }\`). Classes levam isso além: **garantem que toda instância tenha a mesma forma** e juntam dados E comportamento num só lugar.

Sem classe, você teria que escrever a função \`falar\` pra cada animal separadamente:

\`\`\`js
// Com classe: o comportamento vem junto
cria a = novo Animal("Bidu")
a.falar()

// Sem classe: você precisaria recriar a lógica pra cada objeto
\`\`\`

## O que o spawna faz?

\`spawna\` é o primeiro método que roda. Ele **inicializa** o objeto. O \`novo\` chama o spawna automaticamente:

\`\`\`js
cria a = novo Animal("Bidu")
// 1. cria um objeto vazio da classe Animal
// 2. chama spawna("Bidu")
// 3. esse-cara.nome = "Bidu" grava o nome na instância
\`\`\`

## Por que \`esse-cara\` (this)?

Quando você tem duas instâncias, os métodos são os MESMOS — mas \`esse-cara\` diz "use os dados **desta** instância":

\`\`\`js
cria a = novo Animal("Bidu")
cria b = novo Animal("Rex")
grita-ae(a.falar())  // Au au Bidu  (esse-cara = a)
grita-ae(b.falar())  // Au au Rex   (esse-cara = b)
\`\`\`

O \`esse-cara\` é a ligação entre o código genérico do método e os dados específicos da instância.`,
          order: 1, points: 15,
        },
        {
          slug: "heranca",
          title: "herda — Herança e Polimorfismo",
          bodyMd: `Herança deixa uma classe **reaproveitar e especializar** outra. Com \`herda\`, uma classe filha ganha tudo da mãe e pode mudar o que precisar.

\`\`\`js
classe Animal {
  spawna(nome) {
    esse-cara.nome = nome
  }
  metodo falar() {
    volta "faz barulho"
  }
}

classe Cachorro herda Animal {
  metodo falar() {
    volta "Au au " + esse-cara.nome
  }
}

cria rex = novo Cachorro("Rex")
grita-ae(rex.falar())  // Au au Rex
\`\`\`

## O que a herança dá de graça?

\`Cachorro\` herda o \`spawna\` do \`Animal\` — o \`spawna(nome)\` funcionou sem ser reescrito. Isso é o **reuso**: a lógica comum fica na mãe, cada filha só escreve o que é diferente.

## Override — "eu faço do meu jeito"

A filha **sobrescreve** o método \`falar\` da mãe. Na hora de chamar, o XanaScript usa a versão mais específica (a do Cachorro). Chamar \`falar\` num \`Animal\` genérico dá "faz barulho"; num \`Cachorro\`, dá "Au au".

## Polimorfismo — o superpoder da herança

Polimorfismo = "várias formas". Uma lista de \`Animal\` pode conter cachorros, gatos, pássaros — e cada um \`falar()\` do seu jeito, mesmo que o código não saiba qual é qual:

\`\`\`js
cria animais = [novo Cachorro("Rex"), novo Animal("Gato")]

repete-na-moral (cria i = 0; i < tamanho(animais); i++) {
  grita-ae(animais[i].falar())
}
// Au au Rex
// faz barulho
\`\`\`

O código chama \`falar()\` sem se preocupar com a classe concreta — cada instância decide seu comportamento.

## Por que "herda" e não "implements"?

\`herda\` é herança clássica: uma relação "é um" (\`Cachorro\` **é um** \`Animal\`). Serve quando há reuso real de código e uma hierarquia natural. Use com moderação — hierarquias profundas viram complicação; muitas vezes composição (ter um objeto dentro de outro) resolve melhor.

## Resumo

| Keyword | Função |
|---------|--------|
| \`classe\` | declara classe |
| \`herda\` | herança (extends) |
| \`spawna\` | construtor |
| \`esse-cara\` | this |
| \`novo\` | cria instância |
| \`metodo\` | método da classe |`,
          order: 2, points: 15,
        },
      ],
    },
    {
      title: "Módulos e Ferramentas",
      slug: "modulos",
      order: 6,
      lessons: [
        {
          slug: "modulos",
          title: "traz-ai / manda-ai — Módulos",
          bodyMd: `Código grande em um arquivo só fica impossível de manter. **Módulos** dividem o programa em arquivos, cada um com uma responsabilidade.

## manda-ai (export)

Num arquivo \`math.xs\`, exporte o que outros arquivos podem usar:

\`\`\`js
// math.xs
manda-ai soma

resolve soma(a, b) {
  volta a + b
}
\`\`\`

## traz-ai (import)

Num \`main.xs\`, importe e use:

\`\`\`js
// main.xs
traz-ai "./math.xs" as matematica
grita-ae(matematica.soma(2, 3))  // 5
\`\`\`

## Por que dividir em módulos?

1. **Responsabilidade única** — cada arquivo faz uma coisa.
2. **Reuso** — o mesmo \`math.xs\` serve pra N programas.
3. **Isolamento** — erros ficam contidos; você sabe onde procurar.

## Import como expressão

\`\`\`js
cria mod = traz-ai "./mod_aux.xs"
\`\`\`

## Biblioteca padrão

A linguagem já vem com módulos prontos:

\`\`\`js
traz-ai "string" as str
traz-ai "math" as M

grita-ae(str.maiuscula("olá"))   // OLÁ
grita-ae(M.soma(2, 3))            // 5
\`\`\`

Módulo \`string\`: \`maiuscula\`, \`minuscula\`, \`aparada\`, \`começa-com\`, \`termina-com\`, \`tem\`, \`troca\`, \`invertida\`, \`repete\`, \`primeira-maiuscula\`, \`fatia\`.

Módulo \`math\`: \`soma\`, \`sub\`, \`mul\`, \`div\`, \`mod\`, \`abs\`, \`max\`, \`min\`, \`clamp\`.

## Por que existem módulos na biblioteca padrão?

Você não precisa reinventar o que todo mundo usa. \`str.maiuscula\` existe porque **toda aplicação manipula texto** — separar essas utilidades em módulos mantém a linguagem enxuta e as funções organizadas.

## Módulos Node.js

Qualquer pacote npm disponível também funciona:

\`\`\`js
traz-ai "axios" as http
\`\`\`

## Import cíclico é detectado

Se A importa B e B importa A, a linguagem detecta o ciclo e **retorna erro de compilação** em vez de travar — uma proteção automática contra um dos erros mais confusos de módulos.`,
          order: 1, points: 10,
        },
        {
          slug: "builtins",
          title: "Funções Embutidas",
          bodyMd: `As funções builtin vêm prontas, sem import. São as ferramentas que você usa todos os dias.

## Saída

\`grita-ae\` imprime no stdout (saída normal); \`sussurra\` imprime no stderr (para avisos e erros):

\`\`\`js
grita-ae("mensagem normal")
sussurra("aviso importante")
\`\`\`

## Por que separar stdout e stderr?

Programas profissionais **redirecionam** as saídas: o stdout vai pro log normal, o stderr pra monitorar erros. Separar permite filtrar "o que deu certo" de "o que deu errado" sem misturar.

## Utilitários

| Função | Descrição |
|--------|-----------|
| \`horinha()\` | timestamp atual (ms) |
| \`traduz-ai(x)\` | converte pra texto |
| \`tamanho(x)\` | tamanho de string/array |
| \`desembola(json)\` | JSON.parse (texto → objeto) |
| \`embrulha(valor, espaco?)\` | JSON.stringify (objeto → texto) |
| \`hash(texto)\` | SHA-256 em hex |
| \`url(s)\` | encodeURIComponent |
| \`decodifica-url(s)\` | URL decode |
| \`data-agora()\` | data ISO atual |
| \`data-de-ms(ms)\` | ms → data ISO |

\`\`\`js
cria obj = { nome: "Ana" }
cria texto = embrulha(obj)
cria deVolta = desembola(texto)
grita-ae(deVolta.nome)  // Ana
\`\`\`

## Rede e ambiente

| Função | Descrição |
|--------|-----------|
| \`stalkeia(url)\` | HTTP GET → JSON (timeout 3s) |
| \`bisbilhota(chave)\` | variável de ambiente |

\`\`\`js
cria token = bisbilhota("API_TOKEN")
\`\`\`

## Por que ler variáveis de ambiente?

Senhas e chaves de API **nunca** devem ficar no código (vazam no repositório). Variáveis de ambiente ficam fora do código e o \`bisbilhota\` traz elas pro programa quando ele roda.

## Strings

| Função | Descrição |
|--------|-----------|
| \`divide-texto(texto, sep)\` | split (texto → array) |
| \`juntar(arr, sep)\` | join (array → texto) |
| \`encontra(s, sub)\` | regex match (array ou nulo) |

\`\`\`js
cria partes = divide-texto("a,b,c", ",")
grita-ae(partes)          // ["a","b","c"]
grita-ae(juntar(partes, "-"))  // "a-b-c"
\`\`\`

## Tempo e aleatório

| Função | Descrição |
|--------|-----------|
| \`aguenta-ai(ms)\` | sleep (espera) |
| \`escolhe(min, max)\` | inteiro aleatório |

\`\`\`js
cria num = escolhe(1, 6)
grita-ae("Dado: " + num)
\`\`\`

## A lógica por trás: por que tantas funções?

Cada builtin resolve um problema universal: transformar dados (\`desembola\`/\`embrulha\`), comunicar (\`grita-ae\`/\`stalkeia\`), medir tempo (\`horinha\`/\`data-agora\`). Quando um problema aparece em TODO programa, ele vira builtin — e você não precisa nem saber como implementa, só o que faz.`,
          order: 2, points: 10,
        },
      ],
    },
    {
      title: "Projeto Final",
      slug: "projeto",
      order: 7,
      lessons: [
        {
          slug: "crud-orm",
          title: "CRUD com ORM — Dados sem SQL",
          bodyMd: `O ORM embutido (a keyword \`DB\`) te dá um banco de dados **com validação de tipos, sem dependências**. Declare um modelo e ganhe CRUD automático.

## Declarando uma tabela

\`\`\`js
DB Usuario {
  nome: eh-palavra,
  idade: eh-numero,
  email: eh-palavra
}
\`\`\`

O \`DB\` diz: "cria um armazenamento chamado Usuario, onde todo registro precisa ter esses campos com esses tipos".

## Por que um ORM?

Sem ORM você escreveria SQL à mão, cuidaria de conexão, validação, backup. O ORM **remove a cerimônia**: declara o formato e usa. Os tipos declarados (\`eh-palavra\`, \`eh-numero\`) viram validação automática — inserir um valor de tipo errado é rejeitado na hora, com os campos inválidos listados.

## CRUD completo

\`\`\`js
DB Usuario {
  nome: eh-palavra,
  idade: eh-numero,
  email: eh-palavra
}

cria repo = Usuario

// CREATE
repo.bota-ai({ nome: "João", idade: 30, email: "joao@email.com" })
repo.bota-ai({ nome: "Maria", idade: 25, email: "maria@email.com" })

// READ (lista todos)
cria todos = repo.vê()
grita-ae(todos)

// READ (por id)
cria usuario = repo.acha(1)
grita-ae("Usuário 1:", usuario)

// UPDATE
repo.alterakkkk(1, { nome: "João Silva", idade: 31 })

// DELETE
repo.apaga-ae(3)

// FILTER
cria jovens = repo.achaOnde({ idade: 25 })

// COUNT
grita-ae("Total:", repo.quantos?())
\`\`\`

## CRUD é o básico de todo sistema

C**reate** (criar), R**ead** (ler), U**pdate** (atualizar), D**elete** (apagar) — 90% das aplicações são CRUD sobre alguma coisa: usuários, produtos, pedidos, posts. Dominar esse padrão destrava tudo.

## Métodos do DB

| Método | Descrição |
|--------|-----------|
| \`bota-ai(dados)\` | insere; retorna com \`id\` e \`criadoEm\` |
| \`vê()\` | lista todos |
| \`acha(id)\` | busca por id (ou \`nulo\`) |
| \`altera(id, mudancas)\` | atualiza |
| \`alterakkkk(id, mudancas)\` | alias de \`altera\` |
| \`apaga-ae(id)\` | deleta |
| \`achaOnde(filtro)\` | filtra por campos |
| \`select(campos)\` | retorna só campos selecionados |
| \`quantos?()\` | conta registros |
| \`limpar()\` | apaga tudo |

## Validação

Inserir tipo errado é rejeitado na hora:

\`\`\`js
repo.bota-ai({ nome: 123 })   // ERRO: nome precisa ser eh-palavra
\`\`\`

## Onde os dados ficam?

Em \`.db/<modelo>.json\` no diretório do projeto — nada de servidor de banco pra configurar. Antes de cada save, um backup \`.bak\` é criado, com **restauração automática** se o arquivo corromper. Ou seja: seus dados não somem por um arquivo quebrado.

## Exercício

Crie um CRUD de \`Produto\` com nome, preço e estoque. Insira 3 produtos, filtre por \`estoque: 10\`, atualize um, e imprima a contagem.`,
          order: 1, points: 20,
        },
        {
          slug: "servidor-final",
          title: "Projeto Final — API + CRUD + Async",
          bodyMd: `Hora de juntar TUDO: ORM, async, tenta/fodeu e o servidor HTTP embutido. Você vai criar uma **API completa** com poucas linhas — o resumo de tudo que aprendeu.

## Servidor HTTP embutido (escuta)

\`escuta\` abre um servidor na porta indicada. O segundo argumento é uma função que roda a cada requisição:

\`\`\`js
escuta(3000, (req, res) => {
  grita-ae(req.metodo, req.url)

  se-pah (req.url == "/") {
    res.enviar("Bem-vindo ao XanaScript Server!")
  } ai se-pah (req.url == "/json") {
    res.json({ mensagem: "Olá!", versao: "3.0" })
  } ai {
    res.status(404).enviar("404 - Rota não encontrada")
  }
})

grita-ae("Servidor rodando em http://localhost:3000")
\`\`\`

## Por que um servidor embutido?

Sem servidor, seu programa roda e acaba — não serve nada pra ninguém. Com \`escuta\`, o programa **fica vivo** esperando requisições. É o salto de "script local" pra "aplicação que outros usam".

## Objeto da requisição (req)

| Campo | Descrição |
|-------|-----------|
| \`req.url\` | caminho da URL |
| \`req.metodo\` | método HTTP (GET, POST...) |
| \`req.cabecalhos\` | cabeçalhos |
| \`req.corpo\` | corpo da requisição |

## Objeto da resposta (res)

| Método | Descrição |
|--------|-----------|
| \`res.enviar(dados, tipo?)\` | envia resposta |
| \`res.json(dados)\` | envia JSON |
| \`res.status(codigo)\` | define status (chainable) |
| \`res.cabecalho(chave, valor)\` | define cabeçalho (chainable) |

## Projeto completo: API de mensagens com banco

Agora junte o ORM com o servidor. Crie \`api.xs\`:

\`\`\`js
DB Mensagem {
  autor: eh-palavra,
  texto: eh-palavra
}

cria repo = Mensagem

escuta(3000, (req, res) => {
  tenta {
    se-pah (req.url == "/mensagens" && req.metodo == "GET") {
      res.json(repo.vê())
    } ai se-pah (req.url == "/mensagens" && req.metodo == "POST") {
      cria dados = req.corpo
      cria nova = repo.bota-ai(dados)
      res.status(201).json(nova)
    } ai {
      res.status(404).json({ erro: "rota não encontrada" })
    }
  } fodeu (erro) {
    res.status(400).json({ erro: erro })
  }
})

grita-ae("API rodando em http://localhost:3000")
\`\`\`

## O que cada pedaço ensina

| Pedaço | Conceito usado |
|--------|----------------|
| \`DB Mensagem {...}\` | ORM com validação |
| \`cria repo = Mensagem\` | CRUD automático |
| \`escuta(3000, fn)\` | servidor HTTP + arrow function |
| \`se-pah (req.url...)\` | condicional roteando rotas |
| \`res.json\` / \`res.status\` | resposta HTTP |
| \`tenta ... fodeu\` | tratamento de erro: erros viram 400 |

## Testando

Rode \`xana roda api.xs\`, e em outro terminal:

\`\`\`bash
curl http://localhost:3000/mensagens
curl -X POST http://localhost:3000/mensagens -d '{"autor":"Ana","texto":"oi"}'
\`\`\`

## Parando o servidor

\`\`\`js
cria server = escuta(3000, handler)
terminamos!(server)
\`\`\`

## Por que isso é o "projeto final"?

Este único arquivo usa quase tudo do curso: variáveis e tipos, condicionais, arrow functions, async/await, tenta/fodeu, módulos de dados e servidor. É o momento em que as peças se encaixam — daqui pra frente você já sabe "ler" XanaScript e construir coisas reais.`,
          order: 2, points: 20,
        },
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
    { question: "Qual função imprime texto no console?", options: ["grita-ae(\"texto\")", "SOLTA O GRITO(\"texto\")", "PRINT(\"texto\")", "CONSOLE(\"texto\")"], answer: "grita-ae(\"texto\")", points: 5 },
    { question: "Como declarar uma variável em XanaScript?", options: ["VAR x = 10", "LET x = 10", "cria x = 10", "DECLARE x = 10"], answer: "cria x = 10", points: 5 },
    { question: "Qual palavra-chave representa verdadeiro?", options: ["TRUE", "VERDADE", "verdadeiro", "SIM"], answer: "verdadeiro", points: 5 },
  ],
};

export async function seed() {
  console.log("[seed] Iniciando seed...");

  await DocArticle.deleteMany({});
  await DocArticle.insertMany(docs);
  console.log(`[seed] ${docs.length} artigos criados (documentação reescrita)`);

  await PlaygroundExample.deleteMany({});
  await PlaygroundExample.insertMany(examples);
  console.log(`[seed] ${examples.length} exemplos criados (V3)`);

  const pageCount = await PageContent.countDocuments();
  if (pageCount === 0) {
    await PageContent.insertMany([
      { key: "home", title: "Página Inicial", content: { hero: { title: "Programe em Português", subtitle: "XanaScript é uma linguagem de programação com sintaxe em português." } } },
    ]);
    console.log("[seed] Páginas criadas");
  }

  await Course.deleteMany({});
  await Quiz.deleteMany({});
  const course = await Course.create(courseData);
  console.log(`[seed] Curso "${course.title}" criado (V3)`);

  const quizDataWithCourse = { ...quizData, course: course._id };
  await Quiz.create(quizDataWithCourse);
  console.log("[seed] Quiz criado (V3)");

  console.log("[seed] Seed concluído!");
}

if (process.argv[1]?.includes("seed") || process.env.npm_lifecycle_event === "seed") {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => seed())
    .then(() => process.exit(0))
    .catch(e => { console.error(e); process.exit(1); });
}
