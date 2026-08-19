import { Router } from "express";
import mongoose from "mongoose";
import { auth, asyncHandler } from "../../middleware/auth.js";
import { Quiz, QuizAttempt } from "../../models/Quiz.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";

const router = Router();

router.post("/:courseId/quiz/submit", auth, asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
    return res.status(400).json({ ok: false, error: "Curso inválido" });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.quizId)) {
    return res.status(400).json({ ok: false, error: "Quiz inválido" });
  }
  const quiz = await Quiz.findById(req.body.quizId);
  if (!quiz) return res.status(404).json({ ok: false, error: "Quiz não encontrado" });
  if (String(quiz.course) !== req.params.courseId) {
    return res.status(400).json({ ok: false, error: "Quiz não pertence a este curso" });
  }

  let enrollment = await Enrollment.findOne({ user: req.user.id, course: quiz.course });
  if (!enrollment) {
    enrollment = await Enrollment.create({ user: req.user.id, course: quiz.course, completedLessons: [] });
  }

  const answers = req.body.answers || [];
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return res.status(400).json({ ok: false, error: "Responda todas as perguntas" });
  }

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const attemptsToday = await QuizAttempt.countDocuments({
    user: req.user.id,
    quiz: quiz._id,
    createdAt: { $gte: dayStart },
  });
  const MAX_ATTEMPTS_PER_DAY = 5;
  if (attemptsToday >= MAX_ATTEMPTS_PER_DAY) {
    return res.status(429).json({ ok: false, error: `Limite de tentativas diárias atingido (${MAX_ATTEMPTS_PER_DAY}). Tente novamente amanhã.` });
  }

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  const total = quiz.questions.length;
  const passed = score >= total / 2;

  await QuizAttempt.create({
    user: req.user.id,
    quiz: quiz._id,
    score,
    total,
    passed,
  });

  enrollment.quizScore = score;
  enrollment.quizTotal = total;
  if (passed) enrollment.quizPassed = true;
  await enrollment.save();

  const course = await Course.findById(quiz.course);
  const allLessons = course.modules.flatMap(m => m.lessons);
  const completed = enrollment.completedLessons.map(l => l.lessonSlug);
  const allLessonsDone = allLessons.every(l => completed.includes(l.slug));
  if (allLessonsDone && enrollment.quizPassed && !enrollment.completed) {
    enrollment.completed = true;
    enrollment.completedAt = new Date();
    await enrollment.save();
  }

  res.json({ ok: true, score, total, percent: Math.round((score / total) * 100), passed, courseCompleted: enrollment.completed });
}));

export default router;
