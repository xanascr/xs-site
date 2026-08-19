import { Router } from "express";

const router = Router();
const baseUrl = "https://xanascript.xyz";

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

router.get("/robots.txt", async (_req, res) => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "Disallow: /admin",
    "Disallow: /dashboard",
    "Disallow: /settings",
    "Disallow: /login",
    "Disallow: /signup",
    "Disallow: /forgot-password",
    "Disallow: /reset-password",
    "Disallow: /api/",
    "Disallow: /uploads/",
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n");
  res.type("text/plain").send(body);
});

router.get("/sitemap.xml", async (_req, res) => {
  const today = isoDate();
  const urls = [
    `<url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${baseUrl}/docs</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${baseUrl}/playground</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${baseUrl}/courses</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${baseUrl}/packages</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${baseUrl}/hackathons</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`,
    `<url><loc>${baseUrl}/changelog</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`,
    `<url><loc>${baseUrl}/benchmark</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>`,
    `<url><loc>${baseUrl}/donate</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.2</priority></url>`,
    `<url><loc>${baseUrl}/privacy</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.2</priority></url>`,
  ];

  try {
    const DocArticle = (await import("../models/DocArticle.js")).default;
    const articles = await DocArticle.find({ published: true }).select("slug updatedAt").lean();
    for (const a of articles) {
      urls.push(`<url><loc>${baseUrl}/docs/${a.slug}</loc><lastmod>${isoDate(a.updatedAt)}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
    }
  } catch {
    // Banco indisponível: sitemap apenas com páginas estáticas.
  }

  try {
    const Course = (await import("../models/Course.js")).default;
    const courses = await Course.find({ published: true }).select("slug updatedAt").lean();
    for (const c of courses) {
      urls.push(`<url><loc>${baseUrl}/courses/${c.slug}</loc><lastmod>${isoDate(c.updatedAt)}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
    }
  } catch {
    // ignore
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
  res.type("application/xml").send(xml);
});

export default router;