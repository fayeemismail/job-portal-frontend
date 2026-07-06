'use client';

import { ORDERS_PAGE_COPY } from './constants';

type FilterType = 'all' | 'active' | 'completed' | 'cancelled';

interface OrdersFiltersProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

export function OrdersFilters({ activeFilter, setActiveFilter }: OrdersFiltersProps) {
  const tabs: Array<{ id: FilterType; label: string }> = [
    { id: 'all', label: ORDERS_PAGE_COPY.filterAll },
    { id: 'active', label: ORDERS_PAGE_COPY.filterActive },
    { id: 'completed', label: ORDERS_PAGE_COPY.filterCompleted },
    { id: 'cancelled', label: ORDERS_PAGE_COPY.filterCancelled },
  ];

  return (
    <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveFilter(tab.id)}
          className={`py-4 border-b-2 font-bold text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeFilter === tab.id
              ? 'border-[#EE5E36] text-[#EE5E36]'
              : 'border-transparent text-[#0B2545]/60 hover:text-[#EE5E36]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
