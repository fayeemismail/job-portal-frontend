export interface WorkerInfo {
  name: string;
  role: string;
  avatarInitials: string;
  rating: number;
}

export interface TimelineStep {
  title: string;
  date: string;
  description: string;
  done: boolean;
}

export interface OrderItem {
  id: string;
  serviceName: string;
  category: string;
  imageUrl: string;
  status:
    | 'pending'
    | 'assigned'
    | 'accepted'
    | 'on-the-way'
    | 'in-progress'
    | 'completed'
    | 'cash-collected'
    | 'closed'
    | 'cancelled';
  price: number;
  paymentMethod: string;
  date: string;
  timeSlot: string;
  address: string;
  worker: WorkerInfo | null;
  createdDate: string;
  timeline: TimelineStep[];
}

export const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'ORD-8947A',
    serviceName: 'Deep Home Cleaning',
    category: 'Cleaning',
    imageUrl: '/service-cleaning.png',
    status: 'completed',
    price: 149.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'July 10, 2026',
    timeSlot: '09:00 AM - 12:00 PM',
    address: '123 Main St, Apt 2C, New York, NY 10001',
    worker: {
      name: 'Marcus Vance',
      role: 'Cleaning Expert',
      avatarInitials: 'MV',
      rating: 4.9,
    },
    createdDate: 'July 09, 2026, 02:30 PM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'July 09, 2026, 02:30 PM',
        description: 'Your booking has been received and confirmed.',
        done: true,
      },
      {
        title: 'Professional Assigned',
        date: 'July 09, 2026, 04:15 PM',
        description: 'Marcus Vance has been assigned to your order.',
        done: true,
      },
      {
        title: 'Service Completed',
        date: 'July 10, 2026, 11:45 AM',
        description: 'The deep cleaning has been successfully completed.',
        done: true,
      },
    ],
  },
  {
    id: 'ORD-9021B',
    serviceName: 'Kitchen Deep Cleaning',
    category: 'Cleaning',
    imageUrl: '/service-cleaning.png',
    status: 'in-progress',
    price: 89.0,
    paymentMethod: 'Cash on Delivery (Enterprise)',
    date: 'July 12, 2026',
    timeSlot: '02:00 PM - 05:00 PM',
    address: '123 Main St, Apt 2C, New York, NY 10001',
    worker: {
      name: 'Jane Miller',
      role: 'Kitchen Specialist',
      avatarInitials: 'JM',
      rating: 4.8,
    },
    createdDate: 'July 11, 2026, 10:00 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'July 11, 2026, 10:00 AM',
        description: 'Your kitchen cleaning booking is confirmed.',
        done: true,
      },
      {
        title: 'Professional Dispatched',
        date: 'July 12, 2026, 01:45 PM',
        description: 'Jane Miller is on her way to your location.',
        done: true,
      },
      {
        title: 'Work In Progress',
        date: 'July 12, 2026, 02:15 PM',
        description: 'Kitchen cleaning is currently underway.',
        done: true,
      },
      {
        title: 'Service Completed',
        date: '--',
        description: 'Pending work completion check.',
        done: false,
      },
    ],
  },
  {
    id: 'ORD-7742C',
    serviceName: 'AC Unit Servicing',
    category: 'Repair',
    imageUrl: '/service-electrical.png',
    status: 'pending',
    price: 120.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'July 15, 2026',
    timeSlot: '11:00 AM - 02:00 PM',
    address: '123 Main St, Apt 2C, New York, NY 10001',
    worker: null,
    createdDate: 'July 13, 2026, 08:45 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'July 13, 2026, 08:45 AM',
        description: 'Your request is in our system. Awaiting expert allocation.',
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
  },
  {
    id: 'ORD-6120D',
    serviceName: 'Bathroom Disinfection',
    category: 'Cleaning',
    imageUrl: '/service-plumbing.png',
    status: 'cancelled',
    price: 60.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'June 28, 2026',
    timeSlot: '09:00 AM - 12:00 PM',
    address: '456 Broadway, Suite 4B, New York, NY 10013',
    worker: null,
    createdDate: 'June 27, 2026, 11:30 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'June 27, 2026, 11:30 AM',
        description: 'Your booking has been received.',
        done: true,
      },
      {
        title: 'Booking Cancelled',
        date: 'June 27, 2026, 03:00 PM',
        description: 'Cancelled by customer.',
        done: true,
      },
    ],
  },
  {
    id: 'ORD-1111E',
    serviceName: 'Sofa Shampooing & Sanitization',
    category: 'Cleaning',
    imageUrl: '/service-cleaning.png',
    status: 'pending',
    price: 75.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'July 15, 2026',
    timeSlot: '02:00 PM - 05:00 PM',
    address: '123 E 45th St, New York, NY 10017',
    worker: null,
    createdDate: 'July 14, 2026, 09:00 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'July 14, 2026, 09:00 AM',
        description: 'Your booking has been received and confirmed.',
        done: true,
      },
      {
        title: 'Professional Assigned',
        date: '--',
        description: 'Pending expert assignment.',
        done: false,
      },
    ],
  },
  {
    id: 'ORD-2222F',
    serviceName: 'Sink Leakage Fixing',
    category: 'Plumbing',
    imageUrl: '/service-plumbing.png',
    status: 'completed',
    price: 50.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'July 01, 2026',
    timeSlot: '10:00 AM - 01:00 PM',
    address: '789 Madison Ave, New York, NY 10021',
    worker: null,
    createdDate: 'June 30, 2026, 02:00 PM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'June 30, 2026, 02:00 PM',
        description: 'Booking received.',
        done: true,
      },
      {
        title: 'Service Completed',
        date: 'July 01, 2026, 12:30 PM',
        description: 'Service completed successfully.',
        done: true,
      },
    ],
  },
  {
    id: 'ORD-3333G',
    serviceName: 'Light Switch Repair',
    category: 'Repair',
    imageUrl: '/service-electrical.png',
    status: 'in-progress',
    price: 45.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'July 06, 2026',
    timeSlot: '01:00 PM - 04:00 PM',
    address: '567 Park Ave, Apt 10A, New York, NY 10021',
    worker: null,
    createdDate: 'July 05, 2026, 10:15 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'July 05, 2026, 10:15 AM',
        description: 'Booking confirmed.',
        done: true,
      },
      {
        title: 'In Progress',
        date: 'July 06, 2026, 01:15 PM',
        description: 'Technician is resolving the switch wiring issues.',
        done: true,
      },
    ],
  },
  {
    id: 'ORD-4444H',
    serviceName: 'Wooden Shelf Fitting',
    category: 'Carpentry',
    imageUrl: '/service-carpentry.png',
    status: 'completed',
    price: 85.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'June 25, 2026',
    timeSlot: '09:00 AM - 12:00 PM',
    address: '12 Wall St, New York, NY 10005',
    worker: null,
    createdDate: 'June 24, 2026, 08:30 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'June 24, 2026, 08:30 AM',
        description: 'Booking details loaded.',
        done: true,
      },
      {
        title: 'Service Completed',
        date: 'June 25, 2026, 11:00 AM',
        description: 'Shelves fitted and polished.',
        done: true,
      },
    ],
  },
  {
    id: 'ORD-5555I',
    serviceName: 'Living Room Painting',
    category: 'Painting',
    imageUrl: '/service-painting.png',
    status: 'pending',
    price: 150.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'July 18, 2026',
    timeSlot: '08:00 AM - 12:00 PM',
    address: '890 Fifth Ave, New York, NY 10021',
    worker: null,
    createdDate: 'July 05, 2026, 04:20 PM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'July 05, 2026, 04:20 PM',
        description: 'Your request is in our system. Awaiting allocation.',
        done: true,
      },
    ],
  },
  {
    id: 'ORD-6666J',
    serviceName: 'AC Filter Cleaning',
    category: 'Repair',
    imageUrl: '/service-electrical.png',
    status: 'cancelled',
    price: 40.0,
    paymentMethod: 'Cash on Delivery (Conventional)',
    date: 'June 10, 2026',
    timeSlot: '03:00 PM - 06:00 PM',
    address: '456 Lexington Ave, New York, NY 10017',
    worker: null,
    createdDate: 'June 09, 2026, 11:00 AM',
    timeline: [
      {
        title: 'Booking Placed',
        date: 'June 09, 2026, 11:00 AM',
        description: 'Booking received.',
        done: true,
      },
      {
        title: 'Booking Cancelled',
        date: 'June 09, 2026, 01:00 PM',
        description: 'Cancelled due to user schedule conflict.',
        done: true,
      },
    ],
  },
];

