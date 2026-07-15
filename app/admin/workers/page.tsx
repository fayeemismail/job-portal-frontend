'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Plus,
  Search,
  Star,
  Briefcase,
  Mail,
  Phone,
  Trash2,
  Edit,
  X,
  CheckCircle,
  Inbox,
  FileText,
  Clock,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  getLocalWorkers,
  saveLocalWorkers,
  addWorker,
  updateWorkerProfile,
  updateApprovalStatus,
  WorkerProfile,
} from '@/utils/worker-profile-store';

export default function AdminWorkersPage() {
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // New State for Tabs & Onboarding review
  const [activeTab, setActiveTab] = useState<'roster' | 'onboarding'>('roster');
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Modal / Form States for active roster edit/add
  const [showModal, setShowModal] = useState(false);
  const [editingWorkerId, setEditingWorkerId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState('Cleaning Expert');
  const [formAvatar, setFormAvatar] = useState('');
  const [formSkillsText, setFormSkillsText] = useState('');

  // Feedback message
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const fetchWorkers = () => {
    setWorkers(getLocalWorkers());
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchWorkers();
      setMounted(true);
    });
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setEditingWorkerId(null);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormRole('Cleaning Expert');
    setFormAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'); // default preset
    setFormSkillsText('');
    setShowModal(true);
  };

  const handleOpenEditModal = (worker: WorkerProfile) => {
    setEditingWorkerId(worker.id);
    setFormName(worker.name);
    setFormEmail(worker.email);
    setFormPhone(worker.phone);
    setFormRole(worker.role);
    setFormAvatar(worker.avatar);
    setFormSkillsText(worker.skills.join(', '));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingWorkerId(null);
  };

  const handleDeleteWorker = (id: string) => {
    const updated = workers.filter((w) => w.id !== id);
    setWorkers(updated);
    saveLocalWorkers(updated);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('workerProfileUpdated'));
    }

    triggerFeedback('Worker deleted successfully!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) {
      triggerFeedback('Error: Please fill in Name, Email, and Phone.');
      return;
    }

    const parsedSkills = formSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (editingWorkerId) {
      const workerToUpdate = workers.find((w) => w.id === editingWorkerId);
      if (workerToUpdate) {
        updateWorkerProfile(workerToUpdate.email, {
          name: formName,
          email: formEmail,
          phone: formPhone,
          role: formRole,
          avatar: formAvatar,
          skills: parsedSkills,
        });
        fetchWorkers();
        triggerFeedback('Worker details updated successfully!');
      }
    } else {
      const newWorkerData = {
        name: formName,
        email: formEmail,
        phone: formPhone,
        role: formRole,
        avatar: formAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        rating: 5.0,
        completedJobs: 0,
        skills: parsedSkills.length > 0 ? parsedSkills : [formRole],
        approvalStatus: 'approved' as const,
      };
      addWorker(newWorkerData);
      fetchWorkers();
      triggerFeedback('New worker registered successfully!');
    }

    setShowModal(false);
  };

  // Approval actions
  const handleApproveWorker = (id: string) => {
    const success = updateApprovalStatus(id, 'approved');
    if (success) {
      fetchWorkers();
      setShowReviewModal(false);
      triggerFeedback('Worker application approved! Registered in Active Roster.');
    }
  };

  const handleRejectWorker = (id: string) => {
    const success = updateApprovalStatus(id, 'rejected');
    if (success) {
      fetchWorkers();
      setShowReviewModal(false);
      triggerFeedback('Worker application declined.');
    }
  };

  const handleOpenReview = (worker: WorkerProfile) => {
    setSelectedWorker(worker);
    setShowReviewModal(true);
  };

  // Group workers by approval status
  const approvedWorkers = workers.filter((w) => w.approvalStatus === 'approved');
  const pendingWorkers = workers.filter((w) => w.approvalStatus === 'pending');

  // Filter based on active tab & query
  const getFilteredList = () => {
    const activeList = activeTab === 'roster' ? approvedWorkers : pendingWorkers;
    const q = searchQuery.toLowerCase();
    if (!q) return activeList;
    return activeList.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.role.toLowerCase().includes(q) ||
        w.skills.some((s) => s.toLowerCase().includes(q))
    );
  };

  const filteredList = getFilteredList();

  // Styles based on accentTheme
  const accentTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const tagBgClass = isNavy
    ? 'bg-[#0B2545]/5 text-[#0B2545] border-[#0B2545]/10'
    : 'bg-[#FFF4F0] text-[#EE5E36] border-[#EE5E36]/10';
  const btnClass = isNavy
    ? 'bg-[#0B2545] hover:bg-[#0B2545]/90 text-white shadow-[#0B2545]/10'
    : 'bg-[#EE5E36] hover:bg-[#EE5E36]/90 text-white shadow-[#EE5E36]/10';
  const focusBorderClass = isNavy ? 'focus:border-[#0B2545]' : 'focus:border-[#EE5E36]';
  const focusRingClass = isNavy ? 'focus:ring-[#0B2545]/10' : 'focus:ring-[#EE5E36]/10';

  if (!mounted) {
    return <div className="min-h-screen bg-white animate-pulse" />;
  }

  return (
    <div className="space-y-6 text-[#0B2545] font-sans text-left animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B2545] border border-white/10 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <div className="w-5 h-5 rounded-full bg-[#EE5E36] flex items-center justify-center text-white font-extrabold text-[10px]">
            ✓
          </div>
          {feedbackMsg}
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${accentTextClass}`}>
            Human Resources
          </span>
          <h1 className="text-2xl font-black mt-1">Provider & Worker Registry</h1>
        </div>
        <button
          onClick={handleOpenAddModal}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all hover:scale-[1.01] active:scale-98 ${btnClass}`}
        >
          <Plus className="w-4 h-4" /> Register New Worker
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-gray-100 gap-1.5 select-none">
        <button
          onClick={() => {
            setActiveTab('roster');
            setSearchQuery('');
          }}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'roster'
              ? 'border-[#EE5E36] text-[#EE5E36]'
              : 'border-transparent text-[#0B2545]/60 hover:text-[#0B2545]'
          }`}
        >
          Active Roster ({approvedWorkers.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('onboarding');
            setSearchQuery('');
          }}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'onboarding'
              ? 'border-[#EE5E36] text-[#EE5E36]'
              : 'border-transparent text-[#0B2545]/60 hover:text-[#0B2545]'
          }`}
        >
          Onboarding Inbox ({pendingWorkers.length})
          {pendingWorkers.length > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
          )}
        </button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'roster' ? 'Search active roster...' : 'Search applicant registry...'
            }
            className={`w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:bg-white focus:ring-4 focus:outline-none rounded-2xl text-xs font-semibold text-[#0B2545] placeholder-gray-450 transition-all ${focusBorderClass} ${focusRingClass}`}
          />
        </div>

        {/* Quick info */}
        <div className="flex items-center gap-5 text-right w-full sm:w-auto shrink-0 justify-end">
          <div className="text-xs font-bold text-gray-400">Showing {filteredList.length} total</div>
        </div>
      </div>

      {/* ACTIVE ROSTER TAB DISPLAY */}
      {activeTab === 'roster' && (
        <>
          {filteredList.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl py-16 px-4 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-black text-gray-400">No active workers found</h3>
              <p className="text-xs text-gray-300 mt-1">
                No registry matches or search query has no hits.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredList.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white border border-gray-150/70 rounded-2xl p-4.5 flex flex-col justify-between shadow-3xs hover:border-[#EE5E36]/25 hover:shadow-2xs transition-all relative group overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-0.5 bg-[#EE5E36]/10 group-hover:bg-[#EE5E36] transition-colors`}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      {/* Photo */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100/70 shrink-0 shadow-3xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Name and title */}
                      <div className="space-y-0.5 min-w-0">
                        <h3 className="text-sm font-black leading-tight tracking-tight truncate">
                          {worker.name}
                        </h3>
                        <p
                          className={`text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${accentTextClass}`}
                        >
                          <Briefcase className="w-3 h-3 shrink-0" />
                          {worker.role}
                        </p>
                      </div>
                    </div>

                    {/* Rating & Jobs */}
                    <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-xl mt-3 border border-gray-50 text-[10.5px]">
                      <div className="flex-1 flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 fill-[#FBBC05] text-[#FBBC05]" />
                        <span className="font-black">{worker.rating}</span>
                        <span className="text-[9.5px] text-gray-400 font-semibold">Avg</span>
                      </div>
                      <div className="w-px h-3 bg-gray-250" />
                      <div className="flex-1 flex items-center justify-center gap-1">
                        <span className="font-black">{worker.completedJobs}</span>
                        <span className="text-[9.5px] text-gray-400 font-semibold uppercase tracking-wider">
                          Jobs Done
                        </span>
                      </div>
                    </div>

                    {/* Contact info */}
                    <div className="space-y-1.5 mt-3 text-[10.5px] font-semibold text-gray-500 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate">{worker.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{worker.phone}</span>
                      </div>
                    </div>

                    {/* Skills tags */}
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        Expertise Skills ({worker.skills.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {worker.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md border ${tagBgClass}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex gap-2 mt-4 border-t border-gray-50 pt-3">
                    <button
                      onClick={() => handleOpenEditModal(worker)}
                      className="flex-1 py-1.5 px-2.5 border border-gray-200 hover:border-[#EE5E36]/30 hover:bg-[#FFF4F0]/10 rounded-lg text-[9.5px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer text-[#0B2545]/70 hover:text-[#EE5E36] transition-all active:scale-95"
                    >
                      <Edit className="w-3 h-3" /> Edit Profile
                    </button>

                    {worker.email !== 'worker@example.com' && (
                      <button
                        onClick={() => handleDeleteWorker(worker.id)}
                        className="py-1.5 px-2.5 border border-red-100 hover:border-red-250 hover:bg-red-50 text-red-500 rounded-lg text-[9.5px] font-extrabold uppercase tracking-wider flex items-center justify-center cursor-pointer transition-all active:scale-95"
                        title="Remove Worker"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ONBOARDING INBOX TAB DISPLAY */}
      {activeTab === 'onboarding' && (
        <>
          {filteredList.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl py-16 px-4 text-center">
              <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-black text-gray-400">Onboarding inbox is empty</h3>
              <p className="text-xs text-gray-300 mt-1">
                No pending worker application requests are waiting for dispatch approval.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-[#FFFBF9] border border-[#EE5E36]/15 rounded-3xl p-5 flex flex-col justify-between shadow-3xs relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#EE5E36]/35" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border border-gray-150 shrink-0 shadow-3xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-black leading-tight tracking-tight">
                          {worker.name}
                        </h3>
                        <p
                          className={`text-[9.5px] font-black uppercase tracking-wider flex items-center gap-1 ${accentTextClass}`}
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          {worker.role}
                        </p>
                      </div>
                    </div>

                    {/* Status details */}
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                        <span className="font-bold text-gray-450 text-[10px] uppercase">
                          Form Status
                        </span>
                        {worker.questionnaire ? (
                          <span className="flex items-center gap-1 text-[#34A853] font-black text-[10px] uppercase tracking-wider">
                            <CheckCircle className="w-3.5 h-3.5" /> Submitted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#FBBC05] font-black text-[10px] uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5 animate-spin" /> Awaiting Form
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-[10.5px] font-semibold text-gray-500">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{worker.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{worker.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100/60 pt-4">
                    {worker.questionnaire ? (
                      <button
                        onClick={() => handleOpenReview(worker)}
                        className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 text-white ${btnClass}`}
                      >
                        <FileText className="w-4 h-4" /> Review Questionnaire
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-gray-400 bg-gray-100/80 border border-gray-200 cursor-not-allowed select-none"
                      >
                        Pending Questionnaire
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Review Modal - Admin Accept/Reject Questionnaire answers */}
      {showReviewModal && selectedWorker && (
        <div className="fixed inset-0 bg-[#0B2545]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-250">
          <div className="bg-white border border-[#0B2545]/15 rounded-3xl max-w-xl w-full p-6 text-[#0B2545] font-sans relative shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-[#0B2545] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black tracking-tight mb-1">Review Worker Application</h2>
            <p className="text-xs text-gray-400 mb-5">
              Evaluate onboarding credentials and choose to approve or decline.
            </p>

            <div className="space-y-5 text-left">
              {/* Applicant Card */}
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedWorker.avatar}
                    alt={selectedWorker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-black leading-none">{selectedWorker.name}</h3>
                  <p className="text-[10px] font-black text-gray-450 uppercase tracking-widest mt-1">
                    {selectedWorker.role}
                  </p>
                  <p className="text-[10.5px] text-gray-400 mt-0.5">
                    {selectedWorker.email} • {selectedWorker.phone}
                  </p>
                </div>
              </div>

              {/* Questionnaire details */}
              {selectedWorker.questionnaire ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
                    Onboarding Submissions
                  </h3>

                  {/* Legacy questionnaire fields if present */}
                  {(selectedWorker.questionnaire.experience ||
                    selectedWorker.questionnaire.availability) && (
                    <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                      {selectedWorker.questionnaire.experience && (
                        <div>
                          <span className="font-semibold text-gray-400 block text-[10px]">
                            Experience Declared:
                          </span>
                          <span className="font-extrabold">
                            {selectedWorker.questionnaire.experience}
                          </span>
                        </div>
                      )}
                      {selectedWorker.questionnaire.availability && (
                        <div>
                          <span className="font-semibold text-gray-400 block text-[10px]">
                            Availability:
                          </span>
                          <span className="font-extrabold">
                            {selectedWorker.questionnaire.availability}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* New onboarding fields */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {selectedWorker.questionnaire.primaryService && (
                      <div className="col-span-2">
                        <span className="font-semibold text-gray-400 block text-[10px] uppercase tracking-wider">
                          Service Offered:
                        </span>
                        <span className="font-extrabold text-[#0B2545]">
                          {selectedWorker.questionnaire.primaryService}
                        </span>
                      </div>
                    )}
                    {selectedWorker.questionnaire.phone && (
                      <div>
                        <span className="font-semibold text-gray-400 block text-[10px] uppercase tracking-wider">
                          Phone Number:
                        </span>
                        <span className="font-extrabold text-[#0B2545]">
                          {selectedWorker.questionnaire.phone}
                        </span>
                      </div>
                    )}
                    {selectedWorker.questionnaire.baseLocation && (
                      <div>
                        <span className="font-semibold text-gray-400 block text-[10px] uppercase tracking-wider">
                          Base Location:
                        </span>
                        <span className="font-extrabold text-[#0B2545]">
                          {selectedWorker.questionnaire.baseLocation}
                        </span>
                      </div>
                    )}
                    {selectedWorker.questionnaire.serviceableDistance !== undefined && (
                      <div>
                        <span className="font-semibold text-gray-400 block text-[10px] uppercase tracking-wider">
                          Serviceable Radius:
                        </span>
                        <span className="font-extrabold text-[#0B2545]">
                          {selectedWorker.questionnaire.serviceableDistance} km
                        </span>
                      </div>
                    )}

                    {/* Bank Details section */}
                    {selectedWorker.questionnaire.bankDetails && (
                      <div className="col-span-2 bg-[#FFF4F0]/30 border border-[#EE5E36]/10 p-3.5 rounded-2xl space-y-2.5">
                        <h4 className="text-[10px] font-black uppercase text-[#EE5E36] tracking-wider border-b border-[#EE5E36]/10 pb-1">
                          Bank Account Details
                        </h4>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                              Bank Name:
                            </span>
                            <span className="font-extrabold text-[#0B2545]">
                              {selectedWorker.questionnaire.bankDetails.bankName}
                            </span>
                          </div>
                          {selectedWorker.questionnaire.bankDetails.branchName && (
                            <div>
                              <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                                Branch:
                              </span>
                              <span className="font-extrabold text-[#0B2545]">
                                {selectedWorker.questionnaire.bankDetails.branchName}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                              IFSC Code:
                            </span>
                            <span className="font-extrabold text-[#0B2545]">
                              {selectedWorker.questionnaire.bankDetails.ifscCode}
                            </span>
                          </div>
                          {selectedWorker.questionnaire.bankDetails.accountNumber && (
                            <div>
                              <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                                Account Number:
                              </span>
                              <span className="font-extrabold text-[#0B2545]">
                                ••••{' '}
                                {selectedWorker.questionnaire.bankDetails.accountNumber.slice(-4)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Documents list */}
                    {selectedWorker.questionnaire.documents &&
                      selectedWorker.questionnaire.documents.length > 0 && (
                        <div className="col-span-2 space-y-2">
                          <span className="font-semibold text-gray-400 block text-[10px] uppercase tracking-wider">
                            Uploaded Documents ({selectedWorker.questionnaire.documents.length}):
                          </span>
                          <div className="space-y-2">
                            {selectedWorker.questionnaire.documents.map((doc, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-white border border-gray-150 p-2.5 rounded-xl text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4.5 h-4.5 text-[#EE5E36]" />
                                  <div>
                                    <p className="font-extrabold text-[#0B2545] truncate max-w-[200px]">
                                      {doc.name}
                                    </p>
                                    <p className="text-[9px] text-gray-400">
                                      {doc.type} • {doc.size}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-250">
                                    {doc.status}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      alert(
                                        `Reviewing document: ${doc.name}\nType: ${doc.type}\nUploaded: ${doc.uploadedAt}\nStatus: ${doc.status}`
                                      )
                                    }
                                    className="text-[9px] font-black uppercase text-[#EE5E36] hover:underline cursor-pointer"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-gray-400 italic">
                  Applicant has not submitted onboarding questionnaire form yet.
                </div>
              )}

              {/* Accept / Reject Action Footer */}
              <div className="flex gap-3 pt-5 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => handleRejectWorker(selectedWorker.id)}
                  className="flex-1 py-3 px-4 border border-red-200 hover:bg-red-50 text-red-500 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all active:scale-95"
                >
                  Decline Application
                </button>
                <button
                  type="button"
                  onClick={() => handleApproveWorker(selectedWorker.id)}
                  className="flex-1 py-3 px-4 bg-[#34A853] hover:bg-[#34A853]/90 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all active:scale-95"
                >
                  Approve & Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Add / Edit Worker */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0B2545]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-[#0B2545]/15 rounded-3xl max-w-lg w-full p-6 text-[#0B2545] font-sans relative shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-[#0B2545] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black tracking-tight mb-1">
              {editingWorkerId ? 'Edit Worker Profile' : 'Register New Service Provider'}
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Specify skills, credentials, and dispatcher details.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Jordan Vance"
                    className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors`}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    disabled={!!editingWorkerId}
                    className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors`}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    placeholder="+1 (555) 012-3456"
                    className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors`}
                  />
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Primary Role
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors cursor-pointer`}
                  >
                    <option value="Cleaning Expert">Cleaning Expert</option>
                    <option value="Painting Expert">Painting Expert</option>
                    <option value="Plumbing Expert">Plumbing Expert</option>
                    <option value="Electrical Expert">Electrical Expert</option>
                    <option value="Carpentry Expert">Carpentry Expert</option>
                  </select>
                </div>
              </div>

              {/* Avatar Url */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={formAvatar}
                  onChange={(e) => setFormAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-... (optional)"
                  className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors`}
                />
              </div>

              {/* Skills Tags Text */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Service Skills (Comma separated list)
                </label>
                <textarea
                  value={formSkillsText}
                  onChange={(e) => setFormSkillsText(e.target.value)}
                  placeholder="e.g. Deep Cleaning, Floor Buffing, Stain Removal"
                  rows={2}
                  className={`w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold outline-none ${focusBorderClass} transition-colors resize-none`}
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-gray-250 text-gray-500 hover:bg-gray-50 text-xs font-extrabold uppercase tracking-wider cursor-pointer transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all active:scale-95 ${btnClass}`}
                >
                  {editingWorkerId ? 'Save Profile' : 'Add Worker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
