import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminCurrencyStub from '@/components/admin/admin-currency-stub';

export default async function AdminCurrencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Currency">
      <AdminCurrencyStub />
    </AdminShell>
  );
}