export const ORDERS_PAGE_COPY = {
  title: 'My Bookings & Orders',
  subtitle: 'Track active bookings, view invoices, or schedule modifications',
  searchPlaceholder: 'Search bookings by service name...',
  filterAll: 'All Bookings',
  filterActive: 'Active',
  filterCompleted: 'Completed',
  filterCancelled: 'Cancelled',
  orderIdLabel: 'Order ID:',
  dateLabel: 'Scheduled Date:',
  timeLabel: 'Scheduled Time:',
  priceLabel: 'Total Price:',
  paymentLabel: 'Payment Method:',
  addressLabel: 'Service Address:',
  workerLabel: 'Assigned Expert:',
  workerUnassigned: 'Awaiting expert assignment',
  trackTimelineLabel: 'Booking Timeline',
  closeBtn: 'Close Details',
  viewDetailsBtn: 'View Full Details',
  trackOrderBtn: 'Track Service',
  noOrdersMsg: 'No bookings found matching the criteria.',
  dateCardLabel: 'Date',
  timeCardLabel: 'Time Slot',
  priceCardLabel: 'Price',
  // ODP specific copies
  bookingDetailsTitle: 'Booking Details',
  backToBookingsBtn: 'Back to Bookings',
  bookingNotFoundTitle: 'Booking Not Found',
  bookingNotFoundSubtitle: 'The order reference you are looking for does not exist or has expired.',
  scheduledDateLabel: 'Scheduled Date',
  timeWindowLabel: 'Time Window',
  serviceDestinationLabel: 'Service Destination',
  paymentModeLabel: 'Payment Mode',
  receiptBreakdownTitle: 'Receipt Breakdown',
  baseBookingRateLabel: 'Base Booking Rate',
  fixedServiceFeeLabel: 'Fixed service fee',
  taxesLabel: 'Taxes (8%)',
  finalTotalLabel: 'Final Total',
  bookingActionsTitle: 'Booking Actions',
  invoicePdfBtn: 'Invoice PDF',
  rescheduleBtn: 'Reschedule',
  cancelBookingBtn: 'Cancel Booking',
  contactDispatchBtn: 'Contact Dispatch',
  confirmCancelPrompt: 'Are you sure you want to cancel this booking?',
  toastCancelSuccess: 'Booking cancelled successfully.',
  toastDownloadInvoice: 'Receipt download started.',
  toastRescheduleSent: 'Reschedule request sent to support.',
};

export const BILLING_CONFIG = {
  flatServiceFee: 7.5,
  taxRate: 0.08,
  dispatchTelHref: 'tel:+15550192834',
};

export const ORDER_STATUS_STYLES: Record<OrderItem['status'], string> = {
  pending: 'bg-gray-50/50 text-[#0B2545]/70 border border-[#0B2545]/10',
  assigned: 'bg-purple-50/40 text-purple-700 border border-purple-200/50',
  accepted: 'bg-blue-50/40 text-blue-700 border border-blue-200/50',
  'on-the-way': 'bg-amber-50/40 text-amber-700 border border-amber-200/50',
  'in-progress': 'bg-[#FFF4F0]/30 text-[#EE5E36] border border-[#EE5E36]/20',
  completed: 'bg-green-50/30 text-green-600 border border-green-200/60',
  'cash-collected': 'bg-emerald-50/40 text-emerald-700 border border-emerald-200/50',
  closed: 'bg-slate-50/50 text-slate-600 border border-slate-200',
  cancelled: 'bg-red-50/30 text-red-500 border border-red-200/60',
};
