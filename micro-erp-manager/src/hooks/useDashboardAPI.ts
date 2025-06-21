
import { useEffect } from 'react';
import { useDashboardContext } from '@/contexts/DashboardContext';

export const useDashboardAPI = () => {
  const context = useDashboardContext();

  useEffect(() => {
    if (!context.isLoading && context.metrics.totalProdutos === 0) {
      context.fetchMetrics();
    }
  }, []);

  return context;
};
