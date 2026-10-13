import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection | Tech Solution Nepal',
  description:
    'GDPR, CCPA, and ISO/IEC 27001 aligned privacy and data minimization policy for Tech Solution Nepal.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Privacy Policy</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-6">
          <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
            EFFECTIVE DATE: OCTOBER 1, 2026 · GDPR &amp; CCPA COMPLIANT
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Privacy Policy &amp; Data Processing Notice
          </h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              1. Data Minimization &amp; Collection Scope
            </h2>
            <p>
              Tech Solution Nepal Architecture &amp; Technology Group Inc. collects only the business contact and project scoping information voluntarily submitted through our Consultation, Quotation, and Career Application workflows (such as full name, work email, organization, and architectural requirements).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              2. Cryptographic Protection &amp; Access Controls
            </h2>
            <p>
              All inquiry records are encrypted in transit (TLS 1.3) and at rest (AES-256). Access to client inquiry data inside our Admin CMS is strictly restricted via server-side Role-Based Access Control (RBAC) and logged in an immutable security audit trail.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              3. Retention &amp; Subject Rights (GDPR / CCPA / FADP)
            </h2>
            <p>
              We never sell or rent personal data to third parties. You may request access, correction, export, or permanent erasure of your inquiry records at any time by contacting{' '}
              <span className="font-mono text-slate-900">
                security@techsolutionnepal.com
              </span>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
