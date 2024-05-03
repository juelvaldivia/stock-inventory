import ProductsAPIRepository from '@/core/api/products/ProductsAPIRepository.ts';
import MaterialsAPIRepository from '@/core/api/materials/MaterialsAPIRepository';

export interface API {
  products(): ProductsAPIRepository;
  materials(): MaterialsAPIRepository;
}

export default class Api implements API {
  private _products: ProductsAPIRepository;
  private _materials: MaterialsAPIRepository;

  constructor() {
    this._products = new ProductsAPIRepository();
    this._materials = new MaterialsAPIRepository();
  }

  products(): ProductsAPIRepository {
    return this._products;
  }

  materials(): MaterialsAPIRepository {
    return this._materials;
  }
}
