// src/services/clientesService.ts
import { Cliente, ClienteCadastro } from '@/model/cliente';

const API_URL = 'http://localhost:3000/api/clients';

// Busca todos os clientes
export const fetchClientes = async (token: string): Promise<Cliente[]> => {
  console.log('[fetchClientes] Token:', token);
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('[fetchClientes] Status:', res.status);
  if (!res.ok) throw new Error('Erro ao buscar clientes');
  const data = await res.json();
  console.log('[fetchClientes] Resposta da API:', data);

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.clients)) return data.clients;
  if (Array.isArray(data.data)) return data.data;
  return [];
};

// Adiciona um novo cliente
export const addCliente = async (
  clienteData: ClienteCadastro,
  token: string
): Promise<Cliente> => {
  console.log('[addCliente] Payload:', clienteData);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(clienteData)
  });
  console.log('[addCliente] Status:', res.status);
  const result = await res.json().catch(() => ({}));
  console.log('[addCliente] Resposta da API:', result);

  if (!res.ok) {
    throw new Error(
      'Erro ao adicionar cliente: ' +
      (result?.error || result?.message || res.statusText)
    );
  }
  return result.data || result;
};

// Atualiza um cliente existente
export const updateCliente = async (
  id: string,
  clienteData: ClienteCadastro,
  token: string
): Promise<void> => {
  console.log('[updateCliente] ID:', id, 'Payload:', clienteData);
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(clienteData)
  });
  console.log('[updateCliente] Status:', res.status);
  const result = await res.json().catch(() => ({}));
  console.log('[updateCliente] Resposta da API:', result);

  if (!res.ok) {
    throw new Error(
      'Erro ao atualizar cliente: ' +
      (result?.error || result?.message || res.statusText)
    );
  }
};

// Deleta um cliente
export const deleteCliente = async (
  id: string,
  token: string
): Promise<void> => {
  console.log('[deleteCliente] ID:', id);
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('[deleteCliente] Status:', res.status);
  const result = await res.json().catch(() => ({}));
  console.log('[deleteCliente] Resposta da API:', result);

  if (!res.ok) {
    throw new Error(
      'Erro ao deletar cliente: ' +
      (result?.error || result?.message || res.statusText)
    );
  }
};