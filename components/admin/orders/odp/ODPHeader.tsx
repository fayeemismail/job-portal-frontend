'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

interface ODPHeaderProps {
  orderId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  onStatusChange: (status: 'pending' | 'in-progress' | 'completed' | 'cancelled') => void;
}

export function ODPHeader({ orderId, status, onStatusChange }: ODPHeaderProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  // Dynamic Theme Styling
  const hoverTextClass = isNavy ? 'hover:text-[#0B2545]' : 'hover:text-[#EE5E36]';
  const orderIdTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const focusBorderClass = isNavy ? 'focus:border-[#0B2545]' : 'focus:border-[#EE5E36]';

  return (
    <div className="space-y-4 font-sans text-[#0B2545] text-left">
      {/* Back button */}
      <div>
        <Link
          href="/admin/orders"
          className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0B2545]/60 ${hoverTextClass} transition-colors group`}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Orders
        </Link>
      </div>

      {/* Header layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#0B2545]/10 pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Order Details</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            ID: <span className={`font-mono ${orderIdTextClass}`}>{orderId}</span>
          </p>
        </div>

        {/* Interactive Status Changer Dropdown */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-gray-400">
            Booking Status:
          </span>
          <select
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as 'pending' | 'in-progress' | 'completed' | 'cancelled'
              )
            }
            className={`border border-[#0B2545]/10 rounded-xl px-4 py-2 text-xs font-bold text-[#0B2545] ${focusBorderClass} bg-white cursor-pointer transition-all`}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}
