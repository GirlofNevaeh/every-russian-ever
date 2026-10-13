import fs from "node:fs";

const locales = ["gd", "cy", "ga", "fr", "it", "es", "de", "ru"];
const todo = JSON.parse(fs.readFileSync("src/i18n/todo.json", "utf8"));

for (const locale of locales) {
  const pack = {};
  for (const slice of [0, 1, 2, 3]) {
    const file = `src/i18n/partials/${locale}-${slice}.json`;
    if (!fs.existsSync(file)) continue;
    Object.assign(pack, JSON.parse(fs.readFileSync(file, "utf8")));
  }
  fs.writeFileSync(`src/i18n/packs/${locale}.json`, JSON.stringify(pack, null, 2) + "\n");
  const missing = todo.filter((item) => typeof pack[item] !== "string" || !pack[item].trim());
  const same = todo.filter((item) => pack[item] === item && item.split(" ").length > 5);
  console.log(`${locale} keys ${Object.keys(pack).length} missing ${missing.length} english-sentences ${same.length}`);
}
