'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ClipboardList,
  User,
  CheckCircle,
  Clock,
  ArrowRight,
  ClipboardCheck,
  Phone,
  MapPin,
  FileText,
  UploadCloud,
  Trash2,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  getWorkerByEmail,
  submitOnboarding,
  WorkerProfile,
  WorkerQuestionnaire,
  WorkerDocument,
} from '@/utils/worker-profile-store';

// ---- Custom Dropdown Component (viewport-aware, fixed positioning) ----
function CustomDropdown({
  label,
  value,
  options,
  onChange,
  accentBg,
}: {
  label: string;
  value: string;
  options: { value: string; label: string; sub?: string }[];
  onChange: (v: string) => void;
  accentBg: string;
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((o) => o.value === value) || options[0];

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - r.bottom;
      const estimatedHeight = options.length * 52;
      setDropUp(spaceBelow < estimatedHeight && r.top > estimatedHeight);
      setRect(r);
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.closest('[data-dropdown]')?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const panelStyle: React.CSSProperties = rect
    ? {
        position: 'fixed',
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        ...(dropUp ? { bottom: window.innerHeight - rect.top + 6 } : { top: rect.bottom + 6 }),
      }
    : {};

  return (
    <div className="space-y-1.5" data-dropdown>
      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <div className="relative">
        <button
          ref={btnRef}
          type="button"
          onClick={handleToggle}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold text-[#0B2545] outline-none cursor-pointer transition-all duration-150 hover:bg-white hover:border-gray-300"
        >
          <div className="flex flex-col items-start text-left">
            <span className="font-bold text-[#0B2545]">{selected.label}</span>
            {selected.sub && (
              <span className="text-[9px] text-gray-400 font-normal mt-0.5">{selected.sub}</span>
            )}
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && rect && (
          <div
            style={panelStyle}
            className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors duration-100 ${
                  opt.value === value
                    ? 'bg-orange-50/70 text-[#EE5E36]'
                    : 'hover:bg-gray-50/80 text-[#0B2545]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{opt.label}</span>
                  {opt.sub && (
                    <span className="text-[9px] text-gray-400 font-normal mt-0.5">{opt.sub}</span>
                  )}
                </div>
                {opt.value === value && (
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentBg }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('worker@example.com');
  const [profile, setProfile] = useState<WorkerProfile | null>(null);

  // Wizard States
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [baseLocation, setBaseLocation] = useState('');
  const [serviceableDistance, setServiceableDistance] = useState(10);
  const [primaryService, setPrimaryService] = useState('Cleaning Expert');

  const [docType, setDocType] = useState('Aadhar Card');
  const [fileName, setFileName] = useState('');
  const [documents, setDocuments] = useState<WorkerDocument[]>([]);
  const [uploading, setUploading] = useState(false);

  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const updateProfileData = (loggedInEmail: string) => {
    const data = getWorkerByEmail(loggedInEmail);
    if (data) {
      setProfile(data);
      if (data.phone) {
        setPhone(data.phone);
      }
      if (data.questionnaire) {
        setPhone(data.questionnaire.phone || data.phone || '');
        setBaseLocation(data.questionnaire.baseLocation || '');
        setServiceableDistance(data.questionnaire.serviceableDistance || 10);
        setPrimaryService(data.questionnaire.primaryService || data.role || 'Cleaning Expert');
        setDocuments(data.questionnaire.documents || []);
        if (data.questionnaire.bankDetails) {
          setBankName(data.questionnaire.bankDetails.bankName || '');
          setBranchName(data.questionnaire.bankDetails.branchName || '');
          setAccountNumber(data.questionnaire.bankDetails.accountNumber || '');
          setIfscCode(data.questionnaire.bankDetails.ifscCode || '');
        }
      } else {
        setPrimaryService(data.role || 'Cleaning Expert');
      }
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      const loggedInEmail = localStorage.getItem('vance_logged_in_email') || 'worker@example.com';
      setEmail(loggedInEmail);

      const data = getWorkerByEmail(loggedInEmail);
      if (data && data.approvalStatus === 'approved') {
        router.push('/worker/tasks');
        return;
      }

      updateProfileData(loggedInEmail);
      setMounted(true);
    });
  }, [router]);

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert('Please fill in your Phone Number in Step 1.');
      return;
    }
    if (!baseLocation) {
      alert('Please fill in your Base Location in Step 1.');
      return;
    }
    if (documents.length === 0) {
      alert('Please upload at least one document in Step 2.');
      return;
    }
    if (!bankName || !branchName || !accountNumber || !ifscCode) {
      alert('Please fill in all Bank Details in Step 3.');
      return;
    }

    const answers: WorkerQuestionnaire = {
      phone,
      baseLocation,
      serviceableDistance,
      primaryService,
      documents,
      bankDetails: {
        bankName,
        branchName,
        accountNumber,
        ifscCode,
      },
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
  const accentBg = isNavy ? '#0B2545' : '#EE5E36';
  const btnClass = isNavy
    ? 'bg-[#0B2545] hover:bg-[#0B2545]/90 text-white'
    : 'bg-[#EE5E36] hover:bg-[#EE5E36]/90 text-white';

  // ----------------------------------------------------
  // CASE 1: PENDING & QUESTIONNAIRE SUBMITTED -> UNDER REVIEW
  // ----------------------------------------------------
  if (profile.approvalStatus === 'pending' && profile.questionnaire) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-3 font-sans text-[#0B2545] text-left animate-in fade-in duration-300">
        <div className="bg-white border border-[#0B2545]/10 rounded-3xl p-5 max-w-md w-full text-center shadow-lg relative">
          {/* Accent bar — clipped separately so dropdowns can overflow the card */}
          <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl overflow-hidden">
            <div className={`w-full h-full ${isNavy ? 'bg-[#0B2545]' : 'bg-[#EE5E36]'}`} />
          </div>

          <Clock className={`w-9 h-9 mx-auto ${accentTextClass} animate-bounce mt-1`} />

          <h1 className="text-lg font-black mt-3 tracking-tight">Application Under Review</h1>
          <p className="text-[11px] text-gray-400 mt-1 max-w-sm mx-auto leading-relaxed">
            Thank you, <span className="font-extrabold text-[#0B2545]">{profile.name}</span>! Your
            onboarding details have been submitted and are currently under review by the operations
            team.
          </p>

          {/* Submission Details */}
          <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-3.5 mt-3 text-left space-y-2.5 max-w-sm mx-auto">
            <h3 className="text-[9px] font-black uppercase tracking-wider border-b border-gray-200/60 pb-1 text-gray-400">
              Your Application Summary
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="col-span-2">
                <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                  Service Offered:
                </span>
                <span className="font-extrabold text-[#0B2545]">
                  {profile.questionnaire.primaryService || profile.role}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                  Phone:
                </span>
                <span className="font-extrabold text-[#0B2545]">
                  {profile.questionnaire.phone || profile.phone}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                  Base Location:
                </span>
                <span className="font-extrabold text-[#0B2545]">
                  {profile.questionnaire.baseLocation}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                  Radius:
                </span>
                <span className="font-extrabold text-[#0B2545]">
                  {profile.questionnaire.serviceableDistance} km
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider">
                  Bank:
                </span>
                <span className="font-extrabold text-[#0B2545]">
                  {profile.questionnaire.bankDetails?.bankName}
                  {profile.questionnaire.bankDetails?.branchName
                    ? ` — ${profile.questionnaire.bankDetails.branchName}`
                    : ''}
                </span>
              </div>

              <div className="col-span-2 border-t border-gray-100 pt-2">
                <span className="font-semibold text-gray-400 block text-[9px] uppercase tracking-wider mb-1">
                  Provided Documents:
                </span>
                <div className="space-y-1">
                  {profile.questionnaire.documents?.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white border border-gray-150 p-1.5 rounded-lg text-[11px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#EE5E36]" />
                        <div>
                          <p className="font-extrabold text-[#0B2545] truncate max-w-[150px]">
                            {doc.name}
                          </p>
                          <p className="text-[8px] text-gray-400">{doc.type}</p>
                        </div>
                      </div>
                      <span className="text-[7.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-250">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                  {(!profile.questionnaire.documents ||
                    profile.questionnaire.documents.length === 0) && (
                    <span className="text-[9px] text-gray-400 italic">No documents uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-gray-50 flex gap-2.5 justify-center">
            <Link
              href="/signin"
              className="px-4 py-2 rounded-xl border border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 hover:bg-gray-50 cursor-pointer text-center"
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
      <div className="flex items-center justify-center min-h-[70vh] p-4 font-sans text-[#0B2545] text-left animate-in fade-in duration-300">
        <div className="bg-white border border-[#0B2545]/15 rounded-3xl p-5 max-w-md w-full text-center shadow-lg relative">
          {/* Accent bar — clipped separately so dropdowns can overflow the card */}
          <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl overflow-hidden">
            <div className={`w-full h-full ${isNavy ? 'bg-[#0B2545]' : 'bg-[#EE5E36]'}`} />
          </div>

          <ClipboardCheck className={`w-9 h-9 mx-auto ${accentTextClass}`} />

          <h1 className="text-lg font-black mt-3 tracking-tight">Worker Onboarding Setup</h1>
          <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Welcome, {profile.name}! Please fill out your profile details, documents, and bank
            details to complete your application.
          </p>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-6 mt-4 mb-5 text-xs font-bold text-gray-400 select-none">
            <span className={step >= 1 ? 'text-[#EE5E36] font-black' : ''}>1. Setup Details</span>
            <span className="text-gray-300">➔</span>
            <span className={step >= 2 ? 'text-[#EE5E36] font-black' : ''}>2. Documents</span>
            <span className="text-gray-300">➔</span>
            <span className={step >= 3 ? 'text-[#EE5E36] font-black' : ''}>3. Bank Account</span>
          </div>

          <form onSubmit={handleOnboardingSubmit} className="text-left space-y-4">
            {/* Step 1: Setup Details */}
            {step === 1 && (
              <div className="space-y-3.5 animate-in fade-in slide-in-from-right-4 duration-200">
                <CustomDropdown
                  label="Primary Service Offered"
                  value={primaryService}
                  onChange={setPrimaryService}
                  accentBg={accentBg}
                  options={[
                    {
                      value: 'Cleaning Expert',
                      label: 'Cleaning Expert',
                      sub: 'Home & office cleaning',
                    },
                    {
                      value: 'Painting Expert',
                      label: 'Painting Expert',
                      sub: 'Interior & exterior painting',
                    },
                    {
                      value: 'Plumbing Expert',
                      label: 'Plumbing Expert',
                      sub: 'Pipes, fixtures & repairs',
                    },
                    {
                      value: 'Electrical Expert',
                      label: 'Electrical Expert',
                      sub: 'Wiring, panels & appliances',
                    },
                    {
                      value: 'Carpentry Expert',
                      label: 'Carpentry Expert',
                      sub: 'Furniture & woodwork',
                    },
                    {
                      value: 'Appliance Repair Expert',
                      label: 'Appliance Repair Expert',
                      sub: 'AC, washer, fridge etc.',
                    },
                    {
                      value: 'Yard Mowing Expert',
                      label: 'Yard Mowing Expert',
                      sub: 'Lawn & garden care',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-xl text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Base Location (City, State or PIN)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={baseLocation}
                      onChange={(e) => setBaseLocation(e.target.value)}
                      placeholder="e.g. Bangalore, KA"
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-xl text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <CustomDropdown
                  label="Serviceable Distance"
                  value={String(serviceableDistance)}
                  onChange={(v) => setServiceableDistance(Number(v))}
                  accentBg={accentBg}
                  options={[
                    { value: '5', label: '5 km', sub: 'Hyper-local area' },
                    { value: '10', label: '10 km', sub: 'Standard radius' },
                    { value: '25', label: '25 km', sub: 'City-wide coverage' },
                    { value: '50', label: '50 km', sub: 'Extended region' },
                    { value: '100', label: '100 km', sub: 'District / long distance' },
                  ]}
                />
              </div>
            )}

            {/* Step 2: Document upload */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                <CustomDropdown
                  label="Document Type"
                  value={docType}
                  onChange={setDocType}
                  accentBg={accentBg}
                  options={[
                    { value: 'Aadhar Card', label: 'Aadhar Card', sub: 'Government-issued ID' },
                    {
                      value: 'Driving License',
                      label: 'Driving License',
                      sub: 'Valid driving permit',
                    },
                    { value: 'Passport', label: 'Passport', sub: 'International travel document' },
                    { value: 'PAN Card', label: 'PAN Card', sub: 'Tax identification' },
                    { value: 'Tax Document', label: 'Tax Document', sub: 'Tax filings or TDS' },
                    {
                      value: 'Other Certification',
                      label: 'Other Certification',
                      sub: 'Trade or skill certificate',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Upload File
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-[#EE5E36]/50 bg-gray-50/50 hover:bg-white p-4 rounded-2xl cursor-pointer transition-all duration-200">
                      <UploadCloud className="w-7 h-7 text-gray-400 mb-1" />
                      <span className="text-[10px] font-black text-[#0B2545] uppercase tracking-wider">
                        {uploading ? 'Processing file...' : fileName || 'Click to Select File'}
                      </span>
                      <span className="text-[9px] text-gray-400 mt-0.5">
                        PDF, PNG, JPG up to 10MB
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            setFileName(file.name);
                            setUploading(true);
                            setTimeout(() => {
                              setUploading(false);
                              const newDoc: WorkerDocument = {
                                type: docType,
                                name: file.name,
                                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                                uploadedAt: new Date().toLocaleDateString(),
                                status: 'Pending Verification',
                              };
                              setDocuments((prev) => [...prev, newDoc]);
                              setFileName('');
                            }, 850);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* List of provided documents */}
                {documents.length > 0 && (
                  <div className="space-y-2 mt-3 animate-in fade-in duration-200">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      Provided Documents ({documents.length})
                    </label>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-gray-50 border border-gray-150 p-2 rounded-xl text-xs text-left"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#EE5E36]" />
                            <div>
                              <p className="font-extrabold text-[#0B2545] truncate max-w-[150px]">
                                {doc.name}
                              </p>
                              <p className="text-[8px] text-gray-400">
                                {doc.type} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[7.5px] font-black uppercase bg-yellow-50 text-yellow-600 border border-yellow-250 px-1.5 py-0.5 rounded-full select-none">
                              {doc.status}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setDocuments(documents.filter((_, dIdx) => dIdx !== idx))
                              }
                              className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Bank details */}
            {step === 3 && (
              <div className="space-y-3.5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Bank Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Building2 className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India"
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-xl text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Branch Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      placeholder="e.g. MG Road, Bangalore"
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-xl text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 1234567890"
                      required
                      className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-xl text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      placeholder="e.g. SBIN0001234"
                      required
                      className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-xl text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-xs font-extrabold uppercase tracking-wider rounded-xl cursor-pointer transition-colors text-[#0B2545]"
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
    </div>
  );
}
