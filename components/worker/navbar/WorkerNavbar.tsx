'use client';

import { SidebarTrigger, useSidebar, THEME_CLASSES } from '@/components/ui/sidebar';
import { ProfileDropdown } from '@/components/admin/navbar/ProfileDropdown';
import { AccentSwitcher } from '@/components/admin/navbar/AccentSwitcher';

export function WorkerNavbar() {
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
        <div className="text-left animate-in fade-in duration-200">
          <span
            className={`text-xs font-black uppercase tracking-wider ${themeClasses.navbarText}`}
          >
            Worker Console
          </span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 h-full">
        <AccentSwitcher />
        <div className={`h-4 w-px ${themeClasses.navbarDivider}`} />
        <ProfileDropdown theme={theme} />
      </div>
    </header>
  );
}
