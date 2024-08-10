import React, { forwardRef } from 'react';
import { spanMap } from '../../../helper';

const Input = forwardRef(
  (
    {
      id = '',
      label = '',
      name = '',
      value = '',
      onChange = () => null,
      onBlur = () => null,
      required = false,
      placeholder = '',
      disabled = false,
      startIcon = null,
      endIcon = null,
      color = null,
      error = '',
      success = '',
      showErrorIcon = false,
      showSuccessIcon = false,
      helperText = '',
      maxLength = null,
      minLength = null,
      span,
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-3 mb-6" style={{ width: spanMap(span) }}>
        {label && (
          <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <div className="textarea-container">
          {startIcon && <span className="icon start-icon">{startIcon}</span>}
          <textarea
            ref={ref}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            className={`w-full rounded-md ${error ? ' error' : ''}${success ? ' success' : ''}`}
            aria-invalid={!!error}
            aria-required={required}
          />
          {endIcon && <span className="icon end-icon">{endIcon}</span>}
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

export default Input;
