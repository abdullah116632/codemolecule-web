const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const BANNER_DIR = __dirname;
const HTML_FILE = path.join(BANNER_DIR, "index.html");

console.log("🎨 Exporting CodeMolecule 4ft x 2ft Banners...");

const variants = [
  {
    name: "Dark Tech Edition (Primary)",
    file: "codemolecule-banner.png",
    url: `file://${HTML_FILE}?export=1&theme=dark`
  },
  {
    name: "Light Canvas Edition",
    file: "codemolecule-banner-light.png",
    url: `file://${HTML_FILE}?export=1&theme=light`
  }
];

for (const v of variants) {
  const outputPath = path.join(BANNER_DIR, v.file);
  console.log(`\n⏳ Rendering ${v.name} -> ${v.file}...`);
  try {
    execSync(
      `brave --headless --disable-gpu --window-size=1200,2400 "${v.url}" --screenshot="${outputPath}"`,
      { stdio: "inherit" }
    );
    const stats = fs.statSync(outputPath);
    console.log(`✅ Success! ${v.file} (${Math.round(stats.size / 1024)} KB)`);
  } catch (err) {
    console.error(`❌ Error rendering ${v.file}:`, err.message);
  }
}

console.log("\n✨ All banner assets exported successfully to the banner/ folder!");
