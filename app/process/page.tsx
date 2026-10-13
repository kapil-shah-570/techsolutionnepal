import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Engineering & Delivery Process | Tech Solution Nepal',
  description:
    'Explore our 4-stage deterministic software delivery methodology: C4 Architecture & Threat Modeling, IaC Foundation, Iterative Sprints, and Zero-Downtime Cutover.',
};

const PROCESS_PHASES = [
  {
    number: '01',
    name: 'Discovery, Threat Modeling & C4 Architecture Blueprint',
    duration: 'Weeks 1–2',
    summary:
      'Every engagement begins with principal-led architectural discovery. We never write production code before data schemas, failure modes, latency budgets, and security boundaries are explicitly modeled.',
    activities: [
      'Audit existing legacy repositories, database query plans, and cloud cost drivers.',
      'Author C4 Model diagrams (Context, Container, Component, and Data Flow).',
      'Conduct STRIDE / OWASP ASVS threat modeling and define RBAC authorization matrices.',
      'Deliver a fixed-milestone roadmap with deterministic acceptance criteria.',
    ],
    artifacts: 'Signed C4 Architecture Blueprint · ERD & Event Schema · Threat Model · Sprint Backlog',
  },
  {
    number: '02',
    name: 'Infrastructure-as-Code, Design System & Contract Foundation',
    duration: 'Weeks 3–4',
    summary:
      'We provision reproducible staging and production environments alongside interactive UI prototypes and OpenAPI/gRPC service contracts so frontend, backend, and mobile streams execute in parallel.',
    activities: [
      'Provision AWS/GCP/Azure environments using modular Terraform / OpenTofu.',
      'Configure GitHub Actions / GitLab CI gates with automated linting, SAST scanning, and preview deployments.',
      'Establish tokenized Figma-to-React component libraries meeting WCAG 2.2 AA/AAA contrast.',
      'Publish versioned OpenAPI 3.1 / GraphQL schemas with mock contract servers.',
    ],
    artifacts: 'Terraform IaC Repo · CI/CD Pipeline · Tokenized Storybook · OpenAPI 3.1 Specification',
  },
  {
    number: '03',
    name: 'Iterative Two-Week Sprint Engineering & Automated QA',
    duration: 'Weeks 5–12+',
    summary:
      'Our senior engineering pods ship production-grade increments every two weeks. Clients have full visibility into Git repositories, live staging environments, and automated test coverage metrics.',
    activities: [
      'Bi-weekly live architecture and product demonstrations in staging.',
      'Mandatory peer code review by a Principal Architect on every pull request.',
      'Parallelized Playwright end-to-end browser tests and Supertest/Vitest API integration suites.',
      'Continuous OpenTelemetry instrumentation for traces, metrics, and structured logs.',
    ],
    artifacts: 'Production-Ready Feature Increments · Automated Playwright & API Test Suite · Weekly Telemetry Reports',
  },
  {
    number: '04',
    name: 'Load Hardening, Shadow Parity Verification & Zero-Downtime Cutover',
    duration: 'Launch & Ongoing SLA',
    summary:
      'Before cutover, we subject the system to 10x synthetic load simulations and verify data parity against legacy databases. Post-launch, we transition cleanly to your internal team or our 24/7 SRE pod.',
    activities: [
      'Distributed k6 load and chaos testing to validate p99 latency under peak traffic.',
      'White-box security review and dependency vulnerability attestation.',
      'Zero-downtime blue/green or canary production cutover with instant rollback safety.',
      'Live engineering workshops, runbook handover, and 90-day warranty stewardship.',
    ],
    artifacts: 'k6 Load Test Attestation · Operations & Incident Runbooks · Full IP & Repository Transfer',
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Our Delivery Process</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              ISO/IEC 27001 &amp; SOC 2 TYPE II AUDITED SDLC
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Deterministic engineering governance from blueprint to cutover.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We eliminate software project ambiguity through transparent architecture specifications, automated quality gates, and weekly staging demonstrations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          {PROCESS_PHASES.map((phase) => (
            <div
              key={phase.number}
              className="p-8 sm:p-10 border border-slate-200 rounded-xl bg-white grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                  <span className="font-bold text-blue-700">
                    PHASE {phase.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{phase.duration}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-950">
                  {phase.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {phase.summary}
                </p>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900">
                    Key Engineering Activities &amp; Quality Gates
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    {phase.activities.map((act, i) => (
                      <li
                        key={i}
                        className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2"
                      >
                        <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900">
                    Client Deliverables:{' '}
                  </span>
                  <span className="text-blue-700 font-medium">
                    {phase.artifacts}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to initiate Phase 01 Architecture Discovery?
            </h2>
            <p className="text-sm text-slate-300">
              Schedule a 45-minute technical briefing with a Principal Systems Architect.
            </p>
          </div>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Request Architecture Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
