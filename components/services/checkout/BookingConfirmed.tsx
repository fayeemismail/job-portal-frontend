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
    <main className="bg-linear-to-br from-[#FFFDFB] via-[#FFF9F6] to-[#FFF4F0] min-h-[85vh] py-16 flex items-center justify-center font-sans text-[#0B2545] relative overflow-hidden px-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#EE5E36]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#0B2545]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Split Layout Container */}
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Left Column: Decorative Brand Card */}
        <div className="md:col-span-5 bg-linear-to-br from-[#0B2545] via-[#0E2F59] to-[#154680] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 my-auto">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full text-[#EE5E36] mb-8">
              Booking Info
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-wide leading-tight mb-4">
              Thank You
              <span className="block text-xl md:text-2xl font-sans font-medium text-gray-300 mt-2">
                For Your Booking
              </span>
            </h2>
            <p className="text-gray-300 text-sm font-medium leading-relaxed max-w-sm mt-6">
              A certified coordinator is reviewing your schedule details. We attend every booking
              with utmost importance and care.
            </p>

            {/* Quick service details summary on the left */}
            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                Service Booked
              </span>
              <p className="text-base font-bold text-white mt-1 leading-tight">{service.title}</p>
              <p className="text-xs text-[#EE5E36] font-semibold mt-2">
                Starting from ${service.price}/{service.priceType}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Actual Order Data Summary */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
          <div>
            {/* Header Status */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FFF4F0] rounded-full flex items-center justify-center border border-[#EE5E36]/10 shrink-0">
                <CheckCircle className="w-5 h-5 text-[#EE5E36]" />
              </div>
              <h2 className="text-lg font-bold text-[#0B2545] tracking-tight animate-pulse">
                Booking Successfully Placed
              </h2>
            </div>

            {/* Booking Ref */}
            <div className="text-sm font-medium text-gray-500 mb-8">
              <p>
                Your Booking Ref: <span className="font-extrabold text-[#0B2545]">ORD-8947A</span>
              </p>
            </div>

            {/* Detailed Booking Information */}
            <section className="space-y-6 text-left bg-gray-50/70 border border-gray-100 p-6 rounded-2xl mb-8">
              <h3 className="text-xs font-extrabold text-gray-400 tracking-wider uppercase pb-2.5 border-b border-gray-200/60">
                Schedule & Delivery Data
              </h3>

              {/* Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#EE5E36] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                      Date
                    </span>
                    <span className="text-sm font-bold text-[#0B2545]">
                      {activeDate.day}, {activeDate.date} Oct
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#EE5E36] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                      Time Slot
                    </span>
                    <span className="text-sm font-bold text-[#0B2545]">{activeTime}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              {(addressStreet || addressCityStateZip) && (
                <div className="flex items-start gap-3 pt-4 border-t border-gray-200/40">
                  <MapPin className="w-4 h-4 text-[#EE5E36] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                      Service Address
                    </span>
                    <span className="text-sm font-bold text-[#0B2545] block leading-tight">
                      {addressLabel && (
                        <span className="font-extrabold text-[#EE5E36] mr-1.5 bg-[#FFF4F0] px-2 py-0.5 rounded text-[10px] uppercase">
                          {addressLabel}
                        </span>
                      )}
                      {addressStreet}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 mt-0.5 block">
                      {addressCityStateZip}
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="flex items-start gap-3 pt-4 border-t border-gray-200/40">
                <CreditCard className="w-4 h-4 text-[#EE5E36] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                    Payment Method
                  </span>
                  <span className="text-sm font-bold text-[#0B2545]">
                    Cash on Delivery (Pay After Service)
                  </span>
                </div>
              </div>

              {/* Notes */}
              {note.trim() && (
                <div className="pt-4 border-t border-gray-200/40">
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">
                    Special Instructions
                  </span>
                  <p className="bg-white border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 italic leading-relaxed">
                    &ldquo;{note}&rdquo;
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
            <button
              onClick={onViewOrder}
              className="btn-animate btn-animate-primary w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer shadow-md shadow-[#EE5E36]/10 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {BOOKING_PAGE_COPY.viewOrderButton}
            </button>
            <button
              onClick={onFinishBooking}
              className="btn-animate btn-animate-neutral w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition-all text-gray-600"
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
