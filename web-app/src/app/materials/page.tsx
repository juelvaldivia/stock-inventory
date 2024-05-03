import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const MaterialView = dynamic(() => import('@/app/materials/MaterialView.tsx'), { ssr: false });

const Index: NextPage = () => {
  return <MaterialView />;
};

export default Index;
