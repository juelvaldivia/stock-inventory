'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import ProductsPage from '@/app/products/ProductsPage.tsx';
import { productsContext, registerProductContext } from '@/app/common/ContextsHandlers';

const App: React.FC = () => {
  return (
    <productsContext.Provider value={AppHandlers.productsStateHandler()}>
      <registerProductContext.Provider value={AppHandlers.registerProductStateHandler()}>
        <ProductsPage />
      </registerProductContext.Provider>
    </productsContext.Provider>
  );
};

export default App;
