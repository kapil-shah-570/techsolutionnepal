import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy & Session Security | Tech Solution Nepal',
  description:
    'Strict first-party cookie policy and HttpOnly session governance for Tech Solution Nepal.',
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Cookie Policy</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-6">
          <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
            ZERO THIRD-PARTY AD TRACKERS
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Cookie &amp; Session Storage Policy
          </h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              1. Strictly Necessary Security Cookies
            </h2>
            <p>
              Tech Solution Nepal uses an <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">HttpOnly</code>, <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">SameSite=Lax</code> session cookie (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">techsolutionnepal_admin_session</code>) exclusively to authenticate administrators accessing the protected CMS console.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              2. No Invasive Cross-Site Tracking
            </h2>
            <p>
              We do not deploy third-party behavioral advertising pixels or cross-site fingerprinting scripts on our public pages.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
