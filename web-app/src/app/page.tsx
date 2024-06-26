import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const ProductsView = dynamic(() => import('@/app/products/ProductsView.tsx'), { ssr: false });

const Index: NextPage = () => {
  return <ProductsView />;
};

export default Index;
