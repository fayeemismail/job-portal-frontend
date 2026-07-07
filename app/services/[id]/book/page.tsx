'use client';

import { useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import {
  MOCK_SERVICES,
  BOOKING_DATES,
  BOOKING_TIME_SLOTS,
  DEFAULT_ADDRESSES,
} from '@/components/services/constants';
import { CheckoutHeader } from '@/components/services/checkout/CheckoutHeader';
import { ScheduleStep } from '@/components/services/checkout/ScheduleStep';
import { DetailsStep } from '@/components/services/checkout/DetailsStep';
import { PaymentStep } from '@/components/services/checkout/PaymentStep';
import { CheckoutSummary } from '@/components/services/checkout/CheckoutSummary';

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

  // Stepper state: 1 = Date & Time, 2 = Details, 3 = Payment & Confirmation
  const [step, setStep] = useState(1);

  // Selection states
  const [selectedDateIdx, setSelectedDateIdx] = useState<number | null>(null);
  const [selectedTimeIdx, setSelectedTimeIdx] = useState<number | null>(null);
  const [requirementText, setRequirementText] = useState('');

  // Address states
  const [addresses, setAddresses] = useState<AddressItem[]>(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');

  // Address creation form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

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

    // Reset Address form inputs
    setNewLabel('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');
    setShowAddressForm(false);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleProceedStep2 = () => {
    if (selectedDateIdx !== null && selectedTimeIdx !== null) {
      setStep(2);
    }
  };

  const handleProceedStep3 = () => {
    if (selectedAddressId) {
      setStep(3);
    }
  };

  const handleFinalConfirm = () => {
    if (selectedDateIdx !== null && selectedTimeIdx !== null && selectedAddressId) {
      const params = new URLSearchParams({
        dateIdx: selectedDateIdx.toString(),
        timeIdx: selectedTimeIdx.toString(),
        addressLabel: activeAddress?.label || '',
        addressStreet: activeAddress?.street || '',
        addressCityStateZip: activeAddress?.cityStateZip || '',
        note: requirementText,
      });
      router.push(`/services/${id}/book/confirmed?${params.toString()}`);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 font-sans text-[#0B2545]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Header */}
        <CheckoutHeader
          step={step}
          serviceTitle={service.title}
          serviceId={service.id}
          onPrevStep={handlePrevStep}
        />

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Forms Stack) */}
          <div className="lg:col-span-7">
            {step === 1 && (
              <ScheduleStep
                selectedDateIdx={selectedDateIdx}
                setSelectedDateIdx={setSelectedDateIdx}
                selectedTimeIdx={selectedTimeIdx}
                setSelectedTimeIdx={setSelectedTimeIdx}
              />
            )}

            {step === 2 && (
              <DetailsStep
                requirementText={requirementText}
                setRequirementText={setRequirementText}
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
                showAddressForm={showAddressForm}
                setShowAddressForm={setShowAddressForm}
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
              />
            )}

            {step === 3 && (
              <PaymentStep
                activeDate={activeDate}
                activeTime={activeTime}
                activeAddress={activeAddress}
                requirementText={requirementText}
              />
            )}
          </div>

          {/* Right Column (Pricing rates, select summaries, and Proceed triggers) */}
          <CheckoutSummary
            step={step}
            selectedDateIdx={selectedDateIdx}
            selectedTimeIdx={selectedTimeIdx}
            selectedAddressId={selectedAddressId}
            activeDate={activeDate}
            activeTime={activeTime}
            activeAddress={activeAddress}
            servicePrice={service.price}
            onProceedStep2={handleProceedStep2}
            onProceedStep3={handleProceedStep3}
            onFinalConfirm={handleFinalConfirm}
          />
        </div>
      </div>
    </div>
  );
}
