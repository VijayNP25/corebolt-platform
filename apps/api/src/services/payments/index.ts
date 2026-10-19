import { IciciProvider } from './icici.provider.js';
import { StripeProvider } from './stripe.provider.js';
import type { PaymentCurrency, PaymentProvider } from './types.js';

export * from './types.js';
export { IciciProvider } from './icici.provider.js';
export { StripeProvider } from './stripe.provider.js';

const icici = new IciciProvider();
const stripe = new StripeProvider();

/** INR → ICICI; USD → Stripe (per product decisions). */
export function getPaymentProvider(currency: PaymentCurrency): PaymentProvider {
  return currency === 'INR' ? icici : stripe;
}

export function getProviderByName(name: 'icici' | 'stripe'): PaymentProvider {
  return name === 'icici' ? icici : stripe;
}
