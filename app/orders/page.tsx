'use client';

import { useState } from 'react';
import { Search, X, ClipboardList } from 'lucide-react';
import { MOCK_ORDERS, ORDERS_PAGE_COPY, OrderItem } from '@/components/orders/constants';
import { OrdersFilters } from '@/components/orders/OrdersFilters';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetailModal } from '@/components/orders/OrderDetailModal';

type FilterType = 'all' | 'active' | 'completed' | 'cancelled';

export default function UserOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Filter logic
  const filteredOrders = MOCK_ORDERS.filter((order) => {
    // 1. Tab filter
    if (activeFilter === 'active' && order.status !== 'pending' && order.status !== 'in-progress') {
      return false;
    }
    if (activeFilter === 'completed' && order.status !== 'completed') {
      return false;
    }
    if (activeFilter === 'cancelled' && order.status !== 'cancelled') {
      return false;
    }

    // 2. Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const serviceMatch = order.serviceName.toLowerCase().includes(query);
      const categoryMatch = order.category.toLowerCase().includes(query);
      const idMatch = order.id.toLowerCase().includes(query);
      return serviceMatch || categoryMatch || idMatch;
    }

    return true;
  });

  return (
    <div className="bg-white min-h-screen py-16 font-sans text-[#0B2545]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="border-b border-[#EE5E36]/10 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">{ORDERS_PAGE_COPY.title}</h1>
          <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-wider">
            {ORDERS_PAGE_COPY.subtitle}
          </p>
        </div>

        {/* Filters and Search Bar row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <OrdersFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ORDERS_PAGE_COPY.searchPlaceholder}
              className="w-full bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-2xl pl-10 pr-10 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B2545] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Orders list grid */}
        {filteredOrders.length === 0 ? (
          <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-16 text-center text-gray-400 font-semibold text-sm">
            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-[#EE5E36]/30" />
            <p>{ORDERS_PAGE_COPY.noOrdersMsg}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder} />
            ))}
          </div>
        )}

        {/* Details Inspector Modal Overlay */}
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      </div>
    </div>
  );
}
