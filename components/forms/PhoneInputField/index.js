import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './index.css';

const PhoneInputField = props => {
  const {
    id,
    label,
    name,
    value,
    // onChange,
    onBlur,
    required,
    disabled,
    error,
    helperText,
    placeholder,
    phoneNumber,
    setPhoneNumber,
  } = props;

  return (
    <>
      <div className="flex flex-col">
        <label for={id} class="w-full ms-2 text-sm font-medium text-black-900 dark:text-black-300">
          {label}
          {required && <span className="text-red-700"> *</span>}
        </label>
        <PhoneInput
          key={id}
          country={'us'}
          placeholder={placeholder}
          value={phoneNumber}
          disabled={disabled}
          onChange={e => setPhoneNumber(e)}
        />
        {helperText?.length > 0 && (
          <p
            id="helper-text-explanation"
            className="mt-2 ml-3 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    </>
  );
};

export default PhoneInputField;
