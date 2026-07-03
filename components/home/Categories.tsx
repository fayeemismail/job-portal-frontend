'use client';

import { ArrowUpRight } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  providersCount: string;
  icon: React.ReactNode;
}

export function Categories() {
  const categories: Category[] = [
    {
      id: '1',
      title: 'House Cleaning',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Cleaning Bucket & Bubbles */}
          <path
            d="M5 11h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8z"
            className="text-[#3b82f6] transition-colors duration-400"
          />
          <path
            d="M8 11V7a4 4 0 0 1 8 0v4"
            className="text-[#60a5fa] transition-colors duration-400"
          />
          <circle
            cx="17"
            cy="6"
            r="1.5"
            className="fill-[#fbbf24] transition-colors duration-400"
          />
          <circle cx="14" cy="4" r="1" className="fill-[#fbbf24] transition-colors duration-400" />
          <path d="M9 15h6" className="text-white opacity-80 transition-colors duration-400" />
        </svg>
      ),
    },
    {
      id: '2',
      title: 'Electricity Services',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Lightning bulb & Socket plug */}
          <path
            d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .4 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
            className="text-[#f59e0b] transition-colors duration-400"
          />
          <path d="M9 18h6M10 22h4" className="text-[#f59e0b] transition-colors duration-400" />
          <path
            d="M12 5V2L8 6h8l-4 4V7"
            className="fill-[#ef4444] stroke-[#ef4444] transition-colors duration-400"
          />
        </svg>
      ),
    },
    {
      id: '3',
      title: 'Furniture Replace',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Armchair & lamp cabinet */}
          <path d="M4 18v3M20 18v3" className="text-[#84cc16] transition-colors duration-400" />
          <path
            d="M19 14v4H5v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z"
            className="text-[#84cc16] transition-colors duration-400"
          />
          <path d="M12 11V3M9 3h6" className="text-[#a3e635] transition-colors duration-400" />
        </svg>
      ),
    },
    {
      id: '4',
      title: 'Mechanic Zone',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Wheel wrench gear */}
          <circle cx="12" cy="12" r="9" className="text-[#6366f1] transition-colors duration-400" />
          <path d="M12 8v8M8 12h8" className="text-[#818cf8] transition-colors duration-400" />
          <circle cx="12" cy="12" r="3" className="fill-[#6366f1] transition-colors duration-400" />
        </svg>
      ),
    },
    {
      id: '5',
      title: 'Repairman',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Washing Machine & Screwdriver */}
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
            className="text-[#06b6d4] transition-colors duration-400"
          />
          <circle cx="12" cy="13" r="4" className="text-[#22d3ee] transition-colors duration-400" />
          <circle cx="12" cy="6" r="1" className="fill-[#06b6d4] transition-colors duration-400" />
        </svg>
      ),
    },
    {
      id: '6',
      title: 'Plumber Service',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Plumbing Pipe & water drop */}
          <path
            d="M8 3v12a4 4 0 0 0 8 0v-2"
            className="text-[#0ea5e9] transition-colors duration-400"
          />
          <path
            d="M12 7.5a2.5 2.5 0 0 1 5 0c0 2-2.5 4.5-2.5 4.5S12 9.5 12 7.5z"
            className="fill-[#38bdf8] stroke-[#38bdf8] transition-colors duration-400"
          />
        </svg>
      ),
    },
    {
      id: '7',
      title: 'Painter Chaise',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Paint roller & splat */}
          <rect
            x="6"
            y="4"
            width="12"
            height="6"
            rx="1.5"
            className="text-[#ec4899] transition-colors duration-400"
          />
          <path
            d="M12 10v6a2 2 0 0 0 2 2h4"
            className="text-[#f472b6] transition-colors duration-400"
          />
          <path d="M21 7h-2M3 7h2" className="text-[#ec4899] transition-colors duration-400" />
        </svg>
      ),
    },
    {
      id: '8',
      title: 'Carpenter',
      providersCount: '4,982 Providers',
      icon: (
        <svg
          className="w-10 h-10 transition-colors duration-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Carpenter Saw Wood Plank */}
          <path
            d="M6 3h12l3 3-3 3H6a3 3 0 0 1-3-3 3 3 0 0 1 3-3z"
            className="text-[#8b5cf6] transition-colors duration-400"
          />
          <path d="M7 6h4" className="text-[#a78bfa] transition-colors duration-400" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              {/* Category double chevron badge icon */}
              <div className="flex items-center justify-center bg-[#FFF4F0] p-1.5 rounded-lg border border-[#EE5E36]/10">
                <svg
                  className="w-3.5 h-3.5 text-[#EE5E36]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#EE5E36] tracking-[2.5px] uppercase">
                Categories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#0B2545] leading-tight">
              Popular Categories
            </h2>
          </div>

          <button
            type="button"
            className="w-fit px-6 py-4 bg-[#EE5E36] hover:bg-[#0B2545] text-white font-bold text-sm tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md shadow-[#EE5E36]/15 hover:shadow-lg"
          >
            <span>Explore More</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Categories Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
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
      </div>
    </section>
  );
}
