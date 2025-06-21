import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Cliente, ClienteCadastro } from '@/model';
import * as clientesService from '@/services/clientesService';
import { useAuth } from '@/contexts/AuthContext';

interface ClientesState {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
}

interface ClientesContextType extends ClientesState {
  fetchClientes: () => Promise<void>;
  addCliente: (cliente: ClienteCadastro) => Promise<void>;
  updateCliente: (id: string, cliente: ClienteCadastro) => Promise<void>;
  deleteCliente: (id: string) => Promise<void>;
}

type ClientesAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Cliente[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_CLIENTE'; payload: Cliente }
  | { type: 'UPDATE_CLIENTE'; payload: { id: string; cliente: Partial<Cliente> } }
  | { type: 'DELETE_CLIENTE'; payload: string };

const initialState: ClientesState = {
  clientes: [],
  isLoading: false,
  error: null,
};

const clientesReducer = (state: ClientesState, action: ClientesAction): ClientesState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, clientes: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD_CLIENTE':
      return { ...state, clientes: [...state.clientes, action.payload] };
    case 'UPDATE_CLIENTE':
      return {
        ...state,
        clientes: state.clientes.map(cliente =>
          cliente.id === action.payload.id ? { ...cliente, ...action.payload.cliente } : cliente
        ),
      };
    case 'DELETE_CLIENTE':
      return {
        ...state,
        clientes: state.clientes.filter(cliente => cliente.id !== action.payload),
      };
    default:
      return state;
  }
};

const ClientesContext = createContext<ClientesContextType | undefined>(undefined);

export const useClientesContext = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error('useClientesContext must be used within ClientesProvider');
  }
  return context;
};

export const ClientesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(clientesReducer, initialState);
  const { token } = useAuth();

  const fetchClientes = async () => {
    if (!token) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Token de autenticação ausente.' });
      return;
    }
    dispatch({ type: 'FETCH_START' });
    try {
      const clientes = await clientesService.fetchClientes(token);
      dispatch({ type: 'FETCH_SUCCESS', payload: clientes });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao carregar clientes' });
    }
  };

  const addCliente = async (clienteData: ClienteCadastro) => {
    if (!token) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Token de autenticação ausente.' });
      return;
    }
    try {
      const cliente = await clientesService.addCliente(clienteData, token);
      dispatch({ type: 'ADD_CLIENTE', payload: cliente });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao adicionar cliente' });
    }
  };

  const updateCliente = async (id: string, clienteData: ClienteCadastro) => {
    if (!token) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Token de autenticação ausente.' });
      return;
    }
    try {
      await clientesService.updateCliente(id, clienteData, token);
      dispatch({ type: 'UPDATE_CLIENTE', payload: { id, cliente: clienteData } });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao atualizar cliente' });
    }
  };

  const deleteCliente = async (id: string) => {
    if (!token) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Token de autenticação ausente.' });
      return;
    }
    try {
      await clientesService.deleteCliente(id, token);
      dispatch({ type: 'DELETE_CLIENTE', payload: id });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao deletar cliente' });
    }
  };

  const value: ClientesContextType = {
    ...state,
    fetchClientes,
    addCliente,
    updateCliente,
    deleteCliente,
  };

  return <ClientesContext.Provider value={value}>{children}</ClientesContext.Provider>;
};