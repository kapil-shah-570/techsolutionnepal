import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/db/store';
import { ProjectsFilterClient } from '@/components/projects/ProjectsFilterClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Enterprise Portfolio & Production Case Studies | Tech Solution Nepal',
  description:
    'Explore audited case studies across institutional fintech, HIPAA clinical AI, multi-region sovereign cloud, and B2B commerce.',
};

export default function ProjectsPage() {
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
            <span className="text-white">Projects &amp; Portfolio</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              AUDITED PRODUCTION PORTFOLIO · {projects.length} FLAGSHIP DELIVERIES
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Systems engineered for verifiable business impact.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Inspect our production architectures, before-and-after latency and revenue telemetry, and full technology stacks.
            </p>
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
