import { marked } from "marked";
import hljs from "highlight.js";

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }) {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  let highlighted;
  try {
    highlighted = hljs.highlight(text, { language }).value;
  } catch {
    highlighted = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  const langLabel = lang ? `<span class="md-code-lang">${lang}</span>` : "";
  return `<div class="md-code"><div class="md-code-bar">${langLabel}</div><pre><code class="hljs language-${language}">${highlighted}</code></pre></div>`;
};

marked.use({ renderer, gfm: true, breaks: true });

export function renderMarkdown(md) {
  if (!md) return "";
  return marked.parse(md);
}