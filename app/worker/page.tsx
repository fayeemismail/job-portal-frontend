'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  User,
  Award,
  CheckCircle,
  Clock,
  Check,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  getWorkerByEmail,
  submitOnboarding,
  WorkerProfile,
  WorkerQuestionnaire,
} from '@/utils/worker-profile-store';

export default function WorkerDashboardPage() {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('worker@example.com');
  const [profile, setProfile] = useState<WorkerProfile | null>(null);

  // Wizard States
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('3-5 Years');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [availability, setAvailability] = useState('Full-Time');
  const [bio, setBio] = useState(
    'I am a skilled home service professional looking to take on plumbing and carpentry projects.'
  );

  const equipmentOptions = [
    'Standard Toolset',
    'Safety Harness & Ladder',
    'Industrial Vacuum Cleaner',
    'Paint Sprayer & Drop Cloths',
    'Pipe Snakes & Wrenches',
    'Cordless Drill & Jigsaw',
  ];

  const updateProfileData = (loggedInEmail: string) => {
    const data = getWorkerByEmail(loggedInEmail);
    if (data) {
      setProfile(data);
      if (data.questionnaire) {
        setExperience(data.questionnaire.experience);
        setSelectedEquipment(data.questionnaire.equipment);
        setAvailability(data.questionnaire.availability);
        setBio(data.questionnaire.bio);
      }
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      const loggedInEmail = localStorage.getItem('vance_logged_in_email') || 'worker@example.com';
      setEmail(loggedInEmail);
      updateProfileData(loggedInEmail);
      setMounted(true);
    });
  }, []);

  const handleToggleEquipment = (eq: string) => {
    if (selectedEquipment.includes(eq)) {
      setSelectedEquipment(selectedEquipment.filter((item) => item !== eq));
    } else {
      setSelectedEquipment([...selectedEquipment, eq]);
    }
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answers: WorkerQuestionnaire = {
      experience,
      equipment: selectedEquipment,
      availability,
      bio,
    };
    const success = submitOnboarding(email, answers);
    if (success) {
      updateProfileData(email);
    }
  };

  if (!mounted || !profile) {
    return <div className="min-h-[60vh] bg-white animate-pulse" />;
  }

  // Accent Styles
  const accentTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const btnClass = isNavy
    ? 'bg-[#0B2545] hover:bg-[#0B2545]/90 text-white'
    : 'bg-[#EE5E36] hover:bg-[#EE5E36]/90 text-white';
  const borderFocusClass = isNavy ? 'focus:border-[#0B2545]' : 'focus:border-[#EE5E36]';

  // ----------------------------------------------------
  // CASE 1: PENDING & QUESTIONNAIRE SUBMITTED -> UNDER REVIEW
  // ----------------------------------------------------
  if (profile.approvalStatus === 'pending' && profile.questionnaire) {
    return (
      <div className="flex items-center justify-center min-h-[55vh] p-4 font-sans text-[#0B2545] text-left animate-in fade-in duration-300">
        <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-6 max-w-xl w-full text-center shadow-lg relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full h-1.5 ${isNavy ? 'bg-[#0B2545]' : 'bg-[#EE5E36]'}`}
          />

          <Clock className={`w-12 h-12 mx-auto ${accentTextClass} animate-bounce mt-2`} />

          <h1 className="text-xl font-black mt-4 tracking-tight">Application Under Review</h1>
          <p className="text-xs text-gray-400 mt-1.5 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-extrabold text-[#0B2545]">{profile.name}</span>! Your
            onboarding questionnaire is submitted and currently under review by the operations team.
          </p>

          {/* Submission Details */}
          <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4 mt-4 text-left space-y-3 max-w-lg mx-auto">
            <h3 className="text-[10px] font-black uppercase tracking-wider border-b border-gray-200/60 pb-1 text-gray-400">
              Your Application Summary
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-gray-400 block text-[10px]">Experience:</span>
                <span className="font-extrabold">{profile.questionnaire.experience}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block text-[10px]">Availability:</span>
                <span className="font-extrabold">{profile.questionnaire.availability}</span>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-400 block mb-1 text-[10px]">
                  Equipment Declared:
                </span>
                <div className="flex flex-wrap gap-1">
                  {profile.questionnaire.equipment.map((eq, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white border border-gray-200"
                    >
                      ✓ {eq}
                    </span>
                  ))}
                  {profile.questionnaire.equipment.length === 0 && (
                    <span className="text-[10px] text-gray-400 italic">No equipment declared</span>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-400 block text-[10px]">
                  Professional Bio:
                </span>
                <p className="text-xs text-[#0B2545]/85 italic bg-white p-2 rounded-xl border border-gray-150 leading-relaxed mt-0.5">
                  &ldquo;{profile.questionnaire.bio}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-gray-50 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signin"
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-extrabold uppercase tracking-wider text-gray-500 hover:bg-gray-50 cursor-pointer text-center"
            >
              Sign Out / Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CASE 2: PENDING & NEEDS QUESTIONNAIRE ONBOARDING
  // ----------------------------------------------------
  if (profile.approvalStatus === 'pending' && !profile.questionnaire) {
    return (
      <div className="flex items-center justify-center min-h-[75vh] p-4 font-sans text-[#0B2545] text-left animate-in fade-in duration-300">
        <div className="bg-white border border-[#0B2545]/15 rounded-3xl p-8 max-w-xl w-full text-center shadow-lg relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full h-1.5 ${isNavy ? 'bg-[#0B2545]' : 'bg-[#EE5E36]'}`}
          />

          <ClipboardCheck className={`w-12 h-12 mx-auto ${accentTextClass}`} />

          <h1 className="text-xl font-black mt-4 tracking-tight">
            Worker Onboarding questionnaire
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Welcome, {profile.name}! Please fill out this short questionnaire to help us verify your
            dispatch options.
          </p>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-6 mt-6 mb-8 text-xs font-bold text-gray-400 select-none">
            <span className={step >= 1 ? 'text-[#EE5E36] font-black' : ''}>1. Experience</span>
            <span className="text-gray-300">➔</span>
            <span className={step >= 2 ? 'text-[#EE5E36] font-black' : ''}>2. Equipment</span>
            <span className="text-gray-300">➔</span>
            <span className={step >= 3 ? 'text-[#EE5E36] font-black' : ''}>3. Availability</span>
          </div>

          <form onSubmit={handleOnboardingSubmit} className="text-left space-y-5">
            {/* Step 1: Experience selection */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Years of Professional Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3.5 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-[#EE5E36] cursor-pointer"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years of Industry Experience</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF4F0]/40 border border-[#EE5E36]/10 text-xs leading-relaxed text-[#0B2545]/85">
                  <span className="font-extrabold text-[#EE5E36] block mb-0.5">
                    ℹ Verified Credentials
                  </span>
                  Our operator staff validates experience using references or public work registries
                  to ensure top service quality.
                </div>
              </div>
            )}

            {/* Step 2: Equipment checklists */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Select tools/equipment you own & bring to jobs
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {equipmentOptions.map((eq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleEquipment(eq)}
                      className={`px-3 py-3 border rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        selectedEquipment.includes(eq)
                          ? 'border-[#EE5E36] bg-[#FFF4F0]/30 font-black'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-[#0B2545]/70'
                      }`}
                    >
                      <span>{eq}</span>
                      {selectedEquipment.includes(eq) ? (
                        <Check className="w-4 h-4 text-[#EE5E36]" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Availability & Bio */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Weekly Work Availability
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Full-Time', 'Part-Time', 'Weekends'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAvailability(opt)}
                        className={`py-2 px-3 border rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          availability === opt
                            ? 'border-[#EE5E36] bg-[#FFF4F0]/30 text-[#EE5E36]'
                            : 'border-gray-200 bg-white hover:bg-gray-50 text-[#0B2545]/60'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Professional Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe your specialties, background, or equipment setup..."
                    className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${borderFocusClass} transition-colors resize-none`}
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-xs font-extrabold uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${btnClass}`}
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm shadow-[#EE5E36]/10 ${btnClass}`}
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CASE 3: APPROVED -> NORMAL DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="space-y-6 text-[#0B2545] font-sans text-left max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 relative overflow-hidden shadow-3xs flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div className={`absolute top-0 left-0 w-full h-1 bg-[#EE5E36]`} />
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#34A853]" />
            <span className="text-[10px] font-black uppercase text-[#34A853] tracking-widest">
              Active Registered Provider
            </span>
          </div>
          <h1 className="text-2xl font-black mt-1 leading-tight">Welcome, {profile.name}!</h1>
          <p className="text-xs text-gray-400 mt-1 max-w-md leading-relaxed">
            Your worker console is active. You can take on customer jobs from the job board or
            verify schedules.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/worker/tasks"
            className="px-4.5 py-2.5 border border-gray-250 hover:bg-gray-50 text-[10px] font-black uppercase tracking-wider rounded-xl cursor-pointer flex items-center gap-1.5 transition-all text-[#0B2545]"
          >
            <ClipboardList className="w-4 h-4" /> My Job Board
          </Link>
          <Link
            href="/worker/profile"
            className={`px-4.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl cursor-pointer flex items-center gap-1.5 transition-all text-white ${btnClass}`}
          >
            <User className="w-4 h-4" /> My Profile
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-150/70 rounded-3xl p-6 shadow-3xs text-center space-y-1">
          <Award className={`w-8 h-8 mx-auto ${accentTextClass}`} />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expert Role</p>
          <p className="text-lg font-black leading-none">{profile.role}</p>
        </div>

        <div className="bg-white border border-gray-150/70 rounded-3xl p-6 shadow-3xs text-center space-y-1">
          <div className="text-lg font-black flex items-center justify-center gap-1">
            <span className="text-yellow-500 text-xl">★</span> {profile.rating}
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Provider Rating
          </p>
          <p className="text-xs font-black text-gray-450 uppercase tracking-wider">
            Top Rated Expert
          </p>
        </div>

        <div className="bg-white border border-gray-150/70 rounded-3xl p-6 shadow-3xs text-center space-y-1">
          <p className="text-2xl font-black">{profile.completedJobs}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Completed Jobs
          </p>
          <p className="text-xs font-black text-gray-455 uppercase tracking-wider">
            Jobs Dispatched
          </p>
        </div>
      </div>
    </div>
  );
}
