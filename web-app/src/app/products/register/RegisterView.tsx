'use client';

import { AppHandlers } from '@/core/AppHandlers.ts';

import RegisterProduct from '@/app/products/register/RegisterProduct.tsx';
import Title from '@/app/components/Title';
import { registerProductContext } from '@/app/common/ContextsHandlers.tsx';

const Foo: React.FC = () => {
  return (
    <registerProductContext.Provider value={AppHandlers.registerProductStateHandler()}>
      <Title title="Registrar producto" />
      <RegisterProduct />
    </registerProductContext.Provider>
  );
};

export default Foo;
