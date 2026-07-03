'use client';

import { HowItWorksHeader } from './how-it-works/HowItWorksHeader';
import { HowItWorksGrid } from './how-it-works/HowItWorksGrid';

export function HowItWorks() {
  return (
    <section className="bg-white pb-16 md:pb-24 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[#0B2545] rounded-[2.5rem] px-6 py-16 md:py-20 lg:py-24 text-center relative overflow-hidden">
          {/* Section Header */}
          <HowItWorksHeader />

          {/* Grid Layout for Steps */}
          <HowItWorksGrid />
        </div>
      </div>
    </section>
  );
}
