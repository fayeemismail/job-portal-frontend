'use client';

import { useState } from 'react';
import { Plus, Map, Building, Home, Edit2, Trash2, X, Save } from 'lucide-react';
import { PROFILE_DASHBOARD_COPY } from './constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

interface AddressesTabProps {
  addresses: AddressItem[];
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  newLabel: string;
  setNewLabel: (label: string) => void;
  newStreet: string;
  setNewStreet: (street: string) => void;
  newCity: string;
  setNewCity: (city: string) => void;
  newState: string;
  setNewState: (state: string) => void;
  newZip: string;
  setNewZip: (zip: string) => void;
  onAddAddress: (e: React.FormEvent) => void;
  editingAddressId: string | null;
  setEditingAddressId: (id: string | null) => void;
  editLabel: string;
  setEditLabel: (label: string) => void;
  editStreet: string;
  setEditStreet: (street: string) => void;
  editCity: string;
  setEditCity: (city: string) => void;
  editStateValue: string;
  setEditStateValue: (state: string) => void;
  editZip: string;
  setEditZip: (zip: string) => void;
  onStartEditAddress: (addr: AddressItem) => void;
  onSaveEditAddress: (e: React.FormEvent) => void;
  onDeleteAddress: (id: string) => void;
}

export function AddressesTab({
  addresses,
  showAddForm,
  setShowAddForm,
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
  editingAddressId,
  setEditingAddressId,
  editLabel,
  setEditLabel,
  editStreet,
  setEditStreet,
  editCity,
  setEditCity,
  editStateValue,
  setEditStateValue,
  editZip,
  setEditZip,
  onStartEditAddress,
  onSaveEditAddress,
  onDeleteAddress,
}: AddressesTabProps) {
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Addresses List grid cards */}
      {!showAddForm && !editingAddressId && (
        <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
            <div>
              <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                {PROFILE_DASHBOARD_COPY.addressesTitle}
              </h2>
              <p className="text-xs font-bold text-gray-400 mt-0.5">
                {PROFILE_DASHBOARD_COPY.addressesSubtitle}
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="group relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-2 border border-[#EE5E36]/30 bg-[#FFF4F0]/30 text-[#EE5E36] hover:text-white hover:border-[#EE5E36] rounded-xl text-xs font-extrabold uppercase tracking-wider active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                {PROFILE_DASHBOARD_COPY.addAddressBtn}
              </span>
              <span className="absolute inset-0 bg-[#EE5E36] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-semibold text-sm">
              <Map className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              {PROFILE_DASHBOARD_COPY.noAddressesMsg}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => {
                const isOffice = addr.label.toLowerCase() === 'office';
                return (
                  <div
                    key={addr.id}
                    className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 hover:border-[#EE5E36]/25 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FFFBF9] border border-[#EE5E36]/10 flex items-center justify-center text-[#EE5E36] shrink-0">
                        {isOffice ? (
                          <Building className="w-4.5 h-4.5" />
                        ) : (
                          <Home className="w-4.5 h-4.5" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-black uppercase tracking-wider text-[#0B2545] block">
                          {addr.label}
                        </span>
                        <p className="text-xs font-semibold text-gray-500 leading-tight">
                          {addr.street}
                        </p>
                        <span className="text-[10px] font-bold text-gray-400 block">
                          {addr.cityStateZip}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-gray-50 pt-3">
                      <button
                        onClick={() => onStartEditAddress(addr)}
                        className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#EE5E36] hover:text-[#d64e29] uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingAddressId(addr.id)}
                        className="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-500/80 hover:text-red-600 uppercase tracking-wider ml-auto active:scale-95 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ADD NEW ADDRESS FORM */}
      {showAddForm && (
        <form
          onSubmit={onAddAddress}
          className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
            <div>
              <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                {PROFILE_DASHBOARD_COPY.createAddressTitle}
              </h2>
              <p className="text-xs font-bold text-gray-400 mt-0.5">
                {PROFILE_DASHBOARD_COPY.createAddressSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 text-gray-400 hover:text-[#0B2545] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.addressLabels.type}
              </label>
              <input
                type="text"
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder={PROFILE_DASHBOARD_COPY.addressPlaceholders.type}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.addressLabels.street}
              </label>
              <input
                type="text"
                required
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                placeholder={PROFILE_DASHBOARD_COPY.addressPlaceholders.street}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.addressLabels.city}
              </label>
              <input
                type="text"
                required
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder={PROFILE_DASHBOARD_COPY.addressPlaceholders.city}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                  {PROFILE_DASHBOARD_COPY.addressLabels.state}
                </label>
                <input
                  type="text"
                  required
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  placeholder={PROFILE_DASHBOARD_COPY.addressPlaceholders.state}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                  {PROFILE_DASHBOARD_COPY.addressLabels.zip}
                </label>
                <input
                  type="text"
                  required
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                  placeholder={PROFILE_DASHBOARD_COPY.addressPlaceholders.zip}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="btn-animate btn-animate-primary inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-3xs"
            >
              <Save className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{PROFILE_DASHBOARD_COPY.saveAddressBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-animate btn-animate-neutral px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              {PROFILE_DASHBOARD_COPY.cancelBtn}
            </button>
          </div>
        </form>
      )}

      {/* EDIT ADDRESS FORM */}
      {editingAddressId && (
        <form
          onSubmit={onSaveEditAddress}
          className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
            <div>
              <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                {PROFILE_DASHBOARD_COPY.editAddressTitle}
              </h2>
              <p className="text-xs font-bold text-gray-400 mt-0.5">
                {PROFILE_DASHBOARD_COPY.editAddressSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditingAddressId(null)}
              className="p-1 text-gray-400 hover:text-[#0B2545] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.addressLabels.type}
              </label>
              <input
                type="text"
                required
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.addressLabels.street}
              </label>
              <input
                type="text"
                required
                value={editStreet}
                onChange={(e) => setEditStreet(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                {PROFILE_DASHBOARD_COPY.addressLabels.city}
              </label>
              <input
                type="text"
                required
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                  {PROFILE_DASHBOARD_COPY.addressLabels.state}
                </label>
                <input
                  type="text"
                  required
                  value={editStateValue}
                  onChange={(e) => setEditStateValue(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                  {PROFILE_DASHBOARD_COPY.addressLabels.zip}
                </label>
                <input
                  type="text"
                  required
                  value={editZip}
                  onChange={(e) => setEditZip(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36]"
                />
              </div>
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
              onClick={() => setEditingAddressId(null)}
              className="btn-animate btn-animate-neutral px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              {PROFILE_DASHBOARD_COPY.cancelBtn}
            </button>
          </div>
        </form>
      )}

      {/* Delete Address Confirmation Modal */}
      {deletingAddressId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#0B2545]/45 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setDeletingAddressId(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center z-10 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <button
              onClick={() => setDeletingAddressId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-lg font-extrabold text-[#0B2545] tracking-tight mb-2">
              Delete Address
            </h3>
            <p className="text-xs font-semibold text-gray-500 mb-6 leading-relaxed">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeletingAddressId(null)}
                className="group relative overflow-hidden flex-1 bg-gray-50 text-[#0B2545] text-xs font-bold tracking-wider uppercase py-3 rounded-xl active:scale-95 transition-all duration-300 cursor-pointer border border-gray-200/50 hover:text-white"
              >
                <span className="relative z-10">Cancel</span>
                <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
              </button>
              <button
                onClick={() => {
                  onDeleteAddress(deletingAddressId);
                  setDeletingAddressId(null);
                }}
                className="group relative overflow-hidden flex-1 bg-red-500 text-white text-xs font-bold tracking-wider uppercase py-3 rounded-xl active:scale-95 transition-all duration-300 cursor-pointer shadow-3xs"
              >
                <span className="relative z-10">Delete</span>
                <span className="absolute inset-0 bg-[#0B2545] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 z-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
