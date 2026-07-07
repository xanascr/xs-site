import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export function sanitizeHtml(dirty) {
  if (!dirty) return "";
  return purify.sanitize(dirty, {
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
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
  });
}
