'use client';

import { useState, useEffect } from 'react';
import { getLocalWorkers, WorkerProfile } from '@/utils/worker-profile-store';
import { User, Check, RefreshCw } from 'lucide-react';
import { CustomDropdown } from './odp/CustomDropdown';

interface WorkerAssignmentSelectorProps {
  category: string;
  currentWorkerName: string;
  onAssign: (worker: WorkerProfile) => void;
}

function getWorkerRoleForCategory(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes('clean')) return 'Cleaning Expert';
  if (cat.includes('paint')) return 'Painting Expert';
  if (cat.includes('plumb')) return 'Plumbing Expert';
  if (cat.includes('carp')) return 'Carpentry Expert';
  if (cat.includes('elect') || cat.includes('repair')) return 'Electrical Expert';
  return 'Cleaning Expert'; // default fallback
}

export function WorkerAssignmentSelector({
  category,
  currentWorkerName,
  onAssign,
}: WorkerAssignmentSelectorProps) {
  const [availableWorkers, setAvailableWorkers] = useState<WorkerProfile[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('');
  const [isEditing, setIsEditing] = useState(
    currentWorkerName === 'Unassigned' || !currentWorkerName
  );

  useEffect(() => {
    const requiredRole = getWorkerRoleForCategory(category);
    const allWorkers = getLocalWorkers();

    // Filter by category matching role, approvalStatus === 'approved', and poolStatus === 'Available'
    const available = allWorkers.filter(
      (w) =>
        w.approvalStatus === 'approved' && w.role === requiredRole && w.poolStatus === 'Available'
    );
    Promise.resolve().then(() => {
      setAvailableWorkers(available);
    });
  }, [category, currentWorkerName]);

  const handleAssignClick = () => {
    const worker = availableWorkers.find((w) => w.id === selectedWorkerId);
    if (worker) {
      onAssign(worker);
      setIsEditing(false);
      setSelectedWorkerId('');
    }
  };

  const isAssigned = currentWorkerName && currentWorkerName !== 'Unassigned';

  const dropdownOptions = [
    { value: '', label: '-- Select Available Professional --' },
    ...availableWorkers.map((w) => ({
      value: w.id,
      label: w.name,
      desc: w.role,
    })),
  ];

  return (
    <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 shadow-3xs text-left">
      <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-2 mb-4">
        Dispatcher Allocation
      </h4>

      {isAssigned && !isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-gray-50/50 p-4 border border-gray-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B2545]/5 border border-[#0B2545]/10 flex items-center justify-center text-[#0B2545] font-sans font-black shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Assigned Expert
                </p>
                <p className="text-sm font-black mt-0.5 text-[#0B2545]">{currentWorkerName}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="p-2 border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer text-gray-500 hover:text-[#0B2545]"
              title="Reassign Professional"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              Assign Professional from Pool
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex-1">
                <CustomDropdown
                  options={dropdownOptions}
                  value={selectedWorkerId}
                  onChange={setSelectedWorkerId}
                  widthClass="w-full"
                />
              </div>
              <button
                disabled={!selectedWorkerId}
                onClick={handleAssignClick}
                className="px-4 py-2.5 bg-[#0B2545] hover:bg-[#0B2545]/90 text-white rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
              >
                <Check className="w-4 h-4" /> Alloc
              </button>
            </div>

            {availableWorkers.length === 0 && (
              <p className="text-[10px] text-red-500 font-bold tracking-normal italic mt-1.5">
                No available professionals in this category ({getWorkerRoleForCategory(category)})
                right now.
              </p>
            )}
          </div>

          {isAssigned && (
            <button
              onClick={() => setIsEditing(false)}
              className="text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-[#0B2545] cursor-pointer mt-1 block"
            >
              Keep Current Assignment
            </button>
          )}
        </div>
      )}
    </div>
  );
}
