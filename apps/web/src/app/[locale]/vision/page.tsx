import { setRequestLocale } from 'next-intl/server';
import ReplicaHomePage from '@/components/replica-home/replica-home-page';

export default async function VisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReplicaHomePage />;
}
