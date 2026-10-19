import { setRequestLocale } from 'next-intl/server';
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
      <div className="cb-shell-card">
        <p>
          Categories admin stub — wire to API category endpoints when available.
          Static catalog remains in <code>src/data/products.ts</code> for nav.
        </p>
      </div>
    </AdminShell>
  );
}
