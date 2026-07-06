'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, ArrowUpDown, X, ChevronDown } from 'lucide-react';
import { MOCK_SERVICES, SERVICE_CATEGORIES, SORT_OPTIONS } from './constants';
import { ServiceCard } from './ServiceCard';
import { ServiceFilters } from './ServiceFilters';
import { SortKey } from './types';
import { Pagination } from '@/components/shared/Pagination';

export function ServiceListing() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // 1. States (Init category list directly from searchParams)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);

  const PAGE_SIZE = 9;

  // 2. Event Handlers (Resetting currentPage dynamically when query/filter/sort parameters update)
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((id) => id !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleRemoveCategory = (catId: string) => {
    setSelectedCategories((prev) => prev.filter((id) => id !== catId));
    setCurrentPage(1);
  };

  const handlePriceChange = (val: number) => {
    setMaxPrice(val);
    setCurrentPage(1);
  };

  const handleRatingChange = (val: number) => {
    setMinRating(val);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSortChange = (key: SortKey) => {
    setSortBy(key);
    setSortOpen(false);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMaxPrice(250);
    setMinRating(0);
    setSortBy('popular');
    setCurrentPage(1);
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

    // Filter by Max Price
    result = result.filter((s) => s.price <= maxPrice);

    // Filter by Min Rating
    result = result.filter((s) => s.rating >= minRating);

    // Sorting operations
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategories, maxPrice, minRating, sortBy]);

  const activeFiltersCount = selectedCategories.length + (searchQuery.trim() ? 1 : 0);

  return (
    <div className="bg-white min-h-screen py-16 font-sans text-[#0B2545]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        {/* 1. Header with search bar and filter controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="relative w-full sm:max-w-md shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search services (e.g. cleaning, pipe leak)..."
              className="w-full bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-2xl pl-11 pr-10 py-3.5 text-xs font-semibold text-[#0B2545] focus:outline-hidden focus:border-[#EE5E36] placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
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

            {/* Custom Sorting Dropdown */}
            <div className="relative w-full sm:w-auto z-30">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-xs w-full sm:w-56 cursor-pointer text-left focus:outline-hidden select-none hover:border-gray-200"
              >
                <div className="flex items-center">
                  <ArrowUpDown className="w-4 h-4 text-[#EE5E36] mr-2.5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#0B2545]">
                    {SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    sortOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-25 overflow-hidden py-1.5 animate-in fade-in duration-200">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => handleSortChange(opt.key)}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                          sortBy === opt.key
                            ? 'bg-[#FFF4F0] text-[#EE5E36] font-bold'
                            : 'text-[#0B2545] hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
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
                  className="inline-flex items-center gap-1.5 bg-[#FFF4F0]/60 border border-[#EE5E36]/10 px-3 py-1.5 rounded-xl text-xs font-bold text-[#EE5E36]"
                >
                  <span>{label}</span>
                  <button
                    onClick={() => handleRemoveCategory(catId)}
                    className="p-0.5 hover:bg-white rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
            <button
              onClick={handleResetFilters}
              className="text-xs text-gray-400 hover:text-[#EE5E36] font-extrabold uppercase tracking-wider underline cursor-pointer px-1 py-1"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 3. Main content body layout split */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Desktop Filters panel sticky sidebar */}
          <aside className="hidden md:block w-72 shrink-0 sticky top-28 bg-[#FFFBF9] border border-[#EE5E36]/10 p-6 rounded-3xl space-y-6">
            <ServiceFilters
              selectedCategories={selectedCategories}
              maxPrice={maxPrice}
              minRating={minRating}
              onCategoryChange={handleCategoryToggle}
              onPriceChange={handlePriceChange}
              onRatingChange={handleRatingChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Mobile Filters panel drawer overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex justify-end">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs"
                onClick={() => setMobileFiltersOpen(false)}
              />
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
                  onPriceChange={handlePriceChange}
                  onRatingChange={handleRatingChange}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* Listing Grid */}
          <div className="flex-1">
            {filteredServices.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((service) => {
                      const catLabel =
                        SERVICE_CATEGORIES.find((c) => c.id === service.category)?.label || '';
                      return (
                        <ServiceCard key={service.id} service={service} categoryLabel={catLabel} />
                      );
                    })}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredServices.length / PAGE_SIZE)}
                  onPageChange={setCurrentPage}
                />
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
    </div>
  );
}
