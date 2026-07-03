'use client';

import { X } from 'lucide-react';
import { BANNER_CONFIG } from './constants';

interface TopBannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopBanner({ isOpen, onClose }: TopBannerProps) {
  return (
    <div
      className={`bg-[#262626] text-white flex items-center justify-between px-4 sm:px-8 lg:px-12 overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen
          ? 'h-14 opacity-100 border-b border-gray-800'
          : 'h-0 opacity-0 border-b-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1.5 select-none">
        <span className="font-bold text-white tracking-tight text-[17px]">
          {BANNER_CONFIG.primaryText}
        </span>
        <span className="text-[#82b440] font-semibold text-[17px]">
          {BANNER_CONFIG.secondaryText}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={BANNER_CONFIG.buyNowUrl}
          className="group relative overflow-hidden bg-[#82b440] text-white text-xs font-semibold px-4 py-2 rounded-[4px] shadow-sm active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10">{BANNER_CONFIG.buyNowLabel}</span>
          <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
        </a>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 transition-colors duration-200 cursor-pointer"
          aria-label={BANNER_CONFIG.closeAriaLabel}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
