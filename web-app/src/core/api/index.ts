import ProductsAPIRepository from "@/core/api/products/ProductsAPIRepository.ts";

export interface API {
  products(): ProductsAPIRepository
}

export default class Api implements API {
  private _products: ProductsAPIRepository;

  constructor() {
    this._products = new ProductsAPIRepository();
  }

  products(): ProductsAPIRepository {
    return this._products;
  }
}
