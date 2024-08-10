import React from 'react';

const FormStepper = ({ details = [], page = 0, onPageChange }) => {
  const done = (
    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
    </span>
  );
  return (
    <div className="p-4 border-b border-solid border-gray-500">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {details.map((x, i) =>
          details.length - 1 === i ? (
            <li key={x?.name} className="flex items-center" onClick={() => onPageChange(i)}>
              {/* {page === i ? done : null} */}
              <span
                className={`h-8 w-8 rounded-full cursor-pointer flex items-center justify-center me-2 ${
                  page === i ? 'bg-gray-200 border-2 border-gray-400' : ''
                }`}
              >
                {i + 1}
              </span>
            </li>
          ) : (
            <li
              key={x?.name}
              className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-4 ${
                page > i ? 'text-white after:border-blue-500' : 'after:border-gray-200'
              }`}
              onClick={() => onPageChange(i)}
            >
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-800">
                <span
                  className={`h-8 w-8 rounded-full cursor-pointer flex items-center justify-center ${
                    page > i
                      ? 'bg-blue-600'
                      : page === i
                      ? 'bg-gray-200 border-2 border-gray-400'
                      : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </span>
              </span>
            </li>
          ),
        )}
      </ol>
    </div>
  );
};

export default FormStepper;
