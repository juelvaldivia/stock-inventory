import ProductRepository from '@/core/api/ProductRepository.ts';
import { Product } from '@/core/entities/Product.ts';

const products = [
  {
    id: '1',
    brandId: '',
    name: 'Element Blazin LS tee Shirt',
    category: 'Element Blazin LS tee Shirt, Hombre',
    price: 19.95,
    style: '',
    size: '',
    stockQuantity: 2,
    stockLimit: 1,
    imageUrl: '',
    materials: []
  }
];

export default class ProductInMemoryRepository implements ProductRepository {
  get(_filter: string): Promise<Product[]> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(products);
      }, 100);
    });
  }

  register(product: Product): Promise<Product> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(product);
      }, 100);
    });
  }
}
