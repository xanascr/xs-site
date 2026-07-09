import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import Enrollment from "../../models/Enrollment.js";
import User from "../../models/User.js";
import Course from "../../models/Course.js";

const router = Router();

router.get("/roadmap", auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id }).populate("courseId", "title slug lessons").lean();
    const recommendations = [];

    for (const enc of enrollments) {
      const course = enc.courseId;
      if (!course || !course.lessons) continue;
      const doneSlugs = new Set((enc.progress || []).filter(p => p.completed).map(p => p.lessonSlug));
      const next = (course.lessons || []).find(l => !doneSlugs.has(l.slug));
      if (next) {
        recommendations.push({
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonSlug: next.slug,
          lessonTitle: next.title,
          points: next.points,
          order: next.order,
        });
      } else {
        recommendations.push({
          courseTitle: course.title,
          courseSlug: course.slug,
          completed: true,
        });
      }
    }

    // Also suggest the most popular unenrolled course
    if (recommendations.length === 0) {
      const popular = await Course.findOne({ published: true }).sort({ enrollments: -1 }).select("title slug").lean();
      if (popular) {
        recommendations.push({
          courseTitle: popular.title,
          courseSlug: popular.slug,
          notEnrolled: true,
        });
      }
    }

    res.json({ ok: true, recommendations });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get("/percentile/:courseSlug", auth, async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.courseSlug }).select("_id").lean();
    if (!course) return res.status(404).json({ ok: false, error: "Course not found" });

    const myEnrollment = await Enrollment.findOne({ userId: req.user.id, courseId: course._id }).lean();
    if (!myEnrollment) return res.json({ ok: true, percentile: null, message: "Not enrolled" });

    const myPoints = myEnrollment.points || 0;
    const allPoints = await Enrollment.find({ courseId: course._id }).select("points").lean();
    const total = allPoints.length;
    if (total === 0) return res.json({ ok: true, percentile: 100, message: "First student" });

    const worse = allPoints.filter(e => (e.points || 0) < myPoints).length;
    const percentile = Math.round((worse / total) * 100);
    const completed = allPoints.filter(e => e.completedAt).length;

    res.json({ ok: true, percentile, totalStudents: total, completedStudents: completed });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;