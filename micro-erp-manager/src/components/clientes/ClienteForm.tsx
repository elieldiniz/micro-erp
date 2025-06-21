import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cliente, ClienteCadastro } from '@/model';
import { useClientesContext } from '@/contexts/ClientesContext';
import { formatarClientePayload } from '@/lib/formatarClientePayload';
export interface ClienteFormProps {
  cliente?: Cliente | null; // Para edição, recebe Cliente (com id)
  onClose: () => void;
}


const initialFormData = {
  nome: '',
  cpfCnpj: '',
  email: '',
  telefone: '',
  endereco: {
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    estado: ''
  }
};

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onClose }) => {
  const { addCliente, updateCliente } = useClientesContext();
  const [formData, setFormData] = useState(
    cliente
      ? {
          nome: cliente.nome,
          cpfCnpj: cliente.cpfCnpj,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco: {
            rua: cliente.endereco?.logradouro || '',
            numero: cliente.endereco?.numero || '',
            bairro: cliente.endereco?.bairro || '',
            cidade: cliente.endereco?.cidade || '',
            cep: cliente.endereco?.cep || '',
            estado: cliente.endereco?.uf || ''
          }
        }
      : initialFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = formatarClientePayload(formData);

    if (cliente && 'id' in cliente) {
      updateCliente(cliente.id, payload);
    } else {
      addCliente(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {cliente ? 'Editar Cliente' : 'Novo Cliente'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                <Input
                  id="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Endereço</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    value={formData.endereco.rua}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endereco: { ...formData.endereco, rua: e.target.value }
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={formData.endereco.numero}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endereco: { ...formData.endereco, numero: e.target.value }
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    value={formData.endereco.bairro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endereco: { ...formData.endereco, bairro: e.target.value }
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.endereco.cidade}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endereco: { ...formData.endereco, cidade: e.target.value }
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={formData.endereco.estado}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endereco: { ...formData.endereco, estado: e.target.value }
                      })
                    }
                    maxLength={2}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.endereco.cep}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      endereco: { ...formData.endereco, cep: e.target.value }
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {cliente ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteForm;