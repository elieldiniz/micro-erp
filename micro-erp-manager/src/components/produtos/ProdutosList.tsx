import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProdutosAPI } from '@/hooks/useProdutosAPI';
import ProdutoForm from './ProdutoForm';
import { Produto } from '@/model';

const ProdutosList: React.FC = () => {
  const { produtos, isLoading, deleteProduto } = useProdutosAPI();
  const [showForm, setShowForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.codigoBarras.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6 text-center">Carregando produtos...</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h3 className="text-xl font-semibold">Produtos</h3>
          <p className="text-gray-600">Gerencie seus produtos em estoque</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Novo Produto
        </Button>
      </div>

      <div className="flex items-center gap-4 max-w-md mx-auto md:mx-0">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar produtos por nome ou código de barras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProdutos.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">Nenhum produto encontrado.</p>
        ) : (
          filteredProdutos.map((produto) => (
            <Card key={produto.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{produto.nome}</CardTitle>
                      <p className="text-sm text-gray-600 truncate max-w-xs">
                        Código de Barras: {produto.codigoBarras}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="whitespace-nowrap">
                    NCM: {produto.ncm}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">CFOP: {produto.cfop}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-600">Estoque: {produto.estoqueAtual}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProduto(produto);
                      setShowForm(true);
                    }}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteProduto(produto.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {showForm && (
        <ProdutoForm
          produto={editingProduto}
          onClose={() => {
            setShowForm(false);
            setEditingProduto(null);
          }}
        />
      )}
    </div>
  );
};

export default ProdutosList;