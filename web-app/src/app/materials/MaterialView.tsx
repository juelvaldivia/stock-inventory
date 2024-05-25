'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import MaterialsPage from '@/app/materials/MaterialPage.tsx';
import Title from '@/app/components/Title.tsx';
import { addMaterialContext, listMaterialsContext } from '@/app/common/ContextsHandlers.tsx';

const Foo: React.FC = () => {
  return (
    <listMaterialsContext.Provider value={AppHandlers.app.listMaterialsHandler()}>
      <addMaterialContext.Provider value={AppHandlers.app.addMaterialHandler()}>
        <Title title="Materiales" />
        <MaterialsPage />
      </addMaterialContext.Provider>
    </listMaterialsContext.Provider>
  );
};

export default Foo;
