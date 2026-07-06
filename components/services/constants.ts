import { ServiceItem, SortOption } from './types';

export const SERVICE_CATEGORIES = [
  { id: 'cleaning', label: 'House Cleaning' },
  { id: 'plumbing', label: 'Plumbing Services' },
  { id: 'electrical', label: 'Electricity Services' },
  { id: 'carpentry', label: 'Carpentry & Woodwork' },
  { id: 'painting', label: 'Painting Services' },
];

export const SORT_OPTIONS: SortOption[] = [
  { key: 'popular', label: 'Most Popular' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating-desc', label: 'Highest Rated' },
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Premium Home Deep Cleaning',
    description:
      'Complete sanitization of kitchens, bathrooms, bedrooms, and common areas. Eco-friendly products used.',
    category: 'cleaning',
    price: 35,
    priceType: 'hourly',
    rating: 4.9,
    reviewCount: 142,
    imageUrl: '/service-cleaning.png',
    provider: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 4.95,
      completedJobs: 340,
    },
  },
  {
    id: 's2',
    title: 'Emergency Plumbing & Leak Repair',
    description:
      'Professional fixing of clogged drains, pipe leaks, faucets, and emergency water damage control.',
    category: 'plumbing',
    price: 45,
    priceType: 'hourly',
    rating: 4.8,
    reviewCount: 98,
    imageUrl: '/service-plumbing.png',
    provider: {
      name: 'Thomas Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.82,
      completedJobs: 210,
    },
  },
  {
    id: 's3',
    title: 'Ceiling Fan & Light Fixture Installation',
    description:
      'Installation of fan units, chandeliers, smart light switches, and complete wiring checkup.',
    category: 'electrical',
    price: 40,
    priceType: 'hourly',
    rating: 4.7,
    reviewCount: 76,
    imageUrl: '/service-electrical.png',
    provider: {
      name: 'Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.78,
      completedJobs: 180,
    },
  },
  {
    id: 's4',
    title: 'Custom Furniture Assembly & Repair',
    description:
      'Assembly of flatpack furniture (IKEA, etc.), cabinet repairs, door fixes, and custom shelves installation.',
    category: 'carpentry',
    price: 38,
    priceType: 'hourly',
    rating: 4.9,
    reviewCount: 54,
    imageUrl: '/service-carpentry.png',
    provider: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 4.92,
      completedJobs: 95,
    },
  },
  {
    id: 's5',
    title: 'Full Room Accent Wall Painting',
    description:
      'Professional wall prep, taping, priming, and double coat painting with premium low-VOC paint.',
    category: 'painting',
    price: 180,
    priceType: 'fixed',
    rating: 4.6,
    reviewCount: 38,
    imageUrl: '/service-painting.png',
    provider: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.65,
      completedJobs: 64,
    },
  },
  {
    id: 's6',
    title: 'Smart Home Thermostat & Camera Setup',
    description:
      'Installation and connection of Nest, Ring, or Ecobee devices. Includes full app configuration and testing.',
    category: 'electrical',
    price: 60,
    priceType: 'fixed',
    rating: 4.9,
    reviewCount: 110,
    imageUrl: '/service-electrical.png',
    provider: {
      name: 'Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.78,
      completedJobs: 180,
    },
  },
  {
    id: 's7',
    title: 'Bathroom Tile & Grout Restoration',
    description:
      'Deep cleaning of grout lines, resealing tile edges, and replacement of cracked tiles to prevent mildew.',
    category: 'cleaning',
    price: 50,
    priceType: 'hourly',
    rating: 4.8,
    reviewCount: 65,
    imageUrl: '/service-cleaning.png',
    provider: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 4.95,
      completedJobs: 340,
    },
  },
  {
    id: 's8',
    title: 'Water Heater Flush & Maintenance',
    description:
      'Flushing sedimental buildup, checking pressure relief valves, and optimizing heating element efficiency.',
    category: 'plumbing',
    price: 120,
    priceType: 'fixed',
    rating: 4.85,
    reviewCount: 42,
    imageUrl: '/service-plumbing.png',
    provider: {
      name: 'Thomas Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.82,
      completedJobs: 210,
    },
  },
  {
    id: 's9',
    title: 'Drywall Repair & Patching',
    description:
      'Patching holes, repairing water damage spots, texture matching, and sanding ready for paint.',
    category: 'carpentry',
    price: 45,
    priceType: 'hourly',
    rating: 4.75,
    reviewCount: 81,
    imageUrl: '/service-carpentry.png',
    provider: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 4.92,
      completedJobs: 95,
    },
  },
];

export const DEFAULT_LOCATION = 'New York, USA';

export const DEFAULT_SKILLS_TAGS = ['Gardening', 'Handyman', 'Plumber', '+12'];

