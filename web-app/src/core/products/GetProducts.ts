import { Product } from '@/core/entities/Product.ts';
import { API } from '@/core/api/index.ts';

export default class GetProducts {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  execute(filter: string): Promise<Product[]> {
    return this.api.products().get(filter);
  }
}
