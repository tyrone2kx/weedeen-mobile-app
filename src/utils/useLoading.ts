import { useCallback, useState } from 'react';

export interface ILoader {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);
  return {
    loading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
