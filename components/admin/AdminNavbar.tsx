'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { SidebarTrigger, useSidebar, THEME_CLASSES } from '@/components/ui/sidebar';
import { authCookie, adminCookie } from '@/utils/auth-cookie';
import { LogoutConfirmModal } from '@/components/shared/LogoutConfirmModal';

export function AdminNavbar() {
  const { theme } = useSidebar();
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
    <header
      className={`sticky top-0 right-0 left-0 h-16 flex items-center justify-between px-6 z-30 shadow-3xs select-none transition-colors duration-300 ${themeClasses.navbarBg}`}
    >
      {/* Left side actions */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div className={`h-4 w-px ${themeClasses.navbarDivider}`} />

        <div className="text-left">
          <span
            className={`text-xs font-black uppercase tracking-wider ${themeClasses.navbarText}`}
          >
            Console Control
          </span>
        </div>
      </div>

      {/* Right side actions - Admin Profile Dropdown */}
      <div className="flex items-center gap-4 h-full">
        <div
          className="relative group h-full flex items-center py-2"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className={`flex items-center gap-2 font-semibold cursor-pointer select-none text-sm transition-colors duration-300 ${themeClasses.navbarText} hover:text-[#EE5E36]`}
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] font-bold text-xs select-none">
              A
            </div>
            <span className="text-[13px] hidden sm:inline">Admin Operator</span>
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
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
}
