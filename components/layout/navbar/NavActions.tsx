'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, ClipboardList } from 'lucide-react';
import { AUTH_CONFIG, USER_PROFILE_CONFIG } from './constants';
import { authCookie } from '@/utils/auth-cookie';
import { LogoutConfirmModal } from '@/components/shared/LogoutConfirmModal';
import { getWorkerByEmail } from '@/utils/worker-profile-store';

export function NavActions() {
  // Initialize to false to match server-side HTML rendering (prevents hydration mismatch)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [avatar, setAvatar] = useState('');
  const [initials, setInitials] = useState('JD');
  const [displayName, setDisplayName] = useState('My Account');

  // Sync with client-side cookie value after hydration
  useEffect(() => {
    const updateProfile = () => {
      setIsLoggedIn(authCookie.get());

      const isWorkerRole =
        typeof window !== 'undefined' && document.cookie.includes('worker_session=true');
      const isAdminRole =
        typeof window !== 'undefined' && document.cookie.includes('admin_session=true');

      if (isWorkerRole) {
        const loggedInEmail =
          (typeof window !== 'undefined' && localStorage.getItem('vance_logged_in_email')) ||
          'worker@example.com';
        const worker = getWorkerByEmail(loggedInEmail);
        if (worker) {
          setDisplayName(worker.name.split(' ')[0]);
          setAvatar(worker.avatar);
          const computedInitials = worker.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
          setInitials(computedInitials || 'MV');
          return;
        }
      } else if (isAdminRole) {
        const stored = typeof window !== 'undefined' && localStorage.getItem('vance_admin_profile');
        if (stored) {
          try {
            const data = JSON.parse(stored);
            setDisplayName((data.name || 'Admin').split(' ')[0]);
            setAvatar(
              data.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
            );
            setInitials(data.initials || 'A');
            return;
          } catch {
            // fallback
          }
        }
        setDisplayName('Admin');
        setInitials('A');
        setAvatar('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150');
        return;
      } else {
        // Customer Profile
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('vance_customer_profile');
          if (stored) {
            try {
              const data = JSON.parse(stored);
              setDisplayName((data.name || 'John').split(' ')[0]);
              setAvatar(data.avatar || '');
              setInitials(data.initials || 'JD');
              return;
            } catch {
              // fallback
            }
          }
        }
        setDisplayName('John');
        setInitials('JD');
        setAvatar('');
      }
    };

    updateProfile();

    if (typeof window !== 'undefined') {
      window.addEventListener('customerProfileUpdated', updateProfile);
      window.addEventListener('adminProfileUpdated', updateProfile);
      window.addEventListener('workerProfileUpdated', updateProfile);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('customerProfileUpdated', updateProfile);
        window.removeEventListener('adminProfileUpdated', updateProfile);
        window.removeEventListener('workerProfileUpdated', updateProfile);
      }
    };
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    authCookie.set(false);
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="hidden lg:flex items-center space-x-8 h-full">
      {isLoggedIn ? (
        /* Logged In - My Account Dropdown */
        <div
          className="relative group h-full flex items-center py-2"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="flex items-center gap-2 text-[#0B2545] hover:text-[#EE5E36] transition-colors duration-300 font-semibold cursor-pointer select-none">
            {avatar ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#EE5E36]/15 shrink-0 shadow-3xs bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] font-bold text-xs select-none">
                {initials}
              </div>
            )}
            <span className="text-[15px]">{displayName}</span>
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
            className="btn-animate btn-animate-neutral px-6 py-2.5 text-[15px] font-semibold rounded-lg cursor-pointer"
          >
            <span className="relative z-10">{AUTH_CONFIG.signInLabel}</span>
          </Link>
          <Link
            href={AUTH_CONFIG.signUpHref}
            className="btn-animate btn-animate-primary px-6 py-2.5 text-[15px] font-semibold rounded-lg cursor-pointer shadow-md shadow-[#EE5E36]/10"
          >
            <span className="relative z-10">{AUTH_CONFIG.signUpLabel}</span>
          </Link>
        </div>
      )}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
