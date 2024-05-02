import { useState, useEffect } from 'react';
import { useSelectedCustomer } from '../contexts/SelectedCustomerContext';
import useLoading  from './useLoading';
import { fetchInventory } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useInventoryData = () => {
    const [inventoryData, setInventoryData] = useState(null);
    const { selectedCustomer } = useSelectedCustomer();
    const { isLoading : isInventoryLoading, startLoading : startInventoryLoad, stopLoading : stopInventoryLaod } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedCustomer) return;
            startInventoryLoad();
            try {
                const data = await fetchInventory(selectedCustomer.customerId);
                setInventoryData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data:");
                navigate("/");
            } finally {
                stopInventoryLaod();
            }
        };

        fetchData();
    }, [selectedCustomer, startInventoryLoad, stopInventoryLaod, navigate]);

    return { inventoryData, isInventoryLoading };
};

export default useInventoryData;
