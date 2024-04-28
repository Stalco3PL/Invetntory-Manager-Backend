import { useState, useEffect } from 'react';
import { useSelectedCustomer } from '../contexts/SelectedCustomerContext';
import { useLoading } from '../contexts/LoadingContext';
import { fetchInventory } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useInventoryData = () => {
    const [inventoryData, setInventoryData] = useState(null);
    const { selectedCustomer } = useSelectedCustomer();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedCustomer) return;
            startLoading();
            try {
                const data = await fetchInventory(selectedCustomer.customerId);
                setInventoryData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data:");
                navigate("/");
            } finally {
                stopLoading();
            }
        };

        fetchData();
    }, [selectedCustomer, startLoading, stopLoading, navigate]);

    return { inventoryData, isLoading };
};

export default useInventoryData;
