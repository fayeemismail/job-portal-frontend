'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BOOKING_PAGE_COPY } from '../constants';

interface CheckoutHeaderProps {
  step: number;
  serviceTitle: string;
  serviceId: string;
  onPrevStep: () => void;
}

export function CheckoutHeader({ step, serviceTitle, serviceId, onPrevStep }: CheckoutHeaderProps) {
  return (
    <div className="border-b border-[#EE5E36]/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
          {step === 1 && BOOKING_PAGE_COPY.titleStep1}
          {step === 2 && BOOKING_PAGE_COPY.titleStep2}
          {step === 3 && BOOKING_PAGE_COPY.titleStep3}
        </h1>
        <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase">
          Checkout for: <span className="text-[#EE5E36]">{serviceTitle}</span>
        </p>
      </div>

      {step === 1 ? (
        <Link
          href={`/services/${serviceId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group self-start sm:self-center"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {BOOKING_PAGE_COPY.backToDetails}
        </Link>
      ) : (
        <button
          onClick={onPrevStep}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {step === 2 ? BOOKING_PAGE_COPY.backToSchedule : BOOKING_PAGE_COPY.backToRequirements}
        </button>
      )}
    </div>
  );
}
