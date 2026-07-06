'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ORDERS_PAGE_COPY, ORDER_STATUS_STYLES, OrderItem } from './constants';

interface ODPHeaderProps {
  orderId: string;
  status: OrderItem['status'];
}

export function ODPHeader({ orderId, status }: ODPHeaderProps) {
  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#EE5E36] hover:text-[#d64e29] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {ORDERS_PAGE_COPY.backToBookingsBtn}
        </Link>
      </div>

      {/* Title Header */}
      <div className="border-b border-[#EE5E36]/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {ORDERS_PAGE_COPY.bookingDetailsTitle}
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {ORDERS_PAGE_COPY.orderIdLabel} <strong className="text-[#0B2545]">{orderId}</strong>
          </p>
        </div>
        <div>
          <span
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
              ORDER_STATUS_STYLES[status]
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
