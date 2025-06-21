
# Micro ERP

Sistema ERP leve e completo para pequenas e médias empresas, com controle de estoque, clientes, vendas, emissão de NFe e mais.

---

## Índice

* [Descrição](#descrição)
* [Tecnologias](#tecnologias)
* [Arquitetura do Projeto](#arquitetura-do-projeto)
* [Setup do Ambiente](#setup-do-ambiente)
* [Executando o Projeto](#executando-o-projeto)
* [Estrutura dos Diretórios](#estrutura-dos-diretórios)
* [Funcionalidades](#funcionalidades)
* [Contribuição](#contribuição)
* [Licença](#licença)

---

## Descrição

Micro ERP é uma solução moderna para gestão integrada, focada em simplicidade e eficiência. Permite gerenciar produtos, clientes, estoque, vendas, notas fiscais eletrônicas e muito mais, com uma interface intuitiva e API robusta.

---

## Tecnologias

* **Backend:** Node.js, NestJS, Prisma ORM, PostgreSQL, JWT para autenticação, Axios para requisições HTTP
* **Frontend:** React.js, Next.js, Tailwind CSS, React Context API, lucide-react (ícones), Formik/Yup para formulários e validação
* **Outros:** Docker para containers (opcional), Vercel para deploy frontend, Postman para testes API

---

## Arquitetura do Projeto

```
/backend            # API RESTful feita em NestJS
  ├── src
  │   ├── modules    # funcionalidades (clientes, produtos, notas fiscais, estoque)
  │   ├── config     # configurações gerais e env
  │   ├── prisma     # schema do banco e migrations
  │   └── main.ts    # ponto de entrada
/frontend           # Frontend React com Next.js
  ├── pages          # rotas e páginas
  ├── components     # componentes reutilizáveis
  ├── hooks          # hooks customizados para lógica
  ├── styles         # estilos (Tailwind config)
  └── public         # assets públicos
```

---

## Setup do Ambiente

### Backend

1. Clone o repositório e acesse a pasta backend:

```bash
git clone <seu-repo-url>
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados PostgreSQL e atualize o arquivo `.env` com as variáveis:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/microerp
JWT_SECRET=seusegredojwt
PORT=3001
```

4. Rode as migrations do Prisma para criar as tabelas:

```bash
npx prisma migrate dev
```

5. Inicie a API:

```bash
npm run start:dev
```

---

### Frontend

1. Na pasta frontend, instale dependências:

```bash
cd ../frontend
npm install
```

2. Configure o `.env.local` com a URL da API backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:3000`

---

## Executando o Projeto

* Acesse a aplicação frontend em `http://localhost:3000`
* A API estará rodando em `http://localhost:3001/api`
* Use a interface para gerenciar clientes, produtos, estoque, emitir e consultar notas fiscais

---

## Estrutura dos Diretórios

### Backend

* **modules/**: Cada módulo contém controllers, services e DTOs específicos
* **prisma/**: Schema do banco e seeds
* **config/**: Configurações globais e variáveis de ambiente
* **main.ts**: Bootstrap da aplicação NestJS

### Frontend

* **pages/**: Páginas públicas e privadas
* **components/**: Componentes UI reutilizáveis (botões, tabelas, formulários)
* **hooks/**: Lógica reutilizável com React Hooks
* **styles/**: Configurações e variáveis Tailwind

---

## Funcionalidades

* **Clientes:** Cadastro, edição, listagem e validação de CPF/CNPJ
* **Produtos:** Controle de cadastro, estoque e movimentações
* **Notas Fiscais:** Emissão, cancelamento, visualização detalhada e download de DANFE em PDF
* **Autenticação:** Login, JWT, proteção de rotas
* **Busca:** Busca por clientes e notas fiscais com filtros dinâmicos
* **Relatórios:** Visualização de movimentações e histórico em tabelas paginadas
* **Interface responsiva:** Usável em desktop e mobile

---

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch com sua feature: `git checkout -b minha-feature`
3. Faça commit das suas alterações: `git commit -m "Descrição da feature"`
4. Envie para seu fork: `git push origin minha-feature`
5. Abra um Pull Request para o repositório principal

---

## Licença

Este projeto está licenciado sob a licença MIT.

