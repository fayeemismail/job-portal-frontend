'use client';

import { CategoryHeader } from './categories/CategoryHeader';
import { CategoryGrid } from './categories/CategoryGrid';

export function Categories() {
  return (
    <section className="bg-white py-16 md:py-24 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <CategoryHeader />

        {/* Categories Card Grid */}
        <CategoryGrid />
      </div>
    </section>
  );
}
