// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import useInventoryData from '../hooks/useInventoryData';

// interface InventoryDataContextProps {
//   children: ReactNode;
// }

// interface InventoryContextType {
//   inventoryData: any | null;
//   isInventoryLoading: boolean;
// }

// const InventoryDataContext = createContext<InventoryContextType | undefined>(undefined);

// export const useInventoryDataContext = () => {
//   const context = useContext(InventoryDataContext);
//   if (!context) {
//     throw new Error('useInventoryDataContext must be used within an InventoryDataProvider');
//   }
//   return context;
// };

// export const InventoryDataProvider: React.FC<InventoryDataContextProps> = ({ children }) => {
//   const [inventoryData, isInventoryLoading] = useInventoryData();

//   return (
//     <InventoryDataContext.Provider value={{ inventoryData, isInventoryLoading }}>
//       {children}
//     </InventoryDataContext.Provider>
//   );
// };
