import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';

export default async function AdminReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Reports">
      <div className="cb-shell-card">
        <p>Reports stub — charts and exports will call API aggregates.</p>
      </div>
    </AdminShell>
  );
}
