import GetProducts from "@/core/products/GetProducts.ts";
import ProductsHandler from "@/core/products/ProductsHandler";
import Api from "@/core/api"

export function provideProductsStateHandler(): ProductsHandler {
    const api = new Api();
    const getProductsUseCase = new GetProducts(api);
    const productsHandler = new ProductsHandler(getProductsUseCase);

    return productsHandler;
}

