import { Suspense } from 'react';
import { ServiceListing } from '@/components/services/ServiceListing';

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold text-gray-400">
          Loading...
        </div>
      }
    >
      <ServiceListing />
    </Suspense>
  );
}
