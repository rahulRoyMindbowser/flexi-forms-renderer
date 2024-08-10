import React, { forwardRef, useEffect, useState } from 'react';
import { spanMap } from '../../../helper';

const InputField = forwardRef(
  (
    {
      id,
      type = 'text',
      label,
      name,
      value,
      onChange,
      onBlur,
      required,
      placeholder,
      disabled,
      startIcon,
      endIcon,
      color,
      error,
      success,
      showErrorIcon,
      showSuccessIcon,
      helperText,
      iconInfo,
      maxLength,
      minLength,
      onKeyDown,
      autoFocus,
      pattern,
      readOnly,
      span,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
      if (value) {
      }
    }, [value]);

    // Handle input change
    const handleChange = e => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange && onChange(e);
    };

    return (
      <div className="relative flex flex-col gap-3 mb-6" style={{ width: spanMap(span) }}>
        {label && (
          <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
            {label}
            {required && <span className="text-red-700"> *</span>}
          </label>
        )}
        <div className={`${disabled ? ' disabled' : ''}`}>
          {startIcon && (
            <span className="start-icon" title={iconInfo}>
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type={type}
            name={name}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            pattern={pattern}
            readOnly={readOnly}
            className={`w-full rounded-md ${error ? ' error' : ''}${success ? ' success' : ''}`}
          />
          {endIcon && (
            <span className="end-icon" title={iconInfo}>
              {endIcon}
            </span>
          )}
        </div>
        {(error || success || helperText) && (
          <div className="absolute top-full">
            {error ? <span className="text-error">{error}</span> : null}
            {success ? <span className="text-success">{success}</span> : null}
            {helperText ? <span className="helper-text">{helperText}</span> : null}
          </div>
        )}
      </div>
    );
  },
);

export default InputField;
