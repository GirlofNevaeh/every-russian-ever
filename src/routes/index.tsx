import { createFileRoute } from "@tanstack/react-router";
import { purchaseHref } from "@/components/paywall";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { tx } = useI18n();
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <h1 className="font-serif text-4xl text-neva sm:text-5xl">{tx("A history of Russia for young learners.")}</h1>
      <p className="text-xl leading-relaxed text-ink">{tx("It is for Age 5-12.")}</p>
      <figure>
        <img
          src="/drawings/saint-basil.jpg"
          alt={tx("A drawing of Saint Basil's Cathedral in Moscow.")}
          width={1792}
          height={1008}
          className="w-full rounded-lg"
        />
        <figcaption className="mt-2 text-lg leading-snug text-ink">
          <span className="block">{tx("A drawing.")}</span>
          <span className="block font-semibold text-neva">{tx("Saint Basil's Cathedral")}</span>
          <span className="block">Собор Василия Блаженного · Sobor Vasiliya Blazhennogo</span>
        </figcaption>
      </figure>
      <p>
        <a
          href={purchaseHref}
          className="inline-flex min-h-11 items-center rounded-md bg-banner px-5 font-semibold text-paper no-underline"
        >
          {tx("Purchase access")}
        </a>
      </p>
    </main>
  );
}
