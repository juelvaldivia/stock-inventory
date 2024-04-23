import ProductRepository from '../ProductRepository';
import Product from '../../entities/Product';

const products = [{
  id: "1",
  name: "Element Blazin LS tee Shirt",
  category: "Element Blazin LS tee Shirt, Hombre",
  price: 19.95,
  stockQuantity: 2
}
];

export default class ProductInMemoryRepository implements ProductRepository {
  get(filter: string): Promise<Array<Product>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 100);
    });
  }
}
