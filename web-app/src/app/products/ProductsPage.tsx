'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ProductList from '@/app/products/components/ProductList';
import SearchBar from '@/app/components/SearchBar.tsx';
import { useProductsHandler } from '@/app/common/ContextsHandlers.tsx';

const ProductsPage: React.FC = () => {
  const productsHandler = useProductsHandler();

  const onSearchProducts = (name: string) => {
    productsHandler.search(name);
  };

  return (
    <div className="container pl-14">
      <div className="flex flex-col px-10 md:flex-row md:items-center md:justify-between">
        <div className=" md:ml-14 mb-4 md:mb-0">
          <a
            href="/products/register"
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Registrar Producto
          </a>
        </div>
        <div className="flex items-center md:ml-auto">
          <SearchBar onSearch={onSearchProducts} placeholder="Buscar por nombre..." />
        </div>
      </div>

      <ProductList></ProductList>
    </div>
  );
};

export default ProductsPage;
