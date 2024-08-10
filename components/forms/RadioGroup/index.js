import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Radio from './radio';
import { VisibleIfRegex } from '../../../helper';

const RadioGroup = ({
  id,
  name,
  label,
  options,
  required,
  helperText,
  disabled,
  direction = 'row',
  span,
  visibleIf,
}) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const visibleIfMatch = visibleIf?.match(VisibleIfRegex);

  if (!visibleIf || (visibleIfMatch && watch(visibleIfMatch[1]) === visibleIfMatch[2]))
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onBlur: defaultOnBlur, onChange: defaultOnChange } }) => (
          <Radio
            id={id}
            name={name}
            value={value}
            label={label}
            options={options}
            required={required}
            error={errors[name]?.message}
            helperText={helperText}
            disabled={disabled}
            direction={direction}
            onBlur={defaultOnBlur}
            onChange={defaultOnChange}
            span={span}
          />
        )}
      />
    );

  return null;
};

export default RadioGroup;
