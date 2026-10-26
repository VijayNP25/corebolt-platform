import { setRequestLocale } from 'next-intl/server';
import AdminCategoriesClient from '@/components/admin/admin-categories-client';
import AdminShell from '@/components/admin/admin-shell';

export default async function AdminCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Categories">
      <AdminCategoriesClient />
    </AdminShell>
  );
}
