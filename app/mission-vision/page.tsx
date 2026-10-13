import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mission, Vision & Engineering Charter | Tech Solution Nepal',
  description:
    'Our mission, long-term vision, and six non-negotiable engineering principles for building durable enterprise technology.',
};

const CHARTER_PRINCIPLES = [
  {
    number: '01',
    title: 'Zero Black-Box Lock-In (100% Client IP Sovereignty)',
    description:
      'Every line of source code, Terraform module, Figma token library, and fine-tuned model weight we build belongs unconditionally to the client. Our goal is to make your internal team self-sufficient, never dependent on proprietary vendor middleware.',
  },
  {
    number: '02',
    title: 'Verifiable Truth Over AI Hype',
    description:
      'We refuse to deploy unverified generative AI wrappers where deterministic software or citation-locked retrieval is required. Every AI system must pass quantitative precision, recall, and RBAC boundary evaluations before reaching production.',
  },
  {
    number: '03',
    title: 'Security & Accessibility Are Structural, Not Cosmetics',
    description:
      'OWASP ASVS Level 2 security controls, zero-trust authentication, and WCAG 2.2 AA accessibility are built into the foundation of every sprint—never deferred as post-launch backlog items.',
  },
  {
    number: '04',
    title: 'Senior Principal Accountability',
    description:
      'The Principal Systems Architect who designs your Phase-01 blueprint remains hands-on in your repository and code reviews through production cutover.',
  },
  {
    number: '05',
    title: 'Latency & FinOps Discipline',
    description:
      'Fast software converts better and costs less to run. We enforce strict p95/p99 latency budgets and continuous cloud unit-cost telemetry on every platform.',
  },
  {
    number: '06',
    title: 'Radical Operational Transparency',
    description:
      'Clients have real-time access to Git commits, CI/CD test results, staging environments, and honest risk assessments.',
  },
];

export default function MissionVisionPage() {
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
            <span className="text-white">Mission &amp; Vision</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              INSTITUTIONAL CHARTER &amp; ENGINEERING VALUES
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Mission, vision, and the six tenets of our engineering charter.
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              OUR MISSION
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Eliminate technical fragility in the world’s most consequential organizations.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We exist to design, engineer, and safeguard software systems that process billions in capital, accelerate clinical breakthroughs, and power global supply chains—delivering measurable operational ROI without vendor lock-in.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-slate-200 rounded-xl bg-slate-950 text-white space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              OUR VISION
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Set the global benchmark for principal-led software architecture and governed AI.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We envision an enterprise technology landscape where every system is observable, accessible, cryptographically secure, and engineered with craftsmanship that endures for decades rather than quarters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
              THE TECH SOLUTION NEPAL CHARTER
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Six non-negotiable engineering principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARTER_PRINCIPLES.map((item) => (
              <div
                key={item.number}
                className="p-7 border border-slate-200 rounded-xl bg-white space-y-3"
              >
                <span className="text-xs font-mono tabular-nums font-bold text-blue-700">
                  Principle {item.number}
                </span>
                <h3 className="text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
            >
              <span>Meet the Principal Architects Upholding This Charter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
