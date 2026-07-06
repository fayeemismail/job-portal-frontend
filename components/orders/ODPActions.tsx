'use client';

import { Download, RefreshCw, Trash2, PhoneCall } from 'lucide-react';
import { ORDERS_PAGE_COPY, BILLING_CONFIG, OrderItem } from './constants';

interface ODPActionsProps {
  status: OrderItem['status'];
  onDownloadInvoice: () => void;
  onReschedule: () => void;
  onCancelBooking: () => void;
}

export function ODPActions({
  status,
  onDownloadInvoice,
  onReschedule,
  onCancelBooking,
}: ODPActionsProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-3 shadow-3xs">
      <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2545] border-b border-gray-50 pb-3 mb-2">
        {ORDERS_PAGE_COPY.bookingActionsTitle}
      </h4>

      <button
        onClick={onDownloadInvoice}
        className="btn-animate btn-animate-neutral w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
      >
        <Download className="w-4.5 h-4.5 text-[#EE5E36] relative z-10" />
        <span className="relative z-10">{ORDERS_PAGE_COPY.invoicePdfBtn}</span>
      </button>

      {status === 'pending' && (
        <button
          onClick={onReschedule}
          className="btn-animate btn-animate-neutral w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
        >
          <RefreshCw className="w-4.5 h-4.5 text-[#EE5E36] relative z-10" />
          <span className="relative z-10">{ORDERS_PAGE_COPY.rescheduleBtn}</span>
        </button>
      )}

      {status === 'pending' && (
        <button
          onClick={onCancelBooking}
          className="btn-animate border border-red-500/20 text-red-500 hover:text-white w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
          style={{ '--btn-hover-bg': '#ef4444' } as React.CSSProperties}
        >
          <Trash2 className="w-4.5 h-4.5 shrink-0 relative z-10" />
          <span className="relative z-10">{ORDERS_PAGE_COPY.cancelBookingBtn}</span>
        </button>
      )}

      <a
        href={BILLING_CONFIG.dispatchTelHref}
        className="btn-animate btn-animate-neutral w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
      >
        <PhoneCall className="w-4.5 h-4.5 text-[#EE5E36] relative z-10" />
        <span className="relative z-10">{ORDERS_PAGE_COPY.contactDispatchBtn}</span>
      </a>
    </div>
  );
}
