'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { THEME_CLASSES, AdminTheme, useSidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useLogout } from '@/hooks/use-logout';
import { LogoutConfirmModal } from '@/components/shared/LogoutConfirmModal';
import { ADMIN_INITIALS, ADMIN_NAME } from './constants';

interface ProfileDropdownProps {
  theme: AdminTheme;
}

export function ProfileDropdown({ theme }: ProfileDropdownProps) {
  const themeClasses = THEME_CLASSES[theme];
  const { accentTheme } = useSidebar();
  const { user } = useAuth();
  const { logoutUser } = useLogout();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const displayName = user?.name || ADMIN_NAME;
  const displayInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : ADMIN_INITIALS;
  const isWorker = user?.role === 'worker';

  const handleLogout = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logoutUser();
  };

  // Dynamic Theme Colors
  const isNavy = accentTheme === 'navy';
  const borderAccentClass = isNavy ? 'border-[#0B2545]' : 'border-[#EE5E36]';
  const textHoverClass = isNavy ? 'hover:text-[#0B2545]' : 'hover:text-[#EE5E36]';
  const linkHoverBg = isNavy ? 'hover:bg-[#0B2545]/5' : 'hover:bg-[#FFFBF9]';
  const linkHoverText = isNavy ? 'hover:text-[#0B2545]' : 'hover:text-[#EE5E36]';
  const linkIconColor = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  const avatarBg = isNavy ? 'bg-[#0B2545]/10' : 'bg-[#FFF4F0]';
  const avatarText = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const avatarBorder = isNavy ? 'border-[#0B2545]/15' : 'border-[#EE5E36]/15';

  return (
    <>
      <div
        className="relative group h-full flex items-center py-2"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button
          className={`flex items-center gap-2 font-semibold cursor-pointer select-none text-sm transition-colors duration-300 ${themeClasses.navbarText} ${textHoverClass}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs select-none border overflow-hidden shrink-0 ${avatarBg} ${avatarText} ${avatarBorder}`}
          >
            {displayInitials}
          </div>
          <span className="text-[13px] hidden sm:inline">{displayName}</span>
        </button>

        {/* Hover Dropdown Menu */}
        <div
          className={`absolute right-0 top-full w-48 bg-white border-t-[3px] rounded-b-md shadow-lg transition-all duration-300 origin-top-right z-50 ${borderAccentClass} ${
            showDropdown
              ? 'opacity-100 scale-100 translate-y-0 visible'
              : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
          }`}
        >
          <div className="py-1 divide-y divide-gray-50 text-left font-sans">
            <Link
              href={isWorker ? '/worker/profile' : '/profile'}
              className={`flex items-center gap-2 px-4 py-3 text-sm text-[#0B2545] transition-colors duration-200 font-medium ${linkHoverBg} ${linkHoverText}`}
            >
              <User className={`w-4 h-4 ${linkIconColor}`} />
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
