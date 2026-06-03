'use client';

import { Sliders } from 'lucide-react';
import { FilterOptions } from '@/types/index';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const salaryRanges = ['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'];

  return (
    <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="w-5 h-5 text-[#D4AF37]" />
        <h3 className="text-gray-900">Filters</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-gray-900">Job Type</h4>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                  onChange={(e) => onFilterChange({ jobType: type, checked: e.target.checked })}
                />
                <span className="text-sm text-gray-700 group-hover:text-[#D4AF37] transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="mb-3 text-gray-900">Experience Level</h4>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                  onChange={(e) => onFilterChange({ experience: level, checked: e.target.checked })}
                />
                <span className="text-sm text-gray-700 group-hover:text-[#D4AF37] transition-colors">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="mb-3 text-gray-900">Salary Range</h4>
          <div className="space-y-2">
            {salaryRanges.map((range) => (
              <label key={range} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                  onChange={(e) => onFilterChange({ salary: range, checked: e.target.checked })}
                />
                <span className="text-sm text-gray-700 group-hover:text-[#D4AF37] transition-colors">{range}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#FFF8E7] transition-all">
          Reset Filters
        </button>
      </div>
    </div>
  );
}