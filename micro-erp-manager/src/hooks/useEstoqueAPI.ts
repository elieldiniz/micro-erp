// hooks/useEstoqueAPI.ts
import { useContext } from 'react';
import { EstoqueContext } from '@/contexts/EstoqueContext';
import type { EstoqueContextType } from '@/contexts/EstoqueProvider';

export const useEstoqueAPI = (): EstoqueContextType => {
  const context = useContext(EstoqueContext);
  if (!context) {
    throw new Error('useEstoqueContext must be used within EstoqueProvider');
  }
  return context;
};
