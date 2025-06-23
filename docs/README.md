
# 📚 Documentação Técnica — Biblioteca `nfe-seed-node` para Emissão de NF-e

---

## Introdução

A biblioteca **`nfe-seed-node`** é uma solução Node.js para emissão, consulta, cancelamento e gestão completa de Notas Fiscais Eletrônicas (NF-e modelo 55) e Notas Fiscais de Consumidor Eletrônicas (NFC-e modelo 65), totalmente compatível com os padrões exigidos pela SEFAZ — Secretaria da Fazenda do Brasil.

Ela oferece uma API robusta e simplificada para integração com sistemas ERP, facilitando o envio, assinatura digital e comunicação via web services com a SEFAZ, em ambiente homologação e produção.

---

## Por que usar a `nfe-seed-node`?

* **Simplicidade**: Configuração rápida e fácil de usar, com exemplos claros para começar a emitir NF-es em minutos.
* **Confiabilidade**: Validação automática do XML, assinatura digital segura e comunicação estável via Web Service.
* **Alta performance**: Suporta alto volume de emissões, ideal para ERPs que precisam escalar.
* **Suporte completo a ambientes**: Permite configurar homologação (testes) e produção sem mudanças complexas.
* **Documentação e comunidade ativa**: Disponibiliza guias detalhados e mantém atualizações constantes para acompanhar mudanças da legislação fiscal.
* **Conformidade legal**: Segue rigorosamente o layout NF-e versão 4.00, garantindo aceitação pela SEFAZ.

---

## Funcionalidades principais implementadas

| Funcionalidade                                                        | Status |
| --------------------------------------------------------------------- | ------ |
| Emissão de NF-e modelo 55                                             | ✅      |
| Emissão de NFC-e modelo 65                                            | ✅      |
| Consulta de status do serviço SEFAZ                                   | ✅      |
| Consulta da situação de NF-e/NFC-e                                    | ✅      |
| Consulta e download via Distribuição NFe                              | ✅      |
| Cancelamento de NF-e/NFC-e (evento 110111)                            | ✅      |
| Carta de correção (evento 110110)                                     | ✅      |
| Manifestação do destinatário (eventos 210200, 210210, 210220, 210240) | ✅      |

---

## Requisitos do ambiente

* **Node.js versão recomendada:** v22.14.0 ou superior
* **Dependências externas:** `xmllint`, `libxml` (para validação e assinatura XML)
* **OpenSSL** instalado e configurado para assinatura digital
* Certificado digital A1 (.pfx) para assinatura das notas
* Acesso à internet para comunicação com os web services da SEFAZ (SEFAZ homologação e produção)

---

## Estrutura do Projeto

O projeto organizado para utilização da biblioteca `nfe-seed-node` deve contemplar:

* Configuração do certificado digital (via variável de ambiente ou arquivo .pfx)
* Módulo para emissão e gestão de NF-e (envio, consulta, cancelamento)
* Tratamento dos XMLs gerados, protocolo e armazenamento no banco de dados
* Integração com estoque e clientes para controle automático
* Exposição de endpoints REST para controle via frontend

---

## Exemplo básico de uso

```typescript
import { NFe } from 'nfe-seed-node';

const nfe = new NFe({
  certificado: process.env.PFX_CERT_PATH,
  senhaCertificado: process.env.CERT_PASSWORD,
  ambiente: 'homologacao', // ou 'producao'
});

async function emitirNota() {
  try {
    const dadosNota = {
      // Dados obrigatórios da NF-e aqui (emitente, destinatário, produtos, impostos, etc.)
    };

    const resposta = await nfe.emitir(dadosNota);
    console.log('NF-e emitida com sucesso:', resposta);
  } catch (error) {
    console.error('Erro na emissão da NF-e:', error);
  }
}
```

---

## Principais Considerações

* Manter a biblioteca atualizada para acompanhar alterações no layout da NF-e.
* Validar sempre os dados antes da emissão para evitar rejeições do SEFAZ.
* Monitorar o status dos web services da SEFAZ para garantir disponibilidade.
* Realizar testes em ambiente homologação antes de migrar para produção.

---

## Links importantes

* [Documentação oficial no GitHub da biblioteca](https://github.com/seu-repositorio/nfe-seed-node) *(exemplo, ajuste para link real)*
* [Manual de integração SEFAZ NF-e](https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=ndIjl+iEFdE=)
* [Tabela de códigos de status SEFAZ](https://www.nfe.fazenda.gov.br/portal/consulta.aspx)

---

## Conclusão

A biblioteca `nfe-seed-node` oferece uma solução moderna, eficiente e segura para integrar emissão de NF-e e NFC-e ao Micro ERP, permitindo um controle fiscal completo e automatizado. Sua escolha viabiliza uma implementação ágil e estável, com suporte aos principais eventos fiscais e flexibilidade para futuras expansões.

---

