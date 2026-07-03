'use client';

import { HOW_IT_WORKS_STEPS, ARROW_LINE_ASSET } from './constants';

export function HowItWorksGrid() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Connecting Dashed Line (Visible on md screens and up) */}
      <div className="absolute top-[78px] left-[15%] right-[15%] w-[70%] hidden md:block z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ARROW_LINE_ASSET}
          alt="Connecting dashed line"
          className="w-full h-auto object-contain opacity-80"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 relative z-10">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <div key={step.number} className="flex flex-col items-center group">
            {/* Step Number (bottom 15% hidden under the circle, lights up white on hover) */}
            <span
              className="text-[56px] font-black leading-none block font-mono select-none transition-colors duration-300 text-transparent group-hover:text-white z-0 relative mb-[-15px]"
              style={{
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.15)',
              }}
            >
              {step.number}
            </span>

            {/* Step Icon with Outer Dashed Circle (Static size, Orange dashed border by default) */}
            <div className="relative w-[140px] h-[140px] rounded-full border-2 border-dashed border-[#EE5E36] bg-[#0B2545] flex items-center justify-center mb-6 z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.icon}
                alt={step.title}
                className="w-[90px] h-[90px] object-contain pointer-events-none select-none"
              />
            </div>

            {/* Step Title */}
            <h3 className="text-white font-extrabold text-lg sm:text-xl mb-3">{step.title}</h3>

            {/* Step Description */}
            <p className="text-gray-400 text-sm max-w-[260px] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
