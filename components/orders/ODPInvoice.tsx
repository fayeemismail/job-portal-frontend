'use client';

import { ORDERS_PAGE_COPY } from './constants';

interface ODPInvoiceProps {
  basePrice: number;
  serviceFee: number;
  tax: number;
  totalPrice: number;
}

export function ODPInvoice({ basePrice, serviceFee, tax, totalPrice }: ODPInvoiceProps) {
  return (
    <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 space-y-6 shadow-xs">
      <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2545] border-b border-gray-100 pb-3">
        {ORDERS_PAGE_COPY.receiptBreakdownTitle}
      </h4>
      <div className="space-y-3.5 text-xs font-bold text-gray-500">
        <div className="flex justify-between">
          <span>{ORDERS_PAGE_COPY.baseBookingRateLabel}</span>
          <span className="text-[#0B2545]">${basePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{ORDERS_PAGE_COPY.fixedServiceFeeLabel}</span>
          <span className="text-[#0B2545]">${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{ORDERS_PAGE_COPY.taxesLabel}</span>
          <span className="text-[#0B2545]">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-black text-[#0B2545] border-t border-dashed border-gray-200 pt-3.5">
          <span className="text-[#0B2545]">{ORDERS_PAGE_COPY.finalTotalLabel}</span>
          <span className="text-[#EE5E36]">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
