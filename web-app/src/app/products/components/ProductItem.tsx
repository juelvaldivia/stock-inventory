import React from 'react';

import { Product } from '@/core/entities/Product.ts';

interface ProductListProps {
  product: Product;
  color: string;
}

const ProductItem: React.FC<ProductListProps> = ({ product, color }) => {
  return (
    <div
      className={`item--${color} shadow-custom w-15em h-auto rounded-custom p-2em m-1em
                  overflow-hidden relative flex-auto`}
    >
      <div className="flex items-center flex-col flex-wrap">
        <p className="text-xl font-bold">{product.name}</p>
        <p className="text-md text-gray-700">
          {product.price.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          })}
        </p>
        <div className="flex flex-col mt-4">
          <p className="text-gray-700 text-sm">
            <span>En existencia:</span> {product.stockQuantity}
          </p>
          <p className="text-gray-700 text-sm">
            <span>Categoría:</span> {product.category}
          </p>
        </div>

        <div className="flex flex-wrap justify-center mt-2">
          {product.materials.map((material, index) => (
            <span
              key={`product-material-${index}`}
              className="bg-white bg-opacity-90 text-gray-700 text-xs font-semibold mr-2 mt-2
              px-2.5 py-0.5 rounded border border-gray shadow-md border-solid rounded"
            >
              {material.name}: {material.quantityUsed}
            </span>
          ))}
        </div>

        <button
          className="border border-white border-opacity-50 text-black border-solid rounded
                           px-8 py-2 mt-6 bg-white bg-opacity-50 hover:bg-white hover:text-gray-800
                           transition duration-250 ease-in"
        >
          Registrar
        </button>
        <button
          className="border border-white border-opacity-50 text-black border-solid rounded
                           px-8 py-2 mt-2 bg-white bg-opacity-50 hover:bg-white hover:text-gray-800
                           transition duration-250 ease-in"
        >
          Agregar venta
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
