import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import {
  getTeamMemberBySlug,
  getProjects,
  getArticles,
} from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) {
    return { title: 'Profile Not Found | Tech Solution Nepal' };
  }
  return {
    title: `${member.name} — ${member.role} | Tech Solution Nepal`,
    description: member.shortBio,
  };
}

export default async function TeamMemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) {
    notFound();
  }

  const ledProjects = getProjects().filter((p) =>
    member.projectSlugs.includes(p.slug)
  );
  const authoredArticles = getArticles().filter(
    (a) => a.authorSlug === member.slug
  );

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/team" className="hover:text-white">
              Our Team
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{member.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              {member.department.toUpperCase()} · {member.location.toUpperCase()} ·{' '}
              {member.experienceYears} YEARS EXPERIENCE
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {member.name}
            </h1>
            <p className="text-lg text-slate-300 font-medium">{member.role}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">
                Architectural Biography
              </h2>
              {member.fullBiography.map((para, i) => (
                <p
                  key={i}
                  className="text-base text-slate-600 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {ledProjects.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-950">
                  Flagship Engagements Led by {member.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {ledProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-6 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2"
                    >
                      <p className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                        {proj.headlineMetric}
                      </p>
                      <h3 className="text-base font-bold text-slate-950">
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="hover:text-blue-700"
                        >
                          {proj.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {proj.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {authoredArticles.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-950">
                  Published Engineering Research
                </h2>
                <div className="space-y-3">
                  {authoredArticles.map((art) => (
                    <Link
                      key={art.id}
                      href={`/blog/${art.slug}`}
                      className="block p-5 border border-slate-200 rounded-xl hover:border-blue-700 transition-colors"
                    >
                      <p className="text-xs text-slate-500">
                        {art.category} · {art.publishedAt} ·{' '}
                        {art.readTimeMinutes} min read
                      </p>
                      <p className="text-base font-bold text-slate-950 mt-1">
                        {art.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">
                  Academic Credentials
                </span>
                <span className="font-semibold text-slate-900 text-sm">
                  {member.education}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 block mb-1">
                  Core Technical Specialties
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {member.specialties.join(' · ')}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 block mb-1">
                  Industry Certifications
                </span>
                <ul className="space-y-1 text-slate-800 font-medium">
                  {member.certifications.map((c) => (
                    <li key={c}>• {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 bg-slate-950 text-white rounded-xl space-y-3">
              <h3 className="text-base font-bold">
                Schedule an Architecture Review
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Request a direct technical consultation with {member.name}’s practice group.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <span>Request Briefing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
