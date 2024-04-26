import React from 'react';
import { Product } from '@/core/entities/Product.ts';

interface ProductListProps {
  product: Product;
}

const ProductItem: React.FC<ProductListProps> = ({ product }) => {
  return (
    <div className="product--blue box-shadow rounded-lg w-64 h-auto p-8 m-4 relative overflow-hidden">
      <div className="product_inner flex flex-col items-center">
        {/* <img src="http://wellandgood.com/wp-content/uploads/2012/07/Nike-Free-30-Womens-Running-Shoe-511495_600_A.png" className="max-w-full" alt="Nike Air (Women)"> */}
        <p>{product.name}</p>
        <p>Stock: {product.stockQuantity}</p>
        <p>
          Price{' '}
          {product.price.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          })}
        </p>
        <button className="mt-4 px-6 py-3 border border-white rounded-md bg-transparent text-white hover:bg-white hover:text-gray-800 transition duration-300 ease-in">
          Add to basket
        </button>
      </div>
      <div className="product_overlay bg-white bg-opacity-90 w-full h-full absolute top-0 left-0 right-0 transform -translate-y-500 opacity-0 flex flex-col items-center justify-center">
        <h2>Added to basket</h2>
        <i className="fa fa-check text-2xl"></i>
      </div>
      {/* <div className="px-6 py-4">
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
      </div> */}
    </div>
  );
};

export default ProductItem;
