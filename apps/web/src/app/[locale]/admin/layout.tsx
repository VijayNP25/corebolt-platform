import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/** Admin is auth-gated and should never be statically prerendered. */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin | CORE BOLT',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
