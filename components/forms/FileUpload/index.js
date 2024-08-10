import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FileSelector from './FileSelector';

/**
 * FileSelector field with form control.
 *
 * @param {string} id - The `id` of the file input element.
 * @param {string} name - The `name` of the file input element.
 * @param {string} label - The `label` for the file selector.
 * @param {boolean} disabled - If `true`, the file selector will be disabled.
 * @param {string} placeholder - The placeholder text displayed when no files are selected.
 * @param {function} onChange - Function triggered when files are selected or removed.
 * @param {function} onBlur - Function triggered when the file selector is blurred.
 * @param {function} onDragOver - Function triggered when dragging files over the file selector.
 * @param {function} onDragLeave - Function triggered when dragging leaves the file selector.
 * @param {boolean} showErrorIcon - If `true`, an error icon will be shown.
 * @param {string} error - Error message to display if there is an error.
 * @param {boolean} required - If `true`, the file selector is required.
 * @param {number} maxFiles - Maximum number of files that can be selected.
 * @param {number} maxFileSize - Maximum file size in bytes.
 * @param {Array<string>} allowedFileExtensions - Array of allowed file extensions.
 * @returns {JSX.Element} The `FileSelector` component wrapped with a form controller.
 */
const FileUpload = ({
  id = '',
  name = '',
  label = '',
  disabled = false,
  placeholder = 'Drag & Drop files here or click to select files',
  onChange = () => null,
  onBlur = () => null,
  onDragOver = () => null,
  onDragLeave = () => null,
  showErrorIcon = false,
  error = '',
  required = false,
  maxFiles = 5,
  maxFileSize = 5242880,
  allowedFileExtensions = [],
  span,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (error) {
      // Handle error state if needed
    }
  }, [error]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onBlur: defaultOnBlur, onChange: defaultOnChange } }) => (
        <FileSelector
          id={id}
          name={name}
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          onChange={files => {
            defaultOnChange(files);
            onChange && onChange(files);
          }}
          onBlur={e => {
            defaultOnBlur(e);
            onBlur && onBlur(e);
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          showErrorIcon={showErrorIcon}
          error={errors[name]?.message || error}
          required={required}
          maxFiles={maxFiles}
          maxFileSize={maxFileSize}
          allowedFileExtensions={allowedFileExtensions}
          span={span}
        />
      )}
    />
  );
};

export default FileUpload;
