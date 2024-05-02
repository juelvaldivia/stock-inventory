import Api from '@/core/api/index.ts';
import GetProducts from '@/core/products/GetProducts.ts';
import ProductsHandler from '@/core/products/ProductsHandler.ts';
import RegisterProduct from '@/core/products/RegisterProduct';
import RegisterProductHandler from '@/core/products/RegisterProductHandler.ts';

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

export const AppHandlers = {
  productsStateHandler,
  registerProductStateHandler
};
