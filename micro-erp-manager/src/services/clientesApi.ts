// src/services/clientesService.ts
import { Cliente } from '@/model/cliente';

const API_URL = 'http://localhost:3000/api/clients';

// Busca todos os clientes
export const fetchClientes = async (token: string): Promise<Cliente[]> => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erro ao buscar clientes');
  return res.json();
};

// Adiciona um novo cliente
export const addCliente = async (
  clienteData: Omit<Cliente, 'id' | 'dataCadastro'>,
  token: string
): Promise<Cliente> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(clienteData)
  });
  if (!res.ok) throw new Error('Erro ao adicionar cliente');
  return res.json();
};

// Atualiza um cliente existente
export const updateCliente = async (
  id: string,
  clienteData: Partial<Cliente>,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(clienteData)
  });
  if (!res.ok) throw new Error('Erro ao atualizar cliente');
};

// Deleta um cliente
export const deleteCliente = async (
  id: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erro ao deletar cliente');
};