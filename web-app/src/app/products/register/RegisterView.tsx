'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import RegisterProduct from '@/app/products/register/RegisterProduct.tsx';
import Title from '@/app/components/Title';
import { materialsContext, registerProductContext } from '@/app/common/ContextsHandlers.tsx';
import { listSelectorContext } from '../../common/ContextsHandlers';

const Foo: React.FC = () => {
  return (
    <registerProductContext.Provider value={AppHandlers.registerProductStateHandler()}>
      <materialsContext.Provider value={AppHandlers.materialsStateHandler()}>
        <listSelectorContext.Provider value={AppHandlers.listSelectorStateHandler()}>
          <Title title="Registrar producto" />
          <RegisterProduct />
        </listSelectorContext.Provider>
      </materialsContext.Provider>
    </registerProductContext.Provider>
  );
};

export default Foo;
