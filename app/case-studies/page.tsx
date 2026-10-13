import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '@/lib/db/store';
import { ProjectsFilterClient } from '@/components/projects/ProjectsFilterClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Executive Case Studies & Quantified ROI | Tech Solution Nepal',
  description:
    'Comparative executive ledger of production outcomes, latency reductions, and cost savings delivered by Tech Solution Nepal.',
};

export default function CaseStudiesPage() {
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
            <span className="text-white">Case Studies</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              QUANTITATIVE OUTCOME LEDGER
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Executive case studies and verified production metrics.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every engagement is measured against contractual performance, security, and commercial KPIs established during our Phase-1 Architecture Blueprint.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Summary Comparison Table */}
      <section className="py-14 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <h2 className="text-xl font-bold text-slate-950">
            Audited Delivery Benchmark Matrix
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-3.5 px-4">Client Organization</th>
                  <th className="py-3.5 px-4">Industry</th>
                  <th className="py-3.5 px-4">Practice Area</th>
                  <th className="py-3.5 px-4">Verified Outcome</th>
                  <th className="py-3.5 px-4 text-right">Duration</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-semibold text-slate-950">
                      {p.clientName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{p.industry}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {p.categoryName}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums font-semibold text-blue-700">
                      {p.headlineMetric}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-600">
                      {p.duration}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-blue-700"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <ProjectsFilterClient projects={projects} />
        </div>
      </section>
    </div>
  );
}
