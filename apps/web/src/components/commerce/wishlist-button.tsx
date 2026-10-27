'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';
import type { WishlistItem } from '@/lib/wishlist';

export default function WishlistButton({
  item,
  className,
}: {
  item: WishlistItem;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const { toast } = useToast();
  const active = has(item.id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(item);
        toast({ title: added ? 'Saved to wishlist' : 'Removed from wishlist', description: item.name });
      }}
    >
      <Heart
        size={18}
        strokeWidth={1.75}
        aria-hidden
        fill={active ? '#76b900' : 'none'}
        color={active ? '#76b900' : 'currentColor'}
      />
    </button>
  );
}
