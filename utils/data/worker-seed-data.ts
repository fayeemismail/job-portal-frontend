/**
 * @file worker-seed-data.ts
 * @description Static seed fixtures for the worker profile store.
 *
 * These are the initial default worker records used to bootstrap the
 * localStorage data layer on first load. This file must remain free
 * of any browser-specific APIs, business logic, and side effects —
 * it is a pure data module that can be safely imported anywhere,
 * including server components and unit tests.
 *
 * To add or modify default workers, edit this file only.
 * The store will auto-seed from these records on first visit.
 */

import type { WorkerProfile } from '@/utils/worker-profile-store';

/**
 * Canonical set of seed worker profiles.
 * Includes both approved active workers and pending applicants
 * to support a realistic admin review demo flow.
 */
export const DEFAULT_WORKERS: WorkerProfile[] = [
  {
    id: 'w1',
    name: 'Marcus Vance',
    email: 'worker@example.com',
    phone: '+91 98765 00001',
    role: 'Cleaning Expert',
    rating: 4.9,
    completedJobs: 95,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    skills: ['Deep Cleaning', 'Window Washing', 'Carpet Cleaning', 'Post-Construction Clean'],
    approvalStatus: 'approved',
  },
  {
    id: 'w2',
    name: 'Jordan Vance',
    email: 'jordan@example.com',
    phone: '+91 98765 00002',
    role: 'Painting Expert',
    rating: 4.8,
    completedJobs: 72,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    skills: ['Interior Painting', 'Exterior Painting', 'Wallpaper Removal', 'Drywall Repair'],
    approvalStatus: 'approved',
  },
  {
    id: 'w3',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    phone: '+91 98765 00003',
    role: 'Plumbing Expert',
    rating: 4.95,
    completedJobs: 120,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    skills: ['Leak Detection', 'Pipe Repair', 'Water Heater Flush', 'Drain Unclogging'],
    approvalStatus: 'approved',
  },
  {
    id: 'w4',
    name: 'Alex Cooper',
    email: 'alex@example.com',
    phone: '+91 98765 00004',
    role: 'Electrical Expert',
    rating: 4.75,
    completedJobs: 88,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    skills: ['Smart Home Setup', 'Fixture Installation', 'Outlet Rewiring', 'Breaker Box Repair'],
    approvalStatus: 'approved',
  },
  {
    id: 'w5',
    name: 'David Foster',
    email: 'david.foster@example.com',
    phone: '+91 98765 00005',
    role: 'Carpentry Expert',
    rating: 5.0,
    completedJobs: 0,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    skills: ['Cabinet Install', 'Crown Molding', 'Door Hanging'],
    approvalStatus: 'pending',
    questionnaire: {
      phone: '+91 98765 00005',
      baseLocation: 'Bangalore, KA',
      serviceableDistance: 25,
      primaryService: 'Carpentry Expert',
      documents: [
        {
          type: 'Aadhar Card',
          name: 'aadhar_david_foster.pdf',
          size: '1.2 MB',
          uploadedAt: '15/07/2026',
          status: 'Pending Verification',
        },
        {
          type: 'PAN Card',
          name: 'pan_david_foster.jpg',
          size: '0.8 MB',
          uploadedAt: '15/07/2026',
          status: 'Pending Verification',
        },
      ],
      bankDetails: {
        bankName: 'State Bank of India',
        branchName: 'MG Road, Bangalore',
        accountNumber: '38291029381',
        ifscCode: 'SBIN0001234',
      },
    },
  },
  {
    id: 'w6',
    name: 'Clara Oswald',
    email: 'clara.oswald@example.com',
    phone: '+91 98765 00006',
    role: 'Painting Expert',
    rating: 5.0,
    completedJobs: 0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    skills: ['Faux Finishes', 'Stenciling', 'Cabinet Spraying'],
    approvalStatus: 'pending',
    questionnaire: {
      phone: '+91 98765 00006',
      baseLocation: 'Chennai, TN',
      serviceableDistance: 10,
      primaryService: 'Painting Expert',
      documents: [
        {
          type: 'Driving License',
          name: 'dl_clara_oswald.pdf',
          size: '2.1 MB',
          uploadedAt: '15/07/2026',
          status: 'Pending Verification',
        },
      ],
      bankDetails: {
        bankName: 'HDFC Bank',
        branchName: 'T-Nagar, Chennai',
        accountNumber: '50100293810293',
        ifscCode: 'HDFC0000124',
      },
    },
  },
];

/** IDs used for data-integrity checks during store hydration. */
export const SEED_INTEGRITY_CHECK_IDS = ['w5', 'w6'] as const;
