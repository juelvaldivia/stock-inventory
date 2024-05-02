'use client';

import React from 'react';

import { RegisterProductState } from '@/core/products/RegisterProductState.ts';

import ProductForm from '@/app/products/ProductForm.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useRegisterProductHandler } from '@/app/common/ContextsHandlers.tsx';

const RegisterProduct: React.FC = () => {
  const registerHandler = useRegisterProductHandler();
  const state = useObserverState(registerHandler);

  const renderState = (state: RegisterProductState) => {
    switch (state.kind) {
      case 'BeforeRegisterProductState':
        return (
          state.open && (
            <div className="container mx-auto px-4">
              <div className="row flex flex-wrap justify-start">
                <ProductForm></ProductForm>
              </div>
            </div>
          )
        );
      case 'RegisteringProductState':
        return <div className="container mx-auto px-4">Registrando...</div>;
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
