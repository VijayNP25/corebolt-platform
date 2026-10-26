'use client';

import type { ReactNode } from 'react';
import { setPublishedCatalog, type Category } from '@/data/products';

/** Installs the catalogue from the server before child pages read it. */
export default function CatalogProvider({
  categories,
  children,
}: {
  categories: Category[];
  children: ReactNode;
}) {
  if (categories.length > 0) setPublishedCatalog(categories);
  return children;
}
