
import { EstoqueItem, MovimentacaoEstoque } from '@/model';
import { mockProdutos } from './mockProdutos';

export const mockEstoque: EstoqueItem[] = [
  {
    id: '1',
    produtoId: '1',
    produto: mockProdutos[0],
    quantidade: 15,
    quantidadeMinima: 5,
    ultimaMovimentacao: '2024-01-20'
  },
  {
    id: '2',
    produtoId: '2',
    produto: mockProdutos[1],
    quantidade: 3,
    quantidadeMinima: 10,
    ultimaMovimentacao: '2024-01-19'
  }
];

export const mockMovimentacoes: MovimentacaoEstoque[] = [
  {
    id: '1',
    produtoId: '1',
    produto: mockProdutos[0],
    tipo: 'entrada',
    quantidade: 10,
    motivo: 'Compra de fornecedor',
    data: '2024-01-20',
    usuario: 'Admin'
  },
  {
    id: '2',
    produtoId: '2',
    produto: mockProdutos[1],
    tipo: 'saida',
    quantidade: 2,
    motivo: 'Venda',
    data: '2024-01-19',
    usuario: 'Admin'
  }
];
