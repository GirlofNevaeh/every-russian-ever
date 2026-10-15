import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  const { tx } = useI18n();
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-8 text-lg">
      <h1 className="font-serif text-4xl text-neva">{tx("About")}</h1>
      <p>{tx("Russia today is one very large country. The capital is Moscow.")}</p>
      <p>{tx("Parliament, the Federal Assembly, meets in Moscow.")}</p>
      <p>{tx("The constitution of 1993 is the set of rules. The president is the head of state.")}</p>
      <p>{tx("Russian is the language of the whole country. Many republics also use their own languages.")}</p>
      <p>{tx("From 1922 to 1991 Russia was one part of the Soviet Union. The other countries that came out of that union are not Russia.")}</p>
      <p>{tx("Ukraine is a different country. Belarus is a different country.")}</p>
      <p>{tx("Crimea is in Ukraine. Donetsk, Luhansk, Zaporizhzhia, and Kherson are in Ukraine too.")}</p>
      <p>{tx("Japan and Russia do not agree about the southern Kuril Islands.")}</p>
      <p>{tx("In 2022 Russia's army went into Ukraine. Many families were hurt.")}</p>
      <p>{tx("A person born in a town that is now in another country is named with the town then and the country now.")}</p>
      <p>{tx("Kaliningrad is part of Russia. It is separate from the mainland, between Poland and Lithuania.")}</p>
      <p>{tx("Many children in Russia have family from other countries, or speak another language at home. They belong in today's Russia.")}</p>
    </main>
  );
}
