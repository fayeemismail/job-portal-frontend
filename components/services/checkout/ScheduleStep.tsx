'use client';

import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { BOOKING_PAGE_COPY, BOOKING_DATES, BOOKING_TIME_SLOTS } from '../constants';

interface ScheduleStepProps {
  selectedDateIdx: number | null;
  setSelectedDateIdx: (idx: number | null) => void;
  selectedTimeIdx: number | null;
  setSelectedTimeIdx: (idx: number | null) => void;
}

export function ScheduleStep({
  selectedDateIdx,
  setSelectedDateIdx,
  selectedTimeIdx,
  setSelectedTimeIdx,
}: ScheduleStepProps) {
  return (
    <div className="space-y-6">
      {/* Date Picker Card */}
      <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
          <Calendar className="w-4.5 h-4.5 text-[#EE5E36]" />
          <span>{BOOKING_PAGE_COPY.selectDateLabel}</span>
        </h2>

        <div className="flex items-center gap-2.5 mt-6">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#EE5E36] hover:border-[#EE5E36]/20 transition-all cursor-pointer active:scale-90 shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 flex-1">
            {BOOKING_DATES.map((dateObj, idx) => {
              const isActive = selectedDateIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedDateIdx(idx);
                    setSelectedTimeIdx(null); // Reset time selection on date switch
                  }}
                  className={`flex flex-col items-center justify-center py-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#0B2545] shadow-xs font-extrabold'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-[#EE5E36]/25 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5 block">
                    {dateObj.day}
                  </span>
                  <span className={`text-base font-black ${isActive ? 'text-[#EE5E36]' : ''}`}>
                    {dateObj.date}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#EE5E36] hover:border-[#EE5E36]/20 transition-all cursor-pointer active:scale-90 shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Time Slot Selection Card */}
      {selectedDateIdx !== null && (
        <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <h3 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2 uppercase tracking-wider">
            <Clock className="w-4.5 h-4.5 text-[#EE5E36]" />
            <span>{BOOKING_PAGE_COPY.selectTimeLabel}</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 mt-6">
            {BOOKING_TIME_SLOTS.map((time, idx) => {
              const isActive = selectedTimeIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTimeIdx(idx)}
                  className={`py-3.5 px-3 rounded-xl border text-center text-[11px] font-semibold transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#EE5E36] shadow-xs'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-[#EE5E36]/25 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
