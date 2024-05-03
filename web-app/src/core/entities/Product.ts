import { Material } from '@/core/entities/Material.ts';

export interface Product {
  id?: string;
  brandId: string;
  name: string;
  category: string;
  price: number;
  style: string;
  size: string;
  stockQuantity: number;
  stockLimit: number;
  materials: Material[];
}

export interface ProductsList {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  items: Product[];
}
