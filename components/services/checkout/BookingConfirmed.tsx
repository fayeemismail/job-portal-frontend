'use client';

import { CheckCircle, Calendar, Clock, MapPin, CreditCard, Home, FileText } from 'lucide-react';
import { BOOKING_PAGE_COPY } from '../constants';
import { ServiceItem } from '../types';

interface BookingConfirmedProps {
  service: ServiceItem;
  activeDate: { day: string; date: string };
  activeTime: string;
  addressLabel: string;
  addressStreet: string;
  addressCityStateZip: string;
  note: string;
  onFinishBooking: () => void;
  onViewOrder: () => void;
}

export function BookingConfirmed({
  service,
  activeDate,
  activeTime,
  addressLabel,
  addressStreet,
  addressCityStateZip,
  note,
  onFinishBooking,
  onViewOrder,
}: BookingConfirmedProps) {
  return (
    <main className="bg-linear-to-br from-[#FFFDFB] via-[#FFF9F6] to-[#FFF4F0] min-h-[85vh] py-16 flex items-center justify-center font-sans text-[#0B2545] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#EE5E36]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#0B2545]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="bg-white rounded-3xl shadow-xl shadow-[#0B2545]/5 border border-gray-100/50 p-8 md:p-10 text-center">
          {/* Animated Success Check Icon */}
          <div className="w-20 h-20 bg-[#FFF4F0] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#EE5E36]/10 animate-pulse">
            <CheckCircle className="w-10 h-10 text-[#EE5E36]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-[#0B2545]">
            {BOOKING_PAGE_COPY.bookingConfirmedTitle}
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-md mx-auto mb-10">
            Your booking request has been successfully submitted. The provider will contact you shortly to confirm the scheduled visit.
          </p>

          {/* Info Details Section */}
          <section className="text-left bg-gray-50/70 border border-gray-100 p-6 md:p-8 rounded-2xl mb-10 space-y-6">
            <h2 className="text-xs font-extrabold text-gray-400 tracking-wider uppercase pb-3 border-b border-gray-200/60">
              Booking Details Summary
            </h2>

            {/* Service */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-3xs shrink-0">
                <FileText className="w-5 h-5 text-[#EE5E36]" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                  {BOOKING_PAGE_COPY.orderReviewLabels.service}
                </span>
                <span className="text-base font-bold text-[#0B2545]">{service.title}</span>
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-3xs shrink-0">
                  <Calendar className="w-5 h-5 text-[#EE5E36]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                    Date
                  </span>
                  <span className="text-base font-bold text-[#0B2545]">
                    {activeDate.day}, {activeDate.date} Oct
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-3xs shrink-0">
                  <Clock className="w-5 h-5 text-[#EE5E36]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                    Time Slot
                  </span>
                  <span className="text-base font-bold text-[#0B2545]">{activeTime}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            {(addressStreet || addressCityStateZip) && (
              <div className="flex items-start gap-4 pt-2 border-t border-gray-200/40">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-3xs shrink-0">
                  <MapPin className="w-5 h-5 text-[#EE5E36]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                    {BOOKING_PAGE_COPY.orderReviewLabels.address}
                  </span>
                  <span className="text-sm font-bold text-[#0B2545] block">
                    {addressLabel && (
                      <span className="font-extrabold text-[#EE5E36] mr-1.5 bg-[#FFF4F0] px-2 py-0.5 rounded text-[11px] uppercase">
                        {addressLabel}
                      </span>
                    )}
                    {addressStreet}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">{addressCityStateZip}</span>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="flex items-start gap-4 pt-2 border-t border-gray-200/40">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-3xs shrink-0">
                <CreditCard className="w-5 h-5 text-[#EE5E36]" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                  {BOOKING_PAGE_COPY.orderReviewLabels.payment}
                </span>
                <span className="text-sm font-bold text-[#0B2545]">Cash on Delivery (Pay After Service)</span>
              </div>
            </div>

            {/* Notes */}
            {note.trim() && (
              <div className="pt-4 border-t border-gray-200/40">
                <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1.5">
                  {BOOKING_PAGE_COPY.orderReviewLabels.note}
                </span>
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 italic">
                  &ldquo;{note}&rdquo;
                </div>
              </div>
            )}
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={onViewOrder}
              className="btn-animate btn-animate-primary w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer shadow-md shadow-[#EE5E36]/10 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {BOOKING_PAGE_COPY.viewOrderButton}
            </button>
            <button
              onClick={onFinishBooking}
              className="btn-animate btn-animate-neutral w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition-all text-gray-600"
            >
              <Home className="w-4 h-4" />
              {BOOKING_PAGE_COPY.continueBrowsingButton}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
