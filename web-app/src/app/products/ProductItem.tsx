import React from 'react';
import { Product } from '@/core/entities/Product.ts';

interface ProductListProps {
  product: Product;
}

const ProductItem: React.FC<ProductListProps> = ({ product }) => {
  return (
    <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-semibold text-l text-gray-800 mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">Stock: {product.stockQuantity}</p>
        <p className="text-gray-700 text-base">
          {product.price.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          })}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {product.category}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
