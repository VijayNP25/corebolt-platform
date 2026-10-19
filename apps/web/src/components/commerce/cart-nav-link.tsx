'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useLocalCart } from '@/hooks/use-local-cart';
import { getMe } from '@/lib/auth';

export default function CartNavLink({
  style,
  className,
  onClick,
  variant = 'text',
}: {
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  /** `icon` = cart glyph + badge (utility bar); `text` = “Cart” label */
  variant?: 'text' | 'icon';
}) {
  const { itemCount } = useLocalCart();
  const router = useRouter();

  const goCart = async (e: MouseEvent) => {
    e.preventDefault();
    onClick?.();
    const user = await getMe();
    if (!user) {
      router.push('/login?next=/cart');
      return;
    }
    router.push('/cart');
  };

  if (variant === 'icon') {
    return (
      <Link
        href="/cart"
        className={['nav-icon-btn', className].filter(Boolean).join(' ')}
        style={style}
        onClick={goCart}
        aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
      >
        <ShoppingCart size={18} strokeWidth={1.75} aria-hidden />
        {itemCount > 0 ? (
          <span className="nav-cart-badge" aria-hidden>
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className={className}
      style={style}
      onClick={goCart}
      aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
    >
      Cart
      {itemCount > 0 ? (
        <span className="nav-cart-badge" aria-hidden>
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
