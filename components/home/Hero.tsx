'use client';

import { HeroProps } from './hero/types';
import { HERO_COPY, HERO_ASSETS } from './hero/constants';
import { HeroHeading } from './hero/HeroHeading';
import { HeroSearch } from './hero/HeroSearch';
import { HeroSocialProof } from './hero/HeroSocialProof';
import { HeroVisuals } from './hero/HeroVisuals';

export function Hero({ selectedLocation, onChangeLocation }: HeroProps) {
  return (
    <section
      className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${HERO_ASSETS.bgImage}')` }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Copy and Search Form */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Main heading lines */}
          <HeroHeading />

          {/* Subtext description */}
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mt-6 mb-8 leading-relaxed">
            {HERO_COPY.description}
          </p>

          {/* Interactive Search location bar */}
          <HeroSearch selectedLocation={selectedLocation} onChangeLocation={onChangeLocation} />

          {/* Satisfied Customer Social Proof */}
          <HeroSocialProof />
        </div>

        {/* Right Side: Showcase hex image and floating card reviews */}
        <HeroVisuals />
      </div>
    </section>
  );
}
