'use client';

import { useState } from 'react';
import { LocationSelector } from '@/components/shared/LocationSelector';
import { locationCookie } from '@/utils/location-cookie';
import { Hero } from './Hero';
import { Categories } from './Categories';
import { HowItWorks } from './HowItWorks';

interface HomeProps {
  initialLocation: string | null;
}

export default function Home({ initialLocation }: HomeProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    initialLocation || 'Select Location'
  );
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(!initialLocation);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    locationCookie.set(location);
    setIsLocationModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsLocationModalOpen(true);
  };

  return (
    <main className="grow bg-linear-to-br from-white via-[#FAFAFA] to-white">
      {/* Landing Page Hero Section */}
      <Hero selectedLocation={selectedLocation} onChangeLocation={handleOpenModal} />

      {/* Popular Categories Section */}
      <Categories />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Redesigned Brand-Themed Location Selector Modal Overlay */}
      <LocationSelector
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
      />
    </main>
  );
}
