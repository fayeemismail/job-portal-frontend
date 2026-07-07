'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export type AdminTheme = 'navy' | 'charcoal' | 'slate' | 'light';

export const THEME_CLASSES = {
  navy: {
    sidebarBg: 'bg-[#0B2545] text-white border-white/5',
    activeBtn: 'bg-[#EE5E36] text-white shadow-md shadow-[#EE5E36]/10',
    hoverBtn: 'text-gray-300 hover:bg-white/5 hover:text-white',
    label: 'text-gray-400/80',
    footerBg: 'bg-[#081C35]/50 border-t border-white/5',
    footerIcon: 'text-gray-400 hover:text-[#EE5E36] hover:bg-white/5',
    logoFilter: 'brightness-0 invert',
    navbarBg: 'bg-[#0B2545] text-white border-b border-white/5',
    navbarTrigger: 'text-white hover:bg-white/10',
    navbarIcon: 'text-gray-300 hover:text-[#EE5E36] hover:bg-white/5',
    navbarText: 'text-white',
    navbarSubtitle: 'text-gray-300/80',
    navbarDivider: 'bg-white/10',
  },
  charcoal: {
    sidebarBg: 'bg-[#111827] text-white border-white/5',
    activeBtn: 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/10',
    hoverBtn: 'text-gray-300 hover:bg-white/5 hover:text-white',
    label: 'text-gray-400/80',
    footerBg: 'bg-black/20 border-t border-white/5',
    footerIcon: 'text-gray-400 hover:text-[#3B82F6] hover:bg-white/5',
    logoFilter: 'brightness-0 invert',
    navbarBg: 'bg-[#111827] text-white border-b border-white/5',
    navbarTrigger: 'text-white hover:bg-white/10',
    navbarIcon: 'text-gray-300 hover:text-[#3B82F6] hover:bg-white/5',
    navbarText: 'text-white',
    navbarSubtitle: 'text-gray-300/80',
    navbarDivider: 'bg-white/10',
  },
  slate: {
    sidebarBg: 'bg-[#0F172A] text-white border-white/5',
    activeBtn: 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/10',
    hoverBtn: 'text-gray-300 hover:bg-white/5 hover:text-white',
    label: 'text-gray-400/80',
    footerBg: 'bg-black/25 border-t border-white/5',
    footerIcon: 'text-gray-400 hover:text-[#10B981] hover:bg-white/5',
    logoFilter: 'brightness-0 invert',
    navbarBg: 'bg-[#0F172A] text-white border-b border-white/5',
    navbarTrigger: 'text-white hover:bg-white/10',
    navbarIcon: 'text-gray-300 hover:text-[#10B981] hover:bg-white/5',
    navbarText: 'text-white',
    navbarSubtitle: 'text-gray-300/80',
    navbarDivider: 'bg-white/10',
  },
  light: {
    sidebarBg: 'bg-white text-[#0B2545] border-r border-gray-200',
    activeBtn: 'bg-[#EE5E36] text-white shadow-md shadow-[#EE5E36]/10',
    hoverBtn: 'text-gray-500 hover:bg-gray-100 hover:text-[#0B2545]',
    label: 'text-gray-400',
    footerBg: 'bg-gray-50 border-t border-gray-150',
    footerIcon: 'text-gray-500 hover:text-[#EE5E36] hover:bg-gray-200/50',
    logoFilter: '',
    navbarBg: 'bg-white text-[#0B2545] border-b border-gray-200',
    navbarTrigger: 'text-[#0B2545] hover:bg-gray-100',
    navbarIcon: 'text-gray-500 hover:text-[#EE5E36] hover:bg-gray-50',
    navbarText: 'text-[#0B2545]',
    navbarSubtitle: 'text-gray-400',
    navbarDivider: 'bg-gray-200',
  },
};

export type AccentTheme = 'navy' | 'orange';

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
  themeClasses: {
    sidebarBg: string;
    activeBtn: string;
    hoverBtn: string;
    label: string;
    footerBg: string;
    footerIcon: string;
    logoFilter: string;
    navbarBg: string;
    navbarTrigger: string;
    navbarIcon: string;
    navbarText: string;
    navbarSubtitle: string;
    navbarDivider: string;
  };
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, setOpen] = useState(true);
  const [theme, setTheme] = useState<AdminTheme>('light');
  const [accentTheme, setAccentTheme] = useState<AccentTheme>('navy');

  const toggleSidebar = () => setOpen(!open);

  const baseTheme = THEME_CLASSES[theme];
  const isNavyAccent = accentTheme === 'navy';
  const activeBtn = isNavyAccent
    ? 'bg-[#0B2545] text-white shadow-md shadow-[#0B2545]/15'
    : 'bg-[#EE5E36] text-white shadow-md shadow-[#EE5E36]/15';

  const themeClasses = {
    ...baseTheme,
    activeBtn,
  };

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        toggleSidebar,
        theme,
        setTheme,
        accentTheme,
        setAccentTheme,
        themeClasses,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const { open, themeClasses } = useSidebar();

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col justify-between shrink-0 z-20 transition-all duration-300 ease-in-out ${
        themeClasses.sidebarBg
      } ${open ? 'w-64' : 'w-16'}`}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children }: { children: ReactNode }) {
  const { theme } = useSidebar();
  return (
    <div className={`p-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-white/5'}`}>
      {children}
    </div>
  );
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return <div className="flex-1 py-4 overflow-y-auto space-y-4">{children}</div>;
}

export function SidebarGroup({ children }: { children: ReactNode }) {
  return <div className="px-3 space-y-1">{children}</div>;
}

export function SidebarGroupLabel({ children }: { children: ReactNode }) {
  const { open, themeClasses } = useSidebar();
  if (!open) return null;

  return (
    <p
      className={`text-[10px] font-black uppercase tracking-widest px-3 mb-2 text-left ${themeClasses.label}`}
    >
      {children}
    </p>
  );
}

export function SidebarMenu({ children }: { children: ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

export function SidebarMenuItem({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

interface SidebarMenuButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

export function SidebarMenuButton({ children, active, onClick, href }: SidebarMenuButtonProps) {
  const { open, themeClasses } = useSidebar();
  const className = `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors duration-205 cursor-pointer select-none text-left relative overflow-hidden ${
    active ? themeClasses.activeBtn : themeClasses.hoverBtn
  } ${!open ? 'justify-center' : ''}`;

  const content = (
    <>
      {/* Sleek solid indicator bar for active item */}
      {active && open && (
        <span className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r-full" />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export function SidebarFooter({ children }: { children: ReactNode }) {
  const { themeClasses } = useSidebar();

  return <div className={`p-4 ${themeClasses.footerBg}`}>{children}</div>;
}

export function SidebarTrigger() {
  const { toggleSidebar, themeClasses } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-lg transition-colors cursor-pointer select-none focus:outline-none shrink-0 ${themeClasses.navbarTrigger}`}
      title="Toggle Sidebar"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
