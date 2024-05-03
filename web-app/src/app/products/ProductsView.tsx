'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import ProductsPage from '@/app/products/ProductsPage.tsx';
import Title from '@/app/components/Title';
import { productsContext } from '@/app/common/ContextsHandlers';

const ProductsView: React.FC = () => {
  return (
    <productsContext.Provider value={AppHandlers.productsStateHandler()}>
      <Title title="Productos" />
      <ProductsPage />
    </productsContext.Provider>
  );
};

export default ProductsView;
