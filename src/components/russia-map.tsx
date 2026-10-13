import { Link } from "@tanstack/react-router";
import { places } from "@/data/places";
import { useI18n } from "@/i18n/provider";

const layout: Record<string, { x: number; y: number }> = {
  kaliningrad: { x: 8, y: 12 },
  kizhi: { x: 20, y: 26 },
  peterhof: { x: 14, y: 48 },
  hermitage: { x: 34, y: 36 },
  "peter-paul": { x: 18, y: 64 },
  novgorod: { x: 36, y: 54 },
  lavra: { x: 52, y: 32 },
  "red-square": { x: 50, y: 48 },
  kremlin: { x: 34, y: 72 },
  basil: { x: 50, y: 66 },
  "wall-of-grief": { x: 66, y: 42 },
  yasnaya: { x: 36, y: 88 },
  vladimir: { x: 18, y: 82 },
  suzdal: { x: 50, y: 84 },
  kazan: { x: 66, y: 60 },
  volga: { x: 64, y: 76 },
  ural: { x: 80, y: 28 },
  elbrus: { x: 72, y: 92 },
  novosibirsk: { x: 80, y: 52 },
  baikal: { x: 84, y: 70 },
  vladivostok: { x: 90, y: 86 },
  kamchatka: { x: 92, y: 36 },
};

export function RussiaMap() {
  const { tx } = useI18n();
  return (
    <div>
      <div className="relative min-h-[28rem] w-full overflow-hidden rounded-card border border-neva/30 bg-paper sm:min-h-[36rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
          <path
            d="M2 6h12c1 0 2 1 2 2v10c0 1-1 2-2 2H2c-1 0-2-1-2-2V8c0-1 1-2 2-2z"
            fill="#ffffff"
            stroke="#143A78"
            strokeWidth="0.6"
          />
          <path
            d="M12 22
               C16 18 28 18 40 20
               L58 18 L74 20 L88 24
               L96 34 L94 48 L90 62
               L94 84 L82 90 L70 96
               L56 90 L42 94 L28 90
               L14 84 L10 68 L12 48
               L10 32 Z"
            fill="#ffffff"
            stroke="#143A78"
            strokeWidth="0.7"
          />
        </svg>
        {places.map((place, index) => {
          const spot = layout[place.slug] ?? { x: place.x, y: place.y };
          return (
            <Link
              key={place.slug}
              to="/places/$slug"
              params={{ slug: place.slug }}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-banner text-sm font-semibold text-paper no-underline"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <span className="sr-only">{tx(place.name)}</span>
              {index + 1}
            </Link>
          );
        })}
      </div>
      <p className="mt-2 text-base text-ink">
        {tx("North is at the top. This is a simple map of Russia. Kaliningrad is drawn on its own. It does not touch the main land. Marks are spaced so you can tap them.")}
      </p>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2">
        {places.map((place, index) => (
          <li key={place.slug}>
            <Link to="/places/$slug" params={{ slug: place.slug }} className="text-neva underline">
              {index + 1}. {tx(place.name)} · {place.nameRu}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
