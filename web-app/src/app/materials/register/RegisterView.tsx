'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import Title from '@/app/components/Title';
import RegisterMaterial from '@/app/materials/register/RegisterMaterial.tsx';
import { registerMaterialContext } from '@/app/common/ContextsHandlers.tsx';

const Foo: React.FC = () => {
  return (
    <registerMaterialContext.Provider value={AppHandlers.app.registerMaterialHandler()}>
      <Title title="Registrar material" />
      <RegisterMaterial />
    </registerMaterialContext.Provider>
  );
};

export default Foo;
