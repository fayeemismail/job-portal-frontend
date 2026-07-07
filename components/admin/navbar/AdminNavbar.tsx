'use client';

import { SidebarTrigger, useSidebar, THEME_CLASSES } from '@/components/ui/sidebar';
import { ConsoleControl } from './ConsoleControl';
import { ProfileDropdown } from './ProfileDropdown';
import { AccentSwitcher } from './AccentSwitcher';

export function AdminNavbar() {
  const { theme } = useSidebar();
  const themeClasses = THEME_CLASSES[theme];

  return (
    <header
      className={`sticky top-0 right-0 left-0 h-16 flex items-center justify-between px-6 z-30 shadow-3xs select-none transition-colors duration-300 ${themeClasses.navbarBg}`}
    >
      {/* Left side actions */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className={`h-4 w-px ${themeClasses.navbarDivider}`} />
        <ConsoleControl theme={theme} />
      </div>

      {/* Right side actions - Admin Profile Dropdown */}
      <div className="flex items-center gap-4 h-full">
        <AccentSwitcher />
        <div className={`h-4 w-px ${themeClasses.navbarDivider}`} />
        <ProfileDropdown theme={theme} />
      </div>
    </header>
  );
}
