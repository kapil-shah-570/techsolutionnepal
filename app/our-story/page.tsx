import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story & Engineering Heritage (2016–2026) | Tech Solution Nepal',
  description:
    'From an ETH Zurich distributed systems spin-out in 2016 to a four-hub global enterprise software and AI consultancy.',
};

const MILESTONES = [
  {
    year: '2016',
    title: 'Founded in Zurich as a Distributed Systems Practice',
    description:
      'Dr. Marcus Vance and three fellow distributed systems researchers founded Tech Solution Nepal in Zurich to solve high-throughput settlement and database bottlenecks for European financial institutions.',
  },
  {
    year: '2018',
    title: 'London & New York Expansion; Cloud-Native & Kubernetes Practice',
    description:
      'Opened our London and New York engineering studios. Became an early CNCF Kubernetes certified partner, migrating 28 regulated financial and media workloads to multi-region cloud foundations.',
  },
  {
    year: '2021',
    title: 'ISO/IEC 27001 & SOC 2 Type II Certification + Offensive Security Division',
    description:
      'Established our dedicated Cybersecurity & Zero-Trust Practice in Singapore and London under Kenji Takahashi, achieving clean ISO 27001 and SOC 2 Type II certifications.',
  },
  {
    year: '2023',
    title: 'Applied AI, Hybrid RAG & Biomedical Informatics Lab',
    description:
      'Launched our AI & Data Systems division under Dr. Devon Keshav, pioneering citation-locked Retrieval-Augmented Generation (RAG) and deterministic LLM evaluation harnesses.',
  },
  {
    year: '2026',
    title: '240+ Production Systems Delivered Across 12 Practice Areas',
    description:
      'Today, 165 Principal Architects, Staff Engineers, Product Designers, and Security Specialists operate as a unified global consultancy maintaining a 94% multi-year client retention rate.',
  },
];

export default function OurStoryPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Our Story</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              TEN YEARS OF PRODUCTION ENGINEERING · 2016 – 2026
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Built on the conviction that senior architects should write code, not slide decks.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              In 2016, we saw enterprise technology organizations trapped between two broken models: advisory firms that delivered 300-page PDF strategies that could not be implemented, and staffing agencies that billed junior developers by the hour without architectural governance. We built Tech Solution Nepal as the third path.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              CHRONOLOGY
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Key milestones in our evolution
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-3">
                  <span className="text-3xl font-bold font-mono tabular-nums text-blue-700">
                    {m.year}
                  </span>
                </div>
                <div className="md:col-span-9 space-y-2">
                  <h3 className="text-xl font-bold text-slate-950">
                    {m.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-950">
                Explore our Mission, Vision &amp; Architectural Charter
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Inspect the non-negotiable engineering principles that govern every Tech Solution Nepal delivery.
              </p>
            </div>
            <Link
              href="/mission-vision"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Read Mission &amp; Vision</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
