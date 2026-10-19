import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminProductsClient from '@/components/admin/admin-products-client';

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Products">
      <AdminProductsClient />
    </AdminShell>
  );
}
