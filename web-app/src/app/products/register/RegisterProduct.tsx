'use client';

import React from 'react';

import { RegisterProductState } from '@/core/products/RegisterProductState.ts';

import Loader from '@/app/components/Loader.tsx';
import ProductForm from '@/app/products/components/ProductForm';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useRegisterProductHandler } from '@/app/common/ContextsHandlers.tsx';

const RegisterProduct: React.FC = () => {
  const registerHandler = useRegisterProductHandler();
  const state = useObserverState(registerHandler);

  const renderState = (state: RegisterProductState) => {
    switch (state.kind) {
      case 'BeforeRegisterProductState':
        return (
          <div className="container mx-auto pl-16">
            <div className="row flex flex-wrap justify-center">
              <ProductForm></ProductForm>
            </div>
          </div>
        );
      case 'RegisteringProductState':
        return <Loader />;
      case 'ErrorRegisteringProductState':
        return (
          <div className="container mx-auto px-4">Error registrando el producto {state.error}</div>
        );
      case 'RegisteredProductState':
        return (
          <div className="container mx-auto px-4">
            Producto {state.product.name} registrado correctamente
          </div>
        );
    }
  };

  return renderState(state);
};

export default RegisterProduct;
