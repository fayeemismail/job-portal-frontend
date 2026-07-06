'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  AlignLeft,
  Plus,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import {
  MOCK_SERVICES,
  BOOKING_PAGE_COPY,
  BOOKING_DATES,
  BOOKING_TIME_SLOTS,
  PRICING_BREAKDOWN_CONFIGS,
} from '@/components/services/constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

export default function BookingFlowPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  // Retrieve service
  const service = MOCK_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  // Three-step paginated wizard: 1 = Date & Time, 2 = Requirements & Address, 3 = Payment & Confirmation
  const [step, setStep] = useState(1);

  // Selection states
  const [selectedDateIdx, setSelectedDateIdx] = useState<number | null>(null);
  const [selectedTimeIdx, setSelectedTimeIdx] = useState<number | null>(null);
  const [requirementText, setRequirementText] = useState('');

  // Address list states
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 'addr-1',
      label: 'Home',
      street: '123 Broadway St, Apt 4B',
      cityStateZip: 'New York, NY 10001',
    },
    {
      id: 'addr-2',
      label: 'Office',
      street: '450 Lexington Ave, Floor 12',
      cityStateZip: 'New York, NY 10017',
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');

  // Address creation form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Confirmation state
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Computed variables
  const activeDate = selectedDateIdx !== null ? BOOKING_DATES[selectedDateIdx] : null;
  const activeTime = selectedTimeIdx !== null ? BOOKING_TIME_SLOTS[selectedTimeIdx] : null;
  const activeAddress = addresses.find((addr) => addr.id === selectedAddressId);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newStreet || !newCity || !newState || !newZip) return;

    const newAddr: AddressItem = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      street: newStreet,
      cityStateZip: `${newCity}, ${newState} ${newZip}`,
    };

    setAddresses([...addresses, newAddr]);
    setSelectedAddressId(newAddr.id);

    // Reset Address form
    setNewLabel('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');
    setShowAddressForm(false);
  };

  const handleProceedToStep2 = () => {
    if (selectedDateIdx !== null && selectedTimeIdx !== null) {
      setStep(2);
    }
  };

  const handleProceedToStep3 = () => {
    if (selectedAddressId) {
      setStep(3);
    }
  };

  const handleFinalConfirm = () => {
    if (selectedDateIdx !== null && selectedTimeIdx !== null && selectedAddressId) {
      setShowConfirmation(true);
    }
  };

  const handleFinishBooking = () => {
    setShowConfirmation(false);
    router.push(`/services/${id}`);
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 font-sans text-[#0B2545]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Header */}
        <div className="border-b border-[#EE5E36]/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              {step === 1 && 'Choose Date & Time'}
              {step === 2 && 'Booking Details'}
              {step === 3 && 'Payment & Confirmation'}
            </h1>
            <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase">
              Checkout for: <span className="text-[#EE5E36]">{service.title}</span>
            </p>
          </div>

          {step === 1 && (
            <Link
              href={`/services/${id}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group self-start sm:self-center"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to details
            </Link>
          )}

          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group self-start sm:self-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to schedule
            </button>
          )}

          {step === 3 && (
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545]/60 hover:text-[#EE5E36] transition-colors uppercase tracking-wider group self-start sm:self-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to requirements
            </button>
          )}
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Container */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Date Picker */}
            {step === 1 && (
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
                <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
                  <Calendar className="w-4.5 h-4.5 text-[#EE5E36]" />
                  <span>Select Date</span>
                </h2>

                <div className="flex items-center gap-2.5 mt-6">
                  {/* Left Arrow */}
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#EE5E36] hover:border-[#EE5E36]/20 transition-all cursor-pointer active:scale-90 shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Dates grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 flex-1">
                    {BOOKING_DATES.map((dateObj, idx) => {
                      const isActive = selectedDateIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDateIdx(idx);
                            setSelectedTimeIdx(null); // Reset time on date swap
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
                          <span
                            className={`text-base font-black ${isActive ? 'text-[#EE5E36]' : ''}`}
                          >
                            {dateObj.date}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Arrow */}
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#EE5E36] hover:border-[#EE5E36]/20 transition-all cursor-pointer active:scale-90 shrink-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: Time Slot Selection (Visible once Date picked) */}
            {step === 1 && selectedDateIdx !== null && (
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
                <h3 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2 uppercase tracking-wider">
                  <Clock className="w-4.5 h-4.5 text-[#EE5E36]" />
                  <span>Select Time Slot</span>
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

            {/* STEP 2: Requirement Details + Address Creation Section */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* 2.1 Requirements Description Card */}
                <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
                    <AlignLeft className="w-4.5 h-4.5 text-[#EE5E36]" />
                    <span>Requirement Details</span>
                  </h2>
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="text-[11px] font-extrabold text-gray-400 tracking-wider uppercase block mb-2">
                        Describe what you need done
                      </label>
                      <textarea
                        rows={4}
                        value={requirementText}
                        onChange={(e) => setRequirementText(e.target.value)}
                        placeholder="Please provide details (e.g. Bring extra long ladder, leaky pipeline is under the cabinet, or check toilet handle...)"
                        className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-350 resize-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2.2 Address Selection Panel */}
                <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
                      <MapPin className="w-4.5 h-4.5 text-[#EE5E36]" />
                      <span>Choose Address</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#EE5E36] uppercase tracking-wider hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add New
                    </button>
                  </div>

                  {/* Saved addresses cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#FFF4F0] border-[#EE5E36] text-[#0B2545] shadow-xs'
                              : 'bg-white border-gray-100 text-gray-500 hover:border-[#EE5E36]/25 hover:text-[#EE5E36]'
                          }`}
                        >
                          <MapPin
                            className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#EE5E36]' : 'text-gray-300'}`}
                          />
                          <div className="space-y-1">
                            <span className="text-xs font-black uppercase tracking-wider block">
                              {addr.label}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 block leading-tight">
                              {addr.street}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 block">
                              {addr.cityStateZip}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Create/Add Address Form (Toggled inline) */}
                {showAddressForm && (
                  <form
                    onSubmit={handleAddAddress}
                    className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
                      <h3 className="text-xs font-extrabold text-[#0B2545] uppercase tracking-wider">
                        Create New Address
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">
                          Label (e.g. Home, Work, Cabin)
                        </label>
                        <input
                          type="text"
                          required
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          placeholder="Home"
                          className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          placeholder="123 Main St, Apt 2C"
                          className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="New York"
                          className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            placeholder="NY"
                            className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            required
                            value={newZip}
                            onChange={(e) => setNewZip(e.target.value)}
                            placeholder="10001"
                            className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0B2545] hover:bg-[#1c406c] text-white text-xs font-extrabold tracking-wider uppercase py-3 rounded-xl transition-all cursor-pointer mt-2"
                    >
                      Save Address
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* STEP 3: Booking Review & Payment Selection */}
            {step === 3 && activeDate && activeTime && activeAddress && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* 3.1 Order Review Summary Card */}
                <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#EE5E36]" />
                    <span>Review Booking Details</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 bg-white p-5 rounded-2xl border border-gray-100/70 text-xs font-semibold">
                    <div className="space-y-3">
                      <div>
                        <span className="font-extrabold uppercase text-[9px] tracking-wider text-gray-400 block mb-1">
                          Schedule Selected
                        </span>
                        <div className="flex items-center gap-1.5 text-[#0B2545] font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#EE5E36]" />
                          <span>
                            {activeDate.day}, {activeDate.date} Oct 2026
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#0B2545] font-bold mt-1">
                          <Clock className="w-3.5 h-3.5 text-[#EE5E36]" />
                          <span>{activeTime}</span>
                        </div>
                      </div>

                      {requirementText.trim() && (
                        <div>
                          <span className="font-extrabold uppercase text-[9px] tracking-wider text-gray-400 block mb-1">
                            Your Instructions
                          </span>
                          <p className="text-gray-500 font-bold italic border-l-2 border-[#EE5E36]/30 pl-2 leading-relaxed">
                            &ldquo;{requirementText}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="font-extrabold uppercase text-[9px] tracking-wider text-gray-400 block mb-1">
                          Delivery Address
                        </span>
                        <div className="flex items-start gap-1.5 text-[#0B2545] font-bold">
                          <MapPin className="w-3.5 h-3.5 text-[#EE5E36] mt-0.5 shrink-0" />
                          <div>
                            <span className="font-extrabold text-[10px] text-[#EE5E36] block">
                              {activeAddress.label} Address
                            </span>
                            <span>{activeAddress.street}</span>
                            <span className="block text-[10px] text-gray-400 font-medium">
                              {activeAddress.cityStateZip}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3.2 Payment Method Selection Box */}
                <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
                    <Coins className="w-4.5 h-4.5 text-[#EE5E36]" />
                    <span>Choose Payment Method</span>
                  </h2>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full text-left p-5 rounded-2xl border border-[#EE5E36] bg-[#FFF4F0] flex items-start gap-4 shadow-3xs cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EE5E36]/10 flex items-center justify-center text-[#EE5E36] shrink-0">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-wider text-[#0B2545] block">
                          Cash on Delivery (COD) / Pay After Service
                        </span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed block">
                          Pay directly to our certified professional in cash, card, or mobile
                          transfer once the service is fully completed to your satisfaction.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar Summaries & Pricing breakdowns) */}
          <div className="lg:col-span-5">
            {selectedDateIdx === null ? (
              /* Prompt Placeholder Card */
              <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400 font-semibold text-sm">
                <Calendar className="w-8 h-8 mx-auto mb-2.5 text-gray-300" />
                Select a booking date from the calendar to view pricing details.
              </div>
            ) : (
              /* Pricing summary layout */
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
                {/* Visual selections review */}
                {activeDate && activeTime && (
                  <div className="space-y-3.5 pb-5 border-b border-[#EE5E36]/10">
                    <h3 className="text-xs font-extrabold text-[#0B2545]/55 tracking-wider uppercase">
                      Booking Summary
                    </h3>
                    <div className="flex flex-col gap-2.5 text-xs font-semibold text-[#0B2545]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#EE5E36]" />
                        <span>
                          {activeDate.day}, {activeDate.date} Oct 2026
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#EE5E36]" />
                        <span>{activeTime}</span>
                      </div>
                      {step >= 2 && activeAddress && (
                        <div className="flex items-start gap-2 pt-1.5 border-t border-[#EE5E36]/5">
                          <MapPin className="w-4 h-4 text-[#EE5E36] mt-0.5 shrink-0" />
                          <div>
                            <span className="font-extrabold uppercase text-[10px] tracking-wider block text-gray-400">
                              Address: {activeAddress.label}
                            </span>
                            <span>{activeAddress.street}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Pricing Breakdown rates table */}
                <div className="space-y-3.5">
                  <h3 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2 uppercase tracking-wider">
                    <DollarSign className="w-4.5 h-4.5 text-[#EE5E36]" />
                    <span>Pricing Breakdown</span>
                  </h3>
                  <div className="bg-white border border-[#EE5E36]/10 rounded-2xl overflow-hidden divide-y divide-gray-100 mt-6">
                    {PRICING_BREAKDOWN_CONFIGS.map((config, idx) => {
                      const ratePrice = service.price * config.multiplier;
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-3.5 px-4.5 text-xs font-semibold"
                        >
                          <span className="text-gray-400 font-bold">{config.label}</span>
                          <span className="text-[#0B2545] font-black">${ratePrice.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Stepper proceeds/action CTA buttons */}
                <div className="border-t border-[#EE5E36]/10 pt-6 mt-6">
                  {step === 1 && (
                    <button
                      type="button"
                      onClick={handleProceedToStep2}
                      disabled={selectedTimeIdx === null}
                      className={`w-full text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-2xs text-center select-none ${
                        selectedTimeIdx !== null
                          ? 'bg-[#EE5E36] hover:bg-[#d64e29] hover:shadow-xs cursor-pointer active:scale-[0.98]'
                          : 'bg-gray-300/80 cursor-not-allowed opacity-75'
                      }`}
                    >
                      {BOOKING_PAGE_COPY.proceedButton}
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleProceedToStep3}
                      disabled={!selectedAddressId}
                      className={`w-full text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-2xs text-center select-none ${
                        selectedAddressId
                          ? 'bg-[#EE5E36] hover:bg-[#d64e29] hover:shadow-xs cursor-pointer active:scale-[0.98]'
                          : 'bg-gray-300/80 cursor-not-allowed opacity-75'
                      }`}
                    >
                      Proceed to Payment
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="button"
                      onClick={handleFinalConfirm}
                      className="w-full bg-[#EE5E36] hover:bg-[#d64e29] text-white text-xs font-extrabold tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-2xs text-center select-none cursor-pointer active:scale-[0.98]"
                    >
                      Confirm & Place Booking
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking confirmation Overlay/Modal */}
      {showConfirmation && activeDate && activeTime && activeAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setShowConfirmation(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-[#FFF4F0] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EE5E36]/10">
              <CheckCircle className="w-8 h-8 text-[#EE5E36]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B2545] tracking-tight mb-2">
              {BOOKING_PAGE_COPY.bookingConfirmedTitle}
            </h3>

            {/* Displaying final schedule summary */}
            <div className="text-sm font-semibold text-gray-500 leading-relaxed space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
                  Service:
                </span>
                <span className="text-[#0B2545] font-bold">{service.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
                  Date:
                </span>
                <span className="text-[#0B2545] font-bold">
                  {activeDate.day} {activeDate.date} Oct
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
                  Time:
                </span>
                <span className="text-[#0B2545] font-bold">{activeTime}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0 mt-0.5">
                  Address:
                </span>
                <span className="text-[#0B2545] font-bold">
                  {activeAddress.street}, {activeAddress.cityStateZip}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0">
                  Payment:
                </span>
                <span className="text-[#0B2545] font-bold">Cash on Delivery (COD)</span>
              </div>
              {requirementText.trim() && (
                <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                  <span className="font-extrabold text-[10px] tracking-wider uppercase text-gray-400 w-16 shrink-0 mt-0.5">
                    Notes:
                  </span>
                  <span className="text-[#0B2545] font-bold italic line-clamp-2">
                    &ldquo;{requirementText}&rdquo;
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleFinishBooking}
              className="w-full bg-[#0B2545] hover:bg-[#153459] text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl transition-all cursor-pointer animate-pulse"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
