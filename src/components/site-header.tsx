import { Link } from "@tanstack/react-router";
import { LanguageButton } from "@/components/language-button";
import { useI18n } from "@/i18n/provider";

const tabs = [
  { to: "/", label: "Home", exact: true },
  { to: "/people", label: "People", exact: false },
  { to: "/places", label: "Places", exact: false },
  { to: "/beliefs", label: "Beliefs", exact: false },
  { to: "/time", label: "Time", exact: false },
  { to: "/quiz", label: "Quiz", exact: false },
  { to: "/work", label: "Work", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/projects", label: "Projects", exact: false },
] as const;

const tabClass =
  "inline-flex min-h-11 w-fit max-w-full items-center justify-center justify-self-center rounded-md px-2 text-center text-sm leading-tight font-semibold text-paper no-underline sm:px-3 sm:text-base";

export function SiteHeader() {
  const { tx } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b-4 border-banner bg-neva text-paper">
      <div className="mx-auto max-w-6xl px-3 py-2 sm:px-4">
        <div className="flex items-start justify-between gap-2">
          <Link to="/" className="min-w-0 flex-1 text-paper no-underline">
            <span className="block font-serif text-xl leading-tight font-semibold sm:text-2xl">
              {tx("Every Russian Ever")}
            </span>
            <span className="mt-0.5 block font-serif text-base leading-tight text-paper">Россия для всех</span>
          </Link>
          <LanguageButton />
        </div>
        <nav aria-label={tx("Pages")} className="mt-2 grid grid-cols-3 gap-1">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.to}
              activeOptions={{ exact: tab.exact, includeSearch: false }}
              className={tabClass}
              activeProps={{
                className: `${tabClass} border-b-4 border-banner`,
              }}
            >
              {tx(tab.label)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
