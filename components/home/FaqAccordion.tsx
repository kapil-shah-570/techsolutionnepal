'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '@/lib/types';

interface FaqAccordionProps {
  faqs: FaqItem[];
  showCategoryFilter?: boolean;
}

export function FaqAccordion({
  faqs,
  showCategoryFilter = false,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  const visibleFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <div className="space-y-6">
      {showCategoryFilter && categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Topics ({faqs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
        {visibleFaqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-6 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums">
                      0{index + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{faq.category}</span>
                  </div>
                  <span className="text-base font-semibold text-slate-950 block">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 mt-1 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-blue-700' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
