'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faPlus } from '@fortawesome/free-solid-svg-icons';

import { RegisterMaterialState } from '@/core/materials/RegisterMaterialState.ts';

import Loader from '@/app/components/Loader.tsx';
import MaterialForm from '@/app/materials/components/MaterialForm.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useRegisterMaterialHandler } from '@/app/common/ContextsHandlers.tsx';

const RegisterMaterial: React.FC = () => {
  const registerHandler = useRegisterMaterialHandler();
  const state = useObserverState(registerHandler);

  const renderState = (state: RegisterMaterialState) => {
    switch (state.kind) {
      case 'BeforeRegisterMaterialState':
        return (
          <div className="container mx-auto pl-16">
            <MaterialForm></MaterialForm>
          </div>
        );
      case 'RegisteringMaterialState':
        return <Loader />;
      case 'ErrorRegisteringMaterialState':
        return (
          <div className="container mx-auto pl-16">Error registrando el material {state.error}</div>
        );
      case 'RegisteredMaterialState':
        return (
          <div className="container mx-auto pl-16">
            <div className="text-center">
              <p className="py-8">
                Material <span className="text-xl">{`"${state.material.name}"`} </span>registrado
                correctamente
              </p>
              <a
                href="/materials"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                <FontAwesomeIcon icon={faTags} className="mr-2" />
                Listado de materiales
              </a>
              <a
                href="/materials/register/"
                className="inline-flex items-center px-8 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Agregar otro material
              </a>
            </div>
          </div>
        );
    }
  };

  return renderState(state);
};

export default RegisterMaterial;
