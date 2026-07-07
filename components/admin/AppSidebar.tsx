'use client';

import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList } from 'lucide-react';
import { Logo } from '@/components/layout/navbar/Logo';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  THEME_CLASSES,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();
  const { open, theme } = useSidebar();
  const themeClasses = THEME_CLASSES[theme];

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      label: 'Orders Listing',
      href: '/admin/orders',
      icon: ClipboardList,
      active: pathname === '/admin/orders',
    },
  ];

  return (
    <>
      <Sidebar>
        {/* Header containing Logo */}
        <SidebarHeader>
          <div className={`${themeClasses.logoFilter} flex items-center justify-between`}>
            {open ? (
              <div className="-ml-3 transition-opacity duration-200">
                <Logo />
              </div>
            ) : (
              <div className="mx-auto text-xs font-black select-none tracking-widest text-[#EE5E36]">
                AX
              </div>
            )}
          </div>
        </SidebarHeader>

        {/* Content containing menu links */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton active={item.active} href={item.href}>
                      <Icon className="w-4 h-4 shrink-0" />
                      {open && (
                        <span className="transition-opacity duration-200">{item.label}</span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
