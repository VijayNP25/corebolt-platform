'use client';

import { useEffect, useState } from 'react';
import { ApiError, apiFetch, type ApiProduct } from '@/lib/api';

/** Same slug rules as the catalogue import in apps/api/scripts/seed-catalog.ts. */
export function catalogApiSlug(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

export type CatalogOffer =
  | { status: 'loading' }
  | { status: 'quote' }
  | {
      status: 'buy';
      productId: string;
      slug: string;
      name: string;
      imageUrl: string | null;
      priceInr: string;
      shippingInr: string;
      shippingUsd: string;
    };

type OfferSource = {
  id: string;
  name: string;
  image?: string | null;
  price?: number | null;
};

function staticBuy(source: OfferSource): CatalogOffer {
  if (source.price == null || !(source.price > 0)) return { status: 'quote' };
  return {
    status: 'buy',
    productId: source.id,
    slug: catalogApiSlug(source.id),
    name: source.name,
    imageUrl: source.image ?? null,
    priceInr: Number(source.price).toFixed(2),
    shippingInr: '0',
    shippingUsd: '0',
  };
}

function offerFromApi(product: ApiProduct, source: OfferSource): CatalogOffer {
  const price = product.priceInr;
  if (product.pricingType === 'FIXED' && price && Number(price) > 0) {
    return {
      status: 'buy',
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.imageUrl ?? source.image ?? null,
      priceInr: Number(price).toFixed(2),
      shippingInr: product.shippingInr || '0',
      shippingUsd: product.shippingUsd || '0',
    };
  }
  return { status: 'quote' };
}

export function useCatalogOffer(source: OfferSource | null): CatalogOffer {
  const [offer, setOffer] = useState<CatalogOffer>({ status: 'loading' });

  useEffect(() => {
    if (!source) {
      setOffer({ status: 'quote' });
      return;
    }

    let cancelled = false;
    setOffer({ status: 'loading' });
    const slug = catalogApiSlug(source.id);

    apiFetch<{ data: { product: ApiProduct } }>(
      `/products/${encodeURIComponent(slug)}`,
    )
      .then((res) => {
        if (!cancelled) setOffer(offerFromApi(res.data.product, source));
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setOffer({ status: 'quote' });
          return;
        }
        setOffer(staticBuy(source));
      });

    return () => {
      cancelled = true;
    };
  }, [source?.id, source?.name, source?.image, source?.price]);

  return offer;
}
