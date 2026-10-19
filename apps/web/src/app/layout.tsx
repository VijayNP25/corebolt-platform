import type { ReactNode } from 'react';
import './globals.css';

/**
 * Next.js 15 requires <html> and <body> in the root layout.
 * Locale-specific `lang` is set on <html> from the [locale] layout via a
 * small client helper (see LocaleHtmlLang).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
