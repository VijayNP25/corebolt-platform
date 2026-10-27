import { orderShippingFee, type CurrencyCode } from '@corebolt/shared';

const STORAGE_KEY = 'corebolt.localCart.v1';

export type LocalCartItem = {
  productId: string;
  slug: string;
  name: string;
  imageUrl?: string | null;
  /** Base INR major units as decimal string, or null for ON_REQUEST (should never be carted). */
  priceInr: string | null;
  shippingInr: string;
  shippingUsd: string;
  /** Catalogue manufacturer, when the ordering page knows it. */
  manufacturer?: string;
  quantity: number;
};

export type LocalCart = {
  items: LocalCartItem[];
  updatedAt: string;
};

function emptyCart(): LocalCart {
  return { items: [], updatedAt: new Date().toISOString() };
}

export function readLocalCart(): LocalCart {
  if (typeof window === 'undefined') return emptyCart();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyCart();
    const parsed = JSON.parse(raw) as LocalCart;
    if (!parsed || !Array.isArray(parsed.items)) return emptyCart();
    return parsed;
  } catch {
    return emptyCart();
  }
}

export function writeLocalCart(cart: LocalCart): void {
  if (typeof window === 'undefined') return;
  const next = { ...cart, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('corebolt:cart'));
}

export function addLocalCartItem(
  item: Omit<LocalCartItem, 'quantity'> & { quantity?: number },
): LocalCart {
  const cart = readLocalCart();
  if (!item.priceInr) {
    throw new Error('Price-on-request products cannot be added to the cart');
  }
  const qty = Math.max(1, item.quantity ?? 1);
  const existing = cart.items.find(
    (i) => i.productId === item.productId || (item.slug.length > 0 && i.slug === item.slug),
  );
  if (existing) {
    existing.quantity += qty;
    if (!existing.manufacturer && item.manufacturer) existing.manufacturer = item.manufacturer;
    if (!existing.imageUrl && item.imageUrl) existing.imageUrl = item.imageUrl;
  } else {
    cart.items.push({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      imageUrl: item.imageUrl ?? null,
      priceInr: item.priceInr,
      shippingInr: item.shippingInr || '0',
      shippingUsd: item.shippingUsd || '0',
      manufacturer: item.manufacturer,
      quantity: qty,
    });
  }
  writeLocalCart(cart);
  return cart;
}

export function updateLocalCartQty(productId: string, quantity: number): LocalCart {
  const cart = readLocalCart();
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.productId !== productId);
  } else {
    const row = cart.items.find((i) => i.productId === productId);
    if (row) row.quantity = quantity;
  }
  writeLocalCart(cart);
  return cart;
}

export function removeLocalCartItem(productId: string): LocalCart {
  return updateLocalCartQty(productId, 0);
}

export function clearLocalCart(): LocalCart {
  const cart = emptyCart();
  writeLocalCart(cart);
  return cart;
}

/** Fallback FX when API is offline (approx; replaced by live rate later). */
export const FALLBACK_INR_PER_USD = 83.5;
export const FALLBACK_FX_MARKUP_PERCENT = 2.5;

export function convertInrToDisplay(
  priceInr: string,
  currency: CurrencyCode,
  inrPerUsd = FALLBACK_INR_PER_USD,
  markupPercent = FALLBACK_FX_MARKUP_PERCENT,
): string {
  const inr = Number(priceInr);
  if (!Number.isFinite(inr)) return '0';
  if (currency === 'INR') return inr.toFixed(2);
  const effective = inrPerUsd * (1 + markupPercent / 100);
  const usd = Math.round(inr / effective);
  return String(usd);
}

export function sumLocalCart(
  cart: LocalCart,
  currency: CurrencyCode,
  inrPerUsd = FALLBACK_INR_PER_USD,
  markupPercent = FALLBACK_FX_MARKUP_PERCENT,
): { subtotal: string; shipping: string; tax: string; total: string } {
  const gst = 0.18;
  let subtotal = 0;
  let pricedCount = 0;
  for (const item of cart.items) {
    if (!item.priceInr) continue;
    pricedCount += 1;
    const unit = Number(convertInrToDisplay(item.priceInr, currency, inrPerUsd, markupPercent));
    subtotal += unit * item.quantity;
  }
  const shipping = Number(orderShippingFee(currency, pricedCount));
  const tax = currency === 'INR' ? subtotal * gst : 0;
  const total = subtotal + shipping + tax;
  return {
    subtotal: currency === 'INR' ? subtotal.toFixed(2) : String(Math.round(subtotal)),
    shipping: currency === 'INR' ? shipping.toFixed(2) : String(Math.round(shipping)),
    tax: currency === 'INR' ? tax.toFixed(2) : '0',
    total: currency === 'INR' ? total.toFixed(2) : String(Math.round(total)),
  };
}
