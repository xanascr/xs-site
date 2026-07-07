import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { marked } from "marked";
import hljs from "highlight.js";

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch { }
    }
    return code;
  },
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
