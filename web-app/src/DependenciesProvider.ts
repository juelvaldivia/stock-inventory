import GetProducts from "@/core/products/GetProducts.ts";
import ProductsHandler from "@/core/products/ProductsHandler";
import Api from "@/core/api"
import RegisterProductHandler from "@/core/products/RegisterProductHandler";

export function provideProductsStateHandler(): ProductsHandler {
    const api = new Api();
    const getProductsUseCase = new GetProducts(api);
    const productsHandler = new ProductsHandler(getProductsUseCase);

    return productsHandler;
}

export function provideRegisterProductStateHandler(): RegisterProductHandler {
    const registerProductHandler = new RegisterProductHandler();

    return registerProductHandler;
}

export const dependenciesLocator = {
    provideProductsStateHandler,
    provideRegisterProductStateHandler
};
