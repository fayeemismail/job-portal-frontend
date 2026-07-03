'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './constants';
import { DropdownMenu } from './DropdownMenu';
import { getActiveItemLabel } from './utils';

interface DesktopNavProps {
  isCompact?: boolean;
}

export function DesktopNav({ isCompact = false }: DesktopNavProps) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const activeItem = getActiveItemLabel(pathname, NAV_ITEMS);
  const activeItemOrHovered = hoveredItem || activeItem;

  useEffect(() => {
    const targetElement = navRefs.current[activeItemOrHovered];
    const containerElement = containerRef.current;

    if (targetElement && containerElement) {
      const targetRect = targetElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();

      setUnderlineStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    } else {
      setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeItemOrHovered]);

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex items-center space-x-10 h-full relative"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {NAV_ITEMS.map((item) => (
        <div
          key={item.label}
          className="relative group h-full flex items-center"
          onMouseEnter={() => {
            setHoveredItem(item.label);
            if (item.hasDropdown) setActiveDropdown(item.label);
          }}
          onMouseLeave={() => {
            if (item.hasDropdown) setActiveDropdown(null);
          }}
        >
          <Link
            ref={(el) => {
              navRefs.current[item.label] = el;
            }}
            href={item.href}
            className={`relative flex items-center gap-1 text-[15px] font-semibold tracking-wide transition-all duration-300 py-2 ${
              activeItem === item.label ? 'text-[#EE5E36]' : 'text-[#0B2545] hover:text-[#EE5E36]'
            }`}
          >
            {item.label}
          </Link>

          {/* Dropdown Menu */}
          {item.hasDropdown && item.dropdownItems && (
            <DropdownMenu
              isOpen={activeDropdown === item.label}
              items={item.dropdownItems}
              onItemClick={() => setActiveDropdown(null)}
            />
          )}
        </div>
      ))}

      {/* Sliding Underline Indicator */}
      <span
        className={`absolute h-[3px] bg-[#EE5E36] rounded-full transition-all duration-300 ease-out pointer-events-none ${
          isCompact ? 'bottom-[10px]' : 'bottom-[22px]'
        }`}
        style={{
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
          opacity: underlineStyle.opacity,
        }}
      />
    </div>
  );
}
