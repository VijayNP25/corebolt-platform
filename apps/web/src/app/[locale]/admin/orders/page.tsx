import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminListStub from '@/components/admin/admin-list-stub';

export default async function AdminOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Orders">
      <AdminListStub
        endpoint="/orders"
        dataKey="orders"
        emptyLabel="No orders yet."
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'status', label: 'Status' },
          { key: 'currency', label: 'Currency' },
          { key: 'total', label: 'Total' },
        ]}
      />
    </AdminShell>
  );
}
