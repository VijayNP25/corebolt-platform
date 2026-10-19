import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Blog | CORE BOLT' };
  return {
    title: post.metaTitle ?? `${post.title} | CORE BOLT`,
    description: post.metaDescription ?? post.description,
    keywords: post.metaKeywords,
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.description,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <ReplicaSiteLayout lightNav>
      <article className="cb-shell prose prose-neutral max-w-3xl">
        <h1>{post.title}</h1>
        {post.date && <p className="lead text-sm !mb-8">{post.date}</p>}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </ReplicaSiteLayout>
  );
}
