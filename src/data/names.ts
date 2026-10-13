import { people } from "./people";
import { places } from "./places";
import { regions } from "./regions";
import { fold } from "./search";

const full = new Set<string>();

function add(value: string) {
  const folded = fold(value);
  if (folded.length >= 2) full.add(folded);
}

for (const person of people) {
  add(person.name);
  add(person.nameRu);
  add(person.latin);
  person.aliases.forEach(add);
}

for (const place of places) {
  add(place.name);
  add(place.nameRu);
  add(place.latin);
}

for (const region of regions) {
  add(region.name);
  add(region.nameRu);
  add(region.latin);
  add(region.mainCity);
  add(region.mainCityRu);
}

export function isFullName(query: string) {
  return full.has(fold(query));
}
