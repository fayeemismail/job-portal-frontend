import { FooterColumn, SocialLink } from './types';

export const FOOTER_ABOUT = {
  description:
    'It is a long established fact that a reader will be distracted by the readable counter of a page.',
  languageLabel: 'Language & Currency',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ],
  currencies: [
    { code: 'USD', label: 'US Dollars' },
    { code: 'EUR', label: 'Euro' },
    { code: 'GBP', label: 'British Pound' },
  ],
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Servat Blog', href: '/blog' },
      { label: 'Engineering Blog', href: '/engineering-blog' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Social Good', href: '/social-good' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Topics', href: '/help' },
      { label: 'Post A Job', href: '/post-a-job' },
      { label: 'Servat Pro', href: '/pro' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Verify', href: '/verify' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'facebook', href: 'https://facebook.com', ariaLabel: 'Facebook' },
  { platform: 'twitter', href: 'https://twitter.com', ariaLabel: 'X (formerly Twitter)' },
  { platform: 'linkedin', href: 'https://linkedin.com', ariaLabel: 'LinkedIn' },
  { platform: 'instagram', href: 'https://instagram.com', ariaLabel: 'Instagram' },
];

export const NEWSLETTER_CONTACT = {
  address: 'Australia Wise 9297 Maxim AV. Antonio, USA.',
  email: 'example@gmail.com',
};

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export const COPYRIGHT_TEXT = '© 2024 - 2030 | Allrights reserved By binary-vines';
