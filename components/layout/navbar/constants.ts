import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Service', href: '/services' },
  { label: 'About', href: '/about' },
  {
    label: 'Workers',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Workers', href: '/workers' },
      { label: 'Workers Profile', href: '/workers/profile' },
      { label: '404', href: '/404' },
    ],
  },
  { label: 'Blog', href: '/blog' },
];

export const BANNER_CONFIG = {
  primaryText: 'fasl',
  secondaryText: 'market',
  buyNowUrl: '#',
  buyNowLabel: 'Buy now',
  closeAriaLabel: 'Close banner',
};

export const LOGO_CONFIG = {
  src: '/logo-black.png',
  alt: 'Ainorax - Service Provider Logo',
  href: '/',
};

export const AUTH_CONFIG = {
  signInHref: '/signin',
  signUpHref: '/signup',
  signInLabel: 'Sign In',
  signUpLabel: 'Sign Up',
};

export const NAV_UTILITY_CONFIG = {
  defaultActiveLabel: 'Home',
  toggleMenuAriaLabel: 'Toggle menu',
};

export const USER_PROFILE_CONFIG = {
  initials: 'JD',
  myAccountLabel: 'My Account',
  profileLabel: 'My Profile',
  profileHref: '/profile',
  ordersLabel: 'My Orders',
  ordersHref: '/orders',
  logoutLabel: 'Logout',
};
