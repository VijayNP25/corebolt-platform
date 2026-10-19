'use client';

import { formatMoney } from '@corebolt/shared';
import { useCurrency } from '@/hooks/use-currency';
import { convertInrToDisplay } from '@/lib/local-cart';

export default function CatalogProductPrice({ inr }: { inr: number }) {
  const { currency } = useCurrency();
  const display = convertInrToDisplay(inr.toFixed(2), currency);

  return (
    <div className="replica-product-price">
      <span className="replica-product-price-value">
        {formatMoney(display, currency)}
      </span>
      <span className="replica-product-price-note">Excl. GST</span>
    </div>
  );
}
