import React from 'react';
import { useNotasFiscaisContext } from '@/hooks/useNotasFiscaisContext';

export function useNotasFiscaisManager() {
  const { notasFiscais, isLoading, error, fetchNotasFiscais, cancelarNotaFiscal, baixarDanfePdf } = useNotasFiscaisContext();

  const [showForm, setShowForm] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [selectedNota, setSelectedNota] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cancelingId, setCancelingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchNotasFiscais();
  }, [fetchNotasFiscais]);

  const filteredNotas = React.useMemo(() => {
    return notasFiscais.filter(nota =>
      nota.numero.toString().includes(searchTerm) ||
      nota.client.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notasFiscais, searchTerm]);

  const handleViewNota = (notaId: string) => {
    setSelectedNota(notaId);
    setShowView(true);
  };

  const handleDownloadPDF = async (notaId: string) => {
    try {
      const pdfBlob = await baixarDanfePdf(notaId);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DANFE_${notaId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Erro ao baixar PDF da DANFE');
    }
  };

  const handleCancelarNota = async (notaId: string) => {
    setCancelingId(notaId);
    try {
      await cancelarNotaFiscal(notaId);
      alert('Nota fiscal cancelada com sucesso.');
      await fetchNotasFiscais();
    } catch {
      alert('Erro ao cancelar nota fiscal.');
    } finally {
      setCancelingId(null);
    }
  };

  return {
    notasFiscais,
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
  };
}
