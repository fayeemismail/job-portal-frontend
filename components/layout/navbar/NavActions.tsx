'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { CONTACT_CONFIG, AUTH_CONFIG } from './constants';

export function NavActions() {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      {/* Phone Contact */}
      <a
        href={CONTACT_CONFIG.href}
        className="flex items-center gap-2 text-[#0B2545] hover:text-[#EE5E36] transition-colors duration-300 cursor-pointer group"
      >
        <Phone className="w-4 h-4 text-[#EE5E36] group-hover:animate-pulse" />
        <span className="text-[15px] font-semibold select-none">{CONTACT_CONFIG.phone}</span>
      </a>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-3">
        <Link
          href={AUTH_CONFIG.signInHref}
          className="group relative overflow-hidden px-6 py-2.5 text-[15px] font-semibold text-[#0B2545] hover:text-white border border-[#0B2545]/20 hover:border-[#0B2545] rounded-lg transition-colors duration-300"
        >
          <span className="relative z-10">{AUTH_CONFIG.signInLabel}</span>
          <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
        </Link>
        <Link
          href={AUTH_CONFIG.signUpHref}
          className="group relative overflow-hidden px-6 py-2.5 text-[15px] font-semibold text-white bg-[#EE5E36] rounded-lg active:scale-95 shadow-md shadow-[#EE5E36]/10 hover:shadow-[#0B2545]/20 transition-all duration-300"
        >
          <span className="relative z-10">{AUTH_CONFIG.signUpLabel}</span>
          <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
        </Link>
      </div>
    </div>
  );
}
