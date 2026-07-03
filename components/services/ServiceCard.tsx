'use client';

import { Star } from 'lucide-react';
import { ServiceItem } from './types';

interface ServiceCardProps {
  service: ServiceItem;
  categoryLabel: string;
}

export function ServiceCard({ service, categoryLabel }: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:border-[#EE5E36]/30 transition-all duration-300 flex flex-col group h-full">
      {/* 1. Header Image & Rating Overlay */}
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-4 shrink-0 bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
          <span className="text-xs font-bold text-[#0B2545]">{service.rating}</span>
          <span className="text-[10px] text-gray-500">({service.reviewCount})</span>
        </div>
      </div>

      {/* 2. Category Badge */}
      <span className="bg-[#FFF4F0] text-[#EE5E36] px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider self-start mb-2">
        {categoryLabel}
      </span>

      {/* 3. Title */}
      <h3 className="text-[#0B2545] font-extrabold text-base sm:text-lg group-hover:text-[#EE5E36] transition-colors mb-2 cursor-pointer line-clamp-1">
        {service.title}
      </h3>

      {/* 4. Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 grow">
        {service.description}
      </p>

      {/* 5. Card Footer: Provider details & Price */}
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.provider.avatar}
            alt={service.provider.name}
            className="w-9 h-9 rounded-full object-cover border border-gray-100"
          />
          <div className="flex flex-col">
            <span className="text-[#0B2545] text-xs font-bold block">{service.provider.name}</span>
            <span className="text-gray-400 text-[10px]">
              {service.provider.completedJobs}+ Jobs
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[#EE5E36] font-extrabold text-base sm:text-lg block leading-none">
            ${service.price}
          </span>
          <span className="text-gray-400 text-[9px] font-semibold uppercase tracking-wider">
            {service.priceType === 'hourly' ? '/ Hr' : 'Fixed'}
          </span>
        </div>
      </div>
    </div>
  );
}
