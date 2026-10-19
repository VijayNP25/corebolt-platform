import { describe, expect, it } from 'vitest';
import {
  inrToUsd,
  money,
  moneyAdd,
  moneyMul,
  percentOf,
  toMinorUnits,
  usdToInr,
} from './money.js';

describe('money helpers', () => {
  it('formats to 2 decimal places', () => {
    expect(money('10')).toBe('10.00');
    expect(money('10.456')).toBe('10.46');
  });

  it('adds and multiplies without floating error', () => {
    expect(moneyAdd('0.1', '0.2')).toBe('0.30');
    expect(moneyMul('19.99', 3)).toBe('59.97');
  });

  it('converts INR to USD with markup and whole rounding', () => {
    // 8350 INR / (83.5 * 1.025) ≈ 8350 / 85.5875 ≈ 97.56 → 98
    expect(inrToUsd('8350', '83.5', '2.5')).toBe('98');
  });

  it('converts USD back to INR with markup', () => {
    expect(usdToInr('100', '83.5', '2.5')).toBe('8558.75');
  });

  it('computes GST percent', () => {
    expect(percentOf('1000', '18')).toBe('180.00');
  });

  it('converts to minor units for gateways', () => {
    expect(toMinorUnits('1999.50', 'INR')).toBe(199950);
    expect(toMinorUnits('42', 'USD')).toBe(42);
  });
});
