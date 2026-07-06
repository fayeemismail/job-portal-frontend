'use client';

import { useState } from 'react';
import { ArrowUpRight, MapPin, Mail } from 'lucide-react';
import { NEWSLETTER_CONTACT, NEWSLETTER_COPY } from './constants';

export function NewsletterColumn() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert('Please enter your email.');
    if (!agreed) return alert('You must agree to the Terms and Conditions.');
    alert(`Subscribed: ${email}`);
    setEmail('');
    setAgreed(false);
  };

  return (
    <div className="flex flex-col w-full max-w-[340px] md:max-w-[400px]">
      <h3 className="text-[#0B2545] font-extrabold text-lg mb-4">{NEWSLETTER_COPY.title}</h3>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={NEWSLETTER_COPY.placeholder}
          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-[#EE5E36] transition-colors"
          required
        />
        <button
          type="submit"
          className="btn-animate btn-animate-primary px-6 py-3 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
        >
          <span>{NEWSLETTER_COPY.buttonLabel}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </form>

      {/* Checkbox agreement */}
      <label className="flex items-center gap-2 mt-4 select-none cursor-pointer group w-fit">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4 rounded-sm border-gray-300 text-[#EE5E36] focus:ring-[#EE5E36]/30 cursor-pointer"
        />
        <span className="text-xs text-gray-500 font-semibold group-hover:text-gray-700 transition-colors">
          {NEWSLETTER_COPY.checkboxLabel}
        </span>
      </label>

      {/* Contact information details */}
      <div className="flex flex-col gap-3.5 mt-8 border-t border-gray-100 pt-6">
        {/* Location Address */}
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-[#EE5E36] shrink-0 mt-0.5" />
          <span className="text-sm text-gray-500 font-semibold leading-snug">
            {NEWSLETTER_CONTACT.address}
          </span>
        </div>

        {/* Email Address */}
        <div className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-[#EE5E36] shrink-0" />
          <a
            href={`mailto:${NEWSLETTER_CONTACT.email}`}
            className="text-sm text-gray-500 hover:text-[#EE5E36] font-semibold transition-colors duration-200"
          >
            {NEWSLETTER_CONTACT.email}
          </a>
        </div>
      </div>
    </div>
  );
}
