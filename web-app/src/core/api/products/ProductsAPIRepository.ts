import HttpClient from '@/core/http/httpClient.ts';
import ProductRepository from '@/core/api/ProductRepository.ts';
import { Product, ProductsList } from '@/core/entities/Product.ts';

export default class ProductInAPIRepository implements ProductRepository {
  async get(filter: string): Promise<Product[]> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      let endpoint = '/api/v1/products';

      if (filter !== undefined && filter !== null) {
        endpoint += `?name=${filter}`;
      }

      const response = await httpClient.instance.get<ProductsList>(endpoint);

      return response.data.items || [];
    } catch (error) {
      console.error(error);
      throw new Error('error getting products');
    }
  }

  async register(product: Product): Promise<Product> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      const endpoint = '/api/v1/products';
      const payload = {
        name: product.name,
        category: product.category,
        price: product.price,
        stockQuantity: product.stockQuantity,
        brandId: product.brandId
      };

      const response = await httpClient.instance.post<Product>(endpoint, payload);

      return response.data as Product;
    } catch (error) {
      throw new Error('error registering product');
    }
  }

  async produce(product: Product): Promise<Product> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      const endpoint = '/api/v1/products';
      const payload = {
        name: product.name,
        category: product.category,
        price: product.price,
        stockQuantity: product.stockQuantity,
        brandId: product.brandId
      };

      const response = await httpClient.instance.post<Product>(endpoint, payload);

      return response.data as Product;
    } catch (error) {
      throw new Error('error registering product');
    }
  }
}
