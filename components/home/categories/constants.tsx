import React from 'react';
import { Category } from './types';

export const CATEGORIES_HEADER = {
  badgeLabel: 'Categories',
  headingText: 'Popular Categories',
  buttonLabel: 'Explore More',
};

export const CATEGORIES_LIST: Category[] = [
  {
    id: '1',
    title: 'House Cleaning',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Cleaning Bucket & Bubbles */}
        <path
          d="M5 11h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8z"
          className="text-[#3b82f6] transition-colors duration-400"
        />
        <path
          d="M8 11V7a4 4 0 0 1 8 0v4"
          className="text-[#60a5fa] transition-colors duration-400"
        />
        <circle cx="17" cy="6" r="1.5" className="fill-[#fbbf24] transition-colors duration-400" />
        <circle cx="14" cy="4" r="1" className="fill-[#fbbf24] transition-colors duration-400" />
        <path d="M9 15h6" className="text-white opacity-80 transition-colors duration-400" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Electricity Services',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Lightning bulb & Socket plug */}
        <path
          d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .4 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
          className="text-[#f59e0b] transition-colors duration-400"
        />
        <path d="M9 18h6M10 22h4" className="text-[#f59e0b] transition-colors duration-400" />
        <path
          d="M12 5V2L8 6h8l-4 4V7"
          className="fill-[#ef4444] stroke-[#ef4444] transition-colors duration-400"
        />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Furniture Replace',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Armchair & lamp cabinet */}
        <path d="M4 18v3M20 18v3" className="text-[#84cc16] transition-colors duration-400" />
        <path
          d="M19 14v4H5v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z"
          className="text-[#84cc16] transition-colors duration-400"
        />
        <path d="M12 11V3M9 3h6" className="text-[#a3e635] transition-colors duration-400" />
      </svg>
    ),
  },
  {
    id: '4',
    title: 'Mechanic Zone',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Wheel wrench gear */}
        <circle cx="12" cy="12" r="9" className="text-[#6366f1] transition-colors duration-400" />
        <path d="M12 8v8M8 12h8" className="text-[#818cf8] transition-colors duration-400" />
        <circle cx="12" cy="12" r="3" className="fill-[#6366f1] transition-colors duration-400" />
      </svg>
    ),
  },
  {
    id: '5',
    title: 'Repairman',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Washing Machine & Screwdriver */}
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="2"
          className="text-[#06b6d4] transition-colors duration-400"
        />
        <circle cx="12" cy="13" r="4" className="text-[#22d3ee] transition-colors duration-400" />
        <circle cx="12" cy="6" r="1" className="fill-[#06b6d4] transition-colors duration-400" />
      </svg>
    ),
  },
  {
    id: '6',
    title: 'Plumber Service',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Plumbing Pipe & water drop */}
        <path
          d="M8 3v12a4 4 0 0 0 8 0v-2"
          className="text-[#0ea5e9] transition-colors duration-400"
        />
        <path
          d="M12 7.5a2.5 2.5 0 0 1 5 0c0 2-2.5 4.5-2.5 4.5S12 9.5 12 7.5z"
          className="fill-[#38bdf8] stroke-[#38bdf8] transition-colors duration-400"
        />
      </svg>
    ),
  },
  {
    id: '7',
    title: 'Painter Chaise',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Paint roller & splat */}
        <rect
          x="6"
          y="4"
          width="12"
          height="6"
          rx="1.5"
          className="text-[#ec4899] transition-colors duration-400"
        />
        <path
          d="M12 10v6a2 2 0 0 0 2 2h4"
          className="text-[#f472b6] transition-colors duration-400"
        />
        <path d="M21 7h-2M3 7h2" className="text-[#ec4899] transition-colors duration-400" />
      </svg>
    ),
  },
  {
    id: '8',
    title: 'Carpenter',
    providersCount: '4,982 Providers',
    icon: (
      <svg
        className="w-10 h-10 transition-colors duration-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Carpenter Saw Wood Plank */}
        <path
          d="M6 3h12l3 3-3 3H6a3 3 0 0 1-3-3 3 3 0 0 1 3-3z"
          className="text-[#8b5cf6] transition-colors duration-400"
        />
        <path d="M7 6h4" className="text-[#a78bfa] transition-colors duration-400" />
      </svg>
    ),
  },
];
