
import { Cliente } from '@/model';

export const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    cpfCnpj: '123.456.789-10',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    endereco: {
      rua: 'Rua das Flores, 123',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      cep: '01234-567',
      estado: 'SP'
    },
    tipo: 'PF',
    dataCadastro: '2024-01-15'
  },
  {
    id: '2',
    nome: 'Empresa ABC Ltda',
    cpfCnpj: '12.345.678/0001-90',
    email: 'contato@empresaabc.com',
    telefone: '(11) 88888-8888',
    endereco: {
      rua: 'Av. Paulista, 1000',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      cep: '01310-100',
      estado: 'SP'
    },
    tipo: 'PJ',
    dataCadastro: '2024-01-16'
  }
];
