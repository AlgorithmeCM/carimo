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
      className={`relative flex items-center justify-center overflow-hidden border-b border-[#ece6db] bg-[#f7f4ee] ${compact ? 'h-52' : 'h-64'}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 brand-product-grid opacity-55" />
      <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#c9a64e]/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#d1007f]/10 blur-3xl" />

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="relative z-10 h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div className={`relative z-10 flex h-[78%] w-[42%] flex-col items-center rounded-t-[1.8rem] rounded-b-[1rem] border border-white/70 bg-gradient-to-br ${accent} shadow-xl`}>
          <div className="mt-[-9px] h-5 w-[60%] rounded-t-md bg-[#111111]" />
          <div className="mt-2 h-1.5 w-[45%] rounded-full bg-[#c9a64e]" />
          <div className="mb-auto mt-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a64e]/50 bg-white font-display text-lg font-bold text-[#111111]">
            {initials}
          </div>
          <div className="mb-5 h-1 w-10 rounded-full bg-[#111111]/30" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
