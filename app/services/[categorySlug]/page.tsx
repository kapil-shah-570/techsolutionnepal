import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import {
  getCategoryBySlug,
  getServices,
  getProjects,
  getPublishedCategories,
} from '@/lib/db/store';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return { title: 'Category Not Found | Tech Solution Nepal' };
  }
  return {
    title: category.seo.metaTitle,
    description: category.seo.metaDescription,
    openGraph: {
      title: category.seo.metaTitle,
      description: category.seo.metaDescription,
      type: 'website',
    },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const subservices = getServices({ categorySlug: category.slug });
  const relatedProjects = getProjects({ categorySlug: category.slug });
  const allCategories = getPublishedCategories();

  return (
    <div className="bg-white">
      {/* Category Hero */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
                PRACTICE AREA {category.number} · {subservices.length} SPECIALIZED SERVICES
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
                {category.number}. {category.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {category.tagline}
              </p>
            </div>

            <div className="lg:col-span-4 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="text-xs font-mono tabular-nums text-blue-400">
                VERIFIED PRACTICE BENCHMARK
              </p>
              <p className="text-lg font-bold text-white">
                {category.heroMetric}
              </p>
              <Link
                href="#category-quote"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white pt-1"
              >
                <span>Request Practice Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Overview & Problems Solved */}
      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              01 · PRACTICE OVERVIEW
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Engineering philosophy &amp; architectural standards
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {category.overview}
            </p>

            <div className="pt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-900">
                Core Technologies &amp; Frameworks:
              </p>
              <p className="text-xs sm:text-sm text-slate-600">
                {category.coreTechnologies.join(' · ')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-950">
              Key Business &amp; Technical Challenges Solved
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              {category.keyProblemsSolved.map((prob, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono tabular-nums font-semibold text-blue-700">
                    0{i + 1}.
                  </span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Primary Industries: </span>
              {category.targetIndustries.join(' · ')}
            </div>
          </div>
        </div>
      </section>

      {/* Nested Individual Services in this Category */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              02 · SPECIALIZED SERVICES IN {category.name.toUpperCase()}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Select a specialized capability for full architecture, pricing, and delivery specs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subservices.map((srv, idx) => (
              <div
                key={srv.id}
                className="p-7 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums font-semibold text-blue-700">
                      {category.number}.{idx + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Estimated Delivery: {srv.estimatedDelivery}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-slate-950">
                    <Link
                      href={`/services/${category.slug}/${srv.slug}`}
                      className="hover:text-blue-700 transition-colors"
                    >
                      {srv.name}
                    </Link>
                  </h3>

                  <p className="text-sm font-medium text-slate-800">
                    {srv.valueProposition}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.overview}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    {srv.technologies.slice(0, 5).join(' · ')}
                  </span>

                  <Link
                    href={`/services/${category.slug}/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                03 · VERIFIED CASE STUDIES
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                Production deployments in {category.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 border border-slate-200 rounded-xl bg-white space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-900">
                        {proj.clientName}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span>{proj.industry}</span>
                    </div>
                    <p className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                      {proj.headlineMetric}
                    </p>
                    <h3 className="text-lg font-bold text-slate-950">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="hover:text-blue-700"
                      >
                        {proj.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Practice Areas Switcher */}
      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-4">
          <p className="text-xs font-semibold text-slate-500">
            Explore Other Practice Areas:
          </p>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <Link
                key={c.id}
                href={`/services/${c.slug}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  c.slug === category.slug
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.number}. {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation & Quote Form */}
      <section id="category-quote" className="py-16 lg:py-20 bg-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              REQUEST A PRACTICE PROPOSAL
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Discuss your {category.name} roadmap with a Principal Architect.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Receive a tailored C4 architectural blueprint, team pod recommendation, and milestone cost estimate within one business day.
            </p>
          </div>

          <div className="lg:col-span-7">
            <QuoteRequestForm
              defaultCategorySlug={category.slug}
              defaultServiceName={category.name}
              serviceOptions={subservices.map((s) => ({
                slug: s.slug,
                name: s.name,
                categoryName: s.categoryName,
              }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
