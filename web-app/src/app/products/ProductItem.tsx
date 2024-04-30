import React from 'react';
import { Product } from '@/core/entities/Product.ts';
import Image from 'next/image';

interface ProductListProps {
  product: Product;
  color: string;
}

const ProductItem: React.FC<ProductListProps> = ({ product, color }) => {
  return (
    <div className={`product--${color}`}>
      <div className="product_inner">
        <Image
          src="http://wellandgood.com/wp-content/uploads/2012/07/Nike-Free-30-Womens-Running-Shoe-511495_600_A.png"
          alt="Nike Air (Women)"
          width={600}
          height={600}
        />
        <p>{product.name}</p>
        <p>Stock: {product.stockQuantity}</p>
        <p>Categoría: {product.category}</p>
        <p>
          Price{' '}
          {product.price.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          })}
        </p>
        <button>Agregar venta</button>
      </div>
    </div>
  );
};

export default ProductItem;
