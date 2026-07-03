'use client';

import { CATEGORIES_LIST } from './constants';

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {CATEGORIES_LIST.map((cat) => (
        <div
          key={cat.id}
          className="group relative rounded-3xl border border-[#FFE8DF] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-400 hover-slide shadow-xs bg-white hover:shadow-xl hover:border-[#EE5E36]"
        >
          {/* Illustration circular container */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#FFF6F0] mb-6 group-hover:bg-white transition-all duration-400 z-10">
            {cat.icon}
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-[#0B2545] text-lg mb-1 transition-colors duration-400 z-10">
            {cat.title}
          </h3>

          {/* Subtext Providers Count */}
          <span className="text-xs sm:text-sm text-gray-500 font-semibold transition-colors duration-400 z-10">
            {cat.providersCount}
          </span>
        </div>
      ))}
    </div>
  );
}
