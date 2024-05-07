import { useState, useEffect } from 'react';
import useLoading from './useLoading';
import { fetchThreshold } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface ReplenishmentData {
    sku: string;
    clientId: string;
    clientName: string;
    flag?: boolean;
    threshold: string;
    qtyToReplenish?: number;
}

const useReplenishment = (): { replenishmentData: ReplenishmentData[] | null, isReplenishmentLoading: boolean, refetchReplenishmentData: () => void,     setReplenishmentData: React.Dispatch<React.SetStateAction<ReplenishmentData[] | null>>  } => {
    const [replenishmentData, setReplenishmentData] = useState<ReplenishmentData[] | null>(null);
    const { isLoading: isReplenishmentLoading, startLoading: startReplenishmentLoad, stopLoading: stopReplenishmentLoad } = useLoading();
    const navigate = useNavigate();

    const fetchData = async () => {
        startReplenishmentLoad();
        try {
            const data = await fetchThreshold();
            setReplenishmentData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data:");
            navigate("/");
        } finally {
            stopReplenishmentLoad();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetchReplenishmentData = () => {
        fetchData();
    };

    return { replenishmentData, isReplenishmentLoading, refetchReplenishmentData, setReplenishmentData };
};

export default useReplenishment;
