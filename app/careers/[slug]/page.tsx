import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { getJobBySlug } from '@/lib/db/store';
import { JobApplicationForm } from '@/components/forms/JobApplicationForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) {
    return { title: 'Position Not Found | Tech Solution Nepal' };
  }
  return {
    title: `${job.title} (${job.location}) | Careers at Tech Solution Nepal`,
    description: job.summary,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{job.title}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              {job.department.toUpperCase()} · {job.location.toUpperCase()} ·{' '}
              {job.workMode.toUpperCase()}
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {job.title}
            </h1>
            <p className="text-base font-mono tabular-nums text-emerald-400 font-semibold">
              {job.compensationRange}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950">Role Overview</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {job.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950">
                Architectural Responsibilities
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950">
                Required Experience &amp; Technical Depth
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-950">
                Compensation &amp; Benefits
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {job.benefits.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
