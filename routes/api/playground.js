import { Router } from "express";
import { asyncHandler } from "../../middleware/auth.js";
import { execFile } from "child_process";
import { promisify } from "util";
import { writeFileSync, unlinkSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { randomBytes } from "crypto";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const execFileAsync = promisify(execFile);

const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, "");
const maskPath = (s) => String(s).replace(/[A-Za-z]:\\[^\s"']*xs-playground-[0-9a-f]+\.xs/g, "input.xs").replace(/xs-playground-[0-9a-f]+\.xs/g, "input.xs");

function resolveXsBin() {
  if (process.env.XS_BIN) return process.env.XS_BIN;
  try {
    const require = createRequire(import.meta.url);
    const pkg = require.resolve("xanascript/package.json");
    const pkgDir = dirname(pkg);
    const bin = join(pkgDir, "bin", "xs.js");
    if (existsSync(bin)) return bin;
  } catch {}
  const local = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "xs", "bin", "xs.js");
  if (existsSync(local)) return local;
  return join(process.cwd(), "..", "xs", "bin", "xs.js");
}

const XS_BIN = resolveXsBin();
const NODE_BIN = process.execPath;

const router = Router();

function runXs(args, code) {
  const name = `xs-playground-${randomBytes(4).toString("hex")}.xs`;
  const tmpFile = join(tmpdir(), name);
  writeFileSync(tmpFile, code, "utf-8");
  return execFileAsync(NODE_BIN, [XS_BIN, ...args, name], {
    cwd: tmpdir(),
    timeout: 5000,
    encoding: "utf-8",
    maxBuffer: 1024 * 1024,
  }).finally(() => {
    try { unlinkSync(tmpFile); } catch {}
  });
}

router.use((req, res, next) => {
  if (!existsSync(XS_BIN)) {
    return res.status(500).json({ ok: false, error: "Playground indisponível: compilador XanaScript não encontrado no servidor (defina XS_BIN)." });
  }
  next();
});

router.post("/run", asyncHandler(async (req, res) => {
  const code = req.body.code?.trim();
  if (!code) return res.status(400).json({ ok: false, error: "Código vazio" });

  try {
    const { stdout } = await runXs(["run"], code);
    res.json({ ok: true, output: stripAnsi(maskPath(stdout)) || "(sem saída)" });
  } catch (e) {
    const detail = e.stderr || e.stdout || e.message || "Erro ao executar código";
    res.json({ ok: false, error: stripAnsi(maskPath(detail)).trim() || "Erro ao executar código" });
  }
}));

router.post("/format", asyncHandler(async (req, res) => {
  const code = req.body.code?.trim();
  if (!code) return res.status(400).json({ ok: false, error: "Código vazio" });

  try {
    const { stdout } = await runXs(["fmt"], code);
    res.json({ ok: true, code: stripAnsi(maskPath(stdout)).trimEnd() });
  } catch (e) {
    const detail = e.stderr || e.stdout || e.message || "Erro ao formatar código";
    res.json({ ok: false, error: stripAnsi(maskPath(detail)).trim() || "Erro ao formatar código" });
  }
}));

export default router;