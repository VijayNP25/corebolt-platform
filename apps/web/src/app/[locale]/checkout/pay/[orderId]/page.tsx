import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import RequireAuth from '@/components/commerce/require-auth';
import PayOrderClient from '@/components/commerce/pay-order-client';

export const metadata: Metadata = {
  title: 'Pay | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function PayOrderPage({
  params,
}: {
  params: Promise<{ locale: string; orderId: string }>;
}) {
  const { locale, orderId } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Payment</h1>
        <p className="lead">Confirm the amount, then the order is accepted.</p>
        <RequireAuth
          nextPath={`/checkout/pay/${orderId}`}
          title="Sign in to pay"
          message="The order is on your account. Sign in to finish payment."
        >
          <PayOrderClient orderId={orderId} />
        </RequireAuth>
      </main>
    </ReplicaSiteLayout>
  );
}
