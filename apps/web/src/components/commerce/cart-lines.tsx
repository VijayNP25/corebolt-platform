'use client';

import { useState } from 'react';
import { formatMoney } from '@corebolt/shared';
import { Link } from '@/i18n/routing';
import CdnImage from '@/components/cdn-image';
import { usePricedCart, type PricedCartItem } from '@/hooks/use-priced-cart';
import { convertInrToDisplay } from '@/lib/local-cart';

export default function CartLines() {
  const { currency, cart, fx, setQty, removeItem, ready } = usePricedCart();
  const [selected, setSelected] = useState<string[]>([]);
  const ids = cart.items.map((item) => item.productId);
  const selectedIds = selected.filter((id) => ids.includes(id));
  const allSelected = ids.length > 0 && selectedIds.length === ids.length;

  return (
    <div className="cb-cart-panel">
      <div className="overflow-x-auto">
        <table className="cb-cart-table">
          <thead>
            <tr>
              <th style={{ width: 44 }}>
                <input
                  type="checkbox"
                  aria-label="Select all products"
                  checked={allSelected}
                  onChange={(event) => setSelected(event.target.checked ? ids : [])}
                />
              </th>
              <th>Product Details</th>
              <th>Quantity</th>
              <th className="num hide-sm">Unit Price</th>
              <th className="num">Extended Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item: PricedCartItem) => {
              const unit = item.priceInr
                ? convertInrToDisplay(item.priceInr, currency, fx.inrPerUsd, fx.markupPercent)
                : null;
              const line = unit == null ? 0 : Number(unit) * item.quantity;
              return (
                <tr key={item.productId}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${item.name}`}
                      checked={selectedIds.includes(item.productId)}
                      onChange={(event) => {
                        setSelected((current) =>
                          event.target.checked
                            ? [...current, item.productId]
                            : current.filter((id) => id !== item.productId),
                        );
                      }}
                    />
                  </td>
                  <td>
                    <div className="cb-cart-product">
                      {item.imageUrl ? (
                        <CdnImage src={item.imageUrl} alt="" />
                      ) : null}
                      <div>
                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                        {item.manufacturer ? (
                          <div className="cb-cart-mfr">{item.manufacturer}</div>
                        ) : null}
                        {item.unavailable ? (
                          <div className="cb-cart-mfr">No longer sold at a fixed price</div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td data-label="Quantity">
                    <input
                      className="cb-qty-input"
                      type="number"
                      min={1}
                      value={item.quantity}
                      aria-label={`Quantity of ${item.name}`}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        if (!Number.isFinite(next) || next < 1) return;
                        setQty(item.productId, Math.floor(next));
                      }}
                    />
                  </td>
                  <td className="num" data-label="Unit Price">
                    {unit == null ? '—' : formatMoney(unit, currency)}
                  </td>
                  <td className="num" data-label="Extended Price">
                    <strong>
                      {unit == null
                        ? '—'
                        : formatMoney(
                            currency === 'INR' ? line.toFixed(2) : String(Math.round(line)),
                            currency,
                          )}
                    </strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!ready ? <p className="cb-cart-note">Confirming current prices…</p> : null}
      <div className="cb-cart-tools">
        <button
          type="button"
          disabled={selectedIds.length === 0}
          onClick={() => {
            selectedIds.forEach((id) => removeItem(id));
            setSelected([]);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
