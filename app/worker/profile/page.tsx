'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Tag, Check, Plus, X, Camera } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { getWorkerByEmail, updateWorkerProfile, WorkerProfile } from '@/utils/worker-profile-store';
import { useAuth } from '@/hooks/use-auth';

const PRESET_AVATARS = [
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250',
    label: 'Classic Male',
  },
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250',
    label: 'Classic Female',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250',
    label: 'Professional Male',
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250',
    label: 'Professional Female',
  },
  {
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=250',
    label: 'Modern Male',
  },
  {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250',
    label: 'Modern Female',
  },
];

const SUGGESTED_SKILLS = [
  'Deep Cleaning',
  'Window Washing',
  'Carpet Cleaning',
  'Furniture Assembly',
  'Wall Painting',
  'Drain Unclogging',
  'Smart Home Setup',
  'Fixture Installation',
  'Yard Mowing',
  'Appliance Repair',
];

export default function WorkerProfilePage() {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';
  const { user } = useAuth();

  // Demo worker email
  const [workerEmail, setWorkerEmail] = useState('');

  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      const loggedInEmail = user?.email || 'worker@example.com';
      setWorkerEmail(loggedInEmail);
      const data = getWorkerByEmail(loggedInEmail);
      if (data) {
        setProfile(data);
        setName(data.name);
        setPhone(data.phone);
        setAvatar(data.avatar);
        setSkills(data.skills);
      }
      setMounted(true);
    });
  }, [user?.email]);

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3000);
  };

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill('');
      return;
    }
    setSkills([...skills, trimmed]);
    setNewSkill('');
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !avatar) {
      triggerFeedback('Error: Please fill in all required fields.');
      return;
    }

    const success = updateWorkerProfile(workerEmail, {
      name,
      phone,
      avatar,
      skills,
    });

    if (success) {
      triggerFeedback('Profile details & skills updated successfully!');
    } else {
      triggerFeedback('Error: Failed to save changes.');
    }
  };

  // Accent styles
  const accentTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const tagBgClass = isNavy
    ? 'bg-[#0B2545]/10 text-[#0B2545] border-[#0B2545]/20'
    : 'bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/20';
  const btnClass = isNavy
    ? 'bg-[#0B2545] hover:bg-[#0B2545]/90 text-white shadow-[#0B2545]/10'
    : 'bg-[#EE5E36] hover:bg-[#EE5E36]/90 text-white shadow-[#EE5E36]/10';
  const focusBorderClass = isNavy ? 'focus:border-[#0B2545]' : 'focus:border-[#EE5E36]';

  if (!mounted || !profile) {
    return <div className="min-h-screen bg-white animate-pulse" />;
  }

  return (
    <div className="space-y-6 text-[#0B2545] font-sans text-left max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B2545] border border-white/10 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <div className="w-5 h-5 rounded-full bg-[#EE5E36] flex items-center justify-center text-white font-extrabold text-[10px]">
            ✓
          </div>
          {feedbackMsg}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-100 pb-5">
        <span className={`text-[10px] font-black uppercase tracking-widest ${accentTextClass}`}>
          Worker Identity
        </span>
        <h1 className="text-2xl font-black mt-1">My Professional Profile</h1>
        <p className="text-xs text-gray-400 mt-1.5">
          Configure your service skills and public profile details.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column - Profile Avatar Settings */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#FFFBF9] border border-gray-100/60 rounded-3xl p-6 text-center space-y-5 shadow-3xs relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-full h-1.5 ${isNavy ? 'bg-[#0B2545]' : 'bg-[#EE5E36]'}`}
            />

            <div className="relative w-28 h-28 mx-auto rounded-3xl overflow-hidden border-2 border-white shadow-md bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0B2545]/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-base font-black tracking-tight leading-snug">{name}</h3>
              <span className="text-[10px] font-black text-gray-450 uppercase tracking-widest block mt-0.5">
                {profile.role}
              </span>
            </div>

            <div className="border-t border-gray-50 pt-4 flex justify-around text-center">
              <div>
                <p className="text-lg font-black">{profile.rating} ★</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  Rating
                </p>
              </div>
              <div className="w-px bg-gray-100" />
              <div>
                <p className="text-lg font-black">{profile.completedJobs}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  Jobs Done
                </p>
              </div>
            </div>

            {/* Presets Selection */}
            <div className="space-y-3 pt-2 text-left border-t border-gray-50">
              <button
                type="button"
                onClick={() => setShowPresetDropdown(!showPresetDropdown)}
                className={`w-full py-2 px-3 text-[10px] font-extrabold uppercase tracking-wider rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  showPresetDropdown
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white hover:bg-gray-50/50 border-gray-200'
                }`}
              >
                <span>Choose Preset Photo</span>
                <span className="text-xs">▼</span>
              </button>

              {showPresetDropdown && (
                <div className="grid grid-cols-3 gap-2 bg-white border border-gray-100 p-2.5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {PRESET_AVATARS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAvatar(p.url);
                        setShowPresetDropdown(false);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 transition-all hover:scale-95 cursor-pointer ${
                        avatar === p.url ? 'border-[#EE5E36]' : 'border-transparent'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                      {avatar === p.url && (
                        <div className="absolute inset-0 bg-[#EE5E36]/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* URL input field */}
            <div className="text-left space-y-1.5 pt-2">
              <label className="block text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                Or Photo URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#EE5E36] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Profile Details & Skills */}
        <div className="md:col-span-8 space-y-6">
          {/* Section 1: Details */}
          <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-5 shadow-3xs">
            <h2 className="text-sm font-black uppercase tracking-wider border-b border-gray-50 pb-2">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={`w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left sm:col-span-2 opacity-75">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Email Address (Static Username)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full pl-9 pr-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Skills Management */}
          <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 space-y-6 shadow-3xs">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider">Manage Service Skills</h2>
              <p className="text-[11px] text-gray-400 mt-1">
                Add skills tags to advertise your expertise for service requests.
              </p>
            </div>

            {/* Current Skills Display */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                My Skills ({skills.length})
              </label>

              {skills.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl text-xs text-gray-400 font-semibold">
                  No skills added. Add skills from suggestion list or search.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-extrabold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all shadow-3xs hover:border-red-300 hover:text-red-600 hover:bg-red-50/20 group cursor-pointer ${tagBgClass}`}
                      onClick={() => handleRemoveSkill(idx)}
                      title="Click to remove"
                    >
                      <Tag className="w-3 h-3 shrink-0" />
                      {skill}
                      <X className="w-3 h-3 text-gray-400 group-hover:text-red-500 cursor-pointer" />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Add Custom Skill field */}
            <div className="space-y-2 border-t border-gray-50 pt-5 text-left">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                Add Custom Skill
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(newSkill);
                    }
                  }}
                  placeholder="e.g. Appliance Repair, Garden Mowing"
                  className={`flex-1 px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(newSkill)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center shrink-0 ${btnClass}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggestions list */}
            <div className="space-y-2 border-t border-gray-50 pt-5 text-left">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                Suggested Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_SKILLS.filter(
                  (s) => !skills.some((myS) => myS.toLowerCase() === s.toLowerCase())
                ).map((skill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="text-[10px] font-extrabold px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-150 text-[#0B2545]/70 hover:text-[#0B2545] cursor-pointer transition-all active:scale-95"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3.5 pt-2">
            <button
              type="submit"
              className={`px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-98 shadow-sm ${btnClass}`}
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
