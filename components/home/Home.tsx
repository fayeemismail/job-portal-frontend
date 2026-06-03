"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { LocationSelector } from "@/components/shared/LocationSelector";
import { Header } from "../layout/Header";
import { FilterSidebar } from "@/components/shared/FilterSidebar";
import { StatsBar } from "@/components/home/StatsBar";
import { JobList } from "@/components/home/JobList";
import { mockJobs } from "@/lib/data";
import { FilterOptions } from "@/types";
import { locationCookie } from "@/utils/location-cookie";

interface HomeProps {
  initialLocation: string | null;
}

export default function Home({ initialLocation }: HomeProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    initialLocation,
  );

  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen bg-linear-to-br from-white via-[#FAFAFA] to-white">
      <Header location={selectedLocation} onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-gray-600">
            Showing jobs in{" "}
            <span className="text-gray-900 font-medium">
              {selectedLocation}
            </span>
          </span>
          <button
            onClick={handleChangeLocation}
            className="ml-2 text-sm text-[#D4AF37] hover:underline"
          >
            Change
          </button>
        </div>

        <StatsBar />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSidebar
              onFilterChange={(filters: FilterOptions) => console.log(filters)}
            />
          </div>
          <JobList jobs={jobs} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}