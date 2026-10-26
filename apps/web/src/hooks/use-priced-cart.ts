'use client';

import { useEffect, useState } from 'react';
import { useCurrency } from '@/hooks/use-currency';
import { useLocalCart } from '@/hooks/use-local-cart';
import { apiFetch, type ApiProduct } from '@/lib/api';
import {
  readLocalCart,
  sumLocalCart,
  writeLocalCart,
  type LocalCart,
  type LocalCartItem,
} from '@/lib/local-cart';

export type PricedCartItem = LocalCartItem & {
  unavailable?: boolean;
};

type Fx = { inrPerUsd: number; markupPercent: number };

type PricedState = {
  cart: LocalCart;
  items: PricedCartItem[];
  fx: Fx;
};

const fallbackFx: Fx = { inrPerUsd: 83.5, markupPercent: 2.5 };

let inflight: { key: string; promise: Promise<PricedState> } | null = null;

function signature(items: LocalCartItem[], currency: string) {
  return `${currency}|${items.map((item) => `${item.slug}:${item.quantity}:${item.priceInr}`).join('|')}`;
}

async function loadLiveCart(items: LocalCartItem[], currency: 'INR' | 'USD'): Promise<PricedState> {
  const key = signature(items, currency);
  if (inflight?.key === key) return inflight.promise;

  const promise = (async () => {
    const fxRes = await apiFetch<{
      data: { fx: { inrPerUsd: string; markupPercent: string } };
    }>('/currency/rate').catch(() => null);
    const fx: Fx = fxRes
      ? {
          inrPerUsd: Number(fxRes.data.fx.inrPerUsd),
          markupPercent: Number(fxRes.data.fx.markupPercent),
        }
      : fallbackFx;

    const priced = await Promise.all(
      items.map(async (item): Promise<PricedCartItem> => {
        if (!item.slug) return { ...item, unavailable: true, priceInr: null };
        try {
          const res = await apiFetch<{ data: { product: ApiProduct } }>(
            `/products/${encodeURIComponent(item.slug)}`,
          );
          const product = res.data.product;
          if (product.pricingType !== 'FIXED' || !product.priceInr || Number(product.priceInr) <= 0) {
            return { ...item, name: product.name, priceInr: null, unavailable: true };
          }
          return {
            ...item,
            name: product.name,
            imageUrl: product.imageUrl ?? item.imageUrl,
            priceInr: Number(product.priceInr).toFixed(2),
            shippingInr: product.shippingInr || '0',
            shippingUsd: product.shippingUsd || '0',
            unavailable: false,
          };
        } catch {
          return item;
        }
      }),
    );

    const changed = priced.some((item, index) => {
      const previous = items[index];
      return (
        item.priceInr !== previous?.priceInr ||
        item.shippingInr !== previous?.shippingInr ||
        item.shippingUsd !== previous?.shippingUsd ||
        item.name !== previous?.name
      );
    });
    if (changed) {
      const stored = readLocalCart();
      stored.items = stored.items.map((existing) => {
        const fresh = priced.find((item) => item.productId === existing.productId);
        if (!fresh) return existing;
        return {
          ...existing,
          name: fresh.name,
          imageUrl: fresh.imageUrl,
          priceInr: fresh.priceInr,
          shippingInr: fresh.shippingInr,
          shippingUsd: fresh.shippingUsd,
        };
      });
      writeLocalCart(stored);
    }

    return { cart: { items: priced, updatedAt: new Date().toISOString() }, items: priced, fx };
  })();

  inflight = { key, promise };
  try {
    return await promise;
  } finally {
    if (inflight?.promise === promise) inflight = null;
  }
}

/** Browser cart lines, with each price read again from the shop. */
export function usePricedCart() {
  const { currency } = useCurrency();
  const local = useLocalCart();
  const [state, setState] = useState<PricedState | null>(null);

  const key = signature(local.cart.items, currency);

  useEffect(() => {
    let cancelled = false;
    const items = readLocalCart().items;
    if (items.length === 0) {
      setState({ cart: readLocalCart(), items: [], fx: fallbackFx });
      return;
    }
    loadLiveCart(items, currency).then((next) => {
      if (!cancelled) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, [key, currency]);

  const cart = state?.cart ?? local.cart;
  const fx = state?.fx ?? fallbackFx;
  const totals = sumLocalCart(cart, currency, fx.inrPerUsd, fx.markupPercent);

  return {
    ...local,
    cart,
    currency,
    fx,
    totals,
    ready: state !== null,
  };
}
