'use client';

import { Link } from '@/i18n/routing';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCurrency } from '@/hooks/use-currency';
import { convertInrToDisplay } from '@/lib/local-cart';
import { formatMoney } from '@corebolt/shared';
import CdnImage from '@/components/cdn-image';

function Price({ inr }: { inr: number }) {
  const { currency } = useCurrency();
  return <span>{formatMoney(convertInrToDisplay(inr.toFixed(2), currency), currency)}</span>;
}

export default function WishlistClient() {
  const { items, remove } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="cb-shell-card">
        <p className="lead">Your wishlist is empty. Tap the heart on any product to save it here.</p>
        <Link href="/products" className="underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.id} className="cb-shell-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href={item.href}>
            <CdnImage src={item.image} alt={item.name} className="w-full h-48 object-cover" loading="lazy" />
          </Link>
          <Link href={item.href} className="underline">
            {item.name}
          </Link>
          {typeof item.priceInr === 'number' && item.priceInr > 0 ? <Price inr={item.priceInr} /> : null}
          <button type="button" className="underline text-left" onClick={() => remove(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
