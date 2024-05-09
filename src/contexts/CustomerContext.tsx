import React, { createContext, useContext, ReactNode } from 'react';
import useCustomersData from '../hooks/useCustomersData';
import { CustomerData } from '../services/api';

interface CustomerContextType {
  customersData: CustomerData[] | null;
  isCustomersLoading: boolean;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export const CustomersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { customersData, isCustomersLoading } = useCustomersData();

  return (
    <CustomerContext.Provider value={{ customersData, isCustomersLoading }}>
      {children}
    </CustomerContext.Provider>
  );
};
