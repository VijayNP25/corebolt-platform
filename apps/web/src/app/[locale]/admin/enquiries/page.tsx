import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminEnquiriesClient from '@/components/admin/admin-enquiries-client';

export default async function AdminEnquiriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Enquiries">
      <AdminEnquiriesClient />
    </AdminShell>
  );
}
