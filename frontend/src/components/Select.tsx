import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = true, className = '', ...props }, ref) => {
    const selectClasses = `
      block rounded-md border-gray-300 shadow-sm
      focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={selectClasses}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;