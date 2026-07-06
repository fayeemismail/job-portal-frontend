'use client';

import { X, CheckCircle } from 'lucide-react';
import { BOOKING_PAGE_COPY } from '../constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

interface CheckoutModalProps {
  showConfirmation: boolean;
  onClose: () => void;
  serviceTitle: string;
  activeDate: { day: string; date: string } | null;
  activeTime: string | null;
  activeAddress: AddressItem | undefined;
  requirementText: string;
  onFinishBooking: () => void;
}

export function CheckoutModal({
  showConfirmation,
  onClose,
  serviceTitle,
  activeDate,
  activeTime,
  activeAddress,
  requirementText,
  onFinishBooking,
}: CheckoutModalProps) {
  if (!showConfirmation || !activeDate || !activeTime || !activeAddress) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
        <button
          onClick={onClose}
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

        {/* Displaying final schedule summary */}
        <div className="text-sm font-semibold text-gray-500 leading-relaxed space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
              {BOOKING_PAGE_COPY.orderReviewLabels.service}:
            </span>
            <span className="text-[#0B2545] font-bold">{serviceTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
              {BOOKING_PAGE_COPY.orderReviewLabels.date}
            </span>
            <span className="text-[#0B2545] font-bold">
              {activeDate.day} {activeDate.date} Oct
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
              {BOOKING_PAGE_COPY.orderReviewLabels.time}
            </span>
            <span className="text-[#0B2545] font-bold">{activeTime}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0 mt-0.5">
              {BOOKING_PAGE_COPY.orderReviewLabels.addr}
            </span>
            <span className="text-[#0B2545] font-bold">
              {activeAddress.street}, {activeAddress.cityStateZip}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
              {BOOKING_PAGE_COPY.orderReviewLabels.pay}
            </span>
            <span className="text-[#0B2545] font-bold">Cash on Delivery (COD)</span>
          </div>
          {requirementText.trim() && (
            <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
              <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0 mt-0.5">
                {BOOKING_PAGE_COPY.orderReviewLabels.note}
              </span>
              <span className="text-[#0B2545] font-bold italic line-clamp-2">
                &ldquo;{requirementText}&rdquo;
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onFinishBooking}
          className="w-full bg-[#0B2545] hover:bg-[#153459] text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl transition-all cursor-pointer animate-pulse"
        >
          Done
        </button>
      </div>
    </div>
  );
}
