import { cache } from 'react';
import { API_URL } from '@/lib/api';
import { categories, setPublishedCatalog, type Category } from '@/data/products';

/** Load the published catalogue. Falls back to the authored list when the API is down. */
export const loadPublishedCatalog = cache(async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/catalog`, {
      cache: 'no-store',
    });
    if (!res.ok) return [...categories];
    const body = (await res.json()) as { data?: { categories?: Category[] } };
    const next = body.data?.categories;
    if (!Array.isArray(next) || next.length === 0) return [...categories];
    setPublishedCatalog(next);
    return next;
  } catch {
    return [...categories];
  }
});
