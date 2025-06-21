
import React, { createContext, useContext, ReactNode } from 'react';
import { ProdutosProvider } from './ProdutosProvider';
import { ClientesProvider } from './ClientesContext';
import { EstoqueProvider } from './EstoqueProvider'; // Caminho certo para o provider
import { NotasFiscaisProvider } from './NotasFiscaisProvider';
import { AuthProvider } from './AuthContext';

interface AppContextProps {
  children: ReactNode;
}

const AppContext = createContext({});

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>
      <AuthProvider>
        <ProdutosProvider>
          <ClientesProvider>
            <EstoqueProvider>
              <NotasFiscaisProvider>
                {children}
              </NotasFiscaisProvider>
            </EstoqueProvider>
          </ClientesProvider>
        </ProdutosProvider>
      </AuthProvider>
    </AppContext.Provider>
  );
};
