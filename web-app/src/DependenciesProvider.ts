import GetProductsUseCase from "./lib/products/GetProductsUseCase";
import ProductInMemoryRepository from "./lib/data/products/ProductInMemoryRepository";
import { ProductsBloc } from "./views/products/ProductsBloc";

export function provideProductsBloc(): ProductsBloc {
    // TODO: Must be implement abstract interface for data or stores
    const productRepository = new ProductInMemoryRepository();
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const productsPresenter = new ProductsBloc(getProductsUseCase);

    return productsPresenter;
}
