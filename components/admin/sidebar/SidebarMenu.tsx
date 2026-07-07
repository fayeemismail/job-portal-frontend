'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { NAV_ITEMS } from './constants';

interface SidebarMenuProps {
  open: boolean;
}

export function SidebarMenuComponent({ open }: SidebarMenuProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
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
  );
}
