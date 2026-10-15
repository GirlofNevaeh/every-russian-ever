export const locales = [
  { id: "en", label: "English" },
  { id: "en-US", label: "American English" },
  { id: "gd", label: "Gàidhlig" },
  { id: "cy", label: "Cymraeg" },
  { id: "ga", label: "Gaeilge" },
  { id: "fr", label: "Français" },
  { id: "it", label: "Italiano" },
  { id: "es", label: "Español" },
  { id: "de", label: "Deutsch" },
  { id: "ru", label: "Русский" },
] as const;

export type Locale = (typeof locales)[number]["id"];

export function isLocale(value: string | null): value is Locale {
  return locales.some((item) => item.id === value);
}
