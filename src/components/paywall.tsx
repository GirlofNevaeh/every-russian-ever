import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";

export const purchaseHref = "https://www.everyschoolever.com/pricing?plan=";

const purchaseClass =
  "inline-flex min-h-11 items-center rounded-md bg-banner px-5 font-semibold text-paper no-underline";

export function Paywall() {
  const { tx } = useI18n();
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <h1 className="font-serif text-4xl text-neva sm:text-5xl">{tx("This page is locked.")}</h1>
      <p className="text-xl leading-relaxed text-ink">{tx("Purchase access to read the rest of this site.")}</p>
      <p>
        <a href={purchaseHref} className={purchaseClass}>
          {tx("Purchase access")}
        </a>
      </p>
      <p>
        <Link to="/" className="font-semibold text-neva">
          {tx("Home")}
        </Link>
      </p>
    </main>
  );
}
