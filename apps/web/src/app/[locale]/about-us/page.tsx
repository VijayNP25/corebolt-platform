import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaAboutPage from '@/components/replica-pages/replica-about-page';

export const metadata: Metadata = {
  title: 'About Us | CORE BOLT',
  description:
    'CORE BOLT designs and manufactures AI Edge Computers, industrial computing platforms, and perception systems for robotics and automation.',
};

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReplicaAboutPage />;
}
