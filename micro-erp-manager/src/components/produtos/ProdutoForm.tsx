import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Produto, ProdutoCadastro } from '@/model';
import { useProdutosAPI } from '@/hooks/useProdutosAPI';
import { formatarProdutoPayload } from '@/lib/formatarProdutoPayload';


interface ProdutoFormProps {
  produto?: Produto | null;
  onClose: () => void;
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({ produto, onClose }) => {
  const { addProduto, updateProduto } = useProdutosAPI();
  const [formData, setFormData] = useState<ProdutoCadastro>({
    nome: produto?.nome || '',
    codigoBarras: produto?.codigoBarras || '',
    ncm: produto?.ncm || '',
    cfop: produto?.cfop || '',
    preco: produto?.preco || 0,
    estoqueAtual: produto?.estoqueAtual || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = formatarProdutoPayload(formData);

    if (produto && 'id' in produto) {
      updateProduto(produto.id, payload);
    } else {
      addProduto(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {produto ? 'Editar Produto' : 'Novo Produto'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="codigoBarras">Código de Barras</Label>
              <Input
                id="codigoBarras"
                value={formData.codigoBarras}
                onChange={(e) => setFormData({ ...formData, codigoBarras: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="ncm">NCM</Label>
              <Input
                id="ncm"
                value={formData.ncm}
                onChange={(e) => setFormData({ ...formData, ncm: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="cfop">CFOP</Label>
              <Input
                id="cfop"
                value={formData.cfop}
                onChange={(e) => setFormData({ ...formData, cfop: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="estoqueAtual">Estoque Atual</Label>
              <Input
                id="estoqueAtual"
                type="number"
                value={formData.estoqueAtual}
                onChange={(e) => setFormData({ ...formData, estoqueAtual: Number(e.target.value) })}
                required
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {produto ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProdutoForm;