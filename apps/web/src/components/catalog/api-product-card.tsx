'use client';

import { useState } from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { formatMoney, type CurrencyCode } from '@corebolt/shared';
import { Link } from '@/lib/wouter-compat';
import type { ApiProduct } from '@/lib/api';
import CdnImage from '@/components/cdn-image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import ContactFormModal, {
  CONTACT_DIALOG_CONTENT_CLASS,
} from '@/components/contact-form-modal';
import '@/styles/xcard.css';

type CardProduct = ApiProduct & {
  /** Fallback for static catalog migrate */
  image?: string;
  category?: string;
};

function toContactProduct(product: CardProduct) {
  return {
    id: product.slug || product.id,
    name: product.name,
    category: product.category ?? product.categoryId ?? '',
    description: product.shortDescription ?? product.description ?? '',
    image: product.imageUrl ?? product.image ?? '',
    price:
      product.pricingType === 'FIXED' && product.price
        ? Number(product.price)
        : undefined,
  };
}

export default function ApiProductCard({
  product,
}: {
  product: CardProduct;
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const href = `/products/${product.slug}`;
  const isFixed = product.pricingType === 'FIXED' && product.price;
  const currency = (product.currency ?? 'INR') as CurrencyCode;
  const imageSrc = product.imageUrl ?? product.image ?? '';
  const desc = product.shortDescription ?? product.description ?? '';

  return (
    <Card className="mx-card mx-card--product pcard relative h-full flex flex-col border border-[rgba(0,0,0,0.09)] hover:border-[rgba(118,185,0,0.3)] bg-white group overflow-hidden rounded-none shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
      <Link href={href}>
        <div className="mx-media relative cursor-pointer">
          {imageSrc ? (
            <CdnImage
              src={imageSrc}
              alt={product.name}
              className="pcard-img w-full h-64 object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className="pcard-img w-full h-64 bg-muted flex items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="mx-body flex flex-1 flex-col pt-4 pb-5">
        <Link href={href}>
          <CardTitle className="mx-title pcard-title text-black text-xl cursor-pointer">
            {product.name}
          </CardTitle>
        </Link>
        {desc && (
          <CardDescription className="mx-desc text-black text-sm mt-3 leading-relaxed line-clamp-4">
            {desc}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="mx-desktop-actions mt-auto pt-0 pb-4">
        {isFixed ? (
          <div className="flex gap-2 items-stretch">
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="replica-btn-dark w-[calc(45%-0.25rem)] h-9 flex-shrink-0 font-semibold"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </DialogTrigger>
              <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
                <ContactFormModal
                  title={`Place Order for ${product.name}`}
                  subtitle="Complete your order details and our team will process it."
                  selectedProduct={toContactProduct(product) as never}
                  action="order"
                />
              </DialogContent>
            </Dialog>
            <div className="flex w-[calc(55%-0.25rem)] items-stretch">
              <div className="relative w-full min-h-9 flex flex-nowrap items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10">
                <span className="text-xl font-bold text-black whitespace-nowrap">
                  {formatMoney(product.price!, currency)}
                </span>
                {currency === 'INR' && (
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide whitespace-nowrap shrink-0">
                    (Excl. GST)
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-stretch">
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="replica-btn-dark w-[calc(50%-0.25rem)] h-9 flex-shrink-0 font-semibold rounded-[5px]"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ask Price
                </Button>
              </DialogTrigger>
              <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
                <ContactFormModal
                  title={`Get a Quote for ${product.name}`}
                  subtitle="Share a few details and our team will get back within one business day."
                  selectedProduct={toContactProduct(product) as never}
                  action="quote"
                />
              </DialogContent>
            </Dialog>
            <Link href={href} className="w-[calc(50%-0.25rem)] flex items-stretch">
              <Button
                variant="outline"
                size="sm"
                className="w-full h-9 bg-white text-black border-primary/40 hover:bg-white hover:text-black rounded-[5px]"
              >
                Know more
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
