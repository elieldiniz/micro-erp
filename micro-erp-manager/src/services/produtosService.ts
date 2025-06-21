import { Produto, ProdutoCadastro,ProdutosResponse,ProdutoAPI } from '@/model/produto';

const API_URL = 'http://localhost:3000/api/products';

// Busca todos os produtos
export const fetchProdutos = async (token: string): Promise<Produto[]> => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  const data: ProdutosResponse = await res.json();
  console.log('[fetchProdutos] Resposta da API:', data);

  if (Array.isArray(data.data)) {
    return data.data.map((produto: ProdutoAPI): Produto => ({
      id: produto.id,
      nome: produto.nome,
      codigoBarras: produto.codigoBarras,
      ncm: produto.ncm,
      cfop: produto.cfop,
      preco: Number(produto.preco),
      estoqueAtual: produto.estoqueAtual,
      dataCadastro: produto.createdAt
    }));
  }
  return [];
};
// Adiciona um novo produto
export const addProduto = async (
  produtoData: ProdutoCadastro,
  token: string
): Promise<Produto> => {
  console.log('[addProduto] Payload:', produtoData);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(produtoData)
  });
  console.log('[addProduto] Status:', res.status);
  const result = await res.json().catch(() => ({}));
  console.log('[addProduto] Resposta da API:', result);

  if (!res.ok) {
    throw new Error(
      'Erro ao adicionar produto: ' +
      (result?.error || result?.message || res.statusText)
    );
  }
  return result.data || result;
};

// Atualiza um produto existente
export const updateProduto = async (
  id: string,
  produtoData: ProdutoCadastro,
  token: string
): Promise<void> => {
  console.log('[updateProduto] ID:', id, 'Payload:', produtoData);
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(produtoData)
  });
  console.log('[updateProduto] Status:', res.status);
  const result = await res.json().catch(() => ({}));
  console.log('[updateProduto] Resposta da API:', result);

  if (!res.ok) {
    throw new Error(
      'Erro ao atualizar produto: ' +
      (result?.error || result?.message || res.statusText)
    );
  }
};

// Deleta um produto
export const deleteProduto = async (
  id: string,
  token: string
): Promise<void> => {
  console.log('[deleteProduto] ID:', id);
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('[deleteProduto] Status:', res.status);
  const result = await res.json().catch(() => ({}));
  console.log('[deleteProduto] Resposta da API:', result);

  if (!res.ok) {
    throw new Error(
      'Erro ao deletar produto: ' +
      (result?.error || result?.message || res.statusText)
    );
  }
};