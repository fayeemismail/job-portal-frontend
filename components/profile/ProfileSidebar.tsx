'use client';

import { User, MapPin } from 'lucide-react';
import { PROFILE_DASHBOARD_COPY } from './constants';

interface ProfileSidebarProps {
  activeTab: 'profile' | 'addresses';
  setActiveTab: (tab: 'profile' | 'addresses') => void;
  profileName: string;
  profileEmail: string;
  profileInitials: string;
  profileAvatar: string;
  onTabChange: () => void;
}

export function ProfileSidebar({
  activeTab,
  setActiveTab,
  profileName,
  profileEmail,
  profileInitials,
  profileAvatar,
  onTabChange,
}: ProfileSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      {/* User Profile Summary Card */}
      <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 text-center space-y-4">
        <div className="relative w-24 h-24 mx-auto rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 overflow-hidden flex items-center justify-center text-[#EE5E36] text-2xl font-black shadow-xs">
          {profileAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profileAvatar} alt={profileName} className="w-full h-full object-cover" />
          ) : (
            profileInitials
          )}
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight">{profileName}</h3>
          <span className="text-xs font-semibold text-gray-400 block">{profileEmail}</span>
        </div>
      </div>

      {/* Tabs Selector List */}
      <div className="bg-white border border-gray-100 rounded-3xl p-3.5 space-y-1.5 shadow-3xs">
        <button
          onClick={() => {
            setActiveTab('profile');
            onTabChange();
          }}
          className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-extrabold tracking-wider uppercase active:scale-95 transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#FFF4F0] text-[#EE5E36] shadow-3xs'
              : 'text-[#0B2545]/60 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
          }`}
        >
          <User className="w-4.5 h-4.5" />
          <span>{PROFILE_DASHBOARD_COPY.tabProfile}</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('addresses');
            onTabChange();
          }}
          className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-extrabold tracking-wider uppercase active:scale-95 transition-all cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-[#FFF4F0] text-[#EE5E36] shadow-3xs'
              : 'text-[#0B2545]/60 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
          }`}
        >
          <MapPin className="w-4.5 h-4.5" />
          <span>{PROFILE_DASHBOARD_COPY.tabAddresses}</span>
        </button>
      </div>
    </div>
  );
}
