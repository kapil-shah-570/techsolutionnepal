import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getIndustries, getProjects } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Industries We Serve | Financial, Healthcare, Cloud & Industrial IT',
  description:
    'Domain-native software engineering and regulatory compliance across Financial Services, Healthcare & Genomics, Manufacturing, Retail, Energy, and B2B SaaS.',
};

export default function IndustriesPage() {
  const industries = getIndustries();
  const projects = getProjects();

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Industries We Serve</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              6 REGULATED VERTICALS · COMPLIANCE-FIRST ARCHITECTURE
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Engineered for industries where downtime or compliance failure is not an option.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Our Principal Architects bring deep domain fluency in financial clearing protocols, HIPAA clinical genomics, industrial ERP automation, and sovereign energy grids.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          {industries.map((ind, index) => {
            const matchingProjects = projects.filter((p) =>
              ind.relatedProjectSlugs.includes(p.slug)
            );
            return (
              <div
                key={ind.id}
                className="p-8 sm:p-10 border border-slate-200 rounded-xl bg-white grid grid-cols-1 lg:grid-cols-12 gap-10"
              >
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums font-bold text-blue-700">
                      Vertical 0{index + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ind.complianceStandards.join(' · ')}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                    {ind.name}
                  </h2>

                  <p className="text-base text-slate-600 leading-relaxed">
                    {ind.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-900">
                        Sector Challenges Addressed
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {ind.challenges.map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-900">
                        Tech Solution Nepal Technical Solutions
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {ind.solutions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                      VERIFIED SECTOR OUTCOME
                    </p>
                    <p className="text-lg font-bold text-slate-950">
                      {ind.keyMetrics}
                    </p>

                    {matchingProjects.length > 0 && (
                      <div className="pt-3 border-t border-slate-200 space-y-2">
                        <p className="text-xs font-semibold text-slate-500">
                          Reference Case Studies:
                        </p>
                        {matchingProjects.map((mp) => (
                          <Link
                            key={mp.id}
                            href={`/projects/${mp.slug}`}
                            className="block p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-700 transition-colors"
                          >
                            <p className="text-xs font-bold text-slate-900">
                              {mp.clientName}
                            </p>
                            <p className="text-xs text-slate-600 truncate">
                              {mp.title}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/quote?industry=${ind.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <span>Request {ind.name.split(',')[0]} Architecture Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
