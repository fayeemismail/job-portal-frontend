'use client';

import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, User } from 'lucide-react';
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

const WORKER_NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/worker',
    icon: LayoutDashboard,
  },
  {
    label: 'My Tasks',
    href: '/worker/tasks',
    icon: ClipboardList,
  },
  {
    label: 'My Profile',
    href: '/worker/profile',
    icon: User,
  },
] as const;

export function WorkerSidebar() {
  const pathname = usePathname();
  const { open, theme } = useSidebar();
  const themeClasses = THEME_CLASSES[theme];

  return (
    <Sidebar>
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Worker Console</SidebarGroupLabel>
          <SidebarMenu>
            {WORKER_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              // Matches exact page or sub-pages
              const isActive =
                item.href === '/worker' ? pathname === '/worker' : pathname.startsWith(item.href);

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton active={isActive} href={item.href}>
                    <Icon className="w-4 h-4 shrink-0" />
                    {open && <span className="transition-opacity duration-200">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
