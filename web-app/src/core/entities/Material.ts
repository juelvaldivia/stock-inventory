export interface Material {
  id: string;
  name: string;
  description: string;
  quantityUsed: number;
  quantityAvailable: number;
  quantityLimit: number;
}

export interface MaterialsList {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  items: Material[];
}
