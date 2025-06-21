
import { Produto } from '@/model';

export const mockProdutos: Produto[] = [
  {
    id: '1',
    codigo: 'PROD001',
    nome: 'Notebook Dell Inspiron',
    descricao: 'Notebook Dell Inspiron 15 3000, Intel Core i5, 8GB RAM, 256GB SSD',
    preco: 2499.99,
    categoria: 'Informática',
    unidade: 'UN',
    dataCadastro: '2024-01-15'
  },
  {
    id: '2',
    codigo: 'PROD002',
    nome: 'Mouse Sem Fio Logitech',
    descricao: 'Mouse óptico sem fio com receptor USB',
    preco: 89.99,
    categoria: 'Acessórios',
    unidade: 'UN',
    dataCadastro: '2024-01-16'
  },
  {
    id: '3',
    codigo: 'PROD003',
    nome: 'Teclado Mecânico Gamer',
    descricao: 'Teclado mecânico RGB com switches blue',
    preco: 299.99,
    categoria: 'Periféricos',
    unidade: 'UN',
    dataCadastro: '2024-01-17'
  }
];
