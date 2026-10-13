import type { Motif } from "@/data/people";
import type { PhotoCredit } from "@/data/photos";
import { useI18n } from "@/i18n/provider";

export function PhotoCreditLine({ photo }: { photo: PhotoCredit }) {
  const { tx } = useI18n();
  return (
    <p className="text-base text-ink">
      {photo.photographer}
      {" · "}
      {photo.licence}
      {" · "}
      <a href={photo.source} className="text-neva underline" rel="noreferrer" target="_blank">
        {tx("Source")}
      </a>
    </p>
  );
}

export function PhotoFigure({ photo, alt }: { photo: PhotoCredit; alt: string }) {
  return (
    <figure className="overflow-hidden rounded-card border border-neva/20 bg-card">
      <img src={photo.src} alt={alt} className="aspect-[4/3] w-full object-cover" />
      <figcaption className="px-3 py-2">
        <PhotoCreditLine photo={photo} />
      </figcaption>
    </figure>
  );
}

function MotifShape({ motif }: { motif: Motif }) {
  if (motif === "book") {
    return <path d="M30 28h28v44H30zM58 28h24v44H58z" fill="none" stroke="#143A78" strokeWidth="3" />;
  }
  if (motif === "brush") {
    return <path d="M40 20l8 36-10 6 4 18h16l4-18-10-6 8-36z" fill="#143A78" />;
  }
  if (motif === "note") {
    return (
      <path
        d="M62 22v40a12 12 0 1 1-8-11V30l28-6v28a12 12 0 1 1-8-11V22z"
        fill="#143A78"
      />
    );
  }
  if (motif === "dance") {
    return <path d="M48 22a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-2 18l-14 28h10l8-16 8 16h10L58 40z" fill="#143A78" />;
  }
  if (motif === "chess") {
    return <path d="M46 24h12l4 10h8v8H34v-8h8zm-8 22h28v8H38zm-4 12h36v8H34z" fill="#143A78" />;
  }
  if (motif === "leaf") {
    return <path d="M52 20c20 8 24 28 16 44-16-4-28-18-32-32 8-8 12-12 16-12z" fill="#143A78" />;
  }
  if (motif === "wave") {
    return <path d="M18 48c10-12 16-12 26 0s16 12 26 0 16-12 26 0v10c-10 12-16 12-26 0s-16-12-26 0-16 12-26 0z" fill="#143A78" />;
  }
  if (motif === "orbit") {
    return (
      <>
        <circle cx="52" cy="50" r="8" fill="#143A78" />
        <ellipse cx="52" cy="50" rx="28" ry="12" fill="none" stroke="#C8102E" strokeWidth="3" />
      </>
    );
  }
  if (motif === "mask") {
    return <path d="M28 32h48v24c0 16-10 26-24 26S28 72 28 56zM40 46h6M58 46h6M42 62c6 6 14 6 20 0" fill="none" stroke="#143A78" strokeWidth="3" />;
  }
  return (
    <>
      <circle cx="52" cy="36" r="10" fill="#C8102E" />
      <path d="M48 46h8l6 28H42z" fill="#143A78" />
    </>
  );
}

export function PersonDrawing({ name, motif }: { name: string; motif: Motif }) {
  return (
    <figure className="overflow-hidden rounded-card border border-neva/20 bg-card">
      <svg viewBox="0 0 104 104" role="img" aria-label={name} className="aspect-square w-full bg-paper">
        <rect x="8" y="8" width="88" height="88" rx="8" fill="#ffffff" stroke="#143A78" strokeWidth="3" />
        <MotifShape motif={motif} />
      </svg>
    </figure>
  );
}
