import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { X, Download } from 'lucide-react';
import { useNotasFiscaisContext } from '@/hooks/useNotasFiscaisContext';

interface NotaFiscalViewProps {
  notaId: string;
  onClose: () => void;
}

const NotaFiscalView = ({ notaId, onClose }: NotaFiscalViewProps) => {
  const { notasFiscais } = useNotasFiscaisContext();

  const nota = notasFiscais.find(n => n.id === notaId);
  if (!nota) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'emitida': return 'bg-green-500';
      case 'pendente': return 'bg-yellow-500';
      case 'cancelada':
      case 'rejeitada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDownloadTXT = () => {
    const pdfContent = `
NOTA FISCAL ELETRÔNICA
========================

Número: ${nota.numero}
Data de Emissão: ${new Date(nota.dataEmissao).toLocaleDateString('pt-BR')}
Status: ${nota.status.toUpperCase()}

DADOS DO CLIENTE
================
Nome: ${nota.client.nome}
CPF/CNPJ: ${nota.client.cpfCnpj}
Email: ${nota.client.email}
Telefone: ${nota.client.telefone}

Endereço: ${nota.client.endereco.logradouro}, ${nota.client.endereco.numero}
Bairro: ${nota.client.endereco.bairro}
Cidade: ${nota.client.endereco.cidade} - ${nota.client.endereco.uf}
CEP: ${nota.client.endereco.cep}

ITENS DA NOTA FISCAL
====================
${nota.items.map((item, index) => `
${index + 1}. ${item.produto.nome}
   Quantidade: ${item.quantidade} ${item.produto.estoqueAtual ?? ''}
   Preço Unitário: R$ ${item.precoUnitario.toFixed(2)}
   Valor Total: R$ ${item.valorTotal.toFixed(2)}
`).join('')}

RESUMO
======
Quantidade de Itens: ${nota.items.length}
VALOR TOTAL DA NOTA: R$ ${Number(nota.valorTotal).toFixed(2)}

========================
Esta é uma representação simplificada da Nota Fiscal.
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NotaFiscal_${nota.numero}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Nota Fiscal {nota.numero}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(nota.status)}>{nota.status}</Badge>
                <span className="text-sm text-gray-500">
                  Emitida em {new Date(nota.dataEmissao).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadTXT}>
                <Download className="w-4 h-4 mr-2" />
                Download TXT
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dados do Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dados do Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Nome:</strong> {nota.client.nome}</p>
                <p><strong>CPF/CNPJ:</strong> {nota.client.cpfCnpj}</p>
                <p><strong>Email:</strong> {nota.client.email}</p>
                <p><strong>Telefone:</strong> {nota.client.telefone}</p>
              </div>
              <div>
                <p><strong>Endereço:</strong></p>
                <p>{nota.client.endereco.logradouro}, {nota.client.endereco.numero}</p>
                <p>{nota.client.endereco.bairro}</p>
                <p>{nota.client.endereco.cidade} - {nota.client.endereco.uf}</p>
                <p>CEP: {nota.client.endereco.cep}</p>
              </div>
            </div>
          </div>

          {/* Itens da Nota */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Itens da Nota Fiscal</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Preço Unit.</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nota.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.produto.nome}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>{item.produto.estoqueAtual ?? '-'}</TableCell>
                    <TableCell>R$ {item.precoUnitario.toFixed(2)}</TableCell>
                    <TableCell>R$ {item.valorTotal.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Resumo */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Quantidade de itens: {nota.items.length}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">Valor Total: R$ {Number(nota.valorTotal).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotaFiscalView;