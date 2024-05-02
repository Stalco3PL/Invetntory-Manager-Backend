import { useState } from 'react';

interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

function useLoading(): LoadingState {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = (): void => {
    setIsLoading(true);
  };

  const stopLoading = (): void => {
    setIsLoading(false);
  };

  return {
    isLoading,
    startLoading,
    stopLoading
  };
}

export default useLoading;
