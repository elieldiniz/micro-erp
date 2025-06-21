# 📃 Documentação Completa do Micro ERP Fiscal & Estoque

> **Versão:** 2025‑06‑21 – *v1.2*
> **Escopo:** Projeto demonstrativo de emissão de NF‑e com arquitetura modular.
> **Stack:** Node.js 20 + Express 4 | PostgreSQL 13 + Prisma 5 | node‑dfe 0.9.4

---

## 🔄 Visão Geral do Projeto

Este projeto é baseado em um backend puro com Express, com foco na geração de NF-e através da biblioteca `node-dfe` e controle de entidades como empresas, clientes e produtos.

> **⚠️ Atenção:** Este repositório não possui frontend. A aplicação é apenas backend e modularizada.

---

## 📂 Estrutura de Diretórios do Backend

```text
micro-erp-backend/
├── prisma/                # Migrations e schema.prisma
├── src/
│   ├── config/           # Certificados, configurações e variáveis de ambiente
│   ├── middlewares/     # Autenticação, validação de documentos
│   ├── modules/
│   │   ├── clients/
│   │   ├── company/
│   │   ├── nfe/
│   │   ├── products/
│   │   └── stock/
│   ├── routes/           # Rotas organizadas por domínio
│   ├── utils/            # Validações e funções auxiliares
│   └── index.ts          # Bootstrap da aplicação
├── .env.simples          # Template para variáveis .env específicas da NF-e
└── rest.http             # Arquivo de testes manuais de requisições
```

---

## 🔐 Variáveis de Ambiente (.env.simples)

```env
DATABASE_URL=
MEU_DANFE_URL=

# Ambiente da NFe: 1 = Produção, 2 = Homologação
NFE_AMBIENTE=

# Dados da Empresa / Emitente
NFE_UF=
NFE_CODIGO_MUNICIPIO=
NFE_RAZAO_SOCIAL=
NFE_NOME_FANTASIA=
NFE_CNPJ=
NFE_INSCRICAO_ESTADUAL=

# Endereço
NFE_ENDERECO_LOGRADOURO=
NFE_ENDERECO_NUMERO=
NFE_ENDERECO_BAIRRO=
NFE_ENDERECO_CEP=
NFE_ENDERECO_MUNICIPIO=
NFE_ENDERECO_UF=
```

---

## 📄 Principais Funcionalidades

* 📤 Emissão de NF-e modelo 55 versão 4.00
* 🧾 Validação local de XML com xmllint
* 🔐 Assinatura digital com certificado A1 (.pfx) via OpenSSL
* 💬 Consulta de status da SEFAZ (Homologação e Produção)

---

## 🛠️ Ferramentas Recomendadas

| Requisito | Versão Recomendada |
| --------- | ------------------ |
| Node.js   | 20.14.0            |
| xmllint   | libxml 2.x         |
| OpenSSL   | 1.1+               |

> As bibliotecas xmllint e openssl devem estar disponíveis via terminal.

---

## 💡 Considerações Finais

Este projeto serve como base sólida para aplicações que precisam emitir NF-e de forma fiscalmente correta, segura e modularizada. Ideal para ERP's, sistemas de e-commerce ou soluções personalizadas para PMEs.

A documentação da SEFAZ deve ser sempre consultada para manter conformidade com os requisitos legais.

📎 [Manual de Integração do Contribuinte – SEFAZ](https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=ndIjl+iEFdE=)
