'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, ThumbsUp, Share2, ArrowLeft } from 'lucide-react';
import { ServiceItem } from './types';
import { DEFAULT_LOCATION, CATEGORY_PHOTOS, SDP_COPY } from './constants';

interface ServiceDetailsProps {
  service: ServiceItem;
  categoryLabel: string;
}

export function ServiceDetails({ service, categoryLabel }: ServiceDetailsProps) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  // Fallback photos
  const photos = CATEGORY_PHOTOS[service.category] || CATEGORY_PHOTOS.cleaning;

  const originalPrice = Math.floor(service.price * 1.3);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleBookNow = () => {
    router.push(`/services/${service.id}/book`);
  };

  return (
    <div className="bg-white min-h-screen pb-16 pt-6 select-none font-sans">
      {/* Centered Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs / Back button */}
        <div className="mb-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {SDP_COPY.backToServices}
          </Link>
        </div>

        {/* Title Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              {service.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap text-sm font-semibold">
              {/* Category tag */}
              <span className="bg-[#FFF4F0] text-[#EE5E36] text-xs font-extrabold uppercase px-3 py-1 rounded-md tracking-wider">
                {categoryLabel.replace(' Services', '').replace(' Cleaning', '')}
              </span>
              {/* Location */}
              <div className="flex items-center gap-1 text-gray-400 font-medium">
                <MapPin className="w-4 h-4 text-[#EE5E36]" />
                <span>{DEFAULT_LOCATION}</span>
              </div>
            </div>
          </div>

          {/* Share / ThumbsUp Buttons */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <button
              onClick={handleLikeClick}
              className={`w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:border-gray-200 transition-all cursor-pointer ${
                liked
                  ? 'bg-[#FFF4F0] text-[#EE5E36]'
                  : 'bg-white text-gray-400 hover:text-[#EE5E36]'
              }`}
              aria-label="Like service"
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-[#EE5E36]' : ''}`} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white border border-gray-100 hover:border-gray-200 text-gray-400 hover:text-[#EE5E36] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Share service"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Large Visual Photo */}
            <div className="w-full aspect-16/10 sm:h-[450px] rounded-3xl overflow-hidden bg-gray-50 shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[0]} alt={service.title} className="w-full h-full object-cover" />
            </div>

            {/* Service Details Section */}
            <div>
              <h2 className="text-[22px] font-extrabold text-[#0B2545] mb-3">
                {SDP_COPY.serviceDetailsHeading}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {service.description} {SDP_COPY.fallbackDescription}
              </p>
            </div>
          </div>

          {/* Right Column (1/3 width) - Contains Sticky Booking Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Visual stacked Photo 1 */}
            <div className="w-full h-[180px] rounded-3xl overflow-hidden bg-gray-50 shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[1]}
                alt="Service showcase layout"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sticky Booking sidebar component container */}
            <div className="sticky top-6">
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 shadow-2xs">
                {/* Package Name block */}
                <div className="mb-5">
                  <span className="text-[11px] font-bold text-[#0B2545]/40 tracking-wider uppercase block mb-1">
                    {SDP_COPY.packageNameLabel}
                  </span>
                  <span className="text-sm font-extrabold text-[#0B2545]">
                    {service.title.replace('Premium ', '').replace('Emergency ', '')}
                  </span>
                </div>

                {/* Pricing block */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#0B2545]/40 tracking-wider uppercase block mb-1.5">
                    {SDP_COPY.startingAtLabel}
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-black text-[#0B2545]">
                      ${service.price.toFixed(2)}
                    </span>
                    {service.priceType === 'hourly' && (
                      <span className="text-xs font-bold text-gray-400 ml-0.5">/ hr</span>
                    )}
                    <span className="text-gray-400 text-sm line-through font-semibold ml-2.5">
                      ${originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Book Service Button */}
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="btn-animate btn-animate-primary w-full text-white text-xs font-extrabold tracking-wider uppercase py-4 rounded-xl cursor-pointer shadow-xs"
                >
                  {SDP_COPY.bookServiceButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
}
