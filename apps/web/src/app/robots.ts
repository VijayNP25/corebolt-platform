import type { MetadataRoute } from 'next';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://www.core-bolt.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/admin',
          '/*/admin/',
          '/*/account',
          '/*/login',
          '/*/register',
          '/*/cart',
          '/*/checkout',
          '/admin',
          '/account',
          '/login',
          '/register',
          '/cart',
          '/checkout',
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
