export interface Produto {
  id: string;
  nome: string;
  codigoBarras: string;
  ncm: string;
  cfop: string;
  preco: number;
  estoqueAtual: number;
  dataCadastro: string;
}

export interface ProdutoCadastro {
  nome: string;
  codigoBarras: string;
  ncm: string;
  cfop: string;
  preco: number;
  estoqueAtual: number;
}

export interface ProdutoAPI {
  id: string;
  nome: string;
  codigoBarras: string;
  ncm: string;
  cfop: string;
  preco: string;
  estoqueAtual: number;
  createdAt: string;
}

export interface ProdutosResponse {
  success: boolean;
  data: ProdutoAPI[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/* Versão compacta usada em movimentações */
export interface ProdutoSlim {
  id: string;
  nome: string;
  codigoBarras: string;
}
