'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { SearchResultItem } from '@/lib/db/store';

export default function SearchPage() {
  const [query, setQuery] = useState('RAG');
  const [typeFilter, setTypeFilter] = useState('all');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `/api/v1/search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(
            typeFilter
          )}`
        );
        const json = await res.json();
        if (json.success) {
          setResults(json.data);
        }
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query, typeFilter]);

  const filterTypes = [
    'all',
    'Service',
    'Category',
    'Case Study',
    'Article',
    'Team',
    'Career',
    'FAQ',
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-14 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Global Search</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Search services, case studies, architecture monographs, and FAQs
            </h1>

            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. Next.js, RAG, Kubernetes, SOC 2, Flutter, Settlement..."
                aria-label="Global site search"
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base text-slate-950 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>Quick queries:</span>
              {['Next.js', 'RAG', 'Kubernetes', 'SOC 2', 'Flutter', 'Temporal'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="underline hover:text-white"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {filterTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    typeFilter === t
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t === 'all' ? 'All Content Types' : t}
                </button>
              ))}
            </div>

            <p className="text-xs font-mono tabular-nums text-slate-500">
              {loading
                ? 'Searching index...'
                : `${results.length} matches for “${query}”`}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="p-12 text-center border border-slate-200 rounded-xl space-y-2">
              <p className="text-base font-semibold text-slate-900">
                No matching records found for “{query}”.
              </p>
              <p className="text-xs text-slate-500">
                Try searching for a technology (e.g., PostgreSQL, Swift, Kafka) or browse our 12 service categories.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-blue-700">
                        {item.type}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span>{item.metadata}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-950">
                      <Link href={item.url} className="hover:text-blue-700">
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link
                    href={item.url}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
                  >
                    <span>Open Resource</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
