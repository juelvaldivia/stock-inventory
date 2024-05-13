import React from 'react';
import Image from 'next/image';

import { Product } from '@/core/entities/Product.ts';

interface ProductListProps {
  product: Product;
  color: string;
}

const ProductItem: React.FC<ProductListProps> = ({ product, color }) => {
  return (
    <div className={`item--${color}`}>
      <div className="item_inner">
        <Image src={product.imageUrl} alt="Nike Air (Women)" width={600} height={600} />
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
