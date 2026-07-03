'use client';

import { Search, MapPin, Star } from 'lucide-react';

interface HeroProps {
  selectedLocation: string;
  onChangeLocation: () => void;
}

export function Hero({ selectedLocation, onChangeLocation }: HeroProps) {
  // Unsplash images for overlapping customer avatars
  const customerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
  ];

  return (
    <section className="relative bg-linear-to-b from-white to-[#FDFBF7] pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left Side: Copy and Search Form */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#0B2545] leading-tight select-none">
            Choose Experts <br className="hidden sm:inline" />
            to Complete Your <br />
            <span className="relative text-[#EE5E36] inline-block mr-2 mt-1">
              Job
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/banner-title-shape.png"
                alt="wavy line highlight"
                className="absolute left-0 bottom-[-8px] w-full object-contain pointer-events-none select-none"
              />
            </span>
            Done
          </h1>

          <p className="text-gray-500 text-base sm:text-lg max-w-xl mt-6 mb-8 leading-relaxed">
            Explore our marketplace to find top-rated professionals in your area. Compare reviews,
            check availability, and book services with confidence—all in one place.
          </p>

          {/* Search bar wrapper */}
          <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 p-2.5 gap-3 max-w-2xl w-full mb-10 group focus-within:border-[#EE5E36] transition-all">
            {/* Location selector toggle button inside search */}
            <button
              type="button"
              onClick={onChangeLocation}
              className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#FFFBF9] hover:bg-[#FFF4F0] text-gray-700 hover:text-[#EE5E36] rounded-xl border border-[#EE5E36]/10 transition-colors shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EE5E36]" />
                <span className="font-bold text-sm tracking-wide">{selectedLocation}</span>
              </div>
            </button>

            {/* Input field */}
            <div className="flex-1 w-full relative">
              <input
                type="text"
                placeholder="Find your service here"
                className="w-full px-3 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base font-medium"
              />
            </div>

            {/* Square search button */}
            <button
              type="button"
              className="w-full sm:w-auto p-4 bg-[#EE5E36] hover:bg-[#0B2545] text-white rounded-xl active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md shadow-[#EE5E36]/15"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Social Proof */}
          <div className="flex items-center gap-4 border-t border-gray-100 pt-6 max-w-md">
            <div className="flex -space-x-3 overflow-hidden">
              {customerAvatars.map((src, index) => (
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
                2k+ Customers
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                Satisfied with Servat services
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Larger visual column without height constraints */}
        <div className="lg:col-span-7 relative w-full max-w-[540px] lg:mr-0 lg:ml-auto mx-auto flex items-center justify-center mt-10 lg:mt-0 select-none">
          {/* Main Visual Image container (renders the baked hexagon, background and outlines) */}
          <div className="relative w-full flex items-center justify-center z-10 transition-transform duration-500 hover:scale-[1.01]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner-girl-1.png"
              alt="Servat service provider cleaner"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* Floating Asset: Left Spray cleaner bottle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cleaner.png"
            alt="floating spray bottle"
            className="absolute left-[5px] sm:left-[-15px] top-[40%] z-20 w-12 sm:w-16 h-auto pointer-events-none animate-float-slow"
          />

          {/* Floating Asset: Wavy line shape positioned behind spray bottle for mockup consistency */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/banner-line-shape.png"
            alt="floating wavy line shape"
            className="absolute left-[35px] top-[30%] z-0 w-16 sm:w-20 object-contain pointer-events-none select-none opacity-80"
          />

          {/* Floating Card: Cleaning Reviews */}
          <div className="absolute bottom-[8%] left-[-15px] sm:left-[-35px] z-20 bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100/50 p-4 pb-6 min-w-[210px] sm:min-w-[230px] animate-float-slow select-none overflow-hidden">
            <h4 className="font-bold text-[#0B2545] text-sm mb-1.5">Cleaning Reviews</h4>
            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <span className="text-[#0B2545] font-extrabold text-[13px] ml-1">5.0 Great</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mt-2 pt-2 border-t border-gray-50">
              <span>400+ More</span>
              <span className="text-[#EE5E36] bg-[#FFF4F0] px-2 py-0.5 rounded-full font-bold">
                1day Ago
              </span>
            </div>

            {/* Custom decorative blue wave shape at bottom */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cleaning-shape.png"
              alt="blue wave curve shape"
              className="absolute bottom-0 left-0 w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
