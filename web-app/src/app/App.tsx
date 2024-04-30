'use client';

import ProductsHandler from '@/core/products/ProductsHandler';
import ProductsPage from '@/app/products/ProductsPage';
import { createContext } from '@/app/common/Context';
import { dependenciesLocator } from '@/DependenciesProvider';
import RegisterProductHandler from '@/core/products/RegisterProductHandler';

const [productsContext, useProduct] = createContext<ProductsHandler>();
const [registerProductContext, useRegisterProduct] = createContext<RegisterProductHandler>();

export const useProductsHandler = useProduct;
export const useRegisterProductHandler = useRegisterProduct;

const App: React.FC = () => {
  return (
    <productsContext.Provider value={dependenciesLocator.provideProductsStateHandler()}>
      <registerProductContext.Provider
        value={dependenciesLocator.provideRegisterProductStateHandler()}
      >
        <ProductsPage />
      </registerProductContext.Provider>
    </productsContext.Provider>
  );
};

export default App;
