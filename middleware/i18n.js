import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const locales = {};
const dir = path.join(__dirname, "..", "locales");
for (const f of fs.readdirSync(dir)) {
  const lang = f.replace(".json", "");
  locales[lang] = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
}

const SUPPORTED = ["en", "pt", "es"];

export function i18n(req, res, next) {
  let lang = "en";
  const accept = req.headers["accept-language"];
  if (accept) {
    for (const s of accept.split(",")) {
      const code = s.trim().slice(0, 2);
      if (SUPPORTED.includes(code)) { lang = code; break; }
    }
  }
  if (SUPPORTED.includes(req.query.lang)) lang = req.query.lang;

  req.lang = lang;
  res.locals.lang = lang;
  res.locals.t = (key, ...args) => {
    let v = locales[lang]?.[key] ?? locales.en?.[key] ?? key;
    args.forEach((a, i) => { v = v.replace(`{${i}}`, a); });
    return v;
  };
  res.locals.alternates = SUPPORTED.map(l => ({
    lang: l,
    href: `/${l === "en" ? "" : l}${req.path}`,
  }));

  next();
}
