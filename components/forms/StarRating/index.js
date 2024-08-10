import React from 'react';
import Rating from 'react-rating';
import EmptyStar from '../../../assets/EmptyStars.svg';
import YellowFullStar from '../../../assets/YellowFullStar.svg';

const StarRating = props => {
  const {
    id,
    label,
    name,
    value,
    // onChange,
    onBlur,
    required,
    disabled,
    error,
    helperText,
    star,
    setStar,
    numberOfStars,
  } = props;

  return (
    <>
      <div className="w-full flex flex-col pl-3 ">
        <label
          htmlFor={id}
          className="w-full text-sm font-medium text-black-900 dark:text-black-300"
        >
          {label}
          {required && <span className="text-red-700"> *</span>}
        </label>
        <Rating
          key={id}
          readonly={disabled}
          emptySymbol={
            <img
              src={EmptyStar}
              className="icon"
              alt="filledStart"
              style={{ width: '30px', height: '50px', marginRight: '8px' }}
            />
          }
          fullSymbol={
            <img
              src={YellowFullStar}
              className="icon"
              alt="filledStart"
              style={{ width: '30px', height: '50px', marginRight: '8px' }}
            />
          }
          initialRating={star}
          onChange={e => {
            if (e > 0 && e !== undefined) {
              setStar(e);
            }
          }}
          stop={numberOfStars}
        />
        {helperText?.length > 0 && (
          <p id="helper-text-explanation" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    </>
  );
};

export default StarRating;
