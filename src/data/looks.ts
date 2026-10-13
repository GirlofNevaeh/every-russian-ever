export type Skin = "fair" | "light" | "olive" | "warm";
export type HairColor = "black" | "brown" | "blonde" | "red" | "grey" | "white";
export type HairStyle =
  | "short"
  | "long"
  | "bob"
  | "bun"
  | "wild"
  | "wig"
  | "curly"
  | "side"
  | "shoulder"
  | "bald"
  | "crop"
  | "veil"
  | "braids"
  | "ponytail"
  | "bangs";
export type FacialHair = "none" | "beard" | "mustache" | "sideburns";

export type Look = {
  skin: Skin;
  hair: HairColor;
  style: HairStyle;
  face: FacialHair;
  glasses?: boolean;
};

const look = (skin: Skin, hair: HairColor, style: HairStyle, face: FacialHair, glasses?: boolean): Look => ({
  skin,
  hair,
  style,
  face,
  glasses,
});

/** Hair and skin follow the best-known portrait of each person. */
export const LOOKS: Record<string, Look> = {
  rublev: look("fair", "brown", "bald", "beard"),
  fyodorov: look("fair", "brown", "short", "beard"),
  peter: look("fair", "brown", "curly", "mustache"),
  lomonosov: look("fair", "brown", "short", "none"),
  catherine: look("fair", "white", "wig", "none"),
  dashkova: look("fair", "grey", "wig", "none"),
  pushkin: look("warm", "black", "curly", "sideburns"),
  lermontov: look("fair", "black", "curly", "mustache"),
  gogol: look("fair", "brown", "side", "none"),
  tolstoy: look("fair", "white", "bald", "beard"),
  dostoevsky: look("fair", "brown", "short", "beard"),
  chekhov: look("fair", "brown", "short", "beard", true),
  turgenev: look("fair", "white", "short", "beard"),
  akhmatova: look("fair", "black", "bangs", "none"),
  tsvetaeva: look("fair", "black", "bob", "none"),
  pasternak: look("fair", "brown", "short", "none"),
  brodsky: look("fair", "grey", "curly", "none", true),
  mandelstam: look("fair", "brown", "short", "mustache"),
  solzhenitsyn: look("fair", "grey", "bald", "beard"),
  repin: look("fair", "white", "bald", "beard"),
  aivazovsky: look("olive", "white", "short", "beard"),
  kandinsky: look("fair", "grey", "bald", "mustache", true),
  malevich: look("fair", "black", "bald", "mustache"),
  chagall: look("fair", "black", "curly", "none"),
  goncharova: look("fair", "black", "bun", "none"),
  serebriakova: look("fair", "brown", "bun", "none"),
  tchaikovsky: look("fair", "white", "short", "beard"),
  mussorgsky: look("fair", "brown", "wild", "beard"),
  "rimsky-korsakov": look("fair", "white", "short", "beard", true),
  rachmaninoff: look("fair", "black", "side", "none"),
  stravinsky: look("fair", "grey", "bald", "none", true),
  shostakovich: look("fair", "brown", "short", "none", true),
  gubaidulina: look("fair", "grey", "short", "none", true),
  pavlova: look("fair", "black", "bun", "none"),
  plisetskaya: look("fair", "black", "bun", "none"),
  nureyev: look("olive", "black", "side", "none"),
  ulanova: look("fair", "brown", "bun", "none"),
  diaghilev: look("fair", "black", "side", "mustache"),
  rostropovich: look("fair", "grey", "bald", "none"),
  mendeleev: look("fair", "grey", "long", "beard"),
  kovalevskaya: look("fair", "brown", "bun", "none"),
  lobachevsky: look("fair", "brown", "short", "sideburns"),
  pavlov: look("fair", "white", "bald", "beard"),
  mechnikov: look("fair", "white", "bald", "beard"),
  vavilov: look("fair", "brown", "short", "mustache", true),
  tsiolkovsky: look("fair", "white", "bald", "beard", true),
  korolev: look("fair", "brown", "short", "none"),
  gagarin: look("fair", "brown", "crop", "none"),
  tereshkova: look("fair", "brown", "bun", "none"),
  savitskaya: look("fair", "brown", "bob", "none"),
  popov: look("fair", "brown", "short", "beard"),
  lodygin: look("fair", "brown", "short", "beard"),
  zworykin: look("fair", "grey", "short", "none", true),
  sikorsky: look("fair", "grey", "short", "mustache"),
  sakharov: look("fair", "grey", "bald", "none"),
  cherenkov: look("fair", "grey", "short", "none"),
  geim: look("fair", "grey", "short", "none"),
  novoselov: look("fair", "brown", "short", "none"),
  perelman: look("fair", "brown", "long", "beard", true),
  kasparov: look("olive", "black", "short", "none"),
  gorbachev: look("fair", "grey", "bald", "none"),
  glinka: look("fair", "brown", "curly", "sideburns"),
  borodin: look("fair", "grey", "short", "beard", true),
  prokofiev: look("fair", "blonde", "side", "none"),
  krylov: look("fair", "grey", "bald", "none"),
  ostrovsky: look("fair", "brown", "short", "beard"),
  tyutchev: look("fair", "brown", "short", "sideburns"),
  bunin: look("fair", "grey", "short", "mustache"),
  barto: look("fair", "black", "bob", "none"),
  chukovsky: look("fair", "white", "short", "mustache", true),
  marshak: look("fair", "grey", "bald", "none", true),
  vysotsky: look("fair", "black", "curly", "mustache"),
  akhmadulina: look("fair", "black", "long", "none"),
  petrushevskaya: look("fair", "grey", "short", "none"),
  vernadsky: look("fair", "grey", "bald", "beard", true),
  yablochkov: look("fair", "brown", "short", "beard"),
  sechenov: look("fair", "brown", "short", "beard"),
  ladyzhenskaya: look("fair", "brown", "short", "none"),
  kolmogorov: look("fair", "grey", "bald", "none", true),
  kapitsa: look("fair", "grey", "bald", "mustache"),
  kochina: look("fair", "grey", "bun", "none"),
  dolivo: look("fair", "brown", "short", "beard"),
  serov: look("fair", "brown", "short", "mustache"),
  vasnetsov: look("fair", "brown", "short", "beard"),
  bryullov: look("fair", "black", "curly", "sideburns"),
  shishkin: look("fair", "brown", "short", "beard"),
  levitan: look("light", "black", "short", "beard"),
  roerich: look("fair", "grey", "bald", "beard"),
  golubkina: look("fair", "grey", "bun", "none"),
  rozanova: look("fair", "black", "bob", "none"),
  polenova: look("fair", "brown", "bun", "none"),
  tretyakov: look("fair", "grey", "bald", "beard"),
  chaliapin: look("fair", "black", "short", "mustache"),
  scriabin: look("fair", "black", "short", "mustache"),
  alexandrov: look("fair", "grey", "short", "mustache"),
  yermolova: look("fair", "black", "bun", "none"),
  komissarzhevskaya: look("fair", "brown", "bun", "none"),
  zhemchugova: look("fair", "brown", "bun", "none"),
  "anna-dostoevskaya": look("fair", "brown", "bun", "none"),
  suslova: look("fair", "brown", "bun", "none"),
  tarkovsky: look("fair", "brown", "short", "beard"),
  rodnina: look("fair", "blonde", "bob", "none"),
  yashin: look("fair", "black", "short", "none"),
  karpov: look("fair", "brown", "short", "none"),
};

export function lookFor(slug: string): Look {
  return LOOKS[slug] ?? look("fair", "brown", "short", "none");
}
