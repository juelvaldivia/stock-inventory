import { Material } from '@/core/entities/Material.ts';

export default interface MaterialRepository {
  get(filter: string): Promise<Material[]>;
  register(material: Material): Promise<Material>;
}
