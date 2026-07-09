'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, User, LogOut, ClipboardList } from 'lucide-react';
import { NAV_ITEMS, AUTH_CONFIG, USER_PROFILE_CONFIG } from './constants';
import { getActiveItemLabel } from './utils';
import { authCookie, adminCookie, workerCookie } from '@/utils/auth-cookie';
import { LogoutConfirmModal } from '@/components/shared/LogoutConfirmModal';
import { getWorkerByEmail } from '@/utils/worker-profile-store';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [avatar, setAvatar] = useState('');
  const [initials, setInitials] = useState('JD');
  const [displayName, setDisplayName] = useState('My Account');

  const activeItem = getActiveItemLabel(pathname, NAV_ITEMS);

  // Sync initially on mount & when drawer opens
  useEffect(() => {
    const updateProfile = () => {
      setIsLoggedIn(authCookie.get());

      const isWorkerRole = workerCookie.get();
      const isAdminRole = adminCookie.get();

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
              setAvatar(
                data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
              );
              setInitials(data.initials || 'JD');
              return;
            } catch {
              // fallback
            }
          }
        }
        setDisplayName('John');
        setInitials('JD');
        setAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
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
  }, [isOpen]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    authCookie.set(false);
    setIsLoggedIn(false);
    setProfileExpanded(false);
    setShowLogoutModal(false);
    onClose();
    window.location.href = '/';
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
                {avatar ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#EE5E36]/15 shrink-0 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] font-bold text-xs select-none">
                    {initials}
                  </div>
                )}
                <span>{displayName}</span>
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
          {!isLoggedIn && (
            <div className="grid grid-cols-2 gap-3 px-3">
              <Link
                href={AUTH_CONFIG.signInHref}
                className="btn-animate btn-animate-neutral w-full text-center py-2.5 text-sm font-semibold rounded-lg cursor-pointer"
              >
                <span className="relative z-10">{AUTH_CONFIG.signInLabel}</span>
              </Link>
              <Link
                href={AUTH_CONFIG.signUpHref}
                className="btn-animate btn-animate-primary w-full text-center py-2.5 text-sm font-semibold rounded-lg cursor-pointer shadow-md shadow-[#EE5E36]/10"
              >
                <span className="relative z-10">{AUTH_CONFIG.signUpLabel}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
