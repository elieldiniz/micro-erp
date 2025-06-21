import { NotaFiscal } from '@/model/notaFiscal';

const API_BASE_URL = 'http://localhost:3000/api/nfe';

const getToken = (): string => {
  return localStorage.getItem('token') || '';
};

// Listar Notas Fiscais
export const fetchNotasFiscais = async (): Promise<NotaFiscal[]> => {
  const token = getToken();
  const response = await fetch(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar notas fiscais');
  } 
  const data = await response.json();
  return data.data;
};

// Emitir (criar) NFe
export const emitirNotaFiscal = async (
  clientId: string,
  items: { productId: string; quantidade: number; valorUnitario: number }[],
  observacao?: string
): Promise<NotaFiscal> => {
  const token = getToken();
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId,
      items,
      observacao,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao emitir nota fiscal');
  }
  const data = await response.json();
  return data.data;
};

// Baixar PDF da DANFE
export const baixarDanfePdf = async (nfeId: string): Promise<Blob> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/${nfeId}/danfe`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/pdf',
    },
  });
  if (!response.ok) {
    throw new Error('Erro ao baixar DANFE');
  }
  const pdfBlob = await response.blob();
  return pdfBlob;
};


