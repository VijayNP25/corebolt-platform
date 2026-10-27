import { d, money, percentOf, type MoneyString } from './money.js';

export type TaxBreakdown = {
  type: 'CGST_SGST' | 'IGST' | 'NONE';
  /** Total GST rate in percent, e.g. 18 */
  rate: string;
  cgst: MoneyString;
  sgst: MoneyString;
  igst: MoneyString;
  total: MoneyString;
  placeOfSupply: string;
  sellerState: string;
  sellerGstin: string;
  /** GSTIN of the buyer when they gave one (B2B). */
  buyerGstin: string | null;
};

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * GST on an Indian order. Place of supply for goods is where they are delivered,
 * so the shipping state decides: same state as the seller gives CGST + SGST
 * (half each), any other state gives IGST. Export (USD) orders carry no GST here.
 */
export function computeGst(input: {
  taxable: string;
  ratePercent: string;
  currency: 'INR' | 'USD';
  sellerState: string;
  sellerGstin: string;
  shipToState: string;
  shipToCountry: string;
  buyerGstin?: string | null;
}): TaxBreakdown {
  const base = {
    rate: input.ratePercent,
    placeOfSupply: input.shipToState,
    sellerState: input.sellerState,
    sellerGstin: input.sellerGstin,
    buyerGstin: input.buyerGstin ?? null,
  };

  if (input.currency !== 'INR' || input.shipToCountry.toUpperCase() !== 'IN') {
    return { ...base, type: 'NONE', cgst: '0.00', sgst: '0.00', igst: '0.00', total: '0.00' };
  }

  const total = percentOf(input.taxable, input.ratePercent);

  if (norm(input.shipToState) === norm(input.sellerState)) {
    const cgst = money(d(total).div(2).toDecimalPlaces(2));
    const sgst = money(d(total).minus(cgst));
    return { ...base, type: 'CGST_SGST', cgst, sgst, igst: '0.00', total };
  }

  return { ...base, type: 'IGST', cgst: '0.00', sgst: '0.00', igst: total, total };
}
