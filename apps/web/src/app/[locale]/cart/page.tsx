import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import CartClient from '@/components/commerce/cart-client';

export const metadata: Metadata = {
  title: 'Shopping Cart | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell cb-shell--wide">
        <h1>Shopping Cart</h1>
        <CartClient />
      </main>
    </ReplicaSiteLayout>
  );
}
