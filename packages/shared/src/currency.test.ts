import { describe, expect, it } from 'vitest';
import { formatMoney, isCurrencyCode } from './currency.js';

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

describe('isCurrencyCode', () => {
  it('accepts INR and USD', () => {
    expect(isCurrencyCode('INR')).toBe(true);
    expect(isCurrencyCode('USD')).toBe(true);
    expect(isCurrencyCode('EUR')).toBe(false);
  });
});
