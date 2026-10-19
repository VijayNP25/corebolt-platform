import CatalogRouter from '@/components/catalog-router';

export default async function CatalogCatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; catalog: string[] }>;
}) {
  const { catalog } = await params;
  return <CatalogRouter segments={catalog ?? []} />;
}
