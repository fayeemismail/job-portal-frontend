'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TopBanner } from './navbar/TopBanner';
import { Logo } from './navbar/Logo';
import { DesktopNav } from './navbar/DesktopNav';
import { NavActions } from './navbar/NavActions';
import { MobileNav } from './navbar/MobileNav';
import { NAV_UTILITY_CONFIG } from './navbar/constants';

export function Navbar() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-white">
      {/* Sliding Banner (Envato market style) */}
      <TopBanner isOpen={bannerOpen} onClose={() => setBannerOpen(false)} />

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-xs transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-22">
            {/* Logo Section */}
            <Logo />

            {/* Desktop Navigation Links */}
            <DesktopNav />

            {/* Right Actions Section (Phone & Auth) */}
            <NavActions />

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#0B2545] hover:bg-gray-50 focus:outline-none transition-colors duration-300 cursor-pointer"
                aria-label={NAV_UTILITY_CONFIG.toggleMenuAriaLabel}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown Panel */}
        <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </nav>
    </div>
  );
}
