'use client';

import { Logo } from '@/components/layout/navbar/Logo';
import { THEME_CLASSES, AdminTheme } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  open: boolean;
  theme: AdminTheme;
}

export function SidebarHeaderComponent({ open, theme }: SidebarHeaderProps) {
  const themeClasses = THEME_CLASSES[theme];
  return (
    <div className={`${themeClasses.logoFilter} flex items-center justify-between`}>
      {open ? (
        <div className="-ml-3 transition-opacity duration-200">
          <Logo />
        </div>
      ) : (
        <div className="mx-auto text-xs font-black select-none tracking-widest text-white/80">
          AX
        </div>
      )}
    </div>
  );
}
