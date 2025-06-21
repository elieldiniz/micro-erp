import React, { useReducer, useCallback, ReactNode, useEffect } from 'react';
import { EstoqueItem, MovimentacaoEstoque, MovimentacaoCadastro } from '@/model';
import * as estoqueService from '@/services/estoqueService';
import { useAuth } from '@/contexts/AuthContext';
import { EstoqueContext } from '@/contexts/EstoqueContext';

export interface EstoqueContextType {
  estoque: EstoqueItem[];
  movimentacoes: MovimentacaoEstoque[];
  isLoadingEstoque: boolean;
  isLoadingMovimentacoes: boolean;
  errorEstoque: string | null;
  errorMovimentacoes: string | null;

  fetchEstoque: () => Promise<void>;
  fetchMovimentacoes: () => Promise<void>;
  addMovimentacao: (mov: MovimentacaoCadastro) => Promise<void>;
}

type EstoqueState = {
  estoque: EstoqueItem[];
  movimentacoes: MovimentacaoEstoque[];
  isLoadingEstoque: boolean;
  isLoadingMovimentacoes: boolean;
  errorEstoque: string | null;
  errorMovimentacoes: string | null;
};

type EstoqueAction =
  | { type: 'FETCH_ESTOQUE_START' }
  | { type: 'FETCH_ESTOQUE_SUCCESS'; payload: EstoqueItem[] }
  | { type: 'FETCH_ESTOQUE_ERROR'; payload: string }
  | { type: 'FETCH_MOVS_START' }
  | { type: 'FETCH_MOVS_SUCCESS'; payload: MovimentacaoEstoque[] }
  | { type: 'FETCH_MOVS_ERROR'; payload: string }
  | { type: 'ADD_MOVIMENTACAO'; payload: MovimentacaoEstoque };

const initialState: EstoqueState = {
  estoque: [],
  movimentacoes: [],
  isLoadingEstoque: false,
  isLoadingMovimentacoes: false,
  errorEstoque: null,
  errorMovimentacoes: null,
};

const estoqueReducer = (state: EstoqueState, action: EstoqueAction): EstoqueState => {
  switch (action.type) {
    case 'FETCH_ESTOQUE_START':
      return { ...state, isLoadingEstoque: true, errorEstoque: null };
    case 'FETCH_ESTOQUE_SUCCESS':
      return { ...state, isLoadingEstoque: false, estoque: action.payload };
    case 'FETCH_ESTOQUE_ERROR':
      return { ...state, isLoadingEstoque: false, errorEstoque: action.payload };
    case 'FETCH_MOVS_START':
      return { ...state, isLoadingMovimentacoes: true, errorMovimentacoes: null };
    case 'FETCH_MOVS_SUCCESS':
      return { ...state, isLoadingMovimentacoes: false, movimentacoes: action.payload };
    case 'FETCH_MOVS_ERROR':
      return { ...state, isLoadingMovimentacoes: false, errorMovimentacoes: action.payload };
    case 'ADD_MOVIMENTACAO':
      return {
        ...state,
        movimentacoes: [action.payload, ...state.movimentacoes],
      };
    default:
      return state;
  }
};

export const EstoqueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(estoqueReducer, initialState);
  const { token } = useAuth();

  const fetchEstoque = useCallback(async () => {
    if (!token) return;
    dispatch({ type: 'FETCH_ESTOQUE_START' });
    try {
      const estoque = await estoqueService.fetchEstoque(token);
      dispatch({ type: 'FETCH_ESTOQUE_SUCCESS', payload: estoque });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar estoque';
      dispatch({ type: 'FETCH_ESTOQUE_ERROR', payload: message });
    }
  }, [token]);

const fetchMovimentacoes = useCallback(async () => {
  if (!token) return;
  dispatch({ type: 'FETCH_MOVS_START' });
  try {
    const response = await estoqueService.fetchMovimentacoes(token);
    dispatch({ type: 'FETCH_MOVS_SUCCESS', payload: response.data }); // <-- só o array aqui
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao carregar movimentações';
    dispatch({ type: 'FETCH_MOVS_ERROR', payload: message });
  }
}, [token]);
  const addMovimentacao = useCallback(
    async (mov: MovimentacaoCadastro) => {
      if (!token) return;
      try {
        const novaMov = await estoqueService.addMovimentacao(mov, token);
        dispatch({ type: 'ADD_MOVIMENTACAO', payload: novaMov });
      } catch (error: unknown) {
        // Aqui você pode tratar erro específico ou usar um estado global de erro
        console.error('Erro ao adicionar movimentação:', error);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      fetchEstoque();
      fetchMovimentacoes();
    }
  }, [token, fetchEstoque, fetchMovimentacoes]);

  return (
    <EstoqueContext.Provider
      value={{
        estoque: state.estoque,
        movimentacoes: state.movimentacoes,
        isLoadingEstoque: state.isLoadingEstoque,
        isLoadingMovimentacoes: state.isLoadingMovimentacoes,
        errorEstoque: state.errorEstoque,
        errorMovimentacoes: state.errorMovimentacoes,
        fetchEstoque,
        fetchMovimentacoes,
        addMovimentacao,
      }}
    >
      {children}
    </EstoqueContext.Provider>
  );
};