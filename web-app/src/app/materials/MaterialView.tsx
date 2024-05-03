'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import MaterialsPage from '@/app/materials/MaterialPage.tsx';
import Title from '@/app/components/Title';
import { materialsContext } from '@/app/common/ContextsHandlers';

const Foo: React.FC = () => {
  return (
    <materialsContext.Provider value={AppHandlers.materialsStateHandler()}>
      <Title title="Materiales" />
      <MaterialsPage />
    </materialsContext.Provider>
  );
};

export default Foo;
