import { Material } from '@/core/entities/Material.ts';
import { API } from '@/core/api/index.ts';

export default class GetMaterials {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  execute(filter: string): Promise<Material[]> {
    return this.api.materials().get(filter);
  }
}
