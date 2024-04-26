import GetProducts from "@/core/products/GetProducts.ts";
import ProductsObserver from "@/core/products/ProductsObserver.ts";
import ProductsAPIRepository from "@/core/api/products/ProductsAPIRepository.ts";

export function provideProductsStateObserver(): ProductsObserver {
    // TODO: Must be implement abstract interface for data or stores
    const productRepository = new ProductsAPIRepository();
    const getProductsUseCase = new GetProducts(productRepository);

    return new ProductsObserver(getProductsUseCase);
}
