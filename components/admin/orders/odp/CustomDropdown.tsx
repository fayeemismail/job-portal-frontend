'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

interface DropdownOption {
  value: string;
  label: string;
  desc?: string;
}

interface CustomDropdownProps {
  options: readonly DropdownOption[] | DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  widthClass?: string;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  widthClass = 'w-48',
}: CustomDropdownProps) {
  const { accentTheme } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isNavy = accentTheme === 'navy';
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenToggle = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 240px space below the element, display upward
      if (spaceBelow < 240) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
    setIsOpen(!isOpen);
  };

  // Theme Class Names
  const itemHoverBgClass = isNavy ? 'hover:bg-[#0B2545]/5' : 'hover:bg-[#FFF4F0]';
  const selectedTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  return (
    <div className="relative font-sans text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={handleOpenToggle}
        className={`flex items-center justify-between gap-3 px-4 py-2 border border-[#0B2545]/10 rounded-xl text-xs font-bold text-[#0B2545] bg-white cursor-pointer transition-all hover:bg-gray-50/50 select-none ${widthClass} focus:outline-none focus:ring-1 ${
          isNavy
            ? 'focus:ring-[#0B2545]/20 focus:border-[#0B2545]'
            : 'focus:ring-[#EE5E36]/20 focus:border-[#EE5E36]'
        }`}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-45 w-full min-w-[200px] animate-in fade-in duration-200 ${
            openUpward
              ? 'bottom-full mb-1.5 slide-in-from-bottom-2'
              : 'top-full mt-1.5 slide-in-from-top-2'
          }`}
        >
          <div className="divide-y divide-gray-50/60">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${itemHoverBgClass} ${
                    isSelected ? `font-black ${selectedTextClass}` : 'text-[#0B2545]/80 font-medium'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span>{opt.label}</span>
                    {opt.desc && (
                      <span className="text-[10px] text-gray-400 font-normal leading-normal">
                        {opt.desc}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-current shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
