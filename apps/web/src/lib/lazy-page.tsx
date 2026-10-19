import { useEffect, useReducer, type ComponentType } from "react";

/**
 * Route-level code splitting that stays hydration-safe with our prerender.
 *
 * Why not React.lazy + <Suspense>?
 *  - The prerendered HTML is a DOM snapshot taken by Playwright (a client
 *    render), so it has no <!--$--> Suspense markers. Hydrating a <Suspense>
 *    boundary against that markup is a mismatch (#418/#423).
 *  - renderToString (server/vite.ts) doesn't wait for lazy() chunks.
 *
 * How this works instead:
 *  - Each page is a plain component that renders the real page once its chunk
 *    is loaded, and renders nothing (null) while it loads.
 *  - Every page that rendered records its name in <html data-pages="...">.
 *    The prerender snapshot keeps that attribute, so on a real visit main.tsx
 *    loads exactly those chunks *before* hydrateRoot(): the first client render
 *    then matches the static HTML.
 *  - <html data-prerender-ready> is set only once no page chunk is pending,
 *    so scripts/prerender.mjs never snapshots an empty page.
 *  - The server (renderToString) calls preloadAllPages() before rendering.
 */

type PageModule = { default: ComponentType<any> };

interface PageEntry {
  comp: ComponentType<any> | null;
  load: () => Promise<void>;
}

const registry = new Map<string, PageEntry>();
let pending = 0;

/** Names of pages rendered during the current server render (renderToString). */
const ssrRendered = new Set<string>();

const isBrowser = typeof window !== "undefined";

function recordRendered(name: string) {
  const html = document.documentElement;
  const names = new Set(
    (html.getAttribute("data-pages") || "").split(" ").filter(Boolean)
  );
  names.add(name);
  html.setAttribute("data-pages", Array.from(names).join(" "));
}

/** Sets <html data-prerender-ready="1"> once no page chunk is still loading. */
export function markPrerenderReadyIfSettled() {
  if (!isBrowser || pending > 0) return;
  document.documentElement.setAttribute("data-prerender-ready", "1");
}

/**
 * A chunk can fail to load when a new deploy replaced the hashed files while
 * this tab still runs the old build. Reload once to pick up the new build.
 */
function handleChunkError(error: unknown) {
  console.error(error);
  if (!isBrowser) return;
  try {
    const key = "cb-chunk-reload";
    const last = Number(sessionStorage.getItem(key) || 0);
    if (Date.now() - last > 60_000) {
      sessionStorage.setItem(key, String(Date.now()));
      window.location.reload();
    }
  } catch {
    // sessionStorage unavailable: don't risk a reload loop.
  }
}

export function lazyPage(name: string, loader: () => Promise<PageModule>) {
  let promise: Promise<void> | null = null;
  const entry: PageEntry = {
    comp: null,
    load: () => {
      if (!promise) {
        pending += 1;
        promise = loader()
          .then((m) => {
            entry.comp = m.default;
          })
          .catch((error) => {
            promise = null; // allow a retry
            throw error;
          })
          .finally(() => {
            pending -= 1;
            // If a page already rendered while this chunk was still loading
            // (e.g. a chunk started for a component that then unmounted),
            // nobody else would mark the prerender ready: check once more.
            if (pending === 0 && isBrowser) {
              window.setTimeout(() => {
                if (document.documentElement.hasAttribute("data-pages")) {
                  markPrerenderReadyIfSettled();
                }
              }, 0);
            }
          });
      }
      return promise;
    },
  };
  registry.set(name, entry);

  function LazyPage(props: any) {
    const [, rerender] = useReducer((n: number) => n + 1, 0);
    const Comp = entry.comp;

    // Start fetching during render (not in an effect) so the request goes
    // out as early as possible on client-side navigation.
    if (!Comp && isBrowser) entry.load().catch(() => {});
    if (Comp && !isBrowser) ssrRendered.add(name);

    useEffect(() => {
      if (Comp) {
        recordRendered(name);
        markPrerenderReadyIfSettled();
        return;
      }
      let alive = true;
      entry.load().then(
        () => {
          if (alive) rerender();
        },
        handleChunkError
      );
      return () => {
        alive = false;
      };
    }, [Comp]);

    return Comp ? <Comp {...props} /> : null;
  }
  LazyPage.displayName = `LazyPage(${name})`;
  return LazyPage;
}

/** Loads the given page chunks (unknown names are ignored). */
export function preloadPages(names: string[]): Promise<unknown> {
  return Promise.all(
    names.map((n) => registry.get(n)?.load().catch(() => {}))
  );
}

/** Loads every page chunk (server render, before renderToString). */
export function preloadAllPages(): Promise<unknown> {
  return preloadPages(Array.from(registry.keys()));
}

/** Server only: returns and clears the pages rendered by the last renderToString. */
export function takeSsrRenderedPages(): string[] {
  const names = Array.from(ssrRendered);
  ssrRendered.clear();
  return names;
}