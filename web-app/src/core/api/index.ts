import BrandsAPIRepository from '@/core/api/brands/BrandsAPIRepository';
import MaterialsAPIRepository from '@/core/api/materials/MaterialsAPIRepository';
import ProductsAPIRepository from '@/core/api/products/ProductsAPIRepository.ts';

export interface API {
  brands(): BrandsAPIRepository;
  materials(): MaterialsAPIRepository;
  products(): ProductsAPIRepository;
}

export default class Api implements API {
  private _brands: BrandsAPIRepository;
  private _materials: MaterialsAPIRepository;
  private _products: ProductsAPIRepository;

  constructor() {
    this._brands = new BrandsAPIRepository();
    this._materials = new MaterialsAPIRepository();
    this._products = new ProductsAPIRepository();
  }

  brands(): BrandsAPIRepository {
    return this._brands;
  }

  materials(): MaterialsAPIRepository {
    return this._materials;
  }

  products(): ProductsAPIRepository {
    return this._products;
  }
}
