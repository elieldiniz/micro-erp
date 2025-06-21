import { createContext } from 'react';
import type { ProdutosContextType } from './ProdutosProvider';

export const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined);