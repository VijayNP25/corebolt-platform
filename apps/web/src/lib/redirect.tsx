import { createContext, useContext, type ReactNode } from "react";

interface RedirectContextValue {
  report: (to: string) => void;
}

const RedirectContext = createContext<RedirectContextValue | null>(null);

export function RedirectProvider({
  children,
  onRedirect,
}: {
  children: ReactNode;
  onRedirect?: (to: string) => void;
}) {
  const value: RedirectContextValue = {
    report: (to: string) => onRedirect?.(to),
  };
  return (
    <RedirectContext.Provider value={value}>
      {children}
    </RedirectContext.Provider>
  );
}

/**
 * Call alongside `<Redirect to={to} />` wherever a component redirects.
 * wouter's own `<Redirect>` only navigates via an effect (never runs during
 * `renderToString`), so without this a server-rendered redirect page would
 * come back as an empty 200 instead of a real 301/302.
 */
export function useServerRedirect(to: string | null | undefined) {
  const ctx = useContext(RedirectContext);
  if (to && ctx) {
    ctx.report(to);
  }
}

interface NotFoundContextValue {
  report: () => void;
}

const NotFoundContext = createContext<NotFoundContextValue | null>(null);

export function NotFoundProvider({
  children,
  onNotFound,
}: {
  children: ReactNode;
  onNotFound?: () => void;
}) {
  const value: NotFoundContextValue = {
    report: () => onNotFound?.(),
  };
  return (
    <NotFoundContext.Provider value={value}>
      {children}
    </NotFoundContext.Provider>
  );
}

/** Call unconditionally; reports 404 when `active` is true so the server can respond with a real 404 status. */
export function useServerNotFound(active: boolean = true) {
  const ctx = useContext(NotFoundContext);
  if (active) {
    ctx?.report();
  }
}
