'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { MOCK_ORDERS, ORDERS_PAGE_COPY, BILLING_CONFIG } from '@/components/orders/constants';
import { ODPHeader } from '@/components/orders/ODPHeader';
import { ODPServiceDetails } from '@/components/orders/ODPServiceDetails';
import { ODPTimeline } from '@/components/orders/ODPTimeline';
import { ODPInvoice } from '@/components/orders/ODPInvoice';
import { ODPActions } from '@/components/orders/ODPActions';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  // Find the order by ID
  const order = MOCK_ORDERS.find((o) => o.id === id);

  // States for actions (simulate modifications)
  const [isCancelled, setIsCancelled] = useState(order?.status === 'cancelled');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  if (!order) {
    return (
      <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center text-[#0B2545] font-sans p-6 text-center space-y-4">
        <h2 className="text-xl font-black">{ORDERS_PAGE_COPY.bookingNotFoundTitle}</h2>
        <p className="text-sm text-gray-500 max-w-xs">{ORDERS_PAGE_COPY.bookingNotFoundSubtitle}</p>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#EE5E36] hover:text-[#d64e29]"
        >
          <ArrowLeft className="w-4 h-4" />
          {ORDERS_PAGE_COPY.backToBookingsBtn}
        </Link>
      </div>
    );
  }

  // Cost calculations
  const basePrice = order.price;
  const serviceFee = BILLING_CONFIG.flatServiceFee;
  const tax = basePrice * BILLING_CONFIG.taxRate;
  const totalPrice = basePrice + serviceFee + tax;

  const currentStatus = isCancelled ? 'cancelled' : order.status;

  const handleCancelBooking = () => {
    if (window.confirm(ORDERS_PAGE_COPY.confirmCancelPrompt)) {
      setIsCancelled(true);
      triggerToast(ORDERS_PAGE_COPY.toastCancelSuccess);
    }
  };

  const handleDownloadInvoice = () => {
    triggerToast(ORDERS_PAGE_COPY.toastDownloadInvoice);
  };

  const handleReschedule = () => {
    triggerToast(ORDERS_PAGE_COPY.toastRescheduleSent);
  };

  return (
    <div className="bg-white min-h-screen py-16 font-sans text-[#0B2545] relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2545] border border-[#EE5E36]/20 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-5 h-5 text-[#EE5E36]" />
          <span className="text-xs font-bold tracking-wide">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dynamic ODP Header Block */}
        <ODPHeader orderId={order.id} status={currentStatus} />

        {/* ODP Page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Details & Progress Tracking */}
          <div className="lg:col-span-8 space-y-6">
            <ODPServiceDetails order={order} />
            <ODPTimeline timeline={order.timeline} isCancelled={isCancelled} />
          </div>

          {/* Right Column - Invoicing Receipts & Quick Widgets */}
          <div className="lg:col-span-4 space-y-6">
            <ODPInvoice
              basePrice={basePrice}
              serviceFee={serviceFee}
              tax={tax}
              totalPrice={totalPrice}
            />
            <ODPActions
              status={currentStatus}
              onDownloadInvoice={handleDownloadInvoice}
              onReschedule={handleReschedule}
              onCancelBooking={handleCancelBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
