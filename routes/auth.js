import { Router } from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { signToken, auth } from "../middleware/auth.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/email.js";

const router = Router();

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

    // Generate verification token and send email
    const token = user.generateVerificationToken();
    await user.save();
    try {
      await sendVerificationEmail(user.email, user.username, token);
    } catch (e) {
      console.warn("Failed to send verification email:", e.message);
    }

    const jwt = signToken(user);
    res.status(201).json({ ok: true, token: jwt, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

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
    const token = signToken(user);
    res.json({ ok: true, token, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });
    res.json({ ok: true, user: user.toPublic() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Email verification ───────────────────────────────────────────────

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
    res.status(500).json({ ok: false, error: e.message });
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
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/verify-email/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token,
      emailVerificationExpires: { $gt: new Date() },
    });
    if (!user) {
      return res.redirect("/en/login?error=invalid-or-expired-verification-link");
    }
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();
    res.redirect("/en/login?verified=1");
  } catch {
    res.redirect("/en/login?error=verification-failed");
  }
});

// ── Password reset ───────────────────────────────────────────────────

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false, error: "Email required" });

    const user = await User.findOne({ email });
    // Always return ok to prevent email enumeration
    if (!user) return res.json({ ok: true, message: "If the email exists, a reset link was sent" });

    const token = user.generateResetToken();
    await user.save();
    await sendPasswordResetEmail(user.email, user.username, token);

    res.json({ ok: true, message: "If the email exists, a reset link was sent" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
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
    await user.save();

    res.json({ ok: true, message: "Password reset successful" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── LGPD: data export & deletion ─────────────────────────────────────

router.get("/export-data", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    const data = {
      exportedAt: new Date().toISOString(),
      user: user.toPublic(),
      accountCreated: user.createdAt,
      lastUpdated: user.updatedAt,
      privacyConsentAt: user.privacyConsentAt,
      emailVerified: user.emailVerified,
    };
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
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

    // Schedule deletion in 30 days (LGPD Art. 15)
    user.deletionScheduledAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save();

    // Anonymize immediately
    user.username = `deleted_${user._id}`;
    user.email = `deleted_${user._id}@disabled.local`;
    user.password = crypto.createHash("sha256").update(user.password).digest("hex");
    user.privacyConsent = false;
    await user.save();

    res.json({ ok: true, message: "Account scheduled for deletion. Data anonymized immediately." });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
