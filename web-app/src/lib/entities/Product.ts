export default interface Product {
    id: string
    name: string,
    category: string,
    price: number
    stockQuantity: number
}

export interface ProductsList {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    items: Product[];
}
