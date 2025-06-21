import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EstoqueItem } from '@/model/estoque';
import { useEstoqueContext } from '@/contexts/EstoqueContext';
import { useAuth } from '@/contexts/AuthContext';
import { TipoMovimentacaoFront } from '@/enums/movimentacao';

interface MovimentacaoFormProps {
  estoque: EstoqueItem[];
  onClose: () => void;
}

const MovimentacaoForm = ({ estoque, onClose }: MovimentacaoFormProps) => {
  const { addMovimentacao } = useEstoqueContext();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    produtoId: '',
    tipo: 'entrada' as 'entrada' | 'saida',
    quantidade: 1,
    motivo: ''
  });

  const selectedProduto = estoque.find(item => item.produtoId === formData.produtoId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduto) return;
    if (!user?.id) {
      alert('Usuário não autenticado.');
      return;
    }

    await addMovimentacao({
      produtoId: formData.produtoId,
      tipo: formData.tipo as TipoMovimentacaoFront,
      quantidade: formData.quantidade,
      motivo: formData.motivo,
      userId: user.id,
    });

    setFormData({
      produtoId: '',
      tipo: 'entrada',
      quantidade: 1,
      motivo: ''
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Nova Movimentação</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="produto">Produto</Label>
              <Select
                value={formData.produtoId}
                onValueChange={(value) => setFormData({ ...formData, produtoId: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {estoque.map((item) => (
                    <SelectItem key={item.id} value={item.produtoId}>
                      {item.produto.nome} - {item.produto.codigoBarras}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de Movimentação</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value: 'entrada' | 'saida') => setFormData({ ...formData, tipo: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                min={1}
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                required
              />
              {selectedProduto && (
                <p className="text-sm text-gray-600 mt-1">
                  Estoque atual: {selectedProduto.quantidade}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="motivo">Motivo</Label>
              <Textarea
                id="motivo"
                value={formData.motivo}
                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                placeholder="Ex: Compra de fornecedor, Venda, Devolução..."
                rows={3}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Registrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovimentacaoForm;
