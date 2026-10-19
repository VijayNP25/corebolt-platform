import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import LoginClient from '@/components/commerce/login-client';

export const metadata: Metadata = {
  title: 'Create account | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Create account</h1>
        <p className="lead">Register to place orders and track purchases.</p>
        <LoginClient initialMode="register" />
      </main>
    </ReplicaSiteLayout>
  );
}
