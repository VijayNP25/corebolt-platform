import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminListStub from '@/components/admin/admin-list-stub';

export default async function AdminEnquiriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Enquiries">
      <AdminListStub
        endpoint="/enquiries"
        dataKey="enquiries"
        emptyLabel="No enquiries yet."
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status' },
        ]}
      />
    </AdminShell>
  );
}
