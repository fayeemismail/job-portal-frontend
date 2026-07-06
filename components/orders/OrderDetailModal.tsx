'use client';

import { X, Calendar, Clock, MapPin, CreditCard, CheckCircle, Circle } from 'lucide-react';
import { OrderItem, ORDERS_PAGE_COPY } from './constants';

interface OrderDetailModalProps {
  order: OrderItem | null;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-[#0B2545]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Backdrop Close click */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-[620px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl relative z-10 animate-in zoom-in-95 duration-200 text-[#0B2545]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-[#0B2545] transition-colors rounded-full hover:bg-gray-50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-gray-100 pb-4 pr-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE5E36]">
            {order.category}
          </span>
          <h2 className="text-xl font-black tracking-tight">{order.serviceName}</h2>
          <span className="text-xs font-bold text-gray-400 block mt-1">
            {ORDERS_PAGE_COPY.orderIdLabel}{' '}
            <strong className="text-[#0B2545] font-extrabold">{order.id}</strong>
          </span>
        </div>

        {/* Schedule & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.dateLabel.replace(':', '')}
                </span>
                <p className="text-xs font-extrabold text-[#0B2545]">{order.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.timeLabel.replace(':', '')}
                </span>
                <p className="text-xs font-extrabold text-[#0B2545]">{order.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CreditCard className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.paymentLabel.replace(':', '')}
                </span>
                <p className="text-xs font-extrabold text-[#0B2545]">{order.paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-[#EE5E36] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  {ORDERS_PAGE_COPY.addressLabel.replace(':', '')}
                </span>
                <p className="text-xs font-semibold text-gray-500 leading-normal">
                  {order.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline tracking section */}
        <div className="border-t border-gray-100 pt-5 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2545]">
            {ORDERS_PAGE_COPY.trackTimelineLabel}
          </h4>
          <div className="space-y-4">
            {order.timeline.map((step, idx) => {
              const isLast = idx === order.timeline.length - 1;
              return (
                <div key={idx} className="flex gap-3 relative">
                  {/* Vertical connector line */}
                  {!isLast && (
                    <div
                      className={`absolute left-2.5 top-5 bottom-[-16px] w-[2px] ${
                        step.done ? 'bg-[#EE5E36]' : 'bg-gray-100'
                      }`}
                    />
                  )}

                  <div className="shrink-0 z-10 bg-white">
                    {step.done ? (
                      <CheckCircle className="w-5.5 h-5.5 text-[#EE5E36]" />
                    ) : (
                      <Circle className="w-5.5 h-5.5 text-gray-200" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span
                        className={`text-xs font-black ${
                          step.done ? 'text-[#0B2545]' : 'text-gray-400'
                        }`}
                      >
                        {step.title}
                      </span>
                      {step.date !== '--' && (
                        <span className="text-[9px] font-bold text-gray-400">({step.date})</span>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-gray-500 leading-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Footer */}
        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
              {ORDERS_PAGE_COPY.priceLabel.replace(':', '')}
            </span>
            <span className="text-lg font-black text-[#EE5E36]">${order.price.toFixed(2)}</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#0B2545]/15 hover:bg-gray-50 text-[#0B2545]/80 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {ORDERS_PAGE_COPY.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
