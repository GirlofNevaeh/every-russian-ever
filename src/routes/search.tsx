import { Link, createFileRoute } from "@tanstack/react-router";
import { SearchBox } from "@/components/search-box";
import { people } from "@/data/people";
import { places } from "@/data/places";
import { regions } from "@/data/regions";
import { RULER_SENTENCE, fold, isSovietRulerQuery, matchesKeys } from "@/data/search";
import { translatedNames } from "@/data/names";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { tx } = useI18n();
  const { q } = Route.useSearch();
  const ruler = q.trim().length > 0 && isSovietRulerQuery(q);
  const foundPeople = ruler
    ? []
    : people.filter(
        (person) => matchesKeys(q, person.keys) || translatedNames(person.name).some((name) => fold(name) === fold(q)),
      );
  const foundPlaces = ruler
    ? []
    : places.filter(
        (place) => matchesKeys(q, place.keys) || translatedNames(place.name).some((name) => fold(name) === fold(q)),
      );
  const foundRegions = ruler
    ? []
    : regions.filter(
        (region) => matchesKeys(q, region.keys) || translatedNames(region.name).some((name) => fold(name) === fold(q)),
      );
  const empty = !ruler && foundPeople.length + foundPlaces.length + foundRegions.length === 0;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">{tx("Search")}</h1>
      <div className="mt-4">
        <SearchBox initial={q} />
      </div>
      {q.trim() ? (
        <div className="mt-6 space-y-4 text-lg">
          {ruler ? (
            <article className="rounded-card border border-neva/20 bg-card p-4">
              <p>{tx(RULER_SENTENCE)}</p>
              <p className="mt-3">
                <Link to="/time" hash="after-1917" className="underline">
                  {tx("See this on the Time page")}
                </Link>
              </p>
            </article>
          ) : null}
          {foundPeople.length > 0 ? (
            <section>
              <h2 className="font-serif text-2xl text-neva">{tx("People")}</h2>
              <ul className="mt-2 space-y-2">
                {foundPeople.map((person) => (
                  <li key={person.slug}>
                    <Link to="/people/$slug" params={{ slug: person.slug }} className="underline">
                      {tx(person.name)}
                    </Link>
                    <span>
                      {" "}
                      · {person.nameRu} · {tx(person.knownFor)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {foundPlaces.length > 0 ? (
            <section>
              <h2 className="font-serif text-2xl text-neva">{tx("Places")}</h2>
              <ul className="mt-2 space-y-2">
                {foundPlaces.map((place) => (
                  <li key={place.slug}>
                    <Link to="/places/$slug" params={{ slug: place.slug }} className="underline">
                      {tx(place.name)}
                    </Link>
                    <span> · {place.nameRu}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {foundRegions.length > 0 ? (
            <section>
              <h2 className="font-serif text-2xl text-neva">{tx("Regions")}</h2>
              <ul className="mt-2 space-y-2">
                {foundRegions.map((region) => (
                  <li key={region.slug}>
                    <Link to="/regions/$slug" params={{ slug: region.slug }} className="underline">
                      {tx(region.name)}
                    </Link>
                    <span> · {region.nameRu}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {q.trim() && empty ? (
            <p>{tx("No people, places, or regions match. Try Moscow or Москва.")}</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 text-lg">{tx("Type a full name and press Enter. Then press Send.")}</p>
      )}
    </main>
  );
}
