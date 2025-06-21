import { useContext } from 'react';
import { ProdutosContext } from '@/contexts/ProdutosContext';
import type { ProdutosContextType } from '@/contexts/ProdutosProvider';

export const useProdutosAPI = (): ProdutosContextType => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error('useProdutosContext must be used within ProdutosProvider');
  }
  return context;
};