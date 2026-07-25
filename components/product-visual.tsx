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
    <div className={`product-stage ${compact ? 'product-stage-compact' : 'product-stage-regular'}`} aria-hidden="true">
      <div className="product-stage-grid" />
      <div className="product-stage-orbit" />
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" loading="lazy" />
      ) : (
        <div className={`product-stage-fallback bg-gradient-to-br ${accent}`}>
          <div className="product-stage-fallback-cap" />
          <div className="product-stage-fallback-line" />
          <div className="product-stage-fallback-initials">{initials}</div>
          <div className="product-stage-fallback-mark" />
        </div>
      )}
      <div className="product-stage-shine" />
      <div className="product-stage-floor" />
    </div>
  );
}
