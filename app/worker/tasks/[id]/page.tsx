'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  Check,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { getLocalOrders, saveLocalOrders } from '@/utils/worker-store';
import { OrderItem } from '@/components/orders/constants';
import { updateWorkerProfile } from '@/utils/worker-profile-store';
import { useAuth } from '@/hooks/use-auth';

interface WorkerTaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function WorkerTaskDetailPage({ params }: WorkerTaskDetailPageProps) {
  const { user } = useAuth();
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [task, setTask] = useState<OrderItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const workerName = 'Marcus Vance';

  useEffect(() => {
    Promise.resolve().then(() => {
      const localOrders = getLocalOrders();
      setOrders(localOrders);
      const matched = localOrders.find((o) => o.id === id);
      if (matched) {
        setTask(matched);
      }
    });
  }, [id]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const updateTaskStatusInStore = (updatedTask: OrderItem) => {
    const updatedOrders = orders.map((o) => (o.id === updatedTask.id ? updatedTask : o));
    setOrders(updatedOrders);
    setTask(updatedTask);
    saveLocalOrders(updatedOrders);
  };

  // Status Action Cycles
  const handleAction = () => {
    if (!task) return;

    let nextStatus: OrderItem['status'] = task.status;
    let toast = '';
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    switch (task.status) {
      case 'assigned':
        nextStatus = 'accepted';
        toast = 'Assignment accepted successfully!';
        break;
      case 'accepted':
        nextStatus = 'on-the-way';
        toast = 'Transit started! You are on the way.';
        break;
      case 'on-the-way':
        nextStatus = 'in-progress';
        toast = 'Work started! Status updated to IN PROGRESS.';
        break;
      case 'in-progress':
        nextStatus = 'completed';
        toast = 'Great job! Service marked as COMPLETED.';

        // Reset worker pool status to Available
        const workerEmail = user?.email || 'worker@example.com';
        updateWorkerProfile(workerEmail, { poolStatus: 'Available' });
        break;
      default:
        return;
    }

    const updatedTimeline = [...task.timeline];
    // Mark the previous pending timeline steps as done
    if (nextStatus === 'accepted') {
      const assignedIndex = updatedTimeline.findIndex((t) =>
        t.title.toLowerCase().includes('assigned')
      );
      if (assignedIndex !== -1) {
        updatedTimeline[assignedIndex] = {
          ...updatedTimeline[assignedIndex],
          title: 'Professional Assigned & Accepted',
          date: `Today, ${nowStr}`,
          description: `${workerName} has accepted your order booking.`,
          done: true,
        };
      }
    } else if (nextStatus === 'completed') {
      const completedIndex = updatedTimeline.findIndex((t) =>
        t.title.toLowerCase().includes('completed')
      );
      if (completedIndex !== -1) {
        updatedTimeline[completedIndex] = {
          ...updatedTimeline[completedIndex],
          date: `Today, ${nowStr}`,
          description: 'The work has been completed. Cash on Delivery collection pending.',
          done: true,
        };
      }
    } else {
      updatedTimeline.push({
        title: nextStatus.toUpperCase().replace(/-/g, ' '),
        date: `Today, ${nowStr}`,
        description: `Task updated by ${workerName}`,
        done: true,
      });
    }

    const updatedTask = {
      ...task,
      status: nextStatus,
      timeline: updatedTimeline,
    };

    updateTaskStatusInStore(updatedTask);
    triggerToast(toast);
  };

  // Dynamic Theme Styling
  const hoverTextClass = isNavy ? 'hover:text-[#0B2545]' : 'hover:text-[#EE5E36]';
  const orderIdTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const toastBorderClass = isNavy ? 'border-[#0B2545]/20' : 'border-[#EE5E36]/20';
  const tickColorClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const accentBgClass = isNavy ? 'bg-[#0B2545]' : 'bg-[#EE5E36]';
  const accentTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const accentLightBgClass = isNavy ? 'bg-[#0B2545]/5' : 'bg-[#FFF4F0]';
  const accentBorderClass = isNavy ? 'border-[#0B2545]/10' : 'border-[#EE5E36]/10';
  const btnHoverClass = isNavy ? 'hover:bg-[#0B2545]/90' : 'hover:bg-[#d64e29]';

  if (!task) {
    return (
      <div className="min-h-screen py-12 flex flex-col justify-center items-center space-y-4 bg-white text-center font-sans text-[#0B2545] animate-in fade-in duration-300">
        <AlertCircle className="w-12 h-12 text-gray-300 animate-bounce" />
        <h2 className="text-xl font-black">Task Not Found</h2>
        <p className="text-sm text-gray-500 max-w-xs">The requested service job does not exist.</p>
        <Link
          href="/worker/tasks"
          className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider ${hoverTextClass}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </Link>
      </div>
    );
  }

  // Action Button config
  const getActionBtnConfig = () => {
    switch (task.status) {
      case 'assigned':
        return { label: 'Accept Job Assignment', icon: CheckCircle };
      case 'accepted':
        return { label: 'Start Transit / On The Way', icon: MapPin };
      case 'on-the-way':
        return { label: 'Arrived / Start Work', icon: CheckCircle };
      case 'in-progress':
        return { label: 'Mark as Completed', icon: Check };
      default:
        return null;
    }
  };

  const btnConfig = getActionBtnConfig();

  return (
    <div className="min-h-screen py-6 font-sans text-[#0B2545] relative bg-white animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-[#0B2545] border ${toastBorderClass} text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300`}
        >
          <CheckCircle className={`w-5 h-5 ${tickColorClass}`} />
          <span className="text-xs font-bold tracking-wide">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Button */}
        <div>
          <Link
            href="/worker/tasks"
            className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0B2545]/60 ${hoverTextClass} transition-colors group`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Task Board
          </Link>
        </div>

        {/* Header Details */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#0B2545]/10 pb-5 text-left">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Service Ticket Details</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Job ID: <span className={`font-mono ${orderIdTextClass}`}>{task.id}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-gray-400">
              Status:
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${
                task.status === 'completed' ||
                task.status === 'cash-collected' ||
                task.status === 'closed'
                  ? 'bg-green-50 text-green-700 border-green-100'
                  : task.status === 'in-progress'
                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                    : task.status === 'on-the-way'
                      ? 'bg-amber-50 text-amber-700 border-amber-100'
                      : task.status === 'assigned' || task.status === 'accepted'
                        ? 'bg-purple-50 text-purple-700 border-purple-100'
                        : 'bg-gray-50 text-gray-700 border-gray-100'
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Service Info, Customer Card, Actions */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Service & Schedule details */}
            <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-5 shadow-3xs">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest border ${
                    isNavy
                      ? 'bg-[#0B2545]/5 text-[#0B2545] border-[#0B2545]/10'
                      : 'bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/10'
                  }`}
                >
                  {task.category}
                </span>
              </div>
              <h3 className="text-xl font-black mt-1 leading-tight">{task.serviceName}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-50 pt-5 text-xs font-bold text-[#0B2545]">
                <div className="flex items-start gap-3">
                  <Calendar className={`w-4 h-4 shrink-0 mt-0.5 ${accentTextClass}`} />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Scheduled Date
                    </p>
                    <p className="mt-0.5">{task.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${accentTextClass}`} />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Schedule Window
                    </p>
                    <p className="mt-0.5">{task.timeSlot}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information Card */}
            <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-4 shadow-3xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-2">
                Customer Contacts & Location
              </h4>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${accentBorderClass} ${accentLightBgClass} ${accentTextClass}`}
                  >
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Client Name
                    </p>
                    <p className="text-sm font-black mt-0.5">Jane Doe</p>
                  </div>
                </div>

                <a
                  href="tel:+15550192834"
                  className={`inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2 border ${accentBorderClass} ${accentLightBgClass} ${accentTextClass} rounded-xl hover:opacity-90 transition-all`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Customer
                </a>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-50 pt-4 text-xs font-bold">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${accentTextClass}`} />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Service Destination
                  </p>
                  <p className="mt-0.5 leading-relaxed text-[#0B2545]/80">{task.address}</p>
                </div>
              </div>
            </div>

            {/* Interactive Status Transition Action Button */}
            {btnConfig && (
              <div className="pt-2">
                <button
                  onClick={handleAction}
                  className={`w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider py-4 text-white ${accentBgClass} ${btnHoverClass} rounded-2xl transition-all shadow-md active:scale-99 cursor-pointer`}
                >
                  <btnConfig.icon className="w-4 h-4" />
                  {btnConfig.label}
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Invoice & Invoicing details */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-4 shadow-3xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-2">
                Invoice Settlement Summary
              </h4>

              <div className="space-y-3 text-xs font-bold">
                <div className="flex justify-between">
                  <span className="text-gray-400">Client Service Price</span>
                  <span>${task.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-50 pt-3">
                  <span className="text-gray-400">Payment Collection Method</span>
                  <span className="text-[#0B2545]/80 text-right max-w-[150px]">
                    {task.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-50 pt-3 text-sm font-black">
                  <span>Settlement Due</span>
                  <span className={accentTextClass}>${task.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Timeline Progress Tracker */}
            <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-4 shadow-3xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-2">
                Task Progress Logs
              </h4>

              <div className="space-y-4 text-xs font-medium">
                {task.timeline.map((step, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {i < task.timeline.length - 1 && (
                      <div className="absolute left-[7px] top-[14px] bottom-[-22px] w-px bg-gray-200" />
                    )}
                    <div
                      className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${
                        step.done ? accentBgClass : 'bg-gray-150 border border-gray-200'
                      }`}
                    />
                    <div>
                      <p className="font-bold text-[#0B2545]">{step.title}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{step.date}</p>
                      <p className="text-[10px] text-gray-400 leading-normal mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
