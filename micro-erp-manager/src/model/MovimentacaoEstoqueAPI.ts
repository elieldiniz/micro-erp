import { TipoMovimentacaoApi } from '@/enums/movimentacao';

export interface MovimentacaoEstoqueAPI {
  id: string;
  productId: string;
  tipo: TipoMovimentacaoApi; // usa o enum direto
  quantidade: number;
  valorUnitario: string | null;
  observacao: string;
  createdAt: string;
  createdBy: string | null;
  product: ProdutoSlim;
}
export interface ProdutoSlim {
  id: string;
  nome: string;
  codigo: string;
  unidadeMedida: string;
}