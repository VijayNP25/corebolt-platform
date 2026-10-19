import { Decimal } from 'decimal.js';

Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_UP });

export type MoneyString = string;

export function d(value: string | number | Decimal): Decimal {
  return value instanceof Decimal ? value : new Decimal(value);
}

export function money(value: string | number | Decimal): MoneyString {
  return d(value).toFixed(2);
}

export function moneyAdd(...values: Array<string | number | Decimal>): MoneyString {
  return money(values.reduce<Decimal>((acc, v) => acc.plus(d(v)), new Decimal(0)));
}

export function moneyMul(
  a: string | number | Decimal,
  b: string | number | Decimal,
): MoneyString {
  return money(d(a).mul(d(b)));
}

/**
 * Convert INR to USD using:
 * effectiveRate = inrPerUsd * (1 + markupPercent/100)
 * usd = round_whole(inr / effectiveRate)
 */
export function inrToUsd(
  inrAmount: string | number | Decimal,
  inrPerUsd: string | number | Decimal,
  markupPercent: string | number | Decimal,
): MoneyString {
  const markupFactor = d(1).plus(d(markupPercent).div(100));
  const effectiveRate = d(inrPerUsd).mul(markupFactor);
  if (effectiveRate.lte(0)) {
    throw new Error('Invalid FX rate');
  }
  return d(inrAmount).div(effectiveRate).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toFixed(0);
}

export function usdToInr(
  usdAmount: string | number | Decimal,
  inrPerUsd: string | number | Decimal,
  markupPercent: string | number | Decimal,
): MoneyString {
  const markupFactor = d(1).plus(d(markupPercent).div(100));
  const effectiveRate = d(inrPerUsd).mul(markupFactor);
  return money(d(usdAmount).mul(effectiveRate));
}

export function percentOf(
  amount: string | number | Decimal,
  percent: string | number | Decimal,
): MoneyString {
  return money(d(amount).mul(d(percent)).div(100));
}

export function toMinorUnits(amount: string | number | Decimal, currency: 'INR' | 'USD'): number {
  const decimals = currency === 'USD' ? 0 : 2;
  return d(amount).mul(Decimal.pow(10, decimals)).toDecimalPlaces(0).toNumber();
}
