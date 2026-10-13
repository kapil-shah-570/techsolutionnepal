import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getArticleBySlug, getServices, getArticles } from '@/lib/db/store';
import { ResilientImage } from '@/components/ui/ResilientImage';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Article Not Found | Tech Solution Nepal' };
  }
  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription,
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      type: 'article',
    },
  };
}

export default async function BlogArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const relatedServices = getServices().filter((s) =>
    article.relatedServiceSlugs.includes(s.slug)
  );
  const otherArticles = getArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tech Solution Nepal',
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">
              Insights
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{article.category}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums text-blue-400">
              <span>{article.category.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>PUBLISHED {article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTimeMinutes} MIN READ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {article.subtitle}
            </p>

            <div className="pt-3 flex items-center gap-3 text-xs text-slate-300">
              <span>By</span>
              <Link
                href={`/team/${article.authorSlug}`}
                className="font-bold text-white hover:text-blue-400 underline"
              >
                {article.authorName}
              </Link>
              <span>·</span>
              <span className="text-slate-400">{article.authorRole}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 space-y-10">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
              <ResilientImage
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  {sec.heading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base text-slate-700 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
                {sec.codeSnippet && (
                  <div className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">
                        {sec.codeSnippet.caption}
                      </span>
                      <span className="text-blue-400">
                        {sec.codeSnippet.language}
                      </span>
                    </div>
                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
              <strong className="text-slate-900">Indexed Topics: </strong>
              {article.tags.join(' · ')}
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                ABOUT THE AUTHOR
              </p>
              <h3 className="text-base font-bold text-slate-950">
                {article.authorName}
              </h3>
              <p className="text-xs text-slate-600">{article.authorRole}</p>
              <Link
                href={`/team/${article.authorSlug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 pt-1"
              >
                <span>View Architect Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {relatedServices.length > 0 && (
              <div className="p-6 border border-slate-200 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-slate-950">
                  Related Engineering Services
                </h3>
                <div className="space-y-2.5">
                  {relatedServices.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.categorySlug}/${srv.slug}`}
                      className="block p-3.5 rounded-lg bg-slate-50 hover:bg-slate-100 space-y-1"
                    >
                      <p className="text-xs font-bold text-slate-950">
                        {srv.name}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {srv.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {otherArticles.length > 0 && (
              <div className="p-6 border border-slate-200 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-slate-950">
                  Further Reading
                </h3>
                <div className="space-y-3">
                  {otherArticles.map((oa) => (
                    <Link
                      key={oa.id}
                      href={`/blog/${oa.slug}`}
                      className="block text-xs font-semibold text-slate-800 hover:text-blue-700"
                    >
                      {oa.title} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
