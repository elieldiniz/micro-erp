import type { Cliente } from './cliente';
import type { Produto } from './produto';

export interface NotaFiscal {
  id: string;
  numero: number | string;
  clientId: string;
  client: Cliente;
  items: ItemNotaFiscal[];
  valorTotal: string;
  dataEmissao: string;
  status: 'PENDENTE' | 'EMITIDA' | 'CANCELADA' | 'REJEITADA';
}

export interface ItemNotaFiscal {
  id: string;
  produtoId: string;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  valorTotal: number;
}
