'use client';

import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_HEADER } from './constants';

export function CategoryHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          {/* Category double chevron badge icon */}
          <div className="flex items-center justify-center bg-[#FFF4F0] p-1.5 rounded-lg border border-[#EE5E36]/10">
            <svg
              className="w-3.5 h-3.5 text-[#EE5E36]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-[#EE5E36] tracking-[2.5px] uppercase">
            {CATEGORIES_HEADER.badgeLabel}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#0B2545] leading-tight">
          {CATEGORIES_HEADER.headingText}
        </h2>
      </div>

      <button
        type="button"
        className="w-fit px-6 py-4 bg-[#EE5E36] hover:bg-[#0B2545] text-white font-bold text-sm tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md shadow-[#EE5E36]/15 hover:shadow-lg"
      >
        <span>{CATEGORIES_HEADER.buttonLabel}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
