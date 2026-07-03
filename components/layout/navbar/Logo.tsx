'use client';

import Link from 'next/link';
import { LOGO_CONFIG } from './constants';

export function Logo() {
  return (
    <div className="shrink-0 flex items-center">
      <Link href={LOGO_CONFIG.href} className="flex items-center gap-2 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_CONFIG.src}
          alt={LOGO_CONFIG.alt}
          className="h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
    </div>
  );
}
