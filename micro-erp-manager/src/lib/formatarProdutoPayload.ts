import { ProdutoCadastro } from '@/model';

export function formatarProdutoPayload(formData: ProdutoCadastro): ProdutoCadastro {
  return {
    nome: formData.nome.trim(),
    codigoBarras: formData.codigoBarras.replace(/\D/g, ''),
    ncm: formData.ncm.replace(/\D/g, ''),
    cfop: formData.cfop.replace(/\D/g, ''),
    preco: Number(formData.preco),
    estoqueAtual: Number(formData.estoqueAtual),
  };
}