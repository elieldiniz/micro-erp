
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ProdutosList from '@/components/produtos/ProdutosList';
import ClientesList from '@/components/clientes/ClientesList';
import EstoqueList from '@/components/estoque/EstoqueList';
import NotasFiscaisList from '@/components/notas/NotasFiscaisList';

const Index = () => {
  const [activeTab, setActiveTab] = useState('produtos');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'produtos': return 'Gestão de Produtos';
      case 'clientes': return 'Gestão de Clientes';
      case 'estoque': return 'Controle de Estoque';
      case 'notas': return 'Notas Fiscais';
      default: return 'Gestão Empresarial';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'produtos':
        return <ProdutosList />;
      case 'clientes':
        return <ClientesList />;
      case 'estoque':
        return <EstoqueList />;
      case 'notas':
        return <NotasFiscaisList />;
      default:
        return <ProdutosList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
