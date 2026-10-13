import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getJobs } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers & Open Engineering Positions | Tech Solution Nepal',
  description:
    'Join Tech Solution Nepal in Zurich, New York, London, Singapore, or Remote. View open roles for Principal Architects, Staff AI Engineers, and Security Specialists.',
};

export default function CareersPage() {
  const jobs = getJobs();

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Careers</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              SENIOR-ONLY ENGINEERING CULTURE · {jobs.length} OPEN ROLES
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Do the most rigorous architectural work of your career.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We hire Staff Engineers, Principal Systems Architects, Applied AI Scientists, and Offensive Security Researchers who value autonomy, deep technical craft, and profit-sharing ownership.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Open Engineering &amp; Architecture Positions
          </h2>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">
                      {job.department}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{job.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.workMode}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {job.experienceLevel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="hover:text-blue-700"
                    >
                      {job.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {job.summary}
                  </p>

                  <p className="text-xs font-mono tabular-nums font-semibold text-slate-800 pt-1">
                    Compensation: {job.compensationRange}
                  </p>
                </div>

                <Link
                  href={`/careers/${job.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-center"
                >
                  <span>Role Specification &amp; Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
