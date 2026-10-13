import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaqs } from '@/lib/db/store';
import { FaqAccordion } from '@/components/home/FaqAccordion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Tech Solution Nepal',
  description:
    'Answers to technical, commercial, intellectual property, SOC 2 / HIPAA compliance, and SLA questions.',
};

export default function FaqsPage() {
  const faqs = getFaqs();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Frequently Asked Questions</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              KNOWLEDGE BASE &amp; PROCUREMENT FAQ
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Frequently asked questions.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Filter by engagement model, architecture standards, security compliance, or pricing governance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FaqAccordion faqs={faqs} showCategoryFilter />
        </div>
      </section>
    </div>
  );
}
