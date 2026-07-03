'use client';

import { useState } from 'react';
import { LocationSelector } from '@/components/shared/LocationSelector';
import { FilterSidebar } from '@/components/shared/FilterSidebar';
import { StatsBar } from '@/components/home/StatsBar';
import { JobList } from '@/components/home/JobList';
import { mockJobs } from '@/lib/data';
import { FilterOptions } from '@/types';
import { locationCookie } from '@/utils/location-cookie';
import { Hero } from './Hero';

interface HomeProps {
  initialLocation: string | null;
}

export default function Home({ initialLocation }: HomeProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(initialLocation);
  const [searchQuery] = useState('');

  const jobs = mockJobs.map((job) => ({
    ...job,
    location: selectedLocation || job.location,
  }));

  const handleChangeLocation = () => {
    locationCookie.remove();
    setSelectedLocation(null);
  };

  if (!selectedLocation) {
    return <LocationSelector onLocationSelect={setSelectedLocation} />;
  }

  return (
    <main className="flex-grow bg-linear-to-br from-white via-[#FAFAFA] to-white">
      {/* Landing Page Hero Section */}
      <Hero selectedLocation={selectedLocation} onChangeLocation={handleChangeLocation} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <StatsBar />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
          <div className="lg:col-span-1">
            <FilterSidebar onFilterChange={(filters: FilterOptions) => console.log(filters)} />
          </div>
          <JobList jobs={jobs} searchQuery={searchQuery} />
        </div>
      </div>
    </main>
  );
}
