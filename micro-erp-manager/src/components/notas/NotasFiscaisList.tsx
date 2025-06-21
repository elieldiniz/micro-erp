import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, FileText, Ban, Download } from 'lucide-react';
import NotaFiscalForm from './NotaFiscalForm';
import NotaFiscalView from './NotaFiscalView';

// Importa o hook
import { useNotasFiscaisManager } from '../../contexts/useNotasFiscaisManager';

const NotasFiscaisList = () => {
  const {
    filteredNotas,
    isLoading,
    error,
    showForm,
    setShowForm,
    showView,
    setShowView,
    selectedNota,
    setSelectedNota,
    searchTerm,
    setSearchTerm,
    cancelingId,
    handleViewNota,
    handleDownloadPDF,
    handleCancelarNota,
  } = useNotasFiscaisManager();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'emitida': return 'bg-green-500';
      case 'pendente': return 'bg-yellow-500';
      case 'cancelada':
      case 'rejeitada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">Erro: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header e botão */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notas Fiscais</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Emitir Nota Fiscal
        </Button>
      </div>

      {/* Filtro */}
      <div className="relative ml-auto max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por número ou cliente..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Notas Fiscais Emitidas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data Emissão</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Nenhuma nota fiscal encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredNotas.map(nota => (
                  <TableRow key={nota.id}>
                    <TableCell className="font-medium">{nota.numero}</TableCell>
                    <TableCell>{nota.client.nome}</TableCell>
                    <TableCell>{new Date(nota.dataEmissao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>R$ {Number(nota.valorTotal).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(nota.status)}>{nota.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewNota(nota.id)}>
                          <FileText className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadPDF(nota.id)}>
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                        {(nota.status.toLowerCase() === 'emitida' || nota.status.toLowerCase() === 'pendente') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelarNota(nota.id)}
                            disabled={cancelingId === nota.id}
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            {cancelingId === nota.id ? 'Cancelando...' : 'Cancelar'}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showForm && <NotaFiscalForm onClose={() => setShowForm(false)} />}

      {showView && selectedNota && (
        <NotaFiscalView
          notaId={selectedNota}
          onClose={() => {
            setShowView(false);
            setSelectedNota(null);
          }}
        />
      )}
    </div>
  );
};

export default NotasFiscaisList;
