'use client';

import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/sidebar/AppSidebar';
import { AdminNavbar } from '@/components/admin/navbar/AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50/50" />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50/50">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminNavbar />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-50/30">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
