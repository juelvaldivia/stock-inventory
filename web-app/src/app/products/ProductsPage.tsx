'use client';

import ProductList from '@/app/products/ProductList';
import SearchBar from '@/app/components/SearchBar';

import { useProductsHandler, useRegisterProductHandler } from '@/app/App.tsx';
import RegisterProduct from './RegisterProduct';
import { useObserverState } from '../common/StateObserverBuilder';

const ProductsPage: React.FC = () => {
  const registerProductHandler = useRegisterProductHandler();
  const productsHandler = useProductsHandler();
  const stateRegisterProduct = useObserverState(registerProductHandler);

  const onSearchProducts = (name: string) => {
    productsHandler.search(name);
  };

  const onProductsForm = () => {
    if (!stateRegisterProduct.open) {
      registerProductHandler.openRegisterProduct();
    }

    if (stateRegisterProduct.open) {
      registerProductHandler.closeRegisterProduct();
    }
  };

  return (
    <div className="container">
      <div className="x-auto px-4 flex justify-start">
        {!stateRegisterProduct.open && (
          <button
            onClick={onProductsForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar
          </button>
        )}
        {stateRegisterProduct.open && (
          <button
            onClick={onProductsForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cerrar
          </button>
        )}

        <RegisterProduct />
      </div>
      <div className="mx-auto px-4 flex justify-end">
        <SearchBar onSearch={onSearchProducts} placeholder="Buscar por nombre..." />
      </div>
      <ProductList></ProductList>
    </div>
  );
};

export default ProductsPage;
