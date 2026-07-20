'use client';

import React, { forwardRef } from 'react';
import { FormFieldError } from './FormFieldError';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      icon: Icon,
      error,
      rightElement,
      containerClassName = '',
      inputClassName = '',
      type = 'text',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${containerClassName}`}>
        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Icon className="w-3.5 h-3.5" />
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full pl-9 py-2 bg-gray-50/50 border ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 focus:border-[#EE5E36]'
            } focus:bg-white rounded-lg text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200 ${
              rightElement ? 'pr-9' : 'pr-4'
            } ${inputClassName} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightElement}</div>
          )}
        </div>
        <FormFieldError error={error} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;
