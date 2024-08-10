import React from 'react';
import { spanMap, VisibleIfRegex } from '../../../helper';
import { Controller, useFormContext } from 'react-hook-form';

const CheckBox = ({
  id,
  options,
  name,
  onChange,
  onBlur,
  label,
  required,
  disabled,
  direction = 'row',
  span,
  showNoneItem,
  showOtherItem,
  noneText,
  otherText,
  visibleIf,
}) => {
  const { control, setValue, watch } = useFormContext();

  const visibleIfMatch = visibleIf?.match(VisibleIfRegex);

  if (!visibleIf || (visibleIfMatch && watch(visibleIfMatch[1]) === visibleIfMatch[2]))
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onBlur: defaultOnBlur, onChange: defaultOnChange } }) => {
          return (
            <div className="flex flex-col gap-3 mb-6" style={{ width: spanMap(span) }}>
              {label && (
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                  {label}
                  {required && <span className="text-red-700"> *</span>}
                </label>
              )}
              <div
                className={`flex ${
                  direction === 'row' ? 'flex-row' : 'flex-col'
                }  ps-3 flex-wrap items-center w-full`}
              >
                {options?.map((elem, i) => {
                  return (
                    <div
                      key={elem.value ?? elem}
                      onClick={() => {
                        setValue(
                          name,
                          value?.includes(elem.value ?? elem)
                            ? value?.filter(x => x === (elem.value ?? elem))
                            : [...(value ?? []), elem.value ?? elem],
                        );
                      }}
                      className="w-3/12"
                    >
                      <input
                        id={elem.value ?? elem}
                        type="checkbox"
                        value={elem.value ?? elem}
                        name={name}
                        checked={value?.includes(elem.value ?? elem)}
                        onChange={() => null}
                        disabled={disabled}
                        className={`w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:!ring-none  !ring-none`}
                      />
                      <label className="w-full py-3 ms-2 text-sm font-medium text-black-900 dark:text-black-300">
                        {elem?.text ?? elem}
                      </label>
                    </div>
                  );
                })}
                {showOtherItem && (
                  <div
                    onClick={() => {
                      setValue(
                        name,
                        value?.includes('other')
                          ? value?.filter(x => x === 'other')
                          : [...(value ?? []), 'other'],
                      );
                    }}
                    className="w-3/12"
                  >
                    <input
                      id="other"
                      type="checkbox"
                      value="other"
                      disabled={disabled}
                      onChange={() => null}
                      checked={value?.includes('other')}
                      name={name}
                      className={`w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:!ring-none !ring-none`}
                    />
                    <label className="w-full py-3 ms-2 text-sm font-medium text-black-900 dark:text-black-300">
                      {otherText ?? 'Others'}
                    </label>
                  </div>
                )}
                {showNoneItem && (
                  <div
                    onClick={() => {
                      setValue(
                        name,
                        value?.includes('none')
                          ? value?.filter(x => x === 'none')
                          : [...(value ?? []), 'none'],
                      );
                    }}
                  >
                    <input
                      id="none"
                      type="checkbox"
                      value="none"
                      disabled={disabled}
                      onChange={() => null}
                      checked={value?.includes('none')}
                      name={name}
                      className={`w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:!ring-none  !ring-none`}
                    />
                    <label className="w-full py-3 ms-2 text-sm font-medium text-black-900 dark:text-black-300">
                      {noneText}
                    </label>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      />
    );
};

export default CheckBox;
