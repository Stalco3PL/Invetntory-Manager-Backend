import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerData } from '../services/api';

interface SelectedCustomerContextType {
  selectedCustomer: CustomerData ;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerData >>;
}

const SelectedCustomerContext = createContext<SelectedCustomerContextType | undefined>(undefined);

export const useSelectedCustomer = () => {
  const context = useContext(SelectedCustomerContext);
  if (!context) {
    throw new Error('useSelectedCustomer must be used within a SelectedCustomerProvider');
  }
  return context;
};

interface SelectedCustomerProviderProps {
  children: React.ReactNode;
}

export const SelectedCustomerProvider: React.FC<SelectedCustomerProviderProps> = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData >(() => {
    const storedCustomer = localStorage.getItem('selectedCustomer');
    return storedCustomer ? JSON.parse(storedCustomer) : null;
  });

  useEffect(() => {
    if (selectedCustomer) {
      localStorage.setItem('selectedCustomer', JSON.stringify(selectedCustomer));
    } else {
      localStorage.removeItem('selectedCustomer');
    }
  }, [selectedCustomer]);

  return (
    <SelectedCustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </SelectedCustomerContext.Provider>
  );
};
