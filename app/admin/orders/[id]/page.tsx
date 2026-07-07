'use client';

import { use, useState } from 'react';
import { MOCK_ORDERS } from '@/components/orders/constants';
import { ODPHeader } from '@/components/admin/orders/odp/ODPHeader';
import { ODPServiceDetails } from '@/components/admin/orders/odp/ODPServiceDetails';
import { ODPInvoice } from '@/components/admin/orders/odp/ODPInvoice';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminOrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  // Find dynamic order item
  const order = MOCK_ORDERS.find((o) => o.id === id);

  const [status, setStatus] = useState(order?.status || 'pending');
  const [workerName, setWorkerName] = useState(order?.worker?.name || 'Unassigned');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
    setStatus(newStatus);
    triggerToast(`Booking status updated to ${newStatus.toUpperCase()}`);
  };

  const handleWorkerChange = (newWorker: string) => {
    setWorkerName(newWorker);
    triggerToast(`Worker reassigned to: ${newWorker}`);
  };

  // Dynamic Theme Styling
  const toastBorderClass = isNavy ? 'border-[#0B2545]/20' : 'border-[#EE5E36]/20';
  const tickColorClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const notFoundBtnClass = isNavy
    ? 'text-[#0B2545] hover:text-[#051221]'
    : 'text-[#EE5E36] hover:text-[#d64e29]';

  if (!order) {
    return (
      <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center text-[#0B2545] font-sans p-6 text-center space-y-4">
        <h2 className="text-xl font-black">Booking Not Found</h2>
        <p className="text-sm text-gray-500 max-w-xs">The booking order record does not exist.</p>
        <Link
          href="/admin/orders"
          className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider ${notFoundBtnClass}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 font-sans text-[#0B2545] relative bg-white">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-[#0B2545] border ${toastBorderClass} text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300`}
        >
          <CheckCircle className={`w-5 h-5 ${tickColorClass}`} />
          <span className="text-xs font-bold tracking-wide">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ODPHeader orderId={order.id} status={status} onStatusChange={handleStatusChange} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Details */}
          <div className="lg:col-span-8 space-y-6">
            <ODPServiceDetails
              serviceName={order.serviceName}
              category={order.category}
              date={order.date}
              timeSlot={order.timeSlot}
              address={order.address}
              workerName={workerName}
              onWorkerChange={handleWorkerChange}
            />
          </div>

          {/* Right Column - Invoicing */}
          <div className="lg:col-span-4 space-y-6">
            <ODPInvoice price={order.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
