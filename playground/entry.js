import { lex } from "./xs-src/lexer.js";
import { parse } from "./xs-src/parser.js";
import { optimize } from "./xs-src/optimizer.js";
import { interpret } from "./xs-src/interpreter.js";
import { setSource } from "./xs-src/errors.js";

export async function playgroundRun(code) {
  const output = [];

  const env = {
    SOLTA_O_GRITO: (...a) => {
      const text = a.map(String).join(" ");
      output.push(text);
    },
    FALA_BAIXO: (...a) => {
      const text = a.map(String).join(" ");
      output.push(text);
    },
    AGORA: () => Date.now(),
    AGORA_VAI: async (url) => {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
        return await res.json();
      } catch (e) {
        output.push("> AGORA_VAI: " + e.message + " (simulated)");
        return { simulated: true };
      }
    },
    ESPERA_AI: (ms) => new Promise((r) => setTimeout(r, ms)),
    SORTEIA: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
    PARSEIA: JSON.parse,
    TAMANHO: (arr) => (arr && arr.length !== undefined ? arr.length : 0),
    ENCONTRA: (str, pat) => String(str).match(new RegExp(pat)),
    DIVIDE_TEXTO: (str, sep) => String(str).split(sep),
    JUNTAR: (arr, sep) => arr.join(sep),
    DECODIFICA_URL: decodeURIComponent,
    OUVE_AQUI: () => null,
    CRIA_SERVIDOR: () => output.push("> Servidor (simulado)"),
    PARA_SERVIDOR: () => {},
    __IMPORT__: async () => {
      output.push("> Import (simulado)");
      return {};
    },
  };

  setSource(code, "input.xs");

  try {
    const tokens = lex(code, "input.xs");
    let ast = parse(tokens);
    ast = optimize(ast);
    await interpret(ast, env);
  } catch (e) {
    if (e.name === "XSError") {
      output.push("Error: " + e.message);
      if (e.hint) output.push("Hint: " + e.hint);
    } else {
      output.push("Error: " + e.message);
    }
  }

  return output.join("\n");
}

window.playgroundRun = playgroundRun;
