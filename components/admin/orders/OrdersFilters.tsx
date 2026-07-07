'use client';

import { Search } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

interface OrdersFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: 'all' | 'pending' | 'in-progress' | 'completed' | 'cancelled') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function OrdersFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: OrdersFiltersProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const pageTabs = ['all', 'pending', 'in-progress', 'completed', 'cancelled'] as const;

  // Dynamic Theme Classes
  const activeTabClass = isNavy
    ? 'bg-[#0B2545] shadow-[#0B2545]/20'
    : 'bg-[#EE5E36] shadow-[#EE5E36]/20';
  const hoverTextClass = isNavy ? 'hover:text-[#0B2545]' : 'hover:text-[#EE5E36]';
  const inputFocusClass = isNavy
    ? 'focus:border-[#0B2545] focus:ring-[#0B2545]/20'
    : 'focus:border-[#EE5E36] focus:ring-[#EE5E36]/20';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#0B2545]/10 rounded-3xl p-4 shadow-3xs">
      <div className="flex flex-wrap gap-2">
        {pageTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer ${
                isActive
                  ? `${activeTabClass} text-white shadow-xs`
                  : `text-[#0B2545]/70 ${hoverTextClass}`
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="relative w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search service, ID, worker..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`border border-[#0B2545]/10 rounded-2xl px-4 py-2 text-xs focus:outline-none bg-white w-full sm:w-64 transition-all focus:ring-1 ${inputFocusClass}`}
        />
        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
      </div>
    </div>
  );
}
