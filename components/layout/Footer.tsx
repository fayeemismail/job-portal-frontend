'use client';

import React from 'react';
import Link from 'next/link';
import { AboutColumn } from './footer/AboutColumn';
import { LinksColumn } from './footer/LinksColumn';
import { NewsletterColumn } from './footer/NewsletterColumn';
import { SocialLinks } from './footer/SocialLinks';
import { FOOTER_COLUMNS, LEGAL_LINKS, COPYRIGHT_TEXT } from './footer/constants';

export function Footer() {
  return (
    <footer className="w-full bg-[#FFF9F8] border-t border-[#FFEFEA] flex flex-col pt-16 select-none">
      {/* Top Part: Logo, Socials & Columns */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-12 pb-16 flex flex-col gap-12">
        {/* Row 1: Logo & Social Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-100 pb-8">
          <Link href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-black.png"
              alt="Servat handyman service portal logo"
              className="h-20 w-auto object-contain"
            />
          </Link>
          <SocialLinks />
        </div>

        {/* Row 2: Grid of Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-4">
          <div className="lg:col-span-4">
            <AboutColumn />
          </div>
          <div className="lg:col-span-2">
            <LinksColumn title={FOOTER_COLUMNS[0].title} links={FOOTER_COLUMNS[0].links} />
          </div>
          <div className="lg:col-span-2">
            <LinksColumn title={FOOTER_COLUMNS[1].title} links={FOOTER_COLUMNS[1].links} />
          </div>
          <div className="lg:col-span-4">
            <NewsletterColumn />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal Policies */}
      <div className="bg-[#0B2545] py-5 px-4 sm:px-8 lg:px-12 w-full text-white text-xs sm:text-sm font-semibold">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-gray-300 font-medium tracking-wide">{COPYRIGHT_TEXT}</span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
