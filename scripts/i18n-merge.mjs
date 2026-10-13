import fs from "node:fs";
import path from "node:path";

const locale = process.argv[2];
const batchPath = process.argv[3];
if (!locale || !batchPath) {
  console.error("usage: node scripts/i18n-merge.mjs <locale> <batch.json>");
  process.exit(1);
}
const packPath = path.resolve(`src/i18n/packs/${locale}.json`);
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
let added = 0;
for (const [key, value] of Object.entries(batch)) {
  if (typeof key !== "string" || typeof value !== "string" || !value.trim()) continue;
  pack[key] = value;
  added += 1;
}
fs.writeFileSync(packPath, JSON.stringify(pack, null, 2) + "\n");
console.log(`${locale} ${added} merged, pack ${Object.keys(pack).length}`);
