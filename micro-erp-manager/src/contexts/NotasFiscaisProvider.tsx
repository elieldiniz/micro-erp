import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { NotaFiscal } from '@/model';
import * as notasFiscaisService from '@/services/notasFiscaisService';

interface NotasFiscaisState {
  notasFiscais: NotaFiscal[];
  isLoading: boolean;
  error: string | null;
}

export interface NotasFiscaisContextType extends NotasFiscaisState {
  fetchNotasFiscais: () => Promise<void>;
  addNotaFiscal: (nota: Omit<NotaFiscal, 'id' | 'numero' | 'dataEmissao' | 'status'>) => Promise<void>;
  cancelarNotaFiscal: (id: string) => Promise<void>;
  baixarDanfePdf: (id: string) => Promise<Blob>;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: NotaFiscal[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_START' }
  | { type: 'ADD_SUCCESS'; payload: NotaFiscal }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'CANCEL_START' }
  | { type: 'CANCEL_SUCCESS'; payload: string }
  | { type: 'CANCEL_ERROR'; payload: string };

const initialState: NotasFiscaisState = {
  notasFiscais: [],
  isLoading: false,
  error: null,
};

const reducer = (state: NotasFiscaisState, action: Action): NotasFiscaisState => {
  switch (action.type) {
    case 'FETCH_START':
    case 'ADD_START':
    case 'CANCEL_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, notasFiscais: action.payload };
    case 'ADD_SUCCESS':
      return { ...state, isLoading: false, notasFiscais: [action.payload, ...state.notasFiscais] };
    case 'CANCEL_SUCCESS':
      return {
        ...state,
        isLoading: false,
        notasFiscais: state.notasFiscais.map(nota =>
          nota.id === action.payload ? { ...nota, status: 'CANCELADA' } : nota
        ),
      };
    case 'FETCH_ERROR':
    case 'ADD_ERROR':
    case 'CANCEL_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const NotasFiscaisContext = createContext<NotasFiscaisContextType | undefined>(undefined);

export const NotasFiscaisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNotasFiscais = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const notas = await notasFiscaisService.fetchNotasFiscais();
      dispatch({ type: 'FETCH_SUCCESS', payload: notas });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar notas fiscais';
      dispatch({ type: 'FETCH_ERROR', payload: message });
    }
  }, []);

  const addNotaFiscal = async (notaData: Omit<NotaFiscal, 'id' | 'numero' | 'dataEmissao' | 'status'>) => {
    dispatch({ type: 'ADD_START' });
    try {
      const nota = await notasFiscaisService.emitirNotaFiscal(
        notaData.clientId,
        notaData.items.map(item => ({
          productId: item.produtoId,
          quantidade: item.quantidade,
          valorUnitario: item.precoUnitario,
        })),
      );
      dispatch({ type: 'ADD_SUCCESS', payload: nota });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao adicionar nota fiscal';
      dispatch({ type: 'ADD_ERROR', payload: message });
    }
  };

  const cancelarNotaFiscal = async (id: string) => {
    dispatch({ type: 'CANCEL_START' });
    try {
      // Simula cancelamento
      await new Promise(resolve => setTimeout(resolve, 500));
      // Aqui você pode chamar o serviço real de cancelamento se existir
      dispatch({ type: 'CANCEL_SUCCESS', payload: id });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao cancelar nota fiscal';
      dispatch({ type: 'CANCEL_ERROR', payload: message });
    }
  };

  const baixarDanfePdf = async (id: string): Promise<Blob> => {
    try {
      const pdfBlob = await notasFiscaisService.baixarDanfePdf(id);
      return pdfBlob;
    } catch {
      throw new Error('Erro ao baixar PDF da DANFE');
    }
  };

  const value: NotasFiscaisContextType = {
    ...state,
    fetchNotasFiscais,
    addNotaFiscal,
    cancelarNotaFiscal,
    baixarDanfePdf,
  };

  return <NotasFiscaisContext.Provider value={value}>{children}</NotasFiscaisContext.Provider>;
};

export default NotasFiscaisContext;