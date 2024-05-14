import { Brand } from '@/core/entities/Brand.ts';
import { API } from '@/core/api/index.ts';

export default class GetBrands {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  execute(): Promise<Brand[]> {
    return this.api.brands().get();
  }
}
