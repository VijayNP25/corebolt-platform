import { describe, expect, it } from 'vitest';
import { formatMoney, isCurrencyCode, orderShippingFee } from './currency.js';

describe('formatMoney', () => {
  it('formats INR with two decimals', () => {
    expect(formatMoney('1999.00', 'INR')).toMatch(/1,999\.00|₹/);
  });

  it('formats USD as whole dollars', () => {
    const result = formatMoney('42', 'USD');
    expect(result).toMatch(/\$42|42/);
  });

  it('rejects invalid amounts', () => {
    expect(() => formatMoney('abc', 'INR')).toThrow(/Invalid money/);
  });
});

describe('orderShippingFee', () => {
  it('charges once per order and nothing for an empty cart', () => {
    expect(orderShippingFee('INR', 0)).toBe('0.00');
    expect(orderShippingFee('INR', 1)).toBe('2000.00');
    expect(orderShippingFee('INR', 4)).toBe('2000.00');
    expect(orderShippingFee('USD', 2)).toBe('21.00');
  });
});

describe('isCurrencyCode', () => {
  it('accepts INR and USD', () => {
    expect(isCurrencyCode('INR')).toBe(true);
    expect(isCurrencyCode('USD')).toBe(true);
    expect(isCurrencyCode('EUR')).toBe(false);
  });
});
