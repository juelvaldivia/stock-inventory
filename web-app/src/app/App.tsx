'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import AppBar from '@/app/components/AppBar';
import ProductsPage from '@/app/products/ProductsPage.tsx';
import { productsContext, registerProductContext } from '@/app/common/ContextsHandlers';

const options = [
  {
    name: 'Registrar producto',
    url: '/product/new'
  },
  {
    name: 'Insumos',
    url: '/insumos'
  }
];

const App: React.FC = () => {
  return (
    <productsContext.Provider value={AppHandlers.productsStateHandler()}>
      <registerProductContext.Provider value={AppHandlers.registerProductStateHandler()}>
        <AppBar options={options} />
        <ProductsPage />
      </registerProductContext.Provider>
    </productsContext.Provider>
  );
};

export default App;
