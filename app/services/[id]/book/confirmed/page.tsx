'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import {
  MOCK_SERVICES,
  BOOKING_DATES,
  BOOKING_TIME_SLOTS,
} from '@/components/services/constants';
import { BookingConfirmed } from '@/components/services/checkout/BookingConfirmed';

export default function BookingConfirmedPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve service
  const service = MOCK_SERVICES.find((s) => s.id === id);

  // Retrieve booking details from search parameters
  const dateIdxStr = searchParams.get('dateIdx');
  const timeIdxStr = searchParams.get('timeIdx');
  const addressLabel = searchParams.get('addressLabel') || '';
  const addressStreet = searchParams.get('addressStreet') || '';
  const addressCityStateZip = searchParams.get('addressCityStateZip') || '';
  const note = searchParams.get('note') || '';

  const dateIdx = dateIdxStr !== null ? parseInt(dateIdxStr, 10) : null;
  const timeIdx = timeIdxStr !== null ? parseInt(timeIdxStr, 10) : null;

  // Fallbacks
  const activeDate =
    dateIdx !== null && dateIdx >= 0 && dateIdx < BOOKING_DATES.length
      ? BOOKING_DATES[dateIdx]
      : BOOKING_DATES[0];
  const activeTime =
    timeIdx !== null && timeIdx >= 0 && timeIdx < BOOKING_TIME_SLOTS.length
      ? BOOKING_TIME_SLOTS[timeIdx]
      : BOOKING_TIME_SLOTS[0];

  const handleFinishBooking = () => {
    router.push('/services');
  };

  const handleViewOrder = () => {
    router.push(`/orders/ORD-8947A`);
  };

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white font-sans text-[#0B2545] p-6">
        <h1 className="text-2xl font-extrabold mb-4">Service not found</h1>
        <button
          onClick={() => router.push('/')}
          className="btn-animate btn-animate-primary px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <BookingConfirmed
      service={service}
      activeDate={activeDate}
      activeTime={activeTime}
      addressLabel={addressLabel}
      addressStreet={addressStreet}
      addressCityStateZip={addressCityStateZip}
      note={note}
      onFinishBooking={handleFinishBooking}
      onViewOrder={handleViewOrder}
    />
  );
}
