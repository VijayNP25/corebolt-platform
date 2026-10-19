import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaContactPage from '@/components/replica-pages/replica-contact-page';

export const metadata: Metadata = {
  title: 'Contact Us | CORE BOLT',
  description:
    'Get in touch with CORE BOLT for quotes, OEM orders, and technical support on edge AI computers and perception systems.',
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReplicaContactPage />;
}
