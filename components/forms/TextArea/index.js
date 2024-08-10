import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Input from './input';
import { VisibleIfRegex } from '../../../helper';

const DEFAULT_VALUE = '';

const Textarea = ({
  id = '',
  selectHeight = null,
  label = '',
  name = '',
  value = DEFAULT_VALUE,
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
        rules={{ required }}
        render={({ field: { ref, value, onBlur: defaultOnBlur, onChange: defaultOnChange } }) => (
          <Input
            ref={ref}
            id={id}
            name={name}
            value={value}
            label={label}
            onChange={e => {
              defaultOnChange(e);
              onChange && onChange(e);
            }}
            onBlur={e => {
              defaultOnBlur(e);
              onBlur && onBlur(e);
            }}
            error={errors[name]?.message || error}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            color={color}
            success={success}
            showErrorIcon={showErrorIcon}
            showSuccessIcon={showSuccessIcon}
            helperText={helperText}
            maxLength={maxLength}
            minLength={minLength}
            span={span}
          />
        )}
      />
    );
  return null;
};

export default Textarea;
