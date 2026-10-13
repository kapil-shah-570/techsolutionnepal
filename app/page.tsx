import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getPublishedCategories,
  getServices,
  getProjects,
  getTestimonials,
  getTeamMembers,
  getArticles,
  getFaqs,
  getIndustries,
  getStore,
} from '@/lib/db/store';
import { GENERATED_IMAGES } from '@/lib/db/seed-data';
import { ResilientImage } from '@/components/ui/ResilientImage';
import { InteractiveServiceExplorer } from '@/components/home/InteractiveServiceExplorer';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const settings = getStore().siteSettings;
  const categories = getPublishedCategories();
  const allServices = getServices();
  const featuredServices = getServices({ featuredOnly: true }).slice(0, 4);
  const featuredProjects = getProjects({ featuredOnly: true }).slice(0, 3);
  const testimonials = getTestimonials().slice(0, 3);
  const team = getTeamMembers().slice(0, 4);
  const articles = getArticles().slice(0, 3);
  const faqs = getFaqs().slice(0, 6);
  const industries = getIndustries();

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION + FULL-WIDTH VERIFIED KPI STRIP */}
      <section className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-14 pb-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Proposition & Primary Action */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <p className="text-xs font-mono tabular-nums text-blue-400 tracking-wide">
                  KATHMANDU (HQ) · SYDNEY · LONDON · NEW YORK · ISO/IEC 27001 &amp; SOC 2 TYPE II
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
                  We architect and ship mission-critical enterprise software, cloud platforms, and verifiable AI systems.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Tech Solution Nepal is a principal-led technology consultancy based in Kathmandu with global delivery. Across 12 specialized practice areas—from distributed Next.js and native mobile platforms to citation-locked RAG pipelines, Kubernetes cloud foundations, and Zero-Trust security—we replace legacy fragility with durable production systems.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Schedule Architecture Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 border border-slate-700 hover:bg-slate-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore 12 Practice Areas</span>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>100% Client IP Ownership</span>
                  <span aria-hidden="true">·</span>
                  <span>Direct Principal Architect Leadership</span>
                  <span aria-hidden="true">·</span>
                  <span>Contractual 99.99% Uptime SLAs</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact 16:9 Architectural Visual */}
            <div className="lg:col-span-5 flex">
              <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex flex-col justify-end min-h-[320px] lg:min-h-full">
                <ResilientImage
                  src={GENERATED_IMAGES.heroTechNepal}
                  alt="Tech Solution Nepal modern engineering campus and technology innovation hub in Kathmandu"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-6 pt-20 space-y-1.5">
                  <p className="text-xs font-mono tabular-nums text-blue-400">
                    FEATURED PRODUCTION BENCHMARK · Q2 2026
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Helvetia Clearstream Institutional Treasury Platform — $4.2B daily settlement volume at 38ms p99 latency.
                  </p>
                  <Link
                    href="/projects/institutional-settlement-ledger"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white pt-1"
                  >
                    <span>Read the Architectural Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Verified KPI Strip Below the Hero Split */}
          <div className="mt-12 pt-10 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.verifiedMetrics.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <p className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-white tracking-tight">
                  {metric.value}
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  {metric.label}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {metric.verificationNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE 12 SERVICE CATEGORIES & SUBSERVICES EXPLORER */}
      <section className="py-20 lg:py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                01 · END-TO-END CAPABILITY MATRIX
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                Twelve integrated technology practices under one roof.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Select any practice area below to inspect its specialized subservices, delivery timelines, and technology stack—or navigate directly to its dedicated architecture blueprint.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
            >
              <span>View Complete Directory ({allServices.length} Services)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <InteractiveServiceExplorer
            categories={categories}
            services={allServices}
          />
        </div>
      </section>

      {/* 3. ASYMMETRIC BENTO GRID: FLAGSHIP ENGINEERING CAPABILITIES */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              02 · HIGH-DEMAND SPECIALIZATIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
              Architected for regulated, high-concurrency production workloads.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredServices.map((srv, idx) => {
              const isWide = idx === 0 || idx === 3;
              return (
                <div
                  key={srv.id}
                  className={`p-8 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-6 ${
                    isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-blue-700">
                        {srv.categoryName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Estimated Delivery: {srv.estimatedDelivery}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                      <Link
                        href={`/services/${srv.categorySlug}/${srv.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {srv.name}
                      </Link>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {srv.valueProposition}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed pt-1">
                      {srv.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      {srv.technologies.slice(0, 5).join(' · ')}
                    </div>

                    <Link
                      href={`/services/${srv.categorySlug}/${srv.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
                    >
                      <span>Inspect Blueprint &amp; Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROOF OF IMPACT: VERIFIED CASE STUDIES (CLAIM-TO-PROOF ADJACENCY) */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                03 · VERIFIED PRODUCTION EVIDENCE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                Quantified engineering outcomes across banking, clinical AI, and sovereign cloud.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Every case study includes audited before-and-after telemetry, architectural diagrams, and attributable executive references.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-200">
                    <ResilientImage
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">
                        {project.industry}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.clientName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {project.duration}
                      </span>
                    </div>

                    <p className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                      {project.headlineMetric}
                    </p>

                    <h3 className="text-xl font-bold tracking-tight text-slate-950">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-base font-bold font-mono tabular-nums text-slate-950">
                          {m.value}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ATTRIBUTABLE CLIENT TESTIMONIALS */}
      <section className="py-20 lg:py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
                04 · VERIFIED EXECUTIVE ENDORSEMENTS
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Trusted by Chief Technology Officers, COOs, and Clinical Directors.
              </h2>
            </div>

            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 whitespace-nowrap shrink-0"
            >
              <span>View All Verified Client Outcomes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-blue-400 font-semibold">
                      {t.industry}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      Verified {t.verifiedDate}
                    </span>
                  </div>

                  <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    “{t.quote}”
                  </blockquote>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">Before: </span>
                      <span className="text-slate-300">{t.beforeState}</span>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-medium">Outcome: </span>
                      <span className="text-white font-semibold">
                        {t.quantifiedOutcome}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">{t.clientName}</p>
                    <p className="text-xs text-slate-400">
                      {t.clientRole} · {t.companyName}
                    </p>
                  </div>
                  {t.projectSlug && (
                    <Link
                      href={`/projects/${t.projectSlug}`}
                      className="text-xs font-semibold text-blue-400 hover:text-white whitespace-nowrap shrink-0"
                    >
                      Case Study →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR 4-STAGE DELIVERY METHODOLOGY & INDUSTRIES SERVED */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-20">
          {/* Delivery Methodology */}
          <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                  05 · DETERMINISTIC DELIVERY GOVERNANCE
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                  How we take complex systems from C4 blueprint to zero-downtime cutover.
                </h2>
              </div>
              <Link
                href="/process"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
              >
                <span>Inspect Full Engineering Process</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Architecture & Threat Modeling',
                  duration: 'Weeks 1–2',
                  desc: 'We audit legacy bottlenecks, model OWASP/Zero-Trust security threats, and deliver a signed C4 Architecture Blueprint and data schema.',
                },
                {
                  step: '02',
                  title: 'Foundation, IaC & Design Tokens',
                  duration: 'Weeks 3–4',
                  desc: 'We provision Terraform cloud environments, CI/CD test gates, OpenAPI contracts, and tokenized Figma-to-React component libraries.',
                },
                {
                  step: '03',
                  title: 'Iterative Sprint Execution',
                  duration: 'Weeks 5–12+',
                  desc: 'Bi-weekly production increments demonstrated live in staging, backed by automated Playwright E2E and contract test suites.',
                },
                {
                  step: '04',
                  title: 'Load Hardening & SLA Handover',
                  duration: 'Cutover & Ongoing',
                  desc: 'Distributed k6 stress testing, shadow-traffic parity checks, zero-downtime launch, and transition to your team or our 24/7 SRE pod.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 border border-slate-200 rounded-xl bg-slate-50/60 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                    <span className="font-bold text-blue-700">
                      Phase {item.step}
                    </span>
                    <span className="text-slate-500">{item.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries Matrix */}
          <div className="space-y-10 pt-8 border-t border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                  06 · REGULATED INDUSTRY VERTICALS
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                  Domain-native compliance across six core industries.
                </h2>
              </div>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
              >
                <span>Explore Industry Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, idx) => (
                <div
                  key={ind.id}
                  className="p-6 border border-slate-200 rounded-xl bg-white space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="text-xs text-slate-500">
                      <span className="font-mono tabular-nums text-slate-400 mr-2">
                        0{idx + 1}.
                      </span>
                      <span>
                        {ind.complianceStandards.slice(0, 3).join(' · ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950">
                      {ind.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {ind.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono tabular-nums text-blue-700 font-medium truncate">
                      {ind.keyMetrics}
                    </span>
                    <Link
                      href="/industries"
                      className="font-semibold text-slate-900 hover:text-blue-700 shrink-0"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP TEAM & ENGINEERING MONOGRAPHS (BLOG) */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-20">
          {/* Leadership Preview */}
          <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                  07 · PRINCIPAL ARCHITECT LEADERSHIP
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                  Led by practicing systems architects, not account executives.
                </h2>
              </div>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
              >
                <span>Meet All Principal Architects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-2.5">
                    <div className="text-xs text-slate-500">
                      <span>{member.location}</span>
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      <span className="font-mono tabular-nums">
                        {member.experienceYears} yrs exp
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950">
                      <Link
                        href={`/team/${member.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {member.name}
                      </Link>
                    </h3>
                    <p className="text-xs font-semibold text-blue-700">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {member.shortBio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate">
                      {member.education}
                    </span>
                    <Link
                      href={`/team/${member.slug}`}
                      className="font-semibold text-slate-900 hover:text-blue-700 shrink-0"
                    >
                      Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Monographs / Blog */}
          <div className="space-y-10 pt-8 border-t border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                  08 · ARCHITECTURAL RESEARCH &amp; INSIGHTS
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                  Production blueprints from our engineering teams.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
              >
                <span>Read All Engineering Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <article
                  key={art.id}
                  className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">
                        {art.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {art.publishedAt}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {art.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 leading-snug">
                      <Link
                        href={`/blog/${art.slug}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {art.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600">By {art.authorName}</span>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              09 · ENGAGEMENT &amp; GOVERNANCE FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
              Answers to common technical, IP, and commercial questions.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have a specific security or procurement question? Explore our complete FAQ directory or request our SOC 2 Type II and ISO 27001 attestation package.
            </p>
            <div className="pt-2">
              <Link
                href="/faqs"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                <span>View Complete FAQ Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* 9. DIRECT ARCHITECTURE CONSULTATION & QUOTE CAPTURE */}
      <section className="py-20 lg:py-24 bg-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              10 · INITIATE AN ARCHITECTURE BRIEFING
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
              Request a technical proposal and fixed-milestone estimate.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Share your objectives, target timeline, and integration requirements. Every inquiry is reviewed directly by a Principal Systems Architect within one business day.
            </p>

            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 text-xs">
              <p className="font-bold text-slate-900">
                What happens after you submit:
              </p>
              <ol className="space-y-2.5 text-slate-600">
                <li>
                  <span className="font-mono tabular-nums font-semibold text-blue-700 mr-2">
                    01.
                  </span>
                  Instant reference ID generation and routing to the relevant practice lead.
                </li>
                <li>
                  <span className="font-mono tabular-nums font-semibold text-blue-700 mr-2">
                    02.
                  </span>
                  45-minute technical discovery call with a Principal Architect (under Mutual NDA).
                </li>
                <li>
                  <span className="font-mono tabular-nums font-semibold text-blue-700 mr-2">
                    03.
                  </span>
                  Delivery of a written C4 architecture recommendation, team pod composition, and milestone pricing.
                </li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteRequestForm
              serviceOptions={allServices.map((s) => ({
                slug: s.slug,
                name: s.name,
                categoryName: s.categoryName,
              }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
