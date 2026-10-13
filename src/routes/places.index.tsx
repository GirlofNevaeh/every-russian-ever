import { Link, createFileRoute } from "@tanstack/react-router";
import { RussiaMap } from "@/components/russia-map";
import { places } from "@/data/places";
import { placePhotos } from "@/data/photos";
import { regions } from "@/data/regions";

export const Route = createFileRoute("/places/")({ component: PlacesPage });

function PlacesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-serif text-4xl text-neva">Places</h1>
      <p className="mt-3 max-w-3xl text-lg">Real stops in Russia. Tap a mark, or a name, to open that place.</p>
      <div className="mt-6">
        <RussiaMap />
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {places.map((place) => {
          const photo = placePhotos[place.slug];
          return (
            <li key={place.slug} className="rounded-card border border-neva/20 bg-card p-4">
              {photo ? (
                <img src={photo.src} alt={place.name} className="mb-3 aspect-[4/3] w-full rounded-md object-cover" />
              ) : null}
              <Link to="/places/$slug" params={{ slug: place.slug }} className="font-serif text-2xl text-neva no-underline">
                {place.name}
              </Link>
              <p>
                {place.nameRu} · {place.latin}
              </p>
              <p className="mt-2">{place.lines[0]}</p>
            </li>
          );
        })}
      </ul>
      <h2 className="mt-12 font-serif text-3xl text-neva">Regions</h2>
      <p className="mt-3 max-w-3xl text-lg">
        These are some regions, not the whole country. Russia has many more regions.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <li key={region.slug}>
            <Link
              to="/regions/$slug"
              params={{ slug: region.slug }}
              className="block h-full rounded-card border border-neva/20 bg-card p-4 text-ink no-underline"
            >
              <svg viewBox="0 0 100 100" className="mb-3 h-24 w-full" aria-hidden="true">
                <path d={region.shape} fill="#ffffff" stroke="#143A78" strokeWidth="3" />
              </svg>
              <span className="font-serif text-2xl text-neva">{region.name}</span>
              <span className="mt-1 block">{region.nameRu}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
