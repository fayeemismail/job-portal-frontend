'use client';

import { useSidebar } from '@/components/ui/sidebar';

export function OrdersHeader() {
  const { accentTheme } = useSidebar();
  const textClass = accentTheme === 'navy' ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  return (
    <div className="text-left border-b border-[#0B2545]/10 pb-4">
      <h1 className="text-2xl font-black tracking-tight">Orders</h1>
      <p className={`text-[10px] font-bold ${textClass} uppercase tracking-wider mt-0.5`}>
        Manage and monitor all booking requests
      </p>
    </div>
  );
}
