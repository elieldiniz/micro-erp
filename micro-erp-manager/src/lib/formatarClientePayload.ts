import { ClienteCadastro } from '@/model';

export function formatarClientePayload(formData: ClienteCadastro): ClienteCadastro {
  return {
    nome: formData.nome.trim(),
    cpfCnpj: formData.cpfCnpj.replace(/\D/g, ''),
    email: formData.email.trim().toLowerCase(),
    telefone: formData.telefone.replace(/\D/g, ''),
    endereco: {
      logradouro: formData.endereco.logradouro.trim(),
      numero: String(formData.endereco.numero).replace(/\D/g, ''),
      bairro: formData.endereco.bairro.trim(),
      cidade: formData.endereco.cidade.trim(),
      cep: formData.endereco.cep.replace(/\D/g, ''),
      uf: formData.endereco.uf.trim().toUpperCase().slice(0, 2),
    }
  };
}