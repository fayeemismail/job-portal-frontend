'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, User, LogOut, ClipboardList } from 'lucide-react';
import { CONTACT_CONFIG, AUTH_CONFIG, USER_PROFILE_CONFIG } from './constants';
import { authCookie } from '@/utils/auth-cookie';

export function NavActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => authCookie.get());
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    authCookie.set(false);
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    authCookie.set(true);
    setIsLoggedIn(true);
  };

  return (
    <div className="hidden lg:flex items-center space-x-8 h-full">
      {/* Phone Contact */}
      <a
        href={CONTACT_CONFIG.href}
        className="flex items-center gap-2 text-[#0B2545] hover:text-[#EE5E36] transition-colors duration-300 cursor-pointer group"
      >
        <Phone className="w-4 h-4 text-[#EE5E36] group-hover:animate-pulse" />
        <span className="text-[15px] font-semibold select-none">{CONTACT_CONFIG.phone}</span>
      </a>

      {isLoggedIn ? (
        /* Logged In - My Account Dropdown */
        <div
          className="relative group h-full flex items-center py-2"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="flex items-center gap-2 text-[#0B2545] hover:text-[#EE5E36] transition-colors duration-300 font-semibold cursor-pointer select-none">
            <div className="w-8 h-8 rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] font-bold text-xs select-none">
              {USER_PROFILE_CONFIG.initials}
            </div>
            <span className="text-[15px]">{USER_PROFILE_CONFIG.myAccountLabel}</span>
          </button>

          {/* Hover Dropdown Menu */}
          <div
            className={`absolute right-0 top-full w-48 bg-white border-t-[3px] border-[#EE5E36] rounded-b-md shadow-lg transition-all duration-300 origin-top-right z-50 ${
              showDropdown
                ? 'opacity-100 scale-100 translate-y-0 visible'
                : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
            }`}
          >
            <div className="py-1 divide-y divide-gray-50">
              <Link
                href={USER_PROFILE_CONFIG.profileHref}
                className="flex items-center gap-2 px-4 py-3 text-sm text-[#0B2545] hover:bg-[#FFFBF9] hover:text-[#EE5E36] transition-colors duration-200 font-medium"
              >
                <User className="w-4 h-4 text-[#EE5E36]" />
                {USER_PROFILE_CONFIG.profileLabel}
              </Link>
              <Link
                href={USER_PROFILE_CONFIG.ordersHref}
                className="flex items-center gap-2 px-4 py-3 text-sm text-[#0B2545] hover:bg-[#FFFBF9] hover:text-[#EE5E36] transition-colors duration-200 font-medium"
              >
                <ClipboardList className="w-4 h-4 text-[#EE5E36]" />
                {USER_PROFILE_CONFIG.ordersLabel}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50/50 transition-colors duration-200 font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                {USER_PROFILE_CONFIG.logoutLabel}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Guest - Auth Buttons */
        <div className="flex items-center space-x-3">
          <Link
            href={AUTH_CONFIG.signInHref}
            onClick={handleLogin}
            className="group relative overflow-hidden px-6 py-2.5 text-[15px] font-semibold text-[#0B2545] hover:text-white border border-[#0B2545]/20 hover:border-[#0B2545] rounded-lg transition-colors duration-300"
          >
            <span className="relative z-10">{AUTH_CONFIG.signInLabel}</span>
            <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
          </Link>
          <Link
            href={AUTH_CONFIG.signUpHref}
            onClick={handleLogin}
            className="group relative overflow-hidden px-6 py-2.5 text-[15px] font-semibold text-white bg-[#EE5E36] rounded-lg active:scale-95 shadow-md shadow-[#EE5E36]/10 hover:shadow-[#0B2545]/20 transition-all duration-300"
          >
            <span className="relative z-10">{AUTH_CONFIG.signUpLabel}</span>
            <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
          </Link>
        </div>
      )}
    </div>
  );
}
