import type { ProdutoSlim } from './produto';

export interface EstoqueReportItem {
  produtoId: string;
  produtoNome: string;
  quantidadeTotal: number;
  valorTotal: number;
}

export interface EstoqueItem {
  id: string;
  produtoId: string;
  produto: ProdutoSlim;
  quantidade: number;
  estoqueMinimo: number;
  estoqueMaximo: number;
  dataCadastro: string;
  dataAtualizacao: string;
  ultimaMovimentacao?: string;
}

export interface EstoqueReportResponse {
  data: EstoqueReportItem[];
}
