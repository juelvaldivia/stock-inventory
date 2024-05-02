export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  brandId: string;
}

export interface ProductsList {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  items: Product[];
}
