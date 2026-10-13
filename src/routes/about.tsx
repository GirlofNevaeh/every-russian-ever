import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-8 text-lg">
      <h1 className="font-serif text-4xl text-neva">About</h1>
      <p>Russia today is one very large country. The capital is Moscow.</p>
      <p>Parliament, the Federal Assembly, meets in Moscow.</p>
      <p>The constitution of 1993 is the set of rules. The president is the head of state.</p>
      <p>Russian is the language of the whole country. Many republics also use their own languages.</p>
      <p>From 1922 to 1991 Russia was one part of the Soviet Union. The other countries that came out of that union are not Russia.</p>
      <p>Ukraine is a different country. Belarus is a different country.</p>
      <p>Crimea is in Ukraine. Donetsk, Luhansk, Zaporizhzhia, and Kherson are in Ukraine too.</p>
      <p>Japan and Russia do not agree about the southern Kuril Islands.</p>
      <p>In 2022 Russia's army went into Ukraine. Many families were hurt.</p>
      <p>A person born in a town that is now in another country is named with the town then and the country now.</p>
      <p>Kaliningrad is part of Russia. It is separate from the main land, between Poland and Lithuania.</p>
      <p>Many children in Russia have family from other countries, or speak another language at home. They belong in today's Russia.</p>
    </main>
  );
}
