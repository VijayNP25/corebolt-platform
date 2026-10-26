'use client';

import type { ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/routing';

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/enquiries', label: 'Enquiries' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/customers', label: 'Customers' },
  { href: '/admin/reviews', label: 'Reviews' },
  { href: '/admin/currency', label: 'Currency' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/audit', label: 'Audit log' },
] as const;

export default function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="replica-page replica-site replica-site--light-top min-h-screen bg-[#f7f7f7]">
      <header className="border-b border-[rgba(0,0,0,0.09)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">
            CORE BOLT <span className="text-[var(--ink3)] font-normal">Admin</span>
          </Link>
          <Link href="/account" className="text-sm text-[var(--ink3)]">
            Account
          </Link>
        </div>
      </header>
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <nav className="cb-admin-nav" aria-label="Admin">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <h1 className="text-2xl font-semibold text-[var(--ink)] mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}
