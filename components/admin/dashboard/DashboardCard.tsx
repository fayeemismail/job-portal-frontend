'use client';

export function DashboardCard() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4 font-sans">
      <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-12 max-w-md w-full text-center shadow-xs animate-in fade-in duration-300">
        <h1 className="text-2xl font-black text-[#0B2545] tracking-tight">
          This is Admin Dashboard
        </h1>
        <p className="text-[#EE5E36] text-xs font-bold mt-2.5 uppercase tracking-wider">
          Control Centre
        </p>
      </div>
    </div>
  );
}
