import { describe, expect, it } from 'vitest';
import { computeGst } from './gst.js';

const base = {
  taxable: '100000.00',
  ratePercent: '18',
  currency: 'INR' as const,
  sellerState: 'Telangana',
  sellerGstin: '',
  shipToCountry: 'IN',
};

describe('computeGst', () => {
  it('splits CGST + SGST for the seller state', () => {
    const t = computeGst({ ...base, shipToState: ' telangana ' });
    expect(t).toMatchObject({ type: 'CGST_SGST', cgst: '9000.00', sgst: '9000.00', igst: '0.00', total: '18000.00' });
  });
  it('uses IGST for another state', () => {
    const t = computeGst({ ...base, shipToState: 'Karnataka' });
    expect(t).toMatchObject({ type: 'IGST', igst: '18000.00', cgst: '0.00', sgst: '0.00' });
  });
  it('keeps cgst + sgst equal to the total on odd paise', () => {
    const t = computeGst({ ...base, taxable: '0.05', shipToState: 'Telangana' });
    expect(Number(t.cgst) + Number(t.sgst)).toBeCloseTo(Number(t.total), 2);
  });
  it('charges no GST on USD or non-India orders', () => {
    expect(computeGst({ ...base, currency: 'USD', shipToState: 'Telangana' }).type).toBe('NONE');
    expect(computeGst({ ...base, shipToCountry: 'US', shipToState: 'Texas' }).total).toBe('0.00');
  });
});
