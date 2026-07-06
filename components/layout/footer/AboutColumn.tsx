'use client';

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { FOOTER_ABOUT } from './constants';

export function AboutColumn() {
  const [lang, setLang] = useState('en');
  const [curr, setCurr] = useState('USD');
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);

  return (
    <div className="flex flex-col max-w-[280px]">
      <h3 className="text-[#0B2545] font-extrabold text-lg mb-4">{FOOTER_ABOUT.title}</h3>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">{FOOTER_ABOUT.description}</p>

      <h4 className="text-[#0B2545] font-extrabold text-sm mb-4">{FOOTER_ABOUT.languageLabel}</h4>
      <div className="flex items-center gap-3">
        {/* Custom Language Selector */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="w-full pl-8 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 text-left appearance-none cursor-pointer focus:outline-hidden focus:border-[#EE5E36] transition-colors flex items-center justify-between select-none"
          >
            <span>{FOOTER_ABOUT.languages.find((l) => l.code === lang)?.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {langOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
              <div className="absolute bottom-full mb-1 left-0 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1 overflow-hidden animate-in fade-in duration-200">
                {FOOTER_ABOUT.languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${
                      lang === l.code
                        ? 'bg-[#FFF4F0] text-[#EE5E36]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Custom Currency Selector */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setCurrOpen(!currOpen)}
            className="w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 text-left appearance-none cursor-pointer focus:outline-hidden focus:border-[#EE5E36] transition-colors flex items-center justify-between select-none"
          >
            <span>{FOOTER_ABOUT.currencies.find((c) => c.code === curr)?.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          {currOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setCurrOpen(false)} />
              <div className="absolute bottom-full mb-1 right-0 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1 overflow-hidden animate-in fade-in duration-200">
                {FOOTER_ABOUT.currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurr(c.code);
                      setCurrOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${
                      curr === c.code
                        ? 'bg-[#FFF4F0] text-[#EE5E36]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
