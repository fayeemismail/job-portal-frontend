'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Calendar,
  Clock,
  DollarSign,
} from 'lucide-react';
import {
  MOCK_SERVICES,
  BOOKING_PAGE_COPY,
  BOOKING_DATES,
  BOOKING_TIME_SLOTS,
  PRICING_BREAKDOWN_CONFIGS,
} from '@/components/services/constants';

export default function BookingFlowPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  // Retrieve service
  const service = MOCK_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  // Selected date and time states (initially null to require picking a date)
  const [selectedDateIdx, setSelectedDateIdx] = useState<number | null>(null);
  const [selectedTimeIdx, setSelectedTimeIdx] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Formatted date string for confirmation popup
  const activeDate = selectedDateIdx !== null ? BOOKING_DATES[selectedDateIdx] : null;
  const activeTime = selectedTimeIdx !== null ? BOOKING_TIME_SLOTS[selectedTimeIdx] : null;

  const handleProceed = () => {
    if (selectedDateIdx !== null && selectedTimeIdx !== null) {
      setShowConfirmation(true);
    }
  };

  const handleFinishBooking = () => {
    setShowConfirmation(false);
    router.push(`/services/${id}`);
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 font-sans text-[#0B2545]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Back Button Header */}
        <div className="border-b border-[#EE5E36]/10 pb-6 mb-8 space-y-3">
          <Link
            href={`/services/${id}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to details
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              Choose Date & Time
            </h1>
            <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase">
              Checkout for: <span className="text-[#EE5E36]">{service.title}</span>
            </p>
          </div>
        </div>

        {/* 2-Column Grid Layout in Soft Peach Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Date & Time Picker) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Date Selection Box */}
            <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
                <Calendar className="w-4.5 h-4.5 text-[#EE5E36]" />
                <span>Select Date</span>
              </h2>

              <div className="flex items-center gap-2.5 mt-6">
                {/* Left Arrow */}
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#EE5E36] hover:border-[#EE5E36]/20 transition-all cursor-pointer active:scale-90 shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dates grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 flex-1">
                  {BOOKING_DATES.map((dateObj, idx) => {
                    const isActive = selectedDateIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedDateIdx(idx);
                          setSelectedTimeIdx(null); // Reset time selection on date switch
                        }}
                        className={`flex flex-col items-center justify-center py-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#0B2545] shadow-xs font-extrabold'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-[#EE5E36]/25 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
                        }`}
                      >
                        <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5 block">
                          {dateObj.day}
                        </span>
                        <span
                          className={`text-base font-black ${isActive ? 'text-[#EE5E36]' : ''}`}
                        >
                          {dateObj.date}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Arrow */}
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#EE5E36] hover:border-[#EE5E36]/20 transition-all cursor-pointer active:scale-90 shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Time Slot Selection (Visible below Date Selection if date is picked) */}
            {selectedDateIdx !== null && (
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
                <h3 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2 uppercase tracking-wider">
                  <Clock className="w-4.5 h-4.5 text-[#EE5E36]" />
                  <span>Select Time Slot</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {BOOKING_TIME_SLOTS.map((time, idx) => {
                    const isActive = selectedTimeIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTimeIdx(idx)}
                        className={`py-3.5 px-3 rounded-xl border text-center text-[11px] font-semibold transition-all cursor-pointer select-none ${
                          isActive
                            ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#EE5E36] shadow-xs'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-[#EE5E36]/25 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Conditional Pricing Summary & Proceed Button) */}
          <div className="lg:col-span-5">
            {selectedDateIdx === null ? (
              /* Prompt Placeholder Card */
              <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400 font-semibold text-sm">
                <Calendar className="w-8 h-8 mx-auto mb-2.5 text-gray-300" />
                Select a booking date from the calendar to view pricing details.
              </div>
            ) : (
              /* Pricing and Action Button Container */
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
                {/* Pricing Breakdown */}
                <div className="space-y-3.5">
                  <h3 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2 uppercase tracking-wider">
                    <DollarSign className="w-4.5 h-4.5 text-[#EE5E36]" />
                    <span>Pricing Breakdown</span>
                  </h3>
                  <div className="bg-white border border-[#EE5E36]/10 rounded-2xl overflow-hidden divide-y divide-gray-100 mt-6">
                    {PRICING_BREAKDOWN_CONFIGS.map((config, idx) => {
                      const ratePrice = service.price * config.multiplier;
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-3.5 px-4.5 text-xs font-semibold"
                        >
                          <span className="text-gray-400 font-bold">{config.label}</span>
                          <span className="text-[#0B2545] font-black">${ratePrice.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Proceed Action Button */}
                <div className="border-t border-[#EE5E36]/10 pt-6 mt-6">
                  <button
                    type="button"
                    onClick={handleProceed}
                    disabled={selectedTimeIdx === null}
                    className={`w-full text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-2xs text-center select-none ${
                      selectedTimeIdx !== null
                        ? 'bg-[#EE5E36] hover:bg-[#d64e29] hover:shadow-xs cursor-pointer active:scale-[0.98]'
                        : 'bg-gray-300/80 cursor-not-allowed opacity-75'
                    }`}
                  >
                    {BOOKING_PAGE_COPY.proceedButton}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Success modal */}
      {showConfirmation && activeDate && activeTime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setShowConfirmation(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-[#FFF4F0] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EE5E36]/10">
              <CheckCircle className="w-8 h-8 text-[#EE5E36]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B2545] tracking-tight mb-2">
              {BOOKING_PAGE_COPY.bookingConfirmedTitle}
            </h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed mb-6">
              {BOOKING_PAGE_COPY.bookingConfirmedDesc(
                service.title,
                `${activeDate.day} ${activeDate.date}`,
                activeTime
              )}
            </p>
            <button
              onClick={handleFinishBooking}
              className="w-full bg-[#0B2545] hover:bg-[#153459] text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl transition-all cursor-pointer animate-pulse"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
