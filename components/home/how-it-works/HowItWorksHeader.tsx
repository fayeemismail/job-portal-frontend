'use client';

import { HOW_IT_WORKS_HEADER } from './constants';

export function HowItWorksHeader() {
  return (
    <div className="flex flex-col items-center mb-16 relative z-10">
      <span className="text-[#EE5E36] font-extrabold text-xs sm:text-sm tracking-[2.5px] uppercase mb-4 flex items-center gap-2 justify-center">
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
        <span>{HOW_IT_WORKS_HEADER.badgeLabel}</span>
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-white leading-tight mb-4">
        {HOW_IT_WORKS_HEADER.headingText}
      </h2>
      <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
        {HOW_IT_WORKS_HEADER.descriptionText}
      </p>
    </div>
  );
}
