'use client';

import { Heart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useWishlist } from '@/hooks/use-wishlist';

export default function WishlistNavLink({ onClick }: { onClick?: () => void }) {
  const { count } = useWishlist();
  return (
    <Link
      href="/wishlist"
      className="nav-icon-btn"
      onClick={onClick}
      aria-label={count > 0 ? `Wishlist, ${count} items` : 'Wishlist'}
    >
      <Heart size={18} strokeWidth={1.75} aria-hidden />
      {count > 0 ? (
        <span className="nav-cart-badge" aria-hidden>
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </Link>
  );
}
