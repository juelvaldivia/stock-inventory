import GetProducts from "./lib/products/GetProducts";
import ProductInMemoryRepository from "./lib/api/products/ProductInMemoryRepository";
import { ProductsBloc } from "./views/products/ProductsBloc";

export function provideProductsBloc(): ProductsBloc {
    // TODO: Must be implement abstract interface for data or stores
    const productRepository = new ProductInMemoryRepository();
    const getProductsUseCase = new GetProducts(productRepository);
    const productsPresenter = new ProductsBloc(getProductsUseCase);

    return productsPresenter;
}
