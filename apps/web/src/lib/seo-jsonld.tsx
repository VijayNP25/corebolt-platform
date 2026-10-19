const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://www.core-bolt.com';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CORE BOLT',
    url: SITE_URL,
    logo: 'https://assets.core-bolt.com/website-assets/COREBOLT.webp',
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CORE BOLT',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/en/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description?: string | null;
  slug: string;
  imageUrl?: string | null;
  price?: string | null;
  currency?: string;
  pricingType?: string;
}) {
  const url = `${SITE_URL}/en/products/${product.slug}`;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? undefined,
    image: product.imageUrl ?? undefined,
    url,
    brand: { '@type': 'Brand', name: 'CORE BOLT' },
  };

  if (product.pricingType === 'FIXED' && product.price) {
    data.offers = {
      '@type': 'Offer',
      url,
      priceCurrency: product.currency ?? 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
    };
  }

  return data;
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http')
        ? item.href
        : `${SITE_URL}${item.href}`,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
