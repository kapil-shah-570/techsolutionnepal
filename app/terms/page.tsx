import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service & Engagement Governance | Tech Solution Nepal',
  description:
    'Terms of service, intellectual property ownership, and master services agreement principles for Tech Solution Nepal.',
};

export default function TermsPage() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Terms of Service</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-6">
          <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
            LAST UPDATED: OCTOBER 1, 2026
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Terms of Service &amp; Commercial Governance
          </h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              1. Scope of Digital Platform &amp; Proposals
            </h2>
            <p>
              Pricing ranges and delivery timelines published on this website represent verified historical benchmarks. Formal commercial engagements are governed by a mutually executed Master Services Agreement (MSA) and Statement of Work (SOW).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              2. Intellectual Property Assignment
            </h2>
            <p>
              Under our standard Master Services Agreement, upon payment for completed milestones, 100% of custom software code, architectural diagrams, design systems, and bespoke machine learning artifacts created for the client are assigned unconditionally to the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              3. Governing Law
            </h2>
            <p>
              Disputes arising under North American engagements are governed by the laws of the State of New York; European engagements are governed by Swiss substantive law in Zurich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
