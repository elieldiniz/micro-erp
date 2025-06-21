import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, Plus, Trash2 } from 'lucide-react';
import { useClientesAPI } from '@/hooks/useClientesAPI';
import { useProdutosAPI } from '@/hooks/useProdutosAPI';
import { useNotasFiscaisContext } from '@/hooks/useNotasFiscaisContext';
import { ItemNotaFiscal } from '@/model';
import { useToast } from '@/hooks/use-toast';

interface NotaFiscalFormProps {
  onClose: () => void;
}

const NotaFiscalForm = ({ onClose }: NotaFiscalFormProps) => {
  const { clientes } = useClientesAPI();
  const { produtos } = useProdutosAPI();
  const { addNotaFiscal } = useNotasFiscaisContext();
  const { toast } = useToast();

  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState<Omit<ItemNotaFiscal, 'id' | 'valorTotal'>[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adicionarItem = () => {
    const produto = produtos.find(p => p.id === produtoSelecionado);
    if (!produto || quantidade === '') return;

    const qtd = parseInt(quantidade);
    if (isNaN(qtd) || qtd <= 0) return;

    const novoItem = {
      produtoId: produto.id,
      produto,
      quantidade: qtd,
      precoUnitario: produto.preco,
    };

    setItens(prev => [...prev, novoItem]);
    setProdutoSelecionado('');
    setQuantidade('1');
  };

  const removerItem = (index: number) => {
    setItens(prev => prev.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.quantidade * item.precoUnitario, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente || itens.length === 0) {
      toast({
        title: 'Erro',
        description: 'Selecione um cliente e adicione pelo menos um item.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const itensCompletos: ItemNotaFiscal[] = itens.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
        valorTotal: item.quantidade * item.precoUnitario,
      }));

      await addNotaFiscal({
        clientId: clienteId,
        client: cliente,
        items: itensCompletos,
        valorTotal: calcularTotal().toFixed(2),
      });

      toast({
        title: 'Sucesso',
        description: 'Nota fiscal emitida com sucesso!',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao emitir nota fiscal. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Emitir Nota Fiscal</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <Select value={clienteId} onValueChange={setClienteId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map(cliente => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Adicionar Produtos</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label>Produto</Label>
                  <Select value={produtoSelecionado} onValueChange={setProdutoSelecionado}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {produtos.map(produto => (
                        <SelectItem key={produto.id} value={produto.id}>
                          {produto.nome} - R$ {produto.preco.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={adicionarItem}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {itens.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Itens da Nota</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Preço Unit.</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.produto.nome}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>R$ {item.precoUnitario.toFixed(2)}</TableCell>
                        <TableCell>R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removerItem(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-right mt-4">
                  <p className="text-xl font-bold">Total: R$ {calcularTotal().toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!clienteId || itens.length === 0 || isSubmitting}>
                {isSubmitting ? 'Emitindo...' : 'Emitir Nota Fiscal'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotaFiscalForm;