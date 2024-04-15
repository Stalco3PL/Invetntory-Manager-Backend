import React, { createContext, useContext, useState } from 'react';
import { CustomerData } from '../services/api';

interface SelectedCustomerContextType {
  selectedCustomer: CustomerData | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerData | null>>;
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
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);

  return (
    <SelectedCustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </SelectedCustomerContext.Provider>
  );
};
