'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Palette } from 'lucide-react';
import { THEME_CLASSES, AdminTheme, useSidebar } from '@/components/ui/sidebar';
import { authCookie, adminCookie, workerCookie } from '@/utils/auth-cookie';
import { LogoutConfirmModal } from '@/components/shared/LogoutConfirmModal';
import { ADMIN_INITIALS, ADMIN_NAME, ADMIN_AVATAR } from './constants';
import { getWorkerByEmail } from '@/utils/worker-profile-store';

interface ProfileDropdownProps {
  theme: AdminTheme;
}

export function ProfileDropdown({ theme }: ProfileDropdownProps) {
  const themeClasses = THEME_CLASSES[theme];
  const { accentTheme, setAccentTheme } = useSidebar();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Dynamic Profile States
  const [displayName, setDisplayName] = useState(ADMIN_NAME);
  const [displayInitials, setDisplayInitials] = useState(ADMIN_INITIALS);
  const [displayAvatar, setDisplayAvatar] = useState('');
  const [isWorker, setIsWorker] = useState(false);

  useEffect(() => {
    const updateProfile = () => {
      const isWorkerRole = workerCookie.get();
      const isAdminRole = adminCookie.get();
      setIsWorker(isWorkerRole);

      if (isWorkerRole) {
        const loggedInEmail =
          (typeof window !== 'undefined' && localStorage.getItem('vance_logged_in_email')) ||
          'worker@example.com';
        const worker = getWorkerByEmail(loggedInEmail);
        if (worker) {
          setDisplayName(worker.name);
          setDisplayAvatar(worker.avatar);
          const initials = worker.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
          setDisplayInitials(initials || 'MV');
          return;
        }
      } else if (isAdminRole) {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('vance_admin_profile');
          if (stored) {
            try {
              const data = JSON.parse(stored);
              setDisplayName(data.name || ADMIN_NAME);
              setDisplayAvatar(data.avatar || ADMIN_AVATAR);
              setDisplayInitials(data.initials || ADMIN_INITIALS);
              return;
            } catch {
              // fallback
            }
          }
        }
        setDisplayName(ADMIN_NAME);
        setDisplayInitials(ADMIN_INITIALS);
        setDisplayAvatar(ADMIN_AVATAR);
        return;
      } else {
        // Customer Profile
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('vance_customer_profile');
          if (stored) {
            try {
              const data = JSON.parse(stored);
              setDisplayName(data.name || 'John Doe');
              setDisplayAvatar(
                data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
              );
              setDisplayInitials(data.initials || 'JD');
              return;
            } catch {
              // fallback
            }
          }
        }
        setDisplayName('John Doe');
        setDisplayInitials('JD');
        setDisplayAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
        return;
      }

      setDisplayName(ADMIN_NAME);
      setDisplayInitials(ADMIN_INITIALS);
      setDisplayAvatar('');
    };

    updateProfile();

    if (typeof window !== 'undefined') {
      window.addEventListener('workerProfileUpdated', updateProfile);
      window.addEventListener('customerProfileUpdated', updateProfile);
      window.addEventListener('adminProfileUpdated', updateProfile);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('workerProfileUpdated', updateProfile);
        window.removeEventListener('customerProfileUpdated', updateProfile);
        window.removeEventListener('adminProfileUpdated', updateProfile);
      }
    };
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    authCookie.set(false);
    adminCookie.remove();
    workerCookie.remove();
    setShowLogoutModal(false);
    window.location.href = '/signin';
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
            {displayAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              displayInitials
            )}
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
            {/* Theme Swapper section */}
            <div className="px-4 py-3 flex flex-col gap-1.5 bg-gray-50/30">
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5 select-none">
                <Palette className="w-3.5 h-3.5" />
                Color Theme
              </span>
              <div className="flex gap-1.5 mt-1">
                <button
                  onClick={() => setAccentTheme('navy')}
                  className={`flex-1 py-1 rounded-lg font-extrabold text-[9px] uppercase tracking-wide cursor-pointer transition-all ${
                    isNavy
                      ? 'bg-[#0B2545] text-white shadow-xs'
                      : 'border border-gray-200 text-gray-455 hover:bg-gray-100'
                  }`}
                >
                  Navy
                </button>
                <button
                  onClick={() => setAccentTheme('orange')}
                  className={`flex-1 py-1 rounded-lg font-extrabold text-[9px] uppercase tracking-wide cursor-pointer transition-all ${
                    !isNavy
                      ? 'bg-[#EE5E36] text-white shadow-xs'
                      : 'border border-gray-200 text-gray-455 hover:bg-gray-100'
                  }`}
                >
                  Orange
                </button>
              </div>
            </div>

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
