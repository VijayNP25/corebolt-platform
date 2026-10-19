'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { ApiProduct } from '@/lib/api';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import ContactFormModal, {
  CONTACT_DIALOG_CONTENT_CLASS,
} from '@/components/contact-form-modal';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailActions({
  product,
}: {
  product: ApiProduct;
}) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();
  const isFixed = product.pricingType === 'FIXED' && product.price;

  const addToCart = async () => {
    setAdding(true);
    try {
      try {
        await apiFetch('/cart/items', {
          method: 'POST',
          body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });
      } catch {
        const { addLocalCartItem } = await import('@/lib/local-cart');
        if (!product.priceInr) throw new Error('No price');
        addLocalCartItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          imageUrl: product.imageUrl,
          priceInr: product.priceInr,
          shippingInr: '0',
          shippingUsd: '0',
          quantity: 1,
        });
      }
      toast({ title: 'Added to cart', description: product.name });
    } catch {
      toast({
        title: 'Could not add to cart',
        description: 'Price-on-request items cannot be carted.',
        variant: 'destructive',
      });
    } finally {
      setAdding(false);
    }
  };

  const contactProduct = {
    id: product.slug,
    name: product.name,
    category: product.categoryId ?? '',
    description: product.description ?? '',
    image: product.imageUrl ?? '',
    price: isFixed ? Number(product.price) : undefined,
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {isFixed ? (
        <>
          <Button
            className="replica-btn-dark font-semibold"
            onClick={addToCart}
            disabled={adding}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {adding ? 'Adding…' : 'Buy Now'}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Request quote</Button>
            </DialogTrigger>
            <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
              <ContactFormModal
                title={`Place Order for ${product.name}`}
                selectedProduct={contactProduct as never}
                action="order"
              />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="replica-btn-dark font-semibold">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ask Price
            </Button>
          </DialogTrigger>
          <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
            <ContactFormModal
              title={`Get a Quote for ${product.name}`}
              selectedProduct={contactProduct as never}
              action="quote"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
