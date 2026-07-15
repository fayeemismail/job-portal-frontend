'use client';

import { use, useState, useEffect } from 'react';
import { ODPHeader } from '@/components/admin/orders/odp/ODPHeader';
import { ODPServiceDetails } from '@/components/admin/orders/odp/ODPServiceDetails';
import { ODPInvoice } from '@/components/admin/orders/odp/ODPInvoice';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { getLocalOrders, saveLocalOrders } from '@/utils/worker-store';
import { updateWorkerProfile, getLocalWorkers, WorkerProfile } from '@/utils/worker-profile-store';
import { WorkerAssignmentSelector } from '@/components/admin/orders/WorkerAssignmentSelector';
import { OrderItem } from '@/components/orders/constants';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminOrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      setOrders(getLocalOrders());
      setMounted(true);
    });

    const handleUpdate = () => {
      setOrders(getLocalOrders());
    };

    window.addEventListener('bookingsUpdated', handleUpdate);
    return () => {
      window.removeEventListener('bookingsUpdated', handleUpdate);
    };
  }, []);

  // Find dynamic order item
  const order = orders.find((o) => o.id === id);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStatusChange = (newStatus: OrderItem['status']) => {
    if (!order) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedTimeline = [...order.timeline];
    updatedTimeline.push({
      title: `Status Overridden: ${newStatus.toUpperCase()}`,
      date: `Today, ${nowStr}`,
      description: `Status manually overridden by Admin`,
      done: true,
    });

    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus, timeline: updatedTimeline } : o
    );
    saveLocalOrders(updatedOrders);
    triggerToast(`Booking status updated to ${newStatus.toUpperCase()}`);
  };

  const handleWorkerAssign = (worker: WorkerProfile) => {
    if (!order) return;

    // 1. Release previous worker (set back to Available)
    if (order.worker) {
      const allWorkers = getLocalWorkers();
      const prev = allWorkers.find((w) => w.name === order.worker?.name);
      if (prev) {
        updateWorkerProfile(prev.email, { poolStatus: 'Available' });
      }
    }

    // 2. Book selected worker (set to Busy)
    updateWorkerProfile(worker.email, { poolStatus: 'Busy' });

    // 3. Update order worker info and set status to 'assigned'
    const initials = worker.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedTimeline = [...order.timeline];

    // Mark assigned step as completed
    const assignedIndex = updatedTimeline.findIndex((t) =>
      t.title.toLowerCase().includes('assigned')
    );
    if (assignedIndex !== -1) {
      updatedTimeline[assignedIndex] = {
        title: 'Professional Assigned',
        date: `Today, ${nowStr}`,
        description: `${worker.name} has been assigned to your order.`,
        done: true,
      };
    } else {
      updatedTimeline.push({
        title: 'Professional Assigned',
        date: `Today, ${nowStr}`,
        description: `${worker.name} has been assigned to your order.`,
        done: true,
      });
    }

    const updatedOrders = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            status: 'assigned' as const,
            worker: {
              name: worker.name,
              role: worker.role,
              avatarInitials: initials || 'EX',
              rating: worker.rating,
            },
            timeline: updatedTimeline,
          }
        : o
    );

    saveLocalOrders(updatedOrders);
    triggerToast(`Worker assigned to: ${worker.name}`);
  };

  // Dynamic Theme Styling
  const toastBorderClass = isNavy ? 'border-[#0B2545]/20' : 'border-[#EE5E36]/20';
  const tickColorClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const notFoundBtnClass = isNavy
    ? 'text-[#0B2545] hover:text-[#051221]'
    : 'text-[#EE5E36] hover:text-[#d64e29]';

  if (!mounted) {
    return <div className="min-h-screen bg-white animate-pulse" />;
  }

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

  const workerName = order.worker?.name || 'Unassigned';

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
        <ODPHeader orderId={order.id} status={order.status} onStatusChange={handleStatusChange} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Details & Allocation */}
          <div className="lg:col-span-8 space-y-6">
            <ODPServiceDetails
              serviceName={order.serviceName}
              category={order.category}
              date={order.date}
              timeSlot={order.timeSlot}
              address={order.address}
            />

            <WorkerAssignmentSelector
              category={order.category}
              currentWorkerName={workerName}
              onAssign={handleWorkerAssign}
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
