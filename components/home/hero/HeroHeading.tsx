'use client';

import { HERO_COPY, HERO_ASSETS } from './constants';

export function HeroHeading() {
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#0B2545] leading-tight select-none">
      {HERO_COPY.headingLine1} <br className="hidden sm:inline" />
      <span className="whitespace-nowrap">{HERO_COPY.headingLine2}</span> <br />
      <span className="whitespace-nowrap">
        <span className="relative text-[#EE5E36] inline-block mr-2 mt-1">
          {HERO_COPY.highlightText}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_ASSETS.titleHighlightShape}
            alt="wavy line highlight"
            className="absolute left-0 bottom-[-8px] w-full object-contain pointer-events-none select-none"
          />
        </span>
        {HERO_COPY.headingLine3Suffix}
      </span>
    </h1>
  );
}