export const CATEGORY_PHOTOS: Record<string, string[]> = {
  cleaning: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop&q=80',
  ],
  plumbing: [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
  ],
  electrical: [
    'https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558224494-ef663bb5953e?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460518451285-97b6ba326861?w=400&auto=format&fit=crop&q=80',
  ],
  carpentry: [
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
  ],
  painting: [
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&auto=format&fit=crop&q=80',
  ],
};

export const SDP_COPY = {
  backToServices: 'Back to services',
  appreciation: 'Appreciation',
  operatorRole: 'Service Operator',
  serviceDetailsHeading: 'Service Details',
  packageNameLabel: 'Package Name',
  startingAtLabel: 'Starting At',
  bookServiceButton: 'Book Service',
  bookingSuccessTitle: 'Booking Request Received!',
  bookingSuccessDesc: (title: string) =>
    `Thank you for booking the ${title}. A certified coordinator will contact you shortly to confirm the scheduled date and time.`,
  backToServiceButton: 'Back to Service',
  fallbackDescription:
    ' Consectetur adipisicing elit sed do eiusmod tempor incididunt utna labore etnalorale magna aliqua enim ad minim veniam quis nostrud exercite.',
};

export const STARTING_FROM_LABEL = 'Starting from';
export const BOOK_NOW_LABEL = 'Book Now';

export const BOOKING_PAGE_COPY = {
  titleStep1: 'Choose Date & Time',
  titleStep2: 'Booking Details',
  titleStep3: 'Payment & Confirmation',
  backToDetails: 'Back to details',
  backToSchedule: 'Back to schedule',
  backToRequirements: 'Back to requirements',
  selectDateLabel: 'Select Date',
  selectTimeLabel: 'Select Time Slot',
  requirementsLabel: 'Requirement Details',
  describeRequirementsSub: 'Describe what you need done',
  requirementsPlaceholder:
    'Please provide details (e.g. Bring extra long ladder, leaky pipeline is under the cabinet, or check toilet handle...)',
  chooseAddressLabel: 'Choose Address',
  addNewAddressLabel: 'Add New',
  createAddressTitle: 'Create New Address',
  addressFormLabels: {
    type: 'Label (e.g. Home, Work, Cabin)',
    street: 'Street Address',
    city: 'City',
    state: 'State',
    zip: 'ZIP Code',
  },
  saveAddressButton: 'Save Address',
  orderReviewTitle: 'Review Booking Details',
  orderReviewLabels: {
    schedule: 'Schedule Selected',
    notes: 'Your Instructions',
    address: 'Delivery Address',
    payment: 'Payment Method',
    service: 'Service',
    date: 'Date:',
    time: 'Time:',
    addr: 'Address:',
    note: 'Notes:',
    pay: 'Payment:',
  },
  paymentMethodTitle: 'Choose Payment Method',
  codTitle: 'Cash on Delivery (COD) / Pay After Service',
  codDescription:
    'Pay directly to our certified professional in cash, card, or mobile transfer once the service is fully completed to your satisfaction.',
  summaryTitle: 'Booking Summary',
  pricingBreakdownTitle: 'Pricing Breakdown',
  proceedButton: 'PROCEED',
  proceedStep2Button: 'Proceed to Payment',
  confirmBookingButton: 'Confirm & Place Booking',
  bookingConfirmedTitle: 'Booking Confirmed!',
  viewOrderButton: 'View Order Details',
  continueBrowsingButton: 'Continue Browsing',
};

export const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    street: '123 Broadway St, Apt 4B',
    cityStateZip: 'New York, NY 10001',
  },
  {
    id: 'addr-2',
    label: 'Office',
    street: '450 Lexington Ave, Floor 12',
    cityStateZip: 'New York, NY 10017',
  },
];

export const BOOKING_DATES = [
  { day: 'Mon', date: '06' },
  { day: 'Tue', date: '07' },
  { day: 'Wed', date: '08' },
  { day: 'Thu', date: '09' },
  { day: 'Fri', date: '10' },
  { day: 'Sat', date: '11' },
];

export const BOOKING_TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

export const PRICING_BREAKDOWN_CONFIGS = [
  { label: 'First 1 Hr', multiplier: 1.0 },
  { label: 'Upto 1.5 Hrs', multiplier: 1.25 },
  { label: 'Upto 2 Hrs', multiplier: 1.5 },
  { label: 'Upto 2.5 Hrs', multiplier: 1.8 },
  { label: 'Upto 3 Hrs', multiplier: 2.0 },
  { label: 'Upto 3.5 Hrs', multiplier: 2.25 },
  { label: 'Upto 4 Hrs', multiplier: 2.5 },
];
