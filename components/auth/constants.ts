export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface AuthSidebarData {
  title: string;
  description: string;
  testimonial: Testimonial;
}

export const AUTH_SIDEBAR_DATA: Record<'signin' | 'signup', AuthSidebarData> = {
  signin: {
    title: 'Find & Book Local Experts In Minutes',
    description:
      'Log in to your dashboard to track bookings, customize schedule coordinates, and message certified service providers.',
    testimonial: {
      quote:
        'Managing our corporate office maintenance has never been easier. The platform is fast, background-checked experts are assigned in minutes, and the billing is fully transparent.',
      author: 'Marcus Vance',
      role: 'Operations Director • Vance & Co.',
      rating: 5,
    },
  },
  signup: {
    title: 'Join the Leading Service Platform',
    description:
      'Create an account to track all your local home services, unlock loyalty reward points, and chat with certified professionals.',
    testimonial: {
      quote:
        'The peace of mind of having fully insured, background-checked local experts is worth everything. Getting home cleaning and plumbing sorted out takes less than a minute. Highly recommend Ainorax!',
      author: 'Sarah Jenkins',
      role: 'Verified Homeowner • New York',
      rating: 5,
    },
  },
};
