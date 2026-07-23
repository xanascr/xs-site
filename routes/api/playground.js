import { Router } from "express";
import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { randomBytes } from "crypto";

const router = Router();

router.post("/run", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ ok: false, error: "Código vazio" });

  const tmpFile = join(tmpdir(), `xs-playground-${randomBytes(4).toString("hex")}.xs`);
  try {
    writeFileSync(tmpFile, code, "utf-8");
    const stdout = execSync(`node ${join(process.cwd(), "..", "bin", "xs.js")} run "${tmpFile}" 2>&1 || true`, {
      timeout: 5000,
      encoding: "utf-8",
    });
    res.json({ ok: true, output: stdout || "(sem saída)" });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  } finally {
    try { unlinkSync(tmpFile); } catch {}
  }
});

export default router;
