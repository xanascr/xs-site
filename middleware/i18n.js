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

export function i18n(req, res, next) {
  res.locals.lang = "pt";
  res.locals.t = (key, ...args) => {
    let v = locales.pt?.[key] ?? key;
    args.forEach((a, i) => { v = v.replace(`{${i}}`, a); });
    return v;
  };
  res.locals.alternates = [];
  next();
}