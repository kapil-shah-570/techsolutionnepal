import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import {
  getProjectBySlug,
  getTestimonials,
  getServices,
} from '@/lib/db/store';
import { ResilientImage } from '@/components/ui/ResilientImage';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Case Study Not Found | Tech Solution Nepal' };
  }
  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
  };
}

export default async function ProjectCaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const testimonial = getTestimonials().find(
    (t) => t.id === project.testimonialId || t.projectSlug === project.slug
  );

  const relatedServices = getServices().filter(
    (s) =>
      project.serviceSlugs.includes(s.slug) ||
      s.categorySlug === project.categorySlug
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-white">
              Case Studies
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{project.clientName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-blue-400 font-mono tabular-nums">
                <span>{project.industry.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>{project.clientName.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>DELIVERED {project.deliveryYear}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {project.summary}
              </p>

              <div className="pt-2 grid grid-cols-3 gap-6 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Delivery Window</span>
                  <span className="font-mono tabular-nums font-bold text-white text-sm">
                    {project.duration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Engineering Pod</span>
                  <span className="font-bold text-white text-sm">
                    {project.teamSize}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Primary Practice</span>
                  <Link
                    href={`/services/${project.categorySlug}`}
                    className="font-bold text-blue-400 hover:underline text-sm"
                  >
                    {project.categoryName}
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <ResilientImage
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3-Column Quantified Outcomes Strip */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5"
              >
                <p className="text-3xl font-bold font-mono tabular-nums text-white">
                  {m.value}
                </p>
                <p className="text-sm font-semibold text-blue-400">{m.label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive: Challenge, Architecture, Execution & Business Outcome */}
      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-3">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                01 · THE LEGACY CHALLENGE
              </p>
              <h2 className="text-2xl font-bold text-slate-950">
                Problem statement &amp; operational constraints
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                02 · SYSTEM ARCHITECTURE &amp; TECHNICAL APPROACH
              </p>
              <h2 className="text-2xl font-bold text-slate-950">
                How Tech Solution Nepal architected the solution
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {project.architectureAndApproach}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                03 · EXECUTION HIGHLIGHTS
              </p>
              <ul className="space-y-3">
                {project.executionHighlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                04 · VERIFIED COMMERCIAL &amp; OPERATIONAL OUTCOME
              </p>
              <p className="text-base font-medium text-slate-900 leading-relaxed">
                {project.businessOutcome}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Stack, Testimonial & Related Services */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-950">
                Production Technology Stack
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.technologies.join(' · ')}
              </p>
            </div>

            {testimonial && (
              <div className="p-6 bg-slate-950 text-white rounded-xl space-y-4">
                <p className="text-xs font-mono tabular-nums text-blue-400">
                  CLIENT EXECUTIVE ENDORSEMENT
                </p>
                <blockquote className="text-sm text-slate-200 leading-relaxed">
                  “{testimonial.quote}”
                </blockquote>
                <div className="pt-3 border-t border-slate-800 text-xs">
                  <p className="font-bold text-white">{testimonial.clientName}</p>
                  <p className="text-slate-400">
                    {testimonial.clientRole} · {testimonial.companyName}
                  </p>
                </div>
              </div>
            )}

            <div className="p-6 border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-slate-950">
                Capabilities Utilized
              </h3>
              <div className="space-y-2">
                {relatedServices.slice(0, 3).map((srv) => (
                  <Link
                    key={srv.id}
                    href={`/services/${srv.categorySlug}/${srv.slug}`}
                    className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-900 flex items-center justify-between"
                  >
                    <span>{srv.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 lg:py-20 bg-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              ARCHITECT A SIMILAR OUTCOME
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Planning a comparable initiative in {project.industry}?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Speak directly with the Principal Architects behind {project.clientName}’s delivery.
            </p>
          </div>
          <div className="lg:col-span-7">
            <QuoteRequestForm
              defaultCategorySlug={project.categorySlug}
              defaultServiceName={project.categoryName}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
