'use client';

import React, { useEffect } from 'react';

import * as DependenciesProvider from '@/DependenciesProvider';
import ProductItem from './ProductItem';
import { useObserverState } from '../common/StateObserverBuilder';
import { Product } from '@/core/entities/Product';
import { ProductsState } from '@/core/products/ProductsState';
import ProductsHandler from '@/core/products/ProductsHandler';

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

const renderProducts = (products: Product[]) => (
  <div className="container mx-auto px-4">
    <div className="mb-16">
      <button color="primary">Registrar producto</button>
    </div>
    <div className="row flex flex-wrap justify-start">
      {products.map((product, index) => (
        <ProductItem product={product} color={assignColor(index)} key={index} />
      ))}
    </div>
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
      searchProducts('Element');
    };
  }, [productsHandler]);

  const renderState = (state: ProductsState) => {
    switch (state.kind) {
      case 'LoadingProductsState':
        return renderLoadingState();
      case 'ErrorProductsState':
        return renderErrorState(state.error);
      case 'LoadedProductsState':
        return renderProducts(state.products);
    }
  };

  return renderState(state);
};

export default ProductList;
