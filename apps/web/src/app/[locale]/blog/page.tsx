import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | CORE BOLT',
  description:
    'Insights on edge AI computing, LiDAR, machine vision, and robotics perception from CORE BOLT.',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getBlogPosts();

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>Blog</h1>
        <p className="lead">
          Technical notes on perception systems, edge compute, and industrial AI.
        </p>
        <div className="grid gap-4">
          {posts.map((post) => (
            <article key={post.slug} className="cb-shell-card">
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.description && <p>{post.description}</p>}
              {post.date && (
                <p className="text-sm text-muted-foreground mt-2">{post.date}</p>
              )}
            </article>
          ))}
          {posts.length === 0 && (
            <p className="lead">Posts will appear here once content is indexed.</p>
          )}
        </div>
      </main>
    </ReplicaSiteLayout>
  );
}
