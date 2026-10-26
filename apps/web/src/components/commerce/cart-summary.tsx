'use client';

import type { ReactNode } from 'react';
import { formatMoney } from '@corebolt/shared';
import { usePricedCart } from '@/hooks/use-priced-cart';

export default function CartSummary({
  action,
  note,
}: {
  action: ReactNode;
  note?: ReactNode;
}) {
  const { currency, totals } = usePricedCart();

  return (
    <aside className="cb-cart-summary">
      <h2>Cart Summary</h2>
      <div className="cb-sum-row">
        <span>Subtotal</span>
        <span>{formatMoney(totals.subtotal, currency)}</span>
      </div>
      <div className="cb-sum-row">
        <span>Shipping</span>
        <span>{formatMoney(totals.shipping, currency)}</span>
      </div>
      {currency === 'INR' && (
        <div className="cb-sum-row">
          <span>GST (18%)</span>
          <span>{formatMoney(totals.tax, currency)}</span>
        </div>
      )}
      <div className="cb-sum-total">
        <span>Total</span>
        <span>{formatMoney(totals.total, currency)}</span>
      </div>
      {action}
      {note ? <p className="cb-cart-note">{note}</p> : null}
    </aside>
  );
}
