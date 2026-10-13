import { Link, createFileRoute } from "@tanstack/react-router";
import { PhotoFigure } from "@/components/portrait";
import { getRegion } from "@/data/regions";
import { placePhotos } from "@/data/photos";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/regions/$slug")({ component: RegionPage });

function RegionPage() {
  const { tx, txf } = useI18n();
  const { slug } = Route.useParams();
  const region = getRegion(slug);
  if (!region) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-serif text-3xl text-neva">{tx("That region is not on this list")}</h1>
        <Link to="/places" className="underline">
          {tx("Back to Places")}
        </Link>
      </main>
    );
  }
  const photo = region.placeSlug ? placePhotos[region.placeSlug] : undefined;
  const name = tx(region.name);
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[18rem_1fr]">
      <div>
        <svg viewBox="0 0 100 100" className="w-full rounded-card border border-neva/20 bg-card p-4" aria-hidden="true">
          <path d={region.shape} fill="#ffffff" stroke="#143A78" strokeWidth="3" />
        </svg>
        {photo ? (
          <div className="mt-4">
            <PhotoFigure photo={photo} alt={name} />
          </div>
        ) : null}
      </div>
      <article className="space-y-3 text-lg">
        <h1 className="font-serif text-4xl text-neva">{name}</h1>
        <p>
          {region.nameRu} · {region.latin}
        </p>
        <p>
          {txf("Main city: {city}", { city: tx(region.mainCity) })} · {region.mainCityRu}
        </p>
        <p>{tx(region.land)}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{tx(region.facts[0])}</li>
          <li>{tx(region.facts[1])}</li>
        </ul>
        {region.otherLanguage ? (
          <p>
            {txf("{language} and Russian are both official languages. A class may also answer in {language}.", {
              language: tx(region.otherLanguage),
            })}
          </p>
        ) : null}
        <p>{tx("Russia has many more regions.")}</p>
        <p>
          <Link to="/places" className="underline">
            {tx("All places and regions")}
          </Link>
        </p>
      </article>
    </main>
  );
}
