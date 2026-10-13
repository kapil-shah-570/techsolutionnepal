'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CustomFormField } from '@/lib/types';

interface QuoteRequestFormProps {
  defaultType?: 'quote' | 'contact' | 'consultation';
  defaultCategorySlug?: string;
  defaultServiceSlug?: string;
  defaultServiceName?: string;
  customFields?: CustomFormField[];
  serviceOptions?: { slug: string; name: string; categoryName: string }[];
  compact?: boolean;
}

const BUDGET_RANGES = [
  '$35,000 – $75,000 (Architecture / MVP / Security Audit)',
  '$75,000 – $150,000 (Full-Scale Production Platform)',
  '$150,000 – $300,000+ (Multi-System Enterprise Transformation)',
  '$28,000 – $48,000 / mo (Dedicated Engineering Pod)',
];

const TIMELINES = [
  'Immediate Mobilization (Within 2 Weeks)',
  'Q1 / Q2 Planned Initiative (4–8 Weeks)',
  'Multi-Quarter Roadmap Discovery',
];

export function QuoteRequestForm({
  defaultType = 'quote',
  defaultCategorySlug = '',
  defaultServiceSlug = '',
  defaultServiceName = '',
  customFields = [],
  serviceOptions = [],
  compact = false,
}: QuoteRequestFormProps) {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyRole, setCompanyRole] = useState('');
  const [selectedServiceSlug, setSelectedServiceSlug] =
    useState(defaultServiceSlug);
  const [budgetRange, setBudgetRange] = useState(BUDGET_RANGES[1]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    'Email' | 'Video Call' | 'Phone'
  >('Video Call');
  const [projectDescription, setProjectDescription] = useState('');
  const [customResponses, setCustomResponses] = useState<
    Record<string, string>
  >({});
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    referenceCode: string;
    message: string;
    serviceName: string;
    duplicateDetected: boolean;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const matchedOption = serviceOptions.find(
        (o) => o.slug === selectedServiceSlug
      );

      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: defaultType,
          fullName,
          businessEmail,
          phone,
          companyName,
          companyRole,
          categorySlug: defaultCategorySlug,
          serviceSlug: selectedServiceSlug || defaultServiceSlug,
          serviceName:
            matchedOption?.name ||
            defaultServiceName ||
            'Enterprise Architecture & Engineering',
          budgetRange,
          timeline,
          preferredContactMethod,
          projectDescription,
          customFieldResponses: customResponses,
          consentAccepted,
          honeypot,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(
          json.error || 'Please verify all required fields and try again.'
        );
      } else {
        setReceipt({
          referenceCode: json.data.referenceCode,
          message: json.message,
          serviceName: json.data.serviceName,
          duplicateDetected: Boolean(json.duplicateDetected),
        });
      }
    } catch {
      setErrorMsg('Network error submitting inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    return (
      <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-8 space-y-5">
        <div className="flex items-start gap-3.5">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-mono tabular-nums text-emerald-400">
              INQUIRY LOGGED · REFERENCE {receipt.referenceCode}
            </p>
            <h3 className="text-xl font-bold text-white">
              {receipt.duplicateDetected
                ? 'Existing Inquiry Located in Triage Queue'
                : 'Your Architecture & Proposal Request Is Confirmed'}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {receipt.message}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block">Reference ID</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {receipt.referenceCode}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Selected Practice</span>
            <span className="font-semibold text-white">
              {receipt.serviceName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">SLA Response Window</span>
            <span className="font-semibold text-white">
              &lt; 1 Business Day (Principal Architect)
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setReceipt(null);
              setProjectDescription('');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Submit Another Project Scope
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5"
      noValidate
    >
      {/* Hidden Honeypot Trap for Spam Protection */}
      <input
        type="text"
        name="company_website_honeypot"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="quote-fullname"
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="quote-fullname"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Dr. Sarah Chen"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="quote-email"
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Work Email *
          </label>
          <input
            id="quote-email"
            type="email"
            required
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            placeholder="s.chen@enterprise.com"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="quote-company"
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Company / Organization *
          </label>
          <input
            id="quote-company"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Meridian Financial Group"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="quote-role"
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Your Role / Title
          </label>
          <input
            id="quote-role"
            type="text"
            value={companyRole}
            onChange={(e) => setCompanyRole(e.target.value)}
            placeholder="CTO / VP of Engineering"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="quote-phone"
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Direct Phone (Optional)
          </label>
          <input
            id="quote-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (212) 555-0199"
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
          />
        </div>
      </div>

      {serviceOptions.length > 0 && (
        <div>
          <label
            htmlFor="quote-service"
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Primary Service or Practice Area
          </label>
          <select
            id="quote-service"
            value={selectedServiceSlug}
            onChange={(e) => setSelectedServiceSlug(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
          >
            <option value="">General Multi-Disciplinary Architecture Advisory</option>
            {serviceOptions.map((srv) => (
              <option key={srv.slug} value={srv.slug}>
                {srv.categoryName} — {srv.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="quote-budget"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Estimated Budget Range *
            </label>
            <select
              id="quote-budget"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            >
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quote-timeline"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Target Delivery Timeline *
            </label>
            <select
              id="quote-timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            >
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quote-contact-method"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Preferred Consultation Format
            </label>
            <select
              id="quote-contact-method"
              value={preferredContactMethod}
              onChange={(e) =>
                setPreferredContactMethod(
                  e.target.value as 'Email' | 'Video Call' | 'Phone'
                )
              }
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
            >
              <option value="Video Call">Architecture Video Call (Zoom / Meet)</option>
              <option value="Email">Written Technical Proposal via Email</option>
              <option value="Phone">Direct Executive Phone Briefing</option>
            </select>
          </div>
        </div>
      )}

      {/* Dynamic Service-Specific Custom Fields configured in CMS */}
      {customFields.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {customFields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={`custom-${field.id}`}
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                {field.label} {field.required ? '*' : ''}
              </label>
              {field.type === 'select' && field.options ? (
                <select
                  id={`custom-${field.id}`}
                  value={customResponses[field.id] || ''}
                  onChange={(e) =>
                    setCustomResponses((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
                >
                  <option value="">Select an option...</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`custom-${field.id}`}
                  type="text"
                  value={customResponses[field.id] || ''}
                  onChange={(e) =>
                    setCustomResponses((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  placeholder={field.placeholder || ''}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        <label
          htmlFor="quote-description"
          className="block text-xs font-semibold text-slate-800 mb-1.5"
        >
          Architectural Objectives, Scope &amp; Key Challenges (Min 20 characters) *
        </label>
        <textarea
          id="quote-description"
          rows={4}
          required
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Describe your target system architecture, integration requirements, performance goals, or compliance constraints..."
          className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white"
        />
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="quote-consent"
          type="checkbox"
          checked={consentAccepted}
          onChange={(e) => setConsentAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
        />
        <label htmlFor="quote-consent" className="text-xs text-slate-600 leading-relaxed">
          I consent to Tech Solution Nepal processing this inquiry under our mutual non-disclosure standards and{' '}
          <a href="/privacy" className="underline text-slate-900">
            Privacy Policy
          </a>
          . All submissions are encrypted and routed directly to a Principal Architect.
        </label>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Protected by Mutual NDA upon request · ISO 27001 Audited</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <span>
            {submitting
              ? 'Encrypting & Submitting Scope...'
              : 'Submit Scope & Request Proposal'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
