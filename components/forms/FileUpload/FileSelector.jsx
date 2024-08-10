import React, { useState, useCallback } from 'react';
import { spanMap } from '../../../helper';

const FileSelector = ({
  id,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  maxFiles = 5,
  maxFileSize = 5242880, // 5 MB
  allowedFileExtensions = [], // Array of allowed file extensions
  onChange,
  error,
  helperText,
  showErrorIcon = false,
  span,
}) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState(null);

  // Converts file to base64
  const convertFileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Validates file size and extensions
  const validateFile = file => {
    if (file.size > maxFileSize) {
      return `File size exceeds ${maxFileSize / (1024 * 1024)} MB`;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (allowedFileExtensions.length > 0 && !allowedFileExtensions.includes(fileExtension)) {
      return `File type .${fileExtension} is not allowed`;
    }

    return null;
  };

  const handleDrop = useCallback(
    async event => {
      event.preventDefault();
      setDragging(false);
      setFileError(null);

      const newFiles = Array.from(event.dataTransfer.files);
      const totalFiles = newFiles.length + files.length;

      if (totalFiles > maxFiles) {
        setFileError(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const validFiles = [];
      for (const file of newFiles) {
        const error = validateFile(file);
        if (error) {
          setFileError(error);
          return;
        }

        const base64File = await convertFileToBase64(file);
        validFiles.push({ file, base64: base64File });
      }

      setFiles(prevFiles => [...prevFiles, ...validFiles]);
      onChange && onChange(validFiles, name);
    },
    [files, maxFiles, maxFileSize, allowedFileExtensions, onChange, name],
  );

  const handleFileInputChange = async event => {
    if (event.target.files) {
      setFileError(null);
      const newFiles = Array.from(event.target.files);
      const totalFiles = newFiles.length + files.length;

      if (totalFiles > maxFiles) {
        setFileError(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const validFiles = [];
      for (const file of newFiles) {
        const error = validateFile(file);
        if (error) {
          setFileError(error);
          return;
        }

        const base64File = await convertFileToBase64(file);
        validFiles.push({ file, base64: base64File });
      }

      setFiles(prevFiles => [...prevFiles, ...validFiles]);
      onChange && onChange(validFiles, name);
    }
  };

  const handleClick = () => {
    document.getElementById(id).click();
  };
  const revalidateFiles = files => {
    for (const file of files) {
      const error = validateFile(file.file);
      if (error) {
        setFileError(error);
        return;
      }
    }
    setFileError(null);
  };

  const removeFile = index => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    revalidateFiles(newFiles);
    onChange && onChange(newFiles, name);
  };

  return (
    <div className="flex flex-col gap-3" style={{ width: spanMap(span) }}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
          {required && <span className="text-red-700"> *</span>}
        </label>
      )}
      <div
        onDrop={handleDrop}
        onDragOver={e => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onClick={handleClick}
        className="relative h-20 flex items-center justify-center rounded-lg cursor-pointer border border-dashed p-3 "
        style={{
          borderColor: dragging ? 'green' : 'gray',
        }}
      >
        <input
          id={id}
          name={name}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
          disabled={disabled}
        />
        {files.length === 0 ? (
          <p>{placeholder}</p>
        ) : (
          <div>
            <p>Files selected:</p>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.file.name}{' '}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {(fileError || error) && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {fileError || error}
            {showErrorIcon && ' ❌'}
          </div>
        )}
        {helperText && <div style={{ marginTop: '5px' }}>{helperText}</div>}
      </div>
    </div>
  );
};

export default FileSelector;
