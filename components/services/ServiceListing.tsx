'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { MOCK_SERVICES, SERVICE_CATEGORIES, SORT_OPTIONS } from './constants';
import { ServiceCard } from './ServiceCard';
import { ServiceFilters } from './ServiceFilters';
import { SortKey } from './types';

export function ServiceListing() {
  // 1. States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // 2. Event Handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((id) => id !== category) : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMaxPrice(250);
    setMinRating(0);
    setSortBy('popular');
  };

  const handleRemoveCategory = (catId: string) => {
    setSelectedCategories((prev) => prev.filter((id) => id !== catId));
  };

  // 3. Memoized Filtered & Sorted Listings
  const filteredServices = useMemo(() => {
    let result = [...MOCK_SERVICES];

    // Filter by text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    }

    // Filter by Category check
    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category));
    }

    // Filter by Price limit
    result = result.filter((s) => s.price <= maxPrice);

    // Filter by Rating stars
    if (minRating > 0) {
      result = result.filter((s) => s.rating >= minRating);
    }

    // Sort result
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: 'popular' (by reviewCount)
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedCategories, maxPrice, minRating, sortBy]);

  // Total active filter count
  const activeFiltersCount =
    selectedCategories.length + (maxPrice < 250 ? 1 : 0) + (minRating > 0 ? 1 : 0);

  return (
    <main className="grow bg-[#FAFAFA] py-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Title Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] leading-tight mb-2">
            Explore Professional Services
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl">
            Find and book top-rated local handymen, plumbers, cleaners, and electricians instantly.
          </p>
        </div>

        {/* 1. Top Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Field */}
          <div className="relative flex-1 group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. cleaning, plumbing)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm text-[#0B2545] placeholder-gray-400 focus:outline-hidden focus:border-[#EE5E36]/50 shadow-xs transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 w-full sm:w-auto">
            {/* Mobile Filters Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex md:hidden items-center justify-center gap-2 px-5 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-[#0B2545] cursor-pointer hover:bg-gray-50 transition-colors w-full"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#EE5E36]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-[#EE5E36] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-xs w-full sm:w-auto">
              <ArrowUpDown className="w-4.5 h-4.5 text-[#EE5E36] mr-2 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="bg-transparent text-sm font-bold text-[#0B2545] focus:outline-hidden cursor-pointer appearance-none pr-6 w-full"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mr-1">
              Active Filters:
            </span>
            {selectedCategories.map((catId) => {
              const label = SERVICE_CATEGORIES.find((c) => c.id === catId)?.label;
              return (
                <div
                  key={catId}
                  className="bg-white border border-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-[#0B2545] shadow-xs"
                >
                  <span>{label}</span>
                  <button
                    onClick={() => handleRemoveCategory(catId)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
            {maxPrice < 250 && (
              <div className="bg-white border border-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-[#0B2545] shadow-xs">
                <span>Under ${maxPrice}</span>
                <button
                  onClick={() => setMaxPrice(250)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {minRating > 0 && (
              <div className="bg-white border border-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-[#0B2545] shadow-xs">
                <span>{minRating}+ Stars</span>
                <button
                  onClick={() => setMinRating(0)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. Columns Content Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Panel */}
          <aside className="hidden md:block w-[280px] shrink-0">
            <ServiceFilters
              selectedCategories={selectedCategories}
              maxPrice={maxPrice}
              minRating={minRating}
              onCategoryChange={handleCategoryToggle}
              onPriceChange={setMaxPrice}
              onRatingChange={setMinRating}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Mobile Filters panel drawer overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex justify-end">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs"
                onClick={() => setMobileFiltersOpen(false)}
              />
              {/* Content Drawer */}
              <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col gap-6 animate-slide-left shadow-2xl">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-[#0B2545]">Filter Options</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <ServiceFilters
                  selectedCategories={selectedCategories}
                  maxPrice={maxPrice}
                  minRating={minRating}
                  onCategoryChange={handleCategoryToggle}
                  onPriceChange={setMaxPrice}
                  onRatingChange={setMinRating}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* Listing Grid */}
          <div className="flex-1">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                  const catLabel =
                    SERVICE_CATEGORIES.find((c) => c.id === service.category)?.label || '';
                  return (
                    <ServiceCard key={service.id} service={service} categoryLabel={catLabel} />
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-xs flex flex-col items-center">
                <SlidersHorizontal className="w-12 h-12 text-[#EE5E36] mb-4" />
                <h3 className="text-[#0B2545] font-extrabold text-lg mb-2">No Services Found</h3>
                <p className="text-gray-400 text-sm max-w-sm mb-6">
                  No listings matched your active filters or query. Try resetting filters or
                  changing your keywords!
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#EE5E36] hover:bg-[#0B2545] text-white font-bold text-sm rounded-xl transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
