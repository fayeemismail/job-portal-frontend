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
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-[#0B2545] text-xs font-bold tracking-wider uppercase py-3 rounded-xl transition-all cursor-pointer border border-gray-200/50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold tracking-wider uppercase py-3 rounded-xl transition-all cursor-pointer shadow-3xs"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
