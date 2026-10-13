'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '@/lib/types';

interface ServicesDirectoryClientProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
}

export function ServicesDirectoryClient({
  categories,
  services,
}: ServicesDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const filteredServices = services.filter((srv) => {
    const matchesCat =
      selectedCategory === 'all' || srv.categorySlug === selectedCategory;
    if (!matchesCat) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      srv.name.toLowerCase().includes(q) ||
      srv.shortDescription.toLowerCase().includes(q) ||
      srv.categoryName.toLowerCase().includes(q) ||
      srv.technologies.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-10">
      {/* Filter & Search Toolbar */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter services by name, technology (e.g., Next.js, RAG, Kubernetes)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <p className="text-xs font-mono tabular-nums text-slate-500">
            Showing {filteredServices.length} of {services.length} published services
          </p>
        </div>

        {/* Interactive Segmented Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            All 12 Practice Areas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.number}. {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center border border-slate-200 rounded-xl bg-white space-y-3">
          <p className="text-base font-semibold text-slate-900">
            No published services matched “{query}”.
          </p>
          <p className="text-xs text-slate-500">
            Reset the filter or request a custom engineering scope tailored to your stack.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Link
                    href={`/services/${srv.categorySlug}`}
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    {srv.categoryName}
                  </Link>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {srv.estimatedDelivery}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-slate-950">
                  <Link
                    href={`/services/${srv.categorySlug}/${srv.slug}`}
                    className="hover:text-blue-700 transition-colors"
                  >
                    {srv.name}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {srv.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <p className="text-xs text-slate-500 truncate">
                  {srv.technologies.join(' · ')}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/services/${srv.categorySlug}/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>Explore Service Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/quote?service=${srv.slug}`}
                    className="text-xs font-medium text-slate-600 hover:text-slate-950"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
