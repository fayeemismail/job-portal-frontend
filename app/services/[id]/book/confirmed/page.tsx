'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MOCK_SERVICES, BOOKING_DATES, BOOKING_TIME_SLOTS } from '@/components/services/constants';
import { BookingConfirmed } from '@/components/services/checkout/BookingConfirmed';
import { getLocalOrders, saveLocalOrders } from '@/utils/worker-store';
import { OrderItem } from '@/components/orders/constants';

export default function BookingConfirmedPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCreated = useRef(false);
  const [newOrderId, setNewOrderId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!service || hasCreated.current) return;
    hasCreated.current = true;

    // Generate unique order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const generatedId = `ORD-${randomNum}${randomChar}`;
    setNewOrderId(generatedId);

    const now = new Date();
    const createdDateStr = `${now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newBooking: OrderItem = {
      id: generatedId,
      serviceName: service.title,
      category: service.category,
      imageUrl: '/service-cleaning.png',
      status: 'pending',
      price: service.price,
      paymentMethod: 'Cash on Service / Pay Later (Conventional)',
      date: `${activeDate.day}, July ${activeDate.date}, 2026`,
      timeSlot: activeTime,
      address: `${addressStreet}, ${addressCityStateZip}`,
      worker: null,
      createdDate: createdDateStr,
      timeline: [
        {
          title: 'Booking Placed',
          date: createdDateStr,
          description: 'Your booking has been received and is pending assignment.',
          done: true,
        },
        {
          title: 'Professional Assigned',
          date: '--',
          description: 'Pending expert assignment.',
          done: false,
        },
        {
          title: 'Service Completed',
          date: '--',
          description: 'Pending service work.',
          done: false,
        },
      ],
    };

    const currentOrders = getLocalOrders();
    // Prepend so it shows up first in the user list
    const updatedOrders = [newBooking, ...currentOrders];
    saveLocalOrders(updatedOrders);
  }, [service, activeDate, activeTime, addressStreet, addressCityStateZip]);

  const handleFinishBooking = () => {
    router.push('/services');
  };

  const handleViewOrder = () => {
    if (newOrderId) {
      router.push(`/orders/${newOrderId}`);
    } else {
      router.push('/orders');
    }
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
