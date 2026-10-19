import { isCurrencyCode, type CurrencyCode } from '@corebolt/shared';

export const CURRENCY_COOKIE = 'currency';
export const CURRENCY_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const DEFAULT_CURRENCY: CurrencyCode =
  (process.env.NEXT_PUBLIC_DEFAULT_CURRENCY as CurrencyCode | undefined) ??
  'INR';

export function parseCurrency(value: string | undefined | null): CurrencyCode {
  if (value && isCurrencyCode(value)) return value;
  return DEFAULT_CURRENCY;
}

export function currencyCookieHeader(currency: CurrencyCode): string {
  return `${CURRENCY_COOKIE}=${currency}; Path=/; Max-Age=${CURRENCY_COOKIE_MAX_AGE}; SameSite=Lax`;
}
