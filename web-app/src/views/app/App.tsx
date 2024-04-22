import React from 'react';

import AppBar from '../appBar/CustomAppBar';
import ProductList from '../products/components/ProductList';

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <ProductList />
    </>
  );
};

export default App;
