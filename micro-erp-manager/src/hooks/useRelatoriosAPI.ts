
import { useEffect } from 'react';
import { useRelatoriosContext } from '@/contexts/RelatoriosContext';

export const useRelatoriosAPI = () => {
  const context = useRelatoriosContext();

  useEffect(() => {
    if (context.vendasData.length === 0 && !context.isLoading) {
      context.fetchRelatorios();
    }
  }, []);

  return context;
};
