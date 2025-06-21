
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DashboardMetrics } from '@/model';

interface DashboardState {
  metrics: DashboardMetrics;
  isLoading: boolean;
  error: string | null;
}

interface DashboardContextType extends DashboardState {
  fetchMetrics: () => Promise<void>;
}

type DashboardAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: DashboardMetrics }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: DashboardState = {
  metrics: {
    totalProdutos: 0,
    totalClientes: 0,
    valorEstoque: 0,
    notasFiscaisEmitidas: 0,
    produtosEstoqueBaixo: 0,
    vendasMes: 0,
  },
  isLoading: false,
  error: null,
};

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, metrics: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const fetchMetrics = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      // Simulação de chamada à API - aqui você pode adicionar a lógica real
      const metrics: DashboardMetrics = {
        totalProdutos: 0,
        totalClientes: 0,
        valorEstoque: 0,
        notasFiscaisEmitidas: 0,
        produtosEstoqueBaixo: 0,
        vendasMes: 0,
      };
      dispatch({ type: 'FETCH_SUCCESS', payload: metrics });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao carregar métricas' });
    }
  };

  const value: DashboardContextType = {
    ...state,
    fetchMetrics,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
