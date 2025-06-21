export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  tipoDocumento: 'CPF' | 'CNPJ';
  email: string;
  telefone: string;
  inscricaoEstadual: string | null;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    uf: string;
  };
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteCadastro {
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    uf: string;
  };
}
