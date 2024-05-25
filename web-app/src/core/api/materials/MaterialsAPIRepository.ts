import HttpClient from '@/core/http/httpClient.ts';
import MaterialRepository from '@/core/api/MaterialRepository.ts';
import { Material, MaterialsList } from '@/core/entities/Material.ts';

export default class MaterialInAPIRepository implements MaterialRepository {
  async get(filter: string): Promise<Material[]> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      let endpoint = '/api/v1/materials';

      if (filter !== undefined && filter !== null) {
        endpoint += `?name=${filter}`;
      }

      const response = await httpClient.instance.get<MaterialsList>(endpoint);

      return response.data.items || [];
    } catch (error) {
      console.error(error);
      throw new Error('error getting materials');
    }
  }

  async register(material: Material): Promise<Material> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      const endpoint = '/api/v1/materials';
      const payload = {
        name: material.name,
        description: material.description,
        quantityAvailable: material.quantityAvailable,
        quantityLimit: material.quantityLimit
      };

      const response = await httpClient.instance.post<Material>(endpoint, payload);

      return response.data as Material;
    } catch (error) {
      throw new Error('error registering material');
    }
  }

  async addQuantity(material: Material, quantity: number): Promise<Material> {
    try {
      const httpClient = new HttpClient('http://localhost:4321');
      const endpoint = `/api/v1/materials/${material.id}/add`;
      const payload = {
        quantity
      };

      const response = await httpClient.instance.post<Material>(endpoint, payload);

      return response.data as Material;
    } catch (error) {
      throw new Error('error registering material');
    }
  }
}
