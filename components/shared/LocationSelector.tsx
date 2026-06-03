'use client';

import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { suggestedLocations } from '@/lib/data';
import { locationCookie } from '@/utils/location-cookie';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
}

export function LocationSelector({
  onLocationSelect,
}: LocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState('');

  const selectLocation = (location: string) => {
    setSelectedLocation(location);

    // Save location in cookie
    locationCookie.set(location);

    setTimeout(() => {
      onLocationSelect(location);
    }, 300);
  };

  const handleLocationClick = (location: string) => {
    selectLocation(location);
  };

  const handleCurrentLocation = () => {
    selectLocation('Current Location');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#FFF8E7] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#D4AF37] to-[#FFD700] rounded-full mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </div>

          <h1 className="mb-3 text-[#6e6e6e]">
            Select Your Location
          </h1>

          <p className="text-[#6e6e6e]">
            Choose your preferred location to find the best job
            opportunities near you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="p-6">
            <h3 className="mb-4 text-[#6e6e6e]">
              Popular Locations
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {suggestedLocations.map((location) => {
                const locationString = `${location.city}, ${location.state}`;

                const isSelected =
                  selectedLocation === locationString;

                return (
                  <button
                    key={locationString}
                    onClick={() =>
                      handleLocationClick(locationString)
                    }
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-linear-to-r from-[#D4AF37] to-[#FFD700] border-[#D4AF37] text-white'
                        : 'bg-white border-border hover:border-[#D4AF37] hover:bg-[#FFF8E7]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-white/20'
                          : 'bg-[#FFF8E7]'
                      }`}
                    >
                      <MapPin
                        className={`w-5 h-5 ${
                          isSelected
                            ? 'text-white'
                            : 'text-[#D4AF37]'
                        }`}
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <div
                        className={`font-medium ${
                          isSelected
                            ? 'text-white'
                            : 'text-[#6e6e6e]'
                        }`}
                      >
                        {location.city}
                      </div>

                      <div
                        className={`text-sm ${
                          isSelected
                            ? 'text-white/80'
                            : 'text-[#6e6e6e]'
                        }`}
                      >
                        {location.state}, {location.country}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border p-6">
            <button
              onClick={handleCurrentLocation}
              className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                selectedLocation === 'Current Location'
                  ? 'bg-linear-to-r from-[#D4AF37] to-[#FFD700] border-[#D4AF37] text-white'
                  : 'bg-linear-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#B8860B] hover:to-[#DAA520] text-white border-[#D4AF37]'
              }`}
            >
              <Navigation className="w-5 h-5" />
              <span>Use Current Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}