import { Router } from "express";
import { asyncHandler } from "../../middleware/auth.js";
import { execFile } from "child_process";
import { promisify } from "util";
import { writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { randomBytes } from "crypto";

const execFileAsync = promisify(execFile);

const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, "");
const maskPath = (s) => String(s).replace(/[A-Za-z]:\\[^\s"']*xs-playground-[0-9a-f]+\.xs/g, "input.xs").replace(/xs-playground-[0-9a-f]+\.xs/g, "input.xs");

const XS_BIN = join(process.cwd(), "..", "xs", "bin", "xs.js");
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