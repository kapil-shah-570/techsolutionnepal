import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getStore, getTeamMembers } from '@/lib/db/store';
import { GENERATED_IMAGES } from '@/lib/db/seed-data';
import { ResilientImage } from '@/components/ui/ResilientImage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Tech Solution Nepal | Global Enterprise IT & Software Consultancy',
  description:
    'Learn about Tech Solution Nepal, our 165 senior architects and engineers across Zurich, New York, London, and Singapore, and our ISO 27001 / SOC 2 Type II governance.',
};

export default function AboutPage() {
  const settings = getStore().siteSettings;
  const leadership = getTeamMembers().slice(0, 4);

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">About Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
                ESTABLISHED {settings.foundedYear} · ZURICH · NEW YORK · LONDON · SINGAPORE
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
                An engineering-first consultancy built by Principal Systems Architects.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Tech Solution Nepal was founded to bridge the gap between strategy-only management consultancies that cannot ship production code and offshore body-shops that lack architectural rigor.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/our-story"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  Read Our Founding Story
                </Link>
                <Link
                  href="/mission-vision"
                  className="px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-900 rounded-lg transition-colors"
                >
                  Mission, Vision &amp; Charter
                </Link>
                <Link
                  href="/team"
                  className="px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-900 rounded-lg transition-colors"
                >
                  Meet Leadership
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <ResilientImage
                  src={GENERATED_IMAGES.teamStudio}
                  alt="Tech Solution Nepal principal architects collaborating in engineering studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Metrics & Certifications */}
      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.verifiedMetrics.map((m) => (
              <div
                key={m.label}
                className="p-6 border border-slate-200 rounded-xl bg-slate-50/60 space-y-2"
              >
                <p className="text-3xl font-bold font-mono tabular-nums text-slate-950">
                  {m.value}
                </p>
                <p className="text-sm font-bold text-slate-900">{m.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {m.verificationNote}
                </p>
              </div>
            ))}
          </div>

          <div className="p-8 border border-slate-200 rounded-xl bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-2">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                SECURITY &amp; QUALITY GOVERNANCE
              </p>
              <h2 className="text-2xl font-bold text-slate-950">
                Audited compliance standards
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Every engineering pod operates under mandatory cryptographic access controls, SAST/DAST gates, and independent third-party audits.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.certifications.map((cert) => (
                <div
                  key={cert}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Delivery Centers */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              FOLLOW-THE-SUN ENGINEERING PRESENCE
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Four global engineering &amp; advisory hubs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.regionalOffices.map((office) => (
              <div
                key={office.city}
                className="p-6 bg-white border border-slate-200 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">
                    {office.country}
                  </span>
                  <span className="font-mono tabular-nums">
                    {office.timezone}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950">
                  {office.city}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {office.address}
                </p>
                <p className="text-xs font-mono tabular-nums text-slate-800 pt-2 border-t border-slate-100">
                  {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                LEADERSHIP
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
                Principal Architects &amp; Practice Heads
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <div
                key={member.id}
                className="p-6 border border-slate-200 rounded-xl bg-white flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">{member.location}</p>
                  <h3 className="text-lg font-bold text-slate-950">
                    <Link
                      href={`/team/${member.slug}`}
                      className="hover:text-blue-700"
                    >
                      {member.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-semibold text-blue-700">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.shortBio}
                  </p>
                </div>
                <Link
                  href={`/team/${member.slug}`}
                  className="text-xs font-semibold text-slate-900 hover:text-blue-700 pt-3 border-t border-slate-100"
                >
                  Read Full Biography →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
