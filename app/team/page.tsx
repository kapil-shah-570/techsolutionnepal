import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTeamMembers } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Leadership & Principal Systems Architects | Tech Solution Nepal',
  description:
    'Meet the Principal Systems Architects, AI Researchers, Cloud Directors, and Offensive Security Leads behind Tech Solution Nepal.',
};

export default function TeamDirectoryPage() {
  const members = getTeamMembers();

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Our Team</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              PRINCIPAL LEADERSHIP DIRECTORY · AVG 14+ YEARS PRODUCTION EXPERIENCE
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Practicing systems architects, AI scientists, and security leaders.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every partner and practice director at Tech Solution Nepal actively authors architectural specifications, conducts code reviews, and leads client engineering pods.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <article
              key={member.id}
              className="p-7 border border-slate-200 rounded-xl bg-white flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{member.department}</span>
                  <span className="font-mono tabular-nums">
                    {member.location} · {member.experienceYears} yrs
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  <Link
                    href={`/team/${member.slug}`}
                    className="hover:text-blue-700 transition-colors"
                  >
                    {member.name}
                  </Link>
                </h2>

                <p className="text-xs font-semibold text-blue-700">
                  {member.role}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {member.shortBio}
                </p>

                <div className="pt-2 space-y-1 text-xs text-slate-500">
                  <p>
                    <strong className="text-slate-800">Education:</strong>{' '}
                    {member.education}
                  </p>
                  <p>
                    <strong className="text-slate-800">Specialties:</strong>{' '}
                    {member.specialties.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 truncate max-w-[180px]">
                  {member.certifications[0]}
                </span>
                <Link
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-800 shrink-0"
                >
                  <span>Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
