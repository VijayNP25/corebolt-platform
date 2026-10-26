import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import LocaleHtmlLang from '@/components/locale-html-lang';
import CatalogProvider from '@/components/catalog-provider';
import Providers from '@/components/providers';
import { routing, type AppLocale } from '@/i18n/routing';
import { loadPublishedCatalog } from '@/lib/published-catalog';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo-jsonld';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const catalog = await loadPublishedCatalog();

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <CatalogProvider categories={catalog}>{children}</CatalogProvider>
        </Providers>
      </NextIntlClientProvider>
    </>
  );
}
