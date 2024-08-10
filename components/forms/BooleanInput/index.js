import React, { useEffect } from 'react';
import { spanMap, VisibleIfRegex } from '../../../helper';
import { Controller, useFormContext } from 'react-hook-form';

const DEFAULT_VALUE = false;

const BooleanInput = ({
  id,
  name,
  value = DEFAULT_VALUE,
  label,
  labelPosition = 'left',
  span,
  visibleIf,
}) => {
  const { control, watch } = useFormContext();

  const visibleIfMatch = visibleIf?.match(VisibleIfRegex);

  if (!visibleIf || (visibleIfMatch && watch(visibleIfMatch[1]) === visibleIfMatch[2]))
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur: defaultOnBlur, onChange: defaultOnChange } }) => (
          <div className="relative flex flex-col gap-3 mb-6" style={{ width: spanMap(span) }}>
            <label className="inline-flex items-center cursor-pointer gap-3">
              {labelPosition === 'left' && (
                <span className="text-sm font-medium text-gray-900">{label}</span>
              )}
              <input
                id={id}
                name={name}
                type="checkbox"
                onBlur={defaultOnBlur}
                onChange={defaultOnChange}
                value={value}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              {labelPosition === 'right' && (
                <span className="text-sm font-medium text-gray-900">{label}</span>
              )}
            </label>
          </div>
        )}
      />
    );
  return null;
};

export default BooleanInput;
