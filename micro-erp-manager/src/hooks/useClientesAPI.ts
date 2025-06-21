import { useEffect } from 'react';
import { useClientesContext } from '@/contexts/ClientesContext';

export const useClientesAPI = () => {
  const context = useClientesContext();
  const { clientes, isLoading, fetchClientes } = context;

  useEffect(() => {
    if (clientes.length === 0 && !isLoading) {
      fetchClientes();
    }
  }, [clientes.length, isLoading, fetchClientes]);

  return context;
};