'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShapes, faTags, faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppHandlers } from '@/core/AppHandlers.ts';
import { RegisterProductState } from '@/core/products/RegisterProductState.ts';

import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useRegisterProductHandler } from '@/app/common/ContextsHandlers.tsx';
import { materialsContext } from '@/app/common/ContextsHandlers.tsx';
import { listSelectorContext } from '@/app/common/ContextsHandlers';

import Loader from '@/app/components/Loader.tsx';
import ProductForm from '@/app/products/components/ProductForm';
import { brandsContext } from '../../common/ContextsHandlers';
import ProductItem from '../components/ProductItem';

const RegisterProduct: React.FC = () => {
  const registerHandler = useRegisterProductHandler();
  const state = useObserverState(registerHandler);

  const renderState = (state: RegisterProductState) => {
    switch (state.kind) {
      case 'BeforeRegisterProductState':
        return (
          <div className="container mx-auto pl-16">
            <materialsContext.Provider value={AppHandlers.materialsStateHandler()}>
              <brandsContext.Provider value={AppHandlers.brandsStateHandler()}>
                <listSelectorContext.Provider value={AppHandlers.listSelectorStateHandler()}>
                  <ProductForm></ProductForm>
                </listSelectorContext.Provider>
              </brandsContext.Provider>
            </materialsContext.Provider>
          </div>
        );
      case 'RegisteringProductState':
        return <Loader />;
      case 'ErrorRegisteringProductState':
        return (
          <div className="container mx-auto pl-16">Error registrando el producto {state.error}</div>
        );
      case 'RegisteredProductState':
        return (
          <div className="container mx-auto pl-16">
            <div className="text-center">
              <p className="py-8">
                Producto <span className="text-xl">{`"${state.product.name}"`} </span>registrado
                correctamente
              </p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                <FontAwesomeIcon icon={faTags} className="mr-2" />
                Listado de productos
              </a>
              <a
                href="/products/register/"
                className="inline-flex items-center px-8 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Agregar otro producto
              </a>
            </div>
          </div>
        );
    }
  };

  return renderState(state);
};

export default RegisterProduct;
