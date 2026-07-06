'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { OrderItem, ORDERS_PAGE_COPY, ORDER_STATUS_STYLES } from './constants';

interface OrderCardProps {
  order: OrderItem;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl overflow-hidden hover:border-[#EE5E36]/25 transition-all duration-300 flex flex-col">
      {/* Service Image Header */}
      <div className="relative h-36 w-full overflow-hidden">
        <Image src={order.imageUrl} alt={order.serviceName} fill className="object-cover" />
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-sm ${ORDER_STATUS_STYLES[order.status]}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col gap-6 flex-1">
        {/* Header Info */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE5E36]">
            {order.category}
          </span>
          <h3 className="text-base font-black tracking-tight text-[#0B2545]">
            {order.serviceName}
          </h3>
          <span className="text-[11px] font-bold text-gray-400 block">
            {ORDERS_PAGE_COPY.orderIdLabel}{' '}
            <strong className="text-[#0B2545]/85 font-extrabold">{order.id}</strong>
          </span>
        </div>

        {/* Booking schedule */}
        <div className="grid grid-cols-2 gap-4 border-t border-gray-100/50 pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Calendar className="w-4 h-4 text-[#EE5E36]/80 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                {ORDERS_PAGE_COPY.dateCardLabel}
              </span>
              <span className="font-extrabold text-[#0B2545]/90">{order.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Clock className="w-4 h-4 text-[#EE5E36]/80 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                {ORDERS_PAGE_COPY.timeCardLabel}
              </span>
              <span className="font-extrabold text-[#0B2545]/90 whitespace-nowrap">
                {order.timeSlot.split(' - ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between border-t border-gray-100/50 pt-4">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
              {ORDERS_PAGE_COPY.priceCardLabel}
            </span>
            <div className="flex items-center text-sm font-black text-[#EE5E36]">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{order.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action View */}
        <div className="border-t border-gray-100/50 pt-4 mt-auto">
          <Link
            href={`/orders/${order.id}`}
            className="btn-animate btn-animate-secondary w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider shadow-3xs cursor-pointer group"
          >
            <span>{ORDERS_PAGE_COPY.viewDetailsBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform relative z-10" />
          </Link>
        </div>
      </div>
    </div>
  );
}
