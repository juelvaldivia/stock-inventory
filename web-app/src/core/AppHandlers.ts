import Api from '@/core/api/index.ts';
import GetProducts from '@/core/products/GetProducts.ts';
import ProductsHandler from '@/core/products/ProductsHandler.ts';
import RegisterProduct from '@/core/products/RegisterProduct';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';
import MaterialsHandler from './materials/MaterialsHandler';
import GetMaterials from './materials/GetMaterials';
import ListSelectorHandler from './listSelector/ListSelectorHandler';

export function productsStateHandler(): ProductsHandler {
  const api = new Api();
  const getProductsUseCase = new GetProducts(api);
  const productsHandler = new ProductsHandler(getProductsUseCase);

  return productsHandler;
}

export function registerProductStateHandler(): RegisterProductHandler {
  const api = new Api();
  const registerProductUseCase = new RegisterProduct(api);
  const registerProductHandler = new RegisterProductHandler(registerProductUseCase);

  return registerProductHandler;
}

export function materialsStateHandler(): MaterialsHandler {
  const api = new Api();
  const getMaterials = new GetMaterials(api);
  const materialsHandler = new MaterialsHandler(getMaterials);

  return materialsHandler;
}

export function listSelectorStateHandler(): ListSelectorHandler {
  return new ListSelectorHandler();
}

export const AppHandlers = {
  productsStateHandler,
  registerProductStateHandler,
  materialsStateHandler,
  listSelectorStateHandler
};
