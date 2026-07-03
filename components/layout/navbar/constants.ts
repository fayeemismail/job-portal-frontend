import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Service', href: '/services' },
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
  { label: 'Contact', href: '/contact' },
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
  alt: 'Servat Logo',
  href: '/',
};

export const CONTACT_CONFIG = {
  phone: '+48 615 579 822',
  href: 'tel:+48615579822',
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
