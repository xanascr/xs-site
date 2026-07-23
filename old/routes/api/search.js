import { Router } from "express";
import Course from "../../models/Course.js";
import Package from "../../models/Package.js";
import { sanitizeHtml } from "../../services/sanitize.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").trim().slice(0, 100);
    if (!q) return res.json({ ok: true, results: [] });

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const results = [];

    // Courses
    const courses = await Course.find({ published: true, $or: [{ title: regex }, { description: regex }] })
      .select("title slug description")
      .limit(5)
      .lean();
    courses.forEach(c => results.push({
      type: "course", label: c.title, desc: c.description?.slice(0, 120), url: `/courses/${c.slug}`,
    }));

    // Lessons
    let courseForLessons = await Course.find({ published: true }).select("title slug lang lessons").lean();
    for (const course of courseForLessons) {
      for (const lesson of (course.lessons || [])) {
        if (regex.test(lesson.title) || regex.test(lesson.bodyMd || "")) {
          results.push({
            type: "lesson",
            label: `${lesson.title}`,
            desc: `Lesson in ${course.title}`,
            url: `/courses/${course.slug}/lessons/${lesson.slug}`,
          });
          if (results.length >= 20) break;
        }
      }
      if (results.length >= 20) break;
    }

    // Packages
    const packages = await Package.find({ status: "approved", $or: [{ name: regex }, { description: regex }] })
      .select("name description")
      .limit(5)
      .lean();
    packages.forEach(p => results.push({
      type: "package", label: p.name, desc: p.description?.slice(0, 120), url: `/packages/${p.name}`,
    }));

    // Docs pages
    const docPages = [
      { title: "Getting Started", slug: "getting-started" },
      { title: "Syntax Reference", slug: "syntax" },
      { title: "Built-in Functions", slug: "builtins" },
      { title: "Standard Library", slug: "stdlib" },
      { title: "CLI Reference", slug: "cli" },
      { title: "Package Manager", slug: "packages" },
      { title: "WebAssembly", slug: "wasm" },
      { title: "Contributing", slug: "contributing" },
    ];
    for (const doc of docPages) {
      if (regex.test(doc.title)) {
        results.push({
          type: "doc", label: doc.title, desc: `Documentation`, url: `/docs/${doc.slug}`,
        });
      }
    }

    // Enrich/clean labels
    results.forEach(r => {
      if (r.type === "course") r.label = `📚 ${r.label}`;
      else if (r.type === "lesson") r.label = `📖 ${r.label}`;
      else if (r.type === "package") r.label = `📦 ${r.label}`;
      else if (r.type === "doc") r.label = `📄 ${r.label}`;
    });

    res.json({ ok: true, results: results.slice(0, 20) });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;