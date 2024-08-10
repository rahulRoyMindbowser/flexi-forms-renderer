// ExampleComponent.js
import React from 'react';
import { useToast } from './ToastContext';

const ExampleComponent = () => {
  const { showToast } = useToast();

  const handleClick = (msg, varient) => {
    showToast(msg, varient);
  };

  return (
    <div>
      <div className="mb-[10px]">
        <button
          onClick={() => {
            handleClick('This is a success message!', 'success');
          }}
        >
          Show Success Toast
        </button>
      </div>

      <div className="mb-[10px]">
        <button
          onClick={() => {
            handleClick('This is a error message!', 'error');
          }}
        >
          Show Error Toast
        </button>
      </div>

      <div className="mb-[10px]">
        <button
          onClick={() => {
            handleClick('This is a warning message!', 'warning');
          }}
        >
          Show Warning Toast
        </button>
      </div>

      <div className="mb-[10px]">
        <button
          onClick={() => {
            handleClick('This is a info message!', 'info');
          }}
        >
          Show Info Toast
        </button>
      </div>
    </div>
  );
};

export default ExampleComponent;
