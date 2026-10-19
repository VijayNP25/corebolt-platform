import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Dashboard">
      <AdminDashboard />
    </AdminShell>
  );
}
