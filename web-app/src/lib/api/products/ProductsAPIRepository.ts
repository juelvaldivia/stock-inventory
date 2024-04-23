import Product, { ProductsList } from "../../entities/Product";
import HttpClient from "../../http/httpClient";
import ProductRepository from "../ProductRepository";

export default class ProductInMemoryRepository implements ProductRepository {
  async get(filter: string): Promise<Array<Product>> {
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
