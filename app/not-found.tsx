import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <div className="max-w-2xl space-y-6">
        <p className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
          HTTP 404 · RESOURCE NOT LOCATED
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          The requested page or architectural resource has moved or does not exist.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          If you followed a legacy bookmark, explore our 12 enterprise service categories, search our technical knowledge base, or return to the homepage.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <span>Browse All 12 Service Categories</span>
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
