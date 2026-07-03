'use client';

import Link from 'next/link';
import { FooterLink } from './types';

interface LinksColumnProps {
  title: string;
  links: FooterLink[];
}

export function LinksColumn({ title, links }: LinksColumnProps) {
  return (
    <div className="flex flex-col min-w-[120px]">
      <h3 className="text-[#0B2545] font-extrabold text-lg mb-4">{title}</h3>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-gray-500 hover:text-[#EE5E36] text-sm font-semibold transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
