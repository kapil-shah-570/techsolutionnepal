'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FOOTER_CATEGORIES = [
  { name: '01. Web Development', slug: 'web-development' },
  { name: '02. Mobile App Development', slug: 'mobile-app-development' },
  { name: '03. Desktop & Enterprise Software', slug: 'desktop-enterprise-software' },
  { name: '04. Artificial Intelligence & ML', slug: 'ai-machine-learning' },
  { name: '05. Automation & Integrations', slug: 'automation-system-integrations' },
  { name: '06. Digital Marketing & SEO', slug: 'digital-marketing' },
  { name: '07. Graphic Design & Branding', slug: 'graphic-design-branding' },
  { name: '08. Cloud Computing & DevOps', slug: 'cloud-computing-devops' },
  { name: '09. Cybersecurity & IT Consulting', slug: 'cybersecurity-it-consulting' },
  { name: '10. Data Engineering & Analytics', slug: 'data-engineering-analytics' },
  { name: '11. QA & Software Testing', slug: 'qa-software-testing' },
  { name: '12. IT Support & Maintenance', slug: 'it-support-maintenance' },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800/80">
          {/* Column 1: Brand & Global Hubs */}
          <div className="lg:col-span-2 space-y-4 pr-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs tracking-tighter">
                TSN
              </span>
              <span>Tech Solution Nepal</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Full-service enterprise technology consultancy and engineering group based in Kathmandu, Nepal. We architect, build, and govern mission-critical web platforms, native mobile apps, AI retrieval systems, sovereign cloud infrastructure, and zero-trust security programs.
            </p>
            <div className="pt-2 space-y-1 text-xs text-slate-400">
              <p>Kathmandu (HQ) · Sydney · London · New York</p>
              <p>
                ISO/IEC 27001:2022 Certified · SOC 2 Type II Audited · HIPAA Compliant
              </p>
              <p className="pt-1 text-slate-300 font-mono tabular-nums">
                +977 1 4429810 · contact@techsolutionnepal.com
              </p>
            </div>
          </div>

          {/* Column 2: Practice Areas (01-06) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white tracking-wide">
              Practice Areas (01–06)
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {FOOTER_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/services/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Practice Areas (07-12) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white tracking-wide">
              Practice Areas (07–12)
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {FOOTER_CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/services/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company, Proof & Governance */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white tracking-wide">
              Organization &amp; Governance
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/mission-vision" className="hover:text-white transition-colors">
                  Mission &amp; Vision
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Leadership &amp; Principal Team
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-white transition-colors">
                  Our Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Portfolio &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Engineering Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers &amp; Open Roles
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Global Search
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Admin CMS &amp; Lead Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Tech Solution Nepal Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="hover:text-slate-300 transition-colors">
              Accessibility (WCAG 2.2 AA)
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">
              XML Sitemap
            </Link>
            <Link href="/api/v1/openapi" className="hover:text-slate-300 transition-colors">
              OpenAPI v1 Spec
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
