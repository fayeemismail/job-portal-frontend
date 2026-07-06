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
