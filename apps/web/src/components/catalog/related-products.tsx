'use client';

import { Link } from '@/lib/wouter-compat';
import { categories, type Product } from '@/data/products';
import {
  buildProductPath,
  getSubcategoryProductsFlat,
} from '@/lib/subcategory-products';
import CdnImage from '@/components/cdn-image';

function siblings(product: Product, limit = 4): Product[] {
  const cat = categories.find((c) => c.id === product.category);
  if (!cat) return [];
  let pool: Product[] = [];
  if (product.subcategory) {
    const sub = cat.subcategories?.find((s) => s.id === product.subcategory);
    if (sub) pool = getSubcategoryProductsFlat(sub);
  } else {
    pool = cat.products ?? [];
  }
  return pool.filter((p) => p.id !== product.id).slice(0, limit);
}

export default function RelatedProducts({ product }: { product: Product }) {
  const items = siblings(product);
  if (!items.length) return null;

  return (
    <section className="wrap" style={{ paddingBottom: 64 }}>
      <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
        Related products
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.id}
            href={buildProductPath(p)}
            className="block border border-black/10 bg-white p-3 hover:border-black/30"
          >
            <div className="aspect-square mb-2 bg-[#f4f4f4] overflow-hidden">
              {p.image ? (
                <CdnImage src={p.image} alt={p.name} className="w-full h-full object-contain" />
              ) : null}
            </div>
            <div className="text-sm font-medium">{p.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
