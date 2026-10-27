'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  readWishlist,
  removeWishlistItem,
  toggleWishlistItem,
  WISHLIST_EVENT,
  type WishlistItem,
} from '@/lib/wishlist';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const refresh = useCallback(() => setItems(readWishlist()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(WISHLIST_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  return {
    items,
    count: items.length,
    has: (id: string) => items.some((i) => i.id === id),
    toggle: (item: WishlistItem) => toggleWishlistItem(item),
    remove: (id: string) => removeWishlistItem(id),
  };
}
