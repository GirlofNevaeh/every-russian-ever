import { Link, createFileRoute } from "@tanstack/react-router";
import { CartoonPortrait } from "@/components/cartoon-portrait";
import { getPerson, inventions } from "@/data/people";

export const Route = createFileRoute("/people/$slug")({ component: PersonPage });

function PersonPage() {
  const { slug } = Route.useParams();
  const person = getPerson(slug);
  if (!person) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-3xl text-neva">That person is not on this site</h1>
        <p className="mt-3">
          <Link to="/people" className="underline">
            Back to People
          </Link>
        </p>
      </main>
    );
  }
  const made = inventions.filter((item) => item.slugs.includes(person.slug));
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[16rem_1fr]">
      <CartoonPortrait slug={person.slug} name={person.name} />
      <article>
        <h1 className="font-serif text-4xl text-neva">{person.name}</h1>
        <p className="mt-2 text-xl text-ink">
          {person.nameRu} · {person.latin}
        </p>
        <p className="text-ink">{person.years}</p>
        <p className="mt-3 text-lg font-semibold text-ink">{person.knownFor}</p>
        <div className="mt-4 space-y-3 text-lg">
          {person.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <h2 className="mt-6 font-serif text-2xl text-neva">Places</h2>
        <ul className="mt-2 space-y-1">
          {person.places.map((place) => (
            <li key={place.label}>
              {place.slug ? (
                <Link to="/places/$slug" params={{ slug: place.slug }} className="underline">
                  {place.label}
                </Link>
              ) : (
                place.label
              )}
            </li>
          ))}
        </ul>
        {made.length > 0 ? (
          <>
            <h2 className="mt-6 font-serif text-2xl text-neva">Made or found</h2>
            <ul className="mt-2 space-y-2">
              {made.map((item) => (
                <li key={item.title}>
                  <span className="font-semibold text-neva">{item.title}. </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
    </main>
  );
}
