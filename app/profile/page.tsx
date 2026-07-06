'use client';

import { useState } from 'react';
import { DEFAULT_ADDRESSES } from '@/components/services/constants';
import { DEFAULT_PROFILE, PROFILE_DASHBOARD_COPY } from '@/components/profile/constants';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileInfoTab } from '@/components/profile/ProfileInfoTab';
import { AddressesTab } from '@/components/profile/AddressesTab';
import { FeedbackToast } from '@/components/profile/FeedbackToast';

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
  const [profileName, setProfileName] = useState(DEFAULT_PROFILE.name);
  const [profileEmail, setProfileEmail] = useState(DEFAULT_PROFILE.email);
  const [profilePhone, setProfilePhone] = useState(DEFAULT_PROFILE.phone);
  const [profileInitials, setProfileInitials] = useState(DEFAULT_PROFILE.initials);
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
    triggerFeedback(PROFILE_DASHBOARD_COPY.feedbackProfileUpdated);
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

    triggerFeedback(PROFILE_DASHBOARD_COPY.feedbackAddressAdded);
  };

  const handleStartEditAddress = (addr: AddressItem) => {
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
    triggerFeedback(PROFILE_DASHBOARD_COPY.feedbackAddressUpdated);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    if (editingAddressId === id) {
      setEditingAddressId(null);
    }
    triggerFeedback(PROFILE_DASHBOARD_COPY.feedbackAddressDeleted);
  };

  const handleTabChange = () => {
    setEditingAddressId(null);
    setShowAddForm(false);
    setIsEditingProfile(false);
  };

  return (
    <div className="bg-white min-h-screen py-16 font-sans text-[#0B2545]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Success Feedback */}
        <FeedbackToast feedbackMsg={feedbackMsg} />

        <div className="border-b border-[#EE5E36]/10 pb-6 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight border-none">
            {PROFILE_DASHBOARD_COPY.dashboardTitle}
          </h1>
          <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-wider">
            {PROFILE_DASHBOARD_COPY.dashboardSubtitle}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Sidebar */}
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profileName={profileName}
            profileEmail={profileEmail}
            profileInitials={profileInitials}
            onTabChange={handleTabChange}
          />

          {/* Right Column Content Area */}
          <div className="lg:col-span-8">
            {/* PROFILE DETAILS TAB */}
            {activeTab === 'profile' && (
              <ProfileInfoTab
                profileName={profileName}
                profileEmail={profileEmail}
                profilePhone={profilePhone}
                isEditingProfile={isEditingProfile}
                setIsEditingProfile={setIsEditingProfile}
                editName={editName}
                setEditName={setEditName}
                editEmail={editEmail}
                setEditEmail={setEditEmail}
                editPhone={editPhone}
                setEditPhone={setEditPhone}
                onStartEditProfile={handleStartEditProfile}
                onSaveProfile={handleSaveProfile}
              />
            )}

            {/* MY ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <AddressesTab
                addresses={addresses}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
                newLabel={newLabel}
                setNewLabel={setNewLabel}
                newStreet={newStreet}
                setNewStreet={setNewStreet}
                newCity={newCity}
                setNewCity={setNewCity}
                newState={newState}
                setNewState={setNewState}
                newZip={newZip}
                setNewZip={setNewZip}
                onAddAddress={handleAddAddress}
                editingAddressId={editingAddressId}
                setEditingAddressId={setEditingAddressId}
                editLabel={editLabel}
                setEditLabel={setEditLabel}
                editStreet={editStreet}
                setEditStreet={setEditStreet}
                editCity={editCity}
                setEditCity={setEditCity}
                editStateValue={editStateValue}
                setEditStateValue={setEditStateValue}
                editZip={editZip}
                setEditZip={setEditZip}
                onStartEditAddress={handleStartEditAddress}
                onSaveEditAddress={handleSaveEditAddress}
                onDeleteAddress={handleDeleteAddress}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
