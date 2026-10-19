"use client";

import type { ImgHTMLAttributes } from "react";
import { toWebpUrl } from "@/lib/webp-image";

interface CdnImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Drop-in replacement for <img>. For images hosted on our CDN that have a
 * generated WebP counterpart, renders a <picture> with a WebP <source> and
 * the original as the <img> fallback -- browsers that support WebP get the
 * smaller file automatically, everything else (and any image without a
 * WebP version) gets the original, unchanged. All standard <img> props
 * (className, loading, style, onClick, fetchPriority, etc.) pass through
 * unchanged to the underlying <img> either way.
 */
export default function CdnImage({ src, alt, ...rest }: CdnImageProps) {
  const webpSrc = toWebpUrl(src);

  if (!webpSrc) {
    return <img src={src} alt={alt} {...rest} />;
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} {...rest} />
    </picture>
  );
}
