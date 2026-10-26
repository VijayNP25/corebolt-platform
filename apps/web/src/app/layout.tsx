import type { ReactNode } from 'react';
import SiteAnalytics from '@/components/site-analytics';
import './globals.css';

/**
 * Next.js 15 requires <html> and <body> in the root layout.
 * Locale-specific `lang` is set on <html> from the [locale] layout via a
 * small client helper (see LocaleHtmlLang).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KCR255ZZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <SiteAnalytics />
        {children}
      </body>
    </html>
  );
}
