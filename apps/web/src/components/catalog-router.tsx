'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { getCategoryInfoFromNewRoute, getNewRoute, routeMappings } from '@/lib/route-mapping';
import { CatalogParamsProvider, Redirect } from '@/lib/wouter-compat';
import SubcategorySelection from '@/catalog-pages/subcategory-selection';
import Category from '@/catalog-pages/category';
import CategoryOrDirectProduct from '@/catalog-pages/category-or-direct-product';
import Product from '@/catalog-pages/product';
import SubcategoryThirdSegment from '@/catalog-pages/subcategory-third-segment';
import SubcategoryFourthSegment from '@/catalog-pages/subcategory-fourth-segment';
import LidarRadarSelection from '@/catalog-pages/lidar-radar-selection';
import LidarOrderPage from '@/catalog-pages/lidar-order';
import PerceptionKits from '@/catalog-pages/perception-kits';
import PrivacyPolicy from '@/catalog-pages/privacy-policy';
import ShippingPolicy from '@/catalog-pages/shipping-policy';
import ReturnWarrantyPolicy from '@/catalog-pages/return-warranty-policy';
import NotFound from '@/catalog-pages/not-found';

/**
 * Client-side dispatcher mirroring CoreBolt's wouter Switch for catalogue URLs
 * under `/[locale]/...` (e.g. /en/edge-computers/subcategories).
 */
export default function CatalogRouter({ segments }: { segments: string[] }) {
  const path = '/' + segments.join('/');

  const view = useMemo(() => resolveCatalogView(path, segments), [path, segments]);

  if (view.kind === 'redirect') {
    return <Redirect to={view.to} />;
  }

  return (
    <CatalogParamsProvider params={view.params}>
      {view.node}
    </CatalogParamsProvider>
  );
}

type CatalogView =
  | { kind: 'redirect'; to: string }
  | { kind: 'page'; params: Record<string, string | undefined>; node: ReactNode };

function categoryIdFromOldRoute(oldRoute: string): string | undefined {
  return oldRoute.replace(/^\//, '').split('/')[0];
}

function subcategoryIdFromOldRoute(oldRoute: string): string | undefined {
  return oldRoute.replace(/^\//, '').split('/')[1];
}

function resolveCatalogView(path: string, segments: string[]): CatalogView {
  if (path === '/shipping-policy') {
    return { kind: 'page', params: {}, node: <ShippingPolicy /> };
  }
  if (path === '/privacy-policy') {
    return { kind: 'page', params: {}, node: <PrivacyPolicy /> };
  }
  if (path === '/return-warranty-policy') {
    return { kind: 'page', params: {}, node: <ReturnWarrantyPolicy /> };
  }
  if (path === '/perception-kits') {
    return { kind: 'page', params: {}, node: <PerceptionKits /> };
  }
  if (path === '/3d-lidar-radar-sensors') {
    return { kind: 'page', params: {}, node: <LidarRadarSelection /> };
  }
  if (path === '/order-3d-lidar' || path === '/order-edge-computers') {
    const orderKey = path === '/order-edge-computers' ? 'edge-computers' : 'lidar';
    return { kind: 'page', params: { orderKey }, node: <LidarOrderPage /> };
  }
  if (
    (segments[0] === 'order-3d-lidar' || segments[0] === 'order-edge-computers') &&
    segments.length === 2 &&
    segments[1]
  ) {
    const orderKey = segments[0] === 'order-edge-computers' ? 'edge-computers' : 'lidar';
    return {
      kind: 'page',
      params: { orderKey, manufacturerId: segments[1] },
      node: <LidarOrderPage />,
    };
  }

  const seoSelection = routeMappings.find(
    (m) => m.type === 'subcategory-selection' && m.newRoute === path,
  );
  if (seoSelection) {
    return {
      kind: 'page',
      params: { categoryId: categoryIdFromOldRoute(seoSelection.oldRoute) },
      node: <SubcategorySelection />,
    };
  }

  const seoSub = routeMappings.find((m) => m.type === 'subcategory' && m.newRoute === path);
  if (seoSub) {
    return {
      kind: 'page',
      params: {
        categoryId: categoryIdFromOldRoute(seoSub.oldRoute),
        subcategoryId: subcategoryIdFromOldRoute(seoSub.oldRoute),
      },
      node: <Category />,
    };
  }

  const mapped = getCategoryInfoFromNewRoute(path);
  if (mapped?.categoryId && mapped.subcategoryId) {
    return {
      kind: 'page',
      params: {
        categoryId: mapped.categoryId,
        subcategoryId: mapped.subcategoryId,
      },
      node: <Category />,
    };
  }
  if (mapped?.categoryId && !mapped.subcategoryId) {
    return {
      kind: 'page',
      params: { categoryId: mapped.categoryId },
      node: <SubcategorySelection />,
    };
  }

  // Old mapped routes → redirect to SEO vanity URL
  const newRoute = getNewRoute(path);
  if (newRoute && newRoute !== path) {
    return { kind: 'redirect', to: newRoute };
  }

  const [a, b, c, d, e] = segments;

  if (segments.length === 5 && a && b && c && d && e) {
    return {
      kind: 'page',
      params: {
        categoryId: a,
        subcategoryId: b,
        groupId: c,
        nestedGroupId: d,
        productId: e,
      },
      node: <Product />,
    };
  }

  if (segments.length === 4 && a && b && c && d) {
    return {
      kind: 'page',
      params: { categoryId: a, subcategoryId: b, a: c, b: d },
      node: <SubcategoryFourthSegment />,
    };
  }

  if (segments.length === 3 && a && b && c) {
    return {
      kind: 'page',
      params: { categoryId: a, subcategoryId: b, slug: c },
      node: <SubcategoryThirdSegment />,
    };
  }

  if (segments.length === 2 && b === 'subcategories' && a) {
    return {
      kind: 'page',
      params: { categoryId: a },
      node: <SubcategorySelection />,
    };
  }

  if (segments.length === 2 && a && b) {
    return {
      kind: 'page',
      params: { categoryId: a, subcategoryId: b },
      node: <CategoryOrDirectProduct />,
    };
  }

  if (segments.length === 1 && a) {
    return {
      kind: 'page',
      params: { categoryId: a },
      node: <Category />,
    };
  }

  return { kind: 'page', params: {}, node: <NotFound /> };
}
