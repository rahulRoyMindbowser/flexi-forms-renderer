import React from 'react';

const FormHeader = ({ title = '' }) => {
  return (
    <div className="h-12 px-4 py-2 border-b border-solid border-gray-500 flex items-center">
      <p className="leading-6 text-xl">{title}</p>
    </div>
  );
};

export default FormHeader;
