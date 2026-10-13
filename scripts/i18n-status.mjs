import fs from "node:fs";

const locale = process.argv[2];
const limit = Number(process.argv[3] ?? 0);
const todo = JSON.parse(fs.readFileSync("src/i18n/todo.json", "utf8"));
const pack = JSON.parse(fs.readFileSync(`src/i18n/packs/${locale}.json`, "utf8"));
const missing = todo.filter((item) => typeof pack[item] !== "string" || !pack[item].trim());
console.log(`${locale} missing ${missing.length} of ${todo.length}`);
if (limit > 0) {
  const slice = missing.slice(0, limit);
  fs.writeFileSync(`/tmp/i18n-${locale}-next.json`, JSON.stringify(slice, null, 2));
  console.log(`wrote ${slice.length} to /tmp/i18n-${locale}-next.json`);
}
