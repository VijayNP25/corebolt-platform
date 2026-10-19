import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaHomePage from '@/components/replica-home/replica-home-page';
import { HOME_META, buildHomePageSchema } from '@/lib/home-seo';
import {
  COMPUTING_LINKS,
  VISION_LINKS,
} from '@/lib/replica-product-routes';
import { JsonLd } from '@/lib/seo-jsonld';

export const metadata: Metadata = {
  title: HOME_META.title,
  description: HOME_META.description,
  keywords: HOME_META.keywords,
  alternates: { canonical: HOME_META.canonical },
  openGraph: {
    title: HOME_META.title,
    description: HOME_META.description,
    url: HOME_META.canonical,
    images: [{ url: HOME_META.ogImage }],
    type: 'website',
  },
  other: {
    // Hint for LCP on desktop; phones hide hero photo via CSS.
  },
};

const homeSchema = buildHomePageSchema({
  computing: [
    { name: 'Edge Computers', url: COMPUTING_LINKS.edgeComputers },
    { name: 'Industrial Panel Computers', url: COMPUTING_LINKS.panelPc },
  ],
  perception: [
    { name: '3D LiDAR Sensors', url: VISION_LINKS.lidarRadar },
    { name: 'Machine Vision & Industrial Cameras', url: VISION_LINKS.cameras },
  ],
  integrationKits: [{ name: 'Perception Kits', url: '#kits' }],
});

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={homeSchema} />
      <ReplicaHomePage />
    </>
  );
}
