import { Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { signToken, auth, adminAuth, SECRET } from "../middleware/auth.js";
import { generateApiKey, hashToken } from "../services/apiKey.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  send2FAEnabled,
  send2FABackupCodes,
} from "../services/email.js";
import {
  generateSecret,
  verifyToken,
  generateBackupCodes,
  verifyBackupCode,
  hashBackupCodes,
} from "../services/twoFactor.js";

const router = Router();

// ── Signup ────────────────────────────────────────────────────────────

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, privacyConsent } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, error: "username, email, password required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ ok: false, error: "Password must be at least 8 characters" });
    }
    if (!privacyConsent) {
      return res.status(400).json({ ok: false, error: "You must agree to the privacy policy" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email format" });
    }
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ ok: false, error: "Username or email already taken" });
    }
    const user = await User.create({
      username,
      email,
      password,
      privacyConsent: true,
      privacyConsentAt: new Date(),
    });

    const token = user.generateVerificationToken();
    await user.save();

    // Don't block signup — queue verification email
    await sendVerificationEmail(user.email, user.username, token);

    const jwtToken = signToken(user);
    res.status(201).json({
      ok: true,
      token: jwtToken,
      user: user.toPublic(),
      emailVerificationRequired: true,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Login (with 2FA support) ──────────────────────────────────────────

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ ok: false, error: "username and password required" });
    }
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    // Enforce email verification — allow login but warn
    if (!user.emailVerified) {
      return res.status(403).json({
        ok: false,
        error: "Please verify your email before logging in. Check your inbox or request a new verification link.",
        emailNotVerified: true,
      });
    }

    // If 2FA enabled, require second factor
    if (user.twoFactorEnabled) {
      const tempToken = jwt.sign(
        { id: user._id, purpose: "2fa" },
        SECRET,
        { expiresIn: "5m" }
      );
      return res.json({
        ok: true,
        require2fa: true,
        tempToken,
      });
    }

    const jwtToken = signToken(user);
    res.json({ ok: true, token: jwtToken, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── 2FA: Complete login with TOTP code ───────────────────────────────

router.post("/2fa/verify", async (req, res) => {
  try {
    const { tempToken, code } = req.body;
    if (!tempToken || !code) {
      return res.status(400).json({ ok: false, error: "tempToken and code required" });
    }

    let payload;
    try {
      payload = jwt.verify(tempToken, SECRET);
    } catch {
      return res.status(401).json({ ok: false, error: "Invalid or expired tempToken" });
    }
    if (payload.purpose !== "2fa") {
      return res.status(401).json({ ok: false, error: "Invalid token purpose" });
    }

    const user = await User.findById(payload.id);
    if (!user || !user.twoFactorEnabled) {
      return res.status(401).json({ ok: false, error: "2FA not enabled for this account" });
    }

    // Try TOTP code first
    if (await verifyToken(user.twoFactorSecret, code)) {
      const jwtToken = signToken(user);
      return res.json({ ok: true, token: jwtToken, user: user.toPublic() });
    }

    // Try backup codes
    const usedCodeHash = verifyBackupCode(code, user.twoFactorBackupCodes);
    if (usedCodeHash) {
      user.twoFactorBackupCodes = user.twoFactorBackupCodes.filter(h => h !== usedCodeHash);
      await user.save();
      const jwtToken = signToken(user);
      return res.json({ ok: true, token: jwtToken, user: user.toPublic(), usedBackupCode: true });
    }

    return res.status(401).json({ ok: false, error: "Invalid 2FA code" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── 2FA: Setup (generate secret) ──────────────────────────────────────

router.post("/2fa/setup", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (user.twoFactorEnabled) {
      return res.status(400).json({ ok: false, error: "2FA already enabled. Disable it first to reconfigure." });
    }

    const { secret, otpauth } = generateSecret(user.username);
    user.twoFactorSecret = secret;
    await user.save();

    res.json({
      ok: true,
      secret,
      otpauth,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── 2FA: Confirm (enable) ─────────────────────────────────────────────

router.post("/2fa/confirm", auth, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ ok: false, error: "Verification code required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (!user.twoFactorSecret) {
      return res.status(400).json({ ok: false, error: "Run /2fa/setup first" });
    }
    if (user.twoFactorEnabled) {
      return res.status(400).json({ ok: false, error: "2FA already enabled" });
    }

    if (!(await verifyToken(user.twoFactorSecret, code))) {
      return res.status(401).json({ ok: false, error: "Invalid code. Make sure your authenticator app is synced." });
    }

    const backupCodes = generateBackupCodes();
    user.twoFactorBackupCodes = hashBackupCodes(backupCodes);
    user.twoFactorEnabled = true;
    await user.save();

    await send2FAEnabled(user.email, user.username);
    await send2FABackupCodes(user.email, user.username, backupCodes);

    res.json({ ok: true, message: "Two-factor authentication enabled", backupCodes });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── 2FA: Disable ──────────────────────────────────────────────────────

router.post("/2fa/disable", auth, async (req, res) => {
  try {
    const { password, code } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    if (!password || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: "Password required to disable 2FA" });
    }

    // Verify TOTP or backup code if provided
    if (code && user.twoFactorEnabled) {
      const validTotp = await verifyToken(user.twoFactorSecret, code);
      const validBackup = verifyBackupCode(code, user.twoFactorBackupCodes);
      if (!validTotp && !validBackup) {
        return res.status(401).json({ ok: false, error: "Invalid 2FA code" });
      }
    } else if (user.twoFactorEnabled) {
      return res.status(400).json({ ok: false, error: "2FA code required to disable 2FA" });
    }

    user.twoFactorSecret = null;
    user.twoFactorEnabled = false;
    user.twoFactorBackupCodes = [];
    user.tokenVersion += 1;
    await user.save();

    res.json({ ok: true, message: "Two-factor authentication disabled" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── 2FA: Regenerate backup codes ──────────────────────────────────────

router.post("/2fa/backup-codes", auth, async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (!user.twoFactorEnabled) {
      return res.status(400).json({ ok: false, error: "2FA not enabled" });
    }

    if (!password || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: "Password required" });
    }

    const codes = generateBackupCodes();
    user.twoFactorBackupCodes = hashBackupCodes(codes);
    await user.save();

    await send2FABackupCodes(user.email, user.username, codes);

    res.json({ ok: true, backupCodes: codes });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── 2FA: Status ───────────────────────────────────────────────────────

router.get("/2fa/status", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    res.json({
      ok: true,
      twoFactorEnabled: user.twoFactorEnabled,
      hasBackupCodes: user.twoFactorBackupCodes.length > 0,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Personal access tokens (admin API keys) ──────────────────────────

router.post("/api-keys", auth, adminAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.length < 1 || name.length > 64) {
      return res.status(400).json({ ok: false, error: "Name required (1-64 chars)" });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (user.apiKeys.length >= 10) {
      return res.status(400).json({ ok: false, error: "Maximum 10 API keys per account" });
    }

    const { token, prefix, hash } = generateApiKey(name);
    user.apiKeys.push({ token: hash, name, prefix });
    await user.save();

    res.status(201).json({
      ok: true,
      key: {
        token,
        name,
        prefix,
        createdAt: new Date(),
      },
      message: "Save this token — it will not be shown again.",
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.get("/api-keys", auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    const keys = user.apiKeys.map(k => ({
      id: k._id,
      name: k.name,
      prefix: k.prefix,
      createdAt: k.createdAt,
      lastUsedAt: k.lastUsedAt,
    }));
    res.json({ ok: true, keys });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.delete("/api-keys/:id", auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    const idx = user.apiKeys.findIndex(k => k._id.toString() === req.params.id);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Key not found" });
    user.apiKeys.splice(idx, 1);
    await user.save();
    res.json({ ok: true, message: "API key revoked" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Session ───────────────────────────────────────────────────────────

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    res.json({ ok: true, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── Email verification ────────────────────────────────────────────────

router.post("/resend-verification", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (user.emailVerified) return res.json({ ok: true, message: "Already verified" });

    const token = user.generateVerificationToken();
    await user.save();
    await sendVerificationEmail(user.email, user.username, token);
    res.json({ ok: true, message: "Verification email sent" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// Public resend-verification (no auth required — user provides username+password)
router.post("/resend-verification-public", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ ok: false, error: "Username and password required" });

    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    if (!(await user.comparePassword(password)))
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    if (user.emailVerified)
      return res.json({ ok: true, message: "Already verified" });

    const token = user.generateVerificationToken();
    await user.save();
    await sendVerificationEmail(user.email, user.username, token);
    res.json({ ok: true, message: "Verification email sent" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.post("/verify-email", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ ok: false, error: "Token required" });

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ ok: false, error: "Invalid or expired token" });

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    res.json({ ok: true, message: "Email verified successfully" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.get("/verify-email/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token,
      emailVerificationExpires: { $gt: new Date() },
    });
    if (!user) {
      return res.redirect("/login?error=invalid-or-expired-verification-link");
    }
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();
    res.redirect("/login?verified=1");
  } catch {
    res.redirect("/login?error=verification-failed");
  }
});

// ── Password reset ────────────────────────────────────────────────────

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false, error: "Email required" });

    const user = await User.findOne({ email });
    if (user) {
      const token = user.generateResetToken();
      await user.save();
      await sendPasswordResetEmail(user.email, user.username, token);
    }

    res.json({ ok: true, message: "If the email exists, a reset link was sent" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ ok: false, error: "Token and password required" });
    if (password.length < 8) return res.status(400).json({ ok: false, error: "Password must be at least 8 characters" });

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ ok: false, error: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.tokenVersion += 1;
    await user.save();

    res.json({ ok: true, message: "Password reset successful" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// ── LGPD: data export & deletion ──────────────────────────────────────

router.get("/export-data", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    const data = {
      exportedAt: new Date().toISOString(),
      user: user.toPublic(),
      accountCreated: user.createdAt,
      lastUpdated: user.updatedAt,
      privacyConsentAt: user.privacyConsentAt,
      emailVerified: user.emailVerified,
      twoFactorEnabled: user.twoFactorEnabled,
    };
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.delete("/delete-account", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    const { password } = req.body;
    if (!password || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: "Password required to delete account" });
    }

    user.deletionScheduledAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    user.username = `deleted_${user._id}`;
    user.email = `deleted_${user._id}@disabled.local`;
    user.password = crypto.randomBytes(32).toString("hex");
    user.privacyConsent = false;
    user.tokenVersion += 1;
    await user.save();

    res.json({ ok: true, message: "Account scheduled for deletion. Data anonymized immediately." });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

export default router;
