import React, { useEffect, useState } from 'react';
import { useSelectedCustomer } from '../contexts/SelectedCustomerContext'; // Adjust the path as needed
import { useLoading } from '../contexts/LoadingContext';
import { fetchInventory } from "../services/api";
import Loader from '../components/Loader';

const CustomerDashboard: React.FC = () => {
  const { selectedCustomer } = useSelectedCustomer();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [inventoryData, setInventoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      try {
        const data = await fetchInventory(selectedCustomer?.customerId);
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [selectedCustomer]); 
  return (
    <div>
      <h1>{selectedCustomer?.companyName}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {inventoryData ? (
            <div>

              <p>Item Name: {inventoryData}</p>
            </div>
          ) : (
            <p>No inventory data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
