import { SignInForm } from '@/components/auth/SignInForm';
import { ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <main className="fixed inset-0 z-100 w-screen h-screen font-sans bg-[#0B2545]/5 overflow-hidden select-none flex flex-col">
      <div className="bg-[#0B2545] text-white px-6 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-[#EE5E36]" />
          <span>Ainorax Administrative Security Gateway</span>
        </div>
        <span className="text-[10px] text-gray-300 font-medium">Internal Use Only</span>
      </div>
      <div className="flex-1 relative">
        <SignInForm />
      </div>
    </main>
  );
}
