'use client';

import Link from 'next/link';

export function NotFoundContent() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-white px-4 py-16 sm:py-24 text-center font-sans select-none animate-in fade-in duration-500">
      {/* Main 404 Illustration */}
      <div className="max-w-[680px] w-full mb-8 px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/error.png"
          alt="404 - Something Went Wrong"
          className="w-full h-auto object-contain mx-auto transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      {/* Message Header */}
      <h1 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight mb-3">
        Something Went Wrong!
      </h1>

      {/* Message Subtitle */}
      <p className="text-xs sm:text-sm font-semibold text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
        The link you&apos;re trying to access is probably broken, or the page has been removed.
      </p>

      {/* Actions */}
      <Link
        href="/"
        className="btn-animate btn-animate-primary inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-[#EE5E36]/10"
      >
        Back To Home
      </Link>
    </main>
  );
}
