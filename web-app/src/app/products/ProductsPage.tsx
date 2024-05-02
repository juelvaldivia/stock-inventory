'use client';

import ProductList from '@/app/products/ProductList.tsx';
import RegisterProduct from '@/app/products/RegisterProduct.tsx';
import SearchBar from '@/app/components/SearchBar.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';
import { useProductsHandler, useRegisterProductHandler } from '@/app/common/ContextsHandlers.tsx';

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
            className="bg-[#92dce5] hover:bg-[#70c1b3] text-[#2f2f2f] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar nuevo producto
          </button>
        )}
        {stateRegisterProduct.open && (
          <button
            onClick={onProductsForm}
            className="bg-[#92dce5] hover:bg-[#70c1b3] text-[#2f2f2f] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cerrar registro
          </button>
        )}
      </div>
      <div className="mx-auto px-4 flex justify-end">
        <SearchBar onSearch={onSearchProducts} placeholder="Buscar por nombre..." />
      </div>

      <RegisterProduct />
      <ProductList></ProductList>
    </div>
  );
};

export default ProductsPage;
