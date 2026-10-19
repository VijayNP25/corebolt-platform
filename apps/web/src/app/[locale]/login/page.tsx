import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import LoginClient from '@/components/commerce/login-client';

export const metadata: Metadata = {
  title: 'Sign in | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { locale } = await params;
  const { mode } = await searchParams;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Sign in</h1>
        <p className="lead">
          Access your orders, addresses, and checkout. New here? Create an account.
        </p>
        <Suspense fallback={<p className="lead">Loading…</p>}>
          <LoginClient initialMode={mode === 'register' ? 'register' : 'login'} />
        </Suspense>
      </main>
    </ReplicaSiteLayout>
  );
}
