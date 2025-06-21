
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { RelatorioVendas, RelatorioProdutos, RelatorioClientes } from '@/hooks/useRelatorios';
import * as relatoriosService from '@/services/relatoriosService';

interface RelatoriosState {
  vendasData: RelatorioVendas[];
  produtosData: RelatorioProdutos[];
  clientesData: RelatorioClientes[];
  isLoading: boolean;
  error: string | null;
}

interface RelatoriosContextType extends RelatoriosState {
  fetchRelatorios: () => Promise<void>;
}

type RelatoriosAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { vendas: RelatorioVendas[]; produtos: RelatorioProdutos[]; clientes: RelatorioClientes[] } }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: RelatoriosState = {
  vendasData: [],
  produtosData: [],
  clientesData: [],
  isLoading: false,
  error: null,
};

const relatoriosReducer = (state: RelatoriosState, action: RelatoriosAction): RelatoriosState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        vendasData: action.payload.vendas,
        produtosData: action.payload.produtos,
        clientesData: action.payload.clientes,
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const RelatoriosContext = createContext<RelatoriosContextType | undefined>(undefined);

export const useRelatoriosContext = () => {
  const context = useContext(RelatoriosContext);
  if (!context) {
    throw new Error('useRelatoriosContext must be used within RelatoriosProvider');
  }
  return context;
};

export const RelatoriosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(relatoriosReducer, initialState);

  const fetchRelatorios = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const relatorios = await relatoriosService.fetchRelatorios();
      dispatch({ type: 'FETCH_SUCCESS', payload: relatorios });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao carregar relatórios' });
    }
  };

  const value: RelatoriosContextType = {
    ...state,
    fetchRelatorios,
  };

  return <RelatoriosContext.Provider value={value}>{children}</RelatoriosContext.Provider>;
};
