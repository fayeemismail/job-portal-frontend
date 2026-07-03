'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { LocationSelector } from '@/components/shared/LocationSelector';
import { FilterSidebar } from '@/components/shared/FilterSidebar';
import { StatsBar } from '@/components/home/StatsBar';
import { JobList } from '@/components/home/JobList';
import { mockJobs } from '@/lib/data';
import { FilterOptions } from '@/types';
import { locationCookie } from '@/utils/location-cookie';

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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-2">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-[#EE5E36]" />
          <span className="text-gray-600">
            Showing service providers in{' '}
            <span className="text-gray-900 font-semibold">{selectedLocation}</span>
          </span>
          <button
            onClick={handleChangeLocation}
            className="ml-2 text-sm text-[#EE5E36] font-semibold hover:underline"
          >
            Change
          </button>
        </div>

        <StatsBar />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSidebar onFilterChange={(filters: FilterOptions) => console.log(filters)} />
          </div>
          <JobList jobs={jobs} searchQuery={searchQuery} />
        </div>
      </div>
    </main>
  );
}
