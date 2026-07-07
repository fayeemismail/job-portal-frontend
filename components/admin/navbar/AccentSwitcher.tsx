'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { Palette } from 'lucide-react';

export function AccentSwitcher() {
  const { accentTheme, setAccentTheme } = useSidebar();

  const handleToggle = () => {
    setAccentTheme(accentTheme === 'navy' ? 'orange' : 'navy');
  };

  const isNavy = accentTheme === 'navy';

  return (
    <button
      onClick={handleToggle}
      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer select-none active:scale-95 ${
        isNavy
          ? 'bg-[#0B2545]/5 border-[#0B2545]/10 text-[#0B2545] hover:bg-[#0B2545]/10'
          : 'bg-[#FFF4F0] border-[#EE5E36]/15 text-[#EE5E36] hover:bg-[#FFF4F0]/80'
      }`}
      title={`Switch to ${isNavy ? 'Orange' : 'Navy'} Theme`}
    >
      <Palette className="w-4 h-4" />
    </button>
  );
}
