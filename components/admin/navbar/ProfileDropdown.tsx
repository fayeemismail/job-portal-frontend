'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { THEME_CLASSES, AdminTheme } from '@/components/ui/sidebar';
import { authCookie, adminCookie } from '@/utils/auth-cookie';
import { LogoutConfirmModal } from '@/components/shared/LogoutConfirmModal';
import { ADMIN_INITIALS, ADMIN_NAME } from './constants';

interface ProfileDropdownProps {
  theme: AdminTheme;
}

export function ProfileDropdown({ theme }: ProfileDropdownProps) {
  const themeClasses = THEME_CLASSES[theme];
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    authCookie.set(false);
    adminCookie.remove();
    setShowLogoutModal(false);
    window.location.href = '/signin';
  };

  return (
    <>
      <div
        className="relative group h-full flex items-center py-2"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button
          className={`flex items-center gap-2 font-semibold cursor-pointer select-none text-sm transition-colors duration-300 ${themeClasses.navbarText} hover:text-[#EE5E36]`}
        >
          <div className="w-8 h-8 rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] font-bold text-xs select-none">
            {ADMIN_INITIALS}
          </div>
          <span className="text-[13px] hidden sm:inline">{ADMIN_NAME}</span>
        </button>

        {/* Hover Dropdown Menu */}
        <div
          className={`absolute right-0 top-full w-48 bg-white border-t-[3px] border-[#EE5E36] rounded-b-md shadow-lg transition-all duration-300 origin-top-right z-50 ${
            showDropdown
              ? 'opacity-100 scale-100 translate-y-0 visible'
              : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
          }`}
        >
          <div className="py-1 divide-y divide-gray-50 text-left">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm text-[#0B2545] hover:bg-[#FFFBF9] hover:text-[#EE5E36] transition-colors duration-200 font-medium"
            >
              <User className="w-4 h-4 text-[#EE5E36]" />
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50/50 transition-colors duration-200 font-medium cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
