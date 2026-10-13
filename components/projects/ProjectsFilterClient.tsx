'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCaseStudy } from '@/lib/types';
import { ResilientImage } from '@/components/ui/ResilientImage';

export function ProjectsFilterClient({
  projects,
}: {
  projects: ProjectCaseStudy[];
}) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = Array.from(new Set(projects.map((p) => p.industry)));
  const visible =
    selectedIndustry === 'all'
      ? projects
      : projects.filter((p) => p.industry === selectedIndustry);

  return (
    <div className="space-y-8">
      {/* Interactive Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setSelectedIndustry('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
            selectedIndustry === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Industries ({projects.length})
        </button>
        {industries.map((ind) => (
          <button
            key={ind}
            type="button"
            onClick={() => setSelectedIndustry(ind)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedIndustry === ind
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {visible.map((project) => (
          <article
            key={project.id}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-200">
                <ResilientImage
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {project.industry}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.clientName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {project.deliveryYear} ({project.duration})
                  </span>
                </div>

                <p className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                  {project.headlineMetric}
                </p>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-blue-700 transition-colors"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.summary}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-lg font-bold font-mono tabular-nums text-slate-950">
                        {m.value}
                      </p>
                      <p className="text-xs text-slate-500">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-500 truncate">
                {project.technologies.join(' · ')}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
