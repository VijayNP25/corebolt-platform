import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import RequireAuth from '@/components/commerce/require-auth';
import OrderDetailClient from '@/components/commerce/order-detail-client';

export const metadata: Metadata = {
  title: 'Order | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function AccountOrderPage({
  params,
}: {
  params: Promise<{ locale: string; orderId: string }>;
}) {
  const { locale, orderId } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Order</h1>
        <p className="lead">Items, shipping address, and status.</p>
        <RequireAuth nextPath={`/account/orders/${orderId}`}>
          <OrderDetailClient orderId={orderId} />
        </RequireAuth>
      </main>
    </ReplicaSiteLayout>
  );
}
