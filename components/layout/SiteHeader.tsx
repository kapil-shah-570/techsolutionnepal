'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, Search } from 'lucide-react';

const SERVICE_MENU_GROUPS = [
  {
    number: '01',
    name: 'Web Development',
    slug: 'web-development',
    items: [
      { name: 'Next.js & React Web Apps', slug: 'nextjs-web-applications' },
      { name: 'Composable E-Commerce', slug: 'ecommerce-platforms' },
      { name: 'Multi-Tenant SaaS Engineering', slug: 'multi-tenant-saas-engineering' },
    ],
  },
  {
    number: '02',
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    items: [
      { name: 'Native iOS (Swift & SwiftUI)', slug: 'ios-app-development' },
      { name: 'Native Android (Kotlin)', slug: 'android-app-development' },
      { name: 'Flutter Cross-Platform', slug: 'flutter-cross-platform-apps' },
    ],
  },
  {
    number: '03',
    name: 'Desktop & Enterprise ERP',
    slug: 'desktop-enterprise-software',
    items: [
      { name: 'Windows & macOS Workstations', slug: 'windows-macos-desktop-applications' },
      { name: 'Legacy ERP Modernization', slug: 'legacy-erp-modernization' },
    ],
  },
  {
    number: '04',
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    items: [
      { name: 'Enterprise LLM & RAG Systems', slug: 'llm-rag-systems' },
      { name: 'Custom AI & Fine-Tuning', slug: 'custom-ai-models-fine-tuning' },
      { name: 'Autonomous AI Agents', slug: 'ai-conversational-agents' },
      { name: 'Predictive Analytics', slug: 'predictive-analytics-forecasting' },
    ],
  },
  {
    number: '05',
    name: 'Automation & Integrations',
    slug: 'automation-system-integrations',
    items: [
      { name: 'Business Workflow Automation', slug: 'business-workflow-automation' },
      { name: 'API, ERP & CRM Integrations', slug: 'api-erp-crm-integrations' },
    ],
  },
  {
    number: '06',
    name: 'Digital Marketing & SEO',
    slug: 'digital-marketing',
    items: [
      { name: 'Technical SEO Engineering', slug: 'technical-seo-organic-growth' },
      { name: 'Google Ads & Paid Acquisition', slug: 'google-ads-paid-acquisition' },
      { name: 'Executive Content & Social', slug: 'social-media-content-marketing' },
    ],
  },
  {
    number: '07',
    name: 'Design & Brand Systems',
    slug: 'graphic-design-branding',
    items: [
      { name: 'Brand Identity & Design Systems', slug: 'brand-identity-design-systems' },
      { name: 'Enterprise Product UI/UX', slug: 'product-ui-ux-design' },
    ],
  },
  {
    number: '08',
    name: 'Cloud Computing & DevOps',
    slug: 'cloud-computing-devops',
    items: [
      { name: 'AWS, GCP & Multi-Cloud', slug: 'aws-gcp-cloud-architecture' },
      { name: 'Kubernetes & GitOps CI/CD', slug: 'kubernetes-cicd-pipelines' },
    ],
  },
  {
    number: '09',
    name: 'Cybersecurity & Consulting',
    slug: 'cybersecurity-it-consulting',
    items: [
      { name: 'Security Audits & Pen Testing', slug: 'security-audits-penetration-testing' },
      { name: 'IT Strategy & M&A Advisory', slug: 'it-strategy-fractional-cto' },
    ],
  },
  {
    number: '10',
    name: 'Data Engineering & BI',
    slug: 'data-engineering-analytics',
    items: [
      { name: 'Data Lakehouses & Streaming ETL', slug: 'modern-data-warehousing-pipelines' },
      { name: 'Executive BI & Telemetry', slug: 'bi-dashboards-executive-analytics' },
    ],
  },
  {
    number: '11',
    name: 'QA & Software Testing',
    slug: 'qa-software-testing',
    items: [
      { name: 'Automated Playwright & API QA', slug: 'automated-e2e-api-testing' },
      { name: 'Load Testing & WCAG Audits', slug: 'performance-load-accessibility-testing' },
    ],
  },
  {
    number: '12',
    name: 'IT Support & Maintenance',
    slug: 'it-support-maintenance',
    items: [
      { name: '24/7 Managed SRE & SLA Support', slug: 'managed-sre-application-support' },
      { name: 'Database Administration (DBA)', slug: 'database-administration-optimization' },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [activeDrawer, setActiveDrawer] = useState<'services' | 'company' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuGroups, setMenuGroups] = useState(SERVICE_MENU_GROUPS);

  React.useEffect(() => {
    let active = true;
    fetch('/api/v1/navigation')
      .then((r) => r.json())
      .then((json) => {
        if (active && json?.success && Array.isArray(json.data?.menuGroups)) {
          setMenuGroups(json.data.menuGroups);
        }
      })
      .catch(() => {
        // Keep static initial fallback
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  // Hide public header inside the isolated Admin CMS workspace
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200"
      onMouseLeave={() => setActiveDrawer(null)}
    >
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="max-w-[1440px] mx-auto flex items-center justify-between gap-8 px-6 lg:px-10 h-16">
        {/* Zone 1: Single text element wordmark */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0 flex items-center gap-2"
          onClick={() => {
            setActiveDrawer(null);
            setMobileOpen(false);
          }}
        >
          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs tracking-tighter">
            TSN
          </span>
          <span>Tech Solution Nepal</span>
        </Link>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() =>
              setActiveDrawer(activeDrawer === 'services' ? null : 'services')
            }
            onMouseEnter={() => setActiveDrawer('services')}
            aria-expanded={activeDrawer === 'services'}
            className={`inline-flex items-center gap-1 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              pathname?.startsWith('/services') || activeDrawer === 'services'
                ? 'border-blue-700 text-slate-950'
                : 'border-transparent'
            }`}
          >
            <span>Services</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/projects"
            onClick={() => setActiveDrawer(null)}
            className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              pathname?.startsWith('/projects') || pathname?.startsWith('/case-studies')
                ? 'border-blue-700 text-slate-950'
                : 'border-transparent'
            }`}
          >
            Case Studies
          </Link>

          <Link
            href="/industries"
            onClick={() => setActiveDrawer(null)}
            className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              pathname?.startsWith('/industries')
                ? 'border-blue-700 text-slate-950'
                : 'border-transparent'
            }`}
          >
            Industries
          </Link>

          <button
            type="button"
            onClick={() =>
              setActiveDrawer(activeDrawer === 'company' ? null : 'company')
            }
            onMouseEnter={() => setActiveDrawer('company')}
            aria-expanded={activeDrawer === 'company'}
            className={`inline-flex items-center gap-1 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              ['/about', '/our-story', '/mission-vision', '/team', '/process', '/careers'].some(
                (p) => pathname?.startsWith(p)
              ) || activeDrawer === 'company'
                ? 'border-blue-700 text-slate-950'
                : 'border-transparent'
            }`}
          >
            <span>Company</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/blog"
            onClick={() => setActiveDrawer(null)}
            className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              pathname?.startsWith('/blog')
                ? 'border-blue-700 text-slate-950'
                : 'border-transparent'
            }`}
          >
            Insights
          </Link>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/quote"
            onClick={() => setActiveDrawer(null)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            Request a Quote
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-700 hover:text-slate-950 rounded-lg border border-slate-200"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Services Mega Menu Panel */}
      {activeDrawer === 'services' && (
        <div className="hidden md:block border-t border-slate-200 bg-white shadow-xl">
          <div className="max-w-[1440px] mx-auto px-10 py-8">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  12 Enterprise Practice Areas &amp; 27 Specialized Capabilities
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Database-driven service architecture from discovery blueprints to 24/7 managed SRE.
                </p>
              </div>
              <div className="flex items-center gap-6 text-xs font-semibold">
                <Link
                  href="/services"
                  onClick={() => setActiveDrawer(null)}
                  className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 whitespace-nowrap"
                >
                  <span>Explore All 12 Service Categories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/search"
                  onClick={() => setActiveDrawer(null)}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 whitespace-nowrap"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Capabilities</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-x-8 gap-y-6">
              {menuGroups.map((group) => (
                <div key={group.slug} className="space-y-2">
                  <Link
                    href={`/services/${group.slug}`}
                    onClick={() => setActiveDrawer(null)}
                    className="block text-xs font-bold text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    {group.number}. {group.name}
                  </Link>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/services/${group.slug}/${item.slug}`}
                          onClick={() => setActiveDrawer(null)}
                          className="block text-xs text-slate-600 hover:text-slate-950 transition-colors py-0.5"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Company & Platform Mega Menu Panel */}
      {activeDrawer === 'company' && (
        <div className="hidden md:block border-t border-slate-200 bg-white shadow-xl">
          <div className="max-w-[1440px] mx-auto px-10 py-8 grid grid-cols-4 gap-8">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-900">Organization &amp; Heritage</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <Link href="/about" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    About Tech Solution Nepal
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Our Founding Story &amp; History
                  </Link>
                </li>
                <li>
                  <Link href="/mission-vision" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Mission, Vision &amp; Engineering Charter
                  </Link>
                </li>
                <li>
                  <Link href="/team" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Leadership &amp; Principal Architects
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-900">Delivery &amp; Proof</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <Link href="/process" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Our 4-Stage Delivery Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Executive Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Verified Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-900">Careers &amp; Contact</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <Link href="/careers" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Careers &amp; Open Engineering Roles
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Global Offices &amp; Contact Directory
                  </Link>
                </li>
                <li>
                  <Link href="/quote" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Request an Architecture Quote
                  </Link>
                </li>
                <li>
                  <Link href="/search" onClick={() => setActiveDrawer(null)} className="hover:text-slate-950 block py-0.5">
                    Global Knowledge Search
                  </Link>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Enterprise Admin CMS &amp; Lead Console
                </p>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Manage published services, case studies, blog articles, SEO redirects, RBAC roles, and client quote pipelines.
                </p>
              </div>
              <Link
                href="/admin"
                onClick={() => setActiveDrawer(null)}
                className="mt-4 inline-flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span>Open Admin CMS Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-6 max-h-[80vh] overflow-y-auto space-y-5">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              All Services
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Case Studies
            </Link>
            <Link
              href="/industries"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Industries
            </Link>
            <Link
              href="/process"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Our Process
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              About Us
            </Link>
            <Link
              href="/team"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Our Team
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Insights &amp; Blog
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-900"
            >
              Contact Us
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900 text-white"
            >
              Admin CMS
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-blue-700 rounded-lg"
            >
              Request an Engineering Quote
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
