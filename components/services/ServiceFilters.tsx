'use client';

import { Star, RefreshCw } from 'lucide-react';
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
  const ratingOptions = [0, 4.0, 4.5, 4.8];

  return (
    <div className="flex flex-col gap-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs select-none">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-[#0B2545] font-extrabold text-base">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#EE5E36] hover:text-[#0B2545] font-bold flex items-center gap-1 cursor-pointer transition-colors duration-200"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category checklist */}
      <div className="flex flex-col">
        <h4 className="text-[#0B2545] font-extrabold text-sm mb-4">Categories</h4>
        <div className="flex flex-col gap-3">
          {SERVICE_CATEGORIES.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 text-sm text-gray-500 font-semibold cursor-pointer hover:text-gray-700 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onCategoryChange(cat.id)}
                  className="w-4.5 h-4.5 rounded border-gray-200 text-[#EE5E36] focus:ring-[#EE5E36]/30 cursor-pointer"
                />
                <span className={isChecked ? 'text-[#EE5E36]' : ''}>{cat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#0B2545] font-extrabold text-sm">Price Limit</h4>
          <span className="text-xs font-bold text-[#EE5E36] bg-[#FFF4F0] px-2 py-0.5 rounded-sm">
            Max ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="250"
          step="5"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-[#EE5E36] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
          <span>$10</span>
          <span>$250</span>
        </div>
      </div>

      {/* 3. Minimum Rating stars selector */}
      <div className="flex flex-col">
        <h4 className="text-[#0B2545] font-extrabold text-sm mb-4">Minimum Rating</h4>
        <div className="flex flex-col gap-2">
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onRatingChange(rating)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left w-full border ${
                minRating === rating
                  ? 'border-[#EE5E36]/20 bg-[#FFF4F0] text-[#EE5E36]'
                  : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700'
              } cursor-pointer`}
            >
              {rating === 0 ? (
                <span>Any Rating</span>
              ) : (
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                  <span>{rating.toFixed(1)}+ Stars</span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
