'use client';

import { useEffect } from 'react';

const GA_ID = 'G-FDLYRTZJXP';
const GTM_ID = 'GTM-KCR255ZZ';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Same deferred GA4 + Tag Manager tags as www.core-bolt.com. */
export default function SiteAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);

    // Skip headless prerender so the tags are not baked into static HTML.
    if (navigator.webdriver) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const add = (src: string) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        document.head.appendChild(script);
      };
      add(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
      window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      add(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
    };

    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'mousemove'] as const;
    for (const event of events) {
      window.addEventListener(event, load, { once: true, passive: true });
    }
    const onLoad = () => window.setTimeout(load, 3500);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });

    return () => {
      for (const event of events) window.removeEventListener(event, load);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return null;
}
