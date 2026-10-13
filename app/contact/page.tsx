import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getStore, getServices } from '@/lib/db/store';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us & Global Offices | Tech Solution Nepal',
  description:
    'Contact Tech Solution Nepal in New York, Zurich, London, and Singapore for enterprise software architecture, AI systems, cloud DevOps, and security inquiries.',
};

export default function ContactPage() {
  const settings = getStore().siteSettings;
  const services = getServices();

  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact Us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
              GLOBAL CLIENT ADVISORY · &lt; 1 BUSINESS DAY SLA
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Connect with our Principal Systems Architects.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether you are scoping a new platform build, requesting a white-box security audit, or evaluating an M&amp;A technology asset, our leadership team responds within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">
                Direct Communication Channels
              </h2>
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">
                    New Project &amp; Architecture Inquiries
                  </span>
                  <span className="font-mono font-bold text-slate-950 text-sm">
                    {settings.primaryEmail}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block">
                    Security &amp; SOC 2 / ISO 27001 Trust Desk
                  </span>
                  <span className="font-mono font-bold text-slate-950 text-sm">
                    {settings.securityEmail}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block">
                    Global Switchboard
                  </span>
                  <span className="font-mono tabular-nums font-bold text-slate-950 text-sm">
                    {settings.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950">
                Global Engineering Hubs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settings.regionalOffices.map((off) => (
                  <div
                    key={off.city}
                    className="p-5 border border-slate-200 rounded-xl space-y-1.5 text-xs"
                  >
                    <p className="font-bold text-slate-950 text-sm">
                      {off.city} ({off.country})
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {off.address}
                    </p>
                    <p className="font-mono tabular-nums text-blue-700 pt-1">
                      {off.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteRequestForm
              defaultType="contact"
              serviceOptions={services.map((s) => ({
                slug: s.slug,
                name: s.name,
                categoryName: s.categoryName,
              }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
