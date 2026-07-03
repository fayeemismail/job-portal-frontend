'use client';

import { Search, MapPin } from 'lucide-react';
import { SEARCH_CONFIG } from './constants';

interface HeroSearchProps {
  selectedLocation: string;
  onChangeLocation: () => void;
}

export function HeroSearch({ selectedLocation, onChangeLocation }: HeroSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 p-2.5 gap-3 max-w-2xl w-full mb-10 group focus-within:border-[#EE5E36] transition-all">
      {/* Location selector toggle button */}
      <button
        type="button"
        onClick={onChangeLocation}
        className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#FFFBF9] hover:bg-[#FFF4F0] text-gray-700 hover:text-[#EE5E36] rounded-xl border border-[#EE5E36]/10 transition-colors shrink-0 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#EE5E36]" />
          <span className="font-bold text-sm tracking-wide">{selectedLocation}</span>
        </div>
      </button>

      {/* Input field */}
      <div className="flex-1 w-full relative">
        <input
          type="text"
          placeholder={SEARCH_CONFIG.inputPlaceholder}
          className="w-full px-3 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base font-medium"
        />
      </div>

      {/* Square search button */}
      <button
        type="button"
        className="w-full sm:w-auto p-4 bg-[#EE5E36] hover:bg-[#0B2545] text-white rounded-xl active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md shadow-[#EE5E36]/15"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
