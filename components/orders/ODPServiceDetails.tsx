'use client';

import Image from 'next/image';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { OrderItem, ORDERS_PAGE_COPY } from './constants';

interface ODPServiceDetailsProps {
  order: OrderItem;
}

export function ODPServiceDetails({ order }: ODPServiceDetailsProps) {
  return (
    <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl overflow-hidden shadow-xs">
      <div className="relative h-56 w-full overflow-hidden">
        <Image src={order.imageUrl} alt={order.serviceName} fill className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE5E36]">
            {order.category}
          </span>
          <h3 className="text-xl font-black tracking-tight text-[#0B2545] mt-0.5">
            {order.serviceName}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100/50 pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.scheduledDateLabel}
                </span>
                <p className="text-xs font-extrabold text-[#0B2545]">{order.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.timeWindowLabel}
                </span>
                <p className="text-xs font-extrabold text-[#0B2545]">{order.timeSlot}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.serviceDestinationLabel}
                </span>
                <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                  {order.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CreditCard className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.paymentModeLabel}
                </span>
                <p className="text-xs font-extrabold text-[#0B2545]">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
