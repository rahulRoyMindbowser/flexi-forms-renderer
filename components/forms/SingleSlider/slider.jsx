import React, { useState, useEffect } from 'react';

const Slider = ({
  id,
  name,
  value = 11,
  min = 0,
  max = 24,
  step = 1,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  label = '',
  description = '',
  error,
  helperText,
  showErrorIcon = false,
  showSuccessIcon = false,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleSliderChange = e => {
    const newValue = e.target.value;
    setSliderValue(newValue);
    onChange && onChange(newValue, name);
  };

  const handleBlur = e => {
    onBlur && onBlur(e);
  };
  console.log(description);
  return (
    <div styles={styles.container}>
      {label && (
        <label htmlFor={id} styles={styles.label}>
          {label}
          {required && <span styles={styles.required}>*</span>}
        </label>
      )}
      {description && <p styles={styles.label}>{description}</p>}
      <div styles={styles.sliderContainer}>
        <div styles={styles.sliderTrack(sliderValue, min, max)} />
        <input
          id={id}
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleSliderChange}
          onBlur={handleBlur}
          disabled={disabled}
          styles={styles.slider}
        />
        <div styles={styles.label(sliderValue, min, max)}>
          {`${sliderValue % 12 === 0 ? 12 : sliderValue % 12}${sliderValue >= 12 ? 'pm' : 'am'}`}
        </div>
      </div>
      {(error || helperText) && (
        <div styles={{ color: error ? 'red' : 'black', marginTop: '10px' }}>
          {error && showErrorIcon && '❌ '}
          {error || helperText}
          {showSuccessIcon && !error && '✔️'}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '50px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  required: {
    color: 'red',
    marginLeft: '4px',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    appearance: 'none',
    height: '8px',
    borderRadius: '5px',
    background: 'transparent',
    zIndex: 1,
    marginTop: '-4px',
  },
  sliderTrack: (value, min, max) => ({
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '8px',
    borderRadius: '5px',
    background: '#E0E0E0',
    transform: 'translateY(-50%)',
    zIndex: 0,
    backgroundImage: `linear-gradient(to right, #CEE4FF ${
      ((value - min) / (max - min)) * 100
    }%, #E0E0E0 ${((value - min) / (max - min)) * 100}%)`,
  }),
  label: (value, min, max) => ({
    position: 'absolute',
    top: '-30px',
    left: `${((value - min) / (max - min)) * 100}%`,
    transform: 'translateX(-50%)',
    fontSize: '16px',
    color: '#333',
    whiteSpace: 'nowrap',
  }),
};

export default Slider;
