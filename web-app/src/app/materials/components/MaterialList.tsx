'use client';

import React, { useEffect } from 'react';

import { ListMaterialsState } from '@/core/materials/ListMaterialsState.ts';

import Loader from '@/app/components/Loader.tsx';
import MaterialItem from '@/app/materials/components/MaterialItem.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useListMaterialsHandler } from '@/app/common/ContextsHandlers.tsx';

const assignColor = (materialNumber: number) => {
  const colors = ['blue', 'orange', 'red', 'green', 'yellow', 'pink'];
  return colors[materialNumber % colors.length];
};

const renderErrorState = (error: string) => (
  <div className="flex items-center justify-center h-screen">
    <h2>{error}</h2>
  </div>
);

const MaterialList: React.FC = () => {
  const listMaterialsHandler = useListMaterialsHandler();
  const state = useObserverState(listMaterialsHandler);

  useEffect(() => {
    const searchMaterials = async (filter: string) => {
      listMaterialsHandler.search(filter);
    };

    return () => {
      searchMaterials('');
    };
  }, [listMaterialsHandler]);

  const renderState = (state: ListMaterialsState) => {
    switch (state.kind) {
      case 'LoadingMaterialsState':
        return <Loader />;
      case 'ErrorMaterialsState':
        return renderErrorState(state.error);
      case 'LoadedMaterialsState':
        return (
          <div className="container mx-auto px-4">
            <div className="row flex flex-wrap justify-start">
              {state.materials.length === 0 && (
                <div className="mx-auto">
                  <div className="p-4">No hay resultados</div>
                </div>
              )}
              {state.materials.map((material, index) => (
                <MaterialItem material={material} color={assignColor(index)} key={index} />
              ))}
            </div>
          </div>
        );
    }
  };

  return renderState(state);
};

export default MaterialList;
