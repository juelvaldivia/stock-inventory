import HttpClient from "@/core/http/httpClient.ts";
import ProductRepository from "@/core/api/ProductRepository.ts";
import { Product, ProductsList } from "@/core/entities/Product.ts";

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
      console.error(error)
      throw new Error('error getting products');
    }
  }
}
