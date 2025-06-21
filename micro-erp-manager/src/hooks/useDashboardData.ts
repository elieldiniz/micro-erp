
import { useState, useEffect } from 'react';
import { DashboardMetrics } from '@/model';

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalProdutos: 0,
    totalClientes: 0,
    valorEstoque: 0,
    notasFiscaisEmitidas: 0,
    produtosEstoqueBaixo: 0,
    vendasMes: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = () => {
      setTimeout(() => {
        setMetrics({
          totalProdutos: 245,
          totalClientes: 89,
          valorEstoque: 125000,
          notasFiscaisEmitidas: 34,
          produtosEstoqueBaixo: 7,
          vendasMes: 45280
        });
        setIsLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  return { metrics, isLoading };
};
