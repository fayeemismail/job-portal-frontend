'use client';

import { CheckCircle, Circle } from 'lucide-react';
import { ORDERS_PAGE_COPY, TimelineStep } from './constants';

interface ODPTimelineProps {
  timeline: TimelineStep[];
  isCancelled: boolean;
}

export function ODPTimeline({ timeline, isCancelled }: ODPTimelineProps) {
  return (
    <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
      <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2545] border-b border-gray-100 pb-3">
        {ORDERS_PAGE_COPY.trackTimelineLabel}
      </h4>
      <div className="space-y-6 pl-2">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          const stepDone = isCancelled
            ? step.title === 'Booking Placed' || step.title === 'Booking Cancelled'
            : step.done;

          return (
            <div key={idx} className="flex gap-4 relative">
              {!isLast && (
                <div
                  className={`absolute left-[11px] top-6 bottom-[-24px] w-[2px] ${
                    stepDone ? 'bg-[#EE5E36]' : 'bg-gray-100'
                  }`}
                />
              )}
              <div className="shrink-0 z-10 bg-white">
                {stepDone ? (
                  <CheckCircle className="w-5.5 h-5.5 text-[#EE5E36]" />
                ) : (
                  <Circle className="w-5.5 h-5.5 text-gray-200" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-black ${stepDone ? 'text-[#0B2545]' : 'text-gray-400'}`}
                  >
                    {step.title}
                  </span>
                  {step.date !== '--' && (
                    <span className="text-[9px] font-bold text-gray-400">({step.date})</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-500 leading-normal max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
