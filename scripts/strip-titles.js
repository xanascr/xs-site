import { readFileSync, writeFileSync } from "fs";

const files = [
  "C:\\Users\\flazo0\\Desktop\\xs-site\\scripts\\seed-course.js",
  "C:\\Users\\flazo0\\Desktop\\xs-site\\scripts\\seed-course-pt.js",
];

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const original = content;

  content = content.replace(/bodyMd: `# .+\n\n/g, "bodyMd: `");

  if (content === original) {
    console.log(`No changes in ${file}`);
  } else {
    writeFileSync(file, content, "utf8");
    console.log(`Updated ${file}`);
  }
}
