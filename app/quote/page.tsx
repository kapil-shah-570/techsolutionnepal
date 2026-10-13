import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getServiceBySlug } from '@/lib/db/store';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Request an Architecture & Engineering Quote | Tech Solution Nepal',
  description:
    'Configure your project scope, target delivery timeline, and compliance requirements to receive a written technical proposal and milestone estimate.',
};

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; category?: string }>;
}) {
  const { service: serviceParam, category: categoryParam } = await searchParams;
  const services = getServices();
  const matchedService = serviceParam
    ? getServiceBySlug(serviceParam)
    : undefined;

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-14 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Request a Quote</span>
          </nav>

          <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
            ARCHITECTURAL SCOPING &amp; FIXED-MILESTONE ESTIMATION
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
            Request a technical proposal and delivery estimate.
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Complete the project scoping specification below. Your submission is encrypted, checked for duplicate triage, and assigned directly to a Principal Architect.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <QuoteRequestForm
              defaultType="quote"
              defaultCategorySlug={
                matchedService?.categorySlug || categoryParam || ''
              }
              defaultServiceSlug={matchedService?.slug || ''}
              defaultServiceName={matchedService?.name || ''}
              customFields={matchedService?.customFormFields || []}
              serviceOptions={services.map((s) => ({
                slug: s.slug,
                name: s.name,
                categoryName: s.categoryName,
              }))}
            />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 text-xs">
              <h2 className="text-sm font-bold text-slate-950">
                Typical Investment Benchmarks
              </h2>
              <div className="space-y-3 divide-y divide-slate-100">
                <div className="pt-2">
                  <p className="font-bold text-slate-900">
                    Architecture Blueprint / Security Audit
                  </p>
                  <p className="font-mono tabular-nums text-blue-700 font-semibold mt-0.5">
                    $25,000 – $55,000 · 3–6 Weeks
                  </p>
                </div>
                <div className="pt-3">
                  <p className="font-bold text-slate-900">
                    Full-Scale Production Platform
                  </p>
                  <p className="font-mono tabular-nums text-blue-700 font-semibold mt-0.5">
                    $75,000 – $180,000 · 8–16 Weeks
                  </p>
                </div>
                <div className="pt-3">
                  <p className="font-bold text-slate-900">
                    Dedicated Principal Engineering Pod
                  </p>
                  <p className="font-mono tabular-nums text-blue-700 font-semibold mt-0.5">
                    $28,000 – $48,000 / month
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-xl space-y-3 text-xs">
              <p className="font-mono tabular-nums text-blue-400 font-semibold">
                IP &amp; CONFIDENTIALITY GUARANTEE
              </p>
              <p className="text-slate-300 leading-relaxed">
                We execute Mutual Non-Disclosure Agreements (MNDA) prior to deep repository inspection. 100% of custom code and architecture artifacts belong exclusively to your organization.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
