'use client';

import Link from 'next/link';
import { DropdownItem } from './types';

interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownItem[];
  onItemClick: () => void;
}

export function DropdownMenu({ isOpen, items, onItemClick }: DropdownMenuProps) {
  return (
    <div
      className={`absolute left-0 top-full w-48 bg-white border-t-[3px] border-[#EE5E36] rounded-b-md shadow-lg transition-all duration-300 origin-top-left z-50 ${
        isOpen
          ? 'opacity-100 scale-100 translate-y-0 visible'
          : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
      }`}
    >
      <div className="py-1 divide-y divide-gray-50">
        {items.map((dropdownItem) => (
          <Link
            key={dropdownItem.label}
            href={dropdownItem.href}
            onClick={onItemClick}
            className="block px-4 py-3 text-sm text-[#0B2545] hover:bg-[#FFFBF9] hover:text-[#EE5E36] transition-colors duration-200 font-medium"
          >
            {dropdownItem.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
