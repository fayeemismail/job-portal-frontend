'use client';

import { CUSTOMER_AVATARS, SOCIAL_PROOF_CONFIG } from './constants';

export function HeroSocialProof() {
  return (
    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 max-w-md">
      <div className="flex -space-x-3 overflow-hidden">
        {CUSTOMER_AVATARS.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={src}
            alt={`Customer avatar ${index + 1}`}
            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-xs"
          />
        ))}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[#0B2545] text-base leading-tight">
          {SOCIAL_PROOF_CONFIG.customerCount}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 font-medium">
          {SOCIAL_PROOF_CONFIG.satisfactionLabel}
        </span>
      </div>
    </div>
  );
}
