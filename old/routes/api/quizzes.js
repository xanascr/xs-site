import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import ModuleQuiz from "../../models/ModuleQuiz.js";
import QuizAttempt from "../../models/QuizAttempt.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import User from "../../models/User.js";

const router = Router();

router.get("/:courseSlug/module/:moduleIndex", async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.courseSlug }).lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const quiz = await ModuleQuiz.findOne({ courseId: course._id, moduleIndex: parseInt(req.params.moduleIndex) }).lean();
    if (!quiz) return res.status(404).json({ ok: false, error: "No quiz for this module" });
    res.json({ ok: true, quiz });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/:courseSlug/module/:moduleIndex/start", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.courseSlug }).lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const quiz = await ModuleQuiz.findOne({ courseId: course._id, moduleIndex: parseInt(req.params.moduleIndex) });
    if (!quiz) return res.status(404).json({ ok: false, error: "No quiz for this module" });

    const attemptCount = await QuizAttempt.countDocuments({ userId: req.user.id, quizId: quiz._id });
    const attempt = await QuizAttempt.create({
      userId: req.user.id,
      quizId: quiz._id,
      attemptNumber: attemptCount + 1,
    });

    res.json({ ok: true, attempt, questions: quiz.questions.map((q, i) => ({ idx: i, question: q.question, type: q.type, options: q.options })) });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/:courseSlug/module/:moduleIndex/submit", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.courseSlug }).lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const quiz = await ModuleQuiz.findOne({ courseId: course._id, moduleIndex: parseInt(req.params.moduleIndex) });
    if (!quiz) return res.status(404).json({ ok: false, error: "Quiz not found" });

    const { answers } = req.body;
    if (!Array.isArray(answers)) return res.status(400).json({ ok: false, error: "answers required" });

    let correct = 0;
    const resultAnswers = answers.map((a, i) => {
      const q = quiz.questions[i];
      if (!q) return { questionIdx: i, answer: a, correct: false };
      const isCorrect = String(a).trim().toLowerCase() === q.answer.trim().toLowerCase();
      if (isCorrect) correct++;
      return { questionIdx: i, answer: a, correct: isCorrect };
    });

    const total = quiz.questions.length;
    const score = Math.round((correct / total) * 100);
    const totalPoints = quiz.questions.reduce((s, q) => s + q.points, 0);
    const pct = correct / total;
    // XP decreases with attempts: full points on 1st try, 70% on 2nd, 50% thereafter
    const attemptCount = await QuizAttempt.countDocuments({ userId: req.user.id, quizId: quiz._id });
    const multiplier = attemptCount === 0 ? 1 : attemptCount === 1 ? 0.7 : 0.5;
    const earnedXp = Math.round(totalPoints * pct * multiplier);

    const attempt = await QuizAttempt.create({
      userId: req.user.id,
      quizId: quiz._id,
      answers: resultAnswers,
      score,
      totalPoints,
      earnedXp,
      passed: score >= (quiz.passingScore || 70),
      attemptNumber: attemptCount + 1,
    });

    // Award XP
    const user = await User.findById(req.user.id);
    if (user) {
      user.xp = (user.xp || 0) + earnedXp;
      const newLevel = Math.floor(user.xp / 200) + 1;
      if (newLevel > (user.level || 1)) user.level = newLevel;
      await user.save();
    }

    res.json({ ok: true, attempt, correct, total, score, earnedXp, passed: attempt.passed });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/:courseSlug/module/:moduleIndex/attempts", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.courseSlug }).lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });
    const quiz = await ModuleQuiz.findOne({ courseId: course._id, moduleIndex: parseInt(req.params.moduleIndex) });
    if (!quiz) return res.status(404).json({ ok: false, error: "Quiz not found" });

    const attempts = await QuizAttempt.find({ userId: req.user.id, quizId: quiz._id }).sort({ createdAt: -1 }).lean();
    res.json({ ok: true, attempts });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;