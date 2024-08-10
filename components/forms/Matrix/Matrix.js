import React, { useEffect } from 'react';
import Radio from '../RadioGroup/radio';
import { spanMap } from '../../../helper';

const SimpleMatrix = ({
  id,
  type,
  required,
  columns,
  isAllRowRequired,
  name,
  rows,
  label,
  value,
  onChange,
}) => {
  return (
    <div id={id} className="flex flex-col w-full gap-3">
      {label && (
        <>
          <div className="pb-4 pt-7 px-3">
            <p>{label}</p>
          </div>
          <hr />
        </>
      )}
      <div className="flex flex-row justify-between w-full min-h-10 bg-gray-100">
        <p className="w-1/3"></p>
        {columns?.map((col, i) => (
          <div
            key={i}
            style={{ width: spanMap('1/12') }}
            className="flex flex-row items-center px-[7px]"
          >
            <p>{col}</p>
          </div>
        ))}
      </div>
      <div>
        {rows?.map((row, i) => (
          <div
            key={i}
            className={`flex flex-row justify-between items-center w-full min-h-10 ${
              i % 2 === 1 ? 'bg-gray-100' : 'bg-gray-50'
            }`}
          >
            <p className="w-1/3 px-3">{row}</p>
            {columns?.map((opt, i) => {
              return (
                <div
                  key={opt}
                  style={{ width: spanMap('1/12') }}
                  className="flex flex-row items-center"
                >
                  <Radio
                    direction={'row'}
                    options={[{ value: opt, text: '' }]}
                    name={row}
                    margin="auto"
                    onChange={onChange}
                    value={(value && value[row]) ?? ''}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleMatrix;
