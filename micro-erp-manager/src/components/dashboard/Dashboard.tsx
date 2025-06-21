
import React from 'react';
import { Package, Users, FileText, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import MetricCard from './MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = () => {
  const { metrics, isLoading } = useDashboardData();

  if (isLoading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total de Produtos"
          value={metrics.totalProdutos.toString()}
          change="+2 este mês"
          changeType="positive"
          icon={Package}
          color="bg-blue-600"
        />
        
        <MetricCard
          title="Total de Clientes"
          value={metrics.totalClientes.toString()}
          change="+5 este mês"
          changeType="positive"
          icon={Users}
          color="bg-green-600"
        />
        
        <MetricCard
          title="Valor do Estoque"
          value={`R$ ${metrics.valorEstoque.toLocaleString('pt-BR')}`}
          change="+12% este mês"
          changeType="positive"
          icon={DollarSign}
          color="bg-purple-600"
        />
        
        <MetricCard
          title="NFe Emitidas"
          value={metrics.notasFiscaisEmitidas.toString()}
          change="+8 esta semana"
          changeType="positive"
          icon={FileText}
          color="bg-orange-600"
        />
        
        <MetricCard
          title="Estoque Baixo"
          value={metrics.produtosEstoqueBaixo.toString()}
          change="Atenção necessária"
          changeType="negative"
          icon={AlertTriangle}
          color="bg-red-600"
        />
        
        <MetricCard
          title="Vendas do Mês"
          value={`R$ ${metrics.vendasMes.toLocaleString('pt-BR')}`}
          change="+15% vs mês anterior"
          changeType="positive"
          icon={TrendingUp}
          color="bg-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Produtos com Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium">Produto A</p>
                  <p className="text-sm text-gray-600">Estoque: 5 unidades</p>
                </div>
                <span className="text-red-600 font-medium">Crítico</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Produto B</p>
                  <p className="text-sm text-gray-600">Estoque: 12 unidades</p>
                </div>
                <span className="text-yellow-600 font-medium">Baixo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Últimas Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">NFe #001234</p>
                  <p className="text-sm text-gray-600">Cliente: João Silva</p>
                </div>
                <span className="text-green-600 font-medium">R$ 1.250,00</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">NFe #001235</p>
                  <p className="text-sm text-gray-600">Cliente: Maria Santos</p>
                </div>
                <span className="text-green-600 font-medium">R$ 980,50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
