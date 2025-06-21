
import { RelatorioVendas, RelatorioProdutos, RelatorioClientes } from '@/hooks/useRelatorios';

const mockVendas: RelatorioVendas[] = [
  { mes: 'Jan', vendas: 12, valor: 15000 },
  { mes: 'Fev', vendas: 18, valor: 22000 },
  { mes: 'Mar', vendas: 15, valor: 18500 },
  { mes: 'Abr', vendas: 22, valor: 28000 },
  { mes: 'Mai', vendas: 20, valor: 25000 },
  { mes: 'Jun', vendas: 25, valor: 32000 }
];

const mockProdutos: RelatorioProdutos[] = [
  { produto: 'Notebook Dell', quantidade: 15, valor: 37499.85 },
  { produto: 'Mouse Logitech', quantidade: 45, valor: 4049.55 },
  { produto: 'Teclado Gamer', quantidade: 28, valor: 8399.72 }
];

const mockClientes: RelatorioClientes[] = [
  { cliente: 'João Silva', compras: 5, valor: 12500 },
  { cliente: 'Empresa ABC', compras: 8, valor: 24000 },
  { cliente: 'Maria Santos', compras: 3, valor: 7500 }
];

export const fetchRelatorios = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    vendas: mockVendas,
    produtos: mockProdutos,
    clientes: mockClientes
  };
};
