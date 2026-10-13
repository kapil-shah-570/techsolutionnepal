import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTestimonials } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Verified Client Testimonials & Executive Outcomes | Tech Solution Nepal',
  description:
    'Read attributable client testimonials with verified before-and-after operational outcomes from CTOs, COOs, and VP of Engineering leaders.',
};

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Client Testimonials</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              ATTRIBUTABLE EXECUTIVE REFERENCES · 94% MULTI-YEAR RETENTION
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Verified client testimonials and before-and-after outcomes.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We never publish anonymous quotes or fabricated star ratings. Every testimonial below is tied to a documented production system and verified executive stakeholder.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 border border-slate-200 rounded-xl bg-white flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">
                    {t.industry}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{t.companyName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    Verified {t.verifiedDate}
                  </span>
                </div>

                <blockquote className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                  “{t.quote}”
                </blockquote>

                <div className="p-5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">
                      Before Engagement:{' '}
                    </span>
                    <span className="text-slate-600">{t.beforeState}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">
                      Architectural Change:{' '}
                    </span>
                    <span className="text-slate-600">
                      {t.changeImplemented}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-700">
                      Quantified Outcome:{' '}
                    </span>
                    <span className="font-semibold text-slate-950">
                      {t.quantifiedOutcome}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    {t.clientName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.clientRole} · {t.companyName}
                  </p>
                </div>

                {t.projectSlug && (
                  <Link
                    href={`/projects/${t.projectSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
