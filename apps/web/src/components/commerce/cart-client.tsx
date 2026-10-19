'use client';

import { formatMoney } from '@corebolt/shared';
import { Link } from '@/i18n/routing';
import { useCurrency } from '@/hooks/use-currency';
import { useLocalCart } from '@/hooks/use-local-cart';
import { convertInrToDisplay, sumLocalCart } from '@/lib/local-cart';

export default function CartClient() {
  const { currency } = useCurrency();
  const { cart, setQty, removeItem } = useLocalCart();
  const totals = sumLocalCart(cart, currency);

  if (cart.items.length === 0) {
    return (
      <div className="cb-shell-card">
        <h2>Your cart is empty</h2>
        <p className="lead mt-2">
          Browse the catalogue and use <strong>Buy Now</strong> on fixed-price products.
        </p>
        <p className="text-sm text-[var(--ink3)] mt-2">
          Cart is stored in this browser until Postgres/API cart sync is enabled.
        </p>
        <Link href="/products" className="inline-block mt-4 underline text-[var(--g-text)]">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cb-shell-card">
      <table className="cb-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Line</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => {
            const unit = convertInrToDisplay(item.priceInr ?? '0', currency);
            const line = Number(unit) * item.quantity;
            return (
              <tr key={item.productId}>
                <td>
                  <Link href={`/products/${item.slug}`} className="underline">
                    {item.name}
                  </Link>
                </td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="w-16 border px-2 py-1"
                    onChange={(e) => setQty(item.productId, Number(e.target.value) || 1)}
                  />
                </td>
                <td>{formatMoney(unit, currency)}</td>
                <td>
                  {formatMoney(
                    currency === 'INR' ? line.toFixed(2) : String(Math.round(line)),
                    currency,
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="text-sm underline text-[var(--ink3)]"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 space-y-1 text-sm">
        <p>
          Subtotal: <strong>{formatMoney(totals.subtotal, currency)}</strong>
        </p>
        <p>
          Shipping: <strong>{formatMoney(totals.shipping, currency)}</strong>
        </p>
        {currency === 'INR' && (
          <p>
            GST (18%): <strong>{formatMoney(totals.tax, currency)}</strong>
          </p>
        )}
        <p className="text-base pt-2">
          Total: <strong>{formatMoney(totals.total, currency)}</strong>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/checkout"
          className="inline-block bg-[var(--g)] text-white px-5 py-3 font-semibold"
        >
          Proceed to checkout
        </Link>
        <Link href="/products" className="inline-block py-3 underline text-sm">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
