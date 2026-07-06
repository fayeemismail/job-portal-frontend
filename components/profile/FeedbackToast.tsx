'use client';

import { CheckCircle } from 'lucide-react';

interface FeedbackToastProps {
  feedbackMsg: string | null;
}

export function FeedbackToast({ feedbackMsg }: FeedbackToastProps) {
  if (!feedbackMsg) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#0B2545] border border-[#EE5E36]/20 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
      <CheckCircle className="w-5 h-5 text-[#EE5E36]" />
      <span className="text-xs font-bold tracking-wide">{feedbackMsg}</span>
    </div>
  );
}
