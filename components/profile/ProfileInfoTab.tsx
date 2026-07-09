'use client';

import { useState } from 'react';
import { Edit2, Mail, Phone, Save, Camera, Check } from 'lucide-react';
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
  editAvatar: string;
  setEditAvatar: (avatar: string) => void;
  onStartEditProfile: () => void;
  onSaveProfile: (e: React.FormEvent) => void;
}

const PRESET_AVATARS = [
  {
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    label: 'Classic Male',
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    label: 'Classic Female',
  },
  {
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    label: 'Modern Male',
  },
  {
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    label: 'Modern Female',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    label: 'Professional Male',
  },
  {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    label: 'Professional Female',
  },
];

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
  editAvatar,
  setEditAvatar,
  onStartEditProfile,
  onSaveProfile,
}: ProfileInfoTabProps) {
  const [showPresets, setShowPresets] = useState(false);

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
            className="btn-animate btn-animate-outline inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {PROFILE_DASHBOARD_COPY.editInfoBtn}
          </button>
        )}
      </div>

      {!isEditingProfile ? (
        /* Profile details list display */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-left">
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
          <div className="space-y-1 sm:col-span-2">
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
        <form onSubmit={onSaveProfile} className="space-y-6 pt-2 text-left">
          {/* Edit photo layout */}
          <div className="bg-white/40 border border-gray-100 rounded-3xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    editAvatar ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Camera className="w-4.5 h-4.5 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2545]">
                  Profile Picture
                </h4>
                <p className="text-[10px] text-gray-450 mt-0.5">
                  Select a preset portrait or enter a custom photo URL.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className={`py-1.5 px-3 text-[10px] font-extrabold uppercase tracking-wider rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                  showPresets
                    ? 'bg-gray-50 border-gray-300'
                    : 'bg-white hover:bg-gray-50/55 border-gray-200'
                }`}
              >
                <span>Select Preset Portrait</span>
                <span>▼</span>
              </button>

              {showPresets && (
                <div className="grid grid-cols-6 gap-2 bg-white border border-gray-100 p-2.5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-250">
                  {PRESET_AVATARS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setEditAvatar(p.url);
                        setShowPresets(false);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 transition-all hover:scale-95 cursor-pointer ${
                        editAvatar === p.url ? 'border-[#EE5E36]' : 'border-transparent'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                      {editAvatar === p.url && (
                        <div className="absolute inset-0 bg-[#EE5E36]/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                  Custom Picture URL
                </label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
                />
              </div>
            </div>
          </div>

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
            <div className="sm:col-span-2">
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

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="btn-animate btn-animate-primary inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-3xs"
            >
              <Save className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{PROFILE_DASHBOARD_COPY.saveChangesBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="btn-animate btn-animate-neutral px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              {PROFILE_DASHBOARD_COPY.cancelBtn}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
