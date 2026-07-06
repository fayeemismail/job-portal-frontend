'use client';

import { ShieldCheck, Calendar, Clock, MapPin, Coins } from 'lucide-react';
import { BOOKING_PAGE_COPY } from '../constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

interface PaymentStepProps {
  activeDate: { day: string; date: string } | null;
  activeTime: string | null;
  activeAddress: AddressItem | undefined;
  requirementText: string;
}

export function PaymentStep({
  activeDate,
  activeTime,
  activeAddress,
  requirementText,
}: PaymentStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Order Review Summary Card */}
      {activeDate && activeTime && activeAddress && (
        <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
            <ShieldCheck className="w-4.5 h-4.5 text-[#EE5E36]" />
            <span>{BOOKING_PAGE_COPY.orderReviewTitle}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 bg-white p-5 rounded-2xl border border-gray-100/70 text-xs font-semibold">
            <div className="space-y-3">
              <div>
                <span className="font-extrabold uppercase text-[9px] tracking-wider text-gray-400 block mb-1">
                  {BOOKING_PAGE_COPY.orderReviewLabels.schedule}
                </span>
                <div className="flex items-center gap-1.5 text-[#0B2545] font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#EE5E36]" />
                  <span>
                    {activeDate.day}, {activeDate.date} Oct 2026
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0B2545] font-bold mt-1">
                  <Clock className="w-3.5 h-3.5 text-[#EE5E36]" />
                  <span>{activeTime}</span>
                </div>
              </div>

              {requirementText.trim() && (
                <div>
                  <span className="font-extrabold uppercase text-[9px] tracking-wider text-gray-400 block mb-1">
                    {BOOKING_PAGE_COPY.orderReviewLabels.notes}
                  </span>
                  <p className="text-gray-500 font-bold italic border-l-2 border-[#EE5E36]/30 pl-2 leading-relaxed animate-in fade-in">
                    &ldquo;{requirementText}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-extrabold uppercase text-[9px] tracking-wider text-gray-400 block mb-1">
                  {BOOKING_PAGE_COPY.orderReviewLabels.address}
                </span>
                <div className="flex items-start gap-1.5 text-[#0B2545] font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#EE5E36] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-extrabold text-[10px] text-[#EE5E36] block">
                      {activeAddress.label} Address
                    </span>
                    <span>{activeAddress.street}</span>
                    <span className="block text-[10px] text-gray-400 font-medium">
                      {activeAddress.cityStateZip}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Selection Card */}
      <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
          <Coins className="w-4.5 h-4.5 text-[#EE5E36]" />
          <span>{BOOKING_PAGE_COPY.paymentMethodTitle}</span>
        </h2>

        <div className="mt-6">
          <button
            type="button"
            className="w-full text-left p-5 rounded-2xl border border-[#EE5E36] bg-[#FFF4F0] flex items-start gap-4 shadow-3xs cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EE5E36]/10 flex items-center justify-center text-[#EE5E36] shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B2545] block">
                {BOOKING_PAGE_COPY.codTitle}
              </span>
              <p className="text-[11px] font-semibold text-gray-500 leading-relaxed block">
                {BOOKING_PAGE_COPY.codDescription}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
