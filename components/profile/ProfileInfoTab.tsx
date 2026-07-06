'use client';

import { Edit2, Mail, Phone, Save } from 'lucide-react';
import { PROFILE_DASHBOARD_COPY } from './constants';

interface ProfileInfoTabProps {
  profileName: string;
  profileEmail: string;
  profilePhone: string;
  isEditingProfile: boolean;
  setIsEditingProfile: (editing: boolean) => void;
  editName: string;
  setEditName: (name: string) => void;
  editEmail: string;
  setEditEmail: (email: string) => void;
  editPhone: string;
  setEditPhone: (phone: string) => void;
  onStartEditProfile: () => void;
  onSaveProfile: (e: React.FormEvent) => void;
}

export function ProfileInfoTab({
  profileName,
  profileEmail,
  profilePhone,
  isEditingProfile,
  setIsEditingProfile,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  editPhone,
  setEditPhone,
  onStartEditProfile,
  onSaveProfile,
}: ProfileInfoTabProps) {
  return (
    <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
        <div>
          <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
            {PROFILE_DASHBOARD_COPY.profileTitle}
          </h2>
          <p className="text-xs font-bold text-gray-400 mt-0.5">
            {PROFILE_DASHBOARD_COPY.profileSubtitle}
          </p>
        </div>
        {!isEditingProfile && (
          <button
            onClick={onStartEditProfile}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#EE5E36]/30 bg-[#FFF4F0]/30 text-[#EE5E36] hover:bg-[#EE5E36] hover:text-white hover:border-[#EE5E36] rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {PROFILE_DASHBOARD_COPY.editInfoBtn}
          </button>
        )}
      </div>

      {!isEditingProfile ? (
        /* Profile details list display */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
              {PROFILE_DASHBOARD_COPY.fullNameLabel}
            </span>
            <p className="text-sm font-extrabold text-[#0B2545]">{profileName}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
              {PROFILE_DASHBOARD_COPY.emailLabel}
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#0B2545]">
              <Mail className="w-4.5 h-4.5 text-[#EE5E36]/80" />
              <span>{profileEmail}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
              {PROFILE_DASHBOARD_COPY.phoneLabel}
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#0B2545]">
              <Phone className="w-4.5 h-4.5 text-[#EE5E36]/80" />
              <span>{profilePhone}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Profile details form */
        <form onSubmit={onSaveProfile} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.fullNameLabel}
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.emailLabel}
              </label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.phoneLabel}
              </label>
              <input
                type="text"
                required
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-[#EE5E36] hover:bg-[#d64e29] text-white px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-3xs"
            >
              <Save className="w-3.5 h-3.5" />
              {PROFILE_DASHBOARD_COPY.saveChangesBtn}
            </button>
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-5 py-3 border border-[#0B2545]/15 hover:bg-gray-50 text-[#0B2545]/60 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {PROFILE_DASHBOARD_COPY.cancelBtn}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
