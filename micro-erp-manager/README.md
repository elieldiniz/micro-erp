
# Sistema de Gestão - Versão Micro

Sistema simples de gestão empresarial focado nas funcionalidades essenciais: Clientes, Produtos, Estoque e Notas Fiscais.

## 🚀 Tecnologias

### Core
- **React** ^18.3.1 - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS

### UI Components
- **Shadcn/UI** - Componentes de interface
- **Radix UI** - Primitivos de UI
- **Lucide React** ^0.462.0 - Ícones

### Gerenciamento de Estado
- **React Context API** - Estado global
- **React Hooks** - Estado local

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/           # Layout base (Header, Sidebar)
│   ├── clientes/         # Gestão de clientes
│   ├── produtos/         # Gestão de produtos
│   ├── estoque/          # Controle de estoque
│   ├── notas/           # Notas fiscais
│   └── ui/              # Componentes base (shadcn)
├── contexts/            # Context API providers
├── data/               # Dados mock centralizados
├── hooks/              # Hooks customizados
├── services/           # Simulação de APIs
├── types/              # Definições TypeScript
└── pages/              # Páginas principais
```

## ✨ Funcionalidades

### 👥 Clientes
- Cadastro de pessoas físicas e jurídicas
- Edição e exclusão de clientes
- Busca por nome, CPF/CNPJ ou email

### 📦 Produtos
- Gestão completa de produtos
- Categorização e precificação
- Controle por código e unidade

### 📊 Estoque
- Controle de quantidades
- Movimentações de entrada e saída
- Alertas de estoque baixo
- Histórico de movimentações

### 📄 Notas Fiscais
- Emissão de notas fiscais
- Cancelamento de notas
- Visualização detalhada
- Exportação em PDF (simulado)

## 🛠️ Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📝 Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Verificação de código
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:
- **Cores**: Paleta neutra com acentos azul, verde, roxo e vermelho
- **Tipografia**: Sistema de escalas responsivo
- **Componentes**: Baseados no Shadcn/UI com customizações
- **Ícones**: Lucide React para consistência visual

## 📊 Dados Mock

Os dados de exemplo estão organizados em:
- `src/data/mockClientes.ts` - Dados de clientes
- `src/data/mockProdutos.ts` - Catálogo de produtos
- `src/data/mockEstoque.ts` - Itens e movimentações de estoque
- `src/data/mockNotasFiscais.ts` - Notas fiscais emitidas

## 🔄 Simulação de API

Os services simulam operações de API com:
- Delays realistas (300-500ms)
- Operações CRUD completas
- Gerenciamento de estado persistente durante a sessão
- Tratamento de erros básico

## 🎯 Próximos Passos

Para evoluir o sistema:
1. Integração com API real
2. Autenticação de usuários
3. Relatórios e dashboard
4. Backup e sincronização
5. Notificações em tempo real

---

**Versão Micro** - Focada na simplicidade e funcionalidades essenciais
