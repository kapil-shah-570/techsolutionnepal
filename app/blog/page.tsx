import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/db/store';
import { ResilientImage } from '@/components/ui/ResilientImage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Engineering Blog & Architectural Monographs | Tech Solution Nepal',
  description:
    'Deep-dive technical articles on verifiable RAG pipelines, zero-downtime ERP migrations, sub-50ms Next.js rendering, and ClickHouse/Snowflake telemetry.',
};

export default function BlogListingPage() {
  const articles = getArticles();

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Engineering Blog &amp; Insights</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              ARCHITECTURAL RESEARCH &amp; MONOGRAPHS
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Production patterns from our Principal Architects.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Practical lessons learned building high-throughput financial clearing cores, HIPAA RAG pipelines, and multi-region Kubernetes platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-200">
                  <ResilientImage
                    src={art.heroImage}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">
                      {art.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {art.publishedAt}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                    <Link
                      href={`/blog/${art.slug}`}
                      className="hover:text-blue-700 transition-colors"
                    >
                      {art.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {art.excerpt}
                  </p>

                  <p className="text-xs text-slate-500 pt-1">
                    Topics: {art.tags.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/team/${art.authorSlug}`}
                    className="font-semibold text-slate-900 hover:text-blue-700"
                  >
                    {art.authorName}
                  </Link>
                  <span className="text-slate-500 ml-1.5">
                    · {art.authorRole}
                  </span>
                </div>

                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
                >
                  <span>Read Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
