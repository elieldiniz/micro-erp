import { useContext } from 'react';
import NotasFiscaisContext, { NotasFiscaisContextType } from '@/contexts/NotasFiscaisProvider';

export const useNotasFiscaisContext = (): NotasFiscaisContextType => {
  const context = useContext(NotasFiscaisContext);
  if (!context) {
    throw new Error('useNotasFiscaisContext must be used within NotasFiscaisProvider');
  }
  return context;
};