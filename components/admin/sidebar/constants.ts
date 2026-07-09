import { LayoutDashboard, ClipboardList, Users } from 'lucide-react';

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ClipboardList,
  },
  {
    label: 'Workers',
    href: '/admin/workers',
    icon: Users,
  },
];
