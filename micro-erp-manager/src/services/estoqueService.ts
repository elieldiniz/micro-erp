  import {
    EstoqueItem,
    MovimentacaoEstoque,
    MovimentacaoEstoqueAPI,
    MovimentacaoCadastro,
    EstoqueReportItem,
  } from '@/model';

  const API = 'http://localhost:3000/api';

  /* Helpers para conversão de tipos entre API e frontend */
  const toFrontTipo = (t: 'ENTRADA' | 'SAIDA'): 'entrada' | 'saida' =>
    t === 'ENTRADA' ? 'entrada' : 'saida';

  const toApiTipo = (t: 'entrada' | 'saida'): 'ENTRADA' | 'SAIDA' =>
    t === 'entrada' ? 'ENTRADA' : 'SAIDA';

  /* Mapeia dados da API para o formato do frontend */
  const mapMov = (m: MovimentacaoEstoqueAPI): MovimentacaoEstoque => ({
    id: m.id,
    produtoId: m.productId,
    produto: m.product,
    tipo: toFrontTipo(m.tipo),
    quantidade: m.quantidade,
    valorUnitario: m.valorUnitario ? Number(m.valorUnitario) : null,
    motivo: m.observacao,
    data: m.createdAt,
    usuario: m.createdBy,
  });

  /* Tipos para paginação */
  export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
  }

  export interface MovimentacoesResponse {
    data: MovimentacaoEstoque[];
    pagination: Pagination;
  }

  /** Busca todo o estoque */
  export async function fetchEstoque(token: string): Promise<EstoqueItem[]> {
    const res = await fetch(`${API}/stock/movements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao buscar estoque');
    const json: { data: EstoqueItem[] } = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  }

  /** Lista movimentações com paginação */
  export async function fetchMovimentacoes(
    token: string,
    page = 1,
    limit = 10
  ): Promise<MovimentacoesResponse> {
    const res = await fetch(`${API}/stock/movements?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao buscar movimentações');
    const json: {
      data: MovimentacaoEstoqueAPI[];
      pagination: Pagination;
    } = await res.json();

    return {
      data: Array.isArray(json.data) ? json.data.map(mapMov) : [],
      pagination: json.pagination,
    };
  }

  /** Movimentações de um produto específico */
  export async function fetchMovimentacoesByProduto(
    produtoId: string,
    token: string,
  ): Promise<MovimentacaoEstoque[]> {
    const res = await fetch(`${API}/stock/products/${produtoId}/movements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao buscar movimentações do produto');
    const json: { data: MovimentacaoEstoqueAPI[] } = await res.json();
    return Array.isArray(json.data) ? json.data.map(mapMov) : [];
  }

  /** Cria uma nova movimentação */
  export async function addMovimentacao(
    data: MovimentacaoCadastro,
    token: string,
  ): Promise<MovimentacaoEstoque> {
    const res = await fetch(`${API}/stock/movements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: data.produtoId,
        tipo: toApiTipo(data.tipo),
        quantidade: data.quantidade,
        observacao: data.motivo,
        valorUnitario: data.valorUnitario,
        // userId: data.userId, // descomente se necessário
      }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || 'Erro ao adicionar movimentação');
    return mapMov(json.data);
  }

  /** Atualiza estoque direto no produto */
  export async function updateProductStock(
    productId: string,
    quantidade: number,
    tipo: 'entrada' | 'saida',
    observacao: string | undefined,
    token: string,
  ): Promise<void> {
    const res = await fetch(`${API}/products/${productId}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantidade, tipo: toApiTipo(tipo), observacao }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Erro ao atualizar estoque');
    }
  }

  /** Busca relatório geral de estoque */
  export async function fetchEstoqueReport(token: string): Promise<EstoqueReportItem[]> {
    const res = await fetch(`${API}/stock/report`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao buscar relatório de estoque');
    const json: { data: EstoqueReportItem[] } = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  }