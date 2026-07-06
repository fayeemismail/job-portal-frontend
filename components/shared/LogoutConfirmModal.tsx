'use client';

import { LogOut, X } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
          <LogOut className="w-8 h-8 text-red-500" />
        </div>

        <h3 className="text-lg font-extrabold text-[#0B2545] tracking-tight mb-2">
          Confirm Logout
        </h3>

        <p className="text-xs font-semibold text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to log out of your account? You will need to sign in again to access
          bookings.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-animate btn-animate-neutral flex-1 text-xs font-bold tracking-wider uppercase py-3 rounded-xl cursor-pointer"
          >
            <span className="relative z-10">Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            className="btn-animate border border-red-500/20 text-red-500 hover:text-white flex-1 text-xs font-bold tracking-wider uppercase py-3 rounded-xl cursor-pointer"
            style={{ '--btn-hover-bg': '#ef4444' } as React.CSSProperties}
          >
            <span className="relative z-10">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
