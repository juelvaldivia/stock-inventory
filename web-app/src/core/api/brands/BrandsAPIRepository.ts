import HttpClient from '@/core/http/httpClient.ts';
import BrandRepository from '@/core/api/BrandRepository.ts';
import { Brand } from '@/core/entities/Brand.ts';

export default class BrandInAPIRepository implements BrandRepository {
  async get(): Promise<Brand[]> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      let endpoint = '/api/v1/brands';

      const response = await httpClient.instance.get<Brand[]>(endpoint);

      return response.data || [];
    } catch (error) {
      console.error(error);
      throw new Error('error getting brands');
    }
  }

  async register(brand: Brand): Promise<Brand> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      const endpoint = '/api/v1/brands';
      const payload = {
        name: brand.name,
        logo: brand.logo
      };

      const response = await httpClient.instance.post<Brand>(endpoint, payload);

      console.log(response);
      return response.data as Brand;
    } catch (error) {
      throw new Error('error registering brand');
    }
  }
}
