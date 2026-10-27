import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { formatMoney, type CurrencyCode } from '@corebolt/shared';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import StoreExperience, {
  type StoreCategory,
  type StoreProduct,
} from '@/components/store/store-experience';
import { apiFetch, type ApiProduct } from '@/lib/api';
import { browseCatalog } from '@/lib/catalog-search';
import { loadPublishedCatalog } from '@/lib/published-catalog';
import { convertInrToDisplay } from '@/lib/local-cart';
import { getRequestCurrency } from '@/lib/server-currency';
import { buildProductPath } from '@/lib/subcategory-products';

export const metadata: Metadata = {
  title: 'Store | CORE BOLT',
  description:
    'Shop priced CORE BOLT edge computers and LiDAR sensors. Quote-only products stay in the catalogue.',
};

function cleanBlurb(name: string, raw: string | null | undefined) {
  let text = (raw ?? '').replace(/\s+/g, ' ').trim();
  text = text.replace(/^[^(]{0,90}\(₹[^)]+\)\.\s*/, '');
  text = text.replace(/^[^:]{0,140}:\s*Rs\s[\d,]+\s+excl GST\.\s*/i, '');
  if (text.length < 24) {
    text = `${name} is in the CORE BOLT store and ready to order.`;
  }
  if (text.length > 160) text = `${text.slice(0, 157).trimEnd()}…`;
  return text;
}

function moneyLabel(amount: string, currency: CurrencyCode) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) return null;
  return formatMoney(value.toFixed(2), currency);
}

function fromApi(product: ApiProduct, currency: CurrencyCode): StoreProduct | null {
  if (product.pricingType !== 'FIXED') return null;
  const priceInr = product.priceInr;
  const display = product.price;
  if (!priceInr || !display) return null;
  const priceLabel = moneyLabel(display, currency);
  if (!priceLabel || Number(priceInr) <= 0) return null;
  const name = product.name.trim();
  return {
    id: product.id,
    name,
    href: `/products/${product.slug}`,
    slug: product.slug,
    blurb: cleanBlurb(name, product.shortDescription || product.description),
    image: product.imageUrl,
    category: product.categoryName?.trim() || 'CORE BOLT',
    priceLabel,
    priceInr,
  };
}

function categoryCards(products: StoreProduct[]): StoreCategory[] {
  const groups = new Map<string, StoreProduct[]>();
  for (const item of products) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }
  const cards: StoreCategory[] = [];
  for (const [name, items] of groups) {
    const sample = items.find((item) => item.image);
    if (!sample?.image) continue;
    cards.push({
      name,
      count: items.length,
      href: sample.href,
      image: sample.image,
    });
  }
  return cards;
}

function fromCatalog(currency: CurrencyCode): StoreProduct[] {
  const browsed = browseCatalog({ price: 'fixed', page: 1, pageSize: 300, sort: 'name' });
  return browsed.items.flatMap((hit) => {
    const price = hit.product.price;
    if (typeof price !== 'number' || price <= 0) return [];
    const priceInr = price.toFixed(2);
    const display = convertInrToDisplay(priceInr, currency);
    const priceLabel = moneyLabel(display, currency);
    if (!priceLabel) return [];
    const name = hit.product.name.trim();
    return [
      {
        id: hit.product.id,
        name,
        href: buildProductPath(hit.product),
        slug: hit.product.id,
        blurb: cleanBlurb(name, hit.product.description),
        image: hit.product.image || null,
        category: hit.group.split(' · ')[0] || 'CORE BOLT',
        priceLabel,
        priceInr,
      },
    ];
  });
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currency = await getRequestCurrency();
  await loadPublishedCatalog();

  let products: StoreProduct[] = [];
  try {
    const res = await apiFetch<{ data: { items: ApiProduct[] } }>('/products', {
      currency,
      searchParams: { pricingType: 'FIXED', pageSize: 300, sort: 'name' },
    });
    products = res.data.items.flatMap((item) => {
      const mapped = fromApi(item, currency);
      return mapped ? [mapped] : [];
    });
  } catch {
    products = [];
  }
  if (products.length === 0) products = fromCatalog(currency);

  return (
    <ReplicaSiteLayout lightNav className="cb-store-shell">
      <StoreExperience
        products={products}
        categories={categoryCards(products)}
        currencyNote={currency === 'INR' ? 'Excl. GST' : null}
      />
    </ReplicaSiteLayout>
  );
}
