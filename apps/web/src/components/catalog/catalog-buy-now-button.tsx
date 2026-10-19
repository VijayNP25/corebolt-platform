'use client';

import { ShoppingCart } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useLocalCart } from '@/hooks/use-local-cart';
import { useToast } from '@/hooks/use-toast';

export default function CatalogBuyNowButton({
  productId,
  slug,
  name,
  imageUrl,
  priceInr,
}: {
  productId: string;
  slug: string;
  name: string;
  imageUrl?: string | null;
  priceInr: string;
}) {
  const { addItem } = useLocalCart();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <button
      type="button"
      className="btn replica-btn-dark"
      onClick={() => {
        try {
          addItem({
            productId,
            slug,
            name,
            imageUrl,
            priceInr,
            shippingInr: '0',
            shippingUsd: '0',
            quantity: 1,
          });
          toast({ title: 'Added to cart', description: name });
          router.push('/cart');
        } catch (e) {
          toast({
            title: 'Could not add',
            description: e instanceof Error ? e.message : 'Try again',
            variant: 'destructive',
          });
        }
      }}
    >
      <ShoppingCart className="w-4 h-4" />
      Buy Now
    </button>
  );
}
