'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-8 border-t border-gray-100 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl border border-gray-200 hover:border-[#EE5E36]/30 hover:bg-[#FFF4F0]/30 text-[#0B2545] disabled:text-gray-300 disabled:border-gray-100 disabled:hover:bg-transparent transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer flex items-center justify-center ${
            currentPage === page
              ? 'bg-[#EE5E36] text-white shadow-3xs'
              : 'border border-gray-200 hover:border-[#EE5E36]/30 hover:bg-[#FFF4F0]/30 text-[#0B2545]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl border border-gray-200 hover:border-[#EE5E36]/30 hover:bg-[#FFF4F0]/30 text-[#0B2545] disabled:text-gray-300 disabled:border-gray-100 disabled:hover:bg-transparent transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
