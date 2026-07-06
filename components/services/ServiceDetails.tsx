'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ThumbsUp, Share2, ArrowLeft, CheckCircle, X } from 'lucide-react';
import { ServiceItem } from './types';

// Unsplash photos mapped to category for beautiful real visuals matching the UI demo
const CATEGORY_PHOTOS: Record<string, string[]> = {
  cleaning: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop&q=80',
  ],
  plumbing: [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
  ],
  electrical: [
    'https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558224494-ef663bb5953e?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460518451285-97b6ba326861?w=400&auto=format&fit=crop&q=80',
  ],
  carpentry: [
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
  ],
  painting: [
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&auto=format&fit=crop&q=80',
  ],
};

interface ServiceDetailsProps {
  service: ServiceItem;
  categoryLabel: string;
}

export function ServiceDetails({ service, categoryLabel }: ServiceDetailsProps) {
  const [liked, setLiked] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fallback photos
  const photos = CATEGORY_PHOTOS[service.category] || CATEGORY_PHOTOS.cleaning;

  const originalPrice = Math.floor(service.price * 1.3);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleBookNow = () => {
    setBookingSuccess(true);
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
            Back to services
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
                <span>New York, USA</span>
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
              <h2 className="text-[22px] font-extrabold text-[#0B2545] mb-3">Service Details</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {service.description} Consectetur adipisicing elit sed do eiusmod tempor incididunt
                utna labore etnalorale magna aliqua enim ad minim veniam quis nostrud exercite.
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
                    Package Name
                  </span>
                  <span className="text-sm font-extrabold text-[#0B2545]">
                    {service.title.replace('Premium ', '').replace('Emergency ', '')}
                  </span>
                </div>

                {/* Pricing block */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#0B2545]/40 tracking-wider uppercase block mb-1.5">
                    Starting At
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
                  className="w-full bg-[#FF5A36] hover:bg-[#EE4A26] text-white text-xs font-extrabold tracking-wider uppercase py-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking confirmation Overlay/Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setBookingSuccess(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <button
              onClick={() => setBookingSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-[#FFF4F0] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EE5E36]/10">
              <CheckCircle className="w-8 h-8 text-[#EE5E36]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B2545] tracking-tight mb-2">
              Booking Request Received!
            </h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed mb-6">
              Thank you for booking the{' '}
              <span className="text-[#EE5E36] font-bold">{service.title}</span>. A certified
              coordinator will contact you shortly to confirm the scheduled date and time.
            </p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="w-full bg-[#0B2545] hover:bg-[#153459] text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl transition-all cursor-pointer"
            >
              Back to Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
