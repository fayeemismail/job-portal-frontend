'use client';

import { THEME_CLASSES, AdminTheme } from '@/components/ui/sidebar';

interface ConsoleControlProps {
  theme: AdminTheme;
}

export function ConsoleControl({ theme }: ConsoleControlProps) {
  const themeClasses = THEME_CLASSES[theme];
  return (
    <div className="text-left">
      <span className={`text-xs font-black uppercase tracking-wider ${themeClasses.navbarText}`}>
        Console Control
      </span>
    </div>
  );
}
