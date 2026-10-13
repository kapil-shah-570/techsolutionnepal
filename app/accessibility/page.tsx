import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement (WCAG 2.2 AA) | Tech Solution Nepal',
  description:
    'WCAG 2.2 Level AA accessibility conformance, keyboard navigation, and reduced-motion standards across Tech Solution Nepal.',
};

export default function AccessibilityPage() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Accessibility Statement</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-6">
          <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
            WCAG 2.2 LEVEL AA CONFORMANCE
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Accessibility &amp; Inclusive Engineering Statement
          </h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              1. Semantic Landmarks &amp; Keyboard Navigation
            </h2>
            <p>
              Every page on Tech Solution Nepal is engineered with semantic HTML5 landmarks (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">&lt;header&gt;</code>, <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">&lt;nav&gt;</code>, <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">&lt;main&gt;</code>, <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">&lt;footer&gt;</code>), skip-to-content links, visible focus rings, and full keyboard operability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              2. Color Contrast &amp; Non-Hue State Signaling
            </h2>
            <p>
              Text contrast exceeds 4.5:1 for body prose and 7:1 for primary headings. Semantic states (such as form validation errors or CMS publication statuses) are always paired with explicit text labels and icons rather than relying on color alone.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
