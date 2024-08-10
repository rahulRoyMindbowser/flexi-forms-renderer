// ToastContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import ToastMessage from './ToastMessage';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    variant: '',
    visible: false,
  });

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const showToast = (message, variant) => {
    setToast({ message, variant, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.visible && <ToastMessage message={toast.message} variant={toast.variant} />}
    </ToastContext.Provider>
  );
};
