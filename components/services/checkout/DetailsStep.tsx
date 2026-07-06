'use client';

import { AlignLeft, MapPin, Plus, X } from 'lucide-react';
import { BOOKING_PAGE_COPY } from '../constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

interface DetailsStepProps {
  requirementText: string;
  setRequirementText: (text: string) => void;
  addresses: AddressItem[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  showAddressForm: boolean;
  setShowAddressForm: (show: boolean) => void;
  newLabel: string;
  setNewLabel: (text: string) => void;
  newStreet: string;
  setNewStreet: (text: string) => void;
  newCity: string;
  setNewCity: (text: string) => void;
  newState: string;
  setNewState: (text: string) => void;
  newZip: string;
  setNewZip: (text: string) => void;
  onAddAddress: (e: React.FormEvent) => void;
}

export function DetailsStep({
  requirementText,
  setRequirementText,
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  showAddressForm,
  setShowAddressForm,
  newLabel,
  setNewLabel,
  newStreet,
  setNewStreet,
  newCity,
  setNewCity,
  newState,
  setNewState,
  newZip,
  setNewZip,
  onAddAddress,
}: DetailsStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Requirement Details card */}
      <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
          <AlignLeft className="w-4.5 h-4.5 text-[#EE5E36]" />
          <span>{BOOKING_PAGE_COPY.requirementsLabel}</span>
        </h2>
        <div className="space-y-4 mt-6">
          <div>
            <label className="text-[11px] font-extrabold text-gray-400 tracking-wider uppercase block mb-2">
              {BOOKING_PAGE_COPY.describeRequirementsSub}
            </label>
            <textarea
              rows={4}
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              placeholder={BOOKING_PAGE_COPY.requirementsPlaceholder}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-350 resize-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Address Selection Panel */}
      <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-[#0B2545] flex items-center gap-2.5 uppercase tracking-wider">
            <MapPin className="w-4.5 h-4.5 text-[#EE5E36]" />
            <span>{BOOKING_PAGE_COPY.chooseAddressLabel}</span>
          </h2>
          <button
            type="button"
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#EE5E36] uppercase tracking-wider hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            {BOOKING_PAGE_COPY.addNewAddressLabel}
          </button>
        </div>

        {/* Saved addresses cards list */}
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

      {/* Dynamic Add/Create Address Form panel */}
      {showAddressForm && (
        <form
          onSubmit={onAddAddress}
          className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
            <h3 className="text-xs font-extrabold text-[#0B2545] uppercase tracking-wider">
              {BOOKING_PAGE_COPY.createAddressTitle}
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
                {BOOKING_PAGE_COPY.addressFormLabels.type}
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
                {BOOKING_PAGE_COPY.addressFormLabels.street}
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
                {BOOKING_PAGE_COPY.addressFormLabels.city}
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
                  {BOOKING_PAGE_COPY.addressFormLabels.state}
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
                  {BOOKING_PAGE_COPY.addressFormLabels.zip}
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
            {BOOKING_PAGE_COPY.saveAddressButton}
          </button>
        </form>
      )}
    </div>
  );
}
