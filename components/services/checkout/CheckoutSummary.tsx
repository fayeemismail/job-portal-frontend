'use client';

import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { BOOKING_PAGE_COPY, PRICING_BREAKDOWN_CONFIGS } from '../constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

interface CheckoutSummaryProps {
  step: number;
  selectedDateIdx: number | null;
  selectedTimeIdx: number | null;
  selectedAddressId: string;
  activeDate: { day: string; date: string } | null;
  activeTime: string | null;
  activeAddress: AddressItem | undefined;
  servicePrice: number;
  onProceedStep2: () => void;
  onProceedStep3: () => void;
  onFinalConfirm: () => void;
}

export function CheckoutSummary({
  step,
  selectedDateIdx,
  selectedTimeIdx,
  selectedAddressId,
  activeDate,
  activeTime,
  activeAddress,
  servicePrice,
  onProceedStep2,
  onProceedStep3,
  onFinalConfirm,
}: CheckoutSummaryProps) {
  return (
    <div className="lg:col-span-5">
      {selectedDateIdx === null ? (
        /* Prompt Placeholder Card */
        <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400 font-semibold text-sm">
          <Calendar className="w-8 h-8 mx-auto mb-2.5 text-gray-300" />
          Select a booking date from the calendar to view pricing details.
        </div>
      ) : (
        /* Pricing summary layout */
        <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          {/* Visual selections review */}
          {activeDate && activeTime && (
            <div className="space-y-3.5 pb-5 border-b border-[#EE5E36]/10">
              <h3 className="text-xs font-extrabold text-[#0B2545]/55 tracking-wider uppercase">
                {BOOKING_PAGE_COPY.summaryTitle}
              </h3>
              <div className="flex flex-col gap-2.5 text-xs font-semibold text-[#0B2545]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EE5E36]" />
                  <span>
                    {activeDate.day}, {activeDate.date} Oct 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#EE5E36]" />
                  <span>{activeTime}</span>
                </div>
                {step >= 2 && activeAddress && (
                  <div className="flex items-start gap-2 pt-1.5 border-t border-[#EE5E36]/5 animate-in fade-in">
                    <MapPin className="w-4 h-4 text-[#EE5E36] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-extrabold uppercase text-[10px] tracking-wider block text-gray-400">
                        {BOOKING_PAGE_COPY.orderReviewLabels.address}: {activeAddress.label}
                      </span>
                      <span>{activeAddress.street}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pricing Breakdown rates table */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2 uppercase tracking-wider">
              <DollarSign className="w-4.5 h-4.5 text-[#EE5E36]" />
              <span>{BOOKING_PAGE_COPY.pricingBreakdownTitle}</span>
            </h3>
            <div className="bg-white border border-[#EE5E36]/10 rounded-2xl overflow-hidden divide-y divide-gray-100 mt-6">
              {PRICING_BREAKDOWN_CONFIGS.map((config, idx) => {
                const ratePrice = servicePrice * config.multiplier;
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

          {/* Dynamic Stepper proceeds/action CTA buttons */}
          <div className="border-t border-[#EE5E36]/10 pt-6 mt-6">
            {step === 1 && (
              <button
                type="button"
                onClick={onProceedStep2}
                disabled={selectedTimeIdx === null}
                className={`w-full text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl shadow-2xs text-center select-none ${
                  selectedTimeIdx !== null
                    ? 'btn-animate btn-animate-primary cursor-pointer'
                    : 'bg-gray-300/80 cursor-not-allowed opacity-75'
                }`}
              >
                {BOOKING_PAGE_COPY.proceedButton}
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={onProceedStep3}
                disabled={!selectedAddressId}
                className={`w-full text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl shadow-2xs text-center select-none ${
                  selectedAddressId
                    ? 'btn-animate btn-animate-primary cursor-pointer'
                    : 'bg-gray-300/80 cursor-not-allowed opacity-75'
                }`}
              >
                {BOOKING_PAGE_COPY.proceedStep2Button}
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={onFinalConfirm}
                className="btn-animate btn-animate-primary w-full text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl shadow-2xs text-center select-none cursor-pointer"
              >
                {BOOKING_PAGE_COPY.confirmBookingButton}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
