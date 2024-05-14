import Api from '@/core/api/index.ts';

import GetBrands from '@/core/brands/GetBrands';
import BrandsHandler from '@/core/brands/BrandsHandler';

import GetMaterials from '@/core/materials/GetMaterials';
import MaterialsHandler from '@/core/materials/MaterialsHandler';

import GetProducts from '@/core/products/GetProducts.ts';
import ProductsHandler from '@/core/products/ProductsHandler.ts';
import RegisterProduct from '@/core/products/RegisterProduct';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';

import ListSelectorHandler from '@/core/listSelector/ListSelectorHandler';

export function brandsStateHandler(): BrandsHandler {
  const api = new Api();
  const getBrands = new GetBrands(api);

  return new BrandsHandler(getBrands);
}

export function materialsStateHandler(): MaterialsHandler {
  const api = new Api();
  const getMaterials = new GetMaterials(api);

  return new MaterialsHandler(getMaterials);
}

export function productsStateHandler(): ProductsHandler {
  const api = new Api();
  const getProductsUseCase = new GetProducts(api);

  return new ProductsHandler(getProductsUseCase);
}

export function registerProductStateHandler(): RegisterProductHandler {
  const api = new Api();
  const registerProductUseCase = new RegisterProduct(api);

  return new RegisterProductHandler(registerProductUseCase);
}

export function listSelectorStateHandler(): ListSelectorHandler {
  return new ListSelectorHandler();
}

export const AppHandlers = {
  brandsStateHandler,
  productsStateHandler,
  registerProductStateHandler,
  materialsStateHandler,
  listSelectorStateHandler
};
