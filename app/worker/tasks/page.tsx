'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ChevronRight, Search } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { getLocalOrders } from '@/utils/worker-store';
import { OrderItem } from '@/components/orders/constants';

export default function WorkerTasksPage() {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setOrders(getLocalOrders());
      setMounted(true);
    });
  }, []);

  const workerName = 'Marcus Vance';

  // Filter lists based on active tab
  const getFilteredTasks = () => {
    let list: OrderItem[] = [];
    if (activeTab === 'active') {
      // Active jobs assigned to Marcus
      list = orders.filter(
        (o) => o.worker?.name === workerName && o.status !== 'completed' && o.status !== 'cancelled'
      );
    } else if (activeTab === 'available') {
      // Unassigned bookings waiting for dispatch
      list = orders.filter((o) => o.worker === null && o.status === 'pending');
    } else {
      // Completed jobs by Marcus
      list = orders.filter((o) => o.worker?.name === workerName && o.status === 'completed');
    }

    // Filter by search query (customer name or service title)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (o) => o.serviceName.toLowerCase().includes(q) || o.category.toLowerCase().includes(q)
      );
    }

    return list;
  };

  const filteredTasks = getFilteredTasks();

  // Dynamic Theme Colors
  const accentTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const activeTabClass = isNavy
    ? 'bg-[#0B2545] text-white shadow-3xs'
    : 'bg-[#EE5E36] text-white shadow-3xs';
  const focusBorderClass = isNavy ? 'focus:border-[#0B2545]' : 'focus:border-[#EE5E36]';
  const focusRingClass = isNavy ? 'focus:ring-[#0B2545]/10' : 'focus:ring-[#EE5E36]/10';

  if (!mounted) {
    return <div className="min-h-screen bg-white animate-pulse" />;
  }

  return (
    <div className="space-y-6 text-[#0B2545] font-sans text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-gray-100 pb-5">
        <span className={`text-[10px] font-black uppercase tracking-widest ${accentTextClass}`}>
          Task Schedules
        </span>
        <h1 className="text-2xl font-black mt-1">My Service Tasks</h1>
      </div>

      {/* Tabs and Search Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
        <div className="flex gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'active' ? activeTabClass : 'text-[#0B2545]/60 hover:bg-gray-100/50'
            }`}
          >
            Active Work
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'available' ? activeTabClass : 'text-[#0B2545]/60 hover:bg-gray-100/50'
            }`}
          >
            Job Board
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'completed' ? activeTabClass : 'text-[#0B2545]/60 hover:bg-gray-100/50'
            }`}
          >
            History
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs font-bold text-[#0B2545] border border-gray-200 focus:outline-none focus:ring-2 ${focusRingClass} ${focusBorderClass} rounded-xl bg-white transition-all`}
          />
        </div>
      </div>

      {/* Task Cards List */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <Link
              key={task.id}
              href={`/worker/tasks/${task.id}`}
              className="bg-white border border-[#0B2545]/10 rounded-2xl p-4 shadow-3xs hover:border-[#0B2545]/50 transition-colors duration-300 flex flex-col justify-between gap-3 text-left relative group overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest border ${
                      isNavy
                        ? 'bg-[#0B2545]/5 text-[#0B2545] border-[#0B2545]/10'
                        : 'bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/10'
                    }`}
                  >
                    {task.category}
                  </span>
                  <span className="text-[9.5px] font-mono text-gray-400 font-bold">{task.id}</span>
                </div>

                <h3 className="text-sm font-black leading-snug text-[#0B2545] group-hover:text-gray-700 transition-colors">
                  {task.serviceName}
                </h3>

                <div className="grid grid-cols-1 gap-1.5 pt-1.5 text-xs font-bold text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{task.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{task.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[200px]">{task.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-1">
                <span className="text-[13px] font-black text-gray-900">
                  ${task.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      task.status === 'completed'
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : task.status === 'in-progress'
                          ? 'bg-blue-50 text-blue-700 border-blue-100'
                          : task.status === 'dispatched'
                            ? 'bg-purple-50 text-purple-700 border-purple-100'
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}
                  >
                    {task.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50/30 border border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-400 font-bold uppercase tracking-wider text-xs">
          No tasks found matching criteria.
        </div>
      )}
    </div>
  );
}
