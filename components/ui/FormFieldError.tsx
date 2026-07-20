'use client';

import React from 'react';
import { CollapseTransition } from './CollapseTransition';

interface FormFieldErrorProps {
  error?: string;
  className?: string;
}

export function FormFieldError({ error, className = '' }: FormFieldErrorProps) {
  return (
    <CollapseTransition show={!!error} marginClass="mt-1">
      <p className={`text-[10px] text-red-500 font-semibold ${className}`}>{error}</p>
    </CollapseTransition>
  );
}
export default FormFieldError;
