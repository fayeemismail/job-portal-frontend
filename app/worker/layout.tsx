import { SidebarProvider } from '@/components/ui/sidebar';
import { WorkerSidebar } from '@/components/worker/sidebar/WorkerSidebar';
import { WorkerNavbar } from '@/components/worker/navbar/WorkerNavbar';

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white transition-colors duration-300">
        <WorkerSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <WorkerNavbar />
          <main className="flex-1 p-6 md:p-8 bg-white transition-colors duration-300 font-sans">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
