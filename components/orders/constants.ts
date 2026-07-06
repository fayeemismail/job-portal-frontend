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
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
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
};

export const ORDER_STATUS_STYLES: Record<OrderItem['status'], string> = {
  completed: 'bg-green-50/30 text-green-600 border border-green-200/60',
  'in-progress': 'bg-[#FFF4F0]/30 text-[#EE5E36] border border-[#EE5E36]/20',
  pending: 'bg-gray-50/50 text-[#0B2545]/70 border border-[#0B2545]/10',
  cancelled: 'bg-red-50/30 text-red-500 border border-red-200/60',
};
