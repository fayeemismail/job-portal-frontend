'use client';

import { Receipt } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

interface ODPInvoiceProps {
  price: number;
}

export function ODPInvoice({ price }: ODPInvoiceProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const tax = price * 0.08;
  const flatFee = 15.0;
  const total = price + tax + flatFee;

  // Dynamic Theme Styling
  const iconColorClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const totalTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  return (
    <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-4 text-left font-sans text-[#0B2545] shadow-xs">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <Receipt className={`w-4 h-4 ${iconColorClass}`} />
        <h4 className="text-xs font-black uppercase tracking-wider">Billing Invoice Receipt</h4>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-gray-500 font-semibold">
          <span>Service Base Cost:</span>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-500 font-semibold">
          <span>Standard Platform Service Fee:</span>
          <span>${flatFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-500 font-semibold">
          <span>Local Taxes (8%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100/60 pt-3 flex justify-between items-center font-black text-sm">
          <span>Final Invoice Total:</span>
          <span className={`font-extrabold ${totalTextClass}`}>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
