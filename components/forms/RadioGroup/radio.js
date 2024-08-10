import React from 'react';
import { spanMap } from '../../../helper';

const Radio = ({
  id,
  name,
  value,
  label,
  options,
  required,
  error,
  helperText,
  disabled,
  onChange,
  onBlur,
  direction = 'row',
  span,
  margin,
}) => {
  return (
    <div
      className={`flex flex-col justify-center gap-3 ${
        margin === 'auto' ? 'my-3' : 'mb-6'
      } min-h-10`}
      style={{ width: spanMap(span) }}
    >
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-700"> *</span>}
        </label>
      )}
      <div
        className={`flex ${
          direction === 'row' ? 'flex-row gap-3' : 'flex-col'
        }  ps-3 items-start w-full min-h-10`}
      >
        {options.map((elem, i) => {
          return (
            <div key={elem?.value ?? elem}>
              <input
                id={`${name}-${elem?.value ?? elem}`}
                type="radio"
                value={elem?.value ?? elem}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                name={name}
                checked={value === (elem?.value ?? elem)}
                className={`w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 rounded-full`}
              />
              <label
                htmlFor={`${name}-${elem?.value ?? elem}`}
                className="w-full py-3 ms-2 text-sm font-medium text-black-900"
              >
                {elem?.text ?? elem}
              </label>
            </div>
          );
        })}
      </div>
      {error && helperText > 0 && (
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Radio;
