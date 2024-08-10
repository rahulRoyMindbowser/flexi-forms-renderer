import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Slider from './slider';

const SingleSlider = ({
  id,
  name,
  min = 0,
  max = 24,
  step = 1,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  label,
  description,
  error,
  helperText,
  showErrorIcon = false,
  showSuccessIcon = false,
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
      render={({ field: { ref, value, onChange: defaultOnChange, onBlur: defaultOnBlur } }) => (
        <Slider
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value || 11}
          onChange={newValue => {
            setValue(name, newValue);
            defaultOnChange(newValue);
            onChange && onChange(newValue);
          }}
          onBlur={e => {
            defaultOnBlur(e);
            onBlur && onBlur(e);
          }}
          disabled={disabled}
          required={required}
          label={label}
          description={description}
          error={errors[name]?.message || error}
          helperText={helperText}
          showErrorIcon={showErrorIcon}
          showSuccessIcon={showSuccessIcon}
        />
      )}
    />
  );
};

export default SingleSlider;
