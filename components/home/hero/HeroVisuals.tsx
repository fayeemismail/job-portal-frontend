'use client';

import { Star } from 'lucide-react';
import { HERO_ASSETS, REVIEWS_CONFIG } from './constants';

export function HeroVisuals() {
  return (
    <div className="lg:col-span-5 relative w-full max-w-[540px] lg:mr-0 lg:ml-auto mx-auto flex items-center justify-center mt-10 lg:mt-0 select-none">
      {/* Main Visual Image container (renders the baked hexagon, background and outlines) */}
      <div className="relative w-full flex items-center justify-center z-10 transition-transform duration-500 hover:scale-[1.01]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_ASSETS.girlHexagonVisual}
          alt="Servat service provider cleaner"
          className="w-full h-auto object-contain select-none pointer-events-none"
        />
      </div>

      {/* Floating Asset: Left Spray cleaner bottle */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_ASSETS.sprayBottleFloat}
        alt="floating spray bottle"
        className="absolute left-[5px] sm:left-[-15px] top-[40%] z-20 w-12 sm:w-16 h-auto pointer-events-none animate-float-slow"
      />

      {/* Floating Asset: Wavy line shape positioned behind spray bottle for mockup consistency */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_ASSETS.wavyLineShape}
        alt="floating wavy line shape"
        className="absolute left-[35px] top-[30%] z-0 w-16 sm:w-20 object-contain pointer-events-none select-none opacity-80"
      />

      {/* Floating Card: Cleaning Reviews */}
      <div className="absolute bottom-[8%] left-[-15px] sm:left-[-35px] z-20 bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100/50 p-4 pb-6 min-w-[210px] sm:min-w-[230px] animate-float-slow select-none overflow-hidden">
        <h4 className="font-bold text-[#0B2545] text-sm mb-1.5">{REVIEWS_CONFIG.title}</h4>
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center">
            {[...Array(REVIEWS_CONFIG.stars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
            ))}
          </div>
          <span className="text-[#0B2545] font-extrabold text-[13px] ml-1">
            {REVIEWS_CONFIG.scoreLabel}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mt-2 pt-2 border-t border-gray-50">
          <span>{REVIEWS_CONFIG.footerCountLabel}</span>
          <span className="text-[#EE5E36] bg-[#FFF4F0] px-2 py-0.5 rounded-full font-bold">
            {REVIEWS_CONFIG.dateLabel}
          </span>
        </div>

        {/* Custom decorative blue wave shape at bottom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_ASSETS.cardWaveShape}
          alt="blue wave curve shape"
          className="absolute bottom-0 left-0 w-full h-auto object-contain pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
