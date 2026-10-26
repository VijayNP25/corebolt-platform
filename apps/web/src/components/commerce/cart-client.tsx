'use client';

import { Link } from '@/i18n/routing';
import { useLocalCart } from '@/hooks/use-local-cart';
import CartLines from '@/components/commerce/cart-lines';
import CartSummary from '@/components/commerce/cart-summary';

export default function CartClient() {
  const { cart } = useLocalCart();

  if (cart.items.length === 0) {
    return (
      <div className="cb-shell-card">
        <h2>Your cart is empty</h2>
        <p className="lead mt-2">
          Browse the catalogue and use <strong>Add to Cart</strong> on priced products.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/order-3d-lidar" className="underline text-[var(--g-text)]">
            Order 3D LiDAR
          </Link>
          <Link href="/order-edge-computers" className="underline text-[var(--g-text)]">
            Order Edge Computers
          </Link>
          <Link href="/products" className="underline text-[var(--g-text)]">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cb-cart-layout">
      <CartLines />
      <CartSummary
        action={
          <Link href="/checkout" className="cb-checkout-btn">
            Checkout
          </Link>
        }
        note={
          <>
            Already registered? <Link href="/login?next=/checkout">Log in</Link>
            . Shipping and lead time are explained on the{" "}
            <Link href="/shipping-policy">shipping page</Link>.
          </>
        }
      />
    </div>
  );
}
