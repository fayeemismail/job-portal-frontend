'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MOCK_SERVICES, SERVICE_CATEGORIES } from '../services/constants';
import { ServiceCard } from '../services/ServiceCard';

export function FeaturedServices() {
  // Select first 6 services to feature (2 rows of 3 columns)
  const featured = MOCK_SERVICES.slice(0, 6);

  return (
    <section className="bg-gray-50/50 py-16 md:py-24 select-none border-y border-gray-100/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
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
                Featured
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#0B2545] leading-tight">
              Top Rated Services
            </h2>
          </div>

          <Link href="/services" className="w-fit block">
            <button
              type="button"
              className="group relative overflow-hidden px-6 py-4 bg-[#EE5E36] text-white font-bold text-sm tracking-wider rounded-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#EE5E36]/15 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore All Services</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
            </button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((service) => {
            const catLabel = SERVICE_CATEGORIES.find((c) => c.id === service.category)?.label || '';
            return <ServiceCard key={service.id} service={service} categoryLabel={catLabel} />;
          })}
        </div>
      </div>
    </section>
  );
}
