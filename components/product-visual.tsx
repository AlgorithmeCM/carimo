export function ProductVisual({
  accent,
  initials,
  imageUrl,
  compact = false
}: {
  accent: string;
  initials: string;
  imageUrl?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(145deg,#fffdf9_0%,#f4eee4_100%)] ${compact ? 'h-52' : 'h-64'}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 brand-product-grid opacity-60" />
      <div className="absolute inset-3 border border-[rgba(190,160,91,.16)]" />
      <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[rgba(190,160,91,.18)] blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[rgba(189,23,111,.07)] blur-3xl" />
      <div className="absolute left-1/2 top-4 h-px w-20 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="relative z-10 h-full w-full object-contain p-5 drop-shadow-[0_24px_22px_rgba(40,27,17,.16)] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:-translate-y-1"
          loading="lazy"
        />
      ) : (
        <div className={`relative z-10 flex h-[76%] w-[40%] flex-col items-center rounded-t-[1.8rem] rounded-b-[1rem] border border-white/75 bg-gradient-to-br ${accent} shadow-[0_26px_42px_rgba(36,24,15,.20)] transition duration-700 group-hover:-translate-y-1 group-hover:scale-[1.025]`}>
          <div className="mt-[-9px] h-5 w-[60%] rounded-t-md bg-[var(--ink)]" />
          <div className="mt-2 h-1 w-[45%] rounded-full bg-[var(--gold)]" />
          <div className="mb-auto mt-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(190,160,91,.55)] bg-white/95 font-display text-lg font-semibold text-[var(--ink)] shadow-inner">
            {initials}
          </div>
          <div className="mb-5 h-px w-10 bg-[rgba(21,17,14,.28)]" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[rgba(31,20,13,.16)] to-transparent" />
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-px w-12 -translate-x-1/2 bg-[rgba(255,255,255,.72)]" />
    </div>
  );
}
