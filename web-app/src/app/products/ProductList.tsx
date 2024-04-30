'use client';

import React, { useEffect } from 'react';

import * as DependenciesProvider from '@/DependenciesProvider';
import ProductItem from './ProductItem';
import { useObserverState } from '../common/StateObserverBuilder';
import { Product } from '@/core/entities/Product';
import { ProductsState } from '@/core/products/ProductsState';
import SearchBar from '@/app/components/SearchBar';

const assignColor = (productNumber: number) => {
  const colors = ['blue', 'orange', 'red', 'green', 'yellow', 'pink'];
  return colors[productNumber % colors.length];
};

const renderLoadingState = () => (
  <div className="flex items-center justify-center h-screen">Loading...</div>
);

const renderErrorState = (error: string) => (
  <div className="flex items-center justify-center h-screen">
    <h2>{error}</h2>
  </div>
);

const ProductList: React.FC = () => {
  const productsHandler = DependenciesProvider.provideProductsStateHandler();
  const state = useObserverState(productsHandler);

  useEffect(() => {
    const searchProducts = async (filter: string) => {
      productsHandler.search(filter);
    };

    return () => {
      searchProducts('');
    };
  }, [productsHandler]);

  const onSearchProducts = (name: string) => {
    productsHandler.search(name);
  };

  const renderState = (state: ProductsState) => {
    switch (state.kind) {
      case 'LoadingProductsState':
        return renderLoadingState();
      case 'ErrorProductsState':
        return renderErrorState(state.error);
      case 'LoadedProductsState':
        return (
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <SearchBar onSearch={onSearchProducts} placeholder="Buscar por nombre..." />
            </div>
            <div className="row flex flex-wrap justify-start">
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
