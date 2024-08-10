import React, { useEffect } from 'react';
import { spanMap } from '../../../helper';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Controller, useFormContext } from 'react-hook-form';

const DEFAULT_VALUE = '';

const DateInput = ({
  id,
  label,
  name,
  value,
  autoFocus,
  success,
  onChange,
  span,
  placeholder,
  disabled,
  maxDate,
  minDate,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, onBlur: defaultOnBlur, onChange: defaultOnChange } }) => {
        const error = errors[name]?.message;
        return (
          <div className="relative flex flex-col gap-3 mb-6" style={{ width: spanMap(span) }}>
            {label && (
              <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
                {required && <span className="text-red-700"> *</span>}
              </label>
            )}
            <div className="relative">
              <input
                id="datepicker"
                aria-label="Date"
                type="date"
                className={`w-full p-2 rounded-md ${error ? ' error' : ''}${
                  success ? ' success' : ''
                }`}
                placeholder={placeholder}
                onChange={defaultOnChange}
                onBlur={defaultOnBlur}
                value={value ?? DEFAULT_VALUE}
                autoFocus={autoFocus}
                disabled={disabled}
              />
            </div>
            {(error || success) && (
              <div className="absolute top-full">
                {error ? <span className="text-error">{error}</span> : null}
                {success ? <span className="text-success">{success}</span> : null}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default DateInput;
