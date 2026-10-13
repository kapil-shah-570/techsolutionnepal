'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export function JobApplicationForm({
  jobSlug,
  jobTitle,
}: {
  jobSlug: string;
  jobTitle: string;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinOrPortfolio, setLinkedinOrPortfolio] = useState('');
  const [yearsExperience, setYearsExperience] = useState('8');
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/v1/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobSlug,
          jobTitle,
          fullName,
          email,
          phone,
          linkedinOrPortfolio,
          yearsExperience: Number(yearsExperience),
          coverNote,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || 'Please verify your application details.');
      } else {
        setSubmittedMsg(json.message);
      }
    } catch {
      setError('Network error submitting application.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedMsg) {
    return (
      <div className="p-6 bg-slate-900 text-white rounded-xl space-y-3 border border-slate-800">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-mono tabular-nums font-semibold">
            APPLICATION LOGGED IN TALENT PIPELINE
          </span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{submittedMsg}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-4"
    >
      <h3 className="text-lg font-bold text-slate-950">
        Apply for {jobTitle}
      </h3>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-800 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Alex Rivera"
          className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@domain.com"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 234-5678"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            GitHub / LinkedIn / Architecture Portfolio URL *
          </label>
          <input
            type="text"
            required
            value={linkedinOrPortfolio}
            onChange={(e) => setLinkedinOrPortfolio(e.target.value)}
            placeholder="https://github.com/username"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            Years of Production Experience *
          </label>
          <input
            type="number"
            min={0}
            max={50}
            required
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono tabular-nums"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-800 mb-1">
          Architectural Experience &amp; Cover Note (Min 20 chars) *
        </label>
        <textarea
          rows={4}
          required
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          placeholder="Briefly describe the most complex distributed system, mobile application, or AI pipeline you have architected in production..."
          className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
      >
        <span>
          {submitting ? 'Submitting Application...' : 'Submit Engineering Application'}
        </span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
