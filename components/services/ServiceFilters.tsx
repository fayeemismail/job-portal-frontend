'use client';

import { Star, RefreshCw, ChevronDown, ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from './constants';

interface ServiceFiltersProps {
  selectedCategories: string[];
  maxPrice: number;
  minRating: number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: number) => void;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
}

export function ServiceFilters({
  selectedCategories,
  maxPrice,
  minRating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onReset,
}: ServiceFiltersProps) {
  const ratingOptions = [
    { value: 4.8, label: '5.0 Rating', stars: 5, count: 35 },
    { value: 4.5, label: '4.5+ Stars', stars: 4, count: 35 },
    { value: 4.0, label: '4.0+ Stars', stars: 3, count: 35 },
    { value: 0, label: 'Any Rating', stars: 0, count: 140 },
  ];

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Sidebar Section Header */}
      <div className="flex items-center justify-between pb-2 shrink-0">
        <h3 className="text-[#0B2545] font-black text-xl">Filter by</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#EE5E36] hover:text-[#0B2545] font-extrabold flex items-center gap-1 cursor-pointer transition-colors duration-200"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Card 1: Categories Checklist */}
      <div className="bg-[#FFF8F6] rounded-[24px] p-6 flex flex-col transition-all duration-300 hover:shadow-2xs">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#0B2545] font-extrabold text-sm">Categories</h4>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex flex-col gap-3">
          {SERVICE_CATEGORIES.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 text-sm text-gray-500 font-semibold cursor-pointer hover:text-[#EE5E36] select-none transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onCategoryChange(cat.id)}
                  className="w-4 h-4 rounded border-gray-300 text-[#EE5E36] focus:ring-[#EE5E36]/30 cursor-pointer"
                />
                <span className={isChecked ? 'text-[#EE5E36] font-bold' : ''}>{cat.label}</span>
              </label>
            );
          })}
        </div>
        <button
          type="button"
          className="text-xs text-[#EE5E36] font-extrabold flex items-center gap-1 mt-4 hover:text-[#0B2545] cursor-pointer self-start transition-colors duration-200"
        >
          <span>View More</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card 2: Price Range Slider */}
      <div className="bg-[#FFF8F6] rounded-[24px] p-6 flex flex-col transition-all duration-300 hover:shadow-2xs">
        <h4 className="text-[#0B2545] font-extrabold text-sm mb-4">Price Range</h4>
        <input
          type="range"
          min="10"
          max="250"
          step="5"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-[#EE5E36] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 font-bold mt-2">
          <span>$10</span>
          <span>$250</span>
        </div>
        <span className="text-xs font-bold text-[#EE5E36] mt-3">Price: $10 - ${maxPrice}</span>
      </div>

      {/* Card 3: Rating Checklist */}
      <div className="bg-[#FFF8F6] rounded-[24px] p-6 flex flex-col transition-all duration-300 hover:shadow-2xs">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#0B2545] font-extrabold text-sm">By Rating</h4>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex flex-col gap-3">
          {ratingOptions.map((opt) => {
            const isChecked = minRating === opt.value;
            return (
              <label
                key={opt.value}
                className="flex items-center justify-between text-sm text-gray-500 font-semibold cursor-pointer hover:text-[#EE5E36] select-none transition-colors w-full"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onRatingChange(opt.value)}
                    className="w-4 h-4 rounded border-gray-300 text-[#EE5E36] focus:ring-[#EE5E36]/30 cursor-pointer"
                  />
                  {opt.stars === 0 ? (
                    <span className={isChecked ? 'text-[#EE5E36] font-bold' : ''}>{opt.label}</span>
                  ) : (
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < opt.stars ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-semibold font-mono">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
