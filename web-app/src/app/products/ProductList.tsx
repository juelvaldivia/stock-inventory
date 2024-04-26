'use client';

import React, { useEffect } from 'react';

import * as DependenciesProvider from '@/DependenciesProvider';
import ProductItem from './ProductItem';
import { useStateObserverState } from '../common/StateObserverBuilder';

const ProductList: React.FC = () => {
  const productsStateObserver = DependenciesProvider.provideProductsStateObserver();
  const state = useStateObserverState(productsStateObserver);

  useEffect(() => {
    const searchProducts = async (filter: string) => {
      productsStateObserver.search(filter);
    };

    searchProducts('Element');
  }, [productsStateObserver]);

  switch (state.kind) {
    case 'LoadingProductsState': {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    case 'ErrorProductsState': {
      return (
        <div className="flex items-center justify-center h-screen">
          <h2>{state.error}</h2>
        </div>
      );
    }
    case 'LoadedProductsState': {
      return (
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <button color="primary">Registrar producto</button>
          </div>
          <div className="grid flex flex-row gap-5 grid-cols-5 grid-rows-5">
            {state.products.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
          </div>
        </div>
      );
    }
  }
};

export default ProductList;
