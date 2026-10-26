import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import AccountClient from '@/components/commerce/account-client';

export const metadata: Metadata = {
  title: 'Account | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>My Account</h1>
        <p className="lead">Profile, saved addresses, and orders.</p>
        <AccountClient />
      </main>
    </ReplicaSiteLayout>
  );
}
