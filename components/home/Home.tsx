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
  const [selectedLocation, setSelectedLocation] = useState<string | null>(initialLocation);

  const handleChangeLocation = () => {
    locationCookie.remove();
    setSelectedLocation(null);
  };

  if (!selectedLocation) {
    return <LocationSelector onLocationSelect={setSelectedLocation} />;
  }

  return (
    <main className="grow bg-linear-to-br from-white via-[#FAFAFA] to-white">
      {/* Landing Page Hero Section */}
      <Hero selectedLocation={selectedLocation} onChangeLocation={handleChangeLocation} />

      {/* Popular Categories Section */}
      <Categories />

      {/* How It Works Section */}
      <HowItWorks />
    </main>
  );
}
