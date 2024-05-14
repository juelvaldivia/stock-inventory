import { Brand } from '@/core/entities/Brand.ts';

export default interface MaterialRepository {
  get(): Promise<Brand[]>;
  register(brand: Brand): Promise<Brand>;
}
