'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '@/lib/types';

interface InteractiveServiceExplorerProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
}

export function InteractiveServiceExplorer({
  categories,
  services,
}: InteractiveServiceExplorerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    categories[0]?.slug || 'web-development'
  );

  const activeCategory =
    categories.find((c) => c.slug === selectedSlug) || categories[0];

  const matchingServices = services.filter(
    (s) => s.categorySlug === activeCategory?.slug
  );

  if (!activeCategory) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: 12 Service Categories Selector */}
      <div className="lg:col-span-5 border border-slate-200 rounded-xl bg-white divide-y divide-slate-200 overflow-hidden">
        {categories.map((cat) => {
          const isActive = cat.slug === activeCategory.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedSlug(cat.slug)}
              className={`w-full text-left px-5 py-3.5 transition-colors flex items-center justify-between gap-4 ${
                isActive
                  ? 'bg-slate-950 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap truncate">
                <span
                  className={`font-mono tabular-nums mr-2.5 ${
                    isActive ? 'text-blue-400' : 'text-slate-400'
                  }`}
                >
                  {cat.number}.
                </span>
                {cat.name}
              </span>
              <ArrowRight
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-blue-400 translate-x-0.5' : 'text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Right Column: Active Category Deep-Dive & Subservices */}
      <div className="lg:col-span-7 border border-slate-200 rounded-xl bg-slate-50/70 p-6 sm:p-8 lg:p-10 space-y-8">
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-mono tabular-nums font-semibold text-blue-700">
              Practice Area {activeCategory.number}
            </span>
            <span aria-hidden="true">·</span>
            <span>{matchingServices.length} Specialized Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>{activeCategory.heroMetric}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            {activeCategory.name}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {activeCategory.overview}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/services/${activeCategory.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Explore {activeCategory.name} Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/quote?category=${activeCategory.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              <span>Request a Category Scope Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Subservices List */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-slate-500">
            Published Services in {activeCategory.name}
          </h4>

          <div className="grid grid-cols-1 gap-4">
            {matchingServices.map((srv, idx) => (
              <div
                key={srv.id}
                className="p-5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums text-slate-400">
                      {activeCategory.number}.{idx + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Delivery: {srv.estimatedDelivery}</span>
                    <span aria-hidden="true">·</span>
                    <span>{srv.technologies.slice(0, 4).join(' / ')}</span>
                  </div>
                  <Link
                    href={`/services/${srv.categorySlug}/${srv.slug}`}
                    className="text-base font-bold text-slate-950 hover:text-blue-700 transition-colors block"
                  >
                    {srv.name}
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>

                <Link
                  href={`/services/${srv.categorySlug}/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
                >
                  <span>Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Core Technologies Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold text-slate-800">Core Stack:</span>
          {activeCategory.coreTechnologies.map((tech, idx) => (
            <React.Fragment key={tech}>
              <span>{tech}</span>
              {idx < activeCategory.coreTechnologies.length - 1 && (
                <span aria-hidden="true">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
