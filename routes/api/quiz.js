import { Router } from "express";
import { auth, asyncHandler } from "../../middleware/auth.js";
import { Quiz, QuizAttempt } from "../../models/Quiz.js";
import Course from "../../models/Course.js";

const router = Router();

router.post("/:courseId/quiz/submit", auth, asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.body.quizId);
  if (!quiz) return res.status(404).json({ ok: false, error: "Quiz não encontrado" });

  const answers = req.body.answers || [];
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

  res.json({ ok: true, score, total, percent: Math.round((score / total) * 100) });
}));

export default router;
