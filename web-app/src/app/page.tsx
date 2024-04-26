import type { NextPage } from 'next';
import Head from 'next/head';
import ProductList from './products/ProductList';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inventory </title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Inventory stock of shoes" />
        <meta name="author" content="Juel Valdivia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList />
    </>
  );
};

export default Index;
