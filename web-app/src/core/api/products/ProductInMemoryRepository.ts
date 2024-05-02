import ProductRepository from '@/core/api/ProductRepository.ts';
import { Product } from '@/core/entities/Product.ts';

const products = [
  {
    id: '1',
    name: 'Element Blazin LS tee Shirt',
    category: 'Element Blazin LS tee Shirt, Hombre',
    price: 19.95,
    stockQuantity: 2,
    brandId: ''
  }
];

export default class ProductInMemoryRepository implements ProductRepository {
  get(filter: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 100);
    });
  }

  register(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(product);
      }, 100);
    });
  }
}
