import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';

export default async function AdminCustomersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Customers">
      <div className="cb-shell-card">
        <p>
          Customers admin stub — list users via staff API when endpoint is added.
        </p>
      </div>
    </AdminShell>
  );
}
