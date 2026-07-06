'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Phone, User, LogOut, ClipboardList } from 'lucide-react';
import { NAV_ITEMS, CONTACT_CONFIG, AUTH_CONFIG, USER_PROFILE_CONFIG } from './constants';
import { getActiveItemLabel } from './utils';
import { authCookie } from '@/utils/auth-cookie';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => authCookie.get());

  const activeItem = getActiveItemLabel(pathname, NAV_ITEMS);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsLoggedIn(authCookie.get());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleLogout = () => {
    authCookie.set(false);
    setIsLoggedIn(false);
    setProfileExpanded(false);
    onClose();
  };

  const handleLogin = () => {
    authCookie.set(true);
    setIsLoggedIn(true);
    onClose();
  };

  return (
    <div
      className={`lg:hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${
        isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}
    >
      <div className="px-4 pt-2 pb-6 space-y-2 bg-white">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="space-y-1">
            {item.hasDropdown ? (
              <button
                onClick={() => {
                  setActiveDropdown(activeDropdown === item.label ? null : item.label);
                }}
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                  activeItem === item.label
                    ? 'text-[#EE5E36] bg-[#FFFBF9]'
                    : 'text-[#0B2545] hover:bg-gray-50'
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeDropdown === item.label ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                onClick={onClose}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                  activeItem === item.label
                    ? 'text-[#EE5E36] bg-[#FFFBF9]'
                    : 'text-[#0B2545] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            )}

            {/* Mobile Dropdown Items */}
            {item.hasDropdown && item.dropdownItems && activeDropdown === item.label && (
              <div className="pl-6 space-y-1 border-l-2 border-[#EE5E36] ml-3 transition-all duration-200">
                {item.dropdownItems.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.label}
                    href={dropdownItem.href}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#EE5E36] hover:bg-[#FFFBF9] rounded-md transition-colors"
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Mobile Profile Account Dropdown (Only if logged in) */}
        {isLoggedIn && (
          <div className="space-y-1">
            <button
              onClick={() => setProfileExpanded(!profileExpanded)}
              className="w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-semibold text-[#0B2545] hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] font-bold text-xs select-none">
                  {USER_PROFILE_CONFIG.initials}
                </div>
                <span>{USER_PROFILE_CONFIG.myAccountLabel}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  profileExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {profileExpanded && (
              <div className="pl-6 space-y-1 border-l-2 border-[#EE5E36] ml-3 transition-all duration-200">
                <Link
                  href={USER_PROFILE_CONFIG.profileHref}
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#EE5E36] hover:bg-[#FFFBF9] rounded-md transition-colors"
                >
                  <User className="w-4 h-4 text-[#EE5E36]" />
                  {USER_PROFILE_CONFIG.profileLabel}
                </Link>
                <Link
                  href={USER_PROFILE_CONFIG.ordersHref}
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#EE5E36] hover:bg-[#FFFBF9] rounded-md transition-colors"
                >
                  <ClipboardList className="w-4 h-4 text-[#EE5E36]" />
                  {USER_PROFILE_CONFIG.ordersLabel}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-md transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  {USER_PROFILE_CONFIG.logoutLabel}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Right Section */}
        <div className="pt-4 border-t border-gray-100 space-y-4">
          <a
            href={CONTACT_CONFIG.href}
            onClick={onClose}
            className="flex items-center gap-2 px-3 text-[#0B2545]"
          >
            <Phone className="w-4 h-4 text-[#EE5E36]" />
            <span className="text-sm font-semibold tracking-wider">{CONTACT_CONFIG.phone}</span>
          </a>

          {!isLoggedIn && (
            <div className="grid grid-cols-2 gap-3 px-3">
              <Link
                href={AUTH_CONFIG.signInHref}
                onClick={handleLogin}
                className="group relative overflow-hidden w-full text-center py-2.5 text-sm font-semibold text-[#0B2545] hover:text-white border border-[#0B2545]/20 hover:border-[#0B2545] rounded-lg transition-colors duration-300"
              >
                <span className="relative z-10">{AUTH_CONFIG.signInLabel}</span>
                <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
              </Link>
              <Link
                href={AUTH_CONFIG.signUpHref}
                onClick={handleLogin}
                className="group relative overflow-hidden w-full text-center py-2.5 text-sm font-semibold text-white bg-[#EE5E36] rounded-lg transition-colors duration-300"
              >
                <span className="relative z-10">{AUTH_CONFIG.signUpLabel}</span>
                <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
