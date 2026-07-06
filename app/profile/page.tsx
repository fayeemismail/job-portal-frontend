'use client';

import { useState } from 'react';
import {
  User,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Trash2,
  Plus,
  X,
  Save,
  CheckCircle,
  Building,
  Home,
  Map,
} from 'lucide-react';
import { DEFAULT_ADDRESSES } from '@/components/services/constants';

interface AddressItem {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
}

export default function ProfileDashboardPage() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses'>('profile');

  // User Profile States
  const [profileName, setProfileName] = useState('John Doe');
  const [profileEmail, setProfileEmail] = useState('johndoe@example.com');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 019-2834');
  const [profileInitials, setProfileInitials] = useState('JD');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile Edit Temporary states
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Address States
  const [addresses, setAddresses] = useState<AddressItem[]>(DEFAULT_ADDRESSES);

  // Add Address states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Edit Address states
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editStreet, setEditStreet] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editStateValue, setEditStateValue] = useState('');
  const [editZip, setEditZip] = useState('');

  // Success Feedback state
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3000);
  };

  // Profile functions
  const handleStartEditProfile = () => {
    setEditName(profileName);
    setEditEmail(profileEmail);
    setEditPhone(profilePhone);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || !editEmail || !editPhone) return;

    setProfileName(editName);
    setProfileEmail(editEmail);
    setProfilePhone(editPhone);

    // Compute initials from name
    const names = editName.trim().split(' ');
    const initials = names
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    setProfileInitials(initials || 'JD');

    setIsEditingProfile(false);
    triggerFeedback('Profile details updated successfully!');
  };

  // Address functions
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
    setShowAddForm(false);

    // Reset fields
    setNewLabel('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');

    triggerFeedback('New address added successfully!');
  };

  const handleStartEditAddress = (addr: AddressItem) => {
    // Parse City, State ZIP from cityStateZip string
    // e.g. "New York, NY 10001" -> City = "New York", State = "NY", ZIP = "10001"
    const parts = addr.cityStateZip.split(',');
    const city = parts[0]?.trim() || '';
    const stateZipParts = parts[1]?.trim().split(' ') || [];
    const state = stateZipParts[0] || '';
    const zip = stateZipParts.slice(1).join(' ') || '';

    setEditingAddressId(addr.id);
    setEditLabel(addr.label);
    setEditStreet(addr.street);
    setEditCity(city);
    setEditStateValue(state);
    setEditZip(zip);
    setShowAddForm(false);
  };

  const handleSaveEditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddressId || !editLabel || !editStreet || !editCity || !editStateValue || !editZip)
      return;

    setAddresses(
      addresses.map((addr) =>
        addr.id === editingAddressId
          ? {
              ...addr,
              label: editLabel,
              street: editStreet,
              cityStateZip: `${editCity}, ${editStateValue} ${editZip}`,
            }
          : addr
      )
    );

    setEditingAddressId(null);
    triggerFeedback('Address updated successfully!');
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    if (editingAddressId === id) {
      setEditingAddressId(null);
    }
    triggerFeedback('Address deleted successfully!');
  };

  return (
    <div className="bg-white min-h-screen py-16 font-sans text-[#0B2545]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Success Feedback */}
        {feedbackMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0B2545] border border-[#EE5E36]/20 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
            <CheckCircle className="w-5 h-5 text-[#EE5E36]" />
            <span className="text-xs font-bold tracking-wide">{feedbackMsg}</span>
          </div>
        )}

        <div className="border-b border-[#EE5E36]/10 pb-6 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Account Dashboard</h1>
          <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-wider">
            Manage your personal settings & addresses
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Profile Summary Card */}
            <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto rounded-full bg-[#FFF4F0] border border-[#EE5E36]/15 flex items-center justify-center text-[#EE5E36] text-2xl font-black shadow-xs">
                {profileInitials}
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
                  setEditingAddressId(null);
                  setShowAddForm(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#FFF4F0] text-[#EE5E36] shadow-3xs'
                    : 'text-[#0B2545]/60 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
                }`}
              >
                <User className="w-4.5 h-4.5" />
                <span>Profile details</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('addresses');
                  setIsEditingProfile(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-[#FFF4F0] text-[#EE5E36] shadow-3xs'
                    : 'text-[#0B2545]/60 hover:text-[#EE5E36] hover:bg-[#FFF4F0]/10'
                }`}
              >
                <MapPin className="w-4.5 h-4.5" />
                <span>My Addresses</span>
              </button>
            </div>
          </div>

          {/* Right Column Content Area */}
          <div className="lg:col-span-8">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                      Profile Information
                    </h2>
                    <p className="text-xs font-bold text-gray-400 mt-0.5">
                      Your public details and credentials
                    </p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={handleStartEditProfile}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#0B2545]/15 hover:border-[#EE5E36] hover:text-[#EE5E36] rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit Info
                    </button>
                  )}
                </div>

                {!isEditingProfile ? (
                  /* Profile details list display */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
                        Full Name
                      </span>
                      <p className="text-sm font-extrabold text-[#0B2545]">{profileName}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
                        Email Address
                      </span>
                      <div className="flex items-center gap-2 text-sm font-extrabold text-[#0B2545]">
                        <Mail className="w-4.5 h-4.5 text-[#EE5E36]/80" />
                        <span>{profileEmail}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
                        Phone Number
                      </span>
                      <div className="flex items-center gap-2 text-sm font-extrabold text-[#0B2545]">
                        <Phone className="w-4.5 h-4.5 text-[#EE5E36]/80" />
                        <span>{profilePhone}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Edit Profile details form */
                  <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                          Full Name
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
                          Email Address
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
                          Phone Number
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
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-5 py-3 border border-[#0B2545]/15 hover:bg-gray-50 text-[#0B2545]/60 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MY ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Addresses List grid cards */}
                {!showAddForm && !editingAddressId && (
                  <div className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
                      <div>
                        <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                          Saved Addresses
                        </h2>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">
                          Manage your shipping and delivery destinations
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="inline-flex items-center gap-1.5 bg-[#EE5E36] hover:bg-[#d64e29] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-3xs"
                      >
                        <Plus className="w-4 h-4" />
                        Add Address
                      </button>
                    </div>

                    {addresses.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 font-semibold text-sm">
                        <Map className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        No addresses saved yet. Add one to speed up checkout.
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
                                  onClick={() => handleStartEditAddress(addr)}
                                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#0B2545]/60 hover:text-[#EE5E36] uppercase tracking-wider cursor-pointer"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteAddress(addr.id)}
                                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-500/80 hover:text-red-600 uppercase tracking-wider ml-auto cursor-pointer"
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
                    onSubmit={handleAddAddress}
                    className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
                      <div>
                        <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                          Create New Address
                        </h2>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">
                          Add a saved location for checkouts
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
                          Label (e.g. Home, Work, Cabin)
                        </label>
                        <input
                          type="text"
                          required
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          placeholder="Home"
                          className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          placeholder="123 Main St, Apt 2C"
                          className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="New York"
                          className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            placeholder="NY"
                            className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            required
                            value={newZip}
                            onChange={(e) => setNewZip(e.target.value)}
                            placeholder="10001"
                            className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-3 text-xs font-semibold text-[#0B2545] focus:outline-none focus:border-[#EE5E36] placeholder-gray-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 bg-[#EE5E36] hover:bg-[#d64e29] text-white px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-3xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-5 py-3 border border-[#0B2545]/15 hover:bg-gray-50 text-[#0B2545]/60 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* EDIT ADDRESS FORM */}
                {editingAddressId && (
                  <form
                    onSubmit={handleSaveEditAddress}
                    className="bg-[#FFFBF9] border border-[#EE5E36]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
                      <div>
                        <h2 className="text-lg font-black tracking-tight text-[#0B2545]">
                          Edit Address
                        </h2>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">
                          Modify your saved location details
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
                          Label (e.g. Home, Work, Cabin)
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
                          Street Address
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
                          City
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
                            State
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
                            ZIP Code
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
                        className="inline-flex items-center gap-1.5 bg-[#EE5E36] hover:bg-[#d64e29] text-white px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-3xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAddressId(null)}
                        className="px-5 py-3 border border-[#0B2545]/15 hover:bg-gray-50 text-[#0B2545]/60 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
