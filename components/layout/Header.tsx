'use client';

import { Search, Bell, User, Briefcase, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  location: string;
  onSearch: (query: string) => void;
}

export function Header({ location, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#D4AF37] to-[#FFD700] rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">JobSeeker</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="group p-2 hover:bg-[#FFF8E7] rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            </button>
            <button className="group p-2 hover:bg-[#FFF8E7] rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
            </button>
            <button className="p-2 hover:bg-[#FFF8E7] rounded-lg transition-colors lg:hidden">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for jobs, companies, or keywords..."
            className="w-full pl-12 pr-4 py-3 bg-[#FAFAFA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-gray-800 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-linear-to-r from-[#D4AF37] to-[#FFD700] text-white rounded-lg hover:from-[#B8860B] hover:to-[#DAA520] transition-all"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}