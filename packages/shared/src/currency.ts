export type CurrencyCode = 'INR' | 'USD';

const formatters: Record<CurrencyCode, Intl.NumberFormat> = {
  INR: new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
};

/**
 * Format a decimal money string for display.
 * INR keeps 2 fraction digits; USD is whole dollars (per product rules).
 */
export function formatMoney(amount: string, currency: CurrencyCode): string {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid money amount: ${amount}`);
  }
  return formatters[currency].format(value);
}

export function isCurrencyCode(value: string): value is CurrencyCode {
  return value === 'INR' || value === 'USD';
}
