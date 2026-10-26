import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminCurrencyClient from '@/components/admin/admin-currency-client';

export default async function AdminCurrencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Currency">
      <AdminCurrencyClient />
    </AdminShell>
  );
}
