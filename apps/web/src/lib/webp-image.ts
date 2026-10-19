const WEBP_ELIGIBLE_HOSTS = ["assets.core-bolt.com"];

function mimeTypeFor(src: string): string {
  return /\.png$/i.test(src) ? "image/png" : "image/jpeg";
}

/**
 * Given an image URL, returns the corresponding .webp URL if this looks
 * like a website-assets/blog-assets CDN image we've generated a WebP
 * version for (same filename, same folder, .jpg/.jpeg/.png -> .webp).
 * Returns null for anything else (local paths, already-webp, unknown
 * hosts, non-image), so callers can skip rendering a wasted <source>.
 */
export function toWebpUrl(src: string | undefined | null): string | null {
  if (!src) return null;
  try {
    const url = new URL(src, "https://assets.core-bolt.com");
    if (!WEBP_ELIGIBLE_HOSTS.includes(url.hostname)) return null;
    if (!/\.(jpe?g|png)$/i.test(url.pathname)) return null;
    const webpPath = url.pathname.replace(/\.(jpe?g|png)$/i, ".webp");
    return `${url.origin}${webpPath}`;
  } catch {
    return null;
  }
}

/**
 * Builds a CSS background-image value for the given URL. If a WebP version
 * exists for it, returns an image-set() with both WebP and the original as
 * a typed fallback -- browsers that don't support image-set() at all just
 * won't apply this declaration (callers should set a plain url(...) first
 * as the base fallback, same pattern as the static CSS hero background).
 * If no WebP version applies, returns a plain url(...) value.
 */
export function buildBackgroundImageValue(src: string): string {
  const webpSrc = toWebpUrl(src);
  if (!webpSrc) {
    return `url('${src}')`;
  }
  const mime = mimeTypeFor(src);
  return `image-set(url('${webpSrc}') type('image/webp'), url('${src}') type('${mime}'))`;
}
