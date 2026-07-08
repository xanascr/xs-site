import { Router } from "express";
import { auth, adminAuth } from "../../middleware/auth.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import Certificate from "../../models/Certificate.js";

const router = Router();

// ── List published courses ──────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({ published: true }).select("title slug description image category level duration totalPoints lessons.title lessons.slug lessons.order lessons.points").sort({ createdAt: -1 }).lean();
    res.json({ ok: true, courses });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Get single course ───────────────────────────────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true }).lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    res.json({ ok: true, course });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Enroll ──────────────────────────────────────────────────────────────
router.post("/:slug/enroll", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true });
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const exists = await Enrollment.findOne({ userId: req.user.id, courseId: course._id });
    if (exists) return res.json({ ok: true, enrolled: true });
    const progress = course.lessons.map(l => ({ lessonSlug: l.slug, completed: false, challengesPassed: 0 }));
    await Enrollment.create({ userId: req.user.id, courseId: course._id, progress });
    res.json({ ok: true, enrolled: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Get user enrollment + progress ──────────────────────────────────────
router.get("/:slug/progress", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const enrollment = await Enrollment.findOne({ userId: req.user.id, courseId: course._id }).lean();
    res.json({ ok: true, enrollment, course });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Mark lesson complete + answer challenges ────────────────────────────
router.post("/:slug/lessons/:lessonSlug/complete", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const lesson = course.lessons.find(l => l.slug === req.params.lessonSlug);
    if (!lesson) return res.status(404).json({ ok: false, error: "Lesson not found" });

    const enrollment = await Enrollment.findOne({ userId: req.user.id, courseId: course._id });
    if (!enrollment) return res.status(400).json({ ok: false, error: "Not enrolled" });

    const prog = enrollment.progress.find(p => p.lessonSlug === req.params.lessonSlug);
    if (prog && prog.completed) return res.json({ ok: true, completed: true, points: enrollment.points });

    let earned = lesson.points;
    let challengesPassed = 0;
    if (req.body.answers && Array.isArray(req.body.answers)) {
      req.body.answers.forEach((ans, i) => {
        if (lesson.challenges[i] && ans.trim().toLowerCase() === lesson.challenges[i].answer.trim().toLowerCase()) {
          earned += lesson.challenges[i].points;
          challengesPassed++;
        }
      });
    }

    if (prog) {
      prog.completed = true;
      prog.completedAt = new Date();
      prog.challengesPassed = challengesPassed;
    }
    enrollment.points += earned;

    // Check if all lessons completed
    const allDone = enrollment.progress.every(p => p.completed);
    if (allDone && !enrollment.completedAt) {
      enrollment.completedAt = new Date();
      enrollment.certificateEligible = true;
    }

    await enrollment.save();
    res.json({ ok: true, completed: true, points: enrollment.points, earned, certificateEligible: enrollment.certificateEligible });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Request certificate ─────────────────────────────────────────────────
router.post("/:slug/certificate/request", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const enrollment = await Enrollment.findOne({ userId: req.user.id, courseId: course._id });
    if (!enrollment) return res.status(400).json({ ok: false, error: "Not enrolled" });
    if (!enrollment.certificateEligible) return res.status(400).json({ ok: false, error: "Course not completed" });

    const existing = await Certificate.findOne({ userId: req.user.id, courseId: course._id });
    if (existing) return res.json({ ok: true, certificate: existing, alreadyRequested: true });

    const user = await (await import("../../models/User.js")).default.findById(req.user.id).select("username email");

    const cert = await Certificate.create({
      code: Certificate.generateCode(),
      userId: req.user.id,
      courseId: course._id,
      userName: user.username,
      userEmail: user.email,
      courseName: course.title,
      status: "pending",
      points: enrollment.points,
    });

    res.json({ ok: true, certificate: cert });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Admin: manage courses ───────────────────────────────────────────────
router.post("/admin/courses", adminAuth, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ ok: true, course });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.put("/admin/courses/:id", adminAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    res.json({ ok: true, course });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

router.get("/admin/courses", adminAuth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).lean();
    res.json({ ok: true, courses });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Admin: list certificates ────────────────────────────────────────────
router.get("/admin/certificates", adminAuth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const certs = await Certificate.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ ok: true, certificates: certs });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Admin: issue certificate ────────────────────────────────────────────
router.post("/admin/certificates/:code/issue", adminAuth, async (req, res) => {
  try {
    const cert = await Certificate.findOne({ code: req.params.code, status: "pending" });
    if (!cert) return res.status(404).json({ ok: false, error: "Certificate not found or already issued" });
    cert.status = "issued";
    cert.issuedAt = new Date();
    await cert.save();
    res.json({ ok: true, certificate: cert });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Admin: mark certificate as emailed ──────────────────────────────────
router.post("/admin/certificates/:code/emailed", adminAuth, async (req, res) => {
  try {
    const cert = await Certificate.findOneAndUpdate({ code: req.params.code }, { emailedAt: new Date() }, { new: true });
    if (!cert) return res.status(404).json({ ok: false, error: "Certificate not found" });
    res.json({ ok: true, certificate: cert });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Public: validate certificate ────────────────────────────────────────
router.get("/certificates/validate/:code", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ code: req.params.code, status: "issued" }).lean();
    if (!cert) return res.json({ ok: false, valid: false, error: "Invalid or pending certificate" });
    res.json({ ok: true, valid: true, certificate: { code: cert.code, userName: cert.userName, courseName: cert.courseName, issuedAt: cert.issuedAt, points: cert.points } });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
