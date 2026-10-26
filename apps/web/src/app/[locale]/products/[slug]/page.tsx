import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { formatMoney } from '@corebolt/shared';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import ProductDetailActions from '@/components/catalog/product-detail-actions';
import CdnImage from '@/components/cdn-image';
import { apiFetch, type ApiProduct } from '@/lib/api';
import { getRequestCurrency } from '@/lib/server-currency';
import { JsonLd, productJsonLd } from '@/lib/seo-jsonld';
import { loadPublishedCatalog } from '@/lib/published-catalog';
import { locateProduct, slugify } from '@/lib/subcategory-products';

function staticProduct(slug: string, currency: 'INR' | 'USD'): ApiProduct | null {
  const loc = locateProduct(slug);
  if (!loc) return null;
  const { product: fallback } = loc;
  return {
    id: fallback.id,
    name: fallback.name,
    slug: slugify(fallback.id),
    sku: null,
    description: fallback.description ?? null,
    shortDescription: null,
    pricingType: fallback.price ? 'FIXED' : 'ON_REQUEST',
    currency,
    price: fallback.price != null ? String(fallback.price) : null,
    priceInr: fallback.price != null ? String(fallback.price) : null,
    shipping: null,
    imageUrl: fallback.image ?? null,
    categoryId: fallback.category ?? null,
    isActive: true,
  };
}

async function loadProduct(
  slug: string,
  currency: 'INR' | 'USD',
): Promise<ApiProduct | null> {
  await loadPublishedCatalog();
  try {
    const res = await apiFetch<{ data: { product: ApiProduct } }>(
      `/products/${encodeURIComponent(slug)}`,
      { currency },
    );
    return res.data.product;
  } catch {
    return staticProduct(slug, currency);
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const currency = await getRequestCurrency();
  const product = await loadProduct(slug, currency);
  if (!product) return { title: 'Product | CORE BOLT' };
  return {
    title: `${product.name} | CORE BOLT`,
    description: product.shortDescription ?? product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.shortDescription ?? undefined,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const currency = await getRequestCurrency();
  const product = await loadProduct(slug, currency);
  if (!product) notFound();

  const isFixed = product.pricingType === 'FIXED' && product.price;

  return (
    <ReplicaSiteLayout lightNav navTrail={[{ label: product.name, href: `/products/${product.slug}` }]}>
      <JsonLd data={productJsonLd(product)} />
      <main className="cb-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            {product.imageUrl ? (
              <CdnImage
                src={product.imageUrl}
                alt={product.name}
                className="w-full object-contain bg-white border border-[rgba(0,0,0,0.09)]"
              />
            ) : (
              <div className="aspect-square bg-muted flex items-center justify-center">
                No image
              </div>
            )}
          </div>
          <div>
            <h1>{product.name}</h1>
            {isFixed ? (
              <p className="text-2xl font-semibold text-[var(--g-dk,#5c9200)] mb-4">
                {formatMoney(product.price!, product.currency)}
                {product.currency === 'INR' && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Excl. GST)
                  </span>
                )}
              </p>
            ) : (
              <p className="text-lg font-medium text-[var(--ink2)] mb-4">
                Price on request
              </p>
            )}
            {product.description && (
              <p className="lead whitespace-pre-line">{product.description}</p>
            )}
            <ProductDetailActions product={product} />
          </div>
        </div>
      </main>
    </ReplicaSiteLayout>
  );
}
