import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import ForgotPasswordClient from '@/components/commerce/forgot-password-client';

export const metadata: Metadata = {
  title: 'Forgot password | CORE BOLT',
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Forgot password</h1>
        <p className="lead">Enter the email on your account. We will send a link to choose a new password.</p>
        <ForgotPasswordClient />
      </main>
    </ReplicaSiteLayout>
  );
}
