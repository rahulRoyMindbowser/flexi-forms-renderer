import React, { forwardRef, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from './select';
import { VisibleIfRegex } from '../../../helper';

const DEFAULT_VALUE = '';

/**
 * Custom select field over plain HTML Select.
 *
 * @param {string} id - The `id` of `select` element.
 * @param {string} inputHeight - The `height` of `select` element.
 * @param {string} label - The `label` of `select` element.
 * @param {string} name - The `name` of `select` element.
 * @param {string} value - The `value` of `select` element.
 * @param {Array<object>} options - The `options` of `select` element.
 * @param {function} optionMapFunction - If `optionMapFunction` is present the function will be called to map option data.
 * @param {function} onOptionSearch - If `onOptionSearch` is present the function will is triggered when a option is searched in the menu search box of `select` element.
 * @param {function} onChange - The function that is triggered when there is a change in the `select` element.
 * @param {function} onBlur - The function that is triggered when the`select` element is blurred.
 * @param {boolean} required - If `required` is true, the `select` element will require a value and an asteric will be shown after the label.
 * @param {string} placeholder - The short hint displayed in the `select` before the user enters a value..
 * @param {boolean} disabled - If `disabled` is true, the `select` element will be disabled.
 * @param {Element} startIcon - The icon that is shown at the beginning or left end of the `select` element.
 * @param {Element} endIcon - The icon that is shown at the right end of the `select` element.
 * @param {string} color - The `color` for the `select` element.
 * @param {string} error - If `error` message is present, it will error success message at the bottom of the `select` element and the border of the `select` element will be of color error.
 * @param {string} success - If `success` message is present, it will show success message at the bottom of the `select` element and the border of the `select` element will be of color success.
 * @param {boolean} showErrorIcon - If `showErrorIcon` is true, it will show error icon at the right end of the `select` element.
 * @param {boolean} showSuccessIcon - If `showSuccessIcon` is true, it will show success icon at the right end of the `select` element.
 * @param {string} helperText - Any text that we want to show at the bottom of the `select` element, as a description.
 * @param {string} iconInfo - If `startIcon` or `endIcon` is present,`iconInfo` contents will be shown in a tooltip if the `startIcon` or `endIcon` is hovered.
 * @param {boolean} searchable - If `true`, the `select` element will have a search bar at the beginning of the options.
 * @param {string} searchInputPlaceholder - The short hint displayed in the search input of `select` element menu.
 * @param {function} onSearchCloseClick - If `select` element is searchable, then this function will be triggered if clicking the cross icon is clicked while searching.
 * @param {string} menuHeight - The `menuHeight` of `select` element.
 * @param {Element} emptySearchComponent - The empty search component shown if no search result found in the menu search of the `select` element.
 * @param {Element} emptyOptionsComponent - The empty options component shown if no options in the menu of the `select` element.
 * @param {boolean} clearSelectionButton - If `clearSelectionButton` is true, it will show clear icon after an option is selected.
 * @returns {Element} The `select` element.
 */

const SelectField = (
  {
    id = '',
    selectHeight = null,
    label = '',
    name = '',
    optionMapFunction = null,
    onOptionSearch = null,
    options = [],
    required = false,
    placeholder = '',
    disabled = false,
    startIcon = null,
    endIcon = null,
    color = null,
    success = '',
    showErrorIcon = false,
    showSuccessIcon = false,
    helperText = '',
    iconInfo = null,
    searchable = false,
    searchInputPlaceholder = 'Search',
    menuHeight = '200px',
    emptySearchComponent = null,
    emptyOptionsComponent = null,
    clearSelectionButton = false,
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
        render={({ field: { ref, value, onBlur: defaultOnBlur, onChange: defaultOnChange } }) => {
          return (
            <Select
              ref={ref}
              id={id}
              selectHeight={selectHeight}
              label={label}
              name={name}
              value={options ? value : undefined}
              optionMapFunction={optionMapFunction}
              onOptionSearch={onOptionSearch}
              options={options}
              onChange={defaultOnChange}
              onBlur={defaultOnBlur}
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
              searchable={searchable}
              searchInputPlaceholder={searchInputPlaceholder}
              menuHeight={menuHeight}
              emptySearchComponent={emptySearchComponent}
              emptyOptionsComponent={emptyOptionsComponent}
              clearSelectionButton={clearSelectionButton}
              span={span}
            />
          );
        }}
      />
    );
  return null;
};

export default forwardRef(SelectField);
