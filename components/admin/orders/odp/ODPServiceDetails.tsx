'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, UserCheck } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { CATEGORY_PHOTOS } from '@/components/services/constants';
import { CustomDropdown } from './CustomDropdown';
import { getLocalWorkers, WorkerProfile } from '@/utils/worker-profile-store';

interface ODPServiceDetailsProps {
  serviceName: string;
  category: string;
  date: string;
  timeSlot: string;
  address: string;
  workerName: string;
  onWorkerChange: (workerName: string) => void;
}

export function ODPServiceDetails({
  serviceName,
  category,
  date,
  timeSlot,
  address,
  workerName,
  onWorkerChange,
}: ODPServiceDetailsProps) {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  // Dynamic workers state
  const [workersList, setWorkersList] = useState<WorkerProfile[]>([]);
  const [assignedWorker, setAssignedWorker] = useState<WorkerProfile | null>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      const list = getLocalWorkers();
      setWorkersList(list);

      const assigned = list.find((w) => w.name.toLowerCase() === workerName.toLowerCase());
      setAssignedWorker(assigned || null);
    });
  }, [workerName]);

  // Dynamic Theme Styling
  const tagBgClass = isNavy
    ? 'bg-[#0B2545]/5 text-[#0B2545] border-[#0B2545]/10'
    : 'bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/10';
  const iconColorClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';

  // Dynamic Cover Photo lookup
  const photos = CATEGORY_PHOTOS[category.toLowerCase()] || CATEGORY_PHOTOS.cleaning;
  const coverPhoto = photos[0];

  const dropdownOptions = [
    { value: 'Unassigned', label: 'Unassigned', desc: 'No dispatcher assigned' },
    ...workersList.map((w) => ({
      value: w.name,
      label: w.name,
      desc: w.role,
    })),
  ];

  return (
    <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-6 text-left font-sans text-[#0B2545] shadow-xs">
      {/* Service Header Info */}
      <div className="flex items-center gap-4">
        {/* Small Service Thumbnail */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-150/80 shrink-0 shadow-3xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPhoto}
            alt={serviceName}
            className="w-full h-full object-cover animate-in fade-in duration-300"
          />
        </div>
        <div>
          <span
            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest border ${tagBgClass}`}
          >
            {category}
          </span>
          <h3 className="text-base sm:text-lg font-black mt-1 leading-tight">{serviceName}</h3>
        </div>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-50 pt-5">
        <div className="flex items-start gap-3">
          <Calendar className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorClass}`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Schedule Date
            </p>
            <p className="text-xs font-bold mt-0.5">{date}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorClass}`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Time Window
            </p>
            <p className="text-xs font-bold mt-0.5">{timeSlot}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 md:col-span-2 border-t border-gray-50 pt-4">
          <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorClass}`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Service Location Address
            </p>
            <p className="text-xs font-semibold mt-0.5 leading-relaxed text-[#0B2545]/80">
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Dispatch Worker Settings */}
      <div className="border-t border-gray-100/60 pt-5 space-y-3">
        <div className="flex items-center gap-2">
          <UserCheck className={`w-4 h-4 ${iconColorClass}`} />
          <h4 className="text-xs font-black uppercase tracking-wider">Worker Dispatch Control</h4>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30 border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            {assignedWorker ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50 shadow-3xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assignedWorker.avatar}
                  alt={workerName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-150/60 shrink-0 flex items-center justify-center text-[10px] font-black text-gray-400">
                UA
              </div>
            )}
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                Currently Assigned
              </p>
              <p className="text-xs font-black text-[#0B2545] mt-1">{workerName}</p>
              {assignedWorker && (
                <p className="text-[9px] font-bold text-gray-450 mt-0.5 uppercase tracking-wider">
                  {assignedWorker.role}
                </p>
              )}
            </div>
          </div>

          <div>
            <CustomDropdown
              options={dropdownOptions}
              value={workerName}
              onChange={onWorkerChange}
              widthClass="w-56"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
