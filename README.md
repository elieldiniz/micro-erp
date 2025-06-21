# 📃 Documentação Completa do Micro ERP Fiscal & Estoque – Eliel Diniz

> **Versão:** 2025‑06‑21 – *v1.2*
> **Escopo:** Sistema Web modular para gestão de estoque e emissão de NF‑e, voltado a micro e pequenas empresas.
> **Stack:** Node.js 20 + Express 4 | React 18 + Vite 5 | PostgreSQL 13 + Prisma 5 | node‑dfe 0.9.4

---

## 🔄 Visão Geral do Projeto

O Micro ERP oferece:

* **Gestão de Empresas, Clientes e Produtos**
* **Controle de Estoque** com movimentação automática
* **Emissão de NF‑e 4.00** (homologação e produção) via **node‑dfe**
* **Arquitetura limpa**, escalável e documentada, preparada para CI/CD e containerização

---

## 🧱 Estrutura de Repositório (Monorepo)

```text
📦 micro-erp/
├── apps/
│   ├── frontend/            # React + Vite (SPA)
│   └── backend/             # Node.js + Express (REST)
├── libs/                    # Bibliotecas utilitárias compartilhadas (ex: valida CPF/CNPJ)
├── docker/                  # Dockerfiles, docker‑compose.yml, nginx.conf
├── .github/workflows/       # GitHub Actions (lint, test, build, push‑image)
├── docs/                    # Documentação gerada (MD, mermaid, PDF)
├── .env*                    # Variáveis de ambiente (exemplo e real)
└── README.md
```

---

## 🔧 Tecnologias e Versões Recomendadas

| Camada       | Tecnologia         | Versão |
| ------------ | ------------------ | ------ |
| **Backend**  | Node.js            | 20.x   |
|              | Express            | 4.x    |
|              | node‑dfe           | ^0.9.4 |
|              | dotenv             | ^16.3  |
|              | Prisma ORM         | ^5.x   |
|              | Winston (logs)     | ^3.x   |
| **Banco**    | PostgreSQL         | ≥13    |
| **Frontend** | React              | ^18.x  |
|              | Vite               | ^5.x   |
|              | TypeScript         | ^5.x   |
|              | TailwindCSS        | ^3.x   |
|              | Lucide‑react icons | 0.280  |
| **DevOps**   | Docker Engine      | ≥24    |
|              | GitHub Actions     | –      |

---

## 🎓 Arquitetura da Aplicação

A aplicação segue **arquitetura em camadas**, com responsabilidades isoladas:

* **Controllers** → Recebem requisições HTTP, acionam serviços e retornam DTOs.
* **Services** → Lógica de negócio (ex: cálculo de impostos, controle de estoque, emissão de NF‑e).
* **Repositories (Prisma)** → Acesso ao banco PostgreSQL com tipagem forte.
* **Middlewares** → Autenticação JWT, validação, rate‑limiting, error‑handler.
* **Utils / Libs** → Criptografia, formatação de documentos, funções fiscais.

---

## 📂 Estrutura Detalhada – Backend

```text
apps/backend/
├── src/
│   ├── config/               # .env, certificados A1, prisma.config.ts
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── CompanyController.ts
│   │   └── NfeController.ts
│   ├── services/
│   │   ├── AuthService.ts
│   │   ├── StockService.ts
│   │   └── NfeService.ts
│   ├── middlewares/
│   │   ├── requireAuth.ts
│   │   └── validateCpfCnpj.ts
│   ├── modules/
│   │   ├── products/
│   │   ├── clients/
│   │   ├── stock/
│   │   └── nfe/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── index.ts              # Bootstrap
└── package.json
```

### 🔗 Fluxo de Emissão de NF‑e (Mermaid)

```mermaid
graph TD
    A[Front: Pedido /emitir‑nfe] --> B[NfeController]
    B --> C[AuthService: valida token]
    C --> D[StockService: verifica saldo]
    D --> E[NfeService: monta XML]
    E --> F[node-dfe ➜ SEFAZ]
    F -->|Protocolo| G[DB: salva XML + protocolo]
    F -->|Erro| H[Retorna falha ao cliente]
```

---

## 📂 Estrutura Detalhada – Frontend

```text
apps/frontend/
├── src/
│   ├── pages/                # Dashboard, Empresas, Clientes, Produtos, NF‑e
│   ├── components/           # UI reutilizável (Card, Modal, Table, Form)
│   ├── hooks/                # useAuth, useClientes, useNfes
│   ├── context/              # AuthContext, ToastContext
│   ├── services/             # api.ts (axios), nfeService, productService
│   └── App.tsx
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🔐 Segurança e Conformidade

| Área                      | Estratégia                                                       |
| ------------------------- | ---------------------------------------------------------------- |
| **Autenticação**          | JWT (RS256) + Refresh; senhas hash `bcrypt` 12 rounds            |
| **Certificado A1 (.pfx)** | Armazenado criptografado (dotenv ou AWS Secrets); senha no vault |
| **API Gateway**           | CORS restritivo, rate‑limiting, Helmet, audit‑logs               |
| **Logs**                  | Winston + daily‑rotate + nível por ambiente                      |
| **Infra**                 | Containers Docker; imagens slim; dependabot                      |

---

## ⚙️ Como Rodar Localmente

### Backend

```bash
cd apps/backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev                # nodemon + ts-node
```

### Frontend

```bash
cd apps/frontend
npm install
npm run dev                # Vite dev server
```

### Exemplo de `.env`

```env
PORT=3000
DATABASE_URL="postgresql://user:pass@localhost:5432/microerp"
JWT_SECRET=supersecret
PFX_CERT_PATH=certificados/certificado.pfx
CERT_PASSWORD=MinhaSenha123
```

---

## 🧪 Testes e Qualidade

| Camada        | Framework                               |
| ------------- | --------------------------------------- |
| **Backend**   | Jest + Supertest                        |
| **Frontend**  | React Testing Library                   |
| **E2E**       | Cypress                                 |
| **Lint / CI** | ESLint, Prettier, Husky, GitHub Actions |

---

## 🔮 Futuras Expansões

1. **Integração Pagamentos** (Pix, Cartão)
2. **Webhook SEFAZ** – monitoramento de eventos NF‑e
3. **DANFE PDF** via pdf‑make
4. **Dashboard Analítico** com gráficos (Recharts)
5. **Multi‑tenant** com separação por schema PostgreSQL

---

## 📚 Referências

* `node-dfe` – [https://github.com/nfephp/node-dfe](https://github.com/nfephp/node-dfe)
* Manual Técnico NF‑e 4.00 – SEFAZ
* Prisma ORM – [https://www.prisma.io](https://www.prisma.io)
* Lucide‑react Icons – [https://lucide.dev](https://lucide.dev)

---

## 💡 Decisões Arquiteturais (Resumo)

| Tema                   | Decisão Chave             | Motivo                                                          |
| ---------------------- | ------------------------- | --------------------------------------------------------------- |
| **Modelo de deploy**   | Monorepo + Docker Compose | Simplifica orquestração local; pronto para evoluir a Kubernetes |
| **Persistência**       | PostgreSQL + Prisma       | ACID, migrações automáticas, tipagem forte                      |
| **Emissão NF‑e**       | node‑dfe com XML assinado | Conformidade legal e comunidade ativa                           |
| **Auth**               | JWT RS256 + Refresh redis | Escalável e stateless                                           |
| **Estratégia de logs** | Winston JSON + Graylog    | Observabilidade e auditoria fiscal                              |

---

> *Documento gerado a partir de prompts técnicos e decisões registradas durante o desenvolvimento.*


