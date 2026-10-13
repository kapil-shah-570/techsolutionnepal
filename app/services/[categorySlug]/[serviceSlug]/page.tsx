import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import {
  getServiceBySlug,
  getCategoryBySlug,
  getProjects,
  getTestimonials,
  getServices,
} from '@/lib/db/store';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    return { title: 'Service Not Found | Tech Solution Nepal' };
  }
  return {
    title: service.seo.metaTitle,
    description: service.seo.metaDescription,
    openGraph: {
      title: service.seo.metaTitle,
      description: service.seo.metaDescription,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string; serviceSlug: string }>;
}) {
  const { categorySlug, serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!service) {
    notFound();
  }

  const allProjects = getProjects();
  const relatedProjects = allProjects.filter(
    (p) =>
      service.relatedProjectSlugs.includes(p.slug) ||
      p.categorySlug === service.categorySlug
  );

  const allTestimonials = getTestimonials();
  const relatedTestimonials = allTestimonials.filter(
    (t) =>
      service.testimonialIds.includes(t.id) ||
      t.serviceSlug === service.slug
  );

  const siblingServices = getServices({
    categorySlug: service.categorySlug,
  }).filter((s) => s.slug !== service.slug);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.categoryName,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Tech Solution Nepal',
    },
    areaServed: 'Worldwide',
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* 1. UNIQUE SERVICE HERO & VALUE PROPOSITION */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/services/${service.categorySlug}`}
              className="hover:text-white"
            >
              {category?.name || service.categoryName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums text-blue-400">
                <span>{service.categoryName.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>ESTIMATED DELIVERY: {service.estimatedDelivery}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-3xl">
                {service.valueProposition}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#service-quote-form"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Request Custom Scope &amp; Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pricing-packages"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-900 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>View Engagement Tiers &amp; Pricing</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block">Typical Delivery Window</span>
                <span className="text-base font-bold font-mono tabular-nums text-white">
                  {service.estimatedDelivery}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">
                  Supported Engagement Models
                </span>
                <p className="text-slate-200">
                  {service.engagementModels.join(' · ')}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">
                  Suitable Regulated Verticals
                </span>
                <p className="text-slate-200">
                  {service.suitableIndustries.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW, PROBLEMS SOLVED & BENEFITS */}
      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                01 · ARCHITECTURAL OVERVIEW
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                What we engineer &amp; why it matters
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {service.overview}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-slate-950">
                Core Capabilities &amp; Technical Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-1.5"
                  >
                    <p className="text-sm font-bold text-slate-950">
                      {feat.title}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
              <h3 className="text-base font-bold text-slate-950">
                Business &amp; Engineering Problems Solved
              </h3>
              <div className="space-y-4">
                {service.problemsSolved.map((prob, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs font-bold text-slate-900">
                      0{idx + 1}. {prob.title}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prob.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-7 border border-slate-200 rounded-xl bg-white space-y-4">
              <h3 className="text-base font-bold text-slate-950">
                Measurable Client Benefits
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGIES & DELIVERY PROCESS */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-14">
          <div className="space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              02 · TECHNOLOGY STACK &amp; DELIVERY METHODOLOGY
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              How we execute {service.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                Production Tooling &amp; Languages:{' '}
              </span>
              {service.technologies.join(' · ')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.deliveryProcess.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="text-xs font-mono tabular-nums font-bold text-blue-700">
                    Stage {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 block">Primary Deliverable:</span>
                  <span className="font-semibold text-slate-800">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OPTIONAL PACKAGES, PRICING RANGES & ENGAGEMENT TIERS */}
      <section
        id="pricing-packages"
        className="py-16 lg:py-20 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              03 · TRANSPARENT INVESTMENT &amp; ENGAGEMENT TIERS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Predictable milestone packages and dedicated engineering pods
            </h2>
            <p className="text-sm text-slate-600">
              Every tier includes 100% client IP ownership, automated CI/CD testing, and direct Principal Architect governance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {service.pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-7 rounded-xl border flex flex-col justify-between space-y-6 ${
                  tier.recommended
                    ? 'border-blue-700 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-900'
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p
                      className={`text-xs font-mono tabular-nums ${
                        tier.recommended ? 'text-blue-400' : 'text-blue-700'
                      }`}
                    >
                      {tier.deliveryEstimate}
                    </p>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p
                      className={`text-xs ${
                        tier.recommended ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {tier.targetAudience}
                    </p>
                  </div>

                  <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums pt-2">
                    {tier.priceRange}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-200/20 text-xs">
                    {tier.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            tier.recommended ? 'text-blue-400' : 'text-blue-700'
                          }`}
                        />
                        <span
                          className={
                            tier.recommended ? 'text-slate-200' : 'text-slate-700'
                          }
                        >
                          {deliv}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#service-quote-form"
                  className={`w-full py-2.5 text-center text-xs font-semibold rounded-lg transition-colors block ${
                    tier.recommended
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Select Tier &amp; Request Proposal
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELEVANT CASE STUDIES & CLIENT TESTIMONIALS */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-14">
          {relatedProjects.length > 0 && (
            <div className="space-y-6">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                04 · RELEVANT PRODUCTION CASE STUDIES
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-900">
                          {proj.clientName}
                        </span>{' '}
                        · {proj.industry}
                      </div>
                      <p className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                        {proj.headlineMetric}
                      </p>
                      <h3 className="text-lg font-bold text-slate-950">
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="hover:text-blue-700"
                        >
                          {proj.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 pt-2"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedTestimonials.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                VERIFIED CLIENT FEEDBACK
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-6 bg-white border border-slate-200 rounded-xl space-y-3"
                  >
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      “{t.quote}”
                    </p>
                    <p className="text-xs font-semibold text-emerald-700">
                      Verified Outcome: {t.quantifiedOutcome}
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong className="text-slate-900">{t.clientName}</strong> ·{' '}
                      {t.clientRole}, {t.companyName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. SERVICE FAQS & RELATED SERVICES */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Frequently Asked Questions — {service.name}
            </h2>
            <FaqAccordion
              faqs={service.faqs.map((f, idx) => ({
                id: `srv-faq-${idx}`,
                category: 'Architecture & Engineering',
                question: f.question,
                answer: f.answer,
                order: idx + 1,
                status: 'published',
              }))}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Related Capabilities
            </h2>
            <div className="space-y-3">
              {siblingServices.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.categorySlug}/${rel.slug}`}
                  className="block p-5 border border-slate-200 rounded-xl hover:border-blue-700 transition-colors space-y-1"
                >
                  <p className="text-xs text-blue-700 font-semibold">
                    {rel.categoryName} · {rel.estimatedDelivery}
                  </p>
                  <p className="text-sm font-bold text-slate-950">{rel.name}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICE-SPECIFIC CONSULTATION & QUOTE FORM */}
      <section id="service-quote-form" className="py-16 lg:py-20 bg-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              CONFIGURE YOUR SCOPE
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Request a Proposal for {service.name}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Complete the architectural intake form to receive a fixed-milestone estimate or dedicated pod staffing plan.
            </p>
          </div>

          <div className="lg:col-span-7">
            <QuoteRequestForm
              defaultCategorySlug={service.categorySlug}
              defaultServiceSlug={service.slug}
              defaultServiceName={service.name}
              customFields={service.customFormFields}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
