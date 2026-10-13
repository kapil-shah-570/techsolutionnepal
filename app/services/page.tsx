import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPublishedCategories, getServices } from '@/lib/db/store';
import { ServicesDirectoryClient } from '@/components/services/ServicesDirectoryClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Enterprise IT Services & 12 Practice Areas | Tech Solution Nepal',
  description:
    'Explore all 12 enterprise practice areas and 27+ specialized technology services including web development, mobile apps, AI/ML, cloud DevOps, cybersecurity, and data engineering.',
};

export default function ServicesOverviewPage() {
  const categories = getPublishedCategories();
  const services = getServices();

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services Directory</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              12 PRACTICE AREAS · {services.length} SPECIALIZED CAPABILITIES
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Full-lifecycle software architecture, AI systems, cloud infrastructure, and digital growth.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every capability is delivered by senior principal-led engineering pods under ISO/IEC 27001 and SOC 2 Type II audited workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 12 Service Categories Grid */}
      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              01 · CORE PRACTICE AREAS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Select a practice area to view its domain blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const catServices = services.filter(
                (s) => s.categorySlug === cat.slug
              );
              return (
                <div
                  key={cat.id}
                  className="p-6 sm:p-7 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-between space-y-6 hover:bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono tabular-nums font-bold text-blue-700">
                        Practice {cat.number}
                      </span>
                      <span>{catServices.length} Subservices</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-slate-950">
                      <Link
                        href={`/services/${cat.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {cat.number}. {cat.name}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {cat.summary}
                    </p>

                    <ul className="pt-2 space-y-1.5 border-t border-slate-200/80">
                      {catServices.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={`/services/${cat.slug}/${sub.slug}`}
                            className="text-xs font-medium text-slate-700 hover:text-blue-700 flex items-center justify-between py-0.5"
                          >
                            <span>{sub.name}</span>
                            <span className="text-slate-400">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[200px]">
                      {cat.coreTechnologies.slice(0, 3).join(' · ')}
                    </span>
                    <Link
                      href={`/services/${cat.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800 shrink-0"
                    >
                      <span>Category Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Searchable Individual Services Directory */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              02 · COMPLETE SERVICE CATALOG
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Search and filter all individual capabilities
            </h2>
          </div>

          <ServicesDirectoryClient
            categories={categories}
            services={services}
          />
        </div>
      </section>
    </div>
  );
}
