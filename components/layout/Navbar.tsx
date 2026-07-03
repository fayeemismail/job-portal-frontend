'use client';

import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger compact sticky navbar when scrolled past 180px
      if (window.scrollY > 180) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Normal Flow Header (Moves out of view on scroll) */}
      <div className="w-full bg-white border-b border-gray-100">
        {/* Sliding Banner (Envato market style) */}
        <TopBanner isOpen={bannerOpen} onClose={() => setBannerOpen(false)} />

        {/* Main Navbar */}
        <nav className="bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center h-22">
              {/* Logo Section */}
              <Logo isCompact={false} />

              {/* Desktop Navigation Links */}
              <DesktopNav isCompact={false} />

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
        </nav>
      </div>

      {/* 2. Compact Sticky Header (Slides down from top when scrolling down) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 transition-all duration-300 ${
          isScrolled
            ? 'translate-y-0 opacity-100 animate-slide-down'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Keep the Envato banner at the top of the sticky header for consistency */}
        <TopBanner isOpen={bannerOpen} onClose={() => setBannerOpen(false)} />

        <nav className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Compact Logo */}
            <Logo isCompact={true} />

            {/* Compact Desktop Nav */}
            <DesktopNav isCompact={true} />

            {/* Right Actions */}
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
        </nav>
      </div>

      {/* 3. Mobile Navigation Menu drawer (rendered once globally) */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
