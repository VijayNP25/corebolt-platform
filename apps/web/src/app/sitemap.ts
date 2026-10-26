import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { loadPublishedCatalog } from '@/lib/published-catalog';
import { getAllProductsFlat, slugify } from '@/lib/subcategory-products';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://www.core-bolt.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await loadPublishedCatalog();
  const staticPaths = [
    '',
    '/about',
    '/about-us',
    '/contact',
    '/contact-us',
    '/blog',
    '/products',
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE}/en${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  for (const post of getAllBlogPosts()) {
    entries.push({
      url: `${SITE}/en/blog/${post.slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  for (const product of getAllProductsFlat().slice(0, 500)) {
    entries.push({
      url: `${SITE}/en/products/${slugify(product.id)}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  return entries;
}
