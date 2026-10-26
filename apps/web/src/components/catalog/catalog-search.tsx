'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useLocation } from '@/lib/wouter-compat';
import type { CatalogSearchHit } from '@/lib/catalog-search';

export default function CatalogSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CatalogSearchHit[]>([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState('');
  const [, navigate] = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const needle = query.trim();
    if (needle.length < 2) {
      setResults([]);
      setTotal(0);
      setSearched('');
      return;
    }
    import('@/lib/catalog-search')
      .then((mod) => {
        if (cancelled) return;
        const found = mod.searchCatalog(needle, 8);
        setResults(found.hits);
        setTotal(found.total);
        setSearched(needle);
      })
      .catch(() => {
        if (cancelled) return;
        setResults([]);
        setTotal(0);
        setSearched(needle);
      });
    return () => {
      cancelled = true;
    };
  }, [open, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setTotal(0);
    setSearched('');
  };

  const resultsHref = `/products?q=${encodeURIComponent(query.trim())}`;

  const openResults = () => {
    const needle = query.trim();
    if (needle.length < 2) return;
    navigate(resultsHref);
    close();
  };

  return (
    <div className="nav-search" ref={rootRef}>
      <button
        type="button"
        className="nav-icon-btn"
        aria-label="Search"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <Search size={18} strokeWidth={1.75} aria-hidden />
        <span className="nav-icon-btn__label">Search</span>
      </button>
      {open ? (
        <div className="nav-search-panel">
          <input
            ref={inputRef}
            className="nav-search-input"
            type="search"
            value={query}
            placeholder="Search products"
            aria-label="Search products"
            aria-controls={listId}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                openResults();
              }
            }}
          />
          <div id={listId} className="nav-search-results">
            {query.trim().length < 2 ? (
              <p className="nav-search-empty">Type a product, category, or SKU</p>
            ) : searched !== query.trim() ? (
              <p className="nav-search-empty">Searching…</p>
            ) : results.length === 0 ? (
              <p className="nav-search-empty">No products found</p>
            ) : (
              <ul>
                {results.map((hit) => (
                  <li key={hit.product.id}>
                    <Link href={hit.href} className="nav-search-result" onClick={close}>
                      <span className="nav-search-name">{hit.product.name.trim()}</span>
                      {hit.group ? <span className="nav-search-group">{hit.group}</span> : null}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={resultsHref} className="nav-search-result" onClick={close}>
                    <span className="nav-search-name">
                      See all {total} result{total === 1 ? '' : 's'}
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
