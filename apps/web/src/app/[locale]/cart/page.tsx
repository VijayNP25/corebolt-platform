import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import CartClient from '@/components/commerce/cart-client';
import RequireAuth from '@/components/commerce/require-auth';

export const metadata: Metadata = {
  title: 'Cart | CORE BOLT',
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
      <main className="cb-shell">
        <h1>Cart</h1>
        <p className="lead">Review items before checkout. Sign in required.</p>
        <RequireAuth nextPath="/cart">
          <CartClient />
        </RequireAuth>
      </main>
    </ReplicaSiteLayout>
  );
}
