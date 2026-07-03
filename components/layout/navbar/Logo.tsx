'use client';

import Link from 'next/link';
import { LOGO_CONFIG } from './constants';

interface LogoProps {
  isCompact?: boolean;
}

export function Logo({ isCompact = false }: LogoProps) {
  return (
    <div className="shrink-0 flex items-center">
      <Link href={LOGO_CONFIG.href} className="flex items-center gap-2 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_CONFIG.src}
          alt={LOGO_CONFIG.alt}
          className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] ${
            isCompact ? 'h-[56px]' : 'h-[80px]'
          }`}
        />
      </Link>
    </div>
  );
}
