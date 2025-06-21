import React, {
  useReducer,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { ProdutosContext } from './ProdutosContext';
import { Produto, ProdutoCadastro } from '@/model';
import * as produtosService from '@/services/produtosService';
import { useAuth } from '@/contexts/AuthContext';

/* ------------------------------------------------------------------
   Tipagens
-------------------------------------------------------------------*/
export interface ProdutosContextType {
  produtos: Produto[];
  isLoading: boolean;
  error: string | null;
  fetchProdutos: () => Promise<void>;
  addProduto: (produto: ProdutoCadastro) => Promise<void>;
  updateProduto: (id: string, produto: ProdutoCadastro) => Promise<void>;
  deleteProduto: (id: string) => Promise<void>;
}

type ProdutosState = Omit<
  ProdutosContextType,
  'fetchProdutos' | 'addProduto' | 'updateProduto' | 'deleteProduto'
>;

type ProdutosAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Produto[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_PRODUTO'; payload: Produto }
  | { type: 'UPDATE_PRODUTO'; payload: { id: string; produto: ProdutoCadastro } }
  | { type: 'DELETE_PRODUTO'; payload: string };

/* ------------------------------------------------------------------
   Estado inicial e reducer
-------------------------------------------------------------------*/
const initialState: ProdutosState = {
  produtos: [],
  isLoading: false,
  error: null,
};

const produtosReducer = (
  state: ProdutosState,
  action: ProdutosAction,
): ProdutosState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, produtos: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'ADD_PRODUTO':
      return { ...state, produtos: [...state.produtos, action.payload] };

    case 'UPDATE_PRODUTO':
      return {
        ...state,
        produtos: state.produtos.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.produto } : p,
        ),
      };

    case 'DELETE_PRODUTO':
      return {
        ...state,
        produtos: state.produtos.filter((p) => p.id !== action.payload),
      };

    default:
      return state;
  }
};

/* ------------------------------------------------------------------
   Provider
-------------------------------------------------------------------*/
export const ProdutosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(produtosReducer, initialState);
  const { token } = useAuth();

  /* ---------------------- Ações ----------------------*/
  const fetchProdutos = useCallback(async () => {
    if (!token) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: 'Token de autenticação ausente.',
      });
      return;
    }

    dispatch({ type: 'FETCH_START' });

    try {
      const produtos = await produtosService.fetchProdutos(token);
      dispatch({ type: 'FETCH_SUCCESS', payload: produtos });
    } catch (error: unknown) {
      dispatch({
        type: 'FETCH_ERROR',
        payload:
          error instanceof Error ? error.message : 'Erro ao carregar produtos',
      });
    }
  }, [token]);

  const addProduto = useCallback(
    async (produtoData: ProdutoCadastro) => {
      if (!token) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: 'Token de autenticação ausente.',
        });
        return;
      }

      try {
        const produto = await produtosService.addProduto(produtoData, token);
        dispatch({ type: 'ADD_PRODUTO', payload: produto });
      } catch (error: unknown) {
        dispatch({
          type: 'FETCH_ERROR',
          payload:
            error instanceof Error ? error.message : 'Erro ao adicionar produto',
        });
      }
    },
    [token],
  );

  const updateProduto = useCallback(
    async (id: string, produtoData: ProdutoCadastro) => {
      if (!token) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: 'Token de autenticação ausente.',
        });
        return;
      }

      try {
        await produtosService.updateProduto(id, produtoData, token);
        dispatch({ type: 'UPDATE_PRODUTO', payload: { id, produto: produtoData } });
      } catch (error: unknown) {
        dispatch({
          type: 'FETCH_ERROR',
          payload:
            error instanceof Error ? error.message : 'Erro ao atualizar produto',
        });
      }
    },
    [token],
  );

  const deleteProduto = useCallback(
    async (id: string) => {
      if (!token) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: 'Token de autenticação ausente.',
        });
        return;
      }

      try {
        await produtosService.deleteProduto(id, token);
        dispatch({ type: 'DELETE_PRODUTO', payload: id });
      } catch (error: unknown) {
        dispatch({
          type: 'FETCH_ERROR',
          payload:
            error instanceof Error ? error.message : 'Erro ao deletar produto',
        });
      }
    },
    [token],
  );

  /* ------------------ Auto‑load on token ------------------*/
  useEffect(() => {
    if (token) fetchProdutos();
  }, [token, fetchProdutos]);

  /* ------------------ Memo para evitar re‑renders ---------*/
  const value = useMemo<ProdutosContextType>(
    () => ({
      produtos: state.produtos,
      isLoading: state.isLoading,
      error: state.error,
      fetchProdutos,
      addProduto,
      updateProduto,
      deleteProduto,
    }),
    [state, fetchProdutos, addProduto, updateProduto, deleteProduto],
  );

  return (
    <ProdutosContext.Provider value={value}>
      {children}
    </ProdutosContext.Provider>
  );
};
