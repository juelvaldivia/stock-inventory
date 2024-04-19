import React from 'react';
import MyAppBar from '../appbar/MyAppBar';
import ProductList from '../products/components/ProductList';

const App: React.FC = () => {
  return (
    <>
      <MyAppBar />
      <ProductList />
    </>
  );
};

export default App;
