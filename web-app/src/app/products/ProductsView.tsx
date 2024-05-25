'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import ProductsPage from '@/app/products/ProductsPage.tsx';
import Title from '@/app/components/Title.tsx';
import { listProductsContext } from '@/app/common/ContextsHandlers.tsx';

const ProductsView: React.FC = () => {
  return (
    <listProductsContext.Provider value={AppHandlers.app.listProductsHandler()}>
      <Title title="Productos" />
      <ProductsPage />
    </listProductsContext.Provider>
  );
};

export default ProductsView;
