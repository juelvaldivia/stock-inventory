import HttpClient from "@/core/http/httpClient.ts";
import ProductRepository from "@/core/api/ProductRepository.ts";
import { Product, ProductsList } from "@/core/entities/Product.ts";

export default class ProductInAPIRepository implements ProductRepository {
  async get(filter: string): Promise<Product[]> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      const response = await httpClient.instance.get<ProductsList>('/api/v1/products');

      return response.data.items;
    } catch (error) {
      console.error(error)
      throw new Error('error getting products');
    }
  }
}
