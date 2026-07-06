'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Heart } from 'lucide-react';
import { ServiceItem } from './types';

interface ServiceCardProps {
  service: ServiceItem;
  categoryLabel: string;
}

export function ServiceCard({ service, categoryLabel }: ServiceCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // Generate a realistic original price for discount effect
  const originalPrice = Math.floor(service.price * 1.3);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-4 flex flex-col group h-full shadow-xs hover:shadow-lg hover:border-gray-200/60 transition-all duration-300 select-none">
      {/* 1. Header Image with Overlays */}
      <div className="relative w-full h-[190px] rounded-2xl overflow-hidden mb-4 shrink-0 bg-gray-50">
        <Link href={`/services/${service.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Category Badge overlay (Top Left) */}
        <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xs">
          <span className="text-[#EE5E36] text-[11px] font-extrabold tracking-wide uppercase">
            {categoryLabel}
          </span>
        </div>

        {/* Heart Favorite Button overlay (Top Right) */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-all"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* 2. Location & Rating Info Row */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-2 px-1">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#EE5E36]/80" />
          <span>New York, USA</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
          <span className="text-[#0B2545] font-extrabold">{service.rating}</span>
        </div>
      </div>

      {/* 3. Title */}
      <Link href={`/services/${service.id}`} className="grow flex flex-col">
        <h3 className="text-[#0B2545] font-extrabold text-base sm:text-[17px] leading-snug group-hover:text-[#EE5E36] transition-colors mb-3 cursor-pointer line-clamp-2 px-1 grow">
          {service.title}
        </h3>
      </Link>

      {/* 4. Pricing & Booking Row */}
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between mt-auto px-1 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-0.5">
            Starting from
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#0B2545] font-extrabold text-lg leading-none">
              ${service.price.toFixed(2)}
            </span>
            <span className="text-gray-400 text-xs line-through font-medium">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <Link href={`/services/${service.id}`}>
          <button
            type="button"
            className="bg-[#FFF4F0] hover:bg-[#EE5E36] text-[#EE5E36] hover:text-white px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 cursor-pointer active:scale-95 shadow-2xs"
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
