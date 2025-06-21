import React, { useState, useEffect } from 'react';
import {
  Archive,
  Plus,
  Search,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MovimentacaoForm from './MovimentacaoForm';
import * as estoqueService from '@/services/estoqueService';
import type { EstoqueItem, MovimentacaoEstoque,  } from '@/model';

const EstoqueList: React.FC = () => {
  const [estoque, setEstoque] = useState<EstoqueItem[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoEstoque[]>([]);

  const [isLoadingEstoque, setIsLoadingEstoque] = useState(false);
  const [isLoadingMovimentacoes, setIsLoadingMovimentacoes] = useState(false);
  const [errorEstoque, setErrorEstoque] = useState<string | null>(null);
  const [errorMovimentacoes, setErrorMovimentacoes] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchEstoque = async () => {
      setIsLoadingEstoque(true);
      setErrorEstoque(null);
      try {
        const data = await estoqueService.fetchEstoque(token);
        setEstoque(data);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erro ao buscar estoque';
        setErrorEstoque(message);
      } finally {
        setIsLoadingEstoque(false);
      }
    };

    fetchEstoque();
  }, [token]);

  useEffect(() => {
    const fetchMovimentacoes = async () => {
      setIsLoadingMovimentacoes(true);
      setErrorMovimentacoes(null);
      try {
        const response = await estoqueService.fetchMovimentacoes(token, currentPage, pageSize);
        setMovimentacoes(response.data);

      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erro ao buscar movimentações';
        setErrorMovimentacoes(message);
      } finally {
        setIsLoadingMovimentacoes(false);
      }
    };

    if (token) {
      fetchMovimentacoes();
    } else {
      setErrorMovimentacoes('Token não encontrado');
    }
  }, [token, currentPage]);

  // Filtra estoque pelo nome do produto ou código de barras
  const filteredEstoque = estoque.filter(item => {
    const nome = item.produto?.nome ?? '';
    const codigoBarras = item.produto?.codigoBarras ?? '';
    const termo = searchTerm.toLowerCase();

    return (
      nome.toLowerCase().includes(termo) || codigoBarras.toLowerCase().includes(termo)
    );
  });

  if (isLoadingEstoque || isLoadingMovimentacoes) {
    return <div className="p-6">Carregando dados do estoque...</div>;
  }

  if (errorEstoque) {
    return <div className="p-6 text-red-600">Erro ao carregar estoque: {errorEstoque}</div>;
  }

  if (errorMovimentacoes) {
    return <div className="p-6 text-red-600">Erro ao carregar movimentações: {errorMovimentacoes}</div>;
  }

  if (estoque.length === 0) {
    return <div className="p-6">Nenhum produto em estoque.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Controle de Estoque</h3>
          <p className="text-gray-600">Gerencie o estoque dos produtos</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Movimentação
        </Button>
      </div>

      {/* Campo de busca */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEstoque.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Archive className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {item.produto?.nome || 'Produto sem nome'}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Código: {item.produto?.codigoBarras || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quantidade Atual:</span>
                  <span
                    className={`font-bold ${
                      item.quantidade <= item.estoqueMinimo ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {item.quantidade}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mínimo:</span>
                  <span className="text-sm">{item.estoqueMinimo}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Última Movimentação:</span>
                  <span className="text-sm">
                    {item.ultimaMovimentacao
                      ? new Date(item.ultimaMovimentacao).toLocaleDateString('pt-BR')
                      : 'N/A'}
                  </span>
                </div>

                {item.quantidade <= item.estoqueMinimo && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">Estoque baixo!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Últimas movimentações */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Últimas Movimentações</h4>
        {movimentacoes.length === 0 && <p>Nenhuma movimentação encontrada.</p>}
        <div className="space-y-3">
          {movimentacoes.slice(0, 5).map(mov => (
            <Card key={mov.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      mov.tipo === 'entrada' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {mov.tipo === 'entrada' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{mov.produto?.nome || 'Produto sem nome'}</p>
                    <p className="text-sm text-gray-600">{mov.motivo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      mov.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {mov.tipo === 'entrada' ? '+' : '-'}
                    {mov.quantidade}
                  </p>
                  <p className="text-sm text-gray-600">
                    {mov.data ? new Date(mov.data).toLocaleDateString('pt-BR') : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal do formulário de movimentação */}
      {showForm && <MovimentacaoForm estoque={estoque} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default EstoqueList;