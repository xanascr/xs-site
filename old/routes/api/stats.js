import { Router } from "express";
import { auth, optionalAuth } from "../../middleware/auth.js";
import LessonStat from "../../models/LessonStat.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";

const router = Router();

router.post("/lesson/view", async (req, res) => {
  try {
    const { courseSlug, lessonSlug } = req.body;
    if (!courseSlug || !lessonSlug) return res.status(400).json({ ok: false, error: "courseSlug and lessonSlug required" });
    const course = await Course.findOne({ slug: courseSlug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    await LessonStat.findOneAndUpdate(
      { courseId: course._id, lessonSlug },
      { $inc: { views: 1 } },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/lesson/time", async (req, res) => {
  try {
    const { courseSlug, lessonSlug, seconds } = req.body;
    if (!courseSlug || !lessonSlug || typeof seconds !== "number") return res.status(400).json({ ok: false, error: "courseSlug, lessonSlug, seconds required" });
    const course = await Course.findOne({ slug: courseSlug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    await LessonStat.findOneAndUpdate(
      { courseId: course._id, lessonSlug },
      { $inc: { timeSpent: Math.round(seconds) } },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/lesson/complete-stats", async (req, res) => {
  try {
    const { courseSlug, lessonSlug } = req.body;
    if (!courseSlug || !lessonSlug) return res.status(400).json({ ok: false, error: "courseSlug and lessonSlug required" });
    const course = await Course.findOne({ slug: courseSlug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    await LessonStat.findOneAndUpdate(
      { courseId: course._id, lessonSlug },
      { $inc: { completions: 1 } },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/hot", async (req, res) => {
  try {
    const stats = await LessonStat.find()
      .sort({ views: -1, timeSpent: -1 })
      .limit(10)
      .populate("courseId", "title slug")
      .lean();
    const results = stats.map(s => ({
      courseSlug: s.courseId?.slug,
      courseTitle: s.courseId?.title,
      lessonSlug: s.lessonSlug,
      views: s.views,
      timeSpent: s.timeSpent,
      completions: s.completions,
      abandonments: s.abandonments,
      difficulty: s.totalChallenges > 0 ? Math.round((s.passedChallenges / s.totalChallenges) * 100) : null,
    }));
    res.json({ ok: true, lessons: results });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/difficulty/:courseSlug/:lessonSlug", async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.courseSlug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const stat = await LessonStat.findOne({ courseId: course._id, lessonSlug: req.params.lessonSlug }).lean();
    if (!stat || stat.totalChallenges === 0) return res.json({ ok: true, difficulty: null, stars: 0 });
    const rate = stat.passedChallenges / stat.totalChallenges;
    const stars = rate >= 0.9 ? 1 : rate >= 0.7 ? 2 : rate >= 0.5 ? 3 : rate >= 0.3 ? 4 : 5;
    res.json({ ok: true, difficulty: Math.round(rate * 100), stars });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;