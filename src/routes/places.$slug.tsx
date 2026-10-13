import { Link, createFileRoute } from "@tanstack/react-router";
import { PersonDrawing, PhotoFigure } from "@/components/portrait";
import { getPlace } from "@/data/places";
import { placePhotos } from "@/data/photos";

export const Route = createFileRoute("/places/$slug")({ component: PlacePage });

function PlacePage() {
  const { slug } = Route.useParams();
  const place = getPlace(slug);
  if (!place) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-3xl text-neva">That place is not on this site</h1>
        <Link to="/places" className="underline">
          Back to Places
        </Link>
      </main>
    );
  }
  const photo = placePhotos[place.slug];
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[20rem_1fr]">
      <div>
        {photo ? (
          <PhotoFigure photo={photo} alt={place.name} />
        ) : (
          <PersonDrawing name={place.name} motif="leaf" />
        )}
      </div>
      <article>
        <h1 className="font-serif text-4xl text-neva">{place.name}</h1>
        <p className="mt-2 text-xl">
          {place.nameRu} · {place.latin}
        </p>
        <div className="mt-4 space-y-3 text-lg">
          {place.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-6">
          <Link to="/places" className="underline">
            All places
          </Link>
        </p>
      </article>
    </main>
  );
}
