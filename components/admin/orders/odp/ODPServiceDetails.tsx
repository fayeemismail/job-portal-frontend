'use client';

import { MapPin, Calendar, Clock } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { CATEGORY_PHOTOS } from '@/components/services/constants';

interface ODPServiceDetailsProps {
  serviceName: string;
  category: string;
  date: string;
  timeSlot: string;
  address: string;
}

export function ODPServiceDetails({
  serviceName,
  category,
  date,
  timeSlot,
  address,
}: ODPServiceDetailsProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  // Dynamic Theme Styling
  const tagBgClass = isNavy
    ? 'bg-[#0B2545]/5 text-[#0B2545] border-[#0B2545]/10'
    : 'bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/10';
  const iconColorClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  // Dynamic Cover Photo lookup
  const photos = CATEGORY_PHOTOS[category.toLowerCase()] || CATEGORY_PHOTOS.cleaning;
  const coverPhoto = photos[0];

  return (
    <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-6 text-left font-sans text-[#0B2545] shadow-xs">
      {/* Service Header Info */}
      <div className="flex items-center gap-4">
        {/* Small Service Thumbnail */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-150/80 shrink-0 shadow-3xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPhoto}
            alt={serviceName}
            className="w-full h-full object-cover animate-in fade-in duration-300"
          />
        </div>
        <div>
          <span
            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest border ${tagBgClass}`}
          >
            {category}
          </span>
          <h3 className="text-base sm:text-lg font-black mt-1 leading-tight">{serviceName}</h3>
        </div>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-50 pt-5">
        <div className="flex items-start gap-3">
          <Calendar className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorClass}`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Schedule Date
            </p>
            <p className="text-xs font-bold mt-0.5">{date}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorClass}`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Time Window
            </p>
            <p className="text-xs font-bold mt-0.5">{timeSlot}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 md:col-span-2 border-t border-gray-50 pt-4">
          <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorClass}`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Service Location Address
            </p>
            <p className="text-xs font-semibold mt-0.5 leading-relaxed text-[#0B2545]/80">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
