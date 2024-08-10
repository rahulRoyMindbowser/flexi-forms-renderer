import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SimpleMatrix from './Matrix';

// [name]: { [symptomName]: "yes/no", ... }

const Matrix = ({
  id,
  type,
  name,
  label,
  columns = [],
  rows = [],
  isAllRowRequired = false,
  required = false,
  disabled = false,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onBlur: defaultOnBlur } }) => {
        const handleChange = e => {
          const newValue = { ...(value ?? {}) };
          newValue[e.target.name] = e.target.value;
          setValue(name, newValue);
        };
        return (
          <SimpleMatrix
            id={id}
            type={type}
            name={name}
            label={label}
            columns={columns}
            rows={rows}
            isAllRowRequired={isAllRowRequired}
            required={required}
            disabled={disabled}
            onChange={handleChange}
            onBlur={defaultOnBlur}
            error={errors[name]?.message}
            value={value}
          />
        );
      }}
    />
  );
};

export default Matrix;
