'use client';

import { Globe, ChevronDown } from 'lucide-react';
import { FOOTER_ABOUT } from './constants';

export function AboutColumn() {
  return (
    <div className="flex flex-col max-w-[280px]">
      <h3 className="text-[#0B2545] font-extrabold text-lg mb-4">About us</h3>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">{FOOTER_ABOUT.description}</p>

      <h4 className="text-[#0B2545] font-extrabold text-sm mb-4">Language & Currency</h4>
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative flex-1">
          <select
            defaultValue="en"
            className="w-full pl-8 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 appearance-none cursor-pointer focus:outline-hidden focus:border-[#EE5E36] transition-colors"
          >
            {FOOTER_ABOUT.languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Currency Selector */}
        <div className="relative flex-1">
          <select
            defaultValue="USD"
            className="w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 appearance-none cursor-pointer focus:outline-hidden focus:border-[#EE5E36] transition-colors"
          >
            {FOOTER_ABOUT.currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
