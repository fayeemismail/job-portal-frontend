'use client';

import { useState, useEffect } from 'react';
import { OrderItem } from '@/components/orders/constants';
import { Pagination } from '@/components/shared/Pagination';
import { OrdersHeader } from '@/components/admin/orders/OrdersHeader';
import { OrdersFilters } from '@/components/admin/orders/OrdersFilters';
import { OrdersTable } from '@/components/admin/orders/OrdersTable';
import { getLocalOrders } from '@/utils/worker-store';

type FilterType = 'all' | 'pending' | 'in-progress' | 'completed' | 'cancelled';
const PAGE_SIZE = 5;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  if (!mounted) {
    return <div className="min-h-screen bg-white animate-pulse" />;
  }

  // Filter computation
  const filteredOrders = orders.filter((order) => {
    if (activeFilter !== 'all' && order.status !== activeFilter) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchService = order.serviceName.toLowerCase().includes(query);
      const matchId = order.id.toLowerCase().includes(query);
      const matchWorker = order.worker?.name.toLowerCase().includes(query) || false;
      return matchService || matchId || matchWorker;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300 font-sans text-[#0B2545]">
      <OrdersHeader />

      <OrdersFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <OrdersTable orders={paginatedOrders} />

      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
