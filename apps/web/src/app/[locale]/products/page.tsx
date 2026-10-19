import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import ApiProductCard from '@/components/catalog/api-product-card';
import { apiFetch, type ApiProduct } from '@/lib/api';
import { getRequestCurrency } from '@/lib/server-currency';
import { getAllProductsFlat, slugify } from '@/lib/subcategory-products';

export const metadata: Metadata = {
  title: 'Products | CORE BOLT',
  description:
    'Browse CORE BOLT edge computers, LiDAR sensors, vision systems, and perception kits.',
};

function staticAsApi(currency: 'INR' | 'USD'): ApiProduct[] {
  return getAllProductsFlat()
    .slice(0, 48)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: slugify(p.id),
      sku: null,
      description: p.description ?? null,
      shortDescription: p.description?.slice(0, 200) ?? null,
      pricingType: p.price ? ('FIXED' as const) : ('ON_REQUEST' as const),
      currency,
      price: p.price != null ? String(p.price) : null,
      priceInr: p.price != null ? String(p.price) : null,
      shipping: null,
      imageUrl: p.image ?? null,
      categoryId: p.category ?? null,
      isActive: true,
    }));
}

async function loadProducts(currency: 'INR' | 'USD'): Promise<ApiProduct[]> {
  try {
    const res = await apiFetch<{
      data: { items: ApiProduct[]; total: number };
    }>('/products', {
      currency,
      searchParams: { pageSize: 48 },
    });
    if (res.data?.items?.length) return res.data.items;
    return staticAsApi(currency);
  } catch {
    return staticAsApi(currency);
  }
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currency = await getRequestCurrency();
  const items = await loadProducts(currency);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Products</h1>
        <p className="lead">
          Industrial computing and perception hardware. Prices shown in {currency}.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ApiProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </ReplicaSiteLayout>
  );
}
