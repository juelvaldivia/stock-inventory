import { Product } from '@/core/entities/Product.ts';

export default interface ProductRepository {
  get(filter: string): Promise<Product[]>;
  register(product: Product): Promise<Product>;
}
