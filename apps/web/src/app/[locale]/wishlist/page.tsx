import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import WishlistClient from '@/components/commerce/wishlist-client';

export const metadata: Metadata = {
  title: 'Wishlist | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell cb-shell--wide">
        <h1>Wishlist</h1>
        <WishlistClient />
      </main>
    </ReplicaSiteLayout>
  );
}
