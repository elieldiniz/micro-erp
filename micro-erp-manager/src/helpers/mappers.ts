import { TipoMovimentacaoApi, toFrontTipo } from '@/enums/movimentacao';
import { MovimentacaoEstoque } from '@/model/movimentacao';
import { MovimentacaoEstoqueAPI } from '@/model/MovimentacaoEstoqueAPI';

const mapMov = (m: MovimentacaoEstoqueAPI): MovimentacaoEstoque => ({
  id: m.id,
  produtoId: m.productId,
  produto: {
    ...m.product,
    codigoBarras: m.product.codigo || '', // se necessário preencher default
  },
  tipo: toFrontTipo(m.tipo as TipoMovimentacaoApi),
  quantidade: m.quantidade,
  valorUnitario: m.valorUnitario ? Number(m.valorUnitario) : null,
  motivo: m.observacao,
  data: m.createdAt,
  usuario: m.createdBy,
});
