import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import CheckoutClient from '@/components/commerce/checkout-client';
import RequireAuth from '@/components/commerce/require-auth';

export const metadata: Metadata = {
  title: 'Checkout | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell cb-shell--wide">
        <h1>Checkout</h1>
        <RequireAuth
          nextPath="/checkout"
          title="Sign in to checkout"
          message="An account is required before the address form. After you sign in, you come back here and can choose a saved address."
        >
          <CheckoutClient />
        </RequireAuth>
      </main>
    </ReplicaSiteLayout>
  );
}
