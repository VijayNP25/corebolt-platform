import { setRequestLocale } from 'next-intl/server';
import AdminShell from '@/components/admin/admin-shell';
import AdminListStub from '@/components/admin/admin-list-stub';

export default async function AdminReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AdminShell title="Reviews (pending moderation)">
      <AdminListStub
        endpoint="/reviews/pending"
        dataKey="reviews"
        emptyLabel="No pending reviews (or API/Postgres offline)."
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'productId', label: 'Product' },
          { key: 'rating', label: 'Rating' },
          { key: 'body', label: 'Body' },
          { key: 'status', label: 'Status' },
        ]}
      />
    </AdminShell>
  );
}
