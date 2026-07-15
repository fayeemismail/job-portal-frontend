'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { CustomDropdown } from './CustomDropdown';

import { OrderItem } from '@/components/orders/constants';

interface ODPHeaderProps {
  orderId: string;
  status: OrderItem['status'];
  onStatusChange: (status: OrderItem['status']) => void;
}

export function ODPHeader({ orderId, status, onStatusChange }: ODPHeaderProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  // Dynamic Theme Styling
  const hoverTextClass = isNavy ? 'hover:text-[#0B2545]' : 'hover:text-[#EE5E36]';
  const orderIdTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending', desc: 'Booking request waiting for dispatch' },
    { value: 'assigned', label: 'Assigned', desc: 'Worker allocated but not accepted' },
    { value: 'accepted', label: 'Accepted', desc: 'Worker has accepted assignment' },
    { value: 'on-the-way', label: 'On The Way', desc: 'Worker is traveling to location' },
    { value: 'in-progress', label: 'In Progress', desc: 'Worker currently resolving task' },
    { value: 'completed', label: 'Completed', desc: 'Service completed successfully' },
    { value: 'cash-collected', label: 'Cash Collected', desc: 'Cash payment received on-site' },
    { value: 'closed', label: 'Closed', desc: 'Booking finalized and archived' },
    { value: 'cancelled', label: 'Cancelled', desc: 'Booking request revoked/cancelled' },
  ] as const;

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
          <CustomDropdown
            options={STATUS_OPTIONS}
            value={status}
            onChange={(val) => onStatusChange(val as ODPHeaderProps['status'])}
            widthClass="w-36"
          />
        </div>
      </div>
    </div>
  );
}
