'use client';

import React, { useEffect } from 'react';

import { ListProductsState } from '@/core/products/ListProductsState.ts';

import Loader from '@/app/components/Loader.tsx';
import ProductItem from '@/app/products/components/ProductItem.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useListProductsHandler } from '@/app/common/ContextsHandlers.tsx';

const assignColor = (productNumber: number) => {
  const colors = ['blue', 'orange', 'red', 'green', 'yellow', 'pink'];
  return colors[productNumber % colors.length];
};

const renderErrorState = (error: string) => (
  <div className="flex items-center justify-center h-screen">
    <h2>{error}</h2>
  </div>
);

const ProductList: React.FC = () => {
  const listProductsHandler = useListProductsHandler();
  const state = useObserverState(listProductsHandler);

  useEffect(() => {
    const searchProducts = async (filter: string) => {
      listProductsHandler.search(filter);
    };

    return () => {
      searchProducts('');
    };
  }, [listProductsHandler]);

  const renderState = (state: ListProductsState) => {
    switch (state.kind) {
      case 'LoadingProductsState':
        return <Loader />;
      case 'ErrorProductsState':
        return renderErrorState(state.error);
      case 'LoadedProductsState':
        return (
          <div className="container mx-auto px-4">
            <div className="row flex flex-wrap justify-start">
              {state.products.length === 0 && (
                <div className="mx-auto">
                  <div className="p-4">No hay resultados</div>
                </div>
              )}
              {state.products.map((product, index) => (
                <ProductItem product={product} color={assignColor(index)} key={index} />
              ))}
            </div>
          </div>
        );
    }
  };

  return renderState(state);
};

export default ProductList;
