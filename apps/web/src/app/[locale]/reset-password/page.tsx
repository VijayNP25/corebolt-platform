import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import ResetPasswordClient from '@/components/commerce/reset-password-client';

export const metadata: Metadata = {
  title: 'Reset password | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Reset password</h1>
        <p className="lead">Choose a new password for your account.</p>
        <Suspense fallback={<p className="lead">Loading…</p>}>
          <ResetPasswordClient />
        </Suspense>
      </main>
    </ReplicaSiteLayout>
  );
}
