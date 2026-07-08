import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

// Register XanaScript language for highlight.js
hljs.registerLanguage("xs", function(hljs) {
  const KEYWORDS = [
    "CRIA", "SOLTA", "O", "GRITO", "SE", "LIGA", "SO",
    "SENAO", "REPETE", "AI", "NA", "MORAL", "ENQUANTO",
    "CHAMA", "ESSE", "CARA", "VOLTA", "TENTA", "PEGA",
    "CLASSE", "HERDA", "CONSTRUTOR", "METODO", "ISTO",
    "NOVA", "TABELA", "IMPORTA", "COMO", "AS",
    "COMBINA", "CASO", "ASSINCRONO", "AGORA", "VAI",
    "ESPERA", "TAREFA", "MACRO", "MEDE",
    "VERDADEIRO", "FALSO", "NULO",
    "SE_LIGA_SO", "SOLTA_O_GRITO", "SOLTA_O_GRITO",
  ];
  const TYPES = [
    "TEXTO", "NUMERO", "BOOLEANO", "LISTA", "DICIONARIO",
  ];
  const BUILTINS = [
    "TAMANHO", "PARSEIA", "OUVE_TUDO",
    "TEXTO", "NUMERO",
  ];

  return {
    name: "XanaScript",
    aliases: ["xanascript"],
    keywords: {
      keyword: KEYWORDS,
      type: TYPES,
      built_in: BUILTINS,
      literal: ["VERDADEIRO", "FALSO", "NULO"],
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [{ begin: /\\./ }],
      },
    ],
  };
});

marked.use(markedHighlight({
  langPrefix: "hljs language-",
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
      } catch { }
    }
    return code;
  },
}));

marked.setOptions({
  gfm: true,
  breaks: true,
});

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export function sanitizeHtml(dirty) {
  if (!dirty) return "";
  const html = marked.parse(dirty);
  return purify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "ul", "ol", "li",
      "pre", "code",
      "strong", "em", "b", "i", "u", "s",
      "a", "img",
      "blockquote",
      "table", "thead", "tbody", "tr", "th", "td",
      "div", "span",
      "dl", "dt", "dd",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "class"],
  });
}
