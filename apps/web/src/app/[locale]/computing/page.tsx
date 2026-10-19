import { setRequestLocale } from 'next-intl/server';
import ReplicaHomePage from '@/components/replica-home/replica-home-page';

/** Legacy alias — same homepage, computing section in focus via hash from nav. */
export default async function ComputingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReplicaHomePage />;
}
