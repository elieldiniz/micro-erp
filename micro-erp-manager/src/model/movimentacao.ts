import { TipoMovimentacaoFront } from '@/enums/movimentacao';
import { ProdutoSlim } from './produto';

export interface MovimentacaoEstoqueAPI {
  id: string;
  productId: string;
  tipo: 'ENTRADA' | 'SAIDA';
  quantidade: number;
  valorUnitario: string | null;
  observacao: string;
  createdAt: string;
  createdBy: string | null;
  product: ProdutoSlim;
}

export interface MovimentacaoEstoque {
  id: string;
  produtoId: string;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  valorUnitario?: number | null;
  motivo: string;
  data: string;
  usuario: string | null;
  produto: ProdutoSlim;
}


export interface MovimentacaoCadastro {
  produtoId: string;
  tipo: TipoMovimentacaoFront;   // <-- use o enum aqui
  quantidade: number;
  motivo: string;
  valorUnitario?: number;
  userId?: string;
}


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
export interface MovimentacoesResponseAPI {
  data: MovimentacaoEstoqueAPI[];
  pagination: Pagination;
}