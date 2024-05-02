import { Product } from '@/core/entities/Product.ts';
import { API } from '@/core/api/index.ts';

export default class RegisterProduct {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  execute(product: Product): Promise<Product> {
    return this.api.products().register(product);
  }
}
