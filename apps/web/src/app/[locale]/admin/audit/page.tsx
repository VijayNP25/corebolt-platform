import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminAuditClient from '@/components/admin/admin-audit-client';

export default async function AdminAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Audit log">
      <p className="text-sm text-[var(--ink3)] mb-4">
        Staff and admin changes to orders, catalogue, customers, reviews, and currency.
      </p>
      <AdminAuditClient />
    </AdminShell>
  );
}
