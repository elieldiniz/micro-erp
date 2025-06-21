
import { NotaFiscal } from '@/model';
import { mockClientes } from './mockClientes';
import { mockProdutos } from './mockProdutos';

export const mockNotasFiscais: NotaFiscal[] = [
  {
    id: '1',
    numero: 'NFE-001',
    clienteId: '1',
    cliente: mockClientes[0],
    itens: [
      {
        id: '1',
        produtoId: '1',
        produto: mockProdutos[0],
        quantidade: 1,
        precoUnitario: 2499.99,
        valorTotal: 2499.99
      }
    ],
    valorTotal: 2499.99,
    dataEmissao: '2024-01-20',
    status: 'emitida'
  }
];
