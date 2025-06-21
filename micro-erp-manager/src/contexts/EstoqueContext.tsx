import { createContext, useContext } from 'react';
import type { EstoqueContextType } from './EstoqueProvider';

export const EstoqueContext = createContext<EstoqueContextType | undefined>(undefined);

export const useEstoqueContext = (): EstoqueContextType => {
  const context = useContext(EstoqueContext);
  if (!context) {
    throw new Error('useEstoqueContext deve ser usado dentro de EstoqueProvider');
  }
  return context;
};