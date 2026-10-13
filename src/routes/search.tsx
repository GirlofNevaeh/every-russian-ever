import { Link, createFileRoute } from "@tanstack/react-router";
import { SearchBox } from "@/components/search-box";
import { people } from "@/data/people";
import { places } from "@/data/places";
import { regions } from "@/data/regions";
import { RULER_SENTENCE, isSovietRulerQuery, matchesKeys } from "@/data/search";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const ruler = q.trim().length > 0 && isSovietRulerQuery(q);
  const foundPeople = ruler ? [] : people.filter((person) => matchesKeys(q, person.keys));
  const foundPlaces = ruler ? [] : places.filter((place) => matchesKeys(q, place.keys));
  const foundRegions = ruler ? [] : regions.filter((region) => matchesKeys(q, region.keys));
  const empty = !ruler && foundPeople.length + foundPlaces.length + foundRegions.length === 0;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">Search</h1>
      <div className="mt-4">
        <SearchBox initial={q} />
      </div>
      {q.trim() ? (
        <div className="mt-6 space-y-4 text-lg">
          {ruler ? (
            <article className="rounded-card border border-neva/20 bg-card p-4">
              <p>{RULER_SENTENCE}</p>
              <p className="mt-3">
                <Link to="/time" hash="after-1917" className="underline">
                  See this on the Time page
                </Link>
              </p>
            </article>
          ) : null}
          {foundPeople.length > 0 ? (
            <section>
              <h2 className="font-serif text-2xl text-neva">People</h2>
              <ul className="mt-2 space-y-2">
                {foundPeople.map((person) => (
                  <li key={person.slug}>
                    <Link to="/people/$slug" params={{ slug: person.slug }} className="underline">
                      {person.name}
                    </Link>
                    <span>
                      {" "}
                      · {person.nameRu} · {person.knownFor}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {foundPlaces.length > 0 ? (
            <section>
              <h2 className="font-serif text-2xl text-neva">Places</h2>
              <ul className="mt-2 space-y-2">
                {foundPlaces.map((place) => (
                  <li key={place.slug}>
                    <Link to="/places/$slug" params={{ slug: place.slug }} className="underline">
                      {place.name}
                    </Link>
                    <span> · {place.nameRu}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {foundRegions.length > 0 ? (
            <section>
              <h2 className="font-serif text-2xl text-neva">Regions</h2>
              <ul className="mt-2 space-y-2">
                {foundRegions.map((region) => (
                  <li key={region.slug}>
                    <Link to="/regions/$slug" params={{ slug: region.slug }} className="underline">
                      {region.name}
                    </Link>
                    <span> · {region.nameRu}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {q.trim() && empty ? <p>No people, places, or regions match. Try Moscow or Москва.</p> : null}
        </div>
      ) : (
        <p className="mt-6 text-lg">Type a full name and press Enter. Then press Send.</p>
      )}
    </main>
  );
}
