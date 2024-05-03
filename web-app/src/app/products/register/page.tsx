import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const RegisterView = dynamic(() => import('@/app/products/register/RegisterView.tsx'), {
  ssr: false
});

const Index: NextPage = () => {
  return <RegisterView />;
};

export default Index;
