'use client';

/**
 * Drop-in shim for former `wouter` imports so copied CoreBolt components
 * keep working under Next.js App Router + next-intl locale prefixes.
 */
import {
  Link as IntlLink,
  usePathname as useIntlPathname,
  useRouter as useIntlRouter,
} from '@/i18n/routing';
import {
  createContext,
  useContext,
  useEffect,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from 'react';

type IntlLinkProps = ComponentProps<typeof IntlLink>;

export type LinkProps = Omit<IntlLinkProps, 'href'> & {
  href: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/** Locale-aware Link with wouter-compatible `href` + `onClick` surface. */
export function Link({ href, children, onClick, ...rest }: LinkProps) {
  const normalized = href.replace(/^\/(en|hi)(?=\/|$)/, '') || '/';
  return (
    <IntlLink href={normalized as IntlLinkProps['href']} onClick={onClick} {...rest}>
      {children}
    </IntlLink>
  );
}

/** wouter `useLocation()` → `[pathname, navigate]`. */
export function useLocation(): [string, (to: string) => void] {
  const pathname = useIntlPathname();
  const router = useIntlRouter();
  return [
    pathname,
    (to: string) => {
      const normalized = to.replace(/^\/(en|hi)(?=\/|$)/, '') || '/';
      router.push(normalized);
    },
  ];
}

type Params = Record<string, string | undefined>;

const ParamsContext = createContext<Params>({});

export function CatalogParamsProvider({
  params,
  children,
}: {
  params: Params;
  children: ReactNode;
}) {
  return <ParamsContext.Provider value={params}>{children}</ParamsContext.Provider>;
}

/** wouter `useParams()` — supplied by CatalogParamsProvider on catalogue routes. */
export function useParams<T extends Params = Params>(): T {
  return useContext(ParamsContext) as T;
}

/** wouter `<Redirect to="..." />`. */
export function Redirect({ to }: { to: string }) {
  const router = useIntlRouter();
  useEffect(() => {
    const normalized = to.replace(/^\/(en|hi)(?=\/|$)/, '') || '/';
    router.replace(normalized);
  }, [to, router]);
  return null;
}

export { useIntlPathname as usePathname, useIntlRouter as useRouter };
