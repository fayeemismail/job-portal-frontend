'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarHeaderComponent } from './SidebarHeader';
import { SidebarMenuComponent } from './SidebarMenu';

export function AppSidebar() {
  const { open, theme } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderComponent open={open} theme={theme} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenuComponent open={open} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
