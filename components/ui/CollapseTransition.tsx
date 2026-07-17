'use client';

import React from 'react';

interface CollapseTransitionProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  durationClass?: string;
  marginClass?: string;
}

export function CollapseTransition({
  show,
  children,
  className = '',
  durationClass = 'duration-200',
  marginClass = 'mt-1',
}: CollapseTransitionProps) {
  return (
    <div
      className={`grid transition-all ${durationClass} ease-in-out ${
        show ? `grid-rows-[1fr] opacity-100 ${marginClass}` : 'grid-rows-[0fr] opacity-0 mt-0'
      } ${className}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
