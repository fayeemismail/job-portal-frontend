'use client';

import { Logo } from '@/components/layout/navbar/Logo';
import { AUTH_SIDEBAR_DATA } from './constants';

interface AuthSidebarProps {
  mode: 'signin' | 'signup';
}

export function AuthSidebar({ mode }: AuthSidebarProps) {
  const data = AUTH_SIDEBAR_DATA[mode];

  return (
    <div className="hidden md:flex md:col-span-5 bg-linear-to-br from-[#0B2545] via-[#0E2F59] to-[#154680] p-10 text-white flex-col justify-between relative overflow-hidden h-full">
      {/* Subtle decorative orb */}
      <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full my-auto text-left">
        {/* Logo */}
        <div className="brightness-0 invert mb-6 -ml-3 text-left">
          <Logo />
        </div>

        <h2 className="text-3xl font-serif font-semibold tracking-wide leading-tight mb-4 text-slate-100">
          {data.title}
        </h2>

        <p className="text-gray-300/80 text-xs font-semibold leading-relaxed max-w-xs mb-10">
          {data.description}
        </p>

        {/* Testimonial Quote */}
        <div className="border-l-2 border-[#EE5E36] pl-5 text-left my-8">
          <p className="text-xs font-medium italic leading-relaxed text-gray-200/90 mb-4">
            &ldquo;{data.testimonial.quote}&rdquo;
          </p>
          <div>
            <h4 className="text-xs font-bold text-white">{data.testimonial.author}</h4>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
              {data.testimonial.role}
            </p>
          </div>

          {/* Star Ratings */}
          <div className="flex gap-0.5 mt-3 text-[#EE5E36]">
            {Array.from({ length: data.testimonial.rating }).map((_, i) => (
              <span key={i} className="text-[10px]">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex justify-between text-left text-[10px] font-bold text-gray-400">
        <div>
          <p className="text-white text-sm font-extrabold">10k+</p>
          <p>Done Bookings</p>
        </div>
        <div>
          <p className="text-white text-sm font-extrabold">4.95★</p>
          <p>Average Rating</p>
        </div>
      </div>
    </div>
  );
}
