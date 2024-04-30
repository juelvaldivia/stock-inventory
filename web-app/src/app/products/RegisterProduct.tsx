'use client';

import React from 'react';

import { RegisterProductState } from '@/core/products/RegisterProductState.ts';

import ProductForm from '@/app/products/ProductForm.tsx';
import { useRegisterProductHandler } from '@/app/App.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';

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
        return <div className="container mx-auto px-4">Registering...</div>;
      case 'ErrorRegisteringProductState':
        return <div className="container mx-auto px-4">Error registering</div>;
      case 'RegisteredProductState':
        return <div className="container mx-auto px-4">Registered successfully</div>;
    }
  };

  return renderState(state);
};

export default RegisterProduct;
