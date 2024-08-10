import React, { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './input';
import { VisibleIfRegex } from '../../../helper';

const TextField = (
  {
    id,
    type = 'text',
    label,
    name,
    onChange,
    onBlur,
    required,
    placeholder,
    disabled,
    startIcon,
    endIcon,
    color,
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
    visibleIf,
  },
  ref,
) => {
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
        render={({
          field: { ref, value: inputValue, onBlur: defaultOnBlur, onChange: defaultOnChange },
        }) => {
          return (
            <InputField
              ref={ref}
              id={id}
              type={type}
              label={label}
              name={name}
              value={inputValue}
              required={required}
              placeholder={placeholder}
              disabled={disabled}
              startIcon={startIcon}
              endIcon={endIcon}
              color={color}
              error={errors[name]?.message}
              success={success}
              showErrorIcon={showErrorIcon}
              showSuccessIcon={showSuccessIcon}
              helperText={helperText}
              iconInfo={iconInfo}
              maxLength={maxLength}
              minLength={minLength}
              onKeyDown={onKeyDown}
              autoFocus={autoFocus}
              pattern={pattern}
              readOnly={readOnly}
              onChange={e => {
                defaultOnChange(e);
                onChange && onChange(e);
              }}
              onBlur={e => {
                defaultOnBlur(e);
                onBlur && onBlur(e);
              }}
              span={span}
            />
          );
        }}
      />
    );
  return null;
};

export default forwardRef(TextField);
