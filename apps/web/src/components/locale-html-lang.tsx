'use client';

import { useEffect } from 'react';

/** Keeps <html lang> in sync with the active next-intl locale. */
export default function LocaleHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
