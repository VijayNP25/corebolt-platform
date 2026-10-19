'use client';

/**
 * Client-side SEO helper kept for copied replica pages.
 * Prefer Next.js `generateMetadata` + `JsonLd` on App Router pages.
 */
import { useEffect } from 'react';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  preloadImage?: string;
  preloadImageMedia?: string;
}

function setMetaTag(attr: 'name' | 'property', key: string, content?: string) {
  if (!content || typeof document === 'undefined') return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function applySeoToDocument(data: SeoData) {
  if (typeof document === 'undefined') return;
  if (data.title) document.title = data.title;
  setMetaTag('name', 'description', data.description);
  if (data.keywords) setMetaTag('name', 'keywords', data.keywords);
  setMetaTag('property', 'og:title', data.ogTitle ?? data.title);
  setMetaTag('property', 'og:description', data.ogDescription ?? data.description);
  setMetaTag('property', 'og:type', data.ogType ?? 'website');
  if (data.ogImage) setMetaTag('property', 'og:image', data.ogImage);
  if (data.canonical) setMetaTag('property', 'og:url', data.canonical);

  if (data.canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', data.canonical);
  }

  document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
  if (data.jsonLd) {
    const entries = Array.isArray(data.jsonLd) ? data.jsonLd : [data.jsonLd];
    entries.forEach((entry) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '1');
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }
}

/** Applies title/meta/JSON-LD on the client during SPA navigations. */
export function useSeo(data: SeoData | null | undefined) {
  const serialized = data ? JSON.stringify(data) : '';
  useEffect(() => {
    if (data) applySeoToDocument(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized]);
}

export function SeoProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
