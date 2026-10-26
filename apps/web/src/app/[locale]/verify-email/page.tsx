import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import VerifyEmailClient from '@/components/commerce/verify-email-client';

export const metadata: Metadata = {
  title: 'Confirm email | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Confirm email</h1>
        <Suspense fallback={<p className="lead">Confirming your email…</p>}>
          <VerifyEmailClient />
        </Suspense>
      </main>
    </ReplicaSiteLayout>
  );
}
