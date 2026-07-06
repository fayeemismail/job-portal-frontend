'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, X, Search, Check } from 'lucide-react';
import { suggestedLocations } from '@/lib/data';

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
}

export function LocationSelector({
  isOpen,
  onClose,
  selectedLocation,
  onLocationSelect,
}: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter locations based on search query
  const filteredLocations = suggestedLocations.filter(
    (loc) =>
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrentLocation = () => {
    onLocationSelect('Current Location');
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop with transition */}
      <div
        className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Content container */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#0B2545] tracking-tight">
              Select Location
            </h2>
            <p className="text-[#0B2545]/60 text-xs mt-1 font-medium">
              Find top-rated professionals and services in your area
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#FFF4F0] text-gray-400 hover:text-[#EE5E36] transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Action Box */}
        <div className="p-6 pb-4 flex flex-col gap-3">
          {/* Search Input */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search city, state or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#EE5E36] focus:bg-white transition-all text-sm font-medium text-gray-800 placeholder-gray-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-semibold text-gray-400 hover:text-[#EE5E36] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Current Location Quick Option */}
          <button
            onClick={handleCurrentLocation}
            className={`w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border font-bold text-xs tracking-wider uppercase select-none transition-all duration-300 group cursor-pointer ${
              selectedLocation === 'Current Location'
                ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#EE5E36] shadow-xs active:scale-[0.98]'
                : 'bg-[#FFFBF9] hover:bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/10 hover:scale-[1.01] hover:shadow-3xs active:scale-[0.98]'
            }`}
          >
            <Navigation className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Use Current Location</span>
          </button>
        </div>

        {/* Suggested / Filtered Locations List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pr-4 max-h-[320px] scrollbar-thin">
          <h3 className="text-xs font-bold text-[#0B2545]/40 tracking-wider uppercase mb-3">
            {searchQuery ? 'Search Results' : 'Popular Locations'}
          </h3>

          <div className="space-y-2">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => {
                const locationString = `${location.city}, ${location.state}`;
                const isSelected = selectedLocation === locationString;

                return (
                  <button
                    key={locationString}
                    onClick={() => onLocationSelect(locationString)}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-300 select-none group cursor-pointer active:scale-[0.99] hover:scale-[1.01] hover:shadow-3xs ${
                      isSelected
                        ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#0B2545] shadow-xs'
                        : 'bg-white border-gray-100 hover:border-[#EE5E36]/25'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#EE5E36]' : 'bg-[#FFF4F0] group-hover:bg-[#EE5E36]/10'
                      }`}
                    >
                      <MapPin
                        className={`w-4.5 h-4.5 transition-all duration-300 ${
                          isSelected
                            ? 'text-white'
                            : 'text-[#EE5E36] group-hover:-translate-y-0.5 group-hover:scale-110'
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate text-[#0B2545]">
                        {location.city}
                      </div>
                      <div className="text-xs truncate text-gray-400 font-medium">
                        {location.state}, {location.country}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#EE5E36] flex items-center justify-center text-white shrink-0 animate-in zoom-in-75 duration-150">
                        <Check className="w-3 h-3 stroke-3" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-400">No locations found</p>
                <p className="text-xs text-gray-300 mt-1">Try another search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
