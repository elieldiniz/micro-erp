export enum TipoMovimentacaoApi {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

export enum TipoMovimentacaoFront {
  entrada = 'entrada',
  saida = 'saida',
}

export const toFrontTipo = (t: TipoMovimentacaoApi): TipoMovimentacaoFront =>
  t === TipoMovimentacaoApi.ENTRADA ? TipoMovimentacaoFront.entrada : TipoMovimentacaoFront.saida;

export const toApiTipo = (t: TipoMovimentacaoFront): TipoMovimentacaoApi =>
  t === TipoMovimentacaoFront.entrada ? TipoMovimentacaoApi.ENTRADA : TipoMovimentacaoApi.SAIDA;
