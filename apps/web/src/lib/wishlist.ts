/** Browser-side wishlist (localStorage). Survives reloads on this device only. */
export type WishlistItem = {
  id: string;
  name: string;
  image: string;
  /** Path without locale prefix, e.g. /products/abc */
  href: string;
  priceInr?: number | null;
};

const KEY = 'corebolt.wishlist.v1';
export const WISHLIST_EVENT = 'corebolt:wishlist';

export function readWishlist(): WishlistItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter(
          (i): i is WishlistItem =>
            !!i && typeof i.id === 'string' && typeof i.name === 'string' && typeof i.href === 'string',
        )
      : [];
  } catch {
    return [];
  }
}

function write(items: WishlistItem[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable: ignore */
  }
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}

export function toggleWishlistItem(item: WishlistItem): boolean {
  const items = readWishlist();
  const exists = items.some((i) => i.id === item.id);
  write(exists ? items.filter((i) => i.id !== item.id) : [...items, item]);
  return !exists;
}

export function removeWishlistItem(id: string): void {
  write(readWishlist().filter((i) => i.id !== id));
}
